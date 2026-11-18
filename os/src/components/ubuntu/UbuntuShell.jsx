import { useState } from "react";
import clsx from "clsx";
import {
  Grid,
  Power,
  Volume2,
  Wifi,
} from "lucide-react";
import { apps, dockLayout } from "#constants";
import useWindowStore, { selectFocusedKey } from "#store/window";
import useUiStore from "#store/ui";
import useSettingsStore from "#store/settings";
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
          <span className="ubuntu-app-title">
            {focused ? t(`window.${focused}`) : "Ubuntu 24.04 LTS"}
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
