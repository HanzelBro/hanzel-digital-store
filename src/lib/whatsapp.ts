import { Product, ProductVariant } from "@/data/products";

export const STORE_CONFIG = {
  storeName: "Hanzel Digital Store",
  tagline: "Penyedia Langganan Akun Digital Premium Resmi, Murah & Bergaransi",
  adminWhatsApp: "6281335520743", // Ganti dengan nomor WhatsApp admin yang diinginkan
  operationalHours: "Setiap Hari (08.00 - 23.00 WIB)",
  instagram: "@hanzeldigital",
};

export interface OrderDetails {
  product: Product;
  variant: ProductVariant;
  buyerName: string;
  buyerEmail?: string;
  paymentMethod: string;
  notes?: string;
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppOrderUrl(details: OrderDetails): string {
  const { product, variant, buyerName, buyerEmail, paymentMethod, notes } = details;

  const lines = [
    `FORM ORDER - ${STORE_CONFIG.storeName.toUpperCase()}`,
    `Halo Admin, saya ingin order produk digital berikut:`,
    ``,
    `*Produk:* ${product.name}`,
    `*Paket / Durasi:* ${variant.name} (${variant.duration})`,
    `*Tipe:* ${variant.type}`,
    `*Harga:* ${formatRupiah(variant.price)}`,
    `*Metode Pembayaran:* ${paymentMethod}`,
    ``,
    `*Nama Pembeli:* ${buyerName.trim()}`,
  ];

  if (buyerEmail && buyerEmail.trim()) {
    lines.push(`*Email Penerima / Akun:* ${buyerEmail.trim()}`);
  }

  if (notes && notes.trim()) {
    lines.push(`*Catatan Khusus:* ${notes.trim()}`);
  }

  lines.push(
    ``,
    `Mohon segera diproses dan kirimkan nomor rekening / barcode QRIS ya Admin. Terima kasih!`
  );

  const message = lines.join("\n");
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${STORE_CONFIG.adminWhatsApp}?text=${encodedMessage}`;
}
