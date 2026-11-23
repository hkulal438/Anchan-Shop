import React, { useState } from "react";
import { Link } from "react-router-dom";

import Icon, { WhatsAppIcon } from "../components/Icons";
import { healthNeeds } from "../data/catalog";
import { consultLink } from "../utils/whatsapp";
import { SHOP } from "../config";
import drPhoto from "../assets/dr-anchan.jpg";
import gmp from "../assets/gmp.png";
import ayush from "../assets/ayush.png";

const MODES = ["Clinic visit at Padubidri", "Phone call", "WhatsApp video call"];
const concerns = [...healthNeeds].sort((a, b) => a.name.localeCompare(b.name)).map((n) => n.name);

const empty = { name: "", age: "", phone: "", concern: "", mode: MODES[0], message: "" };

export default function Consult() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name";
    if (!/^\d{1,3}$/.test(form.age.trim())) er.age = "Enter age in years";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, "").slice(-10))) er.phone = "Enter a 10-digit mobile number";
    if (!form.concern) er.concern = "Choose your concern";
    setErrors(er);
    if (Object.keys(er).length) return;
    window.open(consultLink(form), "_blank", "noopener");
    setSent(true);
  };

  return (
    <div className="consult">
      {/* ================= DOCTOR ================= */}
      <section className="consult-hero">
        <div className="container consult-hero-grid">
          <div className="consult-photo">
            <img src={drPhoto} alt="Dr. N. T. Anchan at his Ayurvedic clinic" />
            <div className="consult-seals">
              <img src={ayush} alt="AYUSH Federation of India – Karnataka" />
              <img src={gmp} alt="GMP certified" />
            </div>
          </div>

          <div className="consult-intro">
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <Icon name="chevron" size={14} />
              <span>Consult With Doctor</span>
            </nav>
            <h1>Consult Dr. N. T. Anchan</h1>
            <p className="consult-cred">BSAM, BAMS · Ayurvedic Physician · Founder, Anchan Ayurvedic Industries</p>

            <p>
              For more than four decades, Dr. Narayana T. Anchan has practised Ayurveda at
              Padubidri. Trained by his father, the traditional practitioner Pandit Thoma
              Poojary, and through formal study, he began practice in 1980 and founded
              Anchan Pharmacy in {SHOP.since}.
            </p>
            <p>
              Many of Anchan's own preparations — Manasa, Madhuna, Rumovin, Shwasari and
              Pusti among them — grew out of the conditions he treats in his clinic.
            </p>

            <ul className="consult-facts">
              <li><strong>{new Date().getFullYear() - 1980}+</strong><span>years of practice</span></li>
              <li><strong>200+</strong><span>medicines prepared</span></li>
              <li><strong>3 ways</strong><span>clinic, phone or video</span></li>
            </ul>

            <div className="consult-ctas">
              <a href="#book" className="btn btn-primary btn-lg">
                Book a consultation <Icon name="arrow" size={18} />
              </a>
              <a href={`tel:${SHOP.landline.replace(/\s/g, "")}`} className="btn btn-outline btn-lg">
                <Icon name="phone" size={18} /> Call {SHOP.landline}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="block">
        <div className="container">
          <div className="shead"><div><h2>How a consultation works</h2><p>Simple, personal and unhurried.</p></div></div>
          <ol className="steps">
            <li><span>1</span><h3>Send your request</h3><p>Tell us your concern and how you would like to consult — it opens in WhatsApp.</p></li>
            <li><span>2</span><h3>We fix a time</h3><p>Our team replies with an available slot and the consultation details.</p></li>
            <li><span>3</span><h3>Meet the doctor</h3><p>Consult at the Padubidri clinic, by phone or on a video call, and receive your advice and prescription.</p></li>
          </ol>
        </div>
      </section>

      {/* ================= BOOKING FORM ================= */}
      <section className="block block--cream" id="book">
        <div className="container consult-book">
          <div className="consult-book-copy">
            <h2>Book your consultation</h2>
            <p>
              Share a few details and we will confirm a time with you on WhatsApp. Please bring or
              send any recent reports and the medicines you are currently taking.
            </p>
            <ul className="consult-points">
              <li><Icon name="shield" size={18} /> Your details are shared only with our clinic.</li>
              <li><Icon name="chat" size={18} /> Consultation fee and timings are confirmed on WhatsApp.</li>
              <li><Icon name="pin" size={18} /> Clinic: {SHOP.address}</li>
            </ul>
          </div>

          {sent ? (
            <div className="consult-form consult-sent">
              <span className="done-icon"><WhatsAppIcon size={34} /></span>
              <h3>Your request is ready in WhatsApp</h3>
              <p>Press send in WhatsApp and our team will reply with a consultation time.</p>
              <div className="done-actions">
                <a className="btn btn-wa" href={consultLink(form)} target="_blank" rel="noreferrer">
                  <WhatsAppIcon size={18} /> Open WhatsApp again
                </a>
                <button type="button" className="btn btn-outline" onClick={() => { setForm(empty); setSent(false); }}>
                  New request
                </button>
              </div>
            </div>
          ) : (
            <form className="consult-form" onSubmit={submit} noValidate>
              <div className="field-row">
                <label className={`field ${errors.name ? "has-error" : ""}`}>
                  <span>Full name</span>
                  <input value={form.name} onChange={set("name")} autoComplete="name" />
                  {errors.name && <small>{errors.name}</small>}
                </label>
                <label className={`field ${errors.age ? "has-error" : ""}`}>
                  <span>Age</span>
                  <input value={form.age} onChange={set("age")} inputMode="numeric" maxLength={3} />
                  {errors.age && <small>{errors.age}</small>}
                </label>
              </div>
              <div className="field-row">
                <label className={`field ${errors.phone ? "has-error" : ""}`}>
                  <span>Mobile number</span>
                  <input value={form.phone} onChange={set("phone")} type="tel" inputMode="tel" autoComplete="tel" />
                  {errors.phone && <small>{errors.phone}</small>}
                </label>
                <label className={`field ${errors.concern ? "has-error" : ""}`}>
                  <span>Main concern</span>
                  <select value={form.concern} onChange={set("concern")}>
                    <option value="">Choose…</option>
                    {concerns.map((c) => <option key={c}>{c}</option>)}
                    <option>Other</option>
                  </select>
                  {errors.concern && <small>{errors.concern}</small>}
                </label>
              </div>

              <fieldset className="field mode-group">
                <span>How would you like to consult?</span>
                <div className="mode-chips">
                  {MODES.map((m) => (
                    <label key={m} className={`mode-chip ${form.mode === m ? "is-active" : ""}`}>
                      <input type="radio" name="mode" value={m} checked={form.mode === m} onChange={set("mode")} />
                      {m}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="field">
                <span>Tell us more (optional)</span>
                <textarea rows={3} value={form.message} onChange={set("message")} placeholder="Symptoms, how long, current medicines…" />
              </label>

              <button type="submit" className="btn btn-wa btn-lg btn-block">
                <WhatsAppIcon size={20} /> Request consultation on WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
