# Yumvit Kids Gummies Store (React, frontend only)

```bash
npm install
npm run dev      # local preview
npm run build    # production build in /dist
```

## Before going live, edit `src/config.js`
- `WHATSAPP_NUMBER`: your WhatsApp number with country code, digits only
- `PRICE_PKR`, `DELIVERY_FEE`, `FREE_DELIVERY_OVER`: placeholder values, set your real ones

## Add more products
Add an object to `PRODUCTS` in `src/products.js` (id, name, flavor, size, price, images). It appears in the shop automatically.

## How orders work
Checkout builds the order text and opens WhatsApp (wa.me link) or your email app. Nothing is stored on a server.
The cart is saved in the visitor's browser.
