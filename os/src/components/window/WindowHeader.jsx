import clsx from "clsx";
import useWindowStore from "#store/window";
import useSettingsStore from "#store/settings";
import { apps, windowToApp } from "#constants/apps.js";
import WindowControls from "./WindowControls";
import { useWindowContext } from "./WindowContext";

// Title bar: drag handle on desktop (double-click to zoom), nav bar on phones.
const WindowHeader = ({
  title,
  children,
  className,
  backLabel,
  onBack,
  hideTitleOnMobile = false,
}) => {
  const { windowKey, setHandle, isMobile } = useWindowContext();
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize);
  const osMode = useSettingsStore((s) => s.osMode || "macos");

  const onDoubleClick = (e) => {
    if (isMobile || e.target.closest("button, a, input, [data-no-drag]")) return;
    toggleMaximize(windowKey);
  };

  const appMeta = windowToApp[windowKey] ? apps.find((a) => a.id === windowToApp[windowKey]) : null;

  return (
    <div
      ref={setHandle}
      className={clsx("window-header", `is-os-${osMode}`, className)}
      onDoubleClick={onDoubleClick}
    >
      {osMode === "macos" || isMobile ? (
        <>
          <WindowControls backLabel={backLabel} onBack={onBack} />
          {title && !(isMobile && hideTitleOnMobile) ? (
            <h2 className="window-title">{title}</h2>
          ) : null}
          {children}
        </>
      ) : osMode === "windows" ? (
        <>
          <div className="win11-header-title-wrap">
            {appMeta?.icon && (
              <img src={appMeta.icon} alt="" className="win11-header-icon" />
            )}
            {title ? <h2 className="window-title">{title}</h2> : null}
          </div>
          <div className="win11-header-content">{children}</div>
          <WindowControls backLabel={backLabel} onBack={onBack} />
        </>
      ) : (
        /* ubuntu mode */
        <>
          <div className="ubuntu-header-left">
            {appMeta?.icon && (
              <img src={appMeta.icon} alt="" className="ubuntu-header-icon" />
            )}
          </div>
          {title ? <h2 className="window-title">{title}</h2> : null}
          <div className="ubuntu-header-content">{children}</div>
          <WindowControls backLabel={backLabel} onBack={onBack} />
        </>
      )}
    </div>
  );
};

export default WindowHeader;
