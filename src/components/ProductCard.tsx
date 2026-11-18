"use client";

import React from "react";
import { Product } from "@/data/products";
import { formatRupiah } from "@/lib/whatsapp";
import {
  Palette,
  Video,
  PlayCircle,
  Film,
  Headphones,
  Bot,
  ShieldCheck,
  Check,
  Sparkles
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const renderIcon = () => {
    const props = { className: "w-5 h-5 text-gray-200" };
    switch (product.iconName) {
      case "Palette": return <Palette {...props} />;
      case "Video": return <Video {...props} />;
      case "PlayCircle": return <PlayCircle {...props} />;
      case "Film": return <Film {...props} />;
      case "Headphones": return <Headphones {...props} />;
      case "Bot": return <Bot {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const lowestPrice = Math.min(...product.variants.map((v) => v.price));

  return (
    <div className="flex flex-col bg-gray-900/40 border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-gray-700 transition-colors">
      {/* Header Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700/60 flex items-center justify-center">
          {renderIcon()}
        </div>
        {product.badge && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/60">
            {product.badge}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="mb-3">
        <h3 className="text-base font-bold text-white">
          {product.name}
        </h3>
        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
          {product.tagline}
        </p>
      </div>

      {/* Key Features */}
      <div className="space-y-1.5 mb-4 flex-1">
        {product.features.slice(0, 3).map((feat, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="truncate">{feat}</span>
          </div>
        ))}
      </div>

      {/* Warranty */}
      <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-4">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>{product.warranty}</span>
      </div>

      {/* Pricing & Button */}
      <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-gray-400 block">Mulai dari</span>
          <span className="text-sm font-bold text-white">
            {formatRupiah(lowestPrice)}
          </span>
        </div>
        <button
          onClick={() => onSelect(product)}
          className="active-press bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-3.5 py-2 rounded-lg transition-colors"
        >
          Pilih Paket
        </button>
      </div>
    </div>
  );
}
