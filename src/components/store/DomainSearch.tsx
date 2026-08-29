import React, { useState } from 'react';
import { Globe, Search, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface DomainOption {
  tld: string;
  price: number;
  originalPrice: number;
  badge: string;
  desc: string;
  productId: string;
}

export const DomainSearch: React.FC = () => {
  const { openOrderModal, products } = useStore();
  const [domainName, setDomainName] = useState('');
  const [selectedTld, setSelectedTld] = useState('.my.id');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    available: boolean;
    domain: string;
    tld: string;
    price: number;
  } | null>(null);

  const domainOptions: DomainOption[] = [
    {
      tld: '.my.id',
      price: 5000,
      originalPrice: 20000,
      badge: '5K / TAHUN 🔥',
      desc: 'Cocok untuk Portfolio, Personal, & Bot Webhook',
      productId: 'domain-my-id'
    },
    {
      tld: '.web.id',
      price: 5000,
      originalPrice: 40000,
      badge: '5K / TAHUN 🔥',
      desc: 'Ideal untuk Website Komunitas & Landing Page',
      productId: 'domain-web-id'
    },
    {
      tld: '.biz.id',
      price: 5000,
      originalPrice: 25000,
      badge: '5K / TAHUN 🔥',
      desc: 'Resmi untuk Toko Digital & Bisnis UMKM',
      productId: 'domain-biz-id'
    }
  ];

  const handleCheckDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) return;

    // Clean domain string (remove spaces, symbols)
    const cleaned = domainName.toLowerCase().trim().replace(/[^a-z0-9-]/g, '');
    if (!cleaned) return;

    setIsSearching(true);
    setSearchResult(null);

    // Simulate fast WHOIS check
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        available: true,
        domain: `${cleaned}${selectedTld}`,
        tld: selectedTld,
        price: 5000
      });
    }, 600);
  };

  const handleOrderDomain = (tld: string, customName?: string) => {
    const option = domainOptions.find((d) => d.tld === tld) || domainOptions[0];
    const targetProd = products.find((p) => p.id === option.productId) || {
      id: option.productId,
      name: `Domain ${option.tld}`,
      slug: `domain-${option.tld.replace('.', '')}`,
      category: 'domain' as const,
      price: option.price,
      period: '1 Tahun',
      icon: 'Globe',
      shortDesc: `Domain resmi ${option.tld} aktif 1 tahun penuh dengan DNS Management.`,
      features: [
        'Masa Aktif 1 Tahun Penuh',
        'Full DNS Management & Cloudflare Support',
        'Aktivasi Instan Tanpa Syarat KTP Rumit',
        'Garansi Domain Aktif 100%'
      ],
      stock: 'ready' as const
    };

    const finalDomainName = customName || (domainName.trim() ? `${domainName.toLowerCase().replace(/[^a-z0-9-]/g, '')}${tld}` : `nama-anda${tld}`);

    openOrderModal(targetProd, {
      name: `Domain ${option.tld} (1 Tahun)`,
      specs: `Nama Domain: ${finalDomainName}`,
      price: option.price
    });
  };

  return (
    <section id="domain" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card Box */}
        <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-purple-950/40 border border-purple-500/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Ambient light */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              Domain Murah Indonesia Cuma 5K
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cek & Daftarkan <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Nama Domain Impianmu</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Miliki domain resmi <span className="text-white font-semibold">.my.id</span>, <span className="text-white font-semibold">.web.id</span>, atau <span className="text-white font-semibold">.biz.id</span> hanya dengan <span className="text-emerald-400 font-extrabold">Rp 5.000 / Tahun</span>. Full DNS management & Cloudflare ready!
            </p>

            {/* Interactive Search Bar */}
            <form onSubmit={handleCheckDomain} className="mt-8">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-slate-950/80 p-2 rounded-2xl border border-white/10 shadow-inner focus-within:border-purple-500/50 transition-all">
                <div className="flex-1 flex items-center px-3 py-2 sm:py-0">
                  <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="Ketik nama domain (contoh: tokoonline-saya)"
                    className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-sm sm:text-base"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedTld}
                    onChange={(e) => setSelectedTld(e.target.value)}
                    className="bg-slate-800 text-cyan-300 font-bold text-xs sm:text-sm px-3 py-3 rounded-xl border border-white/10 focus:outline-none cursor-pointer"
                  >
                    <option value=".my.id">.my.id (5K)</option>
                    <option value=".web.id">.web.id (5K)</option>
                    <option value=".biz.id">.biz.id (5K)</option>
                  </select>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-500/25 transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                  >
                    {isSearching ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Mengecek...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Cek Domain</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Simulated Live Check Result Banner */}
            {searchResult && (
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-base sm:text-lg text-white">
                        {searchResult.domain}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        TERSEDIA! 🎉
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">
                      Masa aktif 1 Tahun • Full DNS Management • Free SSL Support
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 line-through">Rp 25.000</span>
                    <div className="text-xl font-black text-emerald-400">Rp 5.000</div>
                  </div>
                  <button
                    onClick={() => handleOrderDomain(searchResult.tld, searchResult.domain)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition-all"
                  >
                    <span>Daftarkan Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3 Domain Cards Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-10 relative z-10">
            {domainOptions.map((opt) => (
              <div
                key={opt.tld}
                className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="font-mono font-extrabold text-xl text-white group-hover:text-purple-300 transition-colors">
                      {opt.tld}
                    </div>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {opt.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                      <span>Aktif 1 Tahun Penuh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-purple-400" />
                      <span>Aktivasi Cepat & Legal</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 line-through">
                      Rp {opt.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <div className="text-lg font-black text-white">
                      Rp 5.000 <span className="text-xs font-normal text-slate-400">/ thn</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOrderDomain(opt.tld)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 text-slate-200 hover:text-white font-semibold text-xs border border-white/10 hover:border-transparent transition-all flex items-center gap-1"
                  >
                    <span>Order</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
