import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { QrCode, Check, Save, Upload, Info } from 'lucide-react';

export const PaymentSettings: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = useState({
    qrisImageUrl: settings.qrisImageUrl,
    danaNumber: settings.danaNumber,
    danaName: settings.danaName,
    gopayNumber: settings.gopayNumber,
    gopayName: settings.gopayName,
    bcaNumber: settings.bcaNumber,
    bcaName: settings.bcaName
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormData((prev) => ({ ...prev, qrisImageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Pengaturan Metode Pembayaran
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Atur gambar QRIS Anda (DANA Bisnis, BCA, Gopay Merchant, dll), rekening bank, serta e-wallet.
        </p>
      </div>

      {/* Info Card Explaining QRIS Flow */}
      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-300 space-y-1.5">
        <div className="font-bold text-cyan-300 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Informasi Alur Pembayaran QRIS:</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          Uang yang discan oleh customer akan masuk <strong>langsung ke rekening / akun merchant QRIS Anda</strong> sesuai gambar QRIS yang Anda pasang di bawah ini.
        </p>
        <p className="text-slate-400">
          💡 Anda bisa mengupload screenshot QRIS asli milik Anda (DANA Bisnis, QRIS Statis BCA, QRIS All Payment, QRIS Nobu, dll) atau memasukkan URL gambar.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-400 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Pengaturan metode pembayaran berhasil disimpan!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* QRIS Configuration */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Upload / Atur QRIS Anda</h3>
              <p className="text-[11px] text-slate-400">QR Code yang akan ditampilkan saat customer checkout</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  1. Upload File Gambar QRIS Langsung (PNG / JPG)
                </label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4 text-cyan-400" />
                    <span>Pilih Gambar QRIS dari Perangkat</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  2. Atau Masukkan URL / Link Gambar QRIS
                </label>
                <input
                  type="text"
                  value={formData.qrisImageUrl}
                  onChange={(e) => setFormData({ ...formData, qrisImageUrl: e.target.value })}
                  placeholder="https://... / URL link gambar QRIS"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Live QR Preview */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-white/5 text-center flex flex-col items-center">
              <div className="w-32 h-32 bg-white p-1.5 rounded-xl shadow-md flex items-center justify-center overflow-hidden">
                <img
                  src={formData.qrisImageUrl}
                  alt="Live QRIS Preview"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as any).src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ZYNEX-STUDIO';
                  }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-2 font-medium">
                Tampilan QRIS Customer
              </span>
            </div>
          </div>
        </div>

        {/* E-Wallets and Bank Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* DANA Card */}
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>DANA</span>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Nomor Akun DANA</label>
              <input
                type="text"
                value={formData.danaNumber}
                onChange={(e) => setFormData({ ...formData, danaNumber: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Atas Nama (A/N)</label>
              <input
                type="text"
                value={formData.danaName}
                onChange={(e) => setFormData({ ...formData, danaName: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* GoPay Card */}
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>GoPay</span>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Nomor Akun GoPay</label>
              <input
                type="text"
                value={formData.gopayNumber}
                onChange={(e) => setFormData({ ...formData, gopayNumber: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Atas Nama (A/N)</label>
              <input
                type="text"
                value={formData.gopayName}
                onChange={(e) => setFormData({ ...formData, gopayName: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* BCA Card */}
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span>Bank BCA</span>
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Nomor Rekening BCA</label>
              <input
                type="text"
                value={formData.bcaNumber}
                onChange={(e) => setFormData({ ...formData, bcaNumber: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Atas Nama (A/N)</label>
              <input
                type="text"
                value={formData.bcaName}
                onChange={(e) => setFormData({ ...formData, bcaName: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Save */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:opacity-90"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Pembayaran</span>
          </button>
        </div>
      </form>
    </div>
  );
};
