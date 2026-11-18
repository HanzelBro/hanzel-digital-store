export interface ProductVariant {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice?: number;
  type: "Private" | "Sharing" | "Invite Member";
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: "Design & Editing" | "Streaming" | "Productivity & AI" | "Music & Audio";
  iconName: string;
  tagline: string;
  description: string;
  features: string[];
  warranty: string;
  badge?: "Best Seller" | "Promo" | "Popular";
  variants: ProductVariant[];
}

export const PRODUCTS: Product[] = [
  {
    id: "canva-pro",
    name: "Canva Pro",
    slug: "canva-pro",
    category: "Design & Editing",
    iconName: "Palette",
    tagline: "Desain tanpa batas dengan akses ribuan template premium",
    description: "Nikmati akses jutaan template premium, penghapus latar belakang instan, brand kit, dan export resolusi tinggi.",
    badge: "Best Seller",
    warranty: "Garansi Full Durasi",
    features: [
      "Akses 100+ juta foto, video & elemen grafis",
      "Background Remover 1-klik",
      "Magic Resize & Resize otomatis",
      "Brand Kit dengan font & warna kustom",
      "Bisa pakai email pribadi (Invite Team)"
    ],
    variants: [
      {
        id: "canva-1bln-invite",
        name: "Invite Team (Email Pribadi)",
        duration: "1 Bulan",
        price: 15000,
        originalPrice: 35000,
        type: "Invite Member",
        description: "Langsung gabung via email Canva yang sudah ada"
      },
      {
        id: "canva-1thn-invite",
        name: "Invite Team (Email Pribadi)",
        duration: "1 Tahun",
        price: 45000,
        originalPrice: 120000,
        type: "Invite Member",
        description: "Paling hemat, langganan 1 tahun full"
      },
      {
        id: "canva-lifetime-invite",
        name: "Invite Team Lifetime Promo",
        duration: "Lifetime (Garansi 1 Thn)",
        price: 75000,
        originalPrice: 200000,
        type: "Invite Member",
        description: "Akses tanpa perpanjangan bulanan"
      }
    ]
  },
  {
    id: "capcut-pro",
    name: "CapCut Pro",
    slug: "capcut-pro",
    category: "Design & Editing",
    iconName: "Video",
    tagline: "Edit video kualitas studio dengan efek & AI canggih",
    description: "Buka semua fitur pro CapCut, transisi premium, efek AI tubuh & suara, cloud storage, dan ekspor tanpa watermark.",
    badge: "Best Seller",
    warranty: "Garansi Full Durasi",
    features: [
      "Semua transisi, efek & filter VIP terbuka",
      "AI Smart Cutout & Voice Enhancer",
      "Ekspor hingga 4K 60fps tanpa watermark",
      "Akses font & audio VIP",
      "Bisa digunakan di HP (Android/iOS) & PC Desktop"
    ],
    variants: [
      {
        id: "capcut-1bln-sharing",
        name: "Akun Sharing (1 Device)",
        duration: "1 Bulan",
        price: 25000,
        originalPrice: 65000,
        type: "Sharing",
        description: "Login akun dari admin, hemat dan stabil"
      },
      {
        id: "capcut-1bln-private",
        name: "Akun Private (Bebas Device)",
        duration: "1 Bulan",
        price: 45000,
        originalPrice: 90000,
        type: "Private",
        description: "Akun khusus untuk Anda sendiri"
      },
      {
        id: "capcut-1thn-sharing",
        name: "Akun Sharing (1 Device)",
        duration: "1 Tahun",
        price: 135000,
        originalPrice: 350000,
        type: "Sharing",
        description: "Pilihan terbaik content creator aktif"
      }
    ]
  },
  {
    id: "youtube-premium",
    name: "YouTube Premium",
    slug: "youtube-premium",
    category: "Streaming",
    iconName: "PlayCircle",
    tagline: "Nonton video tanpa iklan & YouTube Music included",
    description: "Bebas jeda iklan yang mengganggu, putar di latar belakang saat layar mati, dan nikmati jutaan lagu di YouTube Music.",
    badge: "Popular",
    warranty: "Garansi Anti-Hold",
    features: [
      "Bebas semua iklan video & musik",
      "Putar di latar belakang (Background Play)",
      "Download video untuk ditonton offline",
      "Termasuk langganan YouTube Music Premium",
      "Proses via Invite Family email pribadi"
    ],
    variants: [
      {
        id: "yt-1bln-invite",
        name: "Family Plan (Email Pribadi)",
        duration: "1 Bulan",
        price: 15000,
        originalPrice: 35000,
        type: "Invite Member",
        description: "Email pribadi tanpa ganti akun"
      },
      {
        id: "yt-3bln-invite",
        name: "Family Plan (Email Pribadi)",
        duration: "3 Bulan",
        price: 35000,
        originalPrice: 90000,
        type: "Invite Member",
        description: "Hemat 3 bulan bebas iklan"
      }
    ]
  },
  {
    id: "netflix-premium",
    name: "Netflix Premium Ultra HD 4K",
    slug: "netflix-premium",
    category: "Streaming",
    iconName: "Film",
    tagline: "Streaming film & serial kualitas Ultra HD 4K",
    description: "Streaming film favorit Anda dengan resolusi jernih 4K UHD + HDR, audio spasial, dan profil khusus ber-PIN.",
    badge: "Popular",
    warranty: "Garansi Full Ganti Baru",
    features: [
      "Kualitas video Ultra HD 4K + HDR",
      "Profil 1 Pengguna dengan PIN Keamanan",
      "Bisa digunakan di Smart TV, Laptop, HP, Tablet",
      "Anti on-hold & anti screen limit"
    ],
    variants: [
      {
        id: "netflix-1bln-1p1u",
        name: "1 Profil 1 User (Shared)",
        duration: "1 Bulan",
        price: 35000,
        originalPrice: 65000,
        type: "Sharing",
        description: "1 Profil ber-PIN, login 1 device aktif"
      },
      {
        id: "netflix-1bln-private",
        name: "Private Full 5 Profil",
        duration: "1 Bulan",
        price: 145000,
        originalPrice: 186000,
        type: "Private",
        description: "Full 1 akun milik Anda, bebas atur 5 profil"
      }
    ]
  },
  {
    id: "spotify-premium",
    name: "Spotify Premium",
    slug: "spotify-premium",
    category: "Music & Audio",
    iconName: "Headphones",
    tagline: "Dengarkan musik tanpa batas & tanpa iklan",
    description: "Bebas skip lagu tak terbatas, audio kualitas sangat tinggi (320kbps), dan download lagu untuk offline mode.",
    warranty: "Garansi Full Durasi",
    features: [
      "Bebas iklan audio maupun banner",
      "Skip lagu sepuasnya tanpa batas",
      "Download offline lagu & podcast favorit",
      "Audio High Quality 320 kbps",
      "Bisa pakai akun lama Anda"
    ],
    variants: [
      {
        id: "spotify-1bln-plan",
        name: "Individual Plan",
        duration: "1 Bulan",
        price: 18000,
        originalPrice: 55000,
        type: "Invite Member",
        description: "Akun lama Anda di-upgrade resmi"
      },
      {
        id: "spotify-3bln-plan",
        name: "Individual Plan",
        duration: "3 Bulan",
        price: 45000,
        originalPrice: 150000,
        type: "Invite Member",
        description: "Hemat 3 bulan full garansi"
      }
    ]
  },
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus (GPT-4o)",
    slug: "chatgpt-plus",
    category: "Productivity & AI",
    iconName: "Bot",
    tagline: "Akses model AI tercanggih dengan kecepatan tinggi",
    description: "Akses tanpa batas ke GPT-4o, DALL-E 3 image generator, Advanced Data Analysis, web browsing, dan pembuatan custom GPTs.",
    badge: "Promo",
    warranty: "Garansi 30 Hari",
    features: [
      "Akses prioritas model GPT-4o",
      "Kemampuan generate gambar via DALL-E 3",
      "Upload file PDF, Excel, dan analisis data instan",
      "Memory & Custom GPT Store",
      "Voice Mode interaktif"
    ],
    variants: [
      {
        id: "chatgpt-1bln-sharing",
        name: "Akun Sharing (Max 2 User)",
        duration: "1 Bulan",
        price: 65000,
        originalPrice: 150000,
        type: "Sharing",
        description: "Hemat dan siap pakai langsung"
      },
      {
        id: "chatgpt-1bln-private",
        name: "Akun Private 1 User",
        duration: "1 Bulan",
        price: 290000,
        originalPrice: 350000,
        type: "Private",
        description: "Email baru khusus Anda, riwayat chat aman"
      }
    ]
  }
];

export const CATEGORIES = [
  "Semua",
  "Design & Editing",
  "Streaming",
  "Productivity & AI",
  "Music & Audio"
] as const;

export const PAYMENT_METHODS = [
  { id: "qris", name: "QRIS (Semua E-Wallet & Bank)", fee: "Gratis Biaya Admin" },
  { id: "dana", name: "DANA", fee: "Otomatis" },
  { id: "gopay", name: "GoPay", fee: "Otomatis" },
  { id: "bca", name: "Bank BCA", fee: "Transfer Manual" },
  { id: "mandiri", name: "Bank Mandiri", fee: "Transfer Manual" }
];
