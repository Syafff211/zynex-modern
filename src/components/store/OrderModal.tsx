import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatIDR, buildWhatsappOrderUrl } from '../../utils/helpers';
import { DynamicIcon } from '../ui/DynamicIcon';
import {
  X,
  CheckCircle2,
  Copy,
  QrCode,
  Sparkles,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

export const OrderModal: React.FC = () => {
  const {
    activeOrderProduct,
    selectedVariant,
    closeOrderModal,
    settings,
    createOrder
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerWhatsapp, setCustomerWhatsapp] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'dana' | 'gopay' | 'bca'>('qris');
  const [activeVariant, setActiveVariant] = useState<any | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (activeOrderProduct) {
      if (selectedVariant) {
        setActiveVariant(selectedVariant);
      } else if (activeOrderProduct.variants && activeOrderProduct.variants.length > 0) {
        setActiveVariant(activeOrderProduct.variants[0]);
      } else {
        setActiveVariant(null);
      }
      setSubmittedOrder(null);
      setErrorMsg('');
    }
  }, [activeOrderProduct, selectedVariant]);

  if (!activeOrderProduct) return null;

  const currentPrice = activeVariant ? activeVariant.price : activeOrderProduct.price;
  const currentSpecs = activeVariant ? activeVariant.specs || activeVariant.name : activeOrderProduct.shortDesc;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMsg('Silakan isi Nama Anda');
      return;
    }
    if (!customerWhatsapp.trim()) {
      setErrorMsg('Silakan isi Nomor WhatsApp Anda');
      return;
    }

    // Create Order in local state & admin database
    const newOrder = createOrder({
      customerName: customerName.trim(),
      customerWhatsapp: customerWhatsapp.trim(),
      productId: activeOrderProduct.id,
      productName: activeOrderProduct.name,
      variantName: activeVariant ? activeVariant.name : undefined,
      specs: currentSpecs,
      price: currentPrice,
      paymentMethod,
      notes: notes.trim() || undefined
    });

    setSubmittedOrder(newOrder);

    // Build WhatsApp URL & redirect
    const waUrl = buildWhatsappOrderUrl({
      adminPhone: settings.whatsappNumber,
      invoice: newOrder.invoiceNumber,
      productName: activeOrderProduct.name,
      specs: currentSpecs,
      price: currentPrice,
      paymentMethod,
      customerName: customerName.trim(),
      customerWhatsapp: customerWhatsapp.trim(),
      notes: notes.trim()
    });

    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900/95 border border-cyan-500/30 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-800/80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <DynamicIcon name={activeOrderProduct.icon} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                Konfirmasi Pemesanan
              </span>
              <h3 className="text-lg font-black text-white">
                {activeOrderProduct.name}
              </h3>
            </div>
          </div>

          <button
            onClick={closeOrderModal}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!submittedOrder ? (
          <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Product Variants (if available) */}
            {activeOrderProduct.variants && activeOrderProduct.variants.length > 0 && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Pilih Varian / Kapasitas:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {activeOrderProduct.variants.map((v) => {
                    const isSelected = activeVariant?.id === v.id;
                    return (
                      <button
                        type="button"
                        key={v.id}
                        onClick={() => setActiveVariant(v)}
                        className={`p-2.5 rounded-xl border text-left transition-all text-xs ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-1 ring-cyan-400'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-white font-bold truncate">{v.name}</div>
                        <div className="text-cyan-400 font-extrabold mt-0.5">{formatIDR(v.price)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Spec & Price Box */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs text-slate-400">Paket Terpilih:</div>
                <div className="text-sm font-bold text-white">
                  {activeVariant ? activeVariant.name : activeOrderProduct.name}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {currentSpecs}
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <div className="text-[11px] text-slate-400">Total Pembayaran:</div>
                <div className="text-2xl font-black text-cyan-400">
                  {formatIDR(currentPrice)}
                </div>
              </div>
            </div>

            {/* Customer Information Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nama Lengkap / Panggilan <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dimas Kurniawan"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nomor WhatsApp Aktif <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={customerWhatsapp}
                  onChange={(e) => setCustomerWhatsapp(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Notes / Specific details (e.g. email or domain name) */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Catatan / Data Akun / Nama Domain
                <span className="text-slate-500 text-[11px] font-normal ml-1">
                  (Khusus Canva isi email, domain isi nama domain)
                </span>
              </label>
              <textarea
                rows={2}
                placeholder="Contoh: Email Canva / Nama domain diinginkan / Permintaan khusus..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 resize-none"
              />
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Pilih Metode Pembayaran:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'qris'
                      ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold ring-1 ring-cyan-400'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                  <div className="text-xs font-bold text-white">QRIS All Bank</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">Instant Fee 0%</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('dana')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'dana'
                      ? 'bg-blue-500/20 border-blue-400 text-white font-bold ring-1 ring-blue-400'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="w-5 h-5 mx-auto mb-1 font-black text-blue-400 text-xs">D</div>
                  <div className="text-xs font-bold text-white">DANA</div>
                  <div className="text-[10px] text-slate-400">Transfer Manual</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('gopay')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'gopay'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold ring-1 ring-emerald-400'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="w-5 h-5 mx-auto mb-1 font-black text-emerald-400 text-xs">G</div>
                  <div className="text-xs font-bold text-white">GoPay</div>
                  <div className="text-[10px] text-slate-400">Transfer Manual</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bca')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'bca'
                      ? 'bg-purple-500/20 border-purple-400 text-white font-bold ring-1 ring-purple-400'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="w-5 h-5 mx-auto mb-1 font-black text-purple-400 text-xs">BCA</div>
                  <div className="text-xs font-bold text-white">Bank BCA</div>
                  <div className="text-[10px] text-slate-400">Transfer Bank</div>
                </button>
              </div>

              {/* Payment Details Drawer */}
              <div className="mt-3 p-4 rounded-2xl bg-slate-950/80 border border-white/5">
                {paymentMethod === 'qris' && (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-28 h-28 bg-white p-1.5 rounded-xl shadow-md shrink-0 flex items-center justify-center">
                      <img
                        src={settings.qrisImageUrl}
                        alt="QRIS Zynex Studio"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div className="font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>QRIS Support Semua Aplikasi</span>
                      </div>
                      <p className="text-slate-400">
                        Scan QR di atas via GoPay, DANA, OVO, ShopeePay, BCA Mobile, Livin Mandiri, BRImo, dll.
                      </p>
                      <div className="text-cyan-400 font-semibold pt-1">
                        Nominal: {formatIDR(currentPrice)}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'dana' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Nomor Akun DANA:</div>
                      <div className="text-sm font-mono font-bold text-white mt-0.5">{settings.danaNumber}</div>
                      <div className="text-[11px] text-slate-400">a/n {settings.danaName}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.danaNumber, 'DANA')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedText === 'DANA' ? 'Disalin!' : 'Salin'}</span>
                    </button>
                  </div>
                )}

                {paymentMethod === 'gopay' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Nomor GoPay:</div>
                      <div className="text-sm font-mono font-bold text-white mt-0.5">{settings.gopayNumber}</div>
                      <div className="text-[11px] text-slate-400">a/n {settings.gopayName}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.gopayNumber, 'GoPay')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedText === 'GoPay' ? 'Disalin!' : 'Salin'}</span>
                    </button>
                  </div>
                )}

                {paymentMethod === 'bca' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400">Nomor Rekening BCA:</div>
                      <div className="text-sm font-mono font-bold text-white mt-0.5">{settings.bcaNumber}</div>
                      <div className="text-[11px] text-slate-400">a/n {settings.bcaName}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.bcaNumber, 'BCA')}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedText === 'BCA' ? 'Disalin!' : 'Salin'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Kirim Pesanan ke WhatsApp Admin ({formatIDR(currentPrice)})</span>
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                🔒 Data pesanan Anda tersimpan aman dan diteruskan langsung ke Admin Zynex Studio.
              </p>
            </div>
          </form>
        ) : (
          /* Order Submitted Success View */
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-white">Pesanan Berhasil Dibuat!</h3>
            
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">No. Invoice:</span>
                <span className="font-mono font-bold text-cyan-400">{submittedOrder.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Produk:</span>
                <span className="font-semibold text-white">{submittedOrder.productName}</span>
              </div>
              {submittedOrder.variantName && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Varian:</span>
                  <span className="text-slate-300">{submittedOrder.variantName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-400">Total Harga:</span>
                <span className="font-bold text-emerald-400">{formatIDR(submittedOrder.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metode Bayar:</span>
                <span className="font-semibold text-white uppercase">{submittedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">Status:</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px]">
                  Menunggu Verifikasi Pembayaran
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Silakan lakukan pembayaran lalu konfirmasi bukti transfer melalui chat WhatsApp dengan CS kami.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href={buildWhatsappOrderUrl({
                  adminPhone: settings.whatsappNumber,
                  invoice: submittedOrder.invoiceNumber,
                  productName: submittedOrder.productName,
                  specs: submittedOrder.specs,
                  price: submittedOrder.price,
                  paymentMethod: submittedOrder.paymentMethod,
                  customerName: submittedOrder.customerName,
                  customerWhatsapp: submittedOrder.customerWhatsapp,
                  notes: submittedOrder.notes
                })}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Buka Chat WhatsApp CS</span>
              </a>

              <button
                onClick={closeOrderModal}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
