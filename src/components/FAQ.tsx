"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQS = [
  {
    q: "Bagaimana cara kerja aktivasi akun digital?",
    a: "Untuk Canva Pro dan YouTube Premium, aktivasi menggunakan metode undangan resmi (Invite Team/Family) ke alamat email pribadi Anda. Untuk Netflix, CapCut, dan ChatGPT, admin memberikan detail akses akun premium siap pakai yang telah terverifikasi."
  },
  {
    q: "Berapa lama waktu proses setelah pembayaran?",
    a: "Proses aktivasi rata-rata berlangsung 5 hingga 15 menit setelah bukti transfer Anda dikonfirmasi oleh admin pada jam operasional toko."
  },
  {
    q: "Bagaimana ketentuan garansinya?",
    a: "Semua produk bergaransi penuh sesuai durasi yang dibeli. Jika terjadi kendala login atau akses terhenti sebelum masa langganan habis, admin akan langsung memperbaiki atau menggantinya dengan akun baru."
  },
  {
    q: "Apakah data dan desain lama saya di Canva akan hilang?",
    a: "Tidak. Karena sistemnya mengundang email pribadi Anda ke tim berbayar, semua project dan riwayat desain di akun personal Anda tetap aman dan tidak terhapus."
  },
  {
    q: "Metode pembayaran apa saja yang didukung?",
    a: "Tersedia QRIS (mendukung seluruh aplikasi mobile banking dan e-wallet seperti DANA, GoPay, OVO, ShopeePay) serta transfer bank manual (BCA & Mandiri)."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 sm:py-14 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          Pertanyaan Umum (FAQ)
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Informasi seputar pemesanan, aktivasi, dan klaim garansi akun
        </p>
      </div>

      <div className="space-y-2">
        {FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-gray-800 bg-gray-900/40 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-white hover:text-gray-200 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed border-t border-gray-800/80 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
