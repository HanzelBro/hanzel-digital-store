"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import OrderModal from "@/components/OrderModal";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { PRODUCTS as INITIAL_PRODUCTS, Product } from "@/data/products";

export default function Home() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch updated products from API on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
        }
      } catch (err) {
        console.error("Gagal load produk terbaru:", err);
      }
    }
    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-gray-100 flex flex-col justify-between">
      <div>
        <Navbar />
        <Hero />
        <ProductCatalog
          products={products}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
        <FAQ />
      </div>
      <Footer />

      {/* Modal / Bottom Sheet Checkout WhatsApp */}
      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}
