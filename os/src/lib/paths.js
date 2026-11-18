// Base path helper so every static file, route and screenshot works seamlessly
// whether hosted at https://mohsen-niksirat.github.io/Profile/ or at /.

export const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export const asset = (path) => {
  if (!path) return path;
  if (/^(https?:|mailto:|tel:|data:)/.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (BASE && (clean === BASE || clean.startsWith(`${BASE}/`))) return clean;
  return `${BASE}${clean}`;
};
