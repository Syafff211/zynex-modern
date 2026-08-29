import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Settings,
  Save,
  Check,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  Megaphone
} from 'lucide-react';

export const StoreSettingsManager: React.FC = () => {
  const {
    settings,
    updateSettings,
    resetToDefaultData,
    exportDataJson,
    importDataJson
  } = useStore();

  const [formData, setFormData] = useState({
    storeName: settings.storeName,
    tagline: settings.tagline,
    whatsappNumber: settings.whatsappNumber,
    telegramUsername: settings.telegramUsername,
    discordUrl: settings.discordUrl,
    pterodactylLoginUrl: settings.pterodactylLoginUrl,
    announcement: settings.announcement,
    showAnnouncement: settings.showAnnouncement
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [importMsg, setImportMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zynex-studio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonText.trim()) return;
    const success = importDataJson(importJsonText);
    if (success) {
      setImportMsg({ type: 'success', text: 'Data database berhasil di-import!' });
      setTimeout(() => {
        setImportModalOpen(false);
        setImportMsg(null);
        setImportJsonText('');
      }, 1500);
    } else {
      setImportMsg({ type: 'error', text: 'Format JSON tidak valid atau rusak.' });
    }
  };

  const handleReset = () => {
    resetToDefaultData();
    setResetConfirmOpen(false);
    // Reload formData with reset settings
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Pengaturan Toko & Database
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Atur branding Zynex Studio, kontak WhatsApp tujuan pemesanan, running text banner, serta backup & restore database.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-400 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Pengaturan toko berhasil diperbarui!</span>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Informasi & Kontak Toko</h3>
              <p className="text-[11px] text-slate-400">Nama toko dan nomor WhatsApp penerima pesanan</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Nama Toko / Brand</label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Nomor WhatsApp Admin (Tujuan Checkout)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="62895325852509"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Format: Gunakan awalan 62 atau 08 (contoh: 62895325852509).
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-slate-300 font-semibold mb-1">Tagline Toko</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Telegram Support Username</label>
              <input
                type="text"
                value={formData.telegramUsername}
                onChange={(e) => setFormData({ ...formData, telegramUsername: e.target.value })}
                placeholder="username_tanpa_at"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">URL Panel Pterodactyl</label>
              <input
                type="url"
                value={formData.pterodactylLoginUrl}
                onChange={(e) => setFormData({ ...formData, pterodactylLoginUrl: e.target.value })}
                placeholder="https://panel.domainanda.com"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Announcement Marquee Banner */}
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Megaphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">Banner Pengumuman & Promo (Running Text)</h3>
                <p className="text-[11px] text-slate-400">Teks berjalan di bagian atas landing page</p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.showAnnouncement}
                onChange={(e) => setFormData({ ...formData, showAnnouncement: e.target.checked })}
                className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-white/20 focus:ring-cyan-500"
              />
              <span className="text-xs font-semibold text-slate-300">Tampilkan Banner</span>
            </label>
          </div>

          <div>
            <label className="block text-xs text-slate-300 font-semibold mb-1">Teks Pengumuman Promo</label>
            <input
              type="text"
              value={formData.announcement}
              onChange={(e) => setFormData({ ...formData, announcement: e.target.value })}
              placeholder="FLASH SALE: Canva Pro 5K, Nokos Indo 5K, Panel Node.js 5K..."
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all hover:opacity-90"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Semua Pengaturan</span>
          </button>
        </div>
      </form>

      {/* Database Backup, Export & Reset Section */}
      <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="pb-3 border-b border-slate-800">
          <h3 className="font-bold text-white text-sm">Manajemen Database & Backup</h3>
          <p className="text-[11px] text-slate-400">
            Export seluruh data produk & pesanan ke file JSON, atau reset kembali ke data awal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={handleExport}
            className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-cyan-500/30 text-left transition-all group flex flex-col justify-between"
          >
            <Download className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="font-bold text-white text-xs">Export Backup (JSON)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Download salinan database lokal</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setImportModalOpen(true)}
            className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-purple-500/30 text-left transition-all group flex flex-col justify-between"
          >
            <Upload className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
            <div>
              <div className="font-bold text-white text-xs">Import Database (JSON)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Pulihkan database dari file JSON</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setResetConfirmOpen(true)}
            className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-red-500/30 text-left transition-all group flex flex-col justify-between"
          >
            <RefreshCw className="w-5 h-5 text-red-400 mb-2 group-hover:rotate-180 transition-transform" />
            <div>
              <div className="font-bold text-white text-xs text-red-400">Reset ke Awal (Default)</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Kembalikan katalog awal serba 5K</div>
            </div>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-red-500/30 p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h4 className="font-bold text-white text-base">Reset Database?</h4>
            </div>
            <p className="text-xs text-slate-300">
              Semua produk dan pesanan kustom akan direset ke konfigurasi awal (Canva 5k, Nokos Indo 5k, Panel Node.js 5k, dll).
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
              >
                Ya, Reset Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import JSON Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-slate-900 border border-purple-500/30 p-6 shadow-2xl space-y-4">
            <h4 className="font-bold text-white text-base">Import Database JSON</h4>
            <p className="text-xs text-slate-400">
              Tempelkan konten teks JSON hasil export database ke kotak di bawah ini:
            </p>

            {importMsg && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  importMsg.type === 'success'
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'bg-red-500/15 text-red-400 border border-red-500/30'
                }`}
              >
                <span>{importMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleImport} className="space-y-4">
              <textarea
                rows={7}
                required
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{"products": [...], "settings": {...}}'
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-purple-500 resize-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setImportModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md"
                >
                  Import Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
