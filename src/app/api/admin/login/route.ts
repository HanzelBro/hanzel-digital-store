import { NextResponse } from "next/server";
import {
  validateAdminPassword,
  createSessionToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

// In-memory rate limiting store for admin login
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const loginAttempts = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000; // 1 menit window

function checkRateLimit(ip: string): { allowed: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  // Bersihkan record yang sudah lewat waktu window
  if (!record || now > record.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, retryAfterSeconds: 0 };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return { allowed: false, remaining: 0, retryAfterSeconds: retryAfter };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_ATTEMPTS - record.count, retryAfterSeconds: 0 };
}

export async function POST(request: Request) {
  try {
    // Ekstrak IP client
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : request.headers.get("cf-connecting-ip") || "127.0.0.1";

    const { allowed, retryAfterSeconds } = checkRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Terlalu banyak percobaan login. Silakan tunggu ${retryAfterSeconds} detik lagi.`,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfterSeconds.toString(),
          },
        }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { success: false, message: "Password/PIN wajib diisi." },
        { status: 400 }
      );
    }

    if (!validateAdminPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Password atau PIN Admin salah." },
        { status: 401 }
      );
    }

    // Reset rate limiter saat login berhasil
    loginAttempts.delete(clientIp);

    // Buat token sesi aman
    const sessionToken = createSessionToken();
    const response = NextResponse.json({
      success: true,
      message: "Login berhasil.",
    });

    // Set HTTP-Only Cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 jam
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server saat login." },
      { status: 500 }
    );
  }
}
