import { categories, healthNeeds, products } from "./catalog";

export const productById = Object.fromEntries(products.map((p) => [p.id, p]));

// Categories sold only after a doctor's consultation — shown in the shop,
// but enquired about on WhatsApp instead of being added to the cart.
export const CONSULT_ONLY_CATEGORIES = ["bhasma"];
export const isConsultOnly = (p) => CONSULT_ONLY_CATEGORIES.includes(p?.category);
export const categoryName = (id) => categories.find((c) => c.id === id)?.name || "";
export const needName = (id) => healthNeeds.find((n) => n.id === id)?.name || "";

const pick = (ids) => ids.map((id) => productById[id]).filter(Boolean);

// Hand-picked for the home page (all have real photos)
export const bestSellers = pick([
  "manasa",
  "rumovin-liniment",
  "shwasari-syrup",
  "pusti-syrup",
  "nirvedan-novina-taila",
  "madhuna",
  "chyavanaprasha-leha",
  "bhringamalaka-taila",
]);

export const featured = pick([
  "madiphala-rasayana",
  "rumovin-capsule",
  "dhatupusti-leha",
  "kumari-shampoo",
  "gandhaka-malahara",
  "anchan-pain-balm",
  "bananthi-taila",
  "kalamegha",
]);

// simple, forgiving search across name, type, indication and ingredients
const fold = (s) => s.toLowerCase().replace(/th/g, "t").replace(/sh/g, "s").replace(/aa/g, "a").replace(/[^a-z0-9 ]/g, "");

export function searchProducts(query, list = products) {
  const q = fold(query.trim());
  if (!q) return list;
  const terms = q.split(/\s+/);
  return list
    .map((p) => {
      const name = fold(p.name);
      const ind = fold(`${p.short} ${p.indication}`);
      const rest = fold(`${categoryName(p.category)} ${p.ingredients} ${p.needs.map(needName).join(" ")}`);
      let score = 0;
      for (const t of terms) {
        if (name.startsWith(t)) score += 12;
        else if (name.includes(t)) score += 8;
        else if (ind.includes(t)) score += 3 + (fold(p.short).includes(t) ? 2 : 0);
        else if (rest.includes(t)) score += 1;
        else return null;
      }
      // small nudge for products with photos / Anchan originals
      score += (p.image ? 1 : 0) + (p.proprietary ? 0.5 : 0);
      return { p, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}
