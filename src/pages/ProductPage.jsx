import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import Icon, { WhatsAppIcon } from "../components/Icons";
import ProductCard from "../components/ProductCard";
import ProductImage from "../components/ProductImage";
import { products } from "../data/catalog";
import { categoryName, needName, productById } from "../data/helpers";
import { useCart } from "../context/CartContext";
import { askLink } from "../utils/whatsapp";
import { SHOP, formatPrice } from "../config";

export default function ProductPage() {
  const { id } = useParams();
  const product = productById[id];
  const { add, setOpen } = useCart();
  const navigate = useNavigate();
  const [size, setSize] = useState(product?.packs[0]?.size);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setSize(product?.packs[0]?.size);
    setQty(1);
  }, [product]);

  useEffect(() => {
    if (product) document.title = `${product.name} — Anchan Ayurveda Shop`;
    return () => { document.title = "Anchan Ayurveda Shop"; };
  }, [product]);

  if (!product) return <Navigate to="/shop" replace />;

  const pack = product.packs.find((k) => k.size === size) || product.packs[0];

  const related = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.needs.some((n) => product.needs.includes(n))))
    .sort((a, b) =>
      (b.image ? 2 : 0) + (b.category === product.category ? 1 : 0) -
      ((a.image ? 2 : 0) + (a.category === product.category ? 1 : 0))
    )
    .slice(0, 4);

  return (
    <div className="container pdp">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <Icon name="chevron" size={14} />
        <Link to={`/shop?type=${product.category}`}>{categoryName(product.category)}</Link>
        <Icon name="chevron" size={14} />
        <span>{product.name}</span>
      </nav>

      <div className="pdp-grid">
        <div className="pdp-media">
          <ProductImage product={product} eager />
        </div>

        <div className="pdp-info">
          <p className="pdp-cat">{categoryName(product.category)}</p>
          <h1>{product.name}</h1>
          <p className="pdp-ref">
            <Icon name="scroll" size={16} />
            {product.proprietary ? "Anchan proprietary formulation" : `Reference: ${product.reference}`}
          </p>

          {product.short && <p className="pdp-short">{product.short}</p>}

          <div className="pdp-price">
            <strong>{formatPrice(pack.mrp * qty)}</strong>
            <span>MRP {formatPrice(pack.mrp)} per {pack.size} pack · inclusive of all taxes</span>
          </div>

          <div className="pdp-packs">
            <h2>Pack size</h2>
            <div className="pack-chips" role="radiogroup" aria-label="Pack size">
              {product.packs.map((k) => (
                <button
                  key={k.size}
                  type="button"
                  role="radio"
                  aria-checked={k.size === pack.size}
                  className={`pack-chip ${k.size === pack.size ? "is-active" : ""}`}
                  onClick={() => setSize(k.size)}
                >
                  <strong>{k.size}</strong>
                  <span>{formatPrice(k.mrp)}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pdp-buy">
            <div className="qty qty--lg" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease"><Icon name="minus" size={16} /></button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((n) => Math.min(99, n + 1))} aria-label="Increase"><Icon name="plus" size={16} /></button>
            </div>
            <button type="button" className="btn btn-outline btn-lg" onClick={() => { add(product.id, pack.size, qty); setOpen(true); }}>
              <Icon name="cart" size={18} /> Add to cart
            </button>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => { add(product.id, pack.size, qty); navigate("/checkout"); }}>
              Buy Now
            </button>
          </div>

          <a className="pdp-ask" href={askLink(product.name)} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} /> Have a question? Ask us on WhatsApp
          </a>

          <ul className="pdp-perks">
            <li><Icon name="truck" size={18} /> Free delivery above {formatPrice(SHOP.freeDeliveryAbove)}</li>
            <li><Icon name="shield" size={18} /> Made in our GMP-certified unit</li>
          </ul>
        </div>
      </div>

      <div className="pdp-details">
        {product.indication && (
          <section>
            <h2>Indications</h2>
            <p>{product.indication}</p>
          </section>
        )}
        {product.ingredients && (
          <section>
            <h2>Ingredients</h2>
            <p>{product.ingredients}</p>
          </section>
        )}
        <section>
          <h2>Good to know</h2>
          <ul className="pdp-facts">
            <li><span>Type</span>{categoryName(product.category)}</li>
            <li><span>Classical reference</span>{product.reference}</li>
            {product.needs.length > 0 && (
              <li>
                <span>Health needs</span>
                <span className="pdp-needs">
                  {product.needs.map((n) => (
                    <Link key={n} to={`/shop?need=${n}`}>{needName(n)}</Link>
                  ))}
                </span>
              </li>
            )}
            <li><span>Packs available</span>{product.packs.map((k) => k.size).join(", ")}</li>
          </ul>
          <p className="pdp-note">
            Dosage depends on age and condition. Please take Ayurvedic medicines as directed by your physician.
          </p>
        </section>
      </div>

      {related.length > 0 && (
        <section className="pdp-related">
          <h2>You may also need</h2>
          <div className="grid-products">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
