import { Product, StoreSettings, Testimonial, FAQItem, Order } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'canva-pro-1m',
    name: 'Canva Pro 1 Bulan',
    slug: 'canva-pro-1-bulan',
    category: 'premium',
    price: 5000,
    originalPrice: 25000,
    period: '1 Bulan',
    badge: 'POPULAR 🔥',
    icon: 'Palette',
    shortDesc: 'Akses penuh Canva Pro desain grafis tanpa batas, unlock ribuan template premium.',
    features: [
      'Full Garansi 30 Hari Penuh',
      'Invite via Email Pribadi / Akun Baru',
      'Fitur Magic Studio & AI Tools Aktif',
      'Unlock 100M+ Foto, Video, Font Premium',
      'Download Background Transparan & Format SVG',
      'Bisa di Android, iOS, PC / Laptop'
    ],
    stock: 'ready',
    popular: true,
    instructions: 'Kirimkan email Canva Anda saat checkout. CS kami akan mengirim invite link dalam 1-5 menit.'
  },
  {
    id: 'nokos-indo',
    name: 'Nokos Indo (+62)',
    slug: 'nokos-indo-otp',
    category: 'nokos',
    price: 5000,
    originalPrice: 15000,
    period: 'Per Nomor / 1x OTP',
    badge: 'INSTANT OTP ⚡',
    icon: 'Smartphone',
    shortDesc: 'Nomor virtual kosong Indonesia (+62) fresh untuk verifikasi WhatsApp, Telegram, dll.',
    features: [
      'Nomor Fresh +62 Indonesia Asli',
      'Support WhatsApp, Telegram, E-Wallet',
      'Kode OTP Masuk Instan (10-30 Detik)',
      'Garansi Ganti Nomor jika OTP Tidak Masuk',
      'Cocok untuk Bot, Klone Akun, Verifikasi Web',
      'Aman dan Anti-Banned'
    ],
    stock: 'ready',
    popular: true,
    instructions: 'Pastikan aplikasi WA/Telegram sudah standby di layar input nomor. Kode OTP akan dikirimkan langsung oleh bot/admin kami.'
  },
  {
    id: 'panel-pterodactyl-bot',
    name: 'Panel Pterodactyl (Egg Node.js)',
    slug: 'panel-pterodactyl-bot-wa',
    category: 'panel',
    price: 5000,
    originalPrice: 20000,
    period: '1 Bulan',
    badge: 'BEST FOR BOT 🤖',
    icon: 'Bot',
    shortDesc: 'Hosting server khusus Run Bot WhatsApp (Node.js/Baileys/WhiskeySockets) 24/7 Anti-Crash.',
    features: [
      'Egg Node.js v18 / v20 / v22 Terupdate',
      '1 GB RAM (70% CPU) s/d Unlimited RAM (80% CPU)',
      'Server Uptime 99.9% Low Latency Singapore',
      'Anti-Crash, Auto-Restart saat Bot Offline',
      'Akses SFTP & Web File Manager Lengkap',
      'Bebas Pasang Modul NPM & Baileys Lib'
    ],
    stock: 'ready',
    popular: true,
    variants: [
      { id: 'bot-1gb', name: 'Paket 1 GB', specs: '1 GB RAM • 70% CPU • 2 GB NVMe Disk', price: 5000, ram: '1 GB', cpu: '70% CPU', badge: 'STARTER (5K)' },
      { id: 'bot-2gb', name: 'Paket 2 GB', specs: '2 GB RAM • 80% CPU • 4 GB NVMe Disk', price: 7000, ram: '2 GB', cpu: '80% CPU' },
      { id: 'bot-3gb', name: 'Paket 3 GB', specs: '3 GB RAM • 80% CPU • 6 GB NVMe Disk', price: 9000, ram: '3 GB', cpu: '80% CPU' },
      { id: 'bot-4gb', name: 'Paket 4 GB', specs: '4 GB RAM • 80% CPU • 8 GB NVMe Disk', price: 11000, ram: '4 GB', cpu: '80% CPU' },
      { id: 'bot-5gb', name: 'Paket 5 GB', specs: '5 GB RAM • 80% CPU • 10 GB NVMe Disk', price: 13000, ram: '5 GB', cpu: '80% CPU', badge: 'PRO' },
      { id: 'bot-unlimited', name: 'Paket Unlimited', specs: 'Unlimited RAM • 80% CPU Dedicated • Unlimited Disk', price: 15000, ram: 'Unlimited RAM', cpu: '80% CPU dedicated', badge: 'UNLIMITED (15K) 🚀' },
    ],
    instructions: 'Setelah pembayaran, username & password login ke panel pterodactyl dikirimkan otomatis.'
  },
  {
    id: 'admin-panel-ptero',
    name: 'Admin Panel Pterodactyl',
    slug: 'admin-panel-pterodactyl',
    category: 'panel',
    price: 10000,
    originalPrice: 35000,
    period: '1 Bulan',
    badge: 'ADMIN ACCESS 👑',
    icon: 'ShieldAlert',
    shortDesc: 'Akses tingkat Administrator pada panel Pterodactyl. Bisa create server & kelola user.',
    features: [
      'Akses Administrator Pterodactyl Panel',
      'Bebas Create & Kelola Server User',
      'Bisa Setting Node & Custom Eggs',
      'High Speed Ryzen / Xeon NVMe Server',
      'Full Garansi 30 Hari',
      'Cocok untuk Owner Toko Bot & Hosting'
    ],
    stock: 'ready',
    popular: true,
    instructions: 'Akan dibuatkan akun level Admin pada panel Zynex Studio.'
  },
  {
    id: 'partner-panel-ptero',
    name: 'Partner Panel Pterodactyl',
    slug: 'partner-panel-pterodactyl',
    category: 'panel',
    price: 15000,
    originalPrice: 50000,
    period: '1 Bulan',
    badge: 'RESELLER VIP ⭐',
    icon: 'Crown',
    shortDesc: 'Tingkat kemitraan Partner tertinggi dengan resource melimpah untuk jualan panel.',
    features: [
      'Akses Partner / Reseller VIP Eksklusif',
      'Unlimited Create Server & Sub-Users',
      'Prioritas Resource Dedicated Anti-Lag',
      'Dukungan Teknis VIP WhatsApp 24/7',
      'Bisa Jual Ulang Server / Buka Jasa Bot',
      'Backup Server Mingguan Gratis'
    ],
    stock: 'ready',
    popular: true,
    instructions: 'Akan diberikan dashboard khusus partner dengan alokasi resource maksimal.'
  },
  {
    id: 'domain-my-id',
    name: 'Domain .my.id',
    slug: 'domain-my-id',
    category: 'domain',
    price: 5000,
    originalPrice: 20000,
    period: '1 Tahun',
    badge: 'PROMO 5K 🌐',
    icon: 'Globe',
    shortDesc: 'Domain resmi Indonesia .my.id untuk portfolio, bot webhook, atau website pribadi.',
    features: [
      'Masa Aktif 1 Tahun Penuh',
      'Full DNS Management & Cloudflare Support',
      'Aktivasi Cepat Tanpa KTP / Syarat Rumit',
      'Bisa Custom Nameserver (NS)',
      'Garansi domain aktif aman selama 1 tahun',
      'Support SSL HTTPS Gratis'
    ],
    stock: 'ready',
    popular: false,
    instructions: 'Sebutkan nama domain yang diinginkan (contoh: botwa-anda.my.id) saat pemesanan.'
  },
  {
    id: 'domain-web-id',
    name: 'Domain .web.id',
    slug: 'domain-web-id',
    category: 'domain',
    price: 5000,
    originalPrice: 40000,
    period: '1 Tahun',
    badge: 'PROMO 5K 🌐',
    icon: 'Globe2',
    shortDesc: 'Domain ekstensi .web.id populer untuk komunitas, website toko online, dan project apps.',
    features: [
      'Masa Aktif 1 Tahun Penuh',
      'Full DNS Management',
      'Support Custom Cloudflare & CNAME',
      'Aktivasi Cepat & Legal Resmi PANDI',
      'Garansi Full 1 Tahun',
      'Cocok untuk Web Landing / Portfolio'
    ],
    stock: 'ready',
    popular: false,
    instructions: 'Sebutkan nama domain yang diinginkan (contoh: toko-saya.web.id) saat pemesanan.'
  },
  {
    id: 'domain-biz-id',
    name: 'Domain .biz.id',
    slug: 'domain-biz-id',
    category: 'domain',
    price: 5000,
    originalPrice: 25000,
    period: '1 Tahun',
    badge: 'PROMO 5K 🌐',
    icon: 'Briefcase',
    shortDesc: 'Domain bisnis resmi .biz.id untuk UMKM, toko digital, dan branding profesional.',
    features: [
      'Masa Aktif 1 Tahun Penuh',
      'Full DNS Control Panel',
      'Bebas A Record, CNAME, TXT, MX',
      'Aktivasi Instan & Bergaransi',
      'Bisa diarahkan ke Vercel / GitHub / Hosting',
      'Support Domain Email & Webhook'
    ],
    stock: 'ready',
    popular: false,
    instructions: 'Sebutkan nama domain yang diinginkan (contoh: zynexstore.biz.id) saat pemesanan.'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Zynex Studio',
  tagline: 'Penyedia Cloud Hosting, Panel Pterodactyl & Produk Digital Terpercaya Sejak 2024',
  whatsappNumber: '62895325852509',
  telegramUsername: 'ZynexStudioSupport',
  discordUrl: 'https://discord.gg/zynexstudio',
  instagramUrl: 'https://instagram.com/zynexstudio',
  qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020101021126570011ID.DANA.WWW011893600915389532585202150000000000000005204581253033605802ID5912ZYNEX+STUDIO6013KOTA+JAKARTA61051234062070703A016304E8A9',
  danaNumber: '0895-3258-52509',
  danaName: 'ZYNEX STUDIO OFFICIAL',
  gopayNumber: '0895-3258-52509',
  gopayName: 'ZYNEX STUDIO OFFICIAL',
  bcaNumber: '8920194821',
  bcaName: 'ZYNEX DIGITAL MEDIA',
  announcement: '🔥 FLASH SALE HARI INI: Canva Pro 5K, Panel Bot WA 5K, Domain .my.id/.web.id/.biz.id Cuma 5K! Garansi 100% Anti Rollback!',
  showAnnouncement: true,
  pterodactylLoginUrl: 'https://panel.zynexstudio.com'
};

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Fajar Pratama',
    role: 'Developer WhatsApp Bot',
    product: 'Panel Pterodactyl 5GB Node.js',
    rating: 5,
    comment: 'Panel kenceng parah! Bot WA Baileys multi-device gue online 24 jam nonstop gak pernah crash. Harga 13k dapet 5GB 80% CPU worth it banget!',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    date: 'Kemarin'
  },
  {
    id: 'testi-2',
    name: 'Siti Rahmawati',
    role: 'Content Creator',
    product: 'Canva Pro 1 Bulan',
    rating: 5,
    comment: 'Beli Canva Pro 5k prosesnya gak nyampe 2 menit langsung aktif di email pribadi. Fitur Magic Studio AI jalan lancar, mantap Zynex Studio!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    date: '2 hari lalu'
  },
  {
    id: 'testi-3',
    name: 'Rian Hidayat',
    role: 'Owner Store Online',
    product: 'Domain .biz.id + Partner Panel',
    rating: 5,
    comment: 'Admin fast respon di WA, order domain .biz.id 5k langsung pointing ke Cloudflare tanpa ribet KTP. Partner panelnya juga murah buat jualan lagi.',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    date: '3 hari lalu'
  },
  {
    id: 'testi-4',
    name: 'Bima Satria',
    role: 'Affiliate Marketer',
    product: 'Nokos Indo (+62)',
    rating: 5,
    comment: 'OTP Nokos Indo langsung masuk pas verifikasi WhatsApp bisnis. CS ramah dan gercep pas dikontak. Langganan tetap di sini!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    date: '5 hari lalu'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'panel',
    question: 'Bagaimana cara setup Bot WhatsApp di Panel Pterodactyl?',
    answer: 'Sangat mudah! Setelah order, Anda akan mendapatkan URL panel, username & password. Login ke panel, upload file script bot Anda (zip/folder), atur file start (misal: index.js / app.js), lalu klik tombol "Start". Panel Zynex Studio sudah siap dengan runtime Node.js v18/v20/v22 terbaru.'
  },
  {
    id: 'faq-2',
    category: 'nokos',
    question: 'Apakah Nokos Indo aman dan ada garansi jika OTP tidak masuk?',
    answer: 'Ya, 100% Bergaransi! Jika dalam waktu 5 menit kode OTP belum terkirim ke WhatsApp/Telegram Anda, admin akan langsung menggantikan dengan nomor baru tanpa biaya tambahan.'
  },
  {
    id: 'faq-3',
    category: 'premium',
    question: 'Canva Pro sistemnya invite tim atau ganti akun?',
    answer: 'Kami menggunakan sistem Invite Tim Resmi. Anda cukup mengirimkan alamat email akun Canva Anda yang sudah terdaftar, dan kami kirimkan undangan. Semua desain lama Anda tetap aman 100% dan tidak akan hilang.'
  },
  {
    id: 'faq-4',
    category: 'domain',
    question: 'Berapa lama proses aktivasi domain .my.id / .web.id / .biz.id?',
    answer: 'Proses aktivasi domain instan rata-rata 5 - 15 menit setelah konfirmasi transfer. Domain langsung aktif dengan Nameserver (NS) yang bisa diarahkan ke Cloudflare, cPanel, atau hosting Anda.'
  },
  {
    id: 'faq-5',
    category: 'payment',
    question: 'Apa saja metode pembayaran yang diterima di Zynex Studio?',
    answer: 'Kami menerima QRIS (Bisa scan via semua E-Wallet & Bank: DANA, OVO, GoPay, ShopeePay, LinkAja, BCA, Mandiri, BRI, BNI) serta transfer manual DANA, GoPay, dan Bank BCA.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    invoiceNumber: 'INV-ZNX-9821',
    customerName: 'Dimas Kurniawan',
    customerWhatsapp: '081298765432',
    productName: 'Panel Pterodactyl (Egg Node.js)',
    productId: 'panel-pterodactyl-bot',
    variantName: 'Paket 1 GB (70% CPU)',
    specs: '1 GB RAM • 70% CPU',
    price: 5000,
    paymentMethod: 'qris',
    status: 'completed',
    createdAt: '2026-08-29 08:30:15',
    notes: 'Untuk bot WhatsApp Baileys toko online'
  },
  {
    id: 'ord-1002',
    invoiceNumber: 'INV-ZNX-9822',
    customerName: 'Aulia Rahma',
    customerWhatsapp: '085712345678',
    productName: 'Canva Pro 1 Bulan',
    productId: 'canva-pro-1m',
    variantName: '1 Bulan Private Invite',
    specs: 'Email: aulia.design@gmail.com',
    price: 5000,
    paymentMethod: 'dana',
    status: 'completed',
    createdAt: '2026-08-29 09:12:40',
    notes: 'Tolong kirim invite secepatnya ya'
  },
  {
    id: 'ord-1003',
    invoiceNumber: 'INV-ZNX-9823',
    customerName: 'Aditya Pratama',
    customerWhatsapp: '088219283746',
    productName: 'Partner Panel Pterodactyl',
    productId: 'partner-panel-ptero',
    variantName: 'Partner VIP Unlimited',
    specs: 'Akses Reseller VIP',
    price: 15000,
    paymentMethod: 'bca',
    status: 'completed',
    createdAt: '2026-08-29 10:05:22',
    notes: 'Mau buka jasa hosting bot WA'
  },
  {
    id: 'ord-1004',
    invoiceNumber: 'INV-ZNX-9824',
    customerName: 'Reza Hendra',
    customerWhatsapp: '089677889900',
    productName: 'Domain .my.id',
    productId: 'domain-my-id',
    variantName: '1 Tahun',
    specs: 'Domain: rezadev.my.id',
    price: 5000,
    paymentMethod: 'qris',
    status: 'pending',
    createdAt: '2026-08-29 10:45:10',
    notes: 'Nameserver Cloudflare: ada.ns.cloudflare.com'
  },
  {
    id: 'ord-1005',
    invoiceNumber: 'INV-ZNX-9825',
    customerName: 'Yogi Saputra',
    customerWhatsapp: '081345678901',
    productName: 'Nokos Indo (+62)',
    productId: 'nokos-indo',
    variantName: '1 Nomor Fresh OTP',
    specs: 'OTP WhatsApp',
    price: 5000,
    paymentMethod: 'gopay',
    status: 'completed',
    createdAt: '2026-08-29 11:20:05',
    notes: 'Standby OTP'
  }
];
