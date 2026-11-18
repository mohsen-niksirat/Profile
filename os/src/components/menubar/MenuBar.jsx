import { useCallback, useRef, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, Wifi } from "lucide-react";
import AppleLogo from "./AppleLogo";
import ControlCenter from "./ControlCenter";
import { menuLinks } from "#constants";
import useWindowStore, { selectFocusedKey } from "#store/window";
import useUiStore from "#store/ui";
import useSettingsStore from "#store/settings";
import { useNow } from "../../hooks/useNow";
import { useDismiss } from "../../hooks/useDismiss";
import { useToggleDark, useIsDark } from "../../hooks/useTheme";
import { openApp, openWindow } from "../../lib/actions";
import { prefetchWindow } from "../../windows";
import { formatDate, toggleLocale, useLocale, useT } from "../../i18n";
import { useContent } from "../../i18n/content";

const CLOCK = { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" };

const MenuBar = () => {
  const now = useNow();
  const t = useT();
  const locale = useLocale();
  const { profile } = useContent();
  const focused = useWindowStore(selectFocusedKey);
  const { controlCenterOpen, toggleControlCenter, closeControlCenter, openSpotlight } =
    useUiStore();
  const [activeMenu, setActiveMenu] = useState(null); // "apple" | "view" | "window" | null
  const leftNavRef = useRef(null);
  const ccBtnRef = useRef(null);
  const ccRef = useRef(null);

  const closeMenus = useCallback(() => setActiveMenu(null), []);
  useDismiss(Boolean(activeMenu), [leftNavRef], closeMenus);
  useDismiss(controlCenterOpen, [ccBtnRef, ccRef], closeControlCenter);
  const [osMenuOpen, setOsMenuOpen] = useState(false);
  const osMenuRef = useRef(null);
  useDismiss(osMenuOpen, [osMenuRef], () => setOsMenuOpen(false));

  const toggleDark = useToggleDark();
  const isDark = useIsDark();
  const closeAll = useWindowStore((s) => s.closeAll);
  const ui = useUiStore.getState;

  const clock = formatDate(now, CLOCK, locale);

  const appleItems = [
    { id: "about", label: t("menu.aboutMe"), run: () => openApp("notes") },
    { id: "projects", label: t("menu.projects"), run: () => openApp("safari") },
    { id: "resume", label: t("menu.resume"), run: () => openApp("resume") },
    { id: "calc", label: t("menu.calculator"), run: () => openApp("calculator") },
    "-",
    { id: "settings", label: t("menu.settings"), run: () => openApp("settings") },
    { id: "dark", label: t(isDark ? "menu.lightMode" : "menu.darkMode"), run: toggleDark },
    { id: "spotlight", label: t("menu.spotlight"), hint: "⌘K", run: () => ui().openSpotlight() },
    { id: "mc", label: t("menu.missionControl"), hint: "F3", run: () => ui().toggleMissionControl() },
    { id: "kb", label: t("menu.shortcuts"), hint: "?", run: () => ui().openShortcuts() },
    "-",
    { id: "lock", label: t("menu.lockScreen"), hint: "⌥⇧L", run: () => ui().lockScreen() },
    { id: "restart", label: t("menu.restart"), run: () => ui().triggerBoot() },
    "-",
    {
      id: "os-win",
      label: locale === "fa" ? "سوییچ به ویندوز ۱۱" : "Switch to Windows 11",
      hint: "Win11",
      run: () => useSettingsStore.getState().setOsMode("windows"),
    },
    {
      id: "os-ub",
      label: locale === "fa" ? "سوییچ به اوبونتو لینوکس" : "Switch to Ubuntu Linux",
      hint: "Ubuntu",
      run: () => useSettingsStore.getState().setOsMode("ubuntu"),
    },
    "-",
    { id: "closeAll", label: t("menu.closeAll"), run: closeAll },
  ];

  const viewItems = [
    { id: "wallpaper", label: t("menu.wallpaper"), run: () => openApp("settings") },
    { id: "dark", label: t(isDark ? "menu.lightMode" : "menu.darkMode"), run: toggleDark },
    { id: "mc", label: t("menu.missionControl"), hint: "F3", run: () => ui().toggleMissionControl() },
    { id: "desktop", label: t("menu.showDesktop"), hint: "⌥D", run: () => useWindowStore.getState().toggleShowDesktop() },
    "-",
    { id: "lang", label: t("menu.languageAria"), hint: "⌥L", run: toggleLocale },
  ];

  const windowItems = [
    {
      id: "minimize",
      label: t("menu.minimize"),
      hint: "⌥M",
      disabled: !focused,
      run: () => focused && useWindowStore.getState().minimizeWindow(focused),
    },
    {
      id: "zoom",
      label: t("menu.zoom"),
      hint: "⌥Z",
      disabled: !focused,
      run: () => focused && useWindowStore.getState().toggleMaximize(focused),
    },
    {
      id: "cycle",
      label: t("menu.cycle"),
      hint: "⌥`",
      run: () => useWindowStore.getState().cycleWindows(),
    },
    "-",
    { id: "closeAll", label: t("menu.closeAll"), run: closeAll },
  ];

  // PuruVJ/macos-web inspired top-bar hover switching
  const handleMenuHover = (id) => {
    if (activeMenu && activeMenu !== id) {
      setActiveMenu(id);
    }
  };

  const handleMenuClick = (id) => {
    setActiveMenu((curr) => (curr === id ? null : id));
  };

  const renderDropdown = (items) => (
    <div className="menu-dropdown" role="menu">
      {items.map((item, i) =>
        item === "-" ? (
          <div key={i} className="menu-sep" role="separator" />
        ) : (
          <button
            key={item.id}
            type="button"
            role="menuitem"
            disabled={item.disabled}
            className="menu-item"
            onClick={() => {
              closeMenus();
              item.run();
            }}
          >
            <span>{item.label}</span>
            {item.hint && <kbd className="ltr">{item.hint}</kbd>}
          </button>
        ),
      )}
    </div>
  );

  return (
    <header className="menubar">
      <nav ref={leftNavRef} className="menubar-left" aria-label={t("menu.menuBar")}>
        {/* Apple Menu */}
        <div className="relative">
          <button
            type="button"
            className="menubar-item menubar-apple"
            aria-label={t("menu.appleMenu")}
            aria-haspopup="menu"
            aria-expanded={activeMenu === "apple"}
            onClick={() => handleMenuClick("apple")}
            onPointerEnter={() => handleMenuHover("apple")}
          >
            <AppleLogo className="h-[15px] w-auto" />
          </button>
          {activeMenu === "apple" && renderDropdown(appleItems)}
        </div>

        {/* Current Active Window / User Title */}
        <span className="menubar-item menubar-app">
          {focused ? t(`window.${focused}`) : profile.name}
        </span>

        {/* View Menu */}
        <div className="relative">
          <button
            type="button"
            className="menubar-item"
            aria-haspopup="menu"
            aria-expanded={activeMenu === "view"}
            onClick={() => handleMenuClick("view")}
            onPointerEnter={() => handleMenuHover("view")}
          >
            {t("menu.view")}
          </button>
          {activeMenu === "view" && renderDropdown(viewItems)}
        </div>

        {/* Window Menu */}
        <div className="relative">
          <button
            type="button"
            className="menubar-item"
            aria-haspopup="menu"
            aria-expanded={activeMenu === "window"}
            onClick={() => handleMenuClick("window")}
            onPointerEnter={() => handleMenuHover("window")}
          >
            {t("menu.window")}
          </button>
          {activeMenu === "window" && renderDropdown(windowItems)}
        </div>

        {/* Direct Navigation Links */}
        {menuLinks.map((link) => (
          <button
            key={link.id}
            type="button"
            className="menubar-item"
            onPointerEnter={() => prefetchWindow(link.window)}
            onClick={() => {
              closeMenus();
              openWindow(link.window);
            }}
          >
            {t(`menu.${link.id}`)}
          </button>
        ))}
      </nav>

      <div className="notch" aria-hidden="true" />

      <div className="menubar-right">
        {/* Prominent OS Switcher pill in macOS MenuBar */}
        <div ref={osMenuRef} className="relative">
          <button
            type="button"
            className="menubar-item menubar-os-badge"
            onClick={() => setOsMenuOpen((v) => !v)}
            title="Switch Operating System"
            aria-expanded={osMenuOpen}
          >
            <span>🍎 macOS</span>
            <ChevronDown className="size-3 opacity-60" />
          </button>
          {osMenuOpen && (
            <div className="menu-dropdown menubar-os-dropdown" role="menu">
              <button
                type="button"
                className="menu-item is-active font-semibold"
                onClick={() => setOsMenuOpen(false)}
              >
                <span>🍎 macOS Sonoma</span>
                <span className="text-xs opacity-60">Active</span>
              </button>
              <button
                type="button"
                className="menu-item"
                onClick={() => {
                  setOsMenuOpen(false);
                  useSettingsStore.getState().setOsMode("windows");
                }}
              >
                <span>🪟 Windows 11 Fluent</span>
              </button>
              <button
                type="button"
                className="menu-item"
                onClick={() => {
                  setOsMenuOpen(false);
                  useSettingsStore.getState().setOsMode("ubuntu");
                }}
              >
                <span>🐧 Ubuntu 24.04 LTS</span>
              </button>
            </div>
          )}
        </div>
        <button
          type="button"
          className="menubar-item menubar-lang"
          onClick={toggleLocale}
          aria-label={t("menu.languageAria")}
          lang={locale === "fa" ? "en" : "fa"}
        >
          {t("menu.language")}
        </button>
        <span className="menubar-item max-lg:hidden" aria-hidden="true">
          <Wifi className="size-4" />
        </span>
        <button
          type="button"
          className="menubar-item"
          onClick={openSpotlight}
          aria-label={t("menu.spotlightAria")}
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
        <button
          ref={ccBtnRef}
          type="button"
          className="menubar-item"
          onClick={toggleControlCenter}
          aria-label={t("menu.controlCenter")}
          aria-expanded={controlCenterOpen}
        >
          <SlidersHorizontal className="size-4" aria-hidden="true" />
        </button>
        <time className="menubar-item menubar-clock tabular-nums" dateTime={now.toISOString()}>
          {locale === "fa" ? clock.replace(/،/g, "") : clock.replace(/,/g, "").replace(/\s+at\s+/, " ")}
        </time>
      </div>

      {controlCenterOpen && (
        <div ref={ccRef} className="contents">
          <ControlCenter />
        </div>
      )}
    </header>
  );
};

export default MenuBar;
