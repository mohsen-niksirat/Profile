#!/usr/bin/env node
/**
 * Builds the hub's SEO surface under /Profile/:
 *   p/<slug>/index.html  — one indexable page per flagship project
 *   p/index.html         — full visual catalogue
 *   timeline/index.html  — build-in-public activity & release feed
 *   sitemap.xml, robots.txt
 */
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';

const BASE = '/Profile';
const ORIGIN = 'https://mohsen-niksirat.github.io/Profile';
const GH = 'https://github.com/mohsen-niksirat';
const { person, projects } = JSON.parse(await readFile('projects.json', 'utf8'));

const FONT_CSS = (await readFile('fonts.css', 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '').trim();
const FONT_TAG = `<style>${FONT_CSS}</style>`;

let live = { totals: {}, stats: {}, timeline: [], growth: [] };
try {
  live = JSON.parse(await readFile('data.json', 'utf8'));
  console.log('using data.json');
} catch {
  console.log('no data.json yet — pages render without live numbers');
}

const clip = (text, max) => {
  const t = String(text ?? '').replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const stop = cut.lastIndexOf('. ');
  if (stop > max * 0.55) return cut.slice(0, stop + 1);
  return cut.replace(/\s\S*$/, '') + '…';
};

const plain = (md, max = 190) => {
  let t = String(md ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/(^|\s)#{1,6}\s+/g, '$1')
    .replace(/(^|\s)[*\-+]\s+/g, '$1')
    .replace(/\b(What's Changed|Full Changelog)\s*:?/gi, ' ')
    .replace(/[*_`~]+/g, '')
    .replace(/\bby @\S+(\s+in\b)?/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.:;،؛])/g, '$1')
    .replace(/^[\s,.:;،؛—–-]+|[\s,:;،؛—–-]+$/g, '')
    .trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('؟'), cut.lastIndexOf('.'));
  return (stop > max * 0.5 ? cut.slice(0, stop + 1) : cut.replace(/\s\S*$/, '')) + '…';
};

const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const withBase = (p) => (p.startsWith('http') ? p : `${BASE}${p.startsWith('/') ? p : '/' + p}`);

const gallery = (p) => {
  const m = p.media ?? [];
  if (!m.length) return '';
  const items = m
    .map((x, i) => {
      const or = x.w > x.h ? 'land' : 'port';
      const cap = `<figcaption>${esc(x.caption)}<span class="capfa fa">${esc(x.captionFa)}</span></figcaption>`;
      return `<figure class="m ${or}">
      <button type="button" class="mb" data-i="${i}" data-full="${withBase(x.src)}"
              data-cap="${esc(x.caption)}" aria-label="${esc(x.alt)} — open full size">
        <img src="${withBase(x.thumb ?? x.src)}" width="${x.w}" height="${x.h}"
             loading="lazy" decoding="async" alt="${esc(x.alt)}" />
      </button>${cap}</figure>`;
    })
    .join('\n');
  return `
    <section class="gal" aria-label="Screenshots of ${esc(p.name)}">
      <h2 class="galh">Screens <span class="galn">${m.length}</span><span class="fa galhfa">تصاویر</span></h2>
      <div class="stripw"><div class="strip">${items}</div></div>
    </section>`;
};

const mediaImages = (p) =>
  (p.media ?? [])
    .filter((x) => x.type === 'image')
    .map((x) => ({
      '@type': 'ImageObject',
      contentUrl: ORIGIN + x.src,
      url: ORIGIN + x.src,
      width: x.w,
      height: x.h,
      caption: x.caption,
    }));

const faqHtml = (p) => {
  const rows = p.faq ?? [];
  if (!rows.length) return '';
  return `<section class="card faq" aria-labelledby="faqh">
    <h2 id="faqh">Frequently asked<span class="fa faqhfa">پرسش‌های پرتکرار</span></h2>
    ${rows
      .map(
        (f) => `<details>
      <summary><span>${esc(f.q)}</span><span class="fa qfa">${esc(f.qFa)}</span></summary>
      <p>${esc(f.a)}</p>
      <p class="fa afa">${esc(f.aFa)}</p>
    </details>`
      )
      .join('\n    ')}
  </section>`;
};

const faqLd = (p) => {
  const rows = p.faq ?? [];
  if (!rows.length) return '';
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${ORIGIN}/p/${p.slug}/#faq`,
    inLanguage: ['en', 'fa'],
    mainEntity: rows.flatMap((f) => [
      { '@type': 'Question', name: f.q, inLanguage: 'en', acceptedAnswer: { '@type': 'Answer', text: f.a } },
      { '@type': 'Question', name: f.qFa, inLanguage: 'fa', acceptedAnswer: { '@type': 'Answer', text: f.aFa } },
    ]),
  });
};

const ogCards = new Set(await readdir('assets/og').catch(() => []));
const socialImage = (p) => {
  if (ogCards.has(`${p.slug}.png`)) return `${ORIGIN}/assets/og/${p.slug}.png`;
  const land = (p.media ?? [])
    .filter((x) => x.type === 'image' && x.w > x.h && x.w >= 600)
    .sort((a, b) => b.w - a.w)[0];
  if (land) return ORIGIN + land.src;
  return `${ORIGIN}/og-card.png`;
};

const page = (p) => {
  const url = `${ORIGIN}/p/${p.slug}/`;
  const repo = `${GH}/${p.repo}`;
  const gal = gallery(p);
  const og = socialImage(p);
  const shots = mediaImages(p);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    alternateName: p.repo,
    url,
    sameAs: [repo, ...(p.live ? [p.live] : [])],
    description: p.desc,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: p.os,
    programmingLanguage: p.lang,
    isAccessibleForFree: true,
    license: 'https://opensource.org/licenses',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: person.name, alternateName: person.nameFa, url: person.url, sameAs: person.sameAs },
    ...(shots.length ? { screenshot: shots, image: shots.map((s) => s.contentUrl) } : {}),
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Mohsen Niksirat', item: ORIGIN + '/' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: ORIGIN + '/p/' },
      { '@type': 'ListItem', position: 3, name: p.name, item: url },
    ],
  };
  const SUFFIX = ' · Mohsen Niksirat';
  const title = clip(`${p.name} — ${p.tagline}`, 60 - SUFFIX.length) + SUFFIX;
  const metaDesc = clip(p.desc, 155);
  const chips = p.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('');
  const primaryHref = p.live || repo;
  const primaryLabel = p.live ? 'Launch Live App →' : 'Open on GitHub →';
  const secondaryBtn = p.live
    ? `<a class="btn" href="${repo}">Source on GitHub</a>`
    : `<a class="btn" href="${BASE}/#/projects/${p.slug}">Open in Desktop OS</a>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#05070d" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(metaDesc)}" />
<link rel="canonical" href="${url}" />
<link rel="icon" type="image/png" href="${BASE}/avatar.png" />
${FONT_TAG}
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Mohsen Niksirat" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(metaDesc)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${og}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(metaDesc)}" />
<meta name="twitter:image" content="${og}" />
<script type="application/ld+json">${JSON.stringify(ld)}</script>
<script type="application/ld+json">${JSON.stringify(crumbs)}</script>
${faqLd(p) ? `<script type="application/ld+json">${faqLd(p)}</script>` : ''}
<style>
:root{--accent:${p.accent};--txt:#F5F5F7;--muted:#B9C0CC;--dim:#8A93A3;--stroke:rgba(255,255,255,.16);
--font:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;--fa:'Vazirmatn',var(--font)}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:var(--font);color:var(--txt);background:#05070d;min-height:100vh;
 -webkit-font-smoothing:antialiased;display:flex;justify-content:center;
 padding:max(28px,env(safe-area-inset-top)) 18px 56px}
.bg{position:fixed;inset:-25%;z-index:-2;filter:blur(70px) saturate(150%);
 background:radial-gradient(38% 42% at 24% 18%,${p.accent}88,transparent 70%),
 radial-gradient(34% 38% at 80% 26%,rgba(94,92,230,.45),transparent 70%),
 radial-gradient(42% 44% at 66% 92%,rgba(48,209,208,.28),transparent 70%)}
.wrap{width:100%;max-width:640px}
a{color:inherit}
.back{display:inline-flex;gap:8px;align-items:center;text-decoration:none;color:var(--dim);
 font-size:14px;font-weight:600;margin-bottom:18px}
.back:hover{color:var(--txt)}
.card{padding:32px 28px;border-radius:28px;
 background:linear-gradient(155deg,rgba(255,255,255,.11),rgba(255,255,255,.055));
 -webkit-backdrop-filter:blur(30px) saturate(185%);backdrop-filter:blur(30px) saturate(185%);
 border:1px solid var(--stroke);
 box-shadow:0 12px 50px rgba(0,0,0,.45),inset 0 1px 0 rgba(255,255,255,.28)}
.ic{width:74px;height:74px;border-radius:22px;display:grid;place-items:center;font-size:36px;
 background:${p.accent}2e;border:1px solid ${p.accent}66;margin-bottom:18px}
h1{font-size:34px;font-weight:800;letter-spacing:-.8px}
.tag{color:var(--muted);font-size:18px;font-weight:600;margin-top:8px}
.fa{font-family:var(--fa);direction:rtl}
.tagfa{color:var(--dim);font-size:15px;margin-top:6px}
p.desc{color:var(--muted);font-size:15px;line-height:1.7;margin-top:18px}
p.descfa{color:var(--dim);font-size:14px;line-height:1.9;margin-top:10px}
.chips{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px}
.chip{padding:8px 15px;border-radius:999px;font-size:13.5px;font-weight:600;color:#C9D1D9;
 background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.13)}
.meta{display:flex;gap:22px;flex-wrap:wrap;margin-top:22px;font-size:13.5px;color:var(--dim)}
.meta b{color:var(--muted);font-weight:600}
.cta{display:flex;gap:11px;flex-wrap:wrap;margin-top:26px}
.btn{flex:1 1 180px;display:flex;align-items:center;justify-content:center;gap:9px;
 padding:15px 18px;border-radius:17px;text-decoration:none;font-weight:650;font-size:15.5px;
 border:1px solid var(--stroke);background:linear-gradient(155deg,rgba(255,255,255,.1),rgba(255,255,255,.05));
 transition:transform .18s,border-color .18s}
.btn.primary{background:linear-gradient(155deg,${p.accent}cc,${p.accent}77);border-color:${p.accent}}
@media(hover:hover){.btn:hover{transform:translateY(-2px);border-color:#fff6}}
.foot{text-align:center;color:var(--dim);font-size:13px;margin-top:26px;line-height:1.9}
.foot a{color:var(--muted);text-decoration:none}
.gal{margin-top:26px}
.galh{font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;
 color:var(--dim);display:flex;align-items:baseline;gap:9px}
.galn{font-size:11.5px;letter-spacing:0;padding:2px 8px;border-radius:999px;color:#C9D1D9;
 background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.14)}
.galhfa{font-size:12.5px;letter-spacing:0;text-transform:none;font-weight:600;opacity:.85}
.stripw{position:relative;margin:14px -28px 0}
.stripw:after{content:"";position:absolute;top:0;bottom:16px;right:0;width:46px;pointer-events:none;
 background:linear-gradient(90deg,transparent,rgba(5,7,13,.55))}
.strip{display:flex;gap:14px;overflow-x:auto;overscroll-behavior-x:contain;
 scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
 padding:2px 28px 16px;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.22) transparent}
.strip>*:last-child{padding-right:28px}
.m{flex:0 0 auto;scroll-snap-align:center;margin:0}
.m img{display:block;width:auto;max-width:84vw;object-fit:contain;
 border-radius:16px;border:1px solid var(--stroke);background:#080c14;
 box-shadow:0 8px 28px rgba(0,0,0,.4)}
.m.land img{height:clamp(210px,34vh,330px)}
.m.port img{height:clamp(300px,48vh,430px)}
.mb{display:block;padding:0;border:0;background:none;cursor:zoom-in;border-radius:16px}
.m figcaption{color:var(--dim);font-size:12.5px;line-height:1.6;margin-top:10px;
 max-width:min(320px,84vw);white-space:normal}
.capfa{display:block;margin-top:3px;font-size:12px;opacity:.78}
.lb{position:fixed;inset:0;z-index:50;display:none;place-items:center;padding:20px;
 background:rgba(3,5,10,.9);-webkit-backdrop-filter:blur(22px);backdrop-filter:blur(22px)}
.lb[open]{display:grid}
.lb img{max-width:min(1200px,94vw);max-height:82vh;width:auto;height:auto;
 border-radius:18px;border:1px solid var(--stroke)}
.lbc{color:var(--muted);font-size:13.5px;text-align:center;margin-top:14px;max-width:min(700px,90vw)}
.lbx,.lbn,.lbp{position:absolute;background:rgba(255,255,255,.1);border:1px solid var(--stroke);
 color:#fff;border-radius:50%;width:44px;height:44px;font-size:19px;cursor:pointer;display:grid;place-items:center}
.lbx{top:18px;right:18px}.lbp{left:14px;top:50%;transform:translateY(-50%)}.lbn{right:14px;top:50%;transform:translateY(-50%)}
.faq{margin-top:18px;padding:26px 24px}
.faq h2{font-size:20px;font-weight:750;letter-spacing:-.3px;display:flex;flex-wrap:wrap;align-items:baseline;gap:10px}
.faqhfa{font-size:15px;font-weight:600;color:var(--dim)}
.faq details{border-top:1px solid rgba(255,255,255,.1);padding:15px 0 3px}
.faq summary{cursor:pointer;list-style:none;font-weight:650;font-size:15px;line-height:1.55;display:grid;gap:4px;padding-right:26px;position:relative}
.faq summary::-webkit-details-marker{display:none}
.faq summary:after{content:"+";position:absolute;right:0;top:-1px;font-size:19px;color:var(--dim)}
.faq .qfa{font-size:14px;font-weight:600;color:var(--muted)}
.faq details p{color:var(--muted);font-size:14.5px;line-height:1.75;margin-top:12px}
.faq details p.afa{color:var(--dim);font-size:13.5px;line-height:1.95;margin-top:8px}
@media (min-width:1024px){
  body{padding:56px 40px 96px}
  .wrap{max-width:1240px}
  .card.has-media{display:grid;grid-template-columns:minmax(0,420px) minmax(0,1fr);grid-template-rows:auto 1fr;
    grid-template-areas:"lead gal" "tail gal";column-gap:50px;align-items:start;padding:46px 50px}
  .card.has-media .lead{grid-area:lead}
  .card.has-media .gal{grid-area:gal;margin-top:6px}
  .card.has-media .tail{grid-area:tail;align-self:start;margin-top:30px}
  .card.no-media{padding:48px 54px;max-width:820px;margin-inline:auto}
  h1{font-size:42px;letter-spacing:-1px}
  .stripw{margin:16px 0 0}.stripw:after{display:none}
  .strip{display:flex;flex-wrap:wrap;gap:22px;overflow:visible;padding:0;scroll-snap-type:none}
  .strip>*:last-child{padding-right:0}
  .m{max-width:100%;min-width:0}.m img{max-width:100%}
  .m.port img{height:380px;width:auto}
  .m.land img{height:auto;width:100%;max-width:520px}
  .btn{flex:0 1 auto;min-width:200px;font-size:16px;padding:16px 26px}
}
</style>
</head>
<body>
<div class="bg" aria-hidden="true"></div>
<main class="wrap">
  <a class="back" href="${BASE}/">← Mohsen Niksirat · <span class="fa">محسن نیک‌سیرت</span></a>
  <article class="card ${gal ? 'has-media' : 'no-media'}">
    <div class="lead">
      <div class="ic" aria-hidden="true">${p.icon}</div>
      <h1>${esc(p.name)}</h1>
      <div class="tag">${esc(p.tagline)}</div>
      <div class="tagfa fa">${esc(p.taglineFa)}</div>
      <p class="desc">${esc(p.desc)}</p>
      <p class="descfa fa">${esc(p.descFa)}</p>
    </div>
    ${gal}
    <div class="tail">
      <div class="chips">${chips}</div>
      <div class="meta">
        <span><b>Platform</b> · ${esc(p.os)}</span>
        <span><b>Built with</b> · ${esc(p.lang)}</span>
        <span><b>Stars</b> · <span data-stars="${esc(p.repo)}">${live.stats?.[p.slug]?.stars != null ? '★ ' + live.stats[p.slug].stars : '—'}</span></span>
      </div>
      <div class="cta">
        <a class="btn primary" href="${primaryHref}">${primaryLabel}</a>
        ${secondaryBtn}
      </div>
    </div>
  </article>
  ${faqHtml(p)}
  <p class="foot">
    An open-source project by <a href="${BASE}/"><b>Mohsen Niksirat</b></a> · <span class="fa">محسن نیک‌سیرت</span><br/>
    <a href="https://t.me/mohsenniksirat">Telegram</a> · <a href="${GH}">GitHub</a>
  </p>
</main>
<div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Full-size screenshot">
  <button class="lbx" id="lbx" aria-label="Close">&times;</button>
  <button class="lbp" id="lbp" aria-label="Previous">&#8249;</button>
  <button class="lbn" id="lbn" aria-label="Next">&#8250;</button>
  <div><img id="lbi" alt="" /><p class="lbc" id="lbc"></p></div>
</div>
<script>
(function(){
  var btns = [].slice.call(document.querySelectorAll('.mb'));
  if (!btns.length) return;
  var lb = document.getElementById('lb'), img = document.getElementById('lbi'),
      cap = document.getElementById('lbc'), at = 0;
  function show(i){
    at = (i + btns.length) % btns.length;
    var b = btns[at];
    img.src = b.dataset.full;
    img.alt = b.querySelector('img').alt;
    cap.textContent = b.dataset.cap;
    lb.setAttribute('open',''); document.body.style.overflow = 'hidden';
  }
  function hide(){ lb.removeAttribute('open'); document.body.style.overflow = ''; img.src = ''; }
  btns.forEach(function(b,i){ b.addEventListener('click', function(){ show(i); }); });
  document.getElementById('lbx').addEventListener('click', hide);
  document.getElementById('lbn').addEventListener('click', function(){ show(at+1); });
  document.getElementById('lbp').addEventListener('click', function(){ show(at-1); });
  lb.addEventListener('click', function(e){ if (e.target === lb) hide(); });
  document.addEventListener('keydown', function(e){
    if (!lb.hasAttribute('open')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowRight') show(at+1);
    if (e.key === 'ArrowLeft') show(at-1);
  });
})();
fetch('https://api.github.com/repos/mohsen-niksirat/${p.repo}')
  .then(r=>r.ok?r.json():null)
  .then(d=>{if(d)document.querySelectorAll('[data-stars]').forEach(e=>e.textContent='★ '+d.stargazers_count)})
  .catch(()=>{});
</script>
</body>
</html>`;
};

for (const p of projects) {
  await mkdir(`p/${p.slug}`, { recursive: true });
  await writeFile(`p/${p.slug}/index.html`, page(p));
}

// Projects catalogue (/Profile/p/)
const list = projects
  .map((p) => {
    const m = (p.media ?? []).find((x) => x.type === 'image');
    const shot = m
      ? `<img class="th" src="${withBase(m.thumb ?? m.src)}" width="${m.w}" height="${m.h}" loading="lazy" decoding="async" alt="Screenshot of ${esc(p.name)}" />`
      : `<span class="th thi" aria-hidden="true">${p.icon}</span>`;
    return `<li><a href="${BASE}/p/${p.slug}/">${shot}<span class="tx"><b>${esc(p.name)}</b>${esc(p.tagline)}</span></a></li>`;
  })
  .join('\n');

await mkdir('p', { recursive: true });
await writeFile(
  'p/index.html',
  `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Open-Source Projects — Mohsen Niksirat · محسن نیک‌سیرت</title>
<meta name="description" content="Open-source web apps, AI gateways, FSRS learning platforms and games by Mohsen Niksirat (محسن نیک‌سیرت)." />
<link rel="canonical" href="${ORIGIN}/p/" />${FONT_TAG}
<link rel="icon" type="image/png" href="${BASE}/avatar.png" />
<meta property="og:title" content="Open-Source Projects — Mohsen Niksirat" />
<meta property="og:description" content="47+ open-source repositories &amp; 33+ live apps by Mohsen Niksirat." />
<meta property="og:url" content="${ORIGIN}/p/" />
<meta property="og:image" content="${ORIGIN}/og-card.png" />
<meta name="twitter:card" content="summary_large_image" />
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',-apple-system,sans-serif;background:#05070d;color:#F5F5F7;
 display:flex;justify-content:center;padding:40px 18px 60px;-webkit-font-smoothing:antialiased}
.bg{position:fixed;inset:-25%;z-index:-2;filter:blur(70px) saturate(150%);
 background:radial-gradient(38% 42% at 22% 18%,rgba(10,132,255,.5),transparent 70%),
 radial-gradient(34% 38% at 82% 26%,rgba(94,92,230,.45),transparent 70%)}
.w{width:100%;max-width:620px}
h1{font-size:30px;font-weight:800;letter-spacing:-.6px}
.s{color:#B9C0CC;margin-top:8px;font-size:15px}
ul{list-style:none;margin-top:26px}
li a{display:flex;gap:14px;align-items:center;text-decoration:none;color:#F5F5F7;
 padding:13px 15px;margin-bottom:11px;border-radius:18px;font-size:15px;
 background:linear-gradient(155deg,rgba(255,255,255,.09),rgba(255,255,255,.045));
 border:1px solid rgba(255,255,255,.13);transition:transform .18s,border-color .18s}
li a:hover{transform:translateY(-2px);border-color:rgba(255,255,255,.3)}
.th{flex:0 0 auto;width:98px;height:64px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:#080c14;object-fit:cover;object-position:center 16%}
.thi{display:grid;place-items:center;font-size:28px}
.tx{display:flex;flex-direction:column;gap:3px;min-width:0;color:#AEB6C4;font-size:13.5px;line-height:1.5}
.tx b{font-size:15.5px;font-weight:650;color:#F5F5F7}
a.back{color:#8A93A3;text-decoration:none;font-size:14px;font-weight:600}
@media (min-width:900px){
  body{padding:56px 40px 92px}
  .w{max-width:1180px}
  h1{font-size:44px;letter-spacing:-1.2px}
  .s{font-size:17px;margin-top:10px}
  ul{margin-top:38px;display:grid;gap:22px;grid-template-columns:repeat(auto-fill,minmax(324px,1fr))}
  li a{flex-direction:column;align-items:stretch;gap:0;height:100%;padding:0;margin:0;border-radius:22px;overflow:hidden}
  .th{width:100%;height:auto;aspect-ratio:16/10;border-radius:0;border:0;border-bottom:1px solid rgba(255,255,255,.10);object-position:center 12%}
  .tx{padding:19px 21px 21px;gap:6px;font-size:14.5px}
  .tx b{font-size:18.5px}
}
</style></head>
<body><div class="bg"></div><main class="w">
<a class="back" href="${BASE}/">← Mohsen Niksirat · محسن نیک‌سیرت</a>
<h1 style="margin-top:16px">Open-Source Projects</h1>
<p class="s">Flagship products built &amp; shipped in the open by <b>Mohsen Niksirat</b> <bdi>(محسن نیک‌سیرت)</bdi>.</p>
<ul>
${list}
</ul></main></body></html>`
);

// Build-in-public timeline (/Profile/timeline/)
{
  const items = live.timeline ?? [];
  const fmt = (iso) =>
    new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));
  const rows = items.length
    ? items
        .map(
          (i) => `
      <li class="ev">
        <div class="dot" aria-hidden="true"></div>
        <time datetime="${i.at}">${fmt(i.at)}</time>
        <div class="body">
          <a class="h" href="${i.url}" dir="auto"><b>${esc(i.repo)}</b> <span class="tag">${esc(i.tag)}</span></a>
          ${(() => {
            const b = plain(i.body);
            return b ? `<p dir="auto">${esc(b)}</p>` : '';
          })()}
          ${i.slug ? `<a class="more" href="${BASE}/p/${i.slug}/">Case study →</a>` : ''}
        </div>
      </li>`
        )
        .join('')
    : '<li class="ev"><div class="body"><p>Syncing activity from GitHub…</p></div></li>';

  await mkdir('timeline', { recursive: true });
  await writeFile(
    'timeline/index.html',
    `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="theme-color" content="#05070d" />
<title>Build in Public — Mohsen Niksirat · محسن نیک‌سیرت</title>
<meta name="description" content="A running log of public releases and shipped open-source apps by Mohsen Niksirat (محسن نیک‌سیرت)." />
<link rel="canonical" href="${ORIGIN}/timeline/" />
<link rel="icon" type="image/png" href="${BASE}/avatar.png" />
${FONT_TAG}
<meta property="og:title" content="Build in Public — Mohsen Niksirat" />
<meta property="og:url" content="${ORIGIN}/timeline/" />
<meta property="og:image" content="${ORIGIN}/og-card.png" />
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--txt:#F5F5F7;--muted:#B9C0CC;--dim:#8A93A3;--accent:#0A84FF;
--font:'Inter',-apple-system,sans-serif;--fa:'Vazirmatn',var(--font)}
body{font-family:var(--font);background:#05070d;color:var(--txt);display:flex;justify-content:center;
 padding:40px 18px 70px;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.bg{position:fixed;inset:-25%;z-index:-2;filter:blur(70px) saturate(150%);
 background:radial-gradient(38% 42% at 22% 16%,rgba(10,132,255,.5),transparent 70%),
 radial-gradient(34% 38% at 82% 30%,rgba(94,92,230,.42),transparent 70%)}
.w{width:100%;max-width:660px}
a{color:inherit}
.back{color:var(--dim);text-decoration:none;font-size:14px;font-weight:600}
h1{font-size:31px;font-weight:800;letter-spacing:-.7px;margin-top:16px}
.sub{color:var(--muted);font-size:15px;margin-top:8px;line-height:1.65}
.subfa{font-family:var(--fa);direction:rtl;color:var(--dim);font-size:14px;margin-top:6px}
ul{list-style:none;margin-top:30px;position:relative}
ul:before{content:"";position:absolute;left:7px;top:6px;bottom:6px;width:2px;background:linear-gradient(#0A84FF,rgba(10,132,255,.05))}
.ev{position:relative;padding-left:34px;padding-bottom:26px}
.dot{position:absolute;left:0;top:5px;width:16px;height:16px;border-radius:50%;background:#0A84FF;box-shadow:0 0 0 4px rgba(10,132,255,.16)}
time{display:block;font-size:12.5px;font-weight:600;color:var(--dim)}
.body{margin-top:6px;padding:15px 17px;border-radius:17px;background:linear-gradient(155deg,rgba(255,255,255,.09),rgba(255,255,255,.04));border:1px solid rgba(255,255,255,.13)}
.h{text-decoration:none;font-size:16px;font-weight:650}
.tag{display:inline-block;margin-left:6px;padding:2px 9px;border-radius:999px;font-size:12px;color:#9EC9FF;background:rgba(10,132,255,.16);border:1px solid rgba(10,132,255,.35)}
.body p{color:var(--muted);font-size:14px;line-height:1.65;margin-top:8px;overflow-wrap:anywhere}
.more{display:inline-block;margin-top:10px;font-size:13px;font-weight:600;color:var(--dim);text-decoration:none}
@media (min-width:900px){
  body{padding:56px 40px 96px}.w{max-width:1180px}h1{font-size:44px}
  ul{margin-top:40px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:26px}
  ul:before{display:none}
}
@media (min-width:1440px){.w{max-width:1320px}ul{grid-template-columns:repeat(3,minmax(0,1fr))}}
</style></head>
<body><div class="bg" aria-hidden="true"></div><main class="w">
<a class="back" href="${BASE}/">← Mohsen Niksirat · <span style="font-family:var(--fa)">محسن نیک‌سیرت</span></a>
<h1>Build in Public</h1>
<p class="sub">Releases and shipped open-source apps across my GitHub — synced automatically.</p>
<p class="subfa">فهرست به‌روزرسانی‌ها و پروژه‌های منتشرشده در گیت‌هاب من — از جدید به قدیم.</p>
<ul>${rows}</ul>
</main></body></html>`
  );
  console.log('✓ timeline:', items.length, 'entries');
}

const urls = [
  `${ORIGIN}/`,
  `${ORIGIN}/fa/`,
  `${ORIGIN}/p/`,
  `${ORIGIN}/timeline/`,
  ...projects.map((p) => `${ORIGIN}/p/${p.slug}/`),
];
const today = new Date().toISOString().slice(0, 10);
await writeFile(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u, i) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${i === 0 ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`
);
await writeFile('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`);

try {
  const home = await readFile('index.html', 'utf8');
  const re = /(<!-- FONTS -->)[\s\S]*?(<!-- \/FONTS -->)/;
  if (re.test(home)) {
    const next = home.replace(re, `$1\n${FONT_TAG}\n$2`);
    if (next !== home) await writeFile('index.html', next);
  }
} catch {}

console.log(`✓ ${projects.length} project pages + index + sitemap(${urls.length}) + robots`);
