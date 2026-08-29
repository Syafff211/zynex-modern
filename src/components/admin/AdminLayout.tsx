import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminOverview } from './AdminOverview';
import { ProductManager } from './ProductManager';
import { PterodactylManager } from './PterodactylManager';
import { OrderManager } from './OrderManager';
import { PaymentSettings } from './PaymentSettings';
import { StoreSettingsManager } from './StoreSettingsManager';
import {
  LayoutDashboard,
  Package,
  Bot,
  ShoppingBag,
  CreditCard,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Server
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { logoutAdmin, setCurrentView, settings, orders } = useStore();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const pendingCount = orders.filter((o) => o.status === 'pending').length;

  const navTabs = [
    { id: 'overview', name: 'Dashboard Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'products', name: 'Kelola Produk', icon: <Package className="w-4 h-4" /> },
    { id: 'pterodactyl', name: 'Tier Bot WA (Node.js)', icon: <Bot className="w-4 h-4" /> },
    {
      id: 'orders',
      name: 'Daftar Pesanan',
      icon: <ShoppingBag className="w-4 h-4" />,
      badge: pendingCount > 0 ? pendingCount : undefined
    },
    { id: 'payment', name: 'Metode Pembayaran', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'settings', name: 'Pengaturan & Backup', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileSidebarOpen(false);
  };

  const handleGoToStore = () => {
    setCurrentView('store');
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-950/90 border-b border-cyan-500/20 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold text-xs">
            <Server className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-sm text-white">Admin Panel</span>
            <span className="text-[10px] text-cyan-400 block -mt-0.5">{settings.storeName}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleGoToStore}
            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1"
          >
            <span>Toko</span>
            <ExternalLink className="w-3 h-3" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-slate-800 text-slate-300"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-950/95 border-r border-cyan-500/20 backdrop-blur-2xl flex flex-col justify-between p-4 transition-transform duration-200 md:static md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Server className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <div>
                <h1 className="font-black text-sm text-white">{settings.storeName}</h1>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Admin Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            {navTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-500/10 font-bold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400'}>
                      {tab.icon}
                    </span>
                    <span>{tab.name}</span>
                  </div>

                  {tab.badge !== undefined && (
                    <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <button
            onClick={handleGoToStore}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Lihat Storefront</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-500/20 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && <AdminOverview onNavigateTab={setActiveTab} />}
          {activeTab === 'products' && <ProductManager />}
          {activeTab === 'pterodactyl' && <PterodactylManager />}
          {activeTab === 'orders' && <OrderManager />}
          {activeTab === 'payment' && <PaymentSettings />}
          {activeTab === 'settings' && <StoreSettingsManager />}
        </div>
      </main>
    </div>
  );
};
