import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Icon, { WhatsAppIcon } from "../components/Icons";
import Intro from "../components/about/Intro";
import Whyus from "../components/about/Whyus";
import { SHOP } from "../config";

// About Us — the same "Our Story" and "Why Choose Us" sections as the main
// Anchan website, followed by how ordering works in this shop.
export default function About() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <div className="about">
      <h1 className="sr-only">About Anchan Ayurveda Shop – Anchan Ayurvedic Industries, Padubidri</h1>
      <Intro />
      <Whyus />

      <section className="block block--cream" id="how-to-order">
        <div className="container">
          <div className="shead"><div><h2>How ordering works</h2><p>No account or online payment needed.</p></div></div>
          <ol className="steps">
            <li><span>1</span><h3>Choose your medicines</h3><p>Pick the pack size and quantity, then add to cart.</p></li>
            <li><span>2</span><h3>Enter delivery details</h3><p>At checkout, add your name, mobile number, address and pincode.</p></li>
            <li><span>3</span><h3>Send on WhatsApp</h3><p>Your order opens as a WhatsApp message to {SHOP.phoneDisplay}. Send it, and we confirm payment and dispatch.</p></li>
          </ol>
          <div className="center">
            <Link to="/shop" className="btn btn-primary btn-lg">Start shopping <Icon name="arrow" size={18} /></Link>
            <a className="btn btn-wa btn-lg" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer">
              <WhatsAppIcon size={18} /> Chat with us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
