// Notes app content: the "about" lives in Notes.
// Inline syntax: [label](https://…) opens a link, [label](app:safari/repodest)
// opens a window (app:<window>/<optional data id>).

import { asset } from "../lib/paths";
import {
  profile,
  profileFa,
  skills,
  skillCategoriesFa,
  funFacts,
  funFactsFa,
  ventures,
  venturesFa,
} from "./profile";

const TIMELINE_PATH = asset("/timeline/");

const ventureBlocks = (list) =>
  list.flatMap((v) => [
    { type: "h2", text: `${v.name} · ${v.role}` },
    {
      type: "p",
      text: v.href
        ? `${v.what}. ${v.text} [${v.href.replace(/^https:\/\//, "")}](${v.href})`
        : `${v.what}. ${v.text}`,
    },
  ]);

export const notes = [
  {
    id: "about",
    title: "about me",
    emoji: "👋",
    pinned: true,
    date: "Nov 2026",
    blocks: [
      { type: "h1", text: `hey, I'm ${profile.firstName}` },
      {
        type: "p",
        text: "I'm a Computer Science & Computer Architecture graduate (B.Sc. + M.Sc.) from Iran who turns real daily friction into fast, complete, shipped software products.",
      },
      {
        type: "p",
        text: "Across 47+ public repositories and 33+ live deployments, I build offline-first web apps, FSRS vocabulary learning platforms, multi-provider AI gateways, Telegram Mini Apps, Windows desktop tools, and 3D browser games.",
      },
      { type: "h2", text: "right now" },
      {
        type: "ul",
        items: [
          "Growing [Repodest](app:safari/repodest) + its Chrome extension: instant GitHub repo health scores & 1-click LLM prompt digests.",
          "Advancing [Readner / Leitner Pro Max](app:safari/leitner-pro-max) & [SpeakAI Coach](app:safari/speakai-coach) for FSRS vocabulary and real-time voice practice.",
          "Building multi-provider AI infrastructure on Telegram with [9router](app:safari/9router) and [AIDahl](app:safari/aidahl).",
          "Exploring developer tools like [MCP Studio](app:safari/mcp-studio), [DataLens](app:safari/datalens), and [A11y Inspector](app:safari/a11y-inspector).",
          `Shipping in the open: [release timeline](${TIMELINE_PATH}) · [education & background](app:notes/ventures).`,
        ],
      },
      { type: "h2", text: "elsewhere" },
      {
        type: "ul",
        items: [
          "[GitHub (@mohsen-niksirat)](https://github.com/mohsen-niksirat)",
          "[Telegram (@mohsenniksirat)](https://t.me/mohsenniksirat)",
          "[Mohsen's Tech Blog](https://mohsen-niksirat.github.io/mohsen-tech-blog/)",
        ],
      },
      {
        type: "p",
        text: `${profile.availability}. [Send me a message](app:mail) or [read my resume](app:resume).`,
      },
    ],
  },
  {
    id: "building",
    title: "what I'm building",
    emoji: "🛠️",
    pinned: true,
    date: "Nov 2026",
    blocks: [
      { type: "h1", text: "what I'm building" },
      {
        type: "p",
        text: "Practical, browser-first and desktop-native tools that run fast, work offline whenever possible, and treat Persian (RTL) and English as equals.",
      },
      { type: "h2", text: "Repodest" },
      {
        type: "p",
        text: "Paste any GitHub repository URL to inspect its health score, language breakdown, file explorer, and pack files into an LLM-ready prompt. My most-starred project. [Case study](app:safari/repodest) · [Live app](https://mohsen-niksirat.github.io/Repodest/)",
      },
      { type: "h2", text: "Readner · Leitner Pro Max" },
      {
        type: "p",
        text: "FSRS spaced-repetition vocabulary suite with an integrated PDF reader, WordWeb semantic graph, and 4,500+ CEFR words across 13 languages. [Case study](app:safari/leitner-pro-max) · [Live app](https://mohsen-niksirat.github.io/Leitner-Pro-Max/)",
      },
      { type: "h2", text: "9router & AIDahl" },
      {
        type: "p",
        text: "Multi-provider AI routing, key pooling, BYOK streaming chat, and agentic image/research workflows inside Telegram. [9router](app:safari/9router) · [AIDahl](app:safari/aidahl)",
      },
      { type: "h2", text: "everything else" },
      {
        type: "p",
        text: "A 3D Godot 4 browser roguelite, an in-browser CSV/SQL workbench, an MCP server IDE, a Rust + Tauri download manager, a Persian Windows typing assistant, and 30+ more live tools. [Browse all projects](app:safari).",
      },
    ],
  },
  {
    id: "ventures",
    title: "education & focus",
    emoji: "🎓",
    pinned: true,
    date: "Nov 2026",
    blocks: [
      { type: "h1", text: "education & focus" },
      {
        type: "p",
        text: "Academic computer science & architecture training paired with prolific independent product engineering.",
      },
      ...ventureBlocks(ventures),
    ],
  },
  {
    id: "stack",
    title: "stack & tools",
    emoji: "🧰",
    date: "Nov 2026",
    blocks: [
      { type: "h1", text: "stack & tools" },
      ...skills.map((group) => ({
        type: "row",
        label: group.category,
        text: group.items.join(", "),
      })),
      {
        type: "p",
        text: "Prefer the command line? Open [Terminal](app:terminal) and run neofetch or skills.",
      },
    ],
  },
  {
    id: "facts",
    title: "how I work",
    emoji: "🧩",
    date: "Nov 2026",
    blocks: [
      { type: "h1", text: "how I work" },
      { type: "ul", items: funFacts },
    ],
  },
  {
    id: "roadmap",
    title: "site roadmap",
    emoji: "🗺️",
    date: "Nov 2026",
    blocks: [
      { type: "h1", text: "site roadmap" },
      {
        type: "todo",
        items: [
          { text: "macOS desktop with draggable, resizable & tileable windows", done: true },
          { text: "14 deep case studies in Safari + 14 more repos in archive", done: true },
          { text: "Spotlight search, interactive zsh Terminal & VS Code viewer", done: true },
          { text: "iOS home screen with live Tabriz weather & music player", done: true },
          { text: "Bilingual Persian (RTL + Jalali calendar) & English", done: true },
          { text: "Live GitHub contribution calendar, commits & star counts", done: true },
          { text: "SEO project pages (/p/) & Build in Public release feed", done: true },
          { text: "Interactive architecture deep-dives on Mohsen's Tech Blog", done: false },
        ],
      },
    ],
  },
];

// ── Persian ────────────────────────────────────────────────────────────────

export const notesFa = [
  {
    id: "about",
    title: "درباره من",
    emoji: "👋",
    pinned: true,
    date: "آبان ۱۴۰۵",
    blocks: [
      { type: "h1", text: `سلام، من ${profileFa.firstName} هستم` },
      {
        type: "p",
        text: "فارغ‌التحصیل کارشناسی علوم کامپیوتر و کارشناسی ارشد مهندسی کامپیوتر (گرایش معماری سیستم‌ها — دانشگاه تبریز) هستم و تمرکزم روی تبدیل نیازهای واقعی روزمره به نرم‌افزارهای سریع، کامل و منتشرشده است.",
      },
      {
        type: "p",
        text: "در بیش از ۴۷ مخزن عمومی و ۳۳+ اپلیکیشن زنده، ابزارهای یادگیری زبان مبتنی بر FSRS، وب‌اپ‌های آفلاین‌محور (PWA)، درگاه‌های هوش مصنوعی، بات‌ها و مینی‌اپ‌های تلگرام، ابزارهای دسکتاپ و بازی‌های سه‌بعدی مرورگری ساخته‌ام.",
      },
      { type: "h2", text: "این روزها" },
      {
        type: "ul",
        items: [
          "توسعه [Repodest](app:safari/repodest) و افزونه مرورگر آن برای تحلیل سریع مخزن‌های گیت‌هاب و ساخت پرامپت آماده LLM.",
          "ارتقای اکوسیستم آموزش زبان با [Readner / لایتنر پرو مکس](app:safari/leitner-pro-max) و مربی مکالمه صوتی [SpeakAI Coach](app:safari/speakai-coach).",
          "ساخت زیرساخت چندمدله هوش مصنوعی در تلگرام با [9router](app:safari/9router) و دستیار [AIDahl](app:safari/aidahl).",
          "توسعه ابزارهای مهندسی مثل [MCP Studio](app:safari/mcp-studio)، [DataLens](app:safari/datalens) و [A11y Inspector](app:safari/a11y-inspector).",
          `ساختن در ملأعام: [خط زمانی انتشارها](${TIMELINE_PATH}) · [تحصیلات و مسیر کاری](app:notes/ventures).`,
        ],
      },
      { type: "h2", text: "راه‌های ارتباطی" },
      {
        type: "ul",
        items: [
          "[گیت‌هاب (@mohsen-niksirat)](https://github.com/mohsen-niksirat)",
          "[تلگرام (@mohsenniksirat)](https://t.me/mohsenniksirat)",
          "[وبلاگ فنی من](https://mohsen-niksirat.github.io/mohsen-tech-blog/)",
        ],
      },
      {
        type: "p",
        text: `${profileFa.availability}. [ارسال پیام مستقیم](app:mail) یا [مشاهده رزومه](app:resume).`,
      },
    ],
  },
  {
    id: "building",
    title: "چه می‌سازم",
    emoji: "🛠️",
    pinned: true,
    date: "آبان ۱۴۰۵",
    blocks: [
      { type: "h1", text: "چه می‌سازم" },
      {
        type: "p",
        text: "ابزارهای دقیق، سریع و کاربردی که بدون پیچیدگی اضافه یک مسئله واقعی را حل می‌کنند؛ بیشترشان آفلاین کار می‌کنند، داده کاربر را روی دستگاه خودش نگه می‌دارند و از زبان فارسی و راست‌به‌چپ پشتیبانی کامل دارند.",
      },
      { type: "h2", text: "Repodest" },
      {
        type: "p",
        text: "تحلیلگر سمت کلاینت مخزن‌های گیت‌هاب همراه امتیاز سلامت، نمودار زبان‌ها و بسته‌بندی فایل‌ها برای ارسال به ChatGPT، Claude و Gemini. پرستاره‌ترین مخزن من. [مطالعه موردی](app:safari/repodest) · [اجرای برنامه](https://mohsen-niksirat.github.io/Repodest/)",
      },
      { type: "h2", text: "Readner · لایتنر پرو مکس" },
      {
        type: "p",
        text: "پلتفرم یادگیری هوشمند واژگان با الگوریتم FSRS، خواننده PDF داخلی، گراف WordWeb و ۴٬۵۰۰+ لغت CEFR در ۱۳ زبان. [مطالعه موردی](app:safari/leitner-pro-max) · [اجرای برنامه](https://mohsen-niksirat.github.io/Leitner-Pro-Max/)",
      },
      { type: "h2", text: "9router و AIDahl" },
      {
        type: "p",
        text: "درگاه توزیع بار کلیدهای هوش مصنوعی و دستیار چندمدله BYOK در تلگرام با پشتیبانی از استریم زنده و حالت ایجنت. [9router](app:safari/9router) · [AIDahl](app:safari/aidahl)",
      },
      { type: "h2", text: "سایر پروژه‌ها" },
      {
        type: "p",
        text: "بازی سه‌بعدی روگ‌لایت با Godot 4 در مرورگر، میزکار تحلیل داده DataLens، استودیوی سرورهای MCP، دانلودمنیجر Rust + Tauri، دستیار تایپ ویندوز «روان» و ده‌ها وب‌اپ دیگر. [مشاهده همه پروژه‌ها](app:safari).",
      },
    ],
  },
  {
    id: "ventures",
    title: "تحصیلات و تمرکز",
    emoji: "🎓",
    pinned: true,
    date: "آبان ۱۴۰۵",
    blocks: [
      { type: "h1", text: "تحصیلات و حوزه‌های تمرکز" },
      {
        type: "p",
        text: "ترکیب پایه آکادمیک علوم و معماری کامپیوتر با ساخت مستمر محصولات نرم‌افزاری متن‌باز.",
      },
      ...ventureBlocks(ventures.map((v) => ({ ...v, ...venturesFa[v.id] }))),
    ],
  },
  {
    id: "stack",
    title: "ابزارها و تکنولوژی‌ها",
    emoji: "🧰",
    date: "آبان ۱۴۰۵",
    blocks: [
      { type: "h1", text: "ابزارها و تکنولوژی‌ها" },
      ...skills.map((group) => ({
        type: "row",
        label: skillCategoriesFa[group.category] ?? group.category,
        text: group.items.join("، "),
      })),
      {
        type: "p",
        text: "نسخه خط فرمان را دوست دارید؟ [ترمینال](app:terminal) را باز کنید و دستور neofetch یا skills را بزنید.",
      },
    ],
  },
  {
    id: "facts",
    title: "چطور کار می‌کنم",
    emoji: "🧩",
    date: "آبان ۱۴۰۵",
    blocks: [
      { type: "h1", text: "اصول و روش کار من" },
      { type: "ul", items: funFactsFa },
    ],
  },
  {
    id: "roadmap",
    title: "نقشه راه سایت",
    emoji: "🗺️",
    date: "آبان ۱۴۰۵",
    blocks: [
      { type: "h1", text: "نقشه راه پورتفولیو" },
      {
        type: "todo",
        items: [
          { text: "میزکار macOS با پنجره‌های قابل جابه‌جایی و تغییر اندازه", done: true },
          { text: "۱۴ مطالعه موردی کامل در سافاری + ۱۴ پروژه دیگر در آرشیو", done: true },
          { text: "جستجوی Spotlight، ترمینال تعاملی zsh و محیط VS Code", done: true },
          { text: "صفحه موبایل شبیه iOS با آب‌وهوای زنده تبریز و موزیک‌پلیر", done: true },
          { text: "نسخه دوزبانه فارسی (راست‌به‌چپ + تقویم شمسی) و انگلیسی", done: true },
          { text: "گراف مشارکت‌ها، آخرین کامیت‌ها و ستاره‌های زنده گیت‌هاب", done: true },
          { text: "صفحات سئوشده پروژه‌ها (/p/) و خط زمانی انتشارها", done: true },
          { text: "یادداشت‌های عمیق طراحی معماری در وبلاگ فنی", done: false },
        ],
      },
    ],
  },
];
