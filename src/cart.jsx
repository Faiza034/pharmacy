import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "./products";
import { DELIVERY_FEE, FREE_DELIVERY_OVER, MAX_QTY } from "./config";

const CartContext = createContext(null);
const KEY = "yumvit-cart";

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!Array.isArray(raw)) return [];
    return raw.filter((i) => getProduct(i.id) && i.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: cart still works for this visit */
    }
  }, [items]);

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...getProduct(i.id), qty: i.qty }));
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.price * l.qty, 0);
    const free = FREE_DELIVERY_OVER > 0 && subtotal >= FREE_DELIVERY_OVER;
    const delivery = subtotal === 0 || free ? 0 : DELIVERY_FEE;
    const clampQty = (n) => Math.min(MAX_QTY, n);

    return {
      lines,
      count,
      subtotal,
      delivery,
      total: subtotal + delivery,
      open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add: (id, qty = 1, showDrawer = true) => {
        setItems((prev) => {
          const found = prev.find((i) => i.id === id);
          if (found) return prev.map((i) => (i.id === id ? { ...i, qty: clampQty(i.qty + qty) } : i));
          return [...prev, { id, qty: clampQty(qty) }];
        });
        if (showDrawer) setOpen(true);
      },
      setQty: (id, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i))
        ),
      remove: (id) => setItems((prev) => prev.filter((i) => i.id !== id)),
      clear: () => setItems([]),
    };
  }, [items, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
