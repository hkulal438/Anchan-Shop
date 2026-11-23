import { SHOP, formatPrice } from "../config";

const wa = (text) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;

// Short order reference, e.g. ANC-251123-4821
export function newOrderRef() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `ANC-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// Orders placed from this browser, so Track Order can offer them
const ORDERS_KEY = "anchan-shop-orders";

export function saveOrder(order) {
  try {
    const list = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...list].slice(0, 10)));
  } catch {
    /* storage unavailable */
  }
}

export function savedOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function trackLink({ ref, phone, name }) {
  return wa(
    [
      `Hello ${SHOP.shortName}, please share the status of my order.`,
      "",
      ref ? `Order ref: ${ref}` : null,
      `Mobile used for the order: ${phone}`,
      name ? `Name: ${name}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n")
  );
}

export function consultLink(f) {
  return wa(
    [
      `Hello, I would like to book a consultation with Dr. N. T. Anchan.`,
      "",
      `Name: ${f.name}`,
      `Age: ${f.age}`,
      `Mobile: ${f.phone}`,
      `Concern: ${f.concern}`,
      `Preferred consultation: ${f.mode}`,
      f.message ? `Details: ${f.message}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n")
  );
}

// Builds the WhatsApp order message and returns a wa.me link
export function orderLink({ items, subtotal, delivery, customer, ref }) {
  const lines = items.map(
    (l, i) => `${i + 1}. ${l.product.name} — ${l.size} × ${l.qty} = ${formatPrice(l.total)}`
  );

  const text = [
    `Hello ${SHOP.shortName}, I would like to place an order:`,
    ref ? `Order ref: ${ref}` : null,
    "",
    ...lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    `Delivery: ${delivery === 0 ? "Free" : "To be confirmed"}`,
    "",
    "Delivery details",
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address}`,
    `Pincode: ${customer.pincode}`,
    customer.note ? `Note: ${customer.note}` : null,
  ]
    .filter((l) => l !== null)
    .join("\n");

  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
}

// Bhasma and other doctor-prescribed medicines: start a consultation enquiry
export function prescriptionLink(productName) {
  return wa(
    `Hello ${SHOP.shortName}, I would like to enquire about ${productName}. ` +
      "I understand it is given after a doctor's consultation — please call me back."
  );
}

export function askLink(productName) {
  const text = `Hello ${SHOP.shortName}, I have a question about ${productName}.`;
  return `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(text)}`;
}
