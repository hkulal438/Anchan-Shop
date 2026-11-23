import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Icon from "./Icons";
import ProductImage from "./ProductImage";
import { useCart } from "../context/CartContext";
import { SHOP, formatPrice } from "../config";

export function QtyStepper({ line }) {
  const { setQty } = useCart();
  return (
    <div className="qty" role="group" aria-label={`Quantity of ${line.product.name}`}>
      <button type="button" onClick={() => setQty(line.id, line.size, line.qty - 1)} aria-label="Decrease">
        <Icon name="minus" size={14} />
      </button>
      <span>{line.qty}</span>
      <button type="button" onClick={() => setQty(line.id, line.size, line.qty + 1)} aria-label="Increase">
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}

export function FreeDeliveryMeter({ subtotal }) {
  const goal = SHOP.freeDeliveryAbove;
  const left = Math.max(0, goal - subtotal);
  const pct = Math.min(100, (subtotal / goal) * 100);
  return (
    <div className="meter">
      <p>
        {left > 0 ? (
          <>Add <strong>{formatPrice(left)}</strong> more for free delivery</>
        ) : (
          <>Your order qualifies for <strong>free delivery</strong></>
        )}
      </p>
      <div className="meter-track"><span style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export default function CartDrawer() {
  const { items, subtotal, open, setOpen, remove } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  return (
    <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="drawer-backdrop" onClick={() => setOpen(false)} />
      <aside className="drawer-panel" role="dialog" aria-modal="true" aria-label="Your cart">
        <div className="drawer-head">
          <h2>Your Cart</h2>
          <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close cart">
            <Icon name="close" size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <Icon name="leaf" size={42} stroke={1.4} />
            <p>Your cart is empty.</p>
            <Link to="/shop" className="btn btn-primary" onClick={() => setOpen(false)}>
              Browse products
            </Link>
          </div>
        ) : (
          <>
            <FreeDeliveryMeter subtotal={subtotal} />
            <ul className="drawer-list">
              {items.map((l) => (
                <li key={l.id + l.size} className="line">
                  <Link to={`/product/${l.id}`} className="line-img" onClick={() => setOpen(false)}>
                    <ProductImage product={l.product} />
                  </Link>
                  <div className="line-info">
                    <Link to={`/product/${l.id}`} className="line-name" onClick={() => setOpen(false)}>
                      {l.product.name}
                    </Link>
                    <span className="line-meta">{l.size} · {formatPrice(l.price)}</span>
                    <QtyStepper line={l} />
                  </div>
                  <div className="line-end">
                    <strong>{formatPrice(l.total)}</strong>
                    <button type="button" className="line-remove" onClick={() => remove(l.id, l.size)} aria-label={`Remove ${l.product.name}`}>
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="drawer-foot">
              <div className="drawer-total">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={() => {
                  setOpen(false);
                  navigate("/checkout");
                }}
              >
                Checkout <Icon name="arrow" size={18} />
              </button>
              <button type="button" className="btn btn-ghost btn-block" onClick={() => setOpen(false)}>
                Continue shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
