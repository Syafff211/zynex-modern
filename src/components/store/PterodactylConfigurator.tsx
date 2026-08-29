import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { formatIDR } from '../../utils/helpers';
import {
  Bot,
  Cpu,
  HardDrive,
  ShieldAlert,
  Crown,
  Check,
  Zap,
  ArrowRight
} from 'lucide-react';

interface Tier {
  id: string;
  ram: string;
  ramGb: number;
  cpu: string;
  disk: string;
  price: number;
  originalPrice: number;
  badge?: string;
  isPopular?: boolean;
}

export const PterodactylConfigurator: React.FC = () => {
  const { openOrderModal, products } = useStore();
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  const tiers: Tier[] = [
    {
      id: 'bot-1gb',
      ram: '1 GB RAM',
      ramGb: 1,
      cpu: '70% CPU',
      disk: '2 GB NVMe SSD',
      price: 5000,
      originalPrice: 15000,
      badge: 'STARTER (5K)'
    },
    {
      id: 'bot-2gb',
      ram: '2 GB RAM',
      ramGb: 2,
      cpu: '80% CPU',
      disk: '4 GB NVMe SSD',
      price: 7000,
      originalPrice: 20000,
    },
    {
      id: 'bot-3gb',
      ram: '3 GB RAM',
      ramGb: 3,
      cpu: '80% CPU',
      disk: '6 GB NVMe SSD',
      price: 9000,
      originalPrice: 25000,
    },
    {
      id: 'bot-4gb',
      ram: '4 GB RAM',
      ramGb: 4,
      cpu: '80% CPU',
      disk: '8 GB NVMe SSD',
      price: 11000,
      originalPrice: 30000,
    },
    {
      id: 'bot-5gb',
      ram: '5 GB RAM',
      ramGb: 5,
      cpu: '80% CPU',
      disk: '10 GB NVMe SSD',
      price: 13000,
      originalPrice: 35000,
      badge: 'BEST FOR BUSY BOT'
    },
    {
      id: 'bot-unlimited',
      ram: 'Unlimited RAM',
      ramGb: 99,
      cpu: '80% CPU (High Core)',
      disk: 'Unlimited NVMe SSD',
      price: 15000,
      originalPrice: 50000,
      badge: 'UNLIMITED (15K) 🚀',
      isPopular: true
    }
  ];

  const currentTier = tiers[selectedTierIndex];
  const pteroBaseProduct = products.find((p) => p.id === 'panel-pterodactyl-bot') || products[0];
  const adminProduct = products.find((p) => p.id === 'admin-panel-ptero');
  const partnerProduct = products.find((p) => p.id === 'partner-panel-ptero');

  const handleOrderCurrentTier = () => {
    openOrderModal(
      {
        ...pteroBaseProduct,
        price: currentTier.price
      },
      {
        name: `Paket ${currentTier.ram} (${currentTier.cpu})`,
        specs: `${currentTier.ram} • ${currentTier.cpu} • ${currentTier.disk}`,
        price: currentTier.price
      }
    );
  };

  return (
    <section id="panel-bot" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            Egg Node.js WhatsApp Bot Specialist
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Panel Pterodactyl <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">Run Bot WhatsApp</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Pilih kapasitas RAM & CPU sesuai kebutuhan bot Anda. Mulai dari <span className="text-cyan-400 font-bold">1GB (70% CPU) seharga Rp 5.000</span> hingga <span className="text-purple-400 font-bold">Unlimited Rp 15.000</span>.
          </p>
        </div>

        {/* Main Configurator Container */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Selector */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-2xl shadow-xl shadow-black/40">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Cpu className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Pilih Alokasi RAM & CPU</h3>
                    <p className="text-xs text-slate-400">Pilih tier kelipatan 1GB - 5GB atau Unlimited</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready Stock 🟢
                </span>
              </div>

              {/* Tier Quick Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-6">
                {tiers.map((tier, idx) => {
                  const isSelected = idx === selectedTierIndex;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTierIndex(idx)}
                      className={`relative p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/50'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-600 hover:bg-slate-800/40'
                      }`}
                    >
                      {tier.badge && (
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full mb-1.5 inline-block w-fit ${
                          isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-cyan-300 border border-cyan-500/20'
                        }`}>
                          {tier.badge}
                        </span>
                      )}
                      <div>
                        <div className="font-extrabold text-sm text-white">{tier.ram}</div>
                        <div className="text-[11px] text-slate-400">{tier.cpu}</div>
                      </div>
                      <div className="mt-2 font-black text-xs text-cyan-400">
                        {formatIDR(tier.price)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Range Slider for fun interactive feel */}
              <div className="mt-8">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span>Slider Kapasitas:</span>
                  <span className="text-cyan-400 font-bold">{currentTier.ram} ({currentTier.cpu})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={tiers.length - 1}
                  step="1"
                  value={selectedTierIndex}
                  onChange={(e) => setSelectedTierIndex(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>1 GB (5K)</span>
                  <span>2 GB</span>
                  <span>3 GB</span>
                  <span>4 GB</span>
                  <span>5 GB</span>
                  <span>Unlimited (15K)</span>
                </div>
              </div>
            </div>

            {/* Inclusions summary */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Fitur & Spesifikasi Yang Didapat:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Egg Node.js v18 / v20 / v22 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Anti-Crash Auto-Restart Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Akses SFTP & Web File Manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Server Singapore Low Latency Ping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Tier Preview & Checkout CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-cyan-950/30 border border-cyan-400/30 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
                  Ringkasan Paket Terpilih
                </span>
                <span className="text-xs text-slate-400">Durasi: 1 Bulan</span>
              </div>

              <div className="mt-5">
                <h3 className="text-2xl font-black text-white">
                  Paket {currentTier.ram}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Ideal untuk Bot WhatsApp Baileys, Whisper, Store Bot, & Automation.
                </p>
              </div>

              {/* Spec Badges */}
              <div className="grid grid-cols-3 gap-2 mt-5">
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 text-center">
                  <Cpu className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">CPU Limit</div>
                  <div className="text-xs font-bold text-white">{currentTier.cpu}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 text-center">
                  <Zap className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">RAM Memory</div>
                  <div className="text-xs font-bold text-white">{currentTier.ram}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/70 border border-white/5 text-center">
                  <HardDrive className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">Disk NVMe</div>
                  <div className="text-xs font-bold text-white">{currentTier.disk.split(' ')[0]} {currentTier.disk.split(' ')[1]}</div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="mt-6 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 line-through">
                    {formatIDR(currentTier.originalPrice)}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">
                    {formatIDR(currentTier.price)}
                    <span className="text-xs font-normal text-slate-300"> / bulan</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    HEMAT {(100 - Math.round((currentTier.price / currentTier.originalPrice) * 100))}%
                  </span>
                </div>
              </div>
            </div>

            {/* Order CTA */}
            <div className="mt-6">
              <button
                onClick={handleOrderCurrentTier}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-slate-950" />
                <span>Pesan Paket {currentTier.ram} ({formatIDR(currentTier.price)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                ⚡ Garansi 30 Hari Penuh • Aktivasi Otomatis via WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Level Up: Admin & Partner Panels */}
        <div className="mt-10">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Butuh Akses Lebih Tinggi? Buka Jasa Bot / Jual Ulang Server
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admin Panel Card (10k) */}
            {adminProduct && (
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-amber-500/30 backdrop-blur-2xl flex flex-col justify-between hover:border-amber-400 transition-all hover:shadow-xl hover:shadow-amber-500/10">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-white">Admin Panel Pterodactyl</h4>
                        <span className="text-xs text-amber-400 font-medium">Akses Administrator</span>
                      </div>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      10K / BULAN
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                    Miliki hak akses level Admin pada panel Pterodactyl. Anda bebas membuat server baru, menambah user, serta mengatur alokasi bot pelanggan.
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Bebas Create & Manage User Bot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Access Node & Custom Port</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>High Performance Singapore Server</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through">Rp 35.000</span>
                    <div className="text-xl font-black text-amber-400">Rp 10.000</div>
                  </div>
                  <button
                    onClick={() => openOrderModal(adminProduct)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5"
                  >
                    <span>Order Admin (10K)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Partner Panel Card (15k) */}
            {partnerProduct && (
              <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/30 backdrop-blur-2xl flex flex-col justify-between hover:border-purple-400 transition-all hover:shadow-xl hover:shadow-purple-500/10">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-white">Partner Panel Pterodactyl</h4>
                        <span className="text-xs text-purple-400 font-medium">Reseller & Kemitraan VIP</span>
                      </div>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      15K / BULAN
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                    Paket kemitraan tertinggi dengan resource unlimited untuk jualan bot atau panel ke customer Anda. Cocok untuk mulai bisnis hosting!
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Unlimited Create Server & Sub-Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Dedicated Resource Anti-Lag</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Prioritas Support Khusus Partner VIP</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 line-through">Rp 50.000</span>
                    <div className="text-xl font-black text-purple-400">Rp 15.000</div>
                  </div>
                  <button
                    onClick={() => openOrderModal(partnerProduct)}
                    className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all flex items-center gap-1.5"
                  >
                    <span>Order Partner (15K)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
