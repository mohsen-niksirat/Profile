import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import useUiStore from "#store/ui";
import AppleLogo from "../menubar/AppleLogo";
import Avatar from "../Avatar";
import { useNow } from "../../hooks/useNow";
import { useContent } from "../../i18n/content";
import { formatDate, useLocale, useT } from "../../i18n";

const TIME_OPTS = { hour: "2-digit", minute: "2-digit", hour12: false };
const DATE_OPTS = { weekday: "long", month: "long", day: "numeric" };

export const LockScreen = () => {
  const locked = useUiStore((s) => s.locked);
  const unlockScreen = useUiStore((s) => s.unlockScreen);
  const now = useNow();
  const locale = useLocale();
  const t = useT();
  const { profile } = useContent();
  const btnRef = useRef(null);

  useEffect(() => {
    if (!locked) return;
    btnRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        e.preventDefault();
        unlockScreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [locked, unlockScreen]);

  if (!locked) return null;

  return createPortal(
    <div
      className="lock-screen"
      role="dialog"
      aria-modal="true"
      aria-label={t("lock.aria")}
      onClick={unlockScreen}
    >
      <div className="lock-clock-wrap">
        <p className="lock-date">{formatDate(now, DATE_OPTS, locale)}</p>
        <time className="lock-time tabular-nums" dateTime={now.toISOString()}>
          {formatDate(now, TIME_OPTS, locale)}
        </time>
      </div>

      <div className="lock-user" onClick={(e) => e.stopPropagation()}>
        <Avatar className="lock-avatar" size={88} />
        <h2 className="lock-name">{profile.name}</h2>
        <button
          ref={btnRef}
          type="button"
          className="lock-unlock-btn"
          onClick={unlockScreen}
        >
          {t("lock.unlock")}
        </button>
      </div>
    </div>,
    document.body,
  );
};

export const BootScreen = () => {
  const booting = useUiStore((s) => s.booting);
  const finishBoot = useUiStore((s) => s.finishBoot);
  const t = useT();

  useEffect(() => {
    if (!booting) return;
    const timer = setTimeout(finishBoot, 1450);
    const onKey = (e) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finishBoot();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [booting, finishBoot]);

  if (!booting) return null;

  return createPortal(
    <div
      className="boot-screen"
      role="status"
      aria-label={t("boot.aria")}
      onClick={finishBoot}
    >
      <AppleLogo className="boot-logo" />
      <div className="boot-track" aria-hidden="true">
        <div className="boot-fill" />
      </div>
      <span className="boot-skip">{t("boot.skip")}</span>
    </div>,
    document.body,
  );
};
