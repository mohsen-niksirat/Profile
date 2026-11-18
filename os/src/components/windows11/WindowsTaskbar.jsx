import { useRef, useState } from "react";
import clsx from "clsx";
import {
  ChevronUp,
  LayoutGrid,
  Search,
  Volume2,
  Wifi,
} from "lucide-react";
import { apps, dockLayout } from "#constants";
import useWindowStore, { selectFocusedKey } from "#store/window";
import useUiStore from "#store/ui";
import useSettingsStore from "#store/settings";
import WindowsStartMenu from "./WindowsStartMenu";
import { useDismiss } from "../../hooks/useDismiss";
import { useNow } from "../../hooks/useNow";
import { openApp } from "../../lib/actions";
import { formatDate, toggleLocale, useLocale, useT } from "../../i18n";

const byId = Object.fromEntries(apps.map((a) => [a.id, a]));

const WindowsLogo = ({ className }) => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M0 2.247a.35.35 0 0 1 .35-.35h6.6a.35.35 0 0 1 .35.35v5.053H0V2.247zm8.7 0a.35.35 0 0 1 .35-.35h6.6a.35.35 0 0 1 .35.35v5.053H8.7V2.247zM0 8.7h7.3v5.053a.35.35 0 0 1-.35.35H.35a.35.35 0 0 1-.35-.35V8.7zm8.7 0H16v5.053a.35.35 0 0 1-.35.35H9.05a.35.35 0 0 1-.35-.35V8.7z" />
  </svg>
);

const TIME_FMT = { hour: "numeric", minute: "2-digit" };
const DATE_FMT = { year: "numeric", month: "numeric", day: "numeric" };

const WindowsTaskbar = () => {
  const [startOpen, setStartOpen] = useState(false);
  const [osFlyoutOpen, setOsFlyoutOpen] = useState(false);
  const startBtnRef = useRef(null);
  const osFlyoutRef = useRef(null);

  useDismiss(osFlyoutOpen, [osFlyoutRef], () => setOsFlyoutOpen(false));

  const windows = useWindowStore((s) => s.windows);
  const focused = useWindowStore(selectFocusedKey);
  const toggleShowDesktop = useWindowStore((s) => s.toggleShowDesktop);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const openSpotlight = useUiStore((s) => s.openSpotlight);
  const toggleMissionControl = useUiStore((s) => s.toggleMissionControl);
  const setOsMode = useSettingsStore((s) => s.setOsMode);
  const osMode = useSettingsStore((s) => s.osMode || "macos");
  const now = useNow();
  const t = useT();
  const locale = useLocale();

  const handleAppClick = (app) => {
    if (app.window && !app.data) {
      const win = windows[app.window];
      if (win?.isOpen) {
        if (focused === app.window && !win.isMinimized) {
          minimizeWindow(app.window);
        } else {
          focusWindow(app.window);
        }
        return;
      }
    }
    openApp(app.id);
  };

  const timeStr = formatDate(now, TIME_FMT, locale);
  const dateStr = formatDate(now, DATE_FMT, locale);

  return (
    <>
      <nav className="win11-taskbar" aria-label="Windows 11 Taskbar">
        {/* Left corner widget trigger (weather/news) */}
        <div className="win11-taskbar-left">
          <button
            type="button"
            className="win11-weather-btn"
            onClick={toggleMissionControl}
            title={locale === "fa" ? "ویجت‌ها و آب‌وهوا" : "Widgets"}
          >
            <span className="text-sm">🌤️ 9°C</span>
            <span className="text-xs text-white/70 max-xl:hidden">Tabriz</span>
          </button>
        </div>

        {/* Centered System & App Icons */}
        <div className="win11-taskbar-center">
          {/* Start Button */}
          <button
            ref={startBtnRef}
            type="button"
            className={clsx("win11-tb-icon win11-start-btn", startOpen && "is-active")}
            aria-label="Start"
            aria-expanded={startOpen}
            onClick={() => setStartOpen((v) => !v)}
          >
            <WindowsLogo className="size-5 text-[#00adef]" />
          </button>

          {/* Search Button */}
          <button
            type="button"
            className="win11-tb-icon"
            aria-label={t("spotlight.aria")}
            onClick={openSpotlight}
          >
            <Search className="size-4 text-white/80" />
          </button>

          {/* Task View / Mission Control Button */}
          <button
            type="button"
            className="win11-tb-icon max-md:hidden"
            aria-label={t("menu.missionControl")}
            onClick={toggleMissionControl}
          >
            <LayoutGrid className="size-4 text-white/80" />
          </button>

          <div className="win11-tb-sep" aria-hidden="true" />

          {/* Pinned & Running Apps */}
          {dockLayout.map((id) => {
            if (id === "|") return null;
            const app = byId[id];
            if (!app) return null;
            const isRunning = app.window && !app.data && windows[app.window]?.isOpen;
            const isFocused = focused === app.window && isRunning && !windows[app.window]?.isMinimized;
            const name = t(`app.${app.id}`);

            return (
              <button
                key={id}
                type="button"
                className={clsx(
                  "win11-tb-icon win11-app-btn",
                  isRunning && "is-running",
                  isFocused && "is-focused",
                )}
                aria-label={name}
                onClick={() => handleAppClick(app)}
                title={name}
              >
                <img src={app.icon} alt="" className="size-6 object-contain" draggable="false" />
                {isRunning && <span className="win11-running-pill" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Right System Tray */}
        <div className="win11-taskbar-right">
          {/* Prominent OS Switcher pill in Windows 11 System Tray */}
          <div ref={osFlyoutRef} className="relative">
            <button
              type="button"
              className={clsx("win11-tray-btn win11-os-badge", osFlyoutOpen && "is-active")}
              onClick={() => setOsFlyoutOpen((v) => !v)}
              title={locale === "fa" ? "سوییچ سیستم‌عامل" : "Switch Operating System"}
              aria-expanded={osFlyoutOpen}
            >
              <span>🪟 Win 11</span>
              <ChevronUp className="size-3 opacity-60" />
            </button>

            {osFlyoutOpen && (
              <div className="win11-os-flyout" role="menu">
                <p className="win11-flyout-title">
                  {locale === "fa" ? "تغییر سیستم‌عامل" : "Switch Operating System"}
                </p>
                <button
                  type="button"
                  className={clsx("win11-flyout-item", osMode === "macos" && "is-active")}
                  onClick={() => {
                    setOsMode("macos");
                    setOsFlyoutOpen(false);
                  }}
                >
                  <span className="text-lg">🍎</span>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="font-semibold text-white">macOS Sonoma</p>
                    <p className="text-xs text-white/50">Cupertino Glass & Floating Dock</p>
                  </div>
                </button>
                <button
                  type="button"
                  className={clsx("win11-flyout-item", osMode === "windows" && "is-active")}
                  onClick={() => setOsFlyoutOpen(false)}
                >
                  <span className="text-lg">🪟</span>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="font-semibold text-[#60cdff]">Windows 11 (Active)</p>
                    <p className="text-xs text-white/50">Fluent Taskbar & Start Menu</p>
                  </div>
                </button>
                <button
                  type="button"
                  className={clsx("win11-flyout-item", osMode === "ubuntu" && "is-active")}
                  onClick={() => {
                    setOsMode("ubuntu");
                    setOsFlyoutOpen(false);
                  }}
                >
                  <span className="text-lg">🐧</span>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="font-semibold text-white">Ubuntu 24.04 LTS</p>
                    <p className="text-xs text-white/50">Canonical Yaru & GNOME Shell</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            className="win11-tray-btn win11-lang-btn"
            onClick={toggleLocale}
            title={t("menu.languageAria")}
          >
            <span className="font-semibold text-xs tracking-wider">
              {locale === "fa" ? "فار" : "ENG"}
            </span>
          </button>

          <div className="win11-tray-group" onClick={openSpotlight}>
            <Wifi className="size-3.5" />
            <Volume2 className="size-3.5" />
          </div>

          <div
            className="win11-clock-btn"
            onClick={() => useUiStore.getState().toggleControlCenter()}
            title="Date & Time"
          >
            <span className="win11-clock-time">{timeStr}</span>
            <span className="win11-clock-date">{dateStr}</span>
          </div>

          {/* Far Right "Show Desktop" line */}
          <button
            type="button"
            className="win11-peek-desktop"
            onClick={toggleShowDesktop}
            title={t("menu.showDesktop")}
            aria-label={t("menu.showDesktop")}
          />
        </div>
      </nav>

      {/* Windows 11 Start Menu Popup */}
      <WindowsStartMenu
        open={startOpen}
        onClose={() => setStartOpen(false)}
        startBtnRef={startBtnRef}
      />
    </>
  );
};

export default WindowsTaskbar;
