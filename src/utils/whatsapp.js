import { SHOP } from "../config";

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

// ---- Invoice-style order message ----
// WhatsApp shows text between ``` in a fixed-width font, so the item table lines up.
const W = 32; // characters per table row (fits a phone screen)
const money = (n) => Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pad = (s, n) => String(s).padEnd(n).slice(0, n);
const lpad = (s, n) => String(s).padStart(n);
const hr = (c = "-") => c.repeat(W);

// wrap text into chunks no wider than n, breaking at spaces
function wrap(text, n) {
  const out = [];
  let line = "";
  for (const word of String(text).split(/\s+/)) {
    if (!line) line = word;
    else if ((line + " " + word).length <= n) line += " " + word;
    else { out.push(line); line = word; }
    while (line.length > n) { out.push(line.slice(0, n)); line = line.slice(n); }
  }
  if (line) out.push(line);
  return out;
}

// No(2) + Item(17) + Qty(4) + Amount(9) = 32
function itemRows(l, i) {
  const name = wrap(`${l.product.name} (${l.size})`, 16);
  return name.map((part, k) =>
    k === 0
      ? pad(i + 1, 3) + pad(part, 16) + lpad(l.qty, 4) + lpad(money(l.total), 9)
      : "   " + part
  );
}

const sumRow = (label, value) => pad(label, W - String(value).length) + value;

function invoiceDate(d = new Date()) {
  return d.toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true,
  });
}

// Builds the WhatsApp order (invoice) message and returns a wa.me link
export function orderLink({ items, subtotal, delivery, customer, ref }) {
  const freeDelivery = delivery === 0;
  const table = [
    "```",
    pad("#", 3) + pad("Item", 16) + lpad("Qty", 4) + lpad("Amt (₹)", 9),
    hr(),
    ...items.flatMap(itemRows),
    hr(),
    sumRow("Subtotal", money(subtotal)),
    sumRow("Delivery", freeDelivery ? "FREE" : "To be confirmed"),
    hr("="),
    sumRow(freeDelivery ? "TOTAL (₹)" : "TOTAL* (₹)", money(subtotal)),
    hr("="),
    "```",
  ];

  const text = [
    `*ORDER INVOICE*`,
    `*${SHOP.name}*`,
    SHOP.address,
    `Ph: ${SHOP.phoneDisplay}`,
    "",
    ref ? `*Invoice No:* ${ref}` : null,
    `*Date:* ${invoiceDate()}`,
    "",
    "*Bill To*",
    customer.name,
    `Phone: ${customer.phone}`,
    `Address: ${customer.address} – ${customer.pincode}`,
    customer.note ? `Note: ${customer.note}` : null,
    "",
    ...table,
    freeDelivery ? null : "_* Delivery charge will be added on confirmation._",
    `*Items:* ${items.length}  |  *Qty:* ${items.reduce((n, l) => n + l.qty, 0)}`,
    `*Payment:* To be confirmed on WhatsApp`,
    "",
    "Please confirm my order. Thank you!",
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
