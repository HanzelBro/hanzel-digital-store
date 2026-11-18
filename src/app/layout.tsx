import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#090d16",
};

export const metadata: Metadata = {
  title: "Hanzel Digital Store - Akun Digital Premium Resmi & Bergaransi",
  description: "Katalog akun Canva Pro, CapCut Pro, YouTube Premium, Netflix, Spotify, dan ChatGPT Plus bergaransi dengan aktivasi cepat via WhatsApp.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hanzel Store",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark">
      <body className="antialiased min-h-screen pb-20 md:pb-0">
        {children}
      </body>
    </html>
  );
}
