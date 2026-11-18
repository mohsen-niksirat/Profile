import clsx from "clsx";
import { Check, ArrowUpRight } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import { wallpapers } from "#constants";
import useSettingsStore from "#store/settings";
import { useIsDark } from "../hooks/useTheme";
import { setLocale, useLocale, useT } from "../i18n";

const OS_OPTIONS = [
  {
    id: "macos",
    name: "macOS Sonoma",
    badge: "Apple",
    icon: "🍎",
    descEn: "Glass blur, top MenuBar, floating Dock & traffic lights.",
    descFa: "طراحی شیشه‌ای، منوبار بالا، داک شناور و چراغ‌های ترافیکی.",
  },
  {
    id: "windows",
    name: "Windows 11",
    badge: "Microsoft",
    icon: "🪟",
    descEn: "Centered Taskbar, Start menu & Fluent window controls.",
    descFa: "تسک‌بار وسط‌چین، منوی استارت و کنترل‌های فلوئنت ویندوز.",
  },
  {
    id: "ubuntu",
    name: "Ubuntu 24.04",
    badge: "Linux",
    icon: "🐧",
    descEn: "GNOME top bar, left Yaru dock & orange accents.",
    descFa: "تاپ‌بار گنوم، داک عمودی چپ و تم رنگی یارو اوبونتو.",
  },
];

const APPEARANCES = ["light", "dark", "auto"];
const LANGUAGES = [
  { id: "en", label: "English", sample: "Aa" },
  { id: "fa", label: "فارسی", sample: "اب" },
];
const WALLPAPER_NAMES_FA = {
  default: "ونتورا",
  nature: "طبیعت",
  tech: "تکنولوژی",
  abstract: "انتزاعی",
  monterey: "مونتری",
  bigsur: "بیگ‌سر",
};

const Settings = () => {
  const { appearance, wallpaper, osMode = 'macos', setAppearance, setWallpaper, setOsMode } = useSettingsStore();
  const isDark = useIsDark();
  const { isMobile } = useWindowContext();
  const t = useT();
  const locale = useLocale();

  return (
    <>
      <WindowHeader title={t("settings.title")} />
      <div className="window-body settings @container">
                <section className="settings-group" aria-labelledby="os-title">
          <h3 id="os-title" className="settings-title">
            {locale === "fa" ? "سیستم‌عامل دسکتاپ" : "Desktop Operating System"}
          </h3>
          <div className="settings-card">
            <div className="os-options-grid" role="radiogroup" aria-label="Operating System">
              {OS_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={osMode === opt.id}
                  className={clsx("os-option-card", osMode === opt.id && "is-active")}
                  onClick={() => setOsMode(opt.id)}
                >
                  <div className="os-card-header">
                    <span className="os-card-icon">{opt.icon}</span>
                    <span className="os-card-badge">{opt.badge}</span>
                  </div>
                  <h4 className="os-card-name">{opt.name}</h4>
                  <p className="os-card-desc">
                    {locale === "fa" ? opt.descFa : opt.descEn}
                  </p>
                  {osMode === opt.id && (
                    <span className="os-active-check">
                      <Check className="size-3.5 stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="settings-hint">
              {locale === "fa"
                ? "می‌توانید محیط پورتفولیو را درجا بین مک‌اواس، ویندوز ۱۱ و اوبونتو تغییر دهید."
                : "Hot-swap the entire portfolio desktop shell between macOS, Windows 11, and Ubuntu Linux in real time."}
            </p>
          </div>
        </section>

<section className="settings-group" aria-labelledby="appearance-title">
          <h3 id="appearance-title" className="settings-title">
            {t("settings.appearance")}
          </h3>
          <div className="settings-card">
            <div className="appearance-options" role="radiogroup" aria-label={t("settings.appearance")}>
              {APPEARANCES.map((id) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={appearance === id}
                  className="appearance-option"
                  onClick={() => setAppearance(id)}
                >
                  <span className={clsx("appearance-preview", `is-${id}`)} aria-hidden="true">
                    <span className="ap-bar" />
                    <span className="ap-window" />
                  </span>
                  <span className="appearance-label">{t(`settings.${id}`)}</span>
                </button>
              ))}
            </div>
            <p className="settings-hint">
              {t("settings.hint", { mode: t(isDark ? "settings.modeDark" : "settings.modeLight") })}
            </p>
          </div>
        </section>

        <section className="settings-group" aria-labelledby="language-title">
          <h3 id="language-title" className="settings-title">
            {t("settings.language")}
          </h3>
          <div className="settings-card">
            <div className="language-options" role="radiogroup" aria-label={t("settings.language")}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  role="radio"
                  aria-checked={locale === lang.id}
                  lang={lang.id}
                  className="language-option"
                  onClick={() => setLocale(lang.id)}
                >
                  <span className="language-sample" aria-hidden="true">
                    {lang.sample}
                  </span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
            <p className="settings-hint">{t("settings.languageHint")}</p>
          </div>
        </section>

        <section className="settings-group" aria-labelledby="wallpaper-title">
          <h3 id="wallpaper-title" className="settings-title">
            {t("settings.wallpaper")}
          </h3>
          <div className="settings-card wallpaper-grid" role="radiogroup" aria-label={t("settings.wallpaper")}>
            {wallpapers.map((wp) => (
              <button
                key={wp.id}
                type="button"
                role="radio"
                aria-checked={wallpaper === wp.id}
                className="wallpaper-option"
                onClick={() => setWallpaper(wp.id)}
              >
                <span className="wallpaper-thumb">
                  <img
                    src={(isDark ? wp.dark : wp.light).replace("/wallpapers/", "/wallpapers/thumbs/")}
                    alt=""
                    decoding="async"
                    width="360"
                    height="225"
                  />
                  {wallpaper === wp.id && (
                    <span className="wallpaper-check" aria-hidden="true">
                      <Check strokeWidth={3} />
                    </span>
                  )}
                </span>
                <span className="wallpaper-name">
                  {locale === "fa" ? WALLPAPER_NAMES_FA[wp.id] ?? wp.name : wp.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="settings-group" aria-labelledby="about-title">
          <h3 id="about-title" className="settings-title">
            {t("settings.about")}
          </h3>
          <dl className="settings-card settings-rows">
            <div>
              <dt>{t("settings.version")}</dt>
              <dd className="tabular-nums">2.1</dd>
            </div>
            <div>
              <dt>{t("settings.builtWith")}</dt>
              <dd>React 19 · Vite · Tailwind CSS 4 · GSAP · Zustand</dd>
            </div>
            {!isMobile && (
              <div>
                <dt>{t("settings.shortcuts")}</dt>
                <dd>{t("settings.shortcutsValue")}</dd>
              </div>
            )}
            <div>
              <dt>{t("settings.source")}</dt>
              <dd>
                <a
                  href="https://github.com/mohsen-niksirat/Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link ltr"
                >
                  github.com/mohsen-niksirat/Profile
                  <ArrowUpRight aria-hidden="true" className="inline size-3.5" />
                </a>
              </dd>
            </div>
            <div>
              <dt>{t("settings.credit")}</dt>
              <dd>
                <a
                  href="https://github.com/Rezaabdollahi7/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link"
                >
                  {t("settings.creditValue")}
                  <ArrowUpRight aria-hidden="true" className="inline size-3.5" />
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
};

export default Settings;
