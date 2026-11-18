// Single source of truth for who I am and how to reach me.
// Everything else (Notes, Contact, Terminal, Resume, meta tags) reads from here.

import { asset } from "../lib/paths";

export const profile = {
  name: "Mohsen Niksirat",
  firstName: "Mohsen",
  initials: "MN",
  // Shown on the iPhone home screen (wallpaper + profile widget), in Contacts
  // and in the Control Center.
  photo: asset("/images/me.webp"),
  avatar: asset("/images/me-avatar.webp"),
  role: "Software Engineer · AI Product Builder",
  title: "M.Sc. Computer Architecture · Full-Stack & AI Product Builder",
  headline:
    "CS grad (BSc + MSc) turning real daily problems into fast, offline-first web apps, AI gateways, and learning tools",
  location: "Tabriz, Iran",
  timezone: "Asia/Tehran",
  telegramHandle: "@mohsenniksirat",
  telegramUrl: "https://t.me/mohsenniksirat",
  githubHandle: "@mohsen-niksirat",
  githubUrl: "https://github.com/mohsen-niksirat",
  website: "https://mohsen-niksirat.github.io/Profile/",
  host: "mohsen-niksirat.github.io/Profile",
  resumeUrl: asset("/files/mohsen-niksirat-resume.pdf"),
  availability: "Open to remote collaborations, AI product roles & open-source partnerships",
  summary: [
    "I'm a Computer Science & Computer Architecture graduate (B.Sc. at University of Mohaghegh Ardabili, M.Sc. at University of Tabriz) focused on turning ideas into complete, shipped software products.",
    "Across 47+ public repositories and 33+ live applications, I build offline-first PWAs, FSRS spaced-repetition language tools, multi-provider AI gateways, Telegram Mini Apps, desktop utilities in Python & Rust/Tauri, and 3D browser games in Godot 4. Everything I ship is fast, practical, and privacy-respecting by design.",
  ],
};

// Persian overrides, merged over `profile` when the site is in Persian.
export const profileFa = {
  name: "محسن نیک‌سیرت",
  firstName: "محسن",
  role: "مهندس نرم‌افزار · سازنده محصولات هوش مصنوعی",
  title: "کارشناسی ارشد معماری سیستم‌های کامپیوتری · توسعه‌دهنده وب و ابزارهای AI",
  headline:
    "فارغ‌التحصیل علوم و مهندسی کامپیوتر؛ تبدیل مسئله‌های واقعی روزمره به وب‌اپ‌های آفلاین، درگاه‌های هوش مصنوعی و ابزارهای یادگیری",
  resumeUrl: asset("/files/mohsen-niksirat-resume-fa.pdf"),
  location: "تبریز، ایران",
  availability: "آماده همکاری دورکاری، پروژه‌های محصول‌محور هوش مصنوعی و مشارکت متن‌باز",
  summary: [
    "فارغ‌التحصیل کارشناسی علوم کامپیوتر (دانشگاه محقق اردبیلی) و کارشناسی ارشد مهندسی کامپیوتر گرایش معماری سیستم‌ها (دانشگاه تبریز) هستم و تمرکزم روی تبدیل ایده‌ها به محصولات کامل، کاربردی و واقعاً منتشرشده است.",
    "در بیش از ۴۷ مخزن عمومی و ۳۳+ اپلیکیشن زنده، ابزارهای یادگیری واژگان مبتنی بر FSRS، وب‌اپ‌های آفلاین‌محور (PWA)، درگاه‌های چندسرویس‌دهنده هوش مصنوعی، بات‌ها و مینی‌اپ‌های تلگرام، ابزارهای دسکتاپ با Python و Rust/Tauri و بازی‌های سه‌بعدی مرورگری با Godot 4 ساخته‌ام.",
  ],
};

export const weatherFallback = {
  city: "Tabriz",
  temperature: 16,
  high: 20,
  low: 9,
  code: 1,
  condition: "Partly Cloudy",
  live: false,
};

export const socials = [
  {
    id: "github",
    label: "GitHub",
    handle: "@mohsen-niksirat",
    href: "https://github.com/mohsen-niksirat",
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@mohsenniksirat",
    href: "https://t.me/mohsenniksirat",
  },
  {
    id: "blog",
    label: "Tech Blog",
    handle: "mohsen-tech-blog",
    href: "https://mohsen-niksirat.github.io/mohsen-tech-blog/",
  },
];

export const skillCategoriesFa = {
  "Web & Frontend": "وب و فرانت‌اند",
  "AI & Telegram": "هوش مصنوعی و تلگرام",
  "Languages & Systems": "زبان‌ها و سیستم",
  "Data & Learning": "داده و یادگیری",
  "Game & Graphics": "بازی‌سازی و گرافیک",
  "DevOps & Craft": "انتشار و مهندسی محصول",
};

export const skills = [
  {
    category: "Web & Frontend",
    items: ["JavaScript (ES2025)", "TypeScript", "React 19", "HTML5", "CSS3 / Tailwind", "PWA", "IndexedDB", "WCAG / A11y"],
  },
  {
    category: "AI & Telegram",
    items: ["Gemini API", "OpenAI / OpenRouter", "Groq & DeepSeek", "MCP Servers", "Telegram Bot API", "Telegram Mini Apps", "Agentic Workflows"],
  },
  {
    category: "Languages & Systems",
    items: ["Python", "Rust", "Tauri v2", "C / C++", "C#", "Java", "Kotlin", "Node.js", "FastAPI"],
  },
  {
    category: "Data & Learning",
    items: ["FSRS Spaced Repetition", "PDF.js", "Chart.js", "SVG Visualization", "PostgreSQL", "Supabase", "AES-GCM WebCrypto"],
  },
  {
    category: "Game & Graphics",
    items: ["Godot 4", "GDScript", "Unity 3D", "HTML5 Canvas", "WebGL / WASM", "Web Audio Synthesis"],
  },
  {
    category: "DevOps & Craft",
    items: ["Git & GitHub Actions", "GitHub Pages", "Cloudflare Pages", "Chrome Extensions (MV3)", "RTL & Jalali Localization", "Zero-Dependency Apps"],
  },
];

// Education & Focus Pillars (used in Notes and Resume).
export const ventures = [
  {
    id: "msc-tabriz",
    role: "M.Sc. in Computer Engineering",
    name: "University of Tabriz",
    what: "Computer Systems Architecture",
    href: "https://tabrizu.ac.ir",
    text: "Graduate research and systems coursework in computer architecture, performance analysis, and low-level hardware/software trade-offs — shaping how I design lean, zero-bloat applications on the web and desktop.",
  },
  {
    id: "bsc-ardabil",
    role: "B.Sc. in Computer Science",
    name: "University of Mohaghegh Ardabili",
    what: "Algorithms, Data Structures & Software Foundations",
    text: "Built a strong mathematical and algorithmic foundation across C/C++, Java, Python, data structures, and theory of computation — later inspiring visual teaching tools like CodeVis and Biosphera.",
  },
  {
    id: "oss-lab",
    role: "Independent Product Builder",
    name: "Open-Source App Ecosystem",
    what: "47+ Public Repos · 33+ Live Apps",
    href: "https://github.com/mohsen-niksirat",
    text: "Shipping practical software end-to-end: FSRS vocabulary suites (Readner / Leitner Pro Max), developer analyzers (Repodest, MCP Studio, A11y Inspector), multi-provider AI gateways (9router, AIDahl), Windows tools (Kite Downloader, Ravaan), and 3D browser games.",
  },
];

export const venturesFa = {
  "msc-tabriz": {
    role: "کارشناسی ارشد مهندسی کامپیوتر",
    name: "دانشگاه تبریز",
    what: "گرایش معماری سیستم‌های کامپیوتری",
    text: "پژوهش و دروس تخصصی در معماری سیستم‌های کامپیوتری، تحلیل کارایی و تعامل سخت‌افزار و نرم‌افزار؛ دیدگاهی که باعث شد همیشه اپ‌هایی سبک، سریع و بدون وابستگی اضافه بسازم.",
  },
  "bsc-ardabil": {
    role: "کارشناسی علوم کامپیوتر",
    name: "دانشگاه محقق اردبیلی",
    what: "الگوریتم‌ها، ساختمان داده و مبانی نرم‌افزار",
    text: "پایه‌ریزی عمیق در الگوریتم‌ها، ساختمان داده و برنامه‌نویسی با C/C++، Java و Python که بعدها الهام‌بخش ساخت ابزارهای آموزشی بصری مثل CodeVis و شبیه‌ساز تکاملی Biosphera شد.",
  },
  "oss-lab": {
    role: "سازنده مستقل محصول",
    name: "اکوسیستم ابزارهای متن‌باز",
    what: "۴۷+ مخزن عمومی · ۳۳+ اپلیکیشن زنده",
    text: "طراحی، ساخت و انتشار ده‌ها محصول کاربردی از صفر تا صد: پلتفرم‌های یادگیری زبان با الگوریتم FSRS (لایتنر پرو مکس و SpeakAI)، ابزارهای توسعه‌دهندگان (Repodest، MCP Studio، A11y Inspector)، درگاه‌های هوش مصنوعی (9router و AIDahl) و بازی‌های سه‌بعدی تحت وب.",
  },
};

// How I work: core engineering principles.
export const funFacts = [
  "Shipped beats hypothetical. I care that every idea runs live in a real browser, phone, or desktop — 33+ of my repositories have instant zero-signup live deployments.",
  "Local-first & privacy by architecture. From AES-GCM encrypted API vaults to in-browser CSV/SQL workbenches, user data stays in IndexedDB on their own device whenever possible.",
  "Right tool for every layer: single-file Vanilla JS when zero dependencies win, TypeScript + React for rich IDEs like MCP Studio, Python for AI bots, Rust + Tauri for desktop speed, and Godot 4 / Kotlin for games.",
  "AI-assisted end to end — prompt, architect, test, verify, deploy — using AI as a force multiplier while keeping strict ownership over architecture and UX craft.",
  "First-class bilingual software: Persian (RTL, Vazirmatn, smart ZWNJ, Jalali dates) and English treated with equal typographic care.",
];

export const funFactsFa = [
  "محصولِ منتشرشده بر ایدهٔ روی کاغذ اولویت دارد. برایم مهم است هر پروژه واقعاً در مرورگر، موبایل یا دسکتاپ کار کند — بیش از ۳۳ مخزن من همین لحظه بدون ثبت‌نام قابل استفاده‌اند.",
  "معماری محلی‌محور (Local-First) و حفظ حریم خصوصی: از مدیریت کلیدهای API با رمزنگاری AES-GCM تا تحلیلگر داده DataLens، داده‌های کاربر تا جای ممکن روی دستگاه خودش باقی می‌مانند.",
  "ابزار مناسب برای هر مسئله: جاوااسکریپت خالص و تک‌فایل برای سرعت و سادگی، TypeScript و React برای استودیوهای تعاملی مثل MCP Studio، پایتون برای بات‌های هوشمند، Rust و Tauri برای دسکتاپ و Godot 4 برای بازی‌های سه‌بعدی.",
  "توسعه سرتاسری به کمک هوش مصنوعی — از طراحی معماری و پرامپت تا تست و استقرار خودکار — با حفظ دقت مهندسی و کیفیت تجربه کاربری.",
  "پشتیبانی درجه‌یک دوزبانه: فارسی (راست‌به‌چپ، تایپوگرافی تمیز، نیم‌فاصله هوشمند و تقویم شمسی) در کنار انگلیسی.",
];
