import { Product, ProductVariant } from "@/data/products";

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: Product;
}

const ALLOWED_BADGES = ["Best Seller", "Promo", "Popular"];
const ALLOWED_TYPES = ["Private", "Sharing", "Invite Member"];

export function validateAndSanitizeProduct(
  input: any,
  existingId?: string
): ValidationResult {
  if (!input || typeof input !== "object") {
    return { valid: false, error: "Payload produk tidak valid." };
  }

  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name || name.length < 2 || name.length > 100) {
    return { valid: false, error: "Nama produk wajib diisi (2 - 100 karakter)." };
  }

  const category =
    typeof input.category === "string" ? input.category.trim() : "";
  if (!category || category.length > 50) {
    return { valid: false, error: "Kategori wajib diisi (maks 50 karakter)." };
  }

  const iconName =
    typeof input.iconName === "string"
      ? input.iconName.trim().replace(/[^a-zA-Z0-9_-]/g, "")
      : "Sparkles";

  const tagline =
    typeof input.tagline === "string" ? input.tagline.trim().slice(0, 200) : "";

  const description =
    typeof input.description === "string"
      ? input.description.trim().slice(0, 2000)
      : "";

  const warranty =
    typeof input.warranty === "string"
      ? input.warranty.trim().slice(0, 100)
      : "Garansi Full Durasi";

  const badge =
    input.badge && ALLOWED_BADGES.includes(input.badge)
      ? input.badge
      : undefined;

  // Features validation
  let features: string[] = [];
  if (Array.isArray(input.features)) {
    features = input.features
      .filter((f: any) => typeof f === "string" && f.trim().length > 0)
      .map((f: string) => f.trim().slice(0, 200))
      .slice(0, 20);
  }

  // Variants validation
  if (!Array.isArray(input.variants) || input.variants.length === 0) {
    return { valid: false, error: "Minimal harus ada 1 varian paket produk." };
  }

  const sanitizedVariants: ProductVariant[] = [];
  for (let i = 0; i < Math.min(input.variants.length, 30); i++) {
    const v = input.variants[i];
    if (!v || typeof v !== "object") continue;

    const vName = typeof v.name === "string" ? v.name.trim() : "";
    if (!vName) {
      return { valid: false, error: `Nama varian ke-${i + 1} wajib diisi.` };
    }

    const duration =
      typeof v.duration === "string" ? v.duration.trim().slice(0, 50) : "1 Bulan";

    const price = Number(v.price);
    if (isNaN(price) || price < 0 || price > 100000000) {
      return { valid: false, error: `Harga varian "${vName}" tidak valid (harus >= 0).` };
    }

    let originalPrice: number | undefined = undefined;
    if (v.originalPrice !== undefined && v.originalPrice !== null && v.originalPrice !== "") {
      const op = Number(v.originalPrice);
      if (!isNaN(op) && op >= 0 && op <= 100000000) {
        originalPrice = op;
      }
    }

    const type = ALLOWED_TYPES.includes(v.type) ? v.type : "Sharing";
    const vDesc =
      typeof v.description === "string" ? v.description.trim().slice(0, 200) : undefined;

    const vId =
      typeof v.id === "string" && v.id.trim()
        ? v.id.trim().replace(/[^a-zA-Z0-9_-]/g, "")
        : `var-${Date.now()}-${i}`;

    sanitizedVariants.push({
      id: vId,
      name: vName.slice(0, 100),
      duration,
      price,
      originalPrice,
      type: type as any,
      description: vDesc,
    });
  }

  if (sanitizedVariants.length === 0) {
    return { valid: false, error: "Tidak ada varian produk yang valid." };
  }

  // ID and Slug sanitization
  const finalId: string =
    (existingId && existingId.trim()) ||
    (typeof input.id === "string" && input.id.trim()
      ? input.id.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-")
      : name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));

  const finalSlug: string =
    typeof input.slug === "string" && input.slug.trim()
      ? input.slug.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "-")
      : finalId;

  return {
    valid: true,
    sanitized: {
      id: finalId,
      name,
      slug: finalSlug,
      category: category as any,
      iconName,
      tagline,
      description,
      features,
      warranty,
      badge,
      variants: sanitizedVariants,
    },
  };
}
