import { useState } from "react";
import { useCart } from "./cart";
import { PRODUCTS, getProduct, money } from "./products";
import { Link, navigate } from "./router";
import { FACTS } from "./Landing";
import { MAX_QTY, FREE_DELIVERY_OVER } from "./config";
import { newOrderId, saveOrder, loadOrder, whatsappUrl, emailUrl } from "./orders";

function QtyPicker({ qty, setQty }) {
  return (
    <div className="qty" role="group" aria-label="Quantity">
      <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
      <span aria-live="polite">{qty}</span>
      <button onClick={() => setQty(Math.min(MAX_QTY, qty + 1))} aria-label="Increase quantity">+</button>
    </div>
  );
}

export function Shop() {
  const { add } = useCart();
  return (
    <section className="section page">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link> / <span>Shop</span></nav>
        <div className="section-head">
          <h1 className="page-title">Shop</h1>
          <p>Family-friendly supplements from MEDSOL Pharmaceutical. Order by WhatsApp or email. Payment is cash on delivery.</p>
        </div>
        <div className="shop-grid">
          {PRODUCTS.map((p) => (
            <article className="p-card" key={p.id}>
              <Link to={`/product/${p.id}`} className="p-card-img" aria-label={`View ${p.name}`}>
                <img src={p.images[0]} alt={`${p.name} bottle`} />
              </Link>
              <div className="p-card-body">
                <div className="tags"><span>{p.flavor}</span><span>{p.size}</span></div>
                <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
                <p className="muted">{p.short}</p>
                <div className="p-card-foot">
                  <strong className="price">{money(p.price)}</strong>
                  <button className="btn primary sm" onClick={() => add(p.id, 1)}>Add to bag</button>
                </div>
              </div>
            </article>
          ))}
          <article className="p-card soon">
            <h3>More from MEDSOL</h3>
            <p className="muted">New products will appear here as they launch. Ask us about distribution on the contact section of the home page.</p>
          </article>
        </div>
        {FREE_DELIVERY_OVER > 0 && <p className="fine">Free delivery on orders over {money(FREE_DELIVERY_OVER)}.</p>}
      </div>
    </section>
  );
}

export function ProductPage({ id }) {
  const product = getProduct(id);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [tab, setTab] = useState("facts");

  if (!product) return <NotFound />;

  return (
    <section className="section page">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.name}</span>
        </nav>
        <div className="product-grid">
          <div className="gallery">
            <div className="gallery-main"><img src={product.images[img]} alt={`${product.name}, ${img === 0 ? "front" : "back"} of bottle`} /></div>
            <div className="thumbs">
              {product.images.map((src, i) => (
                <button key={i} className={img === i ? "on" : ""} onClick={() => setImg(i)} aria-label={i === 0 ? "Show front of bottle" : "Show back of bottle"}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          </div>
          <div className="buy">
            <div className="tags"><span>{product.flavor} flavor</span><span>{product.size}</span><span>Dietary supplement</span></div>
            <h1 className="product-title">{product.name}</h1>
            <p className="price big">{money(product.price)}</p>
            <p className="muted">{product.short}</p>
            <ul className="ticks">{product.points.map((t) => <li key={t}>{t}</li>)}</ul>
            <div className="buy-row">
              <QtyPicker qty={qty} setQty={setQty} />
              <button className="btn primary" onClick={() => { add(product.id, qty); setQty(1); }}>Add to bag</button>
              <button className="btn ghost" onClick={() => { add(product.id, qty, false); navigate("/checkout"); }}>Buy now</button>
            </div>
            <p className="fine">Cash on delivery. We confirm your order on WhatsApp or email before dispatch.</p>
          </div>
        </div>

        <div className="tabs" role="tablist" aria-label="Product details">
          {[["facts", "Supplement facts"], ["directions", "Directions"], ["allergens", "Allergens"]].map(([k, label]) => (
            <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => setTab(k)}>{label}</button>
          ))}
        </div>
        <div className="tab-panel" role="tabpanel">
          {tab === "facts" && (
            <div className="facts">
              <h3>Supplement facts</h3>
              <p className="facts-sub">Serving size: 2 gummies · Servings per container: 15</p>
              <table><tbody>{FACTS.map(([n, a, dv]) => <tr key={n}><td>{n}</td><td>{a}</td><td>{dv}</td></tr>)}</tbody></table>
              <p className="facts-sub"><strong>Other ingredients:</strong> Pectin, organic cane sugar, natural strawberry flavor, citric acid, sodium citrate, natural color (purple carrot concentrate).</p>
            </div>
          )}
          {tab === "directions" && <p>Children 4+ years: chew 1–2 gummies daily. Do not exceed the recommended dose. Store in a cool, dry place and keep out of reach of children. Always read the pack before use.</p>}
          {tab === "allergens" && <p>Free from gelatin, gluten, dairy, nuts and soy, as stated on the label.</p>}
        </div>
      </div>
    </section>
  );
}

const EMPTY = { name: "", phone: "", email: "", city: "", address: "", notes: "" };

export function Checkout() {
  const { lines, subtotal, delivery, total, clear, setQty } = useCart();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  if (lines.length === 0) {
    return (
      <section className="section page">
        <div className="container narrow center">
          <h1 className="page-title">Your bag is empty</h1>
          <p className="muted">Add a product to your bag to check out.</p>
          <Link to="/shop" className="btn primary">Go to the shop</Link>
        </div>
      </section>
    );
  }

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Enter your full name.";
    if (!/^[+\d][\d\s-]{8,}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number, for example 0300 1234567.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address or leave it empty.";
    if (form.city.trim().length < 2) e.city = "Enter your city.";
    if (form.address.trim().length < 8) e.address = "Enter your full delivery address.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const send = (channel) => {
    if (!validate()) return;
    const order = {
      id: newOrderId(),
      lines: lines.map(({ id, name, size, price, qty }) => ({ id, name, size, price, qty })),
      subtotal, delivery, total,
      customer: Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()])),
    };
    saveOrder(order);
    clear();
    navigate("/order-success");
    if (channel === "whatsapp") window.open(whatsappUrl(order), "_blank", "noopener");
    else window.location.href = emailUrl(order);
  };

  const field = (k, label, props = {}) => (
    <label>
      {label}
      {props.area ? (
        <textarea rows="3" value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} />
      ) : (
        <input value={form[k]} onChange={set(k)} aria-invalid={!!errors[k]} {...props} />
      )}
      {errors[k] && <span className="err">{errors[k]}</span>}
    </label>
  );

  return (
    <section className="section page">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/shop">Shop</Link> / <span>Checkout</span></nav>
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-grid">
          <form className="form" onSubmit={(e) => e.preventDefault()} noValidate>
            <h3>Delivery details</h3>
            {field("name", "Full name", { autoComplete: "name" })}
            {field("phone", "Phone number (WhatsApp preferred)", { autoComplete: "tel", inputMode: "tel" })}
            {field("email", "Email (optional)", { type: "email", autoComplete: "email" })}
            {field("city", "City", { autoComplete: "address-level2" })}
            {field("address", "Full address", { area: true })}
            {field("notes", "Order notes (optional)", { area: true })}
            <div className="pay">
              <strong>Payment: cash on delivery</strong>
              <span>You pay when the order arrives. No online payment is taken.</span>
            </div>
            <div className="send-row">
              <button type="button" className="btn primary" onClick={() => send("whatsapp")}>Send order on WhatsApp</button>
              <button type="button" className="btn ghost" onClick={() => send("email")}>Send order by email</button>
            </div>
            <p className="fine">Your order opens ready-to-send in WhatsApp or your email app. It is not placed until you send it and we confirm.</p>
          </form>

          <aside className="summary" aria-label="Order summary">
            <h3>Order summary</h3>
            {lines.map((l) => (
              <div className="sum-line" key={l.id}>
                <img src={l.images[0]} alt="" />
                <div>
                  <strong>{l.name}</strong>
                  <span>{l.flavor} · {l.size}</span>
                  <div className="qty small">
                    <button onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease quantity">−</button>
                    <span>{l.qty}</span>
                    <button onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase quantity" disabled={l.qty >= MAX_QTY}>+</button>
                  </div>
                </div>
                <b>{money(l.price * l.qty)}</b>
              </div>
            ))}
            <dl className="totals">
              <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
              <div><dt>Delivery</dt><dd>{delivery === 0 ? "Free" : money(delivery)}</dd></div>
              <div className="grand"><dt>Total</dt><dd>{money(total)}</dd></div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function OrderSuccess() {
  const order = loadOrder();
  if (!order) {
    return (
      <section className="section page">
        <div className="container narrow center">
          <h1 className="page-title">No recent order</h1>
          <Link to="/shop" className="btn primary">Go to the shop</Link>
        </div>
      </section>
    );
  }
  return (
    <section className="section page">
      <div className="container narrow">
        <div className="success">
          <h1 className="page-title">Almost done, {order.customer.name.split(" ")[0]}!</h1>
          <p>Your order <strong>{order.id}</strong> is ready. If WhatsApp or your email app did not open, or you did not press send, use a button below. We confirm the order after we receive your message.</p>
          <div className="send-row">
            <a className="btn primary" href={whatsappUrl(order)} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
            <a className="btn ghost" href={emailUrl(order)}>Send by email</a>
          </div>
          <dl className="totals">
            {order.lines.map((l) => (
              <div key={l.id}><dt>{l.name} × {l.qty}</dt><dd>{money(l.price * l.qty)}</dd></div>
            ))}
            <div><dt>Delivery</dt><dd>{order.delivery === 0 ? "Free" : money(order.delivery)}</dd></div>
            <div className="grand"><dt>Total (cash on delivery)</dt><dd>{money(order.total)}</dd></div>
          </dl>
          <p className="fine">Deliver to: {order.customer.address}, {order.customer.city}. Phone: {order.customer.phone}</p>
          <Link to="/shop" className="btn ghost">Continue shopping</Link>
        </div>
      </div>
    </section>
  );
}

export function NotFound() {
  return (
    <section className="section page">
      <div className="container narrow center">
        <h1 className="page-title">Page not found</h1>
        <p className="muted">That page doesn't exist. Try the shop or the home page.</p>
        <div className="send-row" style={{ justifyContent: "center" }}>
          <Link to="/shop" className="btn primary">Go to the shop</Link>
          <Link to="/" className="btn ghost">Home</Link>
        </div>
      </div>
    </section>
  );
}
