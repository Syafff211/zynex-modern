export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num);
}

export function generateInvoiceNumber(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `INV-ZNX-${randomSuffix}`;
}

export function getCleanWhatsappNumber(phone: string): string {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('+62')) {
    cleaned = cleaned.slice(1);
  } else if (!cleaned.startsWith('62') && cleaned.length > 8) {
    cleaned = '62' + cleaned;
  }
  return cleaned;
}

export function buildWhatsappOrderUrl(params: {
  adminPhone: string;
  invoice: string;
  productName: string;
  specs?: string;
  price: number;
  paymentMethod: string;
  customerName: string;
  customerWhatsapp: string;
  notes?: string;
}): string {
  const cleanPhone = getCleanWhatsappNumber(params.adminPhone);
  
  const text = `Halo Admin *Zynex Studio*, saya ingin melakukan pemesanan:

🛒 *DETAIL PESANAN*
──────────────────────
• *No. Invoice:* ${params.invoice}
• *Produk:* ${params.productName}
${params.specs ? `• *Spesifikasi/Varian:* ${params.specs}\n` : ''}• *Total Harga:* ${formatIDR(params.price)}
• *Metode Bayar:* ${params.paymentMethod.toUpperCase()}

👤 *DATA PEMESAN*
──────────────────────
• *Nama:* ${params.customerName}
• *WhatsApp:* ${params.customerWhatsapp}
${params.notes ? `• *Catatan/Data:* ${params.notes}\n` : ''}
──────────────────────
Mohon segera diproses ya Min. Terima kasih! 🙏`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

export const STORAGE_KEYS = {
  PRODUCTS: 'zynex_products_v1',
  SETTINGS: 'zynex_settings_v1',
  ORDERS: 'zynex_orders_v1',
  AUTH: 'zynex_admin_auth_v1',
};
