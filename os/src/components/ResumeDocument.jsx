import { ventures, venturesFa } from "#constants";
import { useContent } from "../i18n/content";
import { localizeDigits, useLocale } from "../i18n";
import { useLiveStats } from "../hooks/useLiveStats";

const TEXT = {
  en: {
    lede: "Computer Science & Computer Architecture graduate (B.Sc. + M.Sc.) building fast, practical, offline-first web applications, AI gateways, FSRS learning platforms, desktop tools, and 3D browser games — 47+ public repositories and 33+ live deployments.",
    locationLabel: "Tabriz, Iran",
    stats: [
      ["47+", "Public repositories"],
      ["33+", "Live deployed apps"],
      ["M.Sc.", "Computer Architecture"],
      ["stars", "GitHub stars, live"],
      ["B2", "English · Native Persian"],
    ],
    ventures: "Education & Focus",
    howIWork: "Engineering Principles",
    principles: [
      [
        "Shipped over theoretical",
        "Every project is scoped to solve a real daily problem and deployed live with zero friction — from single-file offline PWAs to multi-provider Telegram AI gateways.",
      ],
      [
        "Privacy & local-first by design",
        "Whether managing API keys with WebCrypto AES-GCM or analyzing CSV/SQL datasets in DataLens, user data stays locally in the browser whenever possible.",
      ],
      [
        "Polyglot across web, desktop & games",
        "TypeScript/React and Vanilla JS for the web, Python for AI & automation, Rust + Tauri v2 for desktop binaries, Kotlin for Android, and Godot 4 / Unity for 3D games.",
      ],
    ],
    products: "Selected Open-Source Products (Live & Verifiable)",
    productList: [
      [
        "repodest",
        "GitHub repo analyzer & LLM digest builder",
        "100% client-side repository health scoring, Chart.js language/commit insights, interactive file selection, and 1-click prompt packing for ChatGPT, Claude, and Gemini — plus a companion Chrome extension.",
      ],
      [
        "leitner-pro-max",
        "FSRS vocabulary suite & PDF reader",
        "Combines the Free Spaced Repetition Scheduler (FSRS), a built-in PDF reader, WordWeb semantic graphs, and 4,500+ CEFR (A1–C2) words across 13 languages offline, paired with a native Kotlin Android app (ReadNer).",
      ],
      [
        "9router",
        "Multi-provider AI gateway & Telegram Mini App",
        "Pools, routes, and load-balances API keys across Gemini, Groq, DeepSeek, OpenAI, and OpenRouter with Round-Robin, Smart Router, automatic 429 failover, per-user encryption, and multimodal vision.",
      ],
      [
        "aidahl",
        "BYOK Telegram AI assistant & research agent",
        "OpenAI-compatible Telegram assistant with user-supplied API keys, real-time streaming replies, named chat threads, Supabase persistence, and Manus Agent mode for image generation and research.",
      ],
      [
        "speakai-coach",
        "Real-time AI speaking coach & IELTS estimator",
        "Bidirectional live voice practice with 8 coach personas, turn-by-turn grammar & pronunciation feedback, and a 6-dimension evaluation report with IELTS Speaking band estimation.",
      ],
      [
        "horde-survival-3d",
        "3D browser roguelite in Godot 4",
        "Compiled to WebAssembly/WebGL for instant 60 FPS browser play: weapon evolutions, 9 enemy archetypes, 3-phase boss fight, and persistent meta-saves — alongside sibling builds in Kotlin and Unity C#.",
      ],
      [
        "datalens",
        "Zero-upload in-browser data workbench",
        "Inspect, profile, chart (SVG), and convert CSV, JSON, YAML, XML, SQL, and Excel spreadsheets entirely inside the browser as an offline PWA.",
      ],
      [
        "a11y-inspector",
        "WCAG accessibility auditor & CI CLI",
        "In-browser HTML accessibility checker and Node.js CLI scoring contrast, ARIA semantics, and landmarks from 0 to 100 across 6 languages.",
      ],
    ],
    technologies: "Technologies",
    availability: "Connect & Availability",
    availabilityText:
      "Open to remote engineering collaborations, AI product development, and open-source partnerships. Reach out anytime on Telegram (@mohsenniksirat) or explore all 47+ repositories on GitHub (@mohsen-niksirat).",
  },
  fa: {
    lede: "فارغ‌التحصیل کارشناسی علوم کامپیوتر و کارشناسی ارشد مهندسی کامپیوتر (معماری سیستم‌های کامپیوتری — دانشگاه تبریز)؛ متمرکز بر ساخت وب‌اپ‌های آفلاین‌محور، درگاه‌های هوش مصنوعی، ابزارهای یادگیری واژگان FSRS، نرم‌افزارهای دسکتاپ و بازی‌های سه‌بعدی تحت وب — با بیش از ۴۷ مخزن عمومی و ۳۳+ اپلیکیشن زنده.",
    locationLabel: "تبریز، ایران",
    stats: [
      ["۴۷+", "مخزن عمومی در گیت‌هاب"],
      ["۳۳+", "اپلیکیشن زنده و فعال"],
      ["ارشد", "معماری سیستم‌های کامپیوتری"],
      ["stars", "ستاره گیت‌هاب (زنده)"],
      ["B2", "زبان انگلیسی · فارسی بومی"],
    ],
    ventures: "تحصیلات و مسیر تخصصی",
    howIWork: "اصول مهندسی و روش کار",
    principles: [
      [
        "تمرکز بر محصولِ منتشرشده",
        "هر پروژه برای حل یک نیاز واقعی روزمره طراحی شده و بلافاصله به‌صورت زنده و بدون پیچیدگی منتشر می‌شود؛ از PWAهای آفلاین تک‌فایل تا درگاه‌های هوش مصنوعی تلگرام.",
      ],
      [
        "معماری محلی‌محور و حفظ حریم خصوصی",
        "چه در مدیریت کلیدهای API با رمزنگاری AES-GCM و چه در تحلیل فایل‌های داده در DataLens، داده‌های کاربر تا جای ممکن روی دستگاه خودش باقی می‌مانند.",
      ],
      [
        "تسلط چندپلتفرمی متناسب با مسئله",
        "TypeScript/React و جاوااسکریپت خالص برای وب، Python برای بات‌ها و ابزارهای هوشمند، Rust و Tauri v2 برای دسکتاپ، Kotlin برای اندروید و Godot 4 برای بازی‌های سه‌بعدی.",
      ],
    ],
    products: "گزیده محصولات متن‌باز و قابل بررسی",
    productList: [
      [
        "repodest",
        "تحلیلگر مخزن گیت‌هاب و سازنده پرامپت LLM",
        "محاسبه امتیاز سلامت ۰ تا ۱۰۰، نمودار زبان‌ها و کامیت‌ها، مرورگر فایل و بسته‌بندی یک‌کلیکی کدها برای ChatGPT، Claude و Gemini کاملاً در مرورگر — به همراه افزونه کروم.",
      ],
      [
        "leitner-pro-max",
        "پلتفرم یادگیری واژگان FSRS و خواننده PDF",
        "ترکیب زمان‌بند علمی FSRS، خواننده PDF داخلی، گراف معنایی WordWeb و ۴٬۵۰۰+ لغت CEFR (سطح A1 تا C2) در ۱۳ زبان به‌صورت آفلاین، در کنار نسخه اندروید با Kotlin.",
      ],
      [
        "9router",
        "درگاه چندسرویس‌دهنده هوش مصنوعی و مینی‌اپ تلگرام",
        "تجمیع، مسیریابی و توزیع بار کلیدهای API بین Gemini، Groq، DeepSeek، OpenAI و OpenRouter با جایگزینی خودکار هنگام خطای Rate-Limit و رمزنگاری مجزای هر کاربر.",
      ],
      [
        "aidahl",
        "دستیار هوش مصنوعی BYOK و ایجنت تلگرام",
        "دستیار چندمدله تلگرام با قابلیت اتصال کلید شخصی، استریم زنده پاسخ‌ها، گفتگوهای نام‌گذاری‌شده در Supabase و حالت Manus Agent برای تصویرسازی و پژوهش.",
      ],
      [
        "speakai-coach",
        "مربی هوشمند مکالمه انگلیسی و تخمین آیلتس",
        "تمرین مکالمه صوتی زنده با ۸ شخصیت مربی، اصلاح لحظه‌ای گرامر و تلفظ و ارائه کارنامه تحلیلی شش‌محوری همراه تخمین نمره اسپیکینگ آیلتس.",
      ],
      [
        "horde-survival-3d",
        "بازی روگ‌لایت سه‌بعدی تحت وب با Godot 4",
        "خروجی WebAssembly/WebGL قابل اجرا در مرورگر بدون نصب؛ شامل تکامل سلاح‌ها، ۹ نوع دشمن، باس سه‌فازی و ذخیره دائمی پیشرفت در کنار نسخه‌های Kotlin و Unity C#.",
      ],
      [
        "datalens",
        "میزکار تحلیل و تبدیل داده کاملاً در مرورگر",
        "مشاهده جدول، استخراج آمار، رسم نمودار SVG و تبدیل فرمت فایل‌های CSV، JSON، YAML، XML، SQL و Excel بدون آپلود هیچ داده‌ای به سرور.",
      ],
      [
        "a11y-inspector",
        "ممیزی دسترس‌پذیری وب (WCAG) + ابزار CLI",
        "بررسی کنتراست رنگ، ساختار معنایی و صفات ARIA در مرورگر و پایپ‌لاین‌های CI همراه امتیاز ۰ تا ۱۰۰ و پشتیبانی از ۶ زبان.",
      ],
    ],
    technologies: "تکنولوژی‌ها و مهارت‌ها",
    availability: "همکاری و ارتباط",
    availabilityText:
      "آماده همکاری دورکاری در توسعه محصولات وب، ابزارهای هوش مصنوعی و پروژه‌های متن‌باز هستم. سریع‌ترین راه ارتباط پیام مستقیم در تلگرام (@mohsenniksirat) و بررسی پروژه‌ها در گیت‌هاب (@mohsen-niksirat) است.",
  },
};

const ResumeDocument = () => {
  const locale = useLocale();
  const fa = locale === "fa";
  const L = TEXT[fa ? "fa" : "en"];
  const { profile, projects, skills, socials } = useContent();
  const live = useLiveStats();
  const github = socials.find((s) => s.id === "github");
  const telegram = socials.find((s) => s.id === "telegram");
  const blog = socials.find((s) => s.id === "blog");
  const roles = fa ? ventures.map((v) => ({ ...v, ...venturesFa[v.id] })) : ventures;
  const stars = (n) => `★ ${localizeDigits(String(n), locale)}`;
  const stats = L.stats.filter(([v]) => v !== "stars" || live?.totals?.stars != null);

  return (
    <div className="resume-doc" dir={fa ? "rtl" : "ltr"} lang={locale}>
      <div className="resume-head">
        <div>
          <h1>{profile.name}</h1>
          <p className="resume-role">{profile.title}</p>
        </div>
        <ul className="resume-contact ltr">
          <li className="resume-muted" dir={fa ? "rtl" : "ltr"}>
            {L.locationLabel}
          </li>
          <li>
            <a href={telegram.href}>t.me/mohsenniksirat</a>
          </li>
          <li>
            <a href={github.href}>github.com/mohsen-niksirat</a>
          </li>
          <li>
            <a href={profile.website}>{profile.host}</a>
          </li>
          {blog && (
            <li>
              <a href={blog.href}>mohsen-niksirat.github.io/mohsen-tech-blog</a>
            </li>
          )}
        </ul>
      </div>

      <p className="resume-lede">{L.lede}</p>

      <dl className="resume-stats">
        {stats.map(([value, label]) => (
          <div key={label}>
            <dt className="tabular-nums">{value === "stars" ? stars(live.totals.stars) : value}</dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>

      <section>
        <h2>{L.ventures}</h2>
        {roles.map((v) => (
          <div key={v.id} className="resume-item">
            <div className="resume-item-head">
              <h3>
                {v.role} <span>· {v.name} · {v.what}</span>
              </h3>
            </div>
            <p>{v.text}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>{L.howIWork}</h2>
        <div className="resume-principles">
          {L.principles.map(([title, text]) => (
            <div key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>{L.products}</h2>
        {L.productList.map(([id, what, why]) => {
          const p = projects.find((x) => x.id === id);
          if (!p) return null;
          const source = p.links.find((l) => l.kind === "source");
          const s = live?.stats?.[id];
          return (
            <div key={id} className="resume-item">
              <div className="resume-item-head">
                <h3>
                  {p.title} <span>· {what}</span>
                </h3>
                {s && <span className="resume-year tabular-nums">{stars(s.stars)}</span>}
              </div>
              <p>{why}</p>
              <p className="resume-stack">
                <span className="ltr">{p.stack.join(" · ")}</span>
                {source && (
                  <>
                    {" "}
                    ·{" "}
                    <a className="ltr" href={source.href}>
                      {source.href.replace("https://", "")}
                    </a>
                  </>
                )}
              </p>
            </div>
          );
        })}
      </section>

      <section>
        <h2>{L.technologies}</h2>
        <dl className="resume-skills">
          {skills.map((group) => (
            <div key={group.category}>
              <dt>{group.category}</dt>
              <dd className="ltr">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>{L.availability}</h2>
        <p>{L.availabilityText}</p>
      </section>
    </div>
  );
};

export default ResumeDocument;
