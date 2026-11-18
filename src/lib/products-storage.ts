import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { Product, PRODUCTS as DEFAULT_PRODUCTS } from "@/data/products";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "products.json");

export async function getStoredProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, "utf-8");
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) {
      throw new Error("Stored products data is not an array");
    }
    return parsed as Product[];
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      // File doesn't exist yet, initialize it safely
      await saveStoredProducts(DEFAULT_PRODUCTS);
      return DEFAULT_PRODUCTS;
    }

    // JSON parse error or read collision: DO NOT overwrite products.json!
    console.error("[SECURITY/STORAGE] Error reading products storage:", error);
    try {
      // Create a safety backup of the corrupted file for recovery
      const backupPath = `${DATA_FILE_PATH}.corrupt.${Date.now()}`;
      await fs.copyFile(DATA_FILE_PATH, backupPath);
      console.warn(`[SECURITY/STORAGE] Corrupt storage backed up to ${backupPath}`);
    } catch {
      // Ignore backup error if file cannot be copied
    }

    // Return in-memory fallback without destroying persistent storage on disk
    return DEFAULT_PRODUCTS;
  }
}

export async function saveStoredProducts(products: Product[]): Promise<void> {
  const dir = path.dirname(DATA_FILE_PATH);
  await fs.mkdir(dir, { recursive: true });

  // Atomic write: write to unique temp file first, then atomically rename
  const randomSuffix = crypto.randomBytes(6).toString("hex");
  const tempPath = `${DATA_FILE_PATH}.${Date.now()}.${randomSuffix}.tmp`;

  try {
    await fs.writeFile(tempPath, JSON.stringify(products, null, 2), "utf-8");
    await fs.rename(tempPath, DATA_FILE_PATH);
  } catch (err) {
    // Clean up temporary file if write or rename failed
    try {
      await fs.unlink(tempPath);
    } catch {
      // Ignore cleanup error
    }
    throw err;
  }
}
