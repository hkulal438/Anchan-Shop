import React from "react";

import Icon, { WhatsAppIcon } from "./Icons";
import { SHOP } from "../config";

// Bhasma preparations are not sold online — they are given after a doctor's
// consultation. This note mentions them and connects the customer on WhatsApp.
const message = `Hello ${SHOP.shortName}, I would like to enquire about Bhasma medicines. Please call me back.`;

export default function BhasmaNote({ className = "" }) {
  return (
    <div className={`rx-note ${className}`}>
      <Icon name="shield" size={22} />
      <p>
        <strong>Looking for Bhasma?</strong>
        <span>
          Our Bhasma preparations are given only after a doctor's consultation, so they are not
          sold online. Message us on WhatsApp and our team will call you back.
        </span>
      </p>
      <a
        className="btn btn-wa"
        href={`https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noreferrer"
      >
        <WhatsAppIcon size={18} /> Enquire on WhatsApp
      </a>
    </div>
  );
}
