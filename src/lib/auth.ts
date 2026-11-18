import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_COOKIE_NAME = "hanzel_admin_token";

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Fail-fast on production if secrets are missing or weak
if (process.env.NODE_ENV === "production") {
  if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
    throw new Error(
      "FATAL SECURITY CONFIGURATION: ADMIN_SESSION_SECRET must be set and at least 32 characters in production."
    );
  }
  if (!ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
    throw new Error(
      "FATAL SECURITY CONFIGURATION: ADMIN_PASSWORD must be configured with at least 8 characters in production."
    );
  }
}

const EFFECTIVE_SECRET =
  SESSION_SECRET || "dev_fallback_secret_local_only_1234567890abcdef";
const EFFECTIVE_PASSWORD = ADMIN_PASSWORD || "admin123";

/**
 * Buat hash token sesi menggunakan HMAC-SHA256 dengan timestamp & cryptographic nonce
 */
export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `admin:${timestamp}:${nonce}`;
  const signature = crypto
    .createHmac("sha256", EFFECTIVE_SECRET)
    .update(payload)
    .digest("hex");
  return `${timestamp}.${nonce}.${signature}`;
}

/**
 * Verifikasi kevalidan token sesi (timing-safe, future-proof, 24h lifetime)
 */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [timestamp, nonce, signature] = parts;
  if (!timestamp || !nonce || !signature) return false;

  const payload = `admin:${timestamp}:${nonce}`;
  const expectedSignature = crypto
    .createHmac("sha256", EFFECTIVE_SECRET)
    .update(payload)
    .digest("hex");

  try {
    const sigBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (
      sigBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
    ) {
      return false;
    }
  } catch {
    return false;
  }

  // Cek kedaluwarsa sesi (aktif maks 24 jam dan tolak timestamp masa depan)
  const tokenTime = parseInt(timestamp, 10);
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (
    isNaN(tokenTime) ||
    tokenTime > now + 60000 || // Tolak jika waktu token > 1 menit ke depan
    now - tokenTime > twentyFourHours // Tolak jika lebih dari 24 jam
  ) {
    return false;
  }

  return true;
}

/**
 * Cek apakah password admin cocok secara constant-time (mitigasi timing attacks)
 */
export function validateAdminPassword(password: string): boolean {
  if (!password) return false;
  try {
    const passBuffer = Buffer.from(password);
    const targetBuffer = Buffer.from(EFFECTIVE_PASSWORD);
    if (passBuffer.length !== targetBuffer.length) {
      // Dummy constant-time comparison to mitigate timing leakage
      crypto.timingSafeEqual(passBuffer, passBuffer);
      return false;
    }
    return crypto.timingSafeEqual(passBuffer, targetBuffer);
  } catch {
    return false;
  }
}

/**
 * Helper untuk verifikasi sesi admin di dalam Server Actions / Route Handlers
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
