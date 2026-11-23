import React from "react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";
import gmp from "../assets/gmp.png";
import ayush from "../assets/ayush.png";
import Icon, { WhatsAppIcon } from "./Icons";
import { SHOP } from "../config";

const QUICK = [
  { to: "/categories", label: "Shop By Category" },
  { to: "/product-types", label: "Shop By Product Type" },
  { to: "/shop", label: "All Products" },
  { to: "/consult", label: "Consult With Doctor" },
  { to: "/track-order", label: "Track Order" },
  { to: "/about", label: "About Us" },
];

const POPULAR = [
  { to: "/product/manasa", label: "Manasa" },
  { to: "/product/rumovin-liniment", label: "Rumovin Liniment" },
  { to: "/product/shwasari-syrup", label: "Shwasari Syrup" },
  { to: "/product/pusti-syrup", label: "Pusti Syrup" },
  { to: "/product/madhuna", label: "Madhuna" },
  { to: "/product/chyavanaprasha-leha", label: "Chyavanaprasha" },
];

const SOCIAL_ICONS = {
  instagram: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  ),
};

// a leafy branch drawn in thin lines, used as a quiet background ornament
const Branch = ({ className }) => (
  <svg className={className} viewBox="0 0 400 260" fill="none" aria-hidden="true">
    <path d="M0 250C90 210 180 150 260 90S380 20 400 10" stroke="currentColor" strokeWidth="1.4" />
    {[[60, 222, -30], [120, 190, 20], [170, 158, -25], [220, 122, 25], [280, 80, -20], [330, 48, 20]].map(([x, y, r], i) => (
      <path key={i} d="M0 0C10-26 40-34 70-30C55-8 30 6 0 0Z" transform={`translate(${x} ${y}) rotate(${r})`} stroke="currentColor" strokeWidth="1.4" />
    ))}
  </svg>
);

export default function Footer() {
  const social = Object.entries(SHOP.social || {}).filter(([, url]) => url);

  return (
    <footer className="ft" id="contact">
      {/* ================= HELP BAND ================= */}
      <div className="container">
        <div className="ft-cta">
          <div className="ft-cta-copy">
            <h2>Not sure which medicine is right for you?</h2>
            <p>Talk to Dr. N. T. Anchan or message our team — we are happy to guide you.</p>
          </div>
          <div className="ft-cta-actions">
            <Link to="/consult" className="btn btn-light btn-lg">
              Consult With Doctor <Icon name="arrow" size={18} />
            </Link>
            <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-wa btn-lg">
              <WhatsAppIcon size={18} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>

      <Branch className="ft-branch ft-branch--r" />
      <Branch className="ft-branch ft-branch--l" />

      {/* ================= MAIN COLUMNS ================= */}
      <div className="container ft-main">
        <div className="ft-brand">
          <Link to="/" className="ft-logo" aria-label="Anchan Ayurveda Shop — home">
            <span className="ft-logo-badge">
              <img src={logo} alt="Anchan Ayurvedic Industries logo" />
            </span>
            <span className="ft-logo-text">
              <strong>Anchan</strong>
              <small>Ayurvedic Industries</small>
            </span>
          </Link>
          <p>
            Rooted in a family tradition of Ayurveda at Padubidri, Anchan has prepared
            classical and proprietary medicines since {SHOP.since} — made with care in our
            own GMP-certified unit and offered at fair, printed prices.
          </p>
          <Link to="/about" className="ft-more">
            Read more <Icon name="arrow" size={16} />
          </Link>
          <div className="ft-social">
            <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <WhatsAppIcon size={18} />
            </a>
            <a href={`tel:+${SHOP.whatsapp}`} aria-label="Call us">
              <Icon name="phone" size={17} />
            </a>
            <a href={`mailto:${SHOP.email}`} aria-label="Email us">
              <Icon name="mail" size={17} />
            </a>
            {social.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}>
                {SOCIAL_ICONS[name]}
              </a>
            ))}
          </div>
        </div>

        <nav className="ft-col" aria-label="Quick links">
          <h3>Quick Links</h3>
          <ul>
            {QUICK.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="ft-col" aria-label="Popular products">
          <h3>Popular Products</h3>
          <ul>
            {POPULAR.map((l) => (
              <li key={l.to}><Link to={l.to}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div className="ft-col">
          <h3>For Product Enquiries</h3>
          <p className="ft-enq">
            Questions about a medicine, dosage or bulk orders? Message us and our team
            will get back to you.
          </p>
          <a href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer" className="ft-wa">
            <span className="ft-wa-icon"><WhatsAppIcon size={20} /></span>
            <span>
              <small>Chat on WhatsApp</small>
              <strong>{SHOP.phoneDisplay}</strong>
            </span>
            <Icon name="arrow" size={18} className="ft-wa-arrow" />
          </a>
        </div>
      </div>

      {/* ================= CONTACT + CERTIFICATIONS ================= */}
      <div className="container">
        <div className="ft-lower">
          <div>
            <h3>Contact Information</h3>
            <ul className="ft-contact">
              <li>
                <Icon name="pin" size={19} />
                <a href={SHOP.mapUrl} target="_blank" rel="noreferrer">
                  {SHOP.addressLines.map((l) => <span key={l}>{l}</span>)}
                </a>
              </li>
              <li>
                <Icon name="phone" size={19} />
                <span>
                  <a href={`tel:+${SHOP.whatsapp}`}>{SHOP.phoneDisplay}</a>
                  <a href={`tel:${SHOP.landline.replace(/\s/g, "")}`}>{SHOP.landline}</a>
                </span>
              </li>
              <li>
                <Icon name="mail" size={19} />
                <a href={`mailto:${SHOP.email}`}>{SHOP.email}</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Certifications</h3>
            <div className="ft-badges">
              <span className="ft-seal"><img src={gmp} alt="GMP certified" /></span>
              <span className="ft-seal"><img src={ayush} alt="Member, AYUSH Federation of India – Karnataka" /></span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="ft-bottom">
        <div className="container ft-bottom-inner">
          <p>© {new Date().getFullYear()} {SHOP.name}. All rights reserved.</p>
          {SHOP.website && (
            <a href={SHOP.website} target="_blank" rel="noreferrer">Visit our main website <Icon name="arrow" size={14} /></a>
          )}
        </div>
      </div>
    </footer>
  );
}
