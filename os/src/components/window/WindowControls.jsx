import { ChevronLeft, Minus, Plus, Square, X } from "lucide-react";
import useWindowStore from "#store/window";
import useSettingsStore from "#store/settings";
import { useWindowContext } from "./WindowContext";
import { useT } from "../../i18n";

// macOS traffic lights on desktop, Windows 11 min/max/close, Ubuntu circles, or iOS back on phone.
const WindowControls = ({ backLabel, onBack }) => {
  const t = useT();
  const label = backLabel ?? t("win.home");
  const { windowKey, isMobile, isMaximized } = useWindowContext();
  const osMode = useSettingsStore((s) => s.osMode || "macos");
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize);

  if (isMobile) {
    return (
      <button
        type="button"
        className="ios-back"
        onClick={onBack ?? (() => closeWindow(windowKey))}
        aria-label={t("win.backTo", { label })}
      >
        <ChevronLeft aria-hidden="true" className="rtl-flip" />
        <span>{label}</span>
      </button>
    );
  }

  if (osMode === "windows") {
    return (
      <div className="win11-controls">
        <button
          type="button"
          className="win11-btn win11-btn-min"
          aria-label={t("win.minimize")}
          onClick={() => minimizeWindow(windowKey)}
        >
          <Minus className="size-3.5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="win11-btn win11-btn-max"
          aria-label={isMaximized ? t("win.restore") : t("win.zoom")}
          onClick={() => toggleMaximize(windowKey)}
        >
          <Square className="size-3" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          className="win11-btn win11-btn-close"
          aria-label={t("win.close")}
          onClick={() => closeWindow(windowKey)}
        >
          <X className="size-3.5" strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  if (osMode === "ubuntu") {
    return (
      <div className="ubuntu-controls">
        <button
          type="button"
          className="ub-btn ub-btn-min"
          aria-label={t("win.minimize")}
          onClick={() => minimizeWindow(windowKey)}
        >
          <Minus className="size-3" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          className="ub-btn ub-btn-max"
          aria-label={isMaximized ? t("win.restore") : t("win.zoom")}
          onClick={() => toggleMaximize(windowKey)}
        >
          <Square className="size-2.5" strokeWidth={2.5} />
        </button>
        <button
          type="button"
          className="ub-btn ub-btn-close"
          aria-label={t("win.close")}
          onClick={() => closeWindow(windowKey)}
        >
          <X className="size-3" strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  return (
    <div className="traffic-lights">
      <button
        type="button"
        className="tl tl-close"
        aria-label={t("win.close")}
        onClick={() => closeWindow(windowKey)}
      >
        <X aria-hidden="true" strokeWidth={3} />
      </button>
      <button
        type="button"
        className="tl tl-min"
        aria-label={t("win.minimize")}
        onClick={() => minimizeWindow(windowKey)}
      >
        <Minus aria-hidden="true" strokeWidth={3} />
      </button>
      <button
        type="button"
        className="tl tl-max"
        aria-label={isMaximized ? t("win.restore") : t("win.zoom")}
        onClick={() => toggleMaximize(windowKey)}
      >
        <Plus aria-hidden="true" strokeWidth={3} />
      </button>
    </div>
  );
};

export default WindowControls;
