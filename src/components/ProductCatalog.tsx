"use client";

import React, { useState } from "react";
import { Product, CATEGORIES } from "@/data/products";
import ProductCard from "./ProductCard";
import { Search } from "lucide-react";

interface ProductCatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function ProductCatalog({
  products,
  onSelectProduct,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProducts = products.filter((prod) => {
    const matchCategory =
      selectedCategory === "Semua" || prod.category === selectedCategory;
    const matchSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section id="katalog" className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Katalog Produk
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Pilih produk untuk melihat pilihan durasi dan detail harga
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari produk digital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Categories Native Horizontal Scrolling */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Cards */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-gray-800/80 rounded-xl bg-gray-900/30">
          <p className="text-xs text-gray-400">
            Produk tidak ditemukan. Coba gunakan kata kunci lain.
          </p>
        </div>
      )}
    </section>
  );
}
