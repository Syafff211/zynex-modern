export type ProductCategory = 'all' | 'panel' | 'premium' | 'nokos' | 'domain' | 'service';

export interface ProductVariant {
  id: string;
  name: string;
  specs: string;
  price: number;
  cpu?: string;
  ram?: string;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'panel' | 'premium' | 'nokos' | 'domain' | 'service';
  price: number;
  period: string;
  originalPrice?: number;
  badge?: string;
  icon: string;
  shortDesc: string;
  features: string[];
  stock: 'ready' | 'limited' | 'out_of_stock';
  popular?: boolean;
  variants?: ProductVariant[];
  whatsappTemplate?: string;
  instructions?: string;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerWhatsapp: string;
  productName: string;
  productId: string;
  variantName?: string;
  specs?: string;
  price: number;
  paymentMethod: 'qris' | 'dana' | 'gopay' | 'shopeepay' | 'bca';
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string; // e.g. "6281234567890"
  telegramUsername: string; // e.g. "zynexstudio"
  discordUrl: string;
  instagramUrl?: string;
  qrisImageUrl: string;
  danaNumber: string;
  danaName: string;
  gopayNumber: string;
  gopayName: string;
  bcaNumber: string;
  bcaName: string;
  announcement: string;
  showAnnouncement: boolean;
  pterodactylLoginUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  product: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
