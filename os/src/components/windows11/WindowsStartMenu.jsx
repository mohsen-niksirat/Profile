import { useRef } from "react";
import clsx from "clsx";
import {
  ChevronRight,
  Computer,
  FolderGit2,
  Lock,
  LogOut,
  Power,
  RotateCcw,
  Search,
} from "lucide-react";
import { apps, projects } from "#constants";
import useUiStore from "#store/ui";
import useSettingsStore from "#store/settings";
import Avatar from "../Avatar";
import { useDismiss } from "../../hooks/useDismiss";
import { openApp, openProject } from "../../lib/actions";
import { useContent } from "../../i18n/content";
import { useLocale, useT } from "../../i18n";

const WindowsStartMenu = ({ open, onClose, startBtnRef }) => {
  const menuRef = useRef(null);
  useDismiss(open, [menuRef, startBtnRef], onClose);
  const t = useT();
  const locale = useLocale();
  const { profile } = useContent();
  const osMode = useSettingsStore((s) => s.osMode || "macos");
  const setOsMode = useSettingsStore((s) => s.setOsMode);
  const ui = useUiStore.getState;

  if (!open) return null;

  const pinnedApps = apps.filter((a) => a.id !== "trash");
  const recommendedProjects = projects.slice(0, 4);

  const handleLaunch = (appId) => {
    onClose();
    openApp(appId);
  };

  const handleProject = (projectId) => {
    onClose();
    openProject(projectId);
  };

  const switchOs = (nextOs) => {
    setOsMode(nextOs);
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="win11-start-menu"
      role="dialog"
      aria-label="Windows 11 Start Menu"
    >
      {/* Search Input Bar */}
      <div className="win11-start-search">
        <button
          type="button"
          className="win11-search-trigger"
          onClick={() => {
            onClose();
            ui().openSpotlight();
          }}
        >
          <Search className="size-4 text-white/50" />
          <span>{locale === "fa" ? "جستجو در برنامه‌ها و پروژه‌ها…" : "Search for apps, projects, files…"}</span>
        </button>
      </div>

      {/* Prominent OS Switcher Banner in Start Menu */}
      <div className="win11-start-os-box">
        <span className="win11-os-box-label">
          {locale === "fa" ? "سیستم‌عامل دسکتاپ:" : "Operating System:"}
        </span>
        <div className="win11-os-box-grid">
          <button
            type="button"
            className={clsx("win11-os-box-btn", osMode === "macos" && "is-active")}
            onClick={() => switchOs("macos")}
          >
            <span>🍎 macOS</span>
          </button>
          <button
            type="button"
            className={clsx("win11-os-box-btn", osMode === "windows" && "is-active")}
            onClick={() => switchOs("windows")}
          >
            <span>🪟 Win 11</span>
          </button>
          <button
            type="button"
            className={clsx("win11-os-box-btn", osMode === "ubuntu" && "is-active")}
            onClick={() => switchOs("ubuntu")}
          >
            <span>🐧 Ubuntu</span>
          </button>
        </div>
      </div>

      {/* Pinned Section */}
      <div className="win11-start-section">
        <div className="win11-section-header">
          <span className="win11-section-title">{locale === "fa" ? "سنجاق‌شده‌ها" : "Pinned"}</span>
          <button
            type="button"
            className="win11-section-action"
            onClick={() => {
              onClose();
              ui().openSpotlight();
            }}
          >
            <span>{locale === "fa" ? "همه برنامه‌ها" : "All apps"}</span>
            <ChevronRight className="size-3 rtl-flip" />
          </button>
        </div>

        <div className="win11-pinned-grid">
          {pinnedApps.map((app) => (
            <button
              key={app.id}
              type="button"
              className="win11-app-card"
              onClick={() => handleLaunch(app.id)}
            >
              <img src={app.icon} alt="" className="win11-app-icon" />
              <span className="win11-app-name">{t(`app.${app.id}`)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Projects Section */}
      <div className="win11-start-section">
        <div className="win11-section-header">
          <span className="win11-section-title">{locale === "fa" ? "پیشنهادها و پروژه‌ها" : "Recommended"}</span>
        </div>

        <div className="win11-rec-grid">
          {recommendedProjects.map((p) => (
            <button
              key={p.id}
              type="button"
              className="win11-rec-card"
              onClick={() => handleProject(p.id)}
            >
              <div className="win11-rec-icon-wrap">
                <FolderGit2 className="size-5 text-sky-400" />
              </div>
              <div className="min-w-0 flex-1 text-start">
                <p className="win11-rec-title">{p.title}</p>
                <p className="win11-rec-sub">{p.kind}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* User & Power Footer */}
      <div className="win11-start-footer">
        <div className="win11-footer-user">
          <Avatar size={34} />
          <div className="min-w-0">
            <p className="win11-user-name">{profile.name}</p>
            <p className="win11-user-role">Administrator</p>
          </div>
        </div>

        {/* OS Quick Switcher buttons inside Windows 11 Start */}
        <div className="win11-footer-actions">
          <div className="win11-os-picker" title="Switch OS">
            <button
              type="button"
              className={clsx("win11-os-btn", osMode === "macos" && "is-active")}
              onClick={() => switchOs("macos")}
              title="Switch to macOS"
            >
              🍎
            </button>
            <button
              type="button"
              className={clsx("win11-os-btn", osMode === "windows" && "is-active")}
              onClick={() => switchOs("windows")}
              title="Windows 11"
            >
              🪟
            </button>
            <button
              type="button"
              className={clsx("win11-os-btn", osMode === "ubuntu" && "is-active")}
              onClick={() => switchOs("ubuntu")}
              title="Switch to Ubuntu Linux"
            >
              🐧
            </button>
          </div>

          <button
            type="button"
            className="win11-power-btn"
            title={locale === "fa" ? "قفل کردن صفحه" : "Lock"}
            onClick={() => {
              onClose();
              ui().lockScreen();
            }}
          >
            <Lock className="size-4" />
          </button>
          <button
            type="button"
            className="win11-power-btn"
            title={locale === "fa" ? "راه‌اندازی مجدد" : "Restart"}
            onClick={() => {
              onClose();
              ui().triggerBoot();
            }}
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WindowsStartMenu;
