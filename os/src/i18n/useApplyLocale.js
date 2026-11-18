import { useEffect } from "react";
import { useLocale } from "./locale";

const META = {
  en: {
    title: "Mohsen Niksirat · محسن نیک‌سیرت — Software Engineer & AI Builder",
    description:
      "Mohsen Niksirat (محسن نیک‌سیرت) — M.Sc. Computer Architecture, Software Engineer & AI Product Builder. 47+ open-source repos & 33+ live apps: Repodest, Leitner Pro Max, 9router, AIDahl, SpeakAI Coach, Horde Survival 3D.",
  },
  fa: {
    title: "محسن نیک‌سیرت · Mohsen Niksirat — مهندس نرم‌افزار و سازنده ابزارهای هوش مصنوعی",
    description:
      "پورتفولیوی تعاملی محسن نیک‌سیرت؛ کارشناسی ارشد معماری کامپیوتر و سازنده بیش از ۴۷ پروژه متن‌باز و ۳۳+ اپلیکیشن زنده: Repodest، لایتنر پرو مکس، 9router، AIDahl، SpeakAI و بازی‌های سه‌بعدی تحت وب.",
  },
};

export const useApplyLocale = () => {
  const locale = useLocale();
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = locale === "fa" ? "rtl" : "ltr";
    document.title = META[locale].title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", META[locale].description);
  }, [locale]);
};
