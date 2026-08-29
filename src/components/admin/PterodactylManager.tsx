import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductVariant } from '../../types';
import { formatIDR } from '../../utils/helpers';
import {
  Bot,
  Plus,
  Edit2,
  Trash2,
  Check
} from 'lucide-react';

export const PterodactylManager: React.FC = () => {
  const { products, updateProduct } = useStore();

  const botProduct = products.find((p) => p.id === 'panel-pterodactyl-bot');
  const adminProduct = products.find((p) => p.id === 'admin-panel-ptero');
  const partnerProduct = products.find((p) => p.id === 'partner-panel-ptero');

  const [variants, setVariants] = useState<ProductVariant[]>(() => {
    return botProduct?.variants || [];
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    ram: '',
    cpu: '',
    specs: '',
    price: 5000,
    badge: ''
  });

  const handleOpenAdd = () => {
    setEditingVariant(null);
    setForm({
      name: 'Paket 6 GB',
      ram: '6 GB',
      cpu: '80% CPU',
      specs: '6 GB RAM • 80% CPU • 12 GB NVMe Disk',
      price: 15000,
      badge: 'NEW'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (v: ProductVariant) => {
    setEditingVariant(v);
    setForm({
      name: v.name,
      ram: v.ram || '',
      cpu: v.cpu || '',
      specs: v.specs,
      price: v.price,
      badge: v.badge || ''
    });
    setIsModalOpen(true);
  };

  const handleSaveVariant = (e: React.FormEvent) => {
    e.preventDefault();
    let updatedList: ProductVariant[];

    if (editingVariant) {
      updatedList = variants.map((v) =>
        v.id === editingVariant.id
          ? {
              ...v,
              name: form.name,
              ram: form.ram,
              cpu: form.cpu,
              specs: form.specs,
              price: Number(form.price),
              badge: form.badge || undefined
            }
          : v
      );
    } else {
      const newVar: ProductVariant = {
        id: 'tier-' + Date.now(),
        name: form.name,
        ram: form.ram,
        cpu: form.cpu,
        specs: form.specs,
        price: Number(form.price),
        badge: form.badge || undefined
      };
      updatedList = [...variants, newVar];
    }

    setVariants(updatedList);
    if (botProduct) {
      updateProduct(botProduct.id, { variants: updatedList });
    }
    setIsModalOpen(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleDeleteVariant = (id: string) => {
    const updatedList = variants.filter((v) => v.id !== id);
    setVariants(updatedList);
    if (botProduct) {
      updateProduct(botProduct.id, { variants: updatedList });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Konfigurator Tier Panel Bot WhatsApp & Pterodactyl
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Atur tier RAM 1GB (70% CPU = 5K) sampai Unlimited (80% CPU = 15K) dan harga kelipatannya.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tier RAM Baru</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Tier Panel Bot berhasil diperbarui!</span>
        </div>
      )}

      {/* Bot WA Tiers Table */}
      <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
          <Bot className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-white text-sm">Daftar Paket RAM/CPU Bot WhatsApp (Egg Node.js)</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {variants.map((v) => (
            <div
              key={v.id}
              className="p-4 rounded-2xl bg-slate-950 border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{v.name}</span>
                  {v.badge && (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {v.badge}
                    </span>
                  )}
                </div>

                <div className="mt-2 text-xs text-slate-400">
                  {v.specs}
                </div>

                <div className="mt-3 font-mono font-black text-cyan-400 text-base">
                  {formatIDR(v.price)} <span className="text-xs font-normal text-slate-500">/ bulan</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-end gap-1.5">
                <button
                  onClick={() => handleOpenEdit(v)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteVariant(v.id)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Admin & Partner Quick Review */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adminProduct && (
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-amber-500/20 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-amber-400 text-sm">Admin Panel Pterodactyl</span>
              <span className="font-mono font-black text-white">{formatIDR(adminProduct.price)}</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">{adminProduct.shortDesc}</p>
          </div>
        )}

        {partnerProduct && (
          <div className="p-5 rounded-3xl bg-slate-900/70 border border-purple-500/20 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-purple-400 text-sm">Partner Panel Pterodactyl</span>
              <span className="font-mono font-black text-white">{formatIDR(partnerProduct.price)}</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">{partnerProduct.shortDesc}</p>
          </div>
        )}
      </div>

      {/* Add / Edit Tier Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 shadow-2xl space-y-4">
            <h4 className="font-bold text-white text-base">
              {editingVariant ? 'Edit Tier Panel' : 'Tambah Tier Panel Baru'}
            </h4>

            <form onSubmit={handleSaveVariant} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Paket</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Contoh: Paket 3 GB"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Alokasi RAM</label>
                  <input
                    type="text"
                    required
                    value={form.ram}
                    onChange={(e) => setForm({ ...form, ram: e.target.value })}
                    placeholder="Contoh: 3 GB"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Alokasi CPU</label>
                  <input
                    type="text"
                    required
                    value={form.cpu}
                    onChange={(e) => setForm({ ...form, cpu: e.target.value })}
                    placeholder="Contoh: 80% CPU"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Spesifikasi Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.specs}
                  onChange={(e) => setForm({ ...form, specs: e.target.value })}
                  placeholder="Contoh: 3 GB RAM • 80% CPU • 6 GB NVMe Disk"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Harga (IDR)</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Badge (Opsional)</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="Contoh: PRO / BEST VALUE"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold shadow-md"
                >
                  Simpan Tier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
