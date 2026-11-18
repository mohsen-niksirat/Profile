import { useEffect, useId, useRef, useState } from "react";
import clsx from "clsx";
import { CircleCheck, Send } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import Avatar from "../components/Avatar";
import { useContent } from "../i18n/content";
import { useT } from "../i18n";
import { safeStorage } from "../lib/storage";
import { contactConfigured, sendMessage } from "../lib/contact";
import useUiStore from "#store/ui";

const DRAFT_KEY = "portfolio:mail-draft";
const SENT_KEY = "portfolio:mail-sent";
const RATE_LIMIT_MS = 60_000;
const TOPICS = ["project", "job", "hello"];
const EMPTY = { name: "", contact: "", subject: "", topic: "project", message: "" };

const loadDraft = () => {
  try {
    return { ...EMPTY, ...JSON.parse(safeStorage.getItem(DRAFT_KEY) ?? "{}") };
  } catch {
    return EMPTY;
  }
};

const validate = (form) => {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "mail.err.name";
  if (form.message.trim().length < 10) errors.message = "mail.err.message";
  return errors;
};

const Mail = () => {
  const t = useT();
  const { profile } = useContent();
  const id = useId();
  const [form, setForm] = useState(loadDraft);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [failure, setFailure] = useState(null);
  const [sentTo, setSentTo] = useState(null);
  const honeypot = useRef(null);
  const nameRef = useRef(null);
  const messageRef = useRef(null);

  const hasDraft = Object.entries(form).some(([k, v]) => k !== "topic" && String(v).trim());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasDraft) safeStorage.setItem(DRAFT_KEY, JSON.stringify(form));
      else safeStorage.removeItem(DRAFT_KEY);
    }, 300);
    return () => clearTimeout(timer);
  }, [form, hasDraft]);

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((errs) => ({ ...errs, [field]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const subjectFor = (f) => f.subject.trim() || t(`mail.topic.${f.topic}`);

  const submit = async (e) => {
    e?.preventDefault();
    if (status === "sending") return;
    const found = validate(form);
    setErrors(found);
    const first = ["name", "message"].find((f) => found[f]);
    if (first) {
      ({ name: nameRef, message: messageRef })[first].current?.focus();
      return;
    }

    const payload = {
      name: form.name.trim(),
      email: form.contact.trim() || "@visitor",
      subject: subjectFor(form),
      message: form.message.trim(),
      topic: form.topic,
    };

    if (honeypot.current?.value) {
      setSentTo(payload);
      setStatus("sent");
      return;
    }

    if (!contactConfigured) {
      const formatted = [
        `👋 ${payload.subject}`,
        `From: ${payload.name}${form.contact.trim() ? ` (${form.contact.trim()})` : ""}`,
        "",
        payload.message,
      ].join("\n");
      try {
        await navigator.clipboard.writeText(formatted);
      } catch {
        /* ignore clipboard failure */
      }
      const tgHref = `https://t.me/mohsenniksirat?text=${encodeURIComponent(formatted)}`;
      window.open(tgHref, "_blank", "noopener,noreferrer");
      useUiStore.getState().showToast(t("toast.sent"));
      setStatus("opened");
      return;
    }

    const last = Number(safeStorage.getItem(SENT_KEY) ?? 0);
    if (Date.now() - last < RATE_LIMIT_MS) {
      setFailure("mail.err.rate");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await sendMessage(payload);
      safeStorage.setItem(SENT_KEY, String(Date.now()));
      safeStorage.removeItem(DRAFT_KEY);
      setSentTo(payload);
      setForm(EMPTY);
      setStatus("sent");
      useUiStore.getState().showToast(t("toast.sent"));
    } catch {
      setFailure("mail.err.send");
      setStatus("error");
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit(e);
  };

  const reset = () => {
    setStatus("idle");
    setSentTo(null);
    setErrors({});
  };

  const sending = status === "sending";
  const done = status === "sent" || status === "opened";

  return (
    <>
      <WindowHeader title={t("mail.title")}>
        {!done && (
          <div className="header-actions">
            <button
              type="submit"
              form={`${id}-form`}
              className="toolbar-btn mail-send-btn"
              disabled={sending}
              aria-label={t("mail.send")}
              title={`${t("mail.send")} (⌘↩)`}
            >
              <Send aria-hidden="true" className="rtl-flip" />
            </button>
          </div>
        )}
      </WindowHeader>

      {done ? (
        <div className="window-body mail-done" role="status">
          <CircleCheck aria-hidden="true" className="mail-done-icon" />
          <h1 className="mail-done-title">{t(status === "sent" ? "mail.sentTitle" : "mail.fallback")}</h1>
          {status === "sent" && sentTo && (
            <p className="mail-done-body">{t("mail.sentBody", { name: sentTo.name })}</p>
          )}
          {status === "opened" && (
            <p className="mail-done-body">
              {t("mail.fallbackBody")}{" "}
              <a
                className="text-link ltr"
                href={profile.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {profile.telegramHandle}
              </a>
            </p>
          )}
          <button type="button" className="btn btn-secondary" onClick={reset}>
            {t("mail.newMessage")}
          </button>
        </div>
      ) : (
        <form
          id={`${id}-form`}
          className="window-body mail-compose"
          onSubmit={submit}
          onKeyDown={onKeyDown}
          noValidate
        >
          <div className="mail-row">
            <span className="mail-label">{t("mail.to")}</span>
            <span className="mail-chip">
              <Avatar className="mail-chip-avatar" size={24} />
              {profile.name}
              <span className="mail-chip-email ltr">&lt;{profile.telegramHandle}&gt;</span>
            </span>
          </div>

          <div className="mail-row">
            <label className="mail-label" htmlFor={`${id}-name`}>
              {t("mail.from")}
            </label>
            <div className="mail-from">
              <input
                ref={nameRef}
                id={`${id}-name`}
                data-autofocus
                className="mail-input"
                value={form.name}
                onChange={update("name")}
                placeholder={t("mail.name")}
                aria-label={t("mail.name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? `${id}-name-err` : undefined}
                autoComplete="name"
                dir="auto"
                maxLength={80}
              />
              <input
                type="text"
                className="mail-input"
                value={form.contact}
                onChange={update("contact")}
                placeholder={t("mail.contact")}
                aria-label={t("mail.contact")}
                dir="ltr"
                maxLength={120}
              />
            </div>
          </div>
          {errors.name && (
            <div className="mail-errors">
              <p id={`${id}-name-err`} className="mail-error">
                {t(errors.name)}
              </p>
            </div>
          )}

          <div className="mail-row">
            <label className="mail-label" htmlFor={`${id}-subject`}>
              {t("mail.subject")}
            </label>
            <input
              id={`${id}-subject`}
              className="mail-input"
              value={form.subject}
              onChange={update("subject")}
              placeholder={t(`mail.topic.${form.topic}`)}
              dir="auto"
              maxLength={140}
            />
          </div>

          <div className="mail-row mail-topics" role="radiogroup" aria-label={t("mail.topic")}>
            {TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                role="radio"
                aria-checked={form.topic === topic}
                className={clsx("mail-topic", form.topic === topic && "is-active")}
                onClick={() => setForm((f) => ({ ...f, topic }))}
              >
                {t(`mail.topic.${topic}`)}
              </button>
            ))}
          </div>

          <label className="sr-only" htmlFor={`${id}-message`}>
            {t("mail.message")}
          </label>
          <textarea
            ref={messageRef}
            id={`${id}-message`}
            className="mail-message"
            value={form.message}
            onChange={update("message")}
            placeholder={t("mail.messagePlaceholder")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${id}-message-err` : undefined}
            dir="auto"
            maxLength={5000}
          />

          <div hidden aria-hidden="true">
            <input ref={honeypot} type="text" name="hp_field" tabIndex={-1} autoComplete="new-password" />
          </div>

          <div className="mail-footer">
            <div className="min-w-0 flex-1" aria-live="polite">
              {errors.message && (
                <p id={`${id}-message-err`} className="mail-error">
                  {t(errors.message)}
                </p>
              )}
              {status === "error" && failure && <p className="mail-error">{t(failure)}</p>}
              {!errors.message && status !== "error" && (
                <p className="mail-hint">
                  {hasDraft ? `${t("mail.draftSaved")} · ` : ""}
                  {t("mail.direct")}{" "}
                  <a
                    className="text-link ltr"
                    href={profile.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.telegramHandle}
                  </a>
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary mail-submit" disabled={sending}>
              {sending ? (
                <span className="spinner is-small" aria-hidden="true" />
              ) : (
                <Send aria-hidden="true" className="rtl-flip" />
              )}
              {t(sending ? "mail.sending" : "mail.send")}
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default Mail;
