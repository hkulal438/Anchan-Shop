import React from "react";

// Real photo when we have one; otherwise a clean "label" pack illustration
// whose shape follows the product type (bottle, jar, tube, strip…).

const SHAPES = {
  // tall amber bottle
  bottle: (
    <>
      <rect x="86" y="18" width="48" height="26" rx="5" className="pi-cap" />
      <path d="M92 44h36v18c22 8 34 24 34 46v118a16 16 0 0 1-16 16H74a16 16 0 0 1-16-16V108c0-22 12-38 34-46Z" className="pi-body" />
    </>
  ),
  // squat jar (leha / churna / bhasma)
  jar: (
    <>
      <rect x="44" y="48" width="132" height="34" rx="8" className="pi-cap" />
      <path d="M50 82h120v138a20 20 0 0 1-20 20H70a20 20 0 0 1-20-20Z" className="pi-body" />
    </>
  ),
  // small capsule/tablet container
  tub: (
    <>
      <rect x="62" y="40" width="96" height="40" rx="10" className="pi-cap" />
      <path d="M58 80h104v146a14 14 0 0 1-14 14H72a14 14 0 0 1-14-14Z" className="pi-body" />
    </>
  ),
  // ointment tin
  tin: (
    <>
      <rect x="34" y="96" width="152" height="40" rx="10" className="pi-cap" />
      <path d="M40 136h140v74a18 18 0 0 1-18 18H58a18 18 0 0 1-18-18Z" className="pi-body" />
    </>
  ),
};

const shapeFor = {
  "arishta-asava": "bottle",
  syrups: "bottle",
  taila: "bottle",
  "arka-satva": "bottle",
  churna: "jar",
  bhasma: "jar",
  "leha-rasayana": "jar",
  capsules: "tub",
  tablets: "tub",
  "vati-guggulu": "tub",
  malahara: "tin",
};

// label band position per shape
const LABEL = {
  bottle: { y: 120, h: 92 },
  jar: { y: 112, h: 92 },
  tub: { y: 112, h: 92 },
  tin: { y: 150, h: 56 },
};

function splitName(name) {
  const clean = name.replace(/\s*\(.*\)\s*/, "");
  const words = clean.split(" ");
  if (clean.length <= 13 || words.length === 1) return [clean];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default function ProductImage({ product, className = "", eager = false }) {
  if (product.image) {
    return (
      <div className={`pimg pimg--photo ${className}`}>
        <img src={product.image} alt={`${product.name} – Anchan Ayurveda`} loading={eager ? "eager" : "lazy"} />
      </div>
    );
  }

  const shape = shapeFor[product.category] || "bottle";
  const lbl = LABEL[shape];
  const lines = splitName(product.name);
  const small = lines.some((l) => l.length > 11);

  return (
    <div className={`pimg pimg--art pimg--${shape} ${className}`}>
      <svg viewBox="0 0 220 260" role="img" aria-label={product.name}>
        {SHAPES[shape]}
        <rect x="40" y={lbl.y} width="140" height={lbl.h} rx="6" className="pi-label" />
        <rect x="40" y={lbl.y} width="140" height="8" className="pi-label-band" />
        {lines.map((l, i) => (
          <text
            key={i}
            x="110"
            y={lbl.y + (shape === "tin" ? 30 : 40) + i * (small ? 17 : 20) - (lines.length - 1) * 8}
            textAnchor="middle"
            className="pi-name"
            style={{ fontSize: small ? 13 : 16 }}
          >
            {l}
          </text>
        ))}
        {shape !== "tin" && (
          <text x="110" y={lbl.y + lbl.h - 12} textAnchor="middle" className="pi-brand">
            ANCHAN AYURVEDA
          </text>
        )}
      </svg>
    </div>
  );
}
