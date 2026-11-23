import React, { useState } from "react";
import { Link } from "react-router-dom";

import Icon, { WhatsAppIcon } from "../components/Icons";
import ProductCard from "../components/ProductCard";
import HeroSlider from "../components/HeroSlider";
import ProductImage from "../components/ProductImage";
import { categories, healthNeeds, products } from "../data/catalog";
import { bestSellers, featured, productById } from "../data/helpers";
import { SHOP, formatPrice } from "../config";
import gmp from "../assets/gmp.png";
import herbsPile from "../assets/why/herbs-pile.png";
import bottleHD from "../assets/why/amritharishta-hd.webp";
import { categoryPhotos } from "../data/categoryPhotos";
import branch from "../assets/why/branch.png";
import leaf1 from "../assets/why/leaf-1.png";
import leaf2 from "../assets/why/leaf-2.png";
import leaf3 from "../assets/why/leaf-3.png";

// a representative product for each product-type tile
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

// health needs shown as large photo cards on the home page (the rest appear as chips)
const FEATURED_NEEDS = ["joints", "digestion", "respiratory", "diabetes", "immunity", "skin", "hair", "women", "kids", "heart", "liver", "mind"];

// three points either side of the centre product
const WHY_LEFT = [
  { icon: "scroll", title: "Classical Formulations", text: "Prepared as described in Bhaishajya Ratnavali, Sharngadhara Samhita and the Ayurvedic Formulary of India." },
  { icon: "flask", title: "Doctor-Developed Remedies", text: "Our own preparations grew out of Dr. N. T. Anchan's four decades of clinical practice." },
  { icon: "leaf", title: "Carefully Chosen Herbs", text: "Every herb is selected, cleaned and processed with care before it goes into a batch." },
];

const WHY_RIGHT = [
  { icon: "shield", title: "GMP-Certified Unit", text: "Each batch is made and checked in our own certified manufacturing unit at Padubidri." },
  { icon: "award", title: `Trusted Since ${SHOP.since}`, text: "Four decades of preparing medicines for physicians, families and patients across Karnataka." },
  { icon: "heart", title: "Fair, Printed Prices", text: "You pay the printed MRP on every pack — no hidden charges added at checkout." },
];

const WhyPoint = ({ p, side }) => (
  <div className={`why-point why-point--${side}`}>
    <span className="why-badge-icon"><Icon name={p.icon} size={26} stroke={1.7} /></span>
    <div>
      <h3>{p.title}</h3>
      <p>{p.text}</p>
    </div>
  </div>
);

const SectionHead = ({ title, text, link, linkLabel }) => (
  <div className="shead">
    <div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
    {link && (
      <Link to={link} className="shead-link">
        {linkLabel} <Icon name="arrow" size={16} />
      </Link>
    )}
  </div>
);

export default function Home() {
  const tabs = ["arishta-asava", "taila", "churna", "leha-rasayana", "capsules"];
  const [tab, setTab] = useState(tabs[0]);
  const tabProducts = products
    .filter((p) => p.category === tab)
    .sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0))
    .slice(0, 8);

  return (
    <>
      {/* ================= HERO SLIDER ================= */}
      <HeroSlider />

      {/* ================= TRUST STRIP ================= */}
      <section className="trust">
        <div className="container trust-grid">
          <div><Icon name="truck" size={26} /><p><strong>Free delivery</strong><span>on orders above {formatPrice(SHOP.freeDeliveryAbove)}</span></p></div>
          <div><WhatsAppIcon size={24} /><p><strong>Order on WhatsApp</strong><span>we confirm every order personally</span></p></div>
          <div><Icon name="shield" size={26} /><p><strong>GMP certified</strong><span>made in our own unit</span></p></div>
          <div><Icon name="scroll" size={26} /><p><strong>Classical texts</strong><span>authentic formulations</span></p></div>
        </div>
      </section>

      {/* ================= BEST SELLING ================= */}
      <section className="block">
        <div className="container">
          <SectionHead title="Best Selling" text="The medicines our customers come back for." link="/shop" linkLabel="View all" />
          <div className="grid-products">
            {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} eager={i < 4} />)}
          </div>
        </div>
      </section>

      {/* ================= PRODUCT TYPES ================= */}
      <section className="block block--cream">
        <div className="container">
          <SectionHead title="Shop by Product Type" text="From arishtas and tailas to churnas and capsules." />
          <div className="types">
            {categories.map((c) => (
              <Link key={c.id} to={`/shop?type=${c.id}`} className="type-tile">
                <div className="type-media">
                  {productById[TYPE_COVER[c.id]] && <ProductImage product={productById[TYPE_COVER[c.id]]} />}
                </div>
                <div className="type-body">
                  <h3>{c.name}</h3>
                  <span>{c.count} products</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="block">
        <div className="container">
          <SectionHead title="Featured Products" text="Signature Anchan preparations worth knowing." link="/shop?sort=featured" linkLabel="See more" />
          <div className="rail">
            {featured.map((p) => (
              <div className="rail-item" key={p.id}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HEALTH NEEDS ================= */}
      <section className="hn">
        <div className="container">
          <div className="hn-head">
            <div>
              <h2>Shop by Health Need</h2>
              <p>Find the Anchan preparations traditionally used for your concern.</p>
            </div>
            <Link to="/categories" className="hn-all">
              View all {healthNeeds.length} categories <Icon name="arrow" size={16} />
            </Link>
          </div>

          {/* featured needs as round icon badges */}
          <div className="hn-grid">
            {FEATURED_NEEDS.map((id) => {
              const n = healthNeeds.find((x) => x.id === id);
              return (
                <Link key={id} to={`/shop?need=${id}`} className="hn-item">
                  <span className="hn-circle">
                    <span className="hn-ring" />
                    <span className="hn-photo">
                      {categoryPhotos[id] && <img src={categoryPhotos[id]} alt="" loading="lazy" />}
                    </span>
                  </span>
                  <strong>{n.name}</strong>
                  <span className="hn-count">{n.count} products</span>
                </Link>
              );
            })}
          </div>

          {/* the remaining needs as quick chips */}
          <div className="hn-chips">
            {healthNeeds
              .filter((n) => !FEATURED_NEEDS.includes(n.id))
              .map((n) => (
                <Link key={n.id} to={`/shop?need=${n.id}`} className="hn-chip">
                  {n.name}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* ================= WHY ANCHAN ================= */}
      <section className="why2">
        <img src={branch} alt="" className="why2-branch why2-branch--l" aria-hidden="true" />
        <img src={branch} alt="" className="why2-branch why2-branch--r" aria-hidden="true" />

        <div className="container">
          <div className="why2-head">
            <h2>Why buy from Anchan</h2>
            <p>
              We are the manufacturer — every pack you order comes straight from the pharmacy
              where it was prepared.
            </p>
          </div>

          <div className="why2-grid">
            <div className="why2-col">
              {WHY_LEFT.map((p) => <WhyPoint key={p.title} p={p} side="left" />)}
            </div>

            <div className="why2-art" aria-hidden="true">
              <span className="why2-disc" />
              <span className="why2-ring" />
              <img src={leaf1} alt="" className="why2-leaf why2-leaf--1" />
              <img src={leaf2} alt="" className="why2-leaf why2-leaf--2" />
              <img src={leaf3} alt="" className="why2-leaf why2-leaf--3" />
              <img src={leaf2} alt="" className="why2-leaf why2-leaf--4" />
              <img src={bottleHD} alt="" className="why2-product" loading="lazy" />
              <img src={herbsPile} alt="" className="why2-herbs" loading="lazy" />
              <span className="why2-years">
                <strong>{new Date().getFullYear() - SHOP.since}+</strong>
                <small>years of Ayurveda</small>
              </span>
            </div>

            <div className="why2-col">
              {WHY_RIGHT.map((p) => <WhyPoint key={p.title} p={p} side="right" />)}
            </div>
          </div>
        </div>
      </section>

      {/* ================= OUR PRODUCTS ================= */}
      <section className="block block--cream">
        <div className="container">
          <SectionHead title="Our Products" text="Browse a few of our ranges, or see the full price list." link="/shop" linkLabel={`All ${products.length} products`} />
          <div className="tabs" role="tablist">
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                className={`tab ${tab === t ? "is-active" : ""}`}
                onClick={() => setTab(t)}
              >
                {categories.find((c) => c.id === t).name}
              </button>
            ))}
          </div>
          <div className="grid-products">
            {tabProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="center">
            <Link to={`/shop?type=${tab}`} className="btn btn-outline btn-lg">
              View all {categories.find((c) => c.id === tab).name} <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HOW TO ORDER ================= */}
      <section className="block">
        <div className="container">
          <SectionHead title="Ordering is simple" />
          <ol className="steps">
            <li><span>1</span><h3>Add to cart</h3><p>Pick the medicine and pack size you need.</p></li>
            <li><span>2</span><h3>Share your address</h3><p>Fill in your name, phone and delivery address at checkout.</p></li>
            <li><span>3</span><h3>Confirm on WhatsApp</h3><p>Your order opens in WhatsApp — send it and we confirm payment and dispatch.</p></li>
          </ol>
        </div>
      </section>
    </>
  );
}
