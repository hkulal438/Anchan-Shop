import { useEffect } from "react";
import { SITE_URL, metaFor, productById, schemaFor } from "./seo.js";

// Keeps the title, description, canonical link, share tags and
// product details in step with the page the shopper is on.
function setMeta(attr, key, value) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

export default function useSeo(pathname) {
  useEffect(() => {
    const m = metaFor(pathname);
    const url = `${SITE_URL}${m.canonical === "/" ? "/" : m.canonical}`;
    const pm = pathname.match(/^\/product\/([^/]+)\/?$/);
    const p = pm && productById[pm[1]];
    const img = p?.image ? `${SITE_URL}${p.image}` : `${SITE_URL}/og-image.jpg`;

    document.title = m.title;
    setMeta("name", "description", m.description);
    setMeta("name", "robots", m.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    setMeta("property", "og:type", p ? "product" : "website");
    setMeta("property", "og:title", m.title);
    setMeta("property", "og:description", m.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);
    setMeta("name", "twitter:title", m.title);
    setMeta("name", "twitter:description", m.description);
    setMeta("name", "twitter:image", img);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;

    let ld = document.getElementById("ld-json");
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = "ld-json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(schemaFor(pathname));
  }, [pathname]);
}
