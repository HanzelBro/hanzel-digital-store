"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductVariant, PAYMENT_METHODS } from "@/data/products";
import { formatRupiah, generateWhatsAppOrderUrl } from "@/lib/whatsapp";
import { X, ShieldCheck, Check, MessageCircle } from "lucide-react";

interface OrderModalProps {
  product: Product;
  onClose: () => void;
}

export default function OrderModal({ product, onClose }: OrderModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerEmail, setBuyerEmail] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>(
    PAYMENT_METHODS[0].name
  );
  const [notes, setNotes] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim()) {
      setErrorMsg("Nama pemesan wajib diisi.");
      return;
    }

    const waUrl = generateWhatsAppOrderUrl({
      product,
      variant: selectedVariant,
      buyerName,
      buyerEmail,
      paymentMethod,
      notes,
    });

    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm sm:p-4">
      {/* Backdrop tap to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Sheet Container: Bottom Sheet on Mobile, Centered Modal on Tablet/Desktop */}
      <div className="w-full max-w-lg bg-gray-950 border border-gray-800 rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-200">
        {/* Mobile drag handle bar */}
        <div className="w-12 h-1.5 bg-gray-700/60 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-800/80 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">
              Order {product.name}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">{product.tagline}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-gray-900 border border-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Order Form */}
        <form onSubmit={handleOrderWhatsApp} className="space-y-4">
          {/* Pilihan Paket */}
          <div>
            <span className="text-xs font-semibold text-gray-300 block mb-2">
              Pilih Paket Durasi
            </span>
            <div className="grid grid-cols-1 gap-2">
              {product.variants.map((v) => {
                const isSelected = selectedVariant.id === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`cursor-pointer p-3 rounded-xl border text-left transition-colors flex items-center justify-between ${
                      isSelected
                        ? "bg-blue-950/30 border-blue-500/80"
                        : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {v.name}
                        </span>
                        <span className="text-[10px] bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded">
                          {v.duration}
                        </span>
                      </div>
                      {v.description && (
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          {v.description}
                        </p>
                      )}
                    </div>
                    <div className="text-right pl-3 shrink-0">
                      <span className="text-xs font-bold text-white block">
                        {formatRupiah(v.price)}
                      </span>
                      {v.originalPrice && (
                        <span className="text-[10px] text-gray-500 line-through">
                          {formatRupiah(v.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fitur Utama */}
          <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800/80">
            <span className="text-[11px] font-semibold text-gray-300 block mb-1.5">
              Fitur yang Didapatkan:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-gray-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Input Data Pembeli */}
          <div className="space-y-2.5">
            <div>
              <label className="text-[11px] font-medium text-gray-400 block mb-1">
                Nama Lengkap / Kontak *
              </label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={buyerName}
                onChange={(e) => {
                  setBuyerName(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-gray-400 block mb-1">
                Email Anda (jika aktivasi via invite email)
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium text-gray-400 block mb-1">
                Metode Pembayaran
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                {PAYMENT_METHODS.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.fee})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="text"
                placeholder="Catatan tambahan (opsional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Garansi Note */}
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/20 border border-emerald-900/40 p-2.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Garansi resmi: {product.warranty}</span>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400">{errorMsg}</p>
          )}

          {/* Action button */}
          <button
            type="submit"
            className="active-press w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Lanjutkan Pemesanan via WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
}
