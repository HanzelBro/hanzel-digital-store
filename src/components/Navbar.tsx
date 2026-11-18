"use client";

import React from "react";
import { STORE_CONFIG } from "@/lib/whatsapp";
import { MessageCircle, Shield, ShoppingBag, HelpCircle } from "lucide-react";

export default function Navbar() {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Bar for Desktop & Mobile Header */}
      <header className="sticky top-0 z-30 w-full border-b border-gray-800/80 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Hanzel Store</span>
            </span>
            <span className="text-xs text-gray-500 hidden sm:inline-block">
              / Toko Produk Digital
            </span>
          </div>

          {/* Nav links Desktop */}
          <div className="hidden md:flex items-center gap-6 text-xs text-gray-400">
            <button
              onClick={() => handleScroll("katalog")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Katalog Produk
            </button>
            <button
              onClick={() => handleScroll("keunggulan")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Garansi & Layanan
            </button>
            <button
              onClick={() => handleScroll("faq")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              FAQ
            </button>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-gray-400 hidden lg:inline-block">
              CS: {STORE_CONFIG.operationalHours}
            </span>
            <a
              href={`https://wa.me/${STORE_CONFIG.adminWhatsApp}?text=${encodeURIComponent(
                "Halo Admin Hanzel Store, saya butuh bantuan..."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="active-press flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Hubungi CS</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Native Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-950/95 border-t border-gray-800 backdrop-blur-lg px-6 py-2 flex items-center justify-around safe-area-inset-bottom">
        <button
          onClick={() => handleScroll("katalog")}
          className="active-press flex flex-col items-center gap-1 text-gray-400 hover:text-white p-1"
        >
          <ShoppingBag className="w-5 h-5 text-gray-300" />
          <span className="text-[10px] font-medium">Katalog</span>
        </button>

        <button
          onClick={() => handleScroll("keunggulan")}
          className="active-press flex flex-col items-center gap-1 text-gray-400 hover:text-white p-1"
        >
          <Shield className="w-5 h-5 text-gray-300" />
          <span className="text-[10px] font-medium">Garansi</span>
        </button>

        <button
          onClick={() => handleScroll("faq")}
          className="active-press flex flex-col items-center gap-1 text-gray-400 hover:text-white p-1"
        >
          <HelpCircle className="w-5 h-5 text-gray-300" />
          <span className="text-[10px] font-medium">Bantuan</span>
        </button>

        <a
          href={`https://wa.me/${STORE_CONFIG.adminWhatsApp}?text=${encodeURIComponent(
            "Halo Admin Hanzel Store, saya ingin tanya produk..."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="active-press flex flex-col items-center gap-1 text-emerald-400 p-1"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium">Chat WA</span>
        </a>
      </nav>
    </>
  );
}
