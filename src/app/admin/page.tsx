"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/data/products";
import { formatRupiah } from "@/lib/whatsapp";
import AdminProductModal from "@/components/AdminProductModal";
import Link from "next/link";
import {
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Lock,
  LogOut,
  ArrowLeft,
  Search,
  ExternalLink,
} from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Verifikasi status sesi admin ke server saat pertama buka
  useEffect(() => {
    async function verifyAuth() {
      try {
        const res = await fetch("/api/admin/check", { cache: "no-store" });
        const json = await res.json();
        if (json.authenticated) {
          setIsAuthenticated(true);
          fetchProducts();
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    verifyAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;

    setLoginLoading(true);
    setPinError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pinInput }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setIsAuthenticated(true);
        setPinInput("");
        fetchProducts();
      } else {
        setPinError(json.message || "Password atau PIN Admin salah.");
      }
    } catch (err) {
      setPinError("Gagal menghubungi server untuk verifikasi.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.error(err);
    }
    setIsAuthenticated(false);
    setPinInput("");
    setProducts([]);
    setEditingProduct(null);
    setSearchQuery("");
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const json = await res.json();
      if (json.success) {
        setProducts(json.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleDelete = async (prod: Product) => {
    if (
      !confirm(
        `Apakah Anda yakin ingin menghapus produk "${prod.name}"? Tindakan ini tidak dapat dibatalkan.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${prod.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchProducts();
      } else {
        alert(json.message || "Gagal menghapus produk.");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  // Filter products by search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If not logged in, show PIN login
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-gray-950 border border-gray-800 rounded-2xl p-6 sm:p-7 shadow-2xl">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-950 border border-blue-800/80 rounded-xl mx-auto mb-4 text-blue-400">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold text-center text-white">
            Login Admin Store
          </h1>
          <p className="text-xs text-gray-400 text-center mt-1 mb-6">
            Masukkan PIN pengelola untuk mengakses katalog produk
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Masukkan PIN Admin"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  if (pinError) setPinError("");
                }}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 text-center tracking-widest text-sm"
                autoFocus
              />
            </div>

            {pinError && (
              <p className="text-xs text-rose-400 text-center font-medium">
                {pinError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="active-press w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 px-4 rounded-lg text-xs transition-colors disabled:opacity-50"
            >
              {loginLoading ? "Memverifikasi..." : "Masuk Dashboard"}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/"
                className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Beranda</span>
              </Link>
            </div>
          </form>
        </div>
      </main>
    );
  }

  // Admin Dashboard Content
  return (
    <main className="min-h-screen bg-[var(--bg-main)] text-gray-100 pb-16">
      {/* Admin Top Navbar */}
      <header className="sticky top-0 z-30 border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-white">
              Hanzel Store <span className="text-blue-400 font-normal">/ Admin Panel</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-800 hover:bg-gray-900 transition-colors"
            >
              <span>Lihat Toko</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="active-press text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-rose-900/30 hover:bg-rose-950/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              Kelola Produk Digital
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Tambah, edit harga & varian, atau hapus produk dari katalog toko
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="active-press flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>
        </div>

        {/* Search & Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="text-xs text-gray-400 w-full sm:w-auto text-left sm:text-right">
            Total Produk: <span className="text-white font-bold">{products.length}</span> item
          </div>
        </div>

        {/* Product Table / Cards */}
        {loading ? (
          <div className="text-center py-16 text-xs text-gray-400 border border-gray-800 rounded-xl bg-gray-900/30">
            Memuat katalog produk...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="space-y-3">
            {filteredProducts.map((prod) => {
              const lowestPrice = Math.min(...prod.variants.map((v) => v.price));
              return (
                <div
                  key={prod.id}
                  className="bg-gray-900/40 border border-gray-800 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-700 transition-colors"
                >
                  {/* Left: Product Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {prod.name}
                      </h3>
                      <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                        {prod.category}
                      </span>
                      {prod.badge && (
                        <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800/60 px-1.5 py-0.5 rounded font-medium">
                          {prod.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {prod.tagline}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                      <span>{prod.variants.length} Paket Varian</span>
                      <span>•</span>
                      <span>Mulai {formatRupiah(lowestPrice)}</span>
                      <span>•</span>
                      <span className="text-emerald-400">{prod.warranty}</span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-gray-800 shrink-0">
                    <button
                      onClick={() => handleOpenEdit(prod)}
                      className="active-press flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 text-gray-200 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(prod)}
                      className="active-press flex items-center gap-1.5 text-xs bg-rose-950/30 hover:bg-rose-900/40 text-rose-400 border border-rose-900/40 px-3 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 text-xs text-gray-400 border border-gray-800 rounded-xl bg-gray-900/30">
            Tidak ada produk yang cocok dengan pencarian.
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      <AdminProductModal
        product={editingProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={fetchProducts}
      />
    </main>
  );
}
