// Projects. Core metadata (names, taglines, descriptions, screenshots) comes
// straight from projects.json so Safari, Finder, Spotlight, Photos, /p/<slug>/
// and sitemap.xml never drift apart. This file adds the rich case-study layer.

import hub from "#site/projects.json";
import { asset } from "../lib/paths";

const GH = "https://github.com/mohsen-niksirat";
export const SITE = "https://mohsen-niksirat.github.io";

export const projectCategories = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & Bots" },
  { id: "learning", label: "Learning" },
  { id: "tools", label: "DevTools & Apps" },
  { id: "games", label: "Games & Creative" },
];

const CASE_STUDIES = {
  repodest: {
    title: "Repodest",
    kind: "Web app + Chrome extension",
    category: "tools",
    year: "2026",
    status: "Live",
    description: [
      "Exploring an unfamiliar GitHub repository usually means clicking through dozens of folders just to figure out whether the codebase is healthy and how its pieces fit together. Repodest turns any GitHub URL into an instant visual briefing — right in your browser.",
      "Beyond health scores, language charts, commit cadence, and gamified repo trophies, Repodest includes a smart file tree selector that packs chosen source files into a clean, token-aware Markdown digest you can paste straight into ChatGPT, Claude, or Gemini.",
    ],
    highlights: [
      "100% client-side execution: talks directly to GitHub's public API with zero backend servers or code storage.",
      "Computes a 0–100 repository health score across documentation, activity, community signals, and structure.",
      "Interactive file explorer with token/size estimates and 1-click LLM prompt packing for AI code reviews.",
      "Visualizes language breakdown, commit timelines, top contributors, and fun achievement trophies with Chart.js.",
      "Companion Chrome Extension (Repodest-Extension) injects quick repo insights directly onto github.com pages.",
    ],
    stack: ["JavaScript", "HTML5", "CSS3", "Chart.js", "GitHub REST API", "Chrome MV3"],
    links: [
      { label: "Open the app", href: `${SITE}/Repodest/`, kind: "live" },
      { label: "Source", href: `${GH}/Repodest`, kind: "source" },
    ],
  },
  "leitner-pro-max": {
    title: "Readner · Leitner Pro Max",
    kind: "Offline PWA + Android app",
    category: "learning",
    year: "2026",
    status: "Live",
    rtl: true,
    description: [
      "Vocabulary apps either trap you in rigid flashcard boxes or disconnect word lists from the real books and articles you read. Readner (Leitner Pro Max) combines an integrated PDF reader with the modern Free Spaced Repetition Scheduler (FSRS) so every unfamiliar word you click becomes a long-term memory card.",
      "It ships with 4,500+ CEFR-graded words (A1–C2), an interactive WordWeb semantic graph, quizzes, and support for 13 languages inside a zero-server offline PWA — accompanied by ReadNer, its native Android sibling built with Kotlin and Jetpack Compose.",
    ],
    highlights: [
      "FSRS spaced-repetition engine models per-card stability and difficulty for high retention with fewer daily reviews.",
      "Built-in PDF reader lets learners highlight words in real books and turn them into flashcards in one tap.",
      "Includes 4,500+ curated CEFR (A1 to C2) vocabulary items, audio pronunciation, and interactive quiz modes.",
      "WordWeb semantic visualization connects synonyms, roots, and collocations on an interactive graph.",
      "100% offline-first IndexedDB storage across 13 languages, plus a Kotlin + Jetpack Compose Android app (ReadNer).",
    ],
    stack: ["JavaScript", "FSRS", "IndexedDB", "PDF.js", "PWA", "Kotlin", "Jetpack Compose"],
    links: [
      { label: "Open the app", href: `${SITE}/Leitner-Pro-Max/`, kind: "live" },
      { label: "Source", href: `${GH}/Leitner-Pro-Max`, kind: "source" },
    ],
  },
  aidahl: {
    title: "AIDahl",
    kind: "Telegram AI assistant",
    category: "ai",
    year: "2026",
    status: "Open source",
    rtl: true,
    description: [
      "Most Telegram AI bots lock users behind opaque paywalls, single models, or cramped single-thread chats. AIDahl is an OpenAI-compatible multi-provider Telegram assistant built around Bring-Your-Own-Key (BYOK) freedom and structured multi-session workflows.",
      "Users can switch seamlessly across OpenRouter and major LLMs, organize conversations into named threads, watch answers stream live in Telegram, and activate Manus Agent mode for image generation, image editing, and multi-step research.",
    ],
    highlights: [
      "BYOK architecture lets every user connect personal API keys alongside configurable admin token quotas.",
      "Smooth real-time message streaming inside Telegram with automatic chunking and rate-limit safety.",
      "Named conversation threads, persistent context management, and user state backed by Supabase.",
      "Manus Agent mode unlocks multimodal image creation, visual editing, and autonomous research tasks.",
      "Clean bilingual user experience designed for fast daily productivity inside Telegram.",
    ],
    stack: ["Python", "Telegram Bot API", "OpenRouter", "OpenAI SDK", "Supabase", "AI Agents"],
    links: [{ label: "Source", href: `${GH}/AIDahl`, kind: "source" }],
  },
  "9router": {
    title: "9router AI Gateway",
    kind: "AI Gateway + Telegram Mini App",
    category: "ai",
    year: "2026",
    status: "Open source",
    rtl: true,
    description: [
      "Relying on a single AI provider or API key means hitting 429 rate limits right in the middle of critical work. 9router is a universal multi-provider AI gateway and Telegram Mini App that pools, routes, and load-balances keys across Gemini, Groq, DeepSeek, OpenAI, and OpenRouter.",
      "Whether using Round-Robin rotation, latency-aware Smart Routing, or instant fallback chains, 9router keeps chats and vision requests running uninterrupted while encrypting every user's credentials individually.",
    ],
    highlights: [
      "Multi-strategy routing engine: Round-Robin load balancing, Smart Router, and instant 429 rate-limit failover.",
      "Unifies Gemini, Groq, DeepSeek, OpenAI, and OpenRouter behind one seamless chat and vision experience.",
      "Rich Telegram Mini App dashboard for managing key pools, selecting models, and monitoring health.",
      "Per-user cryptographic key isolation so pooled keys remain private and auditable.",
      "Full multimodal vision support for analyzing images and screenshots directly inside Telegram.",
    ],
    stack: ["JavaScript", "Telegram Mini App", "Gemini API", "Groq", "DeepSeek", "OpenRouter", "AES Encryption"],
    links: [{ label: "Source", href: `${GH}/9router_TG_Bot`, kind: "source" }],
  },
  "horde-survival-3d": {
    title: "Horde Survival 3D",
    kind: "3D browser roguelite game",
    category: "games",
    year: "2026",
    status: "Live",
    description: [
      "Horde Survival 3D brings fast-paced roguelite wave combat straight into the browser with zero downloads. Built in Godot 4 and exported to WebAssembly/WebGL, it pits you against escalating 3D swarms, elite waves, and a three-phase boss.",
      "It is also an exercise in cross-engine game architecture: alongside this 3D Godot web edition, I built a 2D Kotlin survival edition (HordeSurvival) and an Android-tuned Unity C# edition targeting 200 simultaneous enemies.",
    ],
    highlights: [
      "5 core weapons with evolution trees, collectible relics, and synergistic level-up cards.",
      "9 distinct enemy archetypes with flocking pressure plus a multi-stage 3-phase boss encounter.",
      "Persistent meta-progression saves stored locally in the browser so upgrades carry across runs.",
      "Tuned WebGL / WASM build delivering responsive 3D combat directly on GitHub Pages.",
      "Part of a 3-engine game engineering series spanning Godot 4 (GDScript), Unity 3D (C#), and Kotlin.",
    ],
    stack: ["Godot 4", "GDScript", "WebAssembly", "WebGL", "3D Physics"],
    links: [
      { label: "Play now", href: `${SITE}/Horde_Survival_3D_Godot/`, kind: "live" },
      { label: "Source", href: `${GH}/Horde_Survival_3D_Godot`, kind: "source" },
    ],
  },
  tgexplorer: {
    title: "TG Explorer",
    kind: "Web app",
    category: "tools",
    year: "2026",
    status: "Live",
    rtl: true,
    description: [
      "Telegram hosts thousands of great public channels, yet its built-in search barely scratches the surface when you want to browse by topic. TG Explorer provides a clean, fast web discovery engine for public Telegram channels.",
      "Visitors can filter channels by category, search keywords instantaneously, preview channel metadata and descriptions in clean cards, and jump straight into Telegram on desktop or mobile.",
    ],
    highlights: [
      "Zero-latency client-side search and multi-category filtering across curated public channels.",
      "Rich channel preview cards displaying subscriber counts, topics, and direct deep links.",
      "Responsive layout crafted equally for desktop exploration and one-handed mobile PWA use.",
      "Lightweight vanilla HTML/CSS/JS architecture that loads almost instantaneously on slow connections.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "PWA", "Responsive Design"],
    links: [
      { label: "Open the app", href: `${SITE}/tgexplorer/`, kind: "live" },
      { label: "Source", href: `${GH}/tgexplorer`, kind: "source" },
    ],
  },
  "speakai-coach": {
    title: "SpeakAI Coach",
    kind: "AI voice learning PWA",
    category: "learning",
    year: "2026",
    status: "Live",
    rtl: true,
    description: [
      "Reading English is easy to practice alone; speaking out loud without a partner is where learners get stuck. SpeakAI Coach is a real-time AI speaking partner designed for everyday fluency and IELTS Speaking preparation.",
      "Choose from 8 distinct coach personas, hold natural voice or text conversations, get non-intrusive grammar and pronunciation corrections on every turn, and finish with a 6-dimension evaluation report and estimated IELTS band score.",
    ],
    highlights: [
      "Live bidirectional voice conversation loop with speech recognition and natural TTS playback.",
      "8 specialized coach personas — from friendly barista and job interviewer to strict IELTS examiner.",
      "Turn-by-turn grammar, vocabulary, and phrasing feedback without breaking conversational flow.",
      "6-dimension post-session assessment report covering fluency, lexical resource, grammar, and IELTS band.",
      "Installable PWA with bilingual guidance and session history.",
    ],
    stack: ["TypeScript", "Vite", "Web Speech API", "LLM APIs", "PWA"],
    links: [
      { label: "Open the app", href: `${SITE}/SpeakAI-Coach/`, kind: "live" },
      { label: "Source", href: `${GH}/SpeakAI-Coach`, kind: "source" },
    ],
  },
  datalens: {
    title: "DataLens",
    kind: "Local-first data workbench",
    category: "tools",
    year: "2026",
    status: "Live",
    rtl: true,
    description: [
      "Uploading internal CSVs, SQL dumps, or Excel sheets to random online converters is a privacy nightmare. DataLens is a 100% in-browser data workbench that parses, analyzes, charts, and converts datasets without uploading a single byte.",
      "Drop any CSV, JSON, YAML, XML, SQL, or Excel file onto the canvas to explore virtualized tables, inspect column distributions and summary stats, build SVG charts, and export cleanly into any target format — even with your Wi-Fi turned off.",
    ],
    highlights: [
      "Supports 6 formats out of the box: CSV, JSON, YAML, XML, SQL, and Excel spreadsheets.",
      "100% client-side execution with zero external dependencies and zero network telemetry.",
      "Automatic column profiling: min/max/mean/median, null ratios, distinct counts, and data types.",
      "Built-in SVG chart builder for bar, line, scatter, and distribution visualizations.",
      "Full RTL support and offline service-worker caching as an installable PWA.",
    ],
    stack: ["JavaScript", "SVG Charts", "IndexedDB", "Offline PWA", "Zero Dependencies"],
    links: [
      { label: "Open the app", href: `${SITE}/DataLens/`, kind: "live" },
      { label: "Source", href: `${GH}/DataLens`, kind: "source" },
    ],
  },
  codevis: {
    title: "CodeVis",
    kind: "Interactive CS education app",
    category: "learning",
    year: "2026",
    status: "Live",
    rtl: true,
    description: [
      "Abstract algorithms and design patterns click twice as fast when you can watch memory, pointers, and state transitions move frame by frame. CodeVis explains 49 computer science and programming concepts through interactive HTML5 Canvas animations.",
      "Every animation pairs step-by-step playback controls with a synchronized code panel, concept explanations, a daily learning streak, and one-click PNG card generation — shipped inside a single zero-dependency HTML file.",
    ],
    highlights: [
      "49 interactive visual lessons covering data structures, sorting, graphs, async event loops, and design patterns.",
      "Step-by-step timeline scrubber synchronized with highlighted lines of source code.",
      "One-click PNG visual summary export for sharing study cards on social media or notes.",
      "Daily featured concept and streak tracker stored locally in the browser.",
      "Single self-contained HTML file with zero runtime dependencies — works offline anywhere.",
    ],
    stack: ["JavaScript", "HTML5 Canvas", "Single-File App", "PWA", "CS Education"],
    links: [
      { label: "Open the app", href: `${SITE}/CodeVis/`, kind: "live" },
      { label: "Source", href: `${GH}/CodeVis`, kind: "source" },
    ],
  },
  "mcp-studio": {
    title: "MCP Studio",
    kind: "Developer IDE & testing tool",
    category: "ai",
    year: "2026",
    status: "Live",
    description: [
      "As Model Context Protocol (MCP) becomes the standard bridge between AI agents and external tools, debugging custom MCP servers over raw stdio or JSON-RPC logs gets tedious fast. MCP Studio gives agent builders a visual Postman-like IDE for MCP.",
      "Connect to an MCP server, inspect every registered tool's JSON Schema, browse resources and prompt templates, execute interactive calls with auto-generated forms, and inspect exact request/response payloads.",
    ],
    highlights: [
      "Visual explorer for MCP tools, resources, and prompt templates with live JSON Schema rendering.",
      "Interactive form generator lets developers test tool arguments and inspect structured responses.",
      "Real-time protocol inspector showing raw JSON-RPC messages, latencies, and error traces.",
      "Built with TypeScript, React, and Vite for a snappy desktop-grade developer workflow.",
    ],
    stack: ["TypeScript", "React", "Vite", "Model Context Protocol", "JSON-RPC"],
    links: [
      { label: "Open the app", href: `${SITE}/Mcp-Studio/`, kind: "live" },
      { label: "Source", href: `${GH}/Mcp-Studio`, kind: "source" },
    ],
  },
  "a11y-inspector": {
    title: "A11y Inspector",
    kind: "Accessibility auditor + CLI",
    category: "tools",
    year: "2026",
    status: "Live",
    rtl: true,
    description: [
      "Accessibility checks often happen too late because auditing tools require heavy browser extensions or cloud accounts. A11y Inspector audits HTML accessibility immediately in the browser — and ships the exact same engine as a CI-ready CLI.",
      "It evaluates WCAG contrast ratios, semantic landmarks, alt text, form labels, and heading order, producing a clear 0–100 score with copy-pasteable remediation hints in six languages.",
    ],
    highlights: [
      "Runs 100% locally in-browser as an offline PWA — safe for unreleased or confidential UI markup.",
      "Checks WCAG color contrast, ARIA roles, keyboard focus traps, form labels, and heading hierarchy.",
      "Produces a 0–100 accessibility health score plus severity-ranked findings and fix snippets.",
      "Includes a zero-config Node.js CLI with exit codes for GitHub Actions and CI pipelines.",
      "Localized into 6 languages including full RTL Persian support.",
    ],
    stack: ["JavaScript", "WCAG 2.2", "Node.js CLI", "Offline PWA", "i18n"],
    links: [
      { label: "Open the app", href: `${SITE}/A11y-Inspector/`, kind: "live" },
      { label: "Source", href: `${GH}/A11y-Inspector`, kind: "source" },
    ],
  },
  bountyradar: {
    title: "BountyRadar",
    kind: "Windows desktop app",
    category: "tools",
    year: "2026",
    status: "Live",
    rtl: true,
    description: [
      "Open-source bounties are scattered across dozens of repositories and issue trackers, and half of them already have five competing pull requests. BountyRadar scans live bounties and scores whether each issue is actually worth claiming before you write a line of code.",
      "Tailored to 10 freelancer skill profiles (frontend, backend, Python, Rust, AI/ML, mobile, security, DevOps, docs, design), it runs locally on Windows with background watch mode and native toast alerts.",
    ],
    highlights: [
      "10 specialized freelancer skill profiles filter noise down to issues matching your exact stack.",
      "Preflight GO / CAUTION / STOP scoring checks competing PRs, maintainer responsiveness, and payout.",
      "Background watch mode dispatches native Windows toast notifications when matching bounties appear.",
      "Bilingual English and Persian interface with zero cloud lock-in.",
    ],
    stack: ["Python", "Windows Desktop", "GitHub API", "Toast Notifications", "Bilingual UI"],
    links: [
      { label: "Overview", href: `${SITE}/BountyRadar/`, kind: "live" },
      { label: "Source", href: `${GH}/BountyRadar`, kind: "source" },
    ],
  },
  ravaan: {
    title: "Ravaan · روان",
    kind: "Windows typing assistant",
    category: "tools",
    year: "2026",
    status: "Open source",
    rtl: true,
    description: [
      "Every bilingual Persian/English writer knows the frustration of typing a full sentence only to look up and see gibberish because Windows was on the wrong keyboard layout — or wrestling with Shift+Space for clean Persian half-spaces (ZWNJ).",
      "Ravaan sits quietly in the Windows system tray and fixes bilingual friction across every app: instant layout conversion, automatic smart ZWNJ, Persian autocorrect, text-expansion snippets, and one-shortcut Jalali dates.",
    ],
    highlights: [
      "Converts mistyped Persian ↔ English keyboard-layout text in place with a single global hotkey.",
      "Smart ZWNJ engine inserts proper Persian half-spaces automatically for prefixes and suffixes.",
      "Custom text-expansion snippets, autocorrect rules, and clipboard utilities.",
      "Instant formatted Jalali (Solar Hijri) date insertion anywhere in Windows.",
    ],
    stack: ["Python", "Windows Hooks", "Tkinter", "Persian NLP", "Jalali Calendar"],
    links: [{ label: "Source", href: `${GH}/Ravaan`, kind: "source" }],
  },
  devcompass: {
    title: "DevCompass",
    kind: "Bilingual career quiz PWA",
    category: "learning",
    year: "2026",
    status: "Live",
    rtl: true,
    description: [
      "Beginners entering software development get paralyzed by endless debates over which language or framework to learn first. DevCompass turns that confusion into a friendly 2-minute scenario quiz across 8 real engineering tracks.",
      "Built as a single-file bilingual (FA/EN) offline PWA, it pairs each matched career path with a practical learning roadmap, a downloadable result card, and a friend-challenge link.",
    ],
    highlights: [
      "Maps problem-solving preferences across 8 tracks: Frontend, Backend, Full-Stack, AI/Data, Mobile, DevOps, Security, and Game Dev.",
      "Generates custom shareable visual result cards and URL-encoded friend challenge comparisons.",
      "First-class Persian (RTL) and English copy with zero backend or tracking.",
      "Ships as an installable single-file PWA that works completely offline.",
    ],
    stack: ["HTML5", "Vanilla JS", "Canvas Card Export", "Offline PWA", "Bilingual RTL"],
    links: [
      { label: "Open the app", href: `${SITE}/DevCompass/`, kind: "live" },
      { label: "Source", href: `${GH}/DevCompass`, kind: "source" },
    ],
  },
};

const shotsOf = (p) =>
  (p.media ?? []).map((m) => (m.type === "video" ? m.poster : m.src)).filter(Boolean);

export const projects = hub.projects.map((p) => {
  const cs = CASE_STUDIES[p.slug];
  const rawShots = shotsOf(p);
  const firstImg = p.media?.find((m) => m.type === "image");
  const pageUrl = asset(`/p/${p.slug}/`);
  const ogUrl = asset(`/assets/og/${p.slug}.png`);
  return {
    id: p.slug,
    slug: p.slug,
    repo: p.repo,
    icon: p.icon,
    accent: p.accent,
    tagline: p.tagline,
    summary: p.desc,
    tags: p.tags ?? [],
    platforms: p.os,
    language: p.lang,
    page: pageUrl,
    thumbnail: ogUrl,
    shot: firstImg ? asset(firstImg.thumb ?? firstImg.src) : ogUrl,
    screenshots: rawShots.length ? rawShots.map(asset) : [ogUrl],
    ...cs,
    links: [...cs.links, { label: "Project page", href: pageUrl, kind: "site" }],
  };
});

// Additional shipped repositories from github.com/mohsen-niksirat, shown in Safari & Finder!
export const archive = [
  {
    id: "repolaunch",
    title: "RepoLaunch",
    year: "2026",
    description: "Turn any GitHub repo into a modern, multi-theme landing page in seconds with 1-click GitHub Pages publish.",
    stack: ["TypeScript", "React", "Vite", "GitHub Actions"],
    live: `${SITE}/RepoLaunch/`,
    source: `${GH}/RepoLaunch`,
  },
  {
    id: "api-key-manager",
    title: "API Key Manager",
    year: "2026",
    description: "Privacy-first offline vault for API keys with AES-GCM encryption across 25+ providers.",
    stack: ["JavaScript", "WebCrypto AES-GCM", "IndexedDB", "PWA"],
    live: `${SITE}/api-key-manager/`,
    source: `${GH}/api-key-manager`,
  },
  {
    id: "kite-downloader",
    title: "Kite Downloader",
    year: "2026",
    description: "Fast, lightweight desktop download manager built in Rust + Tauri v2 with clipboard sniffer and glassmorphism UI.",
    stack: ["Rust", "Tauri v2", "Desktop", "Windows"],
    live: `${GH}/kite-downloader`,
    source: `${GH}/kite-downloader`,
  },
  {
    id: "biosphera",
    title: "Biosphera",
    year: "2026",
    description: "60 FPS in-browser digital life simulation powered by genetic algorithms, tiny neural networks, and natural selection.",
    stack: ["JavaScript", "Neural Networks", "Genetic Algorithms", "Canvas"],
    live: `${SITE}/Biosphera/`,
    source: `${GH}/Biosphera`,
  },
  {
    id: "tonora",
    title: "Tonora",
    year: "2026",
    description: "Play, learn, and compose music in your browser with an interactive Web Audio piano and offline PWA studio.",
    stack: ["JavaScript", "Web Audio API", "Music", "PWA"],
    live: `${SITE}/Tonora/`,
    source: `${GH}/Tonora`,
  },
  {
    id: "nebula-drift",
    title: "Nebula Drift",
    year: "2026",
    description: "2D space-shooter roguelite in Godot 4 — pilot the Kestrel-9 across nine nebula sectors with persistent upgrades.",
    stack: ["Godot 4", "GDScript", "WebGL"],
    live: `${SITE}/Nebula-Drift/`,
    source: `${GH}/Nebula-Drift`,
  },
  {
    id: "telegram-vip-saas",
    title: "Telegram VIP SaaS",
    year: "2026",
    description: "Production SaaS for selling VIP subscriptions to private Telegram channels via Telegram Stars & crypto.",
    stack: ["Python", "FastAPI", "PostgreSQL", "Telegram Stars"],
    live: `${GH}/telegram-vip-saas`,
    source: `${GH}/telegram-vip-saas`,
  },
  {
    id: "news-channel-bot",
    title: "News Channel Bot",
    year: "2026",
    description: "Turns RSS feeds into AI-written Persian posts for Telegram channels with review queues, filters, and daily digests.",
    stack: ["JavaScript", "Python", "RSS", "DeepSeek", "Supabase"],
    live: `${SITE}/News-Channel-Bot/`,
    source: `${GH}/News-Channel-Bot`,
  },
  {
    id: "promptopia",
    title: "Promptopia",
    year: "2026",
    description: "Bilingual gallery of 1,366+ ready-made AI image prompts across 18 categories for Gemini and ChatGPT.",
    stack: ["HTML5", "Vanilla JS", "PWA", "FA/EN RTL"],
    live: `${SITE}/promptopia/`,
    source: `${GH}/promptopia`,
  },
  {
    id: "cineplay-cinescore",
    title: "CinePlay · CineScore · Cinema",
    year: "2026",
    description: "Streaming HLS web player with SRT/VTT/ASS subtitles alongside movie discovery and community scoring apps.",
    stack: ["JavaScript", "HLS Streaming", "HTML5", "PWA"],
    live: `${SITE}/CinePlay/`,
    source: `${GH}/CinePlay`,
  },
  {
    id: "github-wrapped",
    title: "GitHub Wrapped",
    year: "2026",
    description: "Your year in code — visualized, roasted, and celebrated from live GitHub activity.",
    stack: ["HTML5", "JavaScript", "GitHub API"],
    live: `${SITE}/github-wrapped/`,
    source: `${GH}/github-wrapped`,
  },
  {
    id: "all-in-one",
    title: "All-In-One Mini Apps & Toolbox",
    year: "2026",
    description: "Trilingual (FA/EN/AR) serverless Telegram Mini Apps launcher, browser utility suite, VocabForge & FamilyTree.",
    stack: ["JavaScript", "Telegram Mini Apps", "PWA"],
    live: `${SITE}/All-In-One/`,
    source: `${GH}/All-In-One`,
  },
  {
    id: "timeline",
    title: "Build in Public Timeline",
    year: "2026",
    description: "Every public release across all my repositories, synced automatically from GitHub.",
    stack: ["GitHub API", "GitHub Actions"],
    live: asset("/timeline/"),
    source: `${GH}/Profile`,
  },
  {
    id: "project-pages",
    title: "SEO Project Directory",
    year: "2026",
    description: "Dedicated indexable pages with structured data, screenshots, and FAQs for flagship projects.",
    stack: ["Static HTML", "JSON-LD"],
    live: asset("/p/"),
    source: `${GH}/Profile`,
  },
];

export const trashedProjects = [];

export const getProject = (id) => projects.find((p) => p.id === id);
