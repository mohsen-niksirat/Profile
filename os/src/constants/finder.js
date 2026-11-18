// Finder tree, generated from the (localized) project data so it never drifts.

import { asset } from "../lib/paths";

export const finderLabels = {
  en: {
    projects: "Projects",
    archive: "More Shipped Repos",
    about: "About me",
    resume: "Resume",
    trash: "Trash",
    caseStudy: "Case study",
    sourceCode: "Source code",
    aboutFile: "about-me.txt",
    notes: "Notes",
    resumeFile: "Resume.pdf",
    trashReadme: "why-is-it-empty.txt",
    trashTitle: "Why the Trash is empty",
    trashSubtitle: "47+ repos shipped, zero abandoned in a drawer",
    trashBody: [
      "Ideas don't sit half-finished in a private folder here — they get scoped down to their core value, built cleanly, and shipped live on GitHub Pages or open source so real people can use them.",
      "Browse Finder, open Projects in Safari, or visit github.com/mohsen-niksirat to explore all 47+ public repositories.",
    ],
  },
  fa: {
    projects: "پروژه‌ها",
    archive: "سایر مخزن‌های منتشرشده",
    about: "درباره من",
    resume: "رزومه",
    trash: "سطل زباله",
    caseStudy: "مطالعه موردی",
    sourceCode: "سورس کد",
    aboutFile: "درباره-من.txt",
    notes: "یادداشت‌ها",
    resumeFile: "رزومه.pdf",
    trashReadme: "چرا-خالی-است.txt",
    trashTitle: "چرا سطل زباله خالی است؟",
    trashSubtitle: "۴۷+ مخزن منتشرشده، نه ایده‌های بایگانی‌شده",
    trashBody: [
      "ایده‌ها اینجا نیمه‌کاره در پوشه‌های خصوصی رها نمی‌شوند؛ به هسته اصلی مسئله شکسته می‌شوند، تمیز پیاده‌سازی می‌شوند و به‌صورت زنده و متن‌باز منتشر می‌گردند.",
      "برای دیدن همه ۴۷+ مخزن عمومی می‌توانید از پنجره سافاری، فایندر یا صفحه گیت‌هاب من دیدن کنید.",
    ],
  },
};

const FOLDER_ICON = asset("/images/folder.png");
const TXT_ICON = asset("/images/txt.png");
const SAFARI_ICON = asset("/images/safari.png");
const GITHUB_ICON = asset("/images/github.webp");
const IMAGE_ICON = asset("/images/image.png");
const NOTES_ICON = asset("/images/Notes.png");
const CONTACT_ICON = asset("/images/contact.webp");
const PDF_ICON = asset("/images/pdf.png");

const projectFolder = (project, l) => ({
  id: project.id,
  name: project.title,
  kind: "folder",
  icon: FOLDER_ICON,
  children: [
    {
      id: `${project.id}-txt`,
      name: `${project.slug}.txt`,
      kind: "file",
      fileType: "txt",
      icon: TXT_ICON,
      title: project.title,
      subtitle: project.tagline,
      description: [project.summary, ...project.description.slice(1)],
    },
    {
      id: `${project.id}-case`,
      name: l.caseStudy,
      kind: "file",
      fileType: "app",
      icon: SAFARI_ICON,
      target: { window: "safari", data: { projectId: project.id } },
    },
    ...project.links.map((link, i) => ({
      id: `${project.id}-link-${i}`,
      name: link.kind === "source" ? l.sourceCode : link.label,
      kind: "file",
      fileType: "url",
      icon: link.kind === "source" ? GITHUB_ICON : SAFARI_ICON,
      href: link.href,
    })),
    ...project.screenshots.slice(0, 3).map((src, i) => ({
      id: `${project.id}-img-${i}`,
      name: `${project.slug}-${i + 1}.webp`,
      kind: "file",
      fileType: "img",
      icon: IMAGE_ICON,
      imageUrl: src,
    })),
  ],
});

export const buildLocations = ({ profile, projects, archive, trashedProjects }, locale = "en") => {
  const l = finderLabels[locale] ?? finderLabels.en;
  return {
    work: {
      id: "work",
      name: l.projects,
      icon: asset("/icons/work.svg"),
      kind: "folder",
      children: [
        ...projects.map((p) => projectFolder(p, l)),
        {
          id: "archive",
          name: l.archive,
          kind: "folder",
          icon: FOLDER_ICON,
          children: archive.map((item) => ({
            id: `archive-${item.id}`,
            name: item.title,
            kind: "file",
            fileType: "url",
            icon: SAFARI_ICON,
            href: item.live,
          })),
        },
      ],
    },
    about: {
      id: "about",
      name: l.about,
      icon: asset("/icons/info.svg"),
      kind: "folder",
      children: [
        {
          id: "about-txt",
          name: l.aboutFile,
          kind: "file",
          fileType: "txt",
          icon: TXT_ICON,
          title: profile.name,
          subtitle: profile.headline,
          description: profile.summary,
        },
        {
          id: "about-notes",
          name: l.notes,
          kind: "file",
          fileType: "app",
          icon: NOTES_ICON,
          target: { window: "notes" },
        },
        {
          id: "about-contact",
          name: "mohsen.vcf",
          kind: "file",
          fileType: "app",
          icon: CONTACT_ICON,
          target: { window: "contact" },
        },
        {
          id: "about-resume",
          name: l.resumeFile,
          kind: "file",
          fileType: "app",
          icon: PDF_ICON,
          target: { window: "resume" },
        },
      ],
    },
    resume: {
      id: "resume",
      name: l.resume,
      icon: asset("/icons/file.svg"),
      kind: "folder",
      children: [
        {
          id: "resume-pdf",
          name: l.resumeFile,
          kind: "file",
          fileType: "app",
          icon: PDF_ICON,
          target: { window: "resume" },
        },
      ],
    },
    trash: {
      id: "trash",
      name: l.trash,
      icon: asset("/icons/trash.svg"),
      kind: "folder",
      children: [
        {
          id: "trash-readme",
          name: l.trashReadme,
          kind: "file",
          fileType: "txt",
          icon: TXT_ICON,
          title: l.trashTitle,
          subtitle: l.trashSubtitle,
          description: l.trashBody,
        },
        ...trashedProjects.map((item) => ({
          id: `trash-${item.name}`,
          name: item.name,
          kind: "file",
          fileType: "url",
          icon: FOLDER_ICON,
          href: item.href,
        })),
      ],
    },
  };
};
