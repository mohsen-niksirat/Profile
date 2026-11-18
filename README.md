# Mohsen Niksirat · محسن نیک‌سیرت — macOS / iOS Portfolio OS

Personal interactive portfolio of **Mohsen Niksirat** (محسن نیک‌سیرت): M.Sc. Computer Architecture · Software Engineer & AI Product Builder.

🔗 **Live:** https://mohsen-niksirat.github.io/Profile/ · **فارسی:** https://mohsen-niksirat.github.io/Profile/fa/

Instead of a static page, this portfolio runs as a full operating system:
- **Desktop (macOS):** Menu bar, Dock, Spotlight (`⌘K` / `Ctrl+K`), Mission Control (`F3`), Control Center with Music Player, live **Tabriz** Weather & Jalali/Gregorian Calendar widgets, live GitHub contributions & commit feed, Finder, Safari Case Studies, Apple Notes, Photos, interactive zsh Terminal, VS Code, Contacts, Message composer, and bilingual Resume.
- **Mobile (iOS):** Custom neural-emblem home screen wallpaper, compact Tabriz weather & featured app widgets, pull-down Spotlight search, Control Center, and native swipe-back navigation.
- **SEO Hub:** Static project pages (`/Profile/p/<slug>/`), release & launch timeline (`/Profile/timeline/`), and automated 6-hour GitHub star/release sync (`sync.mjs`).

## Development

```bash
cd os
npm install
npm run dev      # http://localhost:5173/Profile/
npm run build    # builds into the repository root

cd ..
node sync.mjs    # pulls live GitHub stars & timeline into data.json
node build.mjs   # generates /p/, /timeline/, sitemap.xml & robots.txt
```

## Credits

Built upon the open-source macOS portfolio architecture by **[Reza Abdollahi](https://github.com/Rezaabdollahi7/portfolio)** and GitHub Pages SEO hub architecture by **[Mahdi Mortazavi](https://github.com/Mahdi-mortazavi/Mahdi-mortazavi.github.io)**. Persian typography set in [Vazirmatn](https://github.com/rastikerdar/vazirmatn).
