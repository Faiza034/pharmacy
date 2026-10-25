import { useState } from "react";
import card from "./assets/medsol-card.png";
import bottleFront from "./assets/yumvit-front.png";
import bottleBack from "./assets/yumvit-back.png";
import { useCart } from "./cart";
import { getProduct, money } from "./products";
import { navigate, scrollToId } from "./router";
import { STORE_EMAIL as EMAIL } from "./config";

const FAQS = [
  ["What is Yumvit Kids Multivitamin Gummies?", "A strawberry-flavored, pectin-based dietary supplement for children, made by MEDSOL Pharmaceutical Pvt. Ltd. Each bottle holds 30 gummies."],
  ["What is the age guidance for Yumvit Kids?", "The pack says children 4+ years can chew 1–2 gummies daily. Do not exceed the recommended dose. If you're unsure, ask a healthcare professional first."],
  ["Where can I find the ingredients and nutrition information?", "Both are printed on the back of the bottle, and a summary is in the product information section. The pack is always the primary source."],
  ["How much does Yumvit Kids cost?", "The price is shown on the shop page. Delivery charges, if any, are added at checkout."],
  ["How do I place an order?", "Add Yumvit to your bag, fill in the checkout form and send your order on WhatsApp or by email. We confirm delivery details with you, and payment is cash on delivery."],
  ["How do I contact MEDSOL Pharmaceutical?", `Email ${EMAIL}. Our head office is at Shalimar View Housing Scheme, Sultan Mehmood Road, Lahore.`],
];

export const FACTS = [
  ["Vitamin A (as Beta Carotene)", "250 mcg", "28% DV"],
  ["Vitamin C (as Ascorbic Acid)", "30 mg", "33% DV"],
  ["Vitamin D3 (as Cholecalciferol)", "10 mcg (400 IU)", "50% DV"],
  ["Vitamin E (as d-Alpha Tocopherol)", "3 mg", "20% DV"],
  ["Zinc (as Zinc Citrate)", "2.5 mg", "23% DV"],
];

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="pill">Now launching: Yumvit Kids Multivitamin Gummies</p>
          <h1>A little care for their everyday journey</h1>
          <p className="lead">
            Yumvit is a friendly, family-focused food supplement from MEDSOL Pharmaceutical. Ingredients and usage guidance
            are printed clearly on the pack, so parents can decide with confidence.
          </p>
          <div className="btn-row">
            <button className="btn primary" onClick={() => navigate("/shop")}>Shop now</button>
            <button className="btn ghost" onClick={() => scrollToId("product")}>Discover Yumvit</button>
          </div>
          <ul className="trust">
            <li>Pectin-based and halal certified</li>
            <li>Clear usage guidance on pack</li>
            <li>Made by MEDSOL, Lahore</li>
          </ul>
        </div>
        <div className="hero-art">
          <div className="blob" aria-hidden="true" />
          <img className="hero-bottle" src={bottleFront} alt="Yumvit Kids Multivitamin Gummies bottle, 30 gummies, strawberry flavor" />
          <span className="sticker s1">30 gummies</span>
          <span className="sticker s2">Strawberry flavor</span>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    ["Family-focused product information", "Everything about Yumvit is written in plain language, so parents and caregivers can see what it is, what it contains and how to use it."],
    ["Clear ingredient and usage guidance", "The full ingredient list, supplement facts and directions are on the bottle. We point to the pack first, always."],
    ["Customer support and product inquiries", "Questions about Yumvit, availability or distribution? The MEDSOL team replies by email and through the inquiry form."],
  ];
  return (
    <section className="highlights">
      <div className="container three">
        {items.map(([t, d]) => (
          <article key={t} className="soft-card">
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div className="about-card">
          <img src={card} alt="MEDSOL Pharmaceutical Private Limited Lahore business card with head office address" />
        </div>
        <div>
          <h2>A pharmaceutical company built on care and clarity</h2>
          <p>
            MEDSOL Pharmaceutical Pvt. Ltd. is headquartered in Lahore, Pakistan. We bring family-friendly products to market
            with transparent information, responsible labeling and dependable customer care.
          </p>
          <p>
            With Yumvit Kids Multivitamin Gummies our goal is simple: give parents a product they can judge on their own terms,
            with complete pack information, clear directions and a team that answers questions directly.
          </p>
          <div className="values">
            <div><h4>Transparent information</h4><p>Honest labeling and guidance that points to the pack first.</p></div>
            <div><h4>Family-first products</h4><p>Made for families, in formats kids enjoy.</p></div>
            <div><h4>Based in Lahore</h4><p>Serving customers and partners across the region.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Product() {
  const { add, openCart } = useCart();
  const product = getProduct("yumvit-strawberry");
  const [qty, setQty] = useState(1);
  const [view, setView] = useState("front");
  const imgs = { front: bottleFront, back: bottleBack };
  return (
    <section id="product" className="section product">
      <div className="container">
        <div className="section-head">
          <h2>Yumvit Kids Multivitamin Gummies</h2>
          <p>A family-friendly food supplement from MEDSOL Pharmaceutical, with the details parents need right on the pack.</p>
        </div>
        <div className="product-grid">
          <div className="gallery">
            <div className="gallery-main">
              <img src={imgs[view]} alt={view === "front" ? "Front of the Yumvit bottle" : "Back of the Yumvit bottle with supplement facts"} />
            </div>
            <div className="thumbs">
              <button className={view === "front" ? "on" : ""} onClick={() => setView("front")} aria-label="Show front of bottle">
                <img src={bottleFront} alt="" />
              </button>
              <button className={view === "back" ? "on" : ""} onClick={() => setView("back")} aria-label="Show back of bottle">
                <img src={bottleBack} alt="" />
              </button>
            </div>
          </div>
          <div className="buy">
            <div className="tags"><span>Strawberry flavor</span><span>30 gummies</span><span>Dietary supplement</span></div>
            <h3>Yumvit Kids Multivitamin Gummies</h3>
            <p className="muted">Made for kids and reviewed by parents, with the full ingredient list, supplement facts and directions printed on the bottle.</p>
            <ul className="ticks">
              <li>Strawberry flavor kids look forward to</li>
              <li>30-gummy bottle, pectin-based and halal certified</li>
              <li>Gelatin, gluten, dairy, nut and soy free</li>
              <li>Directions and age guidance printed on the pack</li>
              <li>Quality-focused production by MEDSOL Pharmaceutical</li>
            </ul>
            <div className="price-box">
              <strong>{money(product.price)}</strong>
              <span>Cash on delivery. Delivery charges are shown at checkout.</span>
            </div>
            <div className="buy-row">
              <div className="qty" role="group" aria-label="Quantity">
                <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
                <span aria-live="polite">{qty}</span>
                <button onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button>
              </div>
              <button className="btn primary" onClick={() => { add(product.id, qty); setQty(1); }}>Add to bag</button>
              <button className="btn ghost" onClick={openCart}>View bag</button>
            </div>
            <p className="fine">Order by WhatsApp or email at checkout. We confirm delivery with you before dispatch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info() {
  return (
    <section id="info" className="section info">
      <div className="container">
        <div className="section-head">
          <h2>Everything parents need to review</h2>
          <p>The packaging is always the primary source for product details.</p>
        </div>
        <div className="info-grid">
          <div className="facts" aria-label="Supplement facts">
            <h3>Supplement facts</h3>
            <p className="facts-sub">Serving size: 2 gummies · Servings per container: 15</p>
            <table>
              <tbody>
                {FACTS.map(([n, a, dv]) => (
                  <tr key={n}><td>{n}</td><td>{a}</td><td>{dv}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="facts-sub"><strong>Other ingredients:</strong> Pectin, organic cane sugar, natural strawberry flavor, citric acid, sodium citrate, natural color (purple carrot concentrate).</p>
          </div>
          <div className="info-cards">
            <article className="soft-card">
              <h3>Usage directions</h3>
              <p>Children 4+ years: chew 1–2 gummies daily. Do not exceed the recommended dose. Store in a cool, dry place and keep out of reach of children.</p>
            </article>
            <article className="soft-card">
              <h3>Age guidance</h3>
              <p>Read the pack before giving Yumvit to children, and ask a healthcare professional if you're unsure.</p>
            </article>
            <article className="soft-card">
              <h3>Allergen information</h3>
              <p>Free from gelatin, gluten, dairy, nuts and soy, as stated on the label.</p>
            </article>
            <article className="soft-card">
              <h3>Pack details</h3>
              <p>30 strawberry-flavored gummies per bottle. Full markings, lot number and expiry date appear on the label.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function Steps() {
  const steps = [
    ["Explore Yumvit", "Browse the shop to see the bottle, flavor and highlights."],
    ["Review the guidance", "Read the ingredient, usage and age guidance on the pack and on this page."],
    ["Order or ask us", "Send your order on WhatsApp or email, or ask about distribution. We reply with clear details."],
  ];
  return (
    <section className="section steps">
      <div className="container">
        <div className="section-head"><h2>Three simple steps</h2></div>
        <ol className="step-list">
          {steps.map(([t, d], i) => (
            <li key={t}>
              <span className="step-n">{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Faqs() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faqs" className="section faqs">
      <div className="container narrow">
        <div className="section-head">
          <h2>Frequently asked questions</h2>
          <p>Quick answers about the product, guidance and how to reach MEDSOL.</p>
        </div>
        <div className="acc">
          {FAQS.map(([q, a], i) => (
            <div key={q} className={`acc-item ${open === i ? "open" : ""}`}>
              <h3>
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {q}<span className="chev" aria-hidden="true" />
                </button>
              </h3>
              {open === i && <p>{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Enter a valid email address.";
    if (form.message.trim().length < 5) err.message = "Tell us how we can help.";
    setErrors(err);
    if (Object.keys(err).length === 0) {
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Yumvit inquiry")}&body=${encodeURIComponent(body)}`;
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div>
          <h2>Get in touch with MEDSOL</h2>
          <p>Product questions, launch pricing or distribution inquiries. We're happy to help.</p>
          <dl className="contact-list">
            <div><dt>Email</dt><dd><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd></div>
            <div><dt>Head office</dt><dd>Shalimar View Housing Scheme, Sultan Mehmood Road, Lahore</dd></div>
            <div><dt>Facebook and Instagram</dt><dd>Medsol pharmaceutical</dd></div>
          </dl>
        </div>
        <form className="form" onSubmit={submit} noValidate>
          <h3>Product and launch inquiry</h3>
          {sent && <p className="ok" role="status">Your email app should open with the message ready to send.</p>}
          <label>Name
            <input value={form.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
            {errors.name && <span className="err">{errors.name}</span>}
          </label>
          <label>Email
            <input type="email" value={form.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
            {errors.email && <span className="err">{errors.email}</span>}
          </label>
          <label>Message
            <textarea rows="4" value={form.message} onChange={set("message")} aria-invalid={!!errors.message} />
            {errors.message && <span className="err">{errors.message}</span>}
          </label>
          <button className="btn primary" type="submit">Send inquiry</button>
          <p className="fine">This opens your email app with your message filled in.</p>
        </form>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <>
      <Hero />
      <Highlights />
      <About />
      <Product />
      <Info />
      <Steps />
      <Faqs />
      <Contact />
    </>
  );
}
