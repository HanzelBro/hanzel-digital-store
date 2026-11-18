# Hanzel Digital Store

Website e-commerce katalog produk digital premium (Canva Pro, CapCut Pro, YouTube Premium, Netflix, Spotify, ChatGPT Plus, dll.) dengan alur checkout langsung ke WhatsApp Admin.

## Fitur Utama
- **Katalog Produk Lengkap**: Desain, Editing, Streaming, AI, dan Audio.
- **Pilihan Varian & Durasi**: 1 Bulan, 3 Bulan, 1 Tahun, Lifetime, Invite Team & Private.
- **Generator Order WhatsApp Otomatis**: Menghasilkan pesan terstruktur lengkap dengan nama pembeli, email, paket, harga, dan metode pembayaran.
- **Pilihan Pembayaran Lokal**: QRIS, DANA, GoPay, Bank BCA, Mandiri.
- **FAQ & Informasi Garansi**: Penjelasan garansi dan legalitas akun.
- **Desain Modern & Responsif**: Berbasis Next.js (App Router), Tailwind CSS, dan Lucide Icons.

## Cara Menjalankan Proyek

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Konfigurasi Environment Variable**:
   Salin `.env.example` ke `.env.local` dan atur password admin serta session secret Anda:
   ```bash
   cp .env.example .env.local
   ```
   Isi `ADMIN_PASSWORD` dan `ADMIN_SESSION_SECRET` dengan nilai yang aman.

3. **Jalankan Server Development**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

4. **Ganti Nomor WhatsApp Admin**:
   Buka file [src/lib/whatsapp.ts](src/lib/whatsapp.ts) lalu ubah variabel `adminWhatsApp` dengan nomor WhatsApp Anda (format kode negara tanpa +, contoh: `628xxxxxxxxxx`).

5. **Kelola Produk via Dashboard Admin**:
   Akses `http://localhost:3000/admin` pada browser Anda.
   - Masukkan PIN / Password yang telah dikonfigurasi di file `.env.local`.
   - Melalui laman ini Anda dapat **menambah produk baru**, **mengubah harga & varian**, atau **menghapus produk** langsung melalui UI tanpa mengedit kode.
   - Data tersimpan secara persisten di `src/data/products.json`.
