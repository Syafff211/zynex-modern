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
      setErrorMsg('Silakan masukkan Nama Anda.');
      return;
    }
    if (!customerWhatsapp.trim()) {
      setErrorMsg('Silakan masukkan Nomor WhatsApp Anda.');
      return;
    }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <DynamicIcon name={activeOrderProduct.icon} className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                Formulir Pemesanan
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                {activeOrderProduct.name}
              </h3>
            </div>
          </div>

          <button
            onClick={closeOrderModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!submittedOrder ? (
          <form onSubmit={handleSubmitOrder} className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 text-xs">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center gap-2 text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Product Variants (if applicable) */}
            {activeOrderProduct.variants && activeOrderProduct.variants.length > 0 && (
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
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
                        className={`p-2 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-cyan-500/15 border-cyan-400 text-white font-bold ring-1 ring-cyan-400/50'
                            : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-white font-bold truncate text-[11px]">{v.name}</div>
                        <div className="text-cyan-400 font-mono font-bold mt-0.5">{formatIDR(v.price)}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Product Summary Box */}
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="text-[11px] text-slate-400">Paket:</div>
                <div className="font-bold text-white">
                  {activeVariant ? activeVariant.name : activeOrderProduct.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 truncate max-w-xs">
                  {currentSpecs}
                </div>
              </div>
              <div className="sm:text-right shrink-0">
                <div className="text-[10px] text-slate-400">Total Harga:</div>
                <div className="text-xl sm:text-2xl font-black text-cyan-400">
                  {formatIDR(currentPrice)}
                </div>
              </div>
            </div>

            {/* Customer Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nama Anda <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dimas"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nomor WhatsApp <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={customerWhatsapp}
                  onChange={(e) => setCustomerWhatsapp(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Notes Input */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Catatan / Data Akun / Domain
                <span className="text-slate-500 font-normal ml-1">
                  (Khusus Canva isi email, domain isi nama domain)
                </span>
              </label>
              <textarea
                rows={2}
                placeholder="Email Canva / Nama Domain / Request khusus..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
              />
            </div>

            {/* Payment Selector */}
            <div>
              <label className="block text-slate-300 font-bold mb-1.5 uppercase tracking-wider text-[11px]">
                Pilih Pembayaran:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('qris')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'qris'
                      ? 'bg-cyan-500/15 border-cyan-400 text-white font-bold ring-1 ring-cyan-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                  <div className="font-bold text-white text-[11px]">QRIS Instant</div>
                  <div className="text-[10px] text-emerald-400">All E-Wallet</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('dana')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'dana'
                      ? 'bg-blue-500/15 border-blue-400 text-white font-bold ring-1 ring-blue-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-blue-400 text-xs mb-0.5">DANA</div>
                  <div className="text-slate-400 text-[10px]">Transfer</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('gopay')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'gopay'
                      ? 'bg-emerald-500/15 border-emerald-400 text-white font-bold ring-1 ring-emerald-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-emerald-400 text-xs mb-0.5">GoPay</div>
                  <div className="text-slate-400 text-[10px]">Transfer</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bca')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    paymentMethod === 'bca'
                      ? 'bg-purple-500/15 border-purple-400 text-white font-bold ring-1 ring-purple-400'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-purple-400 text-xs mb-0.5">Bank BCA</div>
                  <div className="text-slate-400 text-[10px]">Transfer</div>
                </button>
              </div>

              {/* Payment Details Preview */}
              <div className="mt-2.5 p-3 rounded-2xl bg-slate-950 border border-slate-850">
                {paymentMethod === 'qris' && (
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-24 h-24 bg-white p-1 rounded-xl shadow shrink-0 flex items-center justify-center">
                      <img
                        src={settings.qrisImageUrl}
                        alt="QRIS Zynex"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-xs text-slate-300 space-y-0.5 text-center sm:text-left">
                      <div className="font-bold text-white flex items-center justify-center sm:justify-start gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Scan QRIS (BCA, DANA, GoPay, OVO)</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Scan QR di atas dengan nominal yang tertera.
                      </p>
                      <div className="text-cyan-400 font-bold font-mono">
                        Total: {formatIDR(currentPrice)}
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'dana' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">Nomor DANA:</div>
                      <div className="text-xs font-mono font-bold text-white">{settings.danaNumber}</div>
                      <div className="text-[10px] text-slate-400">a/n {settings.danaName}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.danaNumber, 'DANA')}
                      className="px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-cyan-400 text-xs font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedText === 'DANA' ? 'Disalin!' : 'Salin'}</span>
                    </button>
                  </div>
                )}

                {paymentMethod === 'gopay' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">Nomor GoPay:</div>
                      <div className="text-xs font-mono font-bold text-white">{settings.gopayNumber}</div>
                      <div className="text-[10px] text-slate-400">a/n {settings.gopayName}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.gopayNumber, 'GoPay')}
                      className="px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-cyan-400 text-xs font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copiedText === 'GoPay' ? 'Disalin!' : 'Salin'}</span>
                    </button>
                  </div>
                )}

                {paymentMethod === 'bca' && (
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">Nomor Rekening BCA:</div>
                      <div className="text-xs font-mono font-bold text-white">{settings.bcaNumber}</div>
                      <div className="text-[10px] text-slate-400">a/n {settings.bcaName}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.bcaNumber, 'BCA')}
                      className="px-2.5 py-1 rounded-lg bg-slate-850 hover:bg-slate-800 text-cyan-400 text-xs font-semibold flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
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
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Kirim Pesanan ke WhatsApp ({formatIDR(currentPrice)})</span>
              </button>
            </div>
          </form>
        ) : (
          /* Order Submitted Confirmation */
          <div className="p-5 sm:p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Pesanan Berhasil Dicatat!</h3>
              <p className="text-xs text-slate-400 mt-1">
                Silakan lakukan pembayaran lalu kirim bukti transfer ke WhatsApp admin kami.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-1.5 max-w-sm mx-auto">
              <div className="flex justify-between pb-1.5 border-b border-slate-850">
                <span className="text-slate-400">Invoice:</span>
                <span className="font-mono font-bold text-cyan-400">{submittedOrder.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Produk:</span>
                <span className="font-semibold text-white">{submittedOrder.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total:</span>
                <span className="font-bold text-emerald-400">{formatIDR(submittedOrder.price)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Metode:</span>
                <span className="font-semibold text-white uppercase">{submittedOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto">
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
                className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Chat Admin WhatsApp</span>
              </a>

              <button
                onClick={closeOrderModal}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs"
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
