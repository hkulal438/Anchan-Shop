import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { WhatsAppIcon } from "./components/Icons";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductPage from "./pages/ProductPage";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Consult from "./pages/Consult";
import TrackOrder from "./pages/TrackOrder";
import { SHOP } from "./config";

export default function App() {
  const { pathname } = useLocation();

  // new page → start at the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/categories" element={<Categories mode="need" />} />
          <Route path="/product-types" element={<Categories mode="type" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />

      <a className="wa-float" href={`https://wa.me/${SHOP.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon size={28} />
      </a>
    </>
  );
}
