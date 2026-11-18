import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Download, FolderOpen } from "lucide-react";
import { prefersReducedMotion } from "../../lib/motion";
import { openApp } from "../../lib/actions";
import { useLiveStats } from "../../hooks/useLiveStats";
import { localizeDigits, useLocale, useT } from "../../i18n";
import { useContent } from "../../i18n/content";

const WEIGHTS = {
  subtitle: { min: 300, max: 700, base: 500 },
  title: { min: 600, max: 900, base: 800 },
};

const renderText = (text, weight) =>
  [...text].map((char, i) => (
    <span key={i} aria-hidden="true" style={{ fontVariationSettings: `'wght' ${weight}` }}>
      {char}
    </span>
  ));

const setupHover = (container, type) => {
  if (!container) return () => {};
  const letters = [...container.querySelectorAll("span[aria-hidden]")];
  const { min, max, base } = WEIGHTS[type];
  const to = (el, w, duration = 0.25) =>
    gsap.to(el, { duration, ease: "power2.out", fontVariationSettings: `'wght' ${w}` });

  const onMove = (e) => {
    letters.forEach((letter) => {
      const r = letter.getBoundingClientRect();
      const d = Math.abs(e.clientX - (r.left + r.width / 2));
      to(letter, min + (max - min) * Math.exp(-(d ** 2) / 2000));
    });
  };
  const onLeave = () => letters.forEach((l) => to(l, base, 0.3));

  container.addEventListener("pointermove", onMove);
  container.addEventListener("pointerleave", onLeave);
  return () => {
    container.removeEventListener("pointermove", onMove);
    container.removeEventListener("pointerleave", onLeave);
  };
};

const Split = ({ text, weight, split }) =>
  split ? (
    <>
      <span className="sr-only">{text}</span>
      {renderText(text, weight)}
    </>
  ) : (
    text
  );

const Welcome = () => {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const t = useT();
  const locale = useLocale();
  const split = locale !== "fa";
  const title = t("welcome.title");
  const { profile } = useContent();
  const totalStars = useLiveStats()?.totals?.stars;
  const sub =
    totalStars != null
      ? t("welcome.sub", { stars: localizeDigits(String(totalStars), locale) })
      : t("welcome.subPlain");

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.from(rootRef.current.children, {
      opacity: 0,
      y: 18,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      delay: 0.15,
    });
  }, []);

  useGSAP(() => {
    if (!split) return;
    const a = setupHover(titleRef.current, "title");
    const b = setupHover(subtitleRef.current, "subtitle");
    return () => {
      a();
      b();
    };
  }, [split, title, sub]);

  return (
    <section ref={rootRef} className="welcome" aria-labelledby="welcome-title">
      <h1 id="welcome-title" ref={titleRef} className="welcome-title">
        <Split text={title} weight={WEIGHTS.title.base} split={split} />
      </h1>
      <p ref={subtitleRef} className="welcome-sub">
        <Split text={sub} weight={WEIGHTS.subtitle.base} split={split} />
      </p>
      <div className="welcome-actions">
        <button type="button" className="btn btn-primary" onClick={() => openApp("safari")}>
          <FolderOpen aria-hidden="true" /> {t("welcome.projects")}
        </button>
        <a className="btn welcome-btn-ghost" href={profile.resumeUrl} download>
          <Download aria-hidden="true" /> {t("welcome.resume")}
        </a>
      </div>
    </section>
  );
};

export default Welcome;
