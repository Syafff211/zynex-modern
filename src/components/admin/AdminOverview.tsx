import React from 'react';
import { useStore } from '../../context/StoreContext';
import { formatIDR } from '../../utils/helpers';
import {
  ShoppingBag,
  Clock,
  DollarSign,
  Package,
  ArrowRight
} from 'lucide-react';

export const AdminOverview: React.FC<{ onNavigateTab: (tab: string) => void }> = ({ onNavigateTab }) => {
  const { products, orders, settings } = useStore();

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.price, 0);

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const completedOrders = orders.filter((o) => o.status === 'completed');

  const stats = [
    {
      title: 'Total Pendapatan (Sukses)',
      value: formatIDR(totalRevenue),
      desc: `${completedOrders.length} pesanan berhasil`,
      icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/30 bg-emerald-500/10'
    },
    {
      title: 'Total Pesanan Masuk',
      value: orders.length.toString(),
      desc: `${pendingOrders.length} pesanan butuh verifikasi`,
      icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />,
      color: 'border-cyan-500/30 bg-cyan-500/10'
    },
    {
      title: 'Pesanan Pending',
      value: pendingOrders.length.toString(),
      desc: 'Perlu konfirmasi WhatsApp',
      icon: <Clock className="w-5 h-5 text-amber-400" />,
      color: 'border-amber-500/30 bg-amber-500/10'
    },
    {
      title: 'Total Produk Aktif',
      value: products.length.toString(),
      desc: `${products.filter((p) => p.stock === 'ready').length} Ready Stock`,
      icon: <Package className="w-5 h-5 text-purple-400" />,
      color: 'border-purple-500/30 bg-purple-500/10'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Greeting */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/60 border border-cyan-500/20 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            Admin Workspace
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
            Selamat Datang di Admin Panel {settings.storeName}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola produk Canva Pro 5K, Nokos Indo, Panel Pterodactyl Node.js, Domain, dan pesanan customer secara realtime.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('products')}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Package className="w-4 h-4" />
          <span>+ Tambah Produk Baru</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900/70 border border-white/5 backdrop-blur-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{stat.title}</span>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[11px] text-slate-400 mt-1">{stat.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Recent Orders & Quick Product Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <h3 className="text-base font-bold text-white">Pesanan Masuk Terbaru</h3>
              </div>
              <button
                onClick={() => onNavigateTab('orders')}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <span>Lihat Semua ({orders.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {orders.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-cyan-400">{order.invoiceNumber}</span>
                      <span className="text-slate-300 font-semibold">{order.customerName}</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {order.productName} {order.variantName ? `• ${order.variantName}` : ''}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-white">{formatIDR(order.price)}</div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                        order.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : order.status === 'cancelled'
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {order.status === 'completed'
                        ? 'Selesai'
                        : order.status === 'cancelled'
                        ? 'Batal'
                        : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Inventory Stock Overview (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">Status Katalog Produk</h3>
              </div>
              <button
                onClick={() => onNavigateTab('products')}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
              >
                <span>Kelola</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {products.slice(0, 6).map((prod) => (
                <div
                  key={prod.id}
                  className="p-3 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between text-xs"
                >
                  <div className="overflow-hidden pr-2">
                    <div className="font-bold text-white truncate">{prod.name}</div>
                    <div className="text-[11px] text-cyan-400 font-mono font-semibold">
                      {formatIDR(prod.price)} / {prod.period}
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      prod.stock === 'ready'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                        : prod.stock === 'limited'
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                        : 'bg-red-500/15 text-red-400 border border-red-500/20'
                    }`}
                  >
                    {prod.stock === 'ready'
                      ? 'Ready'
                      : prod.stock === 'limited'
                      ? 'Terbatas'
                      : 'Habis'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
