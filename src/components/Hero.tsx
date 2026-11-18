import React from "react";
import { ShieldCheck, Zap, Headphones, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-8 sm:py-14 border-b border-gray-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-2">
            Penyedia Akun Digital Terpercaya
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Langganan Akun Digital Premium Resmi & Bergaransi
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
            Aktivasi langsung untuk Canva Pro, CapCut Pro, YouTube Premium, Netflix, Spotify, dan ChatGPT Plus. Tanpa kartu kredit, proses instan 5–15 menit via WhatsApp.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#katalog"
              className="active-press bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              Lihat Katalog Produk
            </a>
            <a
              href="#keunggulan"
              className="active-press bg-gray-900 hover:bg-gray-800 border border-gray-800 text-gray-300 text-xs font-medium px-4 py-2.5 rounded-lg transition-colors"
            >
              Ketentuan Garansi
            </a>
          </div>
        </div>

        {/* Value Props Row */}
        <div id="keunggulan" className="mt-10 pt-8 border-t border-gray-800/60 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">Full Garansi</p>
              <p className="text-[11px] text-gray-400">Ganti baru jika terkendala</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">Aktivasi Kilat</p>
              <p className="text-[11px] text-gray-400">Rata-rata 5 - 15 menit</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">Legal & Resmi</p>
              <p className="text-[11px] text-gray-400">Akun aman dan stabil</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Headphones className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-white">Layanan CS</p>
              <p className="text-[11px] text-gray-400">Admin siap membantu di WA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
