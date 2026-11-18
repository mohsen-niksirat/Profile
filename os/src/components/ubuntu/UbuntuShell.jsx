import { useRef, useState } from "react";
import clsx from "clsx";
import {
  ChevronDown,
  Grid,
  Power,
  Volume2,
  Wifi,
} from "lucide-react";
import { apps, dockLayout } from "#constants";
import useWindowStore, { selectFocusedKey } from "#store/window";
import useUiStore from "#store/ui";
import useSettingsStore from "#store/settings";
import { useDismiss } from "../../hooks/useDismiss";
import { useNow } from "../../hooks/useNow";
import { openApp } from "../../lib/actions";
import { formatDate, toggleLocale, useLocale, useT } from "../../i18n";

const byId = Object.fromEntries(apps.map((a) => [a.id, a]));

const UBUNTU_CLOCK = {
  weekday: "short",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
};

const UbuntuShell = () => {
  const [systemOpen, setSystemOpen] = useState(false);
  const [osMenuOpen, setOsMenuOpen] = useState(false);
  const osMenuRef = useRef(null);
  const systemMenuRef = useRef(null);

  useDismiss(osMenuOpen, [osMenuRef], () => setOsMenuOpen(false));
  useDismiss(systemOpen, [systemMenuRef], () => setSystemOpen(false));

  const now = useNow();
  const t = useT();
  const locale = useLocale();
  const windows = useWindowStore((s) => s.windows);
  const focused = useWindowStore(selectFocusedKey);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const openSpotlight = useUiStore((s) => s.openSpotlight);
  const toggleMissionControl = useUiStore((s) => s.toggleMissionControl);
  const setOsMode = useSettingsStore((s) => s.setOsMode);
  const osMode = useSettingsStore((s) => s.osMode || "macos");
  const ui = useUiStore.getState;

  const clock = formatDate(now, UBUNTU_CLOCK, locale);

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

  return (
    <>
      {/* Ubuntu Top Bar (GNOME Shell) */}
      <header className="ubuntu-topbar" aria-label="Ubuntu GNOME Top Bar">
        <div className="ubuntu-topbar-left">
          <button
            type="button"
            className="ubuntu-activities-btn"
            onClick={toggleMissionControl}
          >
            {locale === "fa" ? "فعالیت‌ها" : "Activities"}
          </button>

          {/* Prominent OS Switcher Dropdown on top-left of Ubuntu */}
          <div ref={osMenuRef} className="relative">
            <button
              type="button"
              className={clsx("ubuntu-os-badge", osMenuOpen && "is-active")}
              onClick={() => setOsMenuOpen((v) => !v)}
              aria-expanded={osMenuOpen}
              title={locale === "fa" ? "تغییر سیستم‌عامل" : "Switch Operating System"}
            >
              <span>🐧 Ubuntu 24.04</span>
              <ChevronDown className="size-3.5 opacity-60" />
            </button>

            {osMenuOpen && (
              <div className="ubuntu-os-dropdown" role="menu">
                <p className="ubuntu-os-dropdown-title">
                  {locale === "fa" ? "تغییر محیط دسکتاپ" : "Switch Desktop Environment"}
                </p>
                <button
                  type="button"
                  className={clsx("ubuntu-os-dropdown-item", osMode === "macos" && "is-active")}
                  onClick={() => {
                    setOsMode("macos");
                    setOsMenuOpen(false);
                  }}
                >
                  <span className="text-xl">🍎</span>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="font-semibold text-white">macOS Sonoma</p>
                    <p className="text-xs text-white/50">Cupertino Glass, Top MenuBar & Dock</p>
                  </div>
                </button>
                <button
                  type="button"
                  className={clsx("ubuntu-os-dropdown-item", osMode === "windows" && "is-active")}
                  onClick={() => {
                    setOsMode("windows");
                    setOsMenuOpen(false);
                  }}
                >
                  <span className="text-xl">🪟</span>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="font-semibold text-white">Windows 11 Fluent</p>
                    <p className="text-xs text-white/50">Redmond Taskbar, Start Menu & Mica</p>
                  </div>
                </button>
                <button
                  type="button"
                  className={clsx("ubuntu-os-dropdown-item", osMode === "ubuntu" && "is-active")}
                  onClick={() => setOsMenuOpen(false)}
                >
                  <span className="text-xl">🐧</span>
                  <div className="min-w-0 flex-1 text-start">
                    <p className="font-semibold text-orange-400">Ubuntu 24.04 LTS (Active)</p>
                    <p className="text-xs text-white/50">Canonical Yaru & GNOME Shell</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          <span className="ubuntu-app-title max-md:hidden">
            {focused ? t(`window.${focused}`) : ""}
          </span>
        </div>

        <div className="ubuntu-topbar-center">
          <button
            type="button"
            className="ubuntu-clock-btn tabular-nums"
            onClick={() => ui().toggleControlCenter()}
          >
            {clock}
          </button>
        </div>

        <div className="ubuntu-topbar-right">
          {/* Explicit Switch OS button on the right */}
          <button
            type="button"
            className="ubuntu-switch-os-pill"
            onClick={() => setOsMenuOpen((v) => !v)}
            title="Switch OS (macOS / Windows / Ubuntu)"
          >
            <span>💻</span>
            <span className="text-xs font-semibold max-sm:hidden">
              {locale === "fa" ? "سوییچ OS" : "Switch OS"}
            </span>
          </button>

          <button
            type="button"
            className="ubuntu-tray-btn"
            onClick={toggleLocale}
            title={t("menu.languageAria")}
          >
            <span className="font-semibold text-xs tracking-wider">
              {locale === "fa" ? "FA" : "EN"}
            </span>
          </button>

          <div ref={systemMenuRef} className="relative">
            <button
              type="button"
              className={clsx("ubuntu-system-pill", systemOpen && "is-active")}
              onClick={() => setSystemOpen((v) => !v)}
              aria-label="System Menu"
            >
              <Wifi className="size-3.5" />
              <Volume2 className="size-3.5" />
              <Power className="size-3.5 text-orange-400" />
            </button>

            {/* Ubuntu System Dropdown Menu */}
            {systemOpen && (
              <div className="ubuntu-system-menu" role="menu">
                <div className="ubuntu-os-switch-header">
                  <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">
                    Select OS Environment
                  </span>
                  <div className="ubuntu-os-options">
                    <button
                      type="button"
                      className={clsx("ubuntu-os-item", osMode === "macos" && "is-active")}
                      onClick={() => {
                        setOsMode("macos");
                        setSystemOpen(false);
                      }}
                    >
                      🍎 macOS Sonoma
                    </button>
                    <button
                      type="button"
                      className={clsx("ubuntu-os-item", osMode === "windows" && "is-active")}
                      onClick={() => {
                        setOsMode("windows");
                        setSystemOpen(false);
                      }}
                    >
                      🪟 Windows 11
                    </button>
                    <button
                      type="button"
                      className={clsx("ubuntu-os-item", osMode === "ubuntu" && "is-active")}
                      onClick={() => {
                        setOsMode("ubuntu");
                        setSystemOpen(false);
                      }}
                    >
                      🐧 Ubuntu 24.04
                    </button>
                  </div>
                </div>

                <div className="ubuntu-menu-sep" />

                <button
                  type="button"
                  className="ubuntu-menu-item"
                  onClick={() => {
                    setSystemOpen(false);
                    ui().lockScreen();
                  }}
                >
                  <span>{locale === "fa" ? "قفل کردن صفحه" : "Lock Screen"}</span>
                </button>
                <button
                  type="button"
                  className="ubuntu-menu-item"
                  onClick={() => {
                    setSystemOpen(false);
                    ui().triggerBoot();
                  }}
                >
                  <span>{locale === "fa" ? "راه‌اندازی مجدد…" : "Restart…"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Ubuntu Left Dock (Yaru Dash) */}
      <nav className="ubuntu-dock" aria-label="Ubuntu Dock">
        <div className="ubuntu-dock-items">
          {dockLayout.map((id, i) => {
            if (id === "|") return <div key={`ub-sep-${i}`} className="ubuntu-dock-sep" />;
            const app = byId[id];
            if (!app) return null;
            const isRunning = app.window && !app.data && windows[app.window]?.isOpen;
            const isFocused = focused === app.window && isRunning && !windows[app.window]?.isMinimized;
            const name = t(`app.${app.id}`);

            return (
              <div key={id} className="ubuntu-dock-item-wrap">
                {isRunning && (
                  <span
                    className={clsx(
                      "ubuntu-running-indicator",
                      isFocused && "is-active",
                    )}
                    aria-hidden="true"
                  />
                )}
                <button
                  type="button"
                  className={clsx("ubuntu-dock-btn", isFocused && "is-focused")}
                  aria-label={name}
                  onClick={() => handleAppClick(app)}
                  title={name}
                >
                  <img src={app.icon} alt="" className="size-8 object-contain" draggable="false" />
                </button>
              </div>
            );
          })}
        </div>

        {/* 9-dot Show Applications Launcher at bottom of left dock */}
        <div className="ubuntu-dock-bottom">
          <button
            type="button"
            className="ubuntu-apps-grid-btn"
            aria-label="Show Applications"
            title="Show Applications"
            onClick={openSpotlight}
          >
            <Grid className="size-6 text-white/80" />
          </button>
        </div>
      </nav>
    </>
  );
};

export default UbuntuShell;
