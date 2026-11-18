// App registry: what lives in the dock, on the iOS home screen and in Spotlight.
// `window` = which window key the app opens; `href` = external link instead.

import { asset } from "../lib/paths";

export const apps = [
  {
    id: "finder",
    name: "Finder",
    icon: asset("/images/finder.png"),
    window: "finder",
    keywords: "files folders projects browse",
  },
  {
    id: "safari",
    name: "Projects",
    icon: asset("/images/safari.png"),
    window: "safari",
    keywords: "work portfolio case studies safari apps",
  },
  {
    id: "notes",
    name: "Notes",
    icon: asset("/images/Notes.png"),
    window: "notes",
    keywords: "about me bio education university now notes",
  },
  {
    id: "photos",
    name: "Photos",
    icon: asset("/images/photos.png"),
    window: "photos",
    keywords: "screenshots gallery images",
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: asset("/images/terminal.png"),
    window: "terminal",
    keywords: "shell skills command line zsh",
  },
  {
    id: "calculator",
    name: "Calculator",
    icon: asset("/images/calculator.webp"),
    window: "calculator",
    keywords: "calculator math arithmetic",
  },
  {
    id: "vscode",
    name: "VS Code",
    icon: asset("/images/microsoft_visual_studio_code.png"),
    window: "vscode",
    keywords: "code editor source",
  },
  {
    id: "contact",
    name: "Contacts",
    icon: asset("/images/contact.webp"),
    window: "contact",
    keywords: "contact telegram github tabriz hire",
  },
  {
    id: "resume",
    name: "Resume",
    icon: asset("/images/pdf.png"),
    window: "resume",
    keywords: "cv resume education download pdf",
  },
  {
    id: "settings",
    name: "Settings",
    icon: asset("/images/settings.png"),
    window: "settings",
    keywords: "preferences wallpaper appearance dark mode language",
  },
  {
    id: "mail",
    name: "Mail",
    icon: asset("/images/mail.webp"),
    window: "mail",
    keywords: "message telegram write contact form",
  },
  {
    id: "github",
    name: "GitHub",
    icon: asset("/images/github.webp"),
    href: "https://github.com/mohsen-niksirat",
    keywords: "source repository code github mohsen",
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: asset("/images/telegram.png"),
    href: "https://t.me/mohsenniksirat",
    keywords: "message chat telegram @mohsenniksirat",
  },
  {
    id: "trash",
    name: "Trash",
    icon: asset("/images/trash.png"),
    window: "finder",
    data: { location: "trash" },
    keywords: "old archive",
  },
];

export const getApp = (id) => apps.find((a) => a.id === id);

// macOS dock order. "|" renders a separator.
export const dockLayout = [
  "finder",
  "safari",
  "notes",
  "photos",
  "terminal",
  "calculator",
  "vscode",
  "contact",
  "resume",
  "settings",
  "|",
  "mail",
  "github",
  "telegram",
  "|",
  "trash",
];

// iOS home screen.
export const mobileHomeApps = [
  "safari",
  "notes",
  "photos",
  "finder",
  "terminal",
  "calculator",
  "vscode",
  "resume",
  "settings",
  "github",
  "telegram",
  "trash",
];
export const mobileDockApps = ["safari", "notes", "contact", "mail"];

// Labels come from ui.js (menu.<id>).
export const menuLinks = [
  { id: "about", window: "notes" },
  { id: "projects", window: "safari" },
  { id: "resume", window: "resume" },
  { id: "contact", window: "contact" },
];

// Window titles shown in the menu bar when the window is focused.
export const windowTitles = {
  finder: "Finder",
  safari: "Safari",
  notes: "Notes",
  photos: "Photos",
  terminal: "Terminal",
  calculator: "Calculator",
  vscode: "Code",
  contact: "Contacts",
  resume: "Preview",
  settings: "System Settings",
  txtfile: "TextEdit",
  imgfile: "Preview",
  mail: "Mail",
};

// Which dock app a window belongs to (for running indicators).
export const windowToApp = {
  finder: "finder",
  safari: "safari",
  notes: "notes",
  photos: "photos",
  terminal: "terminal",
  calculator: "calculator",
  vscode: "vscode",
  contact: "contact",
  resume: "resume",
  settings: "settings",
  mail: "mail",
};

export const WINDOW_KEYS = Object.keys(windowTitles);

export const wallpapers = [
  {
    id: "default",
    name: "Ventura",
    light: asset("/images/wallpapers/wallpaper.webp"),
    dark: asset("/images/wallpapers/dark-default.webp"),
  },
  {
    id: "nature",
    name: "Nature",
    light: asset("/images/wallpapers/light1.webp"),
    dark: asset("/images/wallpapers/dark1.webp"),
  },
  {
    id: "tech",
    name: "Tech",
    light: asset("/images/wallpapers/light2.webp"),
    dark: asset("/images/wallpapers/dark2.webp"),
  },
  {
    id: "abstract",
    name: "Abstract",
    light: asset("/images/wallpapers/light3.webp"),
    dark: asset("/images/wallpapers/dark3.webp"),
  },
  {
    id: "monterey",
    name: "Monterey",
    light: asset("/images/wallpapers/monterey-light.webp"),
    dark: asset("/images/wallpapers/monterey-dark.webp"),
  },
  {
    id: "bigsur",
    name: "Big Sur",
    light: asset("/images/wallpapers/bigsur-light.webp"),
    dark: asset("/images/wallpapers/bigsur-dark.webp"),
  },
];
