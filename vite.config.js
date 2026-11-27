import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";
import { ALL_PATHS, PAGES, SITE_URL, headHtml, noscriptHtml } from "./src/seo.js";

// Fills in the SEO tags and, after the build, writes a ready-made HTML file
// for every page and every product (product/manasa/index.html …) with its own
// title, description, link and product details — plus sitemap.xml — so search
// engines see the right information without running any JavaScript.
function seoPages() {
  let outDir = "dist";
  const fill = (html, route) =>
    html
      .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${headHtml(route)}\n    <!--seo:end-->`)
      .replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>\n      ${noscriptHtml(route)}\n    </noscript>`);

  return {
    name: "seo-pages",
    configResolved(cfg) {
      outDir = path.resolve(cfg.root, cfg.build.outDir);
    },
    transformIndexHtml(html) {
      return fill(html, "/");
    },
    closeBundle() {
      const indexFile = path.join(outDir, "index.html");
      if (!fs.existsSync(indexFile)) return;
      const base = fs.readFileSync(indexFile, "utf8");
      for (const route of ALL_PATHS) {
        if (route === "/") continue;
        const dir = path.join(outDir, route.slice(1));
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), fill(base, route));
      }
      const today = new Date().toISOString().slice(0, 10);
      const urls = ALL_PATHS.filter((r) => !PAGES[r]?.noindex)
        .map((r) => {
          const pr = r === "/" ? "1.0" : r.startsWith("/product/") ? "0.7" : "0.8";
          return `  <url>\n    <loc>${SITE_URL}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${pr}</priority>\n  </url>`;
        })
        .join("\n");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );
      fs.writeFileSync(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
    },
  };
}

export default defineConfig({
  plugins: [react(), seoPages()],
  server: { port: 5174 },
});
