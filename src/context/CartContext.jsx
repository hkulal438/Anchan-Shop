import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products } from "../data/catalog";
<<<<<<< HEAD
=======
import { isConsultOnly } from "../data/helpers";
>>>>>>> 8ba4a90 (..)

const CartContext = createContext(null);
const KEY = "anchan-shop-cart";

const byId = Object.fromEntries(products.map((p) => [p.id, p]));

const load = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    // keep only lines that still match a product + pack
<<<<<<< HEAD
    return saved.filter((l) => byId[l.id] && byId[l.id].packs.some((k) => k.size === l.size));
=======
    return saved.filter(
      (l) => byId[l.id] && !isConsultOnly(byId[l.id]) && byId[l.id].packs.some((k) => k.size === l.size)
    );
>>>>>>> 8ba4a90 (..)
  } catch {
    return [];
  }
};

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable — cart still works for this visit */
    }
  }, [lines]);

  const value = useMemo(() => {
    const items = lines.map((l) => {
      const product = byId[l.id];
      const pack = product.packs.find((k) => k.size === l.size);
      return { ...l, product, price: pack.mrp, total: pack.mrp * l.qty };
    });

    const add = (id, size, qty = 1) =>
      setLines((prev) => {
<<<<<<< HEAD
=======
        if (isConsultOnly(byId[id])) return prev; // prescribed medicines are not sold online
>>>>>>> 8ba4a90 (..)
        const found = prev.find((l) => l.id === id && l.size === size);
        if (found) return prev.map((l) => (l === found ? { ...l, qty: Math.min(99, l.qty + qty) } : l));
        return [...prev, { id, size, qty }];
      });

    const setQty = (id, size, qty) =>
      setLines((prev) =>
        qty <= 0
          ? prev.filter((l) => !(l.id === id && l.size === size))
          : prev.map((l) => (l.id === id && l.size === size ? { ...l, qty: Math.min(99, qty) } : l))
      );

    const remove = (id, size) => setLines((prev) => prev.filter((l) => !(l.id === id && l.size === size)));
    const clear = () => setLines([]);

    return {
      items,
      count: items.reduce((s, l) => s + l.qty, 0),
      subtotal: items.reduce((s, l) => s + l.total, 0),
      add,
      setQty,
      remove,
      clear,
      open,
      setOpen,
    };
  }, [lines, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
