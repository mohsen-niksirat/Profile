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

const Text = ({ data }) => {
  const t = useT();
  const { locations } = useContent();
  if (!data) return <WindowHeader title={t("window.txtfile")} />;
  const item = findItem(Object.values(locations), data.id) ?? data;
  const { name, title, subtitle, description = [] } = item;

  return (
    <>
      <WindowHeader title={name} backLabel={t("win.back")} />
      <article className="window-body text-doc">
        {title && <h1 className="text-doc-title">{title}</h1>}
        {subtitle && <p className="text-doc-subtitle">{subtitle}</p>}
        {description.map((para) => (
          <p key={para.slice(0, 32)} className="prose-p">
            {para}
          </p>
        ))}
      </article>
    </>
  );
};

export default Text;
