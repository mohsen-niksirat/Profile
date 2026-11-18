import { create } from "zustand";
import { safeStorage } from "../lib/storage";
import { BASE } from "../lib/paths";

export const LOCALES = ["en", "fa"];
const KEY = "portfolio:locale";

const isFaPath = (pathname) => {
  if (BASE && new RegExp(`^${BASE}/fa(/|$)`).test(pathname)) return true;
  return /^\/fa(\/|$)/.test(pathname);
};

// URL wins (/Profile/fa/ is a real page for search engines), then the visitor's
// saved choice, then the browser language.
const initialLocale = () => {
  if (typeof window === "undefined") return "en";
  if (isFaPath(window.location.pathname)) return "fa";
  const saved = safeStorage.getItem(KEY);
  if (LOCALES.includes(saved)) return saved;
  return navigator.language?.toLowerCase().startsWith("fa") ? "fa" : "en";
};

const pathFor = (locale) => {
  const root = BASE ? `${BASE}/` : "/";
  return locale === "fa" ? `${root}fa/` : root;
};

// Keep the address bar on the language's own path (/Profile/ or /Profile/fa/),
// so a copied link opens in the same language.
const syncPath = (locale) => {
  const { pathname, search, hash } = window.location;
  const target = pathFor(locale);
  if (pathname === target) return;
  window.history.replaceState(window.history.state, "", target + search + hash);
};

const useLocaleStore = create((set) => ({
  locale: initialLocale(),
  setLocale: (locale) => {
    if (!LOCALES.includes(locale)) return;
    safeStorage.setItem(KEY, locale);
    syncPath(locale);
    set({ locale });
  },
}));

if (typeof window !== "undefined") {
  syncPath(useLocaleStore.getState().locale);
  window.addEventListener("popstate", () => syncPath(useLocaleStore.getState().locale));
}

export const useLocale = () => useLocaleStore((s) => s.locale);
export const getLocale = () => useLocaleStore.getState().locale;
export const setLocale = (locale) => useLocaleStore.getState().setLocale(locale);
export const toggleLocale = () => setLocale(getLocale() === "fa" ? "en" : "fa");

export default useLocaleStore;
