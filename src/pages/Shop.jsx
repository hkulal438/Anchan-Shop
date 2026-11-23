import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Icon from "../components/Icons";
import ProductCard from "../components/ProductCard";
import { categories, healthNeeds, products } from "../data/catalog";
import { categoryName, featured, needName, searchProducts } from "../data/helpers";
import BhasmaNote from "../components/BhasmaNote";

const PAGE = 24;

const SORTS = {
  featured: { label: "Recommended", fn: (a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0) },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.packs[0].mrp - b.packs[0].mrp },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.packs[0].mrp - a.packs[0].mrp },
  name: { label: "Name: A to Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

const featuredIds = new Set(featured.map((p) => p.id));

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  // ignore links to product types that are no longer listed (e.g. old Bhasma links)
  const type = categories.some((c) => c.id === params.get("type")) ? params.get("type") : "";
  const need = params.get("need") || "";
  const sort = SORTS[params.get("sort")] ? params.get("sort") : "featured";

  const [shown, setShown] = useState(PAGE);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [qInput, setQInput] = useState(q);

  useEffect(() => setQInput(q), [q]);
  useEffect(() => setShown(PAGE), [q, type, need, sort]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
    setFiltersOpen(false);
  };

  const list = useMemo(() => {
    let r = products;
    if (type) r = r.filter((p) => p.category === type);
    if (need) r = r.filter((p) => p.needs.includes(need));
    if (q) {
      r = searchProducts(q, r); // already ranked by relevance
      if (params.get("sort") && sort !== "featured") r = [...r].sort(SORTS[sort].fn);
      return r;
    }
    r = [...r].sort(SORTS[sort].fn);
    if (sort === "featured") {
      r.sort((a, b) => (featuredIds.has(b.id) ? 1 : 0) - (featuredIds.has(a.id) ? 1 : 0));
    }
    return r;
  }, [q, type, need, sort, params]);

  const heading = q
    ? `Results for “${q}”`
    : type
      ? categoryName(type)
      : need
        ? needName(need)
        : "All Products";

  const activeChips = [
    q && { key: "q", label: `“${q}”` },
    type && { key: "type", label: categoryName(type) },
    need && { key: "need", label: needName(need) },
  ].filter(Boolean);

  return (
    <div className="shop container">
      <div className="shop-head">
        <div>
          <h1>{heading}</h1>
          <p>{list.length} {list.length === 1 ? "product" : "products"} · prices are MRP per pack</p>
        </div>
        <div className="shop-tools">
          <form
            className="shop-search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              update("q", qInput.trim());
            }}
          >
            <Icon name="search" size={17} />
            <input
              type="search"
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              placeholder="Search in shop"
              aria-label="Search in shop"
            />
          </form>
          <label className="shop-sort">
            <span>Sort</span>
            <select value={sort} onChange={(e) => update("sort", e.target.value === "featured" ? "" : e.target.value)}>
              {Object.entries(SORTS).map(([k, s]) => (
                <option key={k} value={k}>{s.label}</option>
              ))}
            </select>
          </label>
          <button type="button" className="btn btn-outline btn-sm shop-filter-btn" onClick={() => setFiltersOpen(true)}>
            Filters
          </button>
        </div>
      </div>

      {/* Bhasma is not sold online — mention it on the full list and when someone searches for it */}
      {((!type && !need && !q) || /bhasm/i.test(q)) && <BhasmaNote />}

      {activeChips.length > 0 && (
        <div className="chips">
          {activeChips.map((c) => (
            <button key={c.key} type="button" className="chip" onClick={() => update(c.key, "")}>
              {c.label} <Icon name="close" size={14} />
            </button>
          ))}
          <button type="button" className="chip chip--clear" onClick={() => setParams({}, { replace: true })}>
            Clear all
          </button>
        </div>
      )}

      <div className="shop-layout">
        <aside className={`filters ${filtersOpen ? "is-open" : ""}`} aria-label="Filters">
          <div className="filters-head">
            <h2>Filters</h2>
            <button type="button" className="icon-btn" onClick={() => setFiltersOpen(false)} aria-label="Close filters">
              <Icon name="close" size={20} />
            </button>
          </div>

          <div className="filter-group">
            <h3>Product Type</h3>
            <button type="button" className={`filter-opt ${!type ? "is-active" : ""}`} onClick={() => update("type", "")}>
              All types <span>{products.length}</span>
            </button>
            {categories.map((c) => (
              <button key={c.id} type="button" className={`filter-opt ${type === c.id ? "is-active" : ""}`} onClick={() => update("type", c.id)}>
                {c.name} <span>{c.count}</span>
              </button>
            ))}
          </div>

          <div className="filter-group">
            <h3>Health Need</h3>
            <button type="button" className={`filter-opt ${!need ? "is-active" : ""}`} onClick={() => update("need", "")}>
              Any need
            </button>
            {healthNeeds.map((n) => (
              <button key={n.id} type="button" className={`filter-opt ${need === n.id ? "is-active" : ""}`} onClick={() => update("need", n.id)}>
                {n.name} <span>{n.count}</span>
              </button>
            ))}
          </div>
        </aside>
        {filtersOpen && <div className="filters-backdrop" onClick={() => setFiltersOpen(false)} />}

        <div className="shop-results">
          {list.length === 0 ? (
            <div className="empty">
              <Icon name="search" size={40} stroke={1.4} />
              <h2>No products found</h2>
              <p>Try another spelling, or search by concern — for example “cough” or “hair”.</p>
              <button type="button" className="btn btn-primary" onClick={() => setParams({}, { replace: true })}>
                Show all products
              </button>
            </div>
          ) : (
            <>
              <div className="grid-products grid-products--shop">
                {list.slice(0, shown).map((p, i) => <ProductCard key={p.id} product={p} eager={i < 6} />)}
              </div>
              {shown < list.length && (
                <div className="center">
                  <button type="button" className="btn btn-outline btn-lg" onClick={() => setShown((s) => s + PAGE)}>
                    Show more ({list.length - shown} left)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
