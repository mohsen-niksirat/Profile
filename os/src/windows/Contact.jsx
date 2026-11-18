import { BookOpen, Copy, Github, GraduationCap, MessageSquare, Send } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import Avatar from "../components/Avatar";
import { useNow } from "../hooks/useNow";
import { copyTelegram, openWindow } from "../lib/actions";
import { useContent } from "../i18n/content";
import { formatDate, useLocale, useT } from "../i18n";

const ICONS = { github: Github, telegram: Send, blog: BookOpen };

const Contact = () => {
  const now = useNow();
  const t = useT();
  const locale = useLocale();
  const { profile, socials } = useContent();
  const telegram = socials.find((s) => s.id === "telegram");
  const github = socials.find((s) => s.id === "github");
  const time = formatDate(now, { hour: "numeric", minute: "2-digit", timeZone: profile.timezone }, locale);

  return (
    <>
      <WindowHeader title={t("contact.title")} />
      <div className="window-body contact-card">
        <div className="contact-hero">
          <Avatar className="contact-avatar" />
          <h1 className="contact-name">{profile.name}</h1>
          <p className="contact-role">
            {profile.role} · {profile.location}
          </p>
          <p className="contact-time tabular-nums">{t("contact.localTime", { time })}</p>
          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            {profile.availability}
          </p>
        </div>

        <div className="contact-actions">
          <a
            href={telegram.href}
            className="contact-action"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Send aria-hidden="true" />
            <span>{t("contact.message")}</span>
          </a>
          <a
            href={github.href}
            className="contact-action"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github aria-hidden="true" />
            <span>{t("contact.githubBtn")}</span>
          </a>
          <button type="button" className="contact-action" onClick={() => openWindow("mail")}>
            <MessageSquare aria-hidden="true" />
            <span>{t("contact.mail")}</span>
          </button>
          <button type="button" className="contact-action" onClick={copyTelegram}>
            <Copy aria-hidden="true" />
            <span>{t("contact.copy")}</span>
          </button>
        </div>

        <dl className="contact-rows">
          <div className="contact-row">
            <dt>{t("contact.education")}</dt>
            <dd>
              <span>
                <GraduationCap aria-hidden="true" className="contact-row-icon" />
                <span>{t("contact.educationVal")}</span>
              </span>
            </dd>
          </div>
          <div className="contact-row">
            <dt>{t("contact.website")}</dt>
            <dd>
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="ltr">
                {profile.host}
              </a>
            </dd>
          </div>
          {socials.map((s) => {
            const Icon = ICONS[s.id] ?? Send;
            return (
              <div key={s.id} className="contact-row">
                <dt>{t(`contact.${s.id}`)}</dt>
                <dd>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    <Icon aria-hidden="true" className="contact-row-icon" />
                    <span className="ltr">{s.handle}</span>
                  </a>
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="contact-note">{t("contact.note")}</p>
      </div>
    </>
  );
};

export default Contact;
