import React from 'react';
import {
  Sparkles,
  Server,
  Zap,
  ShieldCheck,
  Bot,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Globe,
  Palette,
  Smartphone
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Hero: React.FC = () => {
  const { openOrderModal, products } = useStore();

  // Find quick products for instant hero buttons
  const pteroProd = products.find((p) => p.id === 'panel-pterodactyl-bot') || products[0];
  const canvaProd = products.find((p) => p.id === 'canva-pro-1m');
  const nokosProd = products.find((p) => p.id === 'nokos-indo');
  const domainProd = products.find((p) => p.id === 'domain-my-id');

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Radiant Glow Lights Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[300px] bg-teal-500/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Mini Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 border border-cyan-500/30 backdrop-blur-xl shadow-lg shadow-cyan-500/10 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300">
              HARGA SPESIAL SERBA 5.000 (5K) & PROMO CLOUD HOSTING
            </span>
          </div>
        </div>

        {/* Hero Headline & Subhead */}
        <div className="text-center max-w-4xl mx-auto mt-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Pusat Hosting <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">Panel Pterodactyl</span> & Produk Digital Terpercaya
          </h1>
          
          <p className="mt-5 text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Run Bot WhatsApp 24 Jam Anti-Crash dengan <span className="text-cyan-300 font-semibold">Node.js Egg</span> mulai 5K. Sedia Canva Pro, Nokos Indo Fresh OTP, Domain Resmi, hingga Akses Admin & Partner Pterodactyl.
          </p>

          {/* CTA Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollToSection('#panel-bot')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
            >
              <Cpu className="w-4 h-4 text-slate-950" />
              <span>Pilih Panel Bot WA (5K)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('#produk')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Lihat Katalog Produk</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Grid (4 Key Products at 5K) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 max-w-5xl mx-auto">
          {/* Card 1: Canva Pro 5K */}
          <div
            onClick={() => canvaProd && openOrderModal(canvaProd)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/10 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Palette className="w-5 h-5 text-purple-400" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                PROMO
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-bold text-sm text-slate-100 group-hover:text-purple-300 transition-colors">
                Canva Pro 1 Bulan
              </h4>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xs text-slate-400 line-through">25k</span>
                <span className="text-base font-black text-white">Rp 5.000</span>
              </div>
            </div>
          </div>

          {/* Card 2: Nokos Indo 5K */}
          <div
            onClick={() => nokosProd && openOrderModal(nokosProd)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Smartphone className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                INSTANT
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                Nokos Indo (+62)
              </h4>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xs text-slate-400 line-through">15k</span>
                <span className="text-base font-black text-white">Rp 5.000</span>
              </div>
            </div>
          </div>

          {/* Card 3: Panel Node.js 5K */}
          <div
            onClick={() => pteroProd && openOrderModal(pteroProd)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bot className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                BOT WA
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                Panel Bot 1GB 70% CPU
              </h4>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xs text-slate-400 line-through">20k</span>
                <span className="text-base font-black text-white">Rp 5.000</span>
              </div>
            </div>
          </div>

          {/* Card 4: Domain 5K */}
          <div
            onClick={() => domainProd && openOrderModal(domainProd)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-white/10 hover:border-amber-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5 text-amber-400" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                1 TAHUN
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-bold text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                Domain .my.id / .web.id
              </h4>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-xs text-slate-400 line-through">25k</span>
                <span className="text-base font-black text-white">Rp 5.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Strip */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Garansi 100% Anti-Rollback</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Aktivasi Instan 1-5 Menit</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <Server className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Uptime 99.9% NVMe Fast Node</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>QRIS & All Bank Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
