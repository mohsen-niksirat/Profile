#!/usr/bin/env node
/**
 * Pulls live stats from the GitHub API into data.json:
 * headline totals, per-project stars, daily snapshot history, and a
 * build-in-public timeline of releases & recently shipped repos.
 */
import { writeFile, readFile } from 'node:fs/promises';

const USER = 'mohsen-niksirat';
const API = 'https://api.github.com';
const TOKEN = process.env.STARS_TOKEN || process.env.GITHUB_TOKEN;
console.log(
  'auth:',
  process.env.STARS_TOKEN
    ? `STARS_TOKEN (${process.env.STARS_TOKEN.length} chars)`
    : process.env.GITHUB_TOKEN
      ? 'GITHUB_TOKEN'
      : 'anonymous (no token)'
);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'mohsen-niksirat-profile-sync',
  ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
};

const gh = async (p, accept) => {
  const h = accept ? { ...headers, Accept: accept } : { ...headers };
  let r = await fetch(API + p, { headers: h });
  const authStatus = r.status;
  let retried = false;
  if (r.status === 403 && h.Authorization) {
    const { Authorization, ...anon } = h;
    r = await fetch(API + p, { headers: anon });
    retried = true;
  }
  if (!r.ok) {
    console.warn(`  ! ${p} — authed:${authStatus}${retried ? ` anon:${r.status}` : ''}`);
    return null;
  }
  return r.json();
};

const { projects } = JSON.parse(await readFile('projects.json', 'utf8'));

const user = await gh(`/users/${USER}`);
const all = (await gh(`/users/${USER}/repos?per_page=100&sort=updated`)) ?? [];
const repos = all.filter((r) => !r.fork && !r.private);

const byName = Object.fromEntries(repos.map((r) => [r.name.toLowerCase(), r]));
const stats = {};
for (const p of projects) {
  const r = byName[p.repo.toLowerCase()];
  if (!r) continue;
  stats[p.slug] = {
    stars: r.stargazers_count,
    forks: r.forks_count,
    language: r.language,
    pushedAt: r.pushed_at,
    description: r.description,
  };
}

const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

const today = new Date().toISOString().slice(0, 10);
let history = [];
try {
  history = JSON.parse(await readFile('history.json', 'utf8'));
} catch {}
history = history.filter((h) => h.d !== today);
history.push({ d: today, stars: totalStars, followers: user?.followers ?? 0, repos: repos.length });
history.sort((a, b) => a.d.localeCompare(b.d));
await writeFile('history.json', JSON.stringify(history, null, 2));

const growth = history.map((h) => ({ m: h.d, v: h.stars }));
const cut = Date.now() - 30 * 86400000;
const win = history.filter((h) => new Date(h.d).getTime() >= cut);
const last30 = win.length > 1 ? totalStars - win[0].stars : 0;

// Build-in-public timeline: public releases first, supplemented by recent repo launches
const timeline = [];
for (const r of repos.slice(0, 25)) {
  const rels = (await gh(`/repos/${USER}/${r.name}/releases?per_page=5`)) ?? [];
  for (const rel of rels) {
    if (rel.draft) continue;
    timeline.push({
      repo: r.name,
      slug: (projects.find((p) => p.repo.toLowerCase() === r.name.toLowerCase()) || {}).slug ?? null,
      tag: rel.tag_name,
      name: rel.name || rel.tag_name,
      at: rel.published_at,
      url: rel.html_url,
      body: (rel.body ?? '').split('\n').filter(Boolean).slice(0, 3).join(' ').slice(0, 260),
    });
  }
}

// Also surface shipped repositories that deploy directly to GitHub Pages without formal git tags
const seenRepos = new Set(timeline.map((t) => t.repo.toLowerCase()));
for (const r of repos) {
  if (seenRepos.has(r.name.toLowerCase()) || r.name === USER) continue;
  const matched = projects.find((p) => p.repo.toLowerCase() === r.name.toLowerCase());
  if (!matched && !r.homepage && r.stargazers_count < 2) continue;
  timeline.push({
    repo: r.name,
    slug: matched?.slug ?? null,
    tag: r.homepage ? 'Live' : 'Open Source',
    name: r.name,
    at: r.pushed_at || r.updated_at || r.created_at,
    url: r.homepage || r.html_url,
    body: matched?.desc || r.description || '',
  });
}

timeline.sort((a, b) => new Date(b.at) - new Date(a.at));

const data = {
  generatedAt: new Date().toISOString(),
  totals: {
    stars: totalStars,
    forks: repos.reduce((s, r) => s + r.forks_count, 0),
    repos: repos.length,
    followers: user?.followers ?? 0,
    last30,
  },
  bio: (user?.bio ?? '').split('\n')[0].trim(),
  growthSource: 'daily-snapshots',
  stats,
  growth,
  timeline: timeline.slice(0, 40),
};
await writeFile('data.json', JSON.stringify(data, null, 2));
console.log(`✓ data.json — ${data.totals.stars}★ · ${repos.length} repos · ${data.timeline.length} timeline entries`);
