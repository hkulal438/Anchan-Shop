import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Icon, { WhatsAppIcon } from "./Icons";
import doctorPhoto from "../assets/hero/doctor.webp";
import harmonyBanner from "../assets/hero/harmony-banner.webp";
import familyPhoto from "../assets/hero/family.webp";
import digestiveBanner from "../assets/hero/digestive-banner.webp";

const DURATION = 7000; // ms each slide stays

// Title words rise out of a mask one after another
const Words = ({ text, accent }) => {
  const words = text.split(" ");
  const accentWords = accent ? accent.split(" ") : [];
  const all = [...words.map((w) => [w, false]), ...accentWords.map((w) => [w, true])];
  // the space sits between the masks so lines can still wrap normally
  return all.map(([w, isAccent], i) => (
    <React.Fragment key={i}>
      <span className="hs-word">
        <span className={isAccent ? "hs-accent" : ""} style={{ "--i": i }}>{w}</span>
      </span>
      {i === words.length - 1 && accentWords.length ? <br /> : " "}
    </React.Fragment>
  ));
};

const SLIDES = [
  {
    id: "range",
    theme: "banner",
    banner: harmonyBanner,
    title: "Ayurvedic Harmony in Green Nature",
  },
  {
    id: "doctor",
    theme: "photo",
    photo: doctorPhoto,
    align: "right",
    title: "Guided by a Physician,",
    accent: "Made with Care",
    text: "Every Anchan medicine is prepared the classical way in our own GMP-certified unit, shaped by four decades of clinical practice.",
    primary: { to: "/consult", label: "Consult With Doctor" },
    secondary: { to: "/about", label: "Our Story" },
  },
  {
    id: "digestive",
    theme: "banner",
    banner: digestiveBanner,
    title: "Dr. Anchan's Herbal Digestive Care",
  },
  {
    id: "family",
    theme: "photo",
    photo: familyPhoto,
    align: "right",
    title: "Ayurveda for Every",
    accent: "Generation",
    text: "From children's tonics to rasayanas for elders — find what your family needs, by health concern.",
    primary: { to: "/categories", label: "Shop by Health Need" },
    secondary: { to: "/shop", label: "All Products" },
  },
];

function Cta({ c, primary }) {
  const cls = primary ? "hs-btn hs-btn--primary" : "hs-btn hs-btn--ghost";
  const inner = (
    <>
      {c.wa && <WhatsAppIcon size={18} />}
      {c.label}
      {primary && <span className="hs-btn-icon"><Icon name="arrow" size={15} stroke={2.2} /></span>}
    </>
  );
  return c.href ? (
    <a className={cls} href={c.href} target="_blank" rel="noreferrer">{inner}</a>
  ) : (
    <Link className={cls} to={c.to}>{inner}</Link>
  );
}

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef(null);
  const count = SLIDES.length;

  const go = useCallback((i) => setIndex((i + count) % count), [count]);

  // autoplay; restarts whenever the slide changes
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      className={`hs ${paused ? "is-paused" : ""}`}
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`hs-slide hs-slide--${s.theme} ${s.align === "right" ? "hs-slide--right" : ""} ${i === index ? "is-active" : ""}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
        >
          {s.banner ? (
            <>
              {i === 0 && <h1 className="hs-banner-title">Authentic Ayurvedic Medicines</h1>}
              <img
                className="hs-banner"
                src={s.banner}
                alt={s.title}
                width={1672}
                height={941}
                loading={i === 0 ? "eager" : "lazy"}
              />
            </>
          ) : (
            <>
              <img className="hs-photo" src={s.photo} alt="" loading="lazy" />
              <span className="hs-shade" />

              <div className="container hs-inner">
                <div className="hs-copy">
                  <h2 className="hs-title"><Words text={s.title} accent={s.accent} /></h2>
                  <p className="hs-text hs-rise" style={{ "--d": "0.75s" }}>{s.text}</p>
                  <div className="hs-ctas hs-rise" style={{ "--d": "0.95s" }}>
                    <Cta c={s.primary} primary />
                    <Cta c={s.secondary} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      {/* controls */}
      <button type="button" className="hs-arrow hs-arrow--prev" onClick={() => go(index - 1)} aria-label="Previous slide">
        <Icon name="chevron" size={22} stroke={2} />
      </button>
      <button type="button" className="hs-arrow hs-arrow--next" onClick={() => go(index + 1)} aria-label="Next slide">
        <Icon name="chevron" size={22} stroke={2} />
      </button>

      <div className="hs-dots" role="tablist" aria-label="Choose slide">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            className={`hs-dot ${i === index ? "is-active" : ""}`}
            onClick={() => go(i)}
          >
            <span style={{ animationDuration: `${DURATION}ms` }} />
          </button>
        ))}
      </div>
    </section>
  );
}
