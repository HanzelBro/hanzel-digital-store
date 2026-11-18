"use client";

import React, { useState, useEffect } from "react";
import { Product, ProductVariant, CATEGORIES } from "@/data/products";
import { X, Plus, Trash2 } from "lucide-react";

interface AdminProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function AdminProductModal({
  product,
  isOpen,
  onClose,
  onSave,
}: AdminProductModalProps) {
  const isEditing = Boolean(product);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<Product["category"]>("Design & Editing");
  const [iconName, setIconName] = useState("Palette");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [warranty, setWarranty] = useState("Garansi Full Durasi");
  const [badge, setBadge] = useState<string>("none");
  const [featuresText, setFeaturesText] = useState("");
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setCategory(product.category || "Design & Editing");
      setIconName(product.iconName || "Palette");
      setTagline(product.tagline || "");
      setDescription(product.description || "");
      setWarranty(product.warranty || "Garansi Full Durasi");
      setBadge(product.badge || "none");
      setFeaturesText((product.features || []).join("\n"));
      setVariants(product.variants || []);
    } else {
      setName("");
      setCategory("Design & Editing");
      setIconName("Palette");
      setTagline("");
      setDescription("");
      setWarranty("Garansi Full Durasi");
      setBadge("none");
      setFeaturesText("Akses akun premium resmi\nGaransi aktif\nProses aktivasi kilat");
      setVariants([
        {
          id: `var-${Date.now()}`,
          name: "Paket 1 Bulan",
          duration: "1 Bulan",
          price: 25000,
          originalPrice: 50000,
          type: "Private",
          description: "Akun login 1 user",
        },
      ]);
    }
    setErrorMsg("");
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        id: `var-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: "Paket Baru",
        duration: "1 Bulan",
        price: 20000,
        originalPrice: 40000,
        type: "Private",
        description: "",
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    if (variants.length <= 1) {
      alert("Produk harus memiliki minimal 1 varian paket.");
      return;
    }
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleVariantChange = (
    index: number,
    field: keyof ProductVariant,
    value: any
  ) => {
    const updated = [...variants];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setVariants(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Nama produk wajib diisi.");
      return;
    }
    if (variants.length === 0) {
      setErrorMsg("Minimal harus ada satu paket varian.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const payload: Partial<Product> = {
      name: name.trim(),
      category,
      iconName,
      tagline: tagline.trim(),
      description: description.trim(),
      warranty: warranty.trim(),
      badge: badge === "none" ? undefined : (badge as Product["badge"]),
      features,
      variants,
    };

    try {
      const url = isEditing ? `/api/products/${product?.id}` : "/api/products";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "Gagal menyimpan produk.");
      }

      onSave();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan saat menyimpan.");
    } finally {
      setLoading(false);
    }
  };

  const availableCategories = CATEGORIES.filter((c) => c !== "Semua") as Product["category"][];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gray-950 border border-gray-800 rounded-2xl p-6 max-h-[92vh] overflow-y-auto no-scrollbar shadow-2xl my-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
          <h3 className="text-lg font-bold text-white">
            {isEditing ? `Edit Produk: ${product?.name}` : "Tambah Produk Baru"}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-gray-900 border border-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Baris 1: Nama & Kategori */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Nama Produk *
              </label>
              <input
                type="text"
                placeholder="Contoh: Canva Pro"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Baris 2: Icon & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Icon Tampilan
              </label>
              <select
                value={iconName}
                onChange={(e) => setIconName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="Palette">Palette (Desain/Grafis)</option>
                <option value="Video">Video (CapCut/Editing)</option>
                <option value="PlayCircle">PlayCircle (YouTube/Video)</option>
                <option value="Film">Film (Netflix/Movie)</option>
                <option value="Headphones">Headphones (Spotify/Musik)</option>
                <option value="Bot">Bot (ChatGPT/AI)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Badge / Label Promo
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              >
                <option value="none">Tanpa Badge</option>
                <option value="Best Seller">Best Seller</option>
                <option value="Popular">Popular</option>
                <option value="Promo">Promo</option>
              </select>
            </div>
          </div>

          {/* Tagline & Garansi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Tagline Singkat
              </label>
              <input
                type="text"
                placeholder="Desain tanpa batas dengan ribuan template..."
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">
                Keterangan Garansi
              </label>
              <input
                type="text"
                placeholder="Garansi Full Durasi"
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Deskripsi Lengkap
            </label>
            <textarea
              rows={2}
              placeholder="Jelaskan detail produk secara lengkap..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Fitur (Satu baris per fitur) */}
          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Poin Fitur (Pisahkan per baris enter)
            </label>
            <textarea
              rows={3}
              placeholder="Background Remover 1-klik&#10;Akses 100+ juta foto&#10;Bisa email pribadi"
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Section Varian Paket */}
          <div className="pt-3 border-t border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white">
                Paket & Harga ({variants.length})
              </span>
              <button
                type="button"
                onClick={handleAddVariant}
                className="active-press inline-flex items-center gap-1 text-[11px] bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Plus className="w-3 h-3" />
                <span>Tambah Paket</span>
              </button>
            </div>

            <div className="space-y-3">
              {variants.map((v, idx) => (
                <div
                  key={v.id || idx}
                  className="bg-gray-900/60 border border-gray-800 rounded-xl p-3 space-y-2 relative"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-gray-400">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveVariant(idx)}
                      className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                      title="Hapus varian ini"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-0.5">
                        Nama Paket
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Invite Team"
                        value={v.name}
                        onChange={(e) =>
                          handleVariantChange(idx, "name", e.target.value)
                        }
                        required
                        className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-0.5">
                        Durasi
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: 1 Bulan / 1 Tahun"
                        value={v.duration}
                        onChange={(e) =>
                          handleVariantChange(idx, "duration", e.target.value)
                        }
                        required
                        className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-0.5">
                        Tipe Akun
                      </label>
                      <select
                        value={v.type}
                        onChange={(e) =>
                          handleVariantChange(idx, "type", e.target.value as any)
                        }
                        className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1.5 text-xs text-white"
                      >
                        <option value="Private">Private</option>
                        <option value="Sharing">Sharing</option>
                        <option value="Invite Member">Invite Member</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-0.5">
                        Harga (Rp)
                      </label>
                      <input
                        type="number"
                        placeholder="25000"
                        value={v.price}
                        onChange={(e) =>
                          handleVariantChange(
                            idx,
                            "price",
                            Number(e.target.value) || 0
                          )
                        }
                        required
                        className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-0.5">
                        Harga Coret (Rp, Opsional)
                      </label>
                      <input
                        type="number"
                        placeholder="50000"
                        value={v.originalPrice || ""}
                        onChange={(e) =>
                          handleVariantChange(
                            idx,
                            "originalPrice",
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                        className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-gray-400 block mb-0.5">
                        Keterangan Varian
                      </label>
                      <input
                        type="text"
                        placeholder="Login akun admin / Email pribadi"
                        value={v.description || ""}
                        onChange={(e) =>
                          handleVariantChange(idx, "description", e.target.value)
                        }
                        className="w-full bg-gray-950 border border-gray-800 rounded px-2 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="active-press px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
