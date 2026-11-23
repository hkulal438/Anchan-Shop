import React, { useState } from "react";
import { Link } from "react-router-dom";

import Icon, { WhatsAppIcon } from "../components/Icons";
import ProductImage from "../components/ProductImage";
import { FreeDeliveryMeter, QtyStepper } from "../components/CartDrawer";
import { useCart } from "../context/CartContext";
import { newOrderRef, orderLink, saveOrder } from "../utils/whatsapp";
import { SHOP, formatPrice } from "../config";

const empty = { name: "", phone: "", address: "", pincode: "", note: "" };

export default function Checkout() {
  const { items, subtotal, remove, clear } = useCart();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [ref, setRef] = useState("");

  const delivery = subtotal >= SHOP.freeDeliveryAbove ? 0 : null;

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) e.phone = "Enter a 10-digit mobile number";
    if (form.address.trim().length < 10) e.address = "Please enter your full address";
    if (!/^\d{6}$/.test(form.pincode.trim())) e.pincode = "Enter a 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const orderRef = newOrderRef();
    const url = orderLink({ items, subtotal, delivery, customer: form, ref: orderRef });
    window.open(url, "_blank", "noopener");
    saveOrder({
      ref: orderRef,
      date: new Date().toISOString(),
      phone: form.phone,
      name: form.name,
      total: subtotal,
      items: items.map((l) => `${l.product.name} (${l.size}) × ${l.qty}`),
    });
    setRef(orderRef);
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (sent) {
    return (
      <div className="container checkout-done">
        <span className="done-icon"><WhatsAppIcon size={36} /></span>
        <h1>Almost done — send the message in WhatsApp</h1>
        <p className="done-ref">
          Your order reference: <strong>{ref}</strong>
          <span>Keep it to track your order.</span>
        </p>
        <p>
          Your order has been written into a WhatsApp message to {SHOP.phoneDisplay}. Press
          send there, and our team will confirm the total, payment and dispatch with you.
        </p>
        <div className="done-actions">
          <a className="btn btn-wa btn-lg" href={orderLink({ items, subtotal, delivery, customer: form, ref })} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={18} /> Open WhatsApp again
          </a>
          <Link to="/shop" className="btn btn-outline btn-lg" onClick={clear}>
            Done — clear cart
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container checkout-done">
        <span className="done-icon done-icon--muted"><Icon name="cart" size={34} /></span>
        <h1>Your cart is empty</h1>
        <p>Add a few products and come back here to place your order on WhatsApp.</p>
        <div className="done-actions">
          <Link to="/shop" className="btn btn-primary btn-lg">Browse products</Link>
        </div>
      </div>
    );
  }

  const field = (k, label, props = {}) => (
    <label className={`field ${errors[k] ? "has-error" : ""}`}>
      <span>{label}</span>
      {props.textarea ? (
        <textarea value={form[k]} onChange={set(k)} rows={3} {...props.input} />
      ) : (
        <input value={form[k]} onChange={set(k)} {...props.input} />
      )}
      {errors[k] && <small>{errors[k]}</small>}
    </label>
  );

  return (
    <div className="container checkout">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={submit} noValidate>
          <h2>Delivery details</h2>
          <div className="field-row">
            {field("name", "Full name", { input: { autoComplete: "name" } })}
            {field("phone", "Mobile number", { input: { type: "tel", inputMode: "tel", autoComplete: "tel" } })}
          </div>
          {field("address", "Address (house, street, area, city)", { textarea: true, input: { autoComplete: "street-address" } })}
          <div className="field-row">
            {field("pincode", "Pincode", { input: { inputMode: "numeric", maxLength: 6, autoComplete: "postal-code" } })}
            {field("note", "Note for us (optional)", {})}
          </div>

          <div className="checkout-how">
            <Icon name="chat" size={20} />
            <p>
              Placing the order opens WhatsApp with your cart and address filled in. Send the
              message and we will confirm the final amount, payment options and delivery time.
            </p>
          </div>

          <button type="submit" className="btn btn-wa btn-lg btn-block">
            <WhatsAppIcon size={20} /> Place order on WhatsApp
          </button>
        </form>

        <aside className="summary">
          <h2>Order summary</h2>
          <FreeDeliveryMeter subtotal={subtotal} />
          <ul className="summary-list">
            {items.map((l) => (
              <li key={l.id + l.size} className="line">
                <div className="line-img"><ProductImage product={l.product} /></div>
                <div className="line-info">
                  <Link to={`/product/${l.id}`} className="line-name">{l.product.name}</Link>
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
          <dl className="summary-totals">
            <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : "Confirmed on WhatsApp"}</dd></div>
            <div className="summary-grand"><dt>Total</dt><dd>{formatPrice(subtotal)}{delivery === 0 ? "" : " + delivery"}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
