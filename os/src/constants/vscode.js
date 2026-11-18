// VS Code window content. Files are plain strings; the editor highlights them.

import { profile, skills, socials } from "./profile";
import { projects } from "./projects";

export const FILE_TREE = [
  {
    name: "mohsen-niksirat-profile",
    type: "folder",
    open: true,
    children: [
      {
        name: "src",
        type: "folder",
        open: true,
        children: [
          { name: "about.tsx", type: "file", lang: "tsx" },
          { name: "skills.ts", type: "file", lang: "ts" },
          { name: "projects.ts", type: "file", lang: "ts" },
          { name: "contact.tsx", type: "file", lang: "tsx" },
        ],
      },
      { name: "README.md", type: "file", lang: "md" },
      { name: "package.json", type: "file", lang: "json" },
    ],
  },
];

const q = (s) => JSON.stringify(s);

export const FILE_CONTENTS = {
  "about.tsx": {
    lang: "tsx",
    code: `const Developer = () => ({
  name: ${q(profile.name)},
  role: ${q(profile.role)},
  location: ${q(profile.location)},
  education: [
    "M.Sc. Computer Architecture — University of Tabriz",
    "B.Sc. Computer Science — University of Mohaghegh Ardabili",
  ],
  ships: ["Offline PWAs", "AI Gateways", "Telegram Bots", "Desktop", "3D Games"],
  principles: ["open source", "local-first", "bilingual FA/EN"],
  publicRepos: "47+",
  liveApps: "33+",
});

export default Developer;`,
  },
  "skills.ts": {
    lang: "ts",
    code: `type Category = ${skills.map((s) => q(s.category)).join(" | ")};

export const skills: Record<Category, string[]> = {
${skills.map((s) => `  ${q(s.category)}: [${s.items.map(q).join(", ")}],`).join("\n")}
};`,
  },
  "projects.ts": {
    lang: "ts",
    code: `interface Project {
  name: string;
  stack: string[];
  status: "Live" | "Open source";
  source: string;
}

export const projects: Project[] = [
${projects
  .map(
    (p) => `  {
    name: ${q(p.title)},
    stack: [${p.stack.slice(0, 4).map(q).join(", ")}],
    status: ${q(p.status)},
    source: ${q(`github.com/mohsen-niksirat/${p.repo}`)},
  },`,
  )
  .join("\n")}
];`,
  },
  "contact.tsx": {
    lang: "tsx",
    code: `export const contact = {
${socials.map((s) => `  ${s.id}: ${q(s.href)},`).join("\n")}
  city: "Tabriz, Iran",
  openTo: "remote collaborations, AI products & open source",
};

// Fastest reply: Telegram (@mohsenniksirat).`,
  },
  "README.md": {
    lang: "md",
    code: `# Hey, I'm ${profile.name}

${profile.headline}.

## Flagship Projects
${projects.map((p) => `- ${p.title}: ${p.tagline}`).join("\n")}

## Core Stack
- JavaScript / TypeScript / React 19 / Offline PWAs / IndexedDB
- Python / Telegram Bot API / Gemini / Groq / DeepSeek / MCP
- Rust + Tauri v2 / Godot 4 (GDScript) / Kotlin / C#

## Connect
- GitHub: https://github.com/mohsen-niksirat
- Telegram: https://t.me/mohsenniksirat`,
  },
  "package.json": {
    lang: "json",
    code: `{
  "name": "mohsen-niksirat-profile",
  "author": ${q(profile.name)},
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "gsap": "^3.14.2",
    "react": "^19.2.0",
    "tailwindcss": "^4.1.18",
    "zustand": "^5.0.10"
  }
}`,
  },
};

export const TERMINAL_LINES = [
  { type: "dir", text: "mohsen-niksirat/Profile on  main" },
  { type: "cmd", text: "npm run dev" },
  { type: "info", text: "" },
  { type: "info", text: "  VITE v7.3.1  ready in 260 ms" },
  { type: "info", text: "" },
  { type: "success", text: "  ➜  Local:   http://localhost:5173/Profile/" },
  { type: "info", text: "  ➜  Network: use --host to expose" },
  { type: "info", text: "" },
  { type: "dir", text: "mohsen-niksirat/Profile on  main" },
  { type: "cmd", text: "git log --oneline -5" },
  { type: "info", text: "a19f4c2 🔄 Sync live GitHub stars & releases" },
  { type: "info", text: "8d30b11 feat: macOS desktop + iOS mobile home screen" },
  { type: "info", text: "4e92a07 feat: 14 flagship case studies + SEO /p/ pages" },
  { type: "info", text: "71b8c54 feat: live Tabriz weather & Control Center music" },
  { type: "info", text: "2c05e89 feat: bilingual Persian RTL + Jalali calendar" },
];
