import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory } from '../../types';
import { formatIDR } from '../../utils/helpers';
import { DynamicIcon } from '../ui/DynamicIcon';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  AlertTriangle,
  RotateCw
} from 'lucide-react';

export const ProductManager: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductStock } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  
  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'panel' as 'panel' | 'premium' | 'nokos' | 'domain' | 'service',
    price: 5000,
    originalPrice: 20000,
    period: '1 Bulan',
    badge: 'PROMO 5K 🔥',
    icon: 'Bot',
    shortDesc: '',
    featuresText: '',
    stock: 'ready' as 'ready' | 'limited' | 'out_of_stock',
    popular: false,
    instructions: ''
  });

  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      category: 'panel',
      price: 5000,
      originalPrice: 15000,
      period: '1 Bulan',
      badge: 'PROMO 5K 🔥',
      icon: 'Bot',
      shortDesc: '',
      featuresText: 'Garansi Full 30 Hari\nSupport Bot Node.js\nUptime 99.9%',
      stock: 'ready',
      popular: false,
      instructions: ''
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || 0,
      period: p.period,
      badge: p.badge || '',
      icon: p.icon || 'Bot',
      shortDesc: p.shortDesc,
      featuresText: p.features.join('\n'),
      stock: p.stock,
      popular: !!p.popular,
      instructions: p.instructions || ''
    });
    setIsEditModalOpen(true);
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const features = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    addProduct({
      name: formData.name,
      slug,
      category: formData.category,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      period: formData.period,
      badge: formData.badge.trim() || undefined,
      icon: formData.icon,
      shortDesc: formData.shortDesc,
      features: features.length > 0 ? features : ['Fitur Standar Zynex Studio'],
      stock: formData.stock,
      popular: formData.popular,
      instructions: formData.instructions || undefined
    });

    setIsAddModalOpen(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const features = formData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    updateProduct(editingProduct.id, {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      period: formData.period,
      badge: formData.badge.trim() || undefined,
      icon: formData.icon,
      shortDesc: formData.shortDesc,
      features: features.length > 0 ? features : editingProduct.features,
      stock: formData.stock,
      popular: formData.popular,
      instructions: formData.instructions || undefined
    });

    setIsEditModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Kelola Produk & Layanan
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tambah, edit harga, ubah stok, dan kelola fitur produk Zynex Studio secara real-time.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Semua ({products.length})
          </button>
          <button
            onClick={() => setSelectedCategory('panel')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'panel'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Panel Pterodactyl
          </button>
          <button
            onClick={() => setSelectedCategory('premium')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'premium'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Canva & Premium
          </button>
          <button
            onClick={() => setSelectedCategory('nokos')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'nokos'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Nokos Indo OTP
          </button>
          <button
            onClick={() => setSelectedCategory('domain')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'domain'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Domain (5K)
          </button>
        </div>

        <div className="relative md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Product List Table / Grid */}
      <div className="rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Produk</th>
                <th className="px-4 py-3.5">Kategori</th>
                <th className="px-4 py-3.5">Harga</th>
                <th className="px-4 py-3.5">Status Stok</th>
                <th className="px-4 py-3.5">Badge</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                        <DynamicIcon name={p.icon} className="w-4 h-4" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="font-bold text-white truncate">{p.name}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">
                          {p.shortDesc}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 capitalize font-medium text-slate-300">
                    {p.category}
                  </td>

                  <td className="px-4 py-3.5">
                    <div className="font-mono font-bold text-cyan-400">{formatIDR(p.price)}</div>
                    <div className="text-[10px] text-slate-500">/{p.period}</div>
                  </td>

                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => toggleProductStock(p.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors flex items-center gap-1 ${
                        p.stock === 'ready'
                          ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                          : p.stock === 'limited'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25'
                          : 'bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25'
                      }`}
                      title="Klik untuk ubah status stok"
                    >
                      <RotateCw className="w-2.5 h-2.5" />
                      <span>
                        {p.stock === 'ready'
                          ? 'Ready'
                          : p.stock === 'limited'
                          ? 'Terbatas'
                          : 'Habis'}
                      </span>
                    </button>
                  </td>

                  <td className="px-4 py-3.5">
                    {p.badge ? (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 border border-cyan-500/20">
                        {p.badge}
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors"
                        title="Edit Produk"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-red-500/30 p-5 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h4 className="font-bold text-white text-base">Hapus Produk Ini?</h4>
            </div>
            <p className="text-xs text-slate-300">
              Produk yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapusnya dari katalog?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md shadow-red-600/30"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl p-6 my-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-lg font-black text-white">
                {isAddModalOpen ? 'Tambah Produk Baru' : 'Edit Produk'}
              </h3>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={isAddModalOpen ? handleSaveAdd : handleSaveEdit}
              className="mt-4 space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Canva Pro 1 Bulan / Panel Bot Node.js"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="panel">Hosting & Panel Pterodactyl</option>
                    <option value="premium">Akun Premium (Canva, etc.)</option>
                    <option value="nokos">Nokos Indo OTP</option>
                    <option value="domain">Domain Murah</option>
                    <option value="service">Layanan Digital Lainnya</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Icon Lucide</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Bot">Bot (Bot WhatsApp/Robot)</option>
                    <option value="Palette">Palette (Canva/Desain)</option>
                    <option value="Smartphone">Smartphone (Nokos/OTP)</option>
                    <option value="Globe">Globe (Domain)</option>
                    <option value="ShieldAlert">ShieldAlert (Admin Panel)</option>
                    <option value="Crown">Crown (Partner/VIP)</option>
                    <option value="Server">Server (Cloud)</option>
                    <option value="Zap">Zap (Fast/Instant)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Harga (IDR)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Harga Coret (Opsional)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Durasi / Periode</label>
                  <input
                    type="text"
                    required
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="1 Bulan / 1 Tahun / 1x OTP"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Badge Text (Opsional)</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="POPULAR 🔥 / PROMO 5K"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status Stok</label>
                  <select
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value as any })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ready">Ready Stock (Tersedia)</option>
                    <option value="limited">Stok Terbatas</option>
                    <option value="out_of_stock">Stok Habis</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Deskripsi Singkat</label>
                <input
                  type="text"
                  required
                  value={formData.shortDesc}
                  onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                  placeholder="Ringkasan singkat produk..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Fitur Unggulan (1 baris per fitur)
                </label>
                <textarea
                  rows={4}
                  value={formData.featuresText}
                  onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                  placeholder="Full Garansi 30 Hari&#10;Aktif Instan&#10;Support Node.js"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-cyan-500 resize-none font-mono text-[11px]"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                >
                  {isAddModalOpen ? 'Simpan Produk' : 'Perbarui Produk'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
