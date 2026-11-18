import { useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useGSAP } from "@gsap/react";
import { openProject, openWindow } from "../../lib/actions";
import { asset } from "../../lib/paths";
import { prefetchWindow } from "../../windows";
import { useT } from "../../i18n";

gsap.registerPlugin(Draggable);

// `label` is a ui.js key; `name` is a crisp 1-line repo folder name.
const ICONS = [
  { id: "projects", label: "desktop.projects", icon: asset("/images/folder.png"), open: () => openWindow("finder", { location: "work" }), prefetch: "finder" },
  { id: "repodest", name: "Repodest", icon: asset("/images/folder.png"), open: () => openProject("repodest"), prefetch: "safari" },
  { id: "leitner-pro-max", name: "Readner", icon: asset("/images/folder.png"), open: () => openProject("leitner-pro-max"), prefetch: "safari" },
  { id: "9router", name: "9Router", icon: asset("/images/folder.png"), open: () => openProject("9router"), prefetch: "safari" },
  { id: "about", label: "desktop.about", icon: asset("/images/txt.png"), open: () => openWindow("notes", { noteId: "about" }), prefetch: "notes" },
  { id: "resume", label: "desktop.resume", icon: asset("/images/pdf.png"), open: () => openWindow("resume"), prefetch: "resume" },
];

// Files on the desktop. Drag them around; click to open.
const DesktopIcons = () => {
  const ref = useRef(null);
  const lastDrag = useRef(0);
  const t = useT();
  const nameOf = (item) => item.name ?? t(item.label);

  useGSAP(
    () => {
      const items = ref.current.querySelectorAll(".desktop-icon");
      const instances = [...items].map((el) =>
        Draggable.create(el, {
          bounds: ref.current.parentElement,
          zIndexBoost: false,
          dragClickables: true,
          minimumMovement: 4,
          onDragEnd: () => {
            lastDrag.current = Date.now();
          },
        })[0],
      );
      return () => instances.forEach((d) => d.kill());
    },
    { scope: ref },
  );

  return (
    <ul ref={ref} className="desktop-icons" aria-label={t("desktop.icons")}>
      {ICONS.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className="desktop-icon"
            onPointerEnter={() => prefetchWindow(item.prefetch)}
            onClick={() => Date.now() - lastDrag.current > 250 && item.open()}
          >
            <img src={item.icon} alt="" width="64" height="64" draggable="false" />
            <span>{nameOf(item)}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DesktopIcons;
