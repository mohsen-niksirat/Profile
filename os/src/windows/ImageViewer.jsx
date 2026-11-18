import WindowHeader from "../components/window/WindowHeader";
import { useT } from "../i18n";
import { useContent } from "../i18n/content";

// Finder items are stored as window data in the language they were opened
// in. Look the item up again by id so it follows a language switch.
const findItem = (nodes, id) => {
  for (const node of nodes) {
    if (node.id === id) return node;
    const hit = node.children && findItem(node.children, id);
    if (hit) return hit;
  }
  return null;
};

const ImageViewer = ({ data }) => {
  const t = useT();
  const { locations } = useContent();
  if (!data) return <WindowHeader title={t("window.imgfile")} />;
  const { name, imageUrl } = findItem(Object.values(locations), data.id) ?? data;

  return (
    <>
      <WindowHeader title={name} backLabel={t("win.back")} />
      <div className="window-body image-viewer">
        <img src={imageUrl} alt={name} decoding="async" />
      </div>
    </>
  );
};

export default ImageViewer;
