import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import { formatIDR, getCleanWhatsappNumber } from '../../utils/helpers';
import {
  Search,
  MessageCircle,
  Trash2,
  Eye,
  Plus,
  X
} from 'lucide-react';

export const OrderManager: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, createOrder, products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual order form
  const [manualForm, setManualForm] = useState({
    customerName: '',
    customerWhatsapp: '',
    productId: products[0]?.id || '',
    price: 5000,
    paymentMethod: 'qris' as 'qris' | 'dana' | 'gopay' | 'shopeepay' | 'bca',
    notes: ''
  });

  const filteredOrders = orders.filter((o) => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    const matchQuery =
      o.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerWhatsapp.includes(searchQuery) ||
      o.productName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === manualForm.productId) || products[0];
    createOrder({
      customerName: manualForm.customerName,
      customerWhatsapp: manualForm.customerWhatsapp,
      productId: prod?.id || 'manual',
      productName: prod?.name || 'Pesanan Manual',
      price: Number(manualForm.price),
      paymentMethod: manualForm.paymentMethod,
      notes: manualForm.notes || undefined
    });
    setIsManualModalOpen(false);
  };

  const getWhatsappChatLink = (order: Order) => {
    const cleanPhone = getCleanWhatsappNumber(order.customerWhatsapp);
    const msg = `Halo kak ${order.customerName}, kami dari Admin Zynex Studio terkait pesanan *${order.invoiceNumber}* (${order.productName}).`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Daftar Pesanan Masuk
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pantau transaksi customer, verifikasi bukti transfer, dan ubah status pesanan secara real-time.
          </p>
        </div>

        <button
          onClick={() => setIsManualModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Order Manual</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'all'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Semua ({orders.length})
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'pending'
                ? 'bg-amber-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Pending ({orders.filter((o) => o.status === 'pending').length})
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'completed'
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Selesai ({orders.filter((o) => o.status === 'completed').length})
          </button>
          <button
            onClick={() => setStatusFilter('cancelled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              statusFilter === 'cancelled'
                ? 'bg-red-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Batal ({orders.filter((o) => o.status === 'cancelled').length})
          </button>
        </div>

        <div className="relative md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari invoice / nama / WA..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3.5">Invoice & Waktu</th>
                <th className="px-4 py-3.5">Pelanggan</th>
                <th className="px-4 py-3.5">Produk & Varian</th>
                <th className="px-4 py-3.5">Harga & Bayar</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-mono font-bold text-cyan-400">{order.invoiceNumber}</div>
                      <div className="text-[10px] text-slate-500">{order.createdAt}</div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-bold text-white">{order.customerName}</div>
                      <a
                        href={getWhatsappChatLink(order)}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>{order.customerWhatsapp}</span>
                      </a>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-200">{order.productName}</div>
                      {order.variantName && (
                        <div className="text-[11px] text-slate-400">{order.variantName}</div>
                      )}
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="font-mono font-bold text-white">{formatIDR(order.price)}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">
                        {order.paymentMethod}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          order.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : order.status === 'cancelled'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        <option value="pending" className="bg-slate-900 text-amber-300">Pending</option>
                        <option value="completed" className="bg-slate-900 text-emerald-400">Selesai</option>
                        <option value="cancelled" className="bg-slate-900 text-red-400">Batal</option>
                      </select>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 transition-colors"
                          title="Lihat Detail Pesanan"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 transition-colors"
                          title="Hapus Pesanan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500">
                    Tidak ada data pesanan yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail View Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-cyan-400">DETAIL TRANSAKSI</span>
                <h4 className="font-mono font-bold text-white text-base">{selectedOrder.invoiceNumber}</h4>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Nama Pelanggan:</span>
                <span className="font-bold text-white">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">WhatsApp:</span>
                <span className="font-mono text-cyan-400">{selectedOrder.customerWhatsapp}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Produk:</span>
                <span className="font-semibold text-white">{selectedOrder.productName}</span>
              </div>
              {selectedOrder.specs && (
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Spesifikasi:</span>
                  <span className="text-slate-300">{selectedOrder.specs}</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Total Harga:</span>
                <span className="font-bold text-emerald-400 font-mono">{formatIDR(selectedOrder.price)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Metode Pembayaran:</span>
                <span className="font-bold text-white uppercase">{selectedOrder.paymentMethod}</span>
              </div>
              {selectedOrder.notes && (
                <div className="py-1">
                  <span className="text-slate-400 block mb-1">Catatan Customer:</span>
                  <div className="p-2.5 rounded-xl bg-slate-950 text-slate-200 border border-white/5">
                    {selectedOrder.notes}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 flex gap-2">
              <a
                href={getWhatsappChatLink(selectedOrder)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Customer via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Manual Order Creation Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-cyan-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-white text-base">Tambah Pesanan Manual</h4>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Customer</label>
                <input
                  type="text"
                  required
                  placeholder="Nama pembeli"
                  value={manualForm.customerName}
                  onChange={(e) => setManualForm({ ...manualForm, customerName: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={manualForm.customerWhatsapp}
                  onChange={(e) => setManualForm({ ...manualForm, customerWhatsapp: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Pilih Produk</label>
                <select
                  value={manualForm.productId}
                  onChange={(e) => {
                    const found = products.find((p) => p.id === e.target.value);
                    setManualForm({
                      ...manualForm,
                      productId: e.target.value,
                      price: found ? found.price : manualForm.price
                    });
                  }}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({formatIDR(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Harga (IDR)</label>
                  <input
                    type="number"
                    required
                    value={manualForm.price}
                    onChange={(e) => setManualForm({ ...manualForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Metode Bayar</label>
                  <select
                    value={manualForm.paymentMethod}
                    onChange={(e) => setManualForm({ ...manualForm, paymentMethod: e.target.value as any })}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 uppercase"
                  >
                    <option value="qris">QRIS</option>
                    <option value="dana">DANA</option>
                    <option value="gopay">GoPay</option>
                    <option value="bca">BCA</option>
                    <option value="shopeepay">ShopeePay</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Catatan</label>
                <input
                  type="text"
                  placeholder="Catatan pesanan"
                  value={manualForm.notes}
                  onChange={(e) => setManualForm({ ...manualForm, notes: e.target.value })}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold shadow-md"
                >
                  Simpan Pesanan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
