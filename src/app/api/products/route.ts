import { NextResponse } from "next/server";
import { getStoredProducts, saveStoredProducts } from "@/lib/products-storage";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { validateAndSanitizeProduct } from "@/lib/product-validator";

export const dynamic = "force-dynamic";

// Publik dapat melihat katalog produk
export async function GET() {
  try {
    const products = await getStoredProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data produk" },
      { status: 500 }
    );
  }
}

// Hanya admin terotentikasi yang boleh menambah produk
export async function POST(request: Request) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Sesi admin tidak valid atau telah berakhir." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validation = validateAndSanitizeProduct(body);

    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { success: false, message: validation.error || "Data produk tidak valid." },
        { status: 400 }
      );
    }

    const newProduct = validation.sanitized;
    const products = await getStoredProducts();

    // Check if ID exists
    const exists = products.some((p) => p.id === newProduct.id);
    if (exists) {
      return NextResponse.json(
        { success: false, message: "ID/nama produk sudah digunakan, gunakan nama lain." },
        { status: 400 }
      );
    }

    const updated = [newProduct, ...products];
    await saveStoredProducts(updated);

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menyimpan produk baru." },
      { status: 500 }
    );
  }
}
