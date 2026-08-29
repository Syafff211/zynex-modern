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
  cpu: string;
  disk: string;
  price: number;
  originalPrice: number;
  badge?: string;
  desc: string;
}

export const PterodactylConfigurator: React.FC = () => {
  const { openOrderModal, products } = useStore();
  const [selectedTierIndex, setSelectedTierIndex] = useState(0);

  const tiers: Tier[] = [
    {
      id: 'bot-1gb',
      ram: '1 GB RAM',
      cpu: '70% CPU',
      disk: '2 GB NVMe',
      price: 5000,
      originalPrice: 15000,
      badge: 'STARTER 5K',
      desc: 'Cocok untuk bot WA Baileys basic, menu sederhana, toko online pemula.'
    },
    {
      id: 'bot-2gb',
      ram: '2 GB RAM',
      cpu: '80% CPU',
      disk: '4 GB NVMe',
      price: 7000,
      originalPrice: 20000,
      desc: 'Cocok untuk bot WA grup, downloader TikTok/IG, auto responder.'
    },
    {
      id: 'bot-3gb',
      ram: '3 GB RAM',
      cpu: '80% CPU',
      disk: '6 GB NVMe',
      price: 9000,
      originalPrice: 25000,
      desc: 'Cocok untuk multi grup, plugin game RPG, database JSON ringan.'
    },
    {
      id: 'bot-4gb',
      ram: '4 GB RAM',
      cpu: '80% CPU',
      disk: '8 GB NVMe',
      price: 11000,
      originalPrice: 30000,
      desc: 'Performa tinggi untuk bot store dengan traffic tinggi & push kontak.'
    },
    {
      id: 'bot-5gb',
      ram: '5 GB RAM',
      cpu: '80% CPU',
      disk: '10 GB NVMe',
      price: 13000,
      originalPrice: 35000,
      badge: 'BEST HEAVY BOT',
      desc: 'Kapasitas maksimal 5GB untuk bot skala besar dengan ribuan user.'
    },
    {
      id: 'bot-unlimited',
      ram: 'Unlimited RAM',
      cpu: '80% Dedicated',
      disk: 'Unlimited NVMe',
      price: 15000,
      originalPrice: 50000,
      badge: 'VIP UNLIMITED (15K)',
      desc: 'Resource tanpa batas untuk bot enterprise & multi-session nonstop.'
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
    <section id="panel-bot" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>Egg Node.js WhatsApp Bot Specialist</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Panel Pterodactyl <span className="text-cyan-400">Run Bot WhatsApp</span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-300">
            Pilih alokasi RAM & CPU sesuai kebutuhan bot Anda. Mulai dari <strong className="text-white">1GB (70% CPU) seharga Rp 5.000</strong> hingga <strong className="text-white">Unlimited Rp 15.000</strong> per bulan.
          </p>
        </div>

        {/* Main Configurator Container */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Interactive Selector */}
          <div className="lg:col-span-7 flex flex-col justify-between p-5 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">Pilih Kapasitas RAM & CPU</h3>
                    <p className="text-[11px] text-slate-400">Tier kelipatan 1GB - 5GB & Unlimited</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready Stock 🟢
                </span>
              </div>

              {/* Tier Quick Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 mt-5">
                {tiers.map((tier, idx) => {
                  const isSelected = idx === selectedTierIndex;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedTierIndex(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-md shadow-cyan-500/10 ring-1 ring-cyan-400/50'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      {tier.badge && (
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded mb-1.5 inline-block w-fit ${
                          isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-850 text-cyan-300'
                        }`}>
                          {tier.badge}
                        </span>
                      )}
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-white">{tier.ram}</div>
                        <div className="text-[11px] text-slate-400">{tier.cpu}</div>
                      </div>
                      <div className="mt-2 font-mono font-bold text-xs text-cyan-400">
                        {formatIDR(tier.price)}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Interactive Range Slider */}
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                  <span>Geser Kapasitas:</span>
                  <span className="text-cyan-400 font-bold">{currentTier.ram} ({currentTier.cpu})</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={tiers.length - 1}
                  step="1"
                  value={selectedTierIndex}
                  onChange={(e) => setSelectedTierIndex(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
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

            {/* Spec inclusions */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Fitur Standard Semua Paket:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Egg Node.js v18 / v20 / v22</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Auto-Restart Bot Anti-Crash</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Direct Web SFTP & File Manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Node NVMe Singapore Low Ping</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Tier Summary & Order Button */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-7 rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase">
                  Ringkasan Paket
                </span>
                <span className="text-xs text-slate-400">Durasi: 1 Bulan</span>
              </div>

              <div className="mt-4">
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Paket {currentTier.ram}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {currentTier.desc}
                </p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 mt-5">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <Cpu className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">CPU Limit</div>
                  <div className="text-xs font-bold text-white">{currentTier.cpu}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <Zap className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">RAM Memory</div>
                  <div className="text-xs font-bold text-white">{currentTier.ram}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <HardDrive className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-[10px] text-slate-400">Disk NVMe</div>
                  <div className="text-xs font-bold text-white">{currentTier.disk.split(' ')[0]} {currentTier.disk.split(' ')[1]}</div>
                </div>
              </div>

              {/* Price Box */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 line-through">
                    {formatIDR(currentTier.originalPrice)}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-400">
                    {formatIDR(currentTier.price)}
                    <span className="text-xs font-normal text-slate-400"> / bulan</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                    HEMAT {(100 - Math.round((currentTier.price / currentTier.originalPrice) * 100))}%
                  </span>
                </div>
              </div>
            </div>

            {/* Order Action Button */}
            <div className="mt-5">
              <button
                onClick={handleOrderCurrentTier}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Bot className="w-4 h-4 text-slate-950" />
                <span>Pesan Paket {currentTier.ram} ({formatIDR(currentTier.price)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Garansi 30 Hari • Login Panel dikirim otomatis via WhatsApp
              </p>
            </div>
          </div>
        </div>

        {/* Higher Tier: Admin & Partner Panels */}
        <div className="mt-10">
          <div className="text-center mb-5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Akses Admin & Partner Reseller Panel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Admin Panel (10k) */}
            {adminProduct && (
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-amber-500/30 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-white">Admin Panel Pterodactyl</h4>
                        <span className="text-xs text-amber-400 font-medium">Akses Level Administrator</span>
                      </div>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-md bg-amber-500/15 text-amber-300">
                      10K / BULAN
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3.5 leading-relaxed">
                    Akses administrator panel Pterodactyl untuk bebas membuat server baru, menambah user bot, dan kelola port server.
                  </p>

                  <div className="mt-3.5 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Bebas Create & Manage User Bot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Akses Node & Custom Ports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400" />
                      <span>Full Garansi 30 Hari</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 line-through">Rp 35.000</span>
                    <div className="text-lg sm:text-xl font-black text-amber-400">Rp 10.000</div>
                  </div>
                  <button
                    onClick={() => openOrderModal(adminProduct)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Order Admin (10K)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Partner Panel (15k) */}
            {partnerProduct && (
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-white">Partner Panel Pterodactyl</h4>
                        <span className="text-xs text-purple-400 font-medium">Kemitraan Reseller VIP</span>
                      </div>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-md bg-purple-500/15 text-purple-300">
                      15K / BULAN
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3.5 leading-relaxed">
                    Tingkat kemitraan tertinggi dengan resource unlimited untuk Anda yang ingin membuka jasa sewa server atau hosting bot WhatsApp.
                  </p>

                  <div className="mt-3.5 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Unlimited Create Server & Sub-Users</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Dedicated Anti-Lag Resource</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                      <span>Prioritas VIP Support WhatsApp</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 line-through">Rp 50.000</span>
                    <div className="text-lg sm:text-xl font-black text-purple-400">Rp 15.000</div>
                  </div>
                  <button
                    onClick={() => openOrderModal(partnerProduct)}
                    className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs transition-all flex items-center gap-1.5"
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
