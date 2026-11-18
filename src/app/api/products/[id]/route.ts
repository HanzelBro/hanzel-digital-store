import { NextResponse } from "next/server";
import { getStoredProducts, saveStoredProducts } from "@/lib/products-storage";
import { isAuthenticatedAdmin } from "@/lib/auth";
import { validateAndSanitizeProduct } from "@/lib/product-validator";

export const dynamic = "force-dynamic";

// Hanya admin terotentikasi yang boleh mengedit produk
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Sesi admin tidak valid atau telah berakhir." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const products = await getStoredProducts();

    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan." },
        { status: 404 }
      );
    }

    // Merge existing product with updates then validate
    const merged = {
      ...products[index],
      ...body,
      id, // Preserve ID
    };

    const validation = validateAndSanitizeProduct(merged, id);
    if (!validation.valid || !validation.sanitized) {
      return NextResponse.json(
        { success: false, message: validation.error || "Data update produk tidak valid." },
        { status: 400 }
      );
    }

    products[index] = validation.sanitized;
    await saveStoredProducts(products);

    return NextResponse.json({ success: true, data: products[index] });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui produk." },
      { status: 500 }
    );
  }
}

// Hanya admin terotentikasi yang boleh menghapus produk
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuth = await isAuthenticatedAdmin();
    if (!isAuth) {
      return NextResponse.json(
        { success: false, message: "Akses ditolak. Sesi admin tidak valid atau telah berakhir." },
        { status: 401 }
      );
    }

    const { id } = await params;
    const products = await getStoredProducts();

    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan." },
        { status: 404 }
      );
    }

    await saveStoredProducts(filtered);

    return NextResponse.json({ success: true, message: "Produk berhasil dihapus." });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus produk." },
      { status: 500 }
    );
  }
}
