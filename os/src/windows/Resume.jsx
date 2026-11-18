import { createPortal } from "react-dom";
import { Download, Printer } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import ResumeDocument from "../components/ResumeDocument";
import { useWindowContext } from "../components/window/WindowContext";
import { useT } from "../i18n";
import { useContent } from "../i18n/content";

const Resume = () => {
  const t = useT();
  // My designed PDF, in the visitor's language.
  const RESUME_PDF = useContent().profile.resumeUrl;
  const { isVisible } = useWindowContext();
  return (
  <>
    <WindowHeader title={t("resume.title")}>
      <div className="header-actions" data-no-drag>
        <button
          type="button"
          className="toolbar-btn max-md:hidden"
          onClick={() => window.print()}
          aria-label={t("resume.print")}
        >
          <Printer aria-hidden="true" />
        </button>
        <a
          className="toolbar-btn"
          href={RESUME_PDF}
          download
          aria-label={t("resume.download")}
        >
          <Download aria-hidden="true" />
        </a>
      </div>
    </WindowHeader>
    <div className="window-body resume-viewer">
      <div className="resume-paper">
        <ResumeDocument />
      </div>
      <a className="btn btn-primary resume-download" href={RESUME_PDF} download>
        <Download aria-hidden="true" /> {t("resume.downloadPdf")}
      </a>
    </div>
    {isVisible &&
      createPortal(
        <div className="print-root">
          <ResumeDocument />
        </div>,
        document.body,
      )}
  </>
  );
};

export default Resume;
