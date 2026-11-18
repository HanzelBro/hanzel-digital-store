import React from "react";
import { STORE_CONFIG } from "@/lib/whatsapp";
import { ShieldCheck, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/80 bg-gray-950 py-10 text-gray-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Brand Info */}
          <div>
            <span className="font-bold text-sm text-white block mb-2">
              {STORE_CONFIG.storeName}
            </span>
            <p className="text-gray-400 leading-relaxed text-xs">
              Layanan pembelian akun digital premium resmi dan bergaransi. Pemesanan cepat, aman, dan langsung terhubung dengan admin WhatsApp.
            </p>
          </div>

          {/* Garansi */}
          <div>
            <span className="font-semibold text-white block mb-2 text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jaminan Layanan</span>
            </span>
            <ul className="space-y-1.5 text-gray-400 text-[11px]">
              <li>• Garansi penuh selama masa aktif paket</li>
              <li>• Akun terverifikasi dan legal</li>
              <li>• Penggantian akun baru bila bermasalah</li>
              <li>• Privasi data pembeli terjaga</li>
            </ul>
          </div>

          {/* CS Info */}
          <div>
            <span className="font-semibold text-white block mb-2 text-xs">
              Operasional Admin
            </span>
            <p className="text-gray-400 text-[11px] mb-3">
              Jam Kerja: {STORE_CONFIG.operationalHours}
            </p>
            <a
              href={`https://wa.me/${STORE_CONFIG.adminWhatsApp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg hover:bg-emerald-600 hover:text-white transition-colors font-medium text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat WhatsApp Admin</span>
            </a>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-900 text-gray-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {STORE_CONFIG.storeName}.</p>
          <div className="flex items-center gap-4">
            <span>Dibuat untuk kemudahan transaksi produk digital terpercaya.</span>
            <a
              href="/admin"
              className="text-gray-600 hover:text-gray-400 transition-colors"
              title="Kelola Produk (Admin)"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
