// =========================================================
// SHOP SEO — one place for the shop address, every page's
// title / description, and the product details Google reads.
// Used by the app (live tags) and by vite.config.js, which writes
// a ready-made HTML file for every page and product at build time.
// =========================================================

import { categories, healthNeeds, products } from "./data/catalog.js";

// Change this when the shop moves to its own domain (e.g. shop.anchanayurveda.com)
export const SITE_URL = "https://anchan-shop.vercel.app";
// The main Anchan Ayurveda website
export const MAIN_SITE = "https://www.anchanayurveda.com";

const BRAND = "Anchan Ayurveda Shop";
const ORG = "Anchan Ayurvedic Industries";

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Anchan Clinic, Arjuna Complex, Dhanvantari Road, NH 66",
  addressLocality: "Padubidri",
  addressRegion: "Karnataka",
  postalCode: "574111",
  addressCountry: "IN",
};

const clip = (s, n = 158) => {
  s = String(s || "").replace(/\s+/g, " ").trim();
  return s.length <= n ? s : s.slice(0, n - 1).replace(/[\s,;.–-]+\S*$/, "") + "…";
};

// tidy label text: "Insomnia , Hypertension" -> "Insomnia, Hypertension"
const tidy = (s) => String(s).replace(/\s+([,.;])/g, "$1").replace(/\s+/g, " ").replace(/[.\s]+$/, "").trim();

const rupees = (n) => "₹" + Number(n).toLocaleString("en-IN");

// ---------------------------------------------------------
// Fixed pages
// ---------------------------------------------------------
export const PAGES = {
  "/": {
    title: "Anchan Ayurveda Shop | Buy Ayurvedic Medicines Online – Padubidri",
    description:
      "Order authentic Ayurvedic medicines from Anchan Ayurvedic Industries, Padubidri – arishtas, asavas, tailas, lehyas, churnas, tablets & capsules. Easy WhatsApp ordering.",
  },
  "/shop": {
    title: `All Ayurvedic Products – Price List | ${BRAND}`,
    description:
      "Browse the full range of Anchan Ayurvedic medicines with MRP for every pack size – arishtas, asavas, tailas, lehyas, churnas, syrups, tablets and capsules.",
  },
  "/categories": {
    title: `Shop by Health Need | ${BRAND}`,
    description:
      "Find Anchan Ayurvedic medicines by health need – digestion, joint pain, cough & asthma, diabetes, skin, hair, women's health, children and more.",
  },
  "/product-types": {
    title: `Shop by Product Type | ${BRAND}`,
    description:
      "Shop Anchan Ayurvedic medicines by type – Arishta & Asava, Taila & Oils, Leha & Rasayana, Churna, Syrups, Tablets, Capsules, Vati & Guggulu and more.",
  },
  "/about": {
    title: `About Us | ${BRAND} – ${ORG}, Padubidri`,
    description:
      "The online shop of Anchan Ayurvedic Industries, Padubidri, Udupi – GMP-certified maker of classical Ayurvedic medicines. Order easily on WhatsApp.",
  },
  "/consult": {
    title: `Consult Dr. N. T. Anchan – Ayurvedic Doctor | ${BRAND}`,
    description:
      "Book a consultation with Dr. N. T. Anchan, Ayurvedic physician at Anchan Clinic, Padubidri – in person or by phone, arranged on WhatsApp.",
  },
  // useful to visitors, but not pages people search for
  "/checkout": { title: `Checkout | ${BRAND}`, description: "Review your cart and send your order on WhatsApp.", noindex: true },
  "/track-order": { title: `Track Your Order | ${BRAND}`, description: "Check the status of your Anchan Ayurveda order on WhatsApp.", noindex: true },
};

const categoryName = (id) => categories.find((c) => c.id === id)?.name || "Ayurvedic Medicine";
const needNames = (p) =>
  (p.needs || []).map((n) => healthNeeds.find((h) => h.id === n)?.name).filter(Boolean);

// ---------------------------------------------------------
// Product pages
// ---------------------------------------------------------
export function productMeta(p) {
  const prices = (p.packs || []).map((k) => k.mrp).filter((n) => n > 0);
  const from = prices.length ? ` from ${rupees(Math.min(...prices))}` : "";
  const sizes = (p.packs || []).map((k) => k.size).join(", ");
  return {
    title: `${p.name} – Buy Online${from} | Anchan Ayurveda`,
    description: clip(
      `Buy ${p.name}${sizes ? ` (${sizes})` : ""} from ${ORG}, Padubidri. ` +
        `${tidy(p.short || p.indication || "")}. Order on WhatsApp.`
    ),
  };
}

export const productById = Object.fromEntries(products.map((p) => [p.id, p]));

// title/description/robots for any path
export function metaFor(path) {
  const m = path.match(/^\/product\/([^/]+)\/?$/);
  if (m && productById[m[1]]) return { ...productMeta(productById[m[1]]), canonical: path };
  const page = PAGES[path] || PAGES["/"];
  return { ...page, canonical: PAGES[path] ? path : "/" };
}

// ---------------------------------------------------------
// Structured data (JSON-LD)
// ---------------------------------------------------------
const orgNode = {
  "@type": ["Organization", "OnlineStore"],
  "@id": `${SITE_URL}/#store`,
  name: BRAND,
  alternateName: ["Anchan Ayurveda", ORG, "Anchan Shop"],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: "+91-9448445440",
  address: ADDRESS,
  parentOrganization: { "@type": "Organization", name: ORG, url: `${MAIN_SITE}/` },
  sameAs: [`${MAIN_SITE}/`],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9448445440",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Kannada"],
  },
};

const siteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BRAND,
  publisher: { "@id": `${SITE_URL}/#store` },
  inLanguage: "en-IN",
};

function productNode(p) {
  const url = `${SITE_URL}/product/${p.id}`;
  const prices = (p.packs || []).map((k) => k.mrp).filter((n) => n > 0);
  const node = {
    "@type": "Product",
    "@id": `${url}#product`,
    name: p.name,
    url,
    sku: p.id,
    description: clip(tidy(p.indication || p.short || p.name), 500),
    category: categoryName(p.category),
    brand: { "@type": "Brand", name: "Anchan Ayurveda" },
    manufacturer: { "@type": "Organization", name: ORG, url: `${MAIN_SITE}/` },
  };
  if (p.image) node.image = [`${SITE_URL}${p.image}`];
  const needs = needNames(p);
  if (needs.length) node.keywords = needs.join(", ");
  if (prices.length) {
    node.offers = {
      "@type": "AggregateOffer",
      priceCurrency: "INR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: "https://schema.org/InStock",
      url,
      seller: { "@id": `${SITE_URL}/#store` },
    };
  }
  return node;
}

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export function schemaFor(path) {
  const graph = [orgNode, siteNode];
  const m = path.match(/^\/product\/([^/]+)\/?$/);
  const p = m && productById[m[1]];
  if (p) {
    graph.push(productNode(p));
    graph.push(
      breadcrumb([
        ["Home", "/"],
        [categoryName(p.category), `/shop?type=${p.category}`],
        [p.name, `/product/${p.id}`],
      ])
    );
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

// ---------------------------------------------------------
// <head> tags (build time)
// ---------------------------------------------------------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

export function headHtml(path) {
  const m = metaFor(path);
  const url = `${SITE_URL}${m.canonical === "/" ? "/" : m.canonical}`;
  const pm = path.match(/^\/product\/([^/]+)\/?$/);
  const p = pm && productById[pm[1]];
  const img = p?.image ? `${SITE_URL}${p.image}` : `${SITE_URL}/og-image.jpg`;
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${p ? "product" : "website"}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<script type="application/ld+json" id="ld-json">${JSON.stringify(schemaFor(path)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

// plain-text fallback for crawlers without JavaScript
export function noscriptHtml(path) {
  const m = metaFor(path);
  const pm = path.match(/^\/product\/([^/]+)\/?$/);
  const p = pm && productById[pm[1]];
  const lines = [`<h1>${esc(p ? p.name : m.title.split(" | ")[0])}</h1>`, `<p>${esc(m.description)}</p>`];
  if (p) {
    if (p.indication) lines.push(`<p>Indications: ${esc(p.indication)}</p>`);
    if (p.ingredients) lines.push(`<p>Ingredients: ${esc(p.ingredients)}</p>`);
    if (p.packs?.length) lines.push(`<p>Packs (MRP): ${esc(p.packs.map((k) => `${k.size} ${rupees(k.mrp)}`).join(", "))}</p>`);
  }
  lines.push(`<p>${ORG}, Dhanvantari Road, NH 66, Padubidri, Udupi, Karnataka 574111 · +91 94484 45440</p>`);
  lines.push(
    `<p><a href="/">Home</a> · <a href="/shop">All products</a> · <a href="/categories">Shop by health need</a> · <a href="/product-types">Shop by product type</a> · <a href="/about">About</a> · <a href="/consult">Consult Dr. Anchan</a></p>`
  );
  return lines.join("\n      ");
}

// every indexable path, for the sitemap and the per-page HTML files
export const ALL_PATHS = [
  ...Object.keys(PAGES),
  ...products.map((p) => `/product/${p.id}`),
];
