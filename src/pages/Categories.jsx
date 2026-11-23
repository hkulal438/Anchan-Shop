import React from "react";
import { Link } from "react-router-dom";

import Icon from "../components/Icons";
import ProductImage from "../components/ProductImage";
import BhasmaNote from "../components/BhasmaNote";
import { categories, healthNeeds } from "../data/catalog";
import { productById } from "../data/helpers";

// Photos dropped into src/assets/categories/<id>.jpg|png|webp are picked up automatically
const photoFiles = import.meta.glob("../assets/categories/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const photos = Object.fromEntries(
  Object.entries(photoFiles).map(([path, url]) => [path.split("/").pop().replace(/\.\w+$/, ""), url])
);

// a representative product photo for each product type
const TYPE_COVER = {
  "arishta-asava": "amritharishta",
  taila: "bhringamalaka-taila",
  churna: "chandan-churna-bathing-powder",
  "leha-rasayana": "chyavanaprasha-leha",
  syrups: "pusti-syrup",
  capsules: "rumovin-capsule",
  malahara: "gandhaka-malahara",
  "arka-satva": "kumari-shampoo",
  tablets: "shwasari-tablet",
  "vati-guggulu": "chandraprabha-vati",
};

const MODES = {
  need: {
    title: "Product Category",
    text: "Choose a health concern to see the Anchan preparations traditionally used for it.",
    items: [...healthNeeds].sort((a, b) => a.name.localeCompare(b.name)),
    param: "need",
  },
  type: {
    title: "Product Type",
    text: "From arishtas and tailas to churnas and capsules — browse our medicines by form.",
    items: [...categories].sort((a, b) => a.name.localeCompare(b.name)),
    param: "type",
  },
};

function Circle({ mode, item }) {
  if (mode === "need") {
    return photos[item.id] ? (
      <img src={photos[item.id]} alt="" loading="lazy" />
    ) : (
      <span className="cat-art">
        <Icon name={item.id} size={64} stroke={1.3} />
      </span>
    );
  }
  const cover = productById[TYPE_COVER[item.id]];
  return photos[`type-${item.id}`] ? (
    <img src={photos[`type-${item.id}`]} alt="" loading="lazy" />
  ) : cover ? (
    <ProductImage product={cover} />
  ) : null;
}

export default function Categories({ mode = "need" }) {
  const m = MODES[mode];

  return (
    <div className="cats">
      <section className="cats-band">
        <div className="container">
          <nav className="crumbs crumbs--center" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <Icon name="chevron" size={14} />
            <span>{m.title}</span>
          </nav>
          <h1>{m.title}</h1>
          <p>{m.text}</p>
        </div>
      </section>

      <section className="container cats-grid">
        {m.items.map((it) => (
          <Link key={it.id} to={`/shop?${m.param}=${it.id}`} className="cat">
            <span className="cat-ring">
              <span className="cat-circle">
                <Circle mode={mode} item={it} />
              </span>
            </span>
            <h2>{it.name}</h2>
            <span className="cat-count">
              {it.count} products <Icon name="arrow" size={14} />
            </span>
          </Link>
        ))}
      </section>

      {mode === "type" && (
        <div className="container cats-rx"><BhasmaNote /></div>
      )}

      <section className="cats-switch">
        <div className="container">
          {mode === "need" ? (
            <Link to="/product-types" className="btn btn-outline btn-lg">
              Browse by product type instead <Icon name="arrow" size={18} />
            </Link>
          ) : (
            <Link to="/categories" className="btn btn-outline btn-lg">
              Browse by health need instead <Icon name="arrow" size={18} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
