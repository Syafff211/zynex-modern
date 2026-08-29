import React from 'react';
import {
  Server,
  Zap,
  ShieldCheck,
  Bot,
  ArrowRight,
  Cpu,
  Globe,
  Palette,
  Smartphone,
  Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Hero: React.FC = () => {
  const { openOrderModal, products } = useStore();

  const pteroProd = products.find((p) => p.id === 'panel-pterodactyl-bot') || products[0];
  const canvaProd = products.find((p) => p.id === 'canva-pro-1m');
  const nokosProd = products.find((p) => p.id === 'nokos-indo');
  const domainProd = products.find((p) => p.id === 'domain-my-id');

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-20">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="font-semibold text-white">Promo Spesial Serba Rp 5.000</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400 font-medium">Garansi Penuh 100%</span>
          </div>
        </div>

        {/* Hero Headline */}
        <div className="text-center max-w-3xl mx-auto mt-6">
          <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Hosting <span className="text-cyan-400">Panel Pterodactyl</span> & Produk Digital Terpercaya
          </h1>
          
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Solusi server Node.js khusus Run Bot WhatsApp 24 Jam Anti-Crash mulai <strong className="text-white font-bold">Rp 5.000</strong>. Sedia Canva Pro, Nokos Indo fresh OTP, domain resmi, hingga panel admin.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('#panel-bot')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-slate-950" />
              <span>Pilih Panel Bot WA (5K)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('#domain')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Cek Domain 5K (.my.id/.web.id)</span>
            </button>
          </div>
        </div>

        {/* 4 Feature Promo Cards Grid (Responsive 2 cols on mobile, 4 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-10 max-w-5xl mx-auto">
          {/* Card 1: Canva Pro 5K */}
          <div
            onClick={() => canvaProd && openOrderModal(canvaProd)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/50 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Palette className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300">
                1 BULAN
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-purple-300 transition-colors">
                Canva Pro 1 Bulan
              </h3>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xs text-slate-500 line-through">25k</span>
                <span className="text-base font-extrabold text-white">Rp 5.000</span>
              </div>
            </div>
          </div>

          {/* Card 2: Nokos Indo 5K */}
          <div
            onClick={() => nokosProd && openOrderModal(nokosProd)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Smartphone className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300">
                INSTANT
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                Nokos Indo (+62) OTP
              </h3>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xs text-slate-500 line-through">15k</span>
                <span className="text-base font-extrabold text-white">Rp 5.000</span>
              </div>
            </div>
          </div>

          {/* Card 3: Panel Node.js 5K */}
          <div
            onClick={() => pteroProd && openOrderModal(pteroProd)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300">
                1GB 70% CPU
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-emerald-300 transition-colors">
                Panel Bot WhatsApp
              </h3>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xs text-slate-500 line-through">20k</span>
                <span className="text-base font-extrabold text-white">Rp 5.000</span>
              </div>
            </div>
          </div>

          {/* Card 4: Domain 5K */}
          <div
            onClick={() => domainProd && openOrderModal(domainProd)}
            className="group cursor-pointer p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300">
                1 TAHUN
              </span>
            </div>
            <div className="mt-3">
              <h3 className="font-bold text-xs sm:text-sm text-slate-100 group-hover:text-amber-300 transition-colors">
                Domain .my.id / .biz.id
              </h3>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-xs text-slate-500 line-through">25k</span>
                <span className="text-base font-extrabold text-white">Rp 5.000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Trust Badges */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/40">
            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Full Garansi 30 Hari</div>
              <div className="text-[11px] text-slate-400">Garansi ganti unit / nomor</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/40">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Proses Instan</div>
              <div className="text-[11px] text-slate-400">1-5 menit setelah bayar</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/40">
            <Server className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">Node NVMe Singapore</div>
              <div className="text-[11px] text-slate-400">Ping 15-20ms ke WA Socket</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/40">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-white">QRIS & All E-Wallet</div>
              <div className="text-[11px] text-slate-400">DANA, GoPay, BCA, OVO</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
