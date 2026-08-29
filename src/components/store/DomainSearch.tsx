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
      badge: '5K / TAHUN',
      desc: 'Cocok untuk Portfolio, Web Pribadi, & Webhook Bot',
      productId: 'domain-my-id'
    },
    {
      tld: '.web.id',
      price: 5000,
      originalPrice: 40000,
      badge: '5K / TAHUN',
      desc: 'Ideal untuk Website Komunitas & Landing Page',
      productId: 'domain-web-id'
    },
    {
      tld: '.biz.id',
      price: 5000,
      originalPrice: 25000,
      badge: '5K / TAHUN',
      desc: 'Resmi untuk Toko Digital & Bisnis UMKM',
      productId: 'domain-biz-id'
    }
  ];

  const handleCheckDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainName.trim()) return;

    const cleaned = domainName.toLowerCase().trim().replace(/[^a-z0-9-]/g, '');
    if (!cleaned) return;

    setIsSearching(true);
    setSearchResult(null);

    setTimeout(() => {
      setIsSearching(false);
      setSearchResult({
        available: true,
        domain: `${cleaned}${selectedTld}`,
        tld: selectedTld,
        price: 5000
      });
    }, 500);
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
    <section id="domain" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Box */}
        <div className="rounded-3xl p-5 sm:p-9 bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              <span>Registrasi Domain Resmi Indonesia</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Cek & Daftarkan <span className="text-purple-400">Domain Cuma Rp 5.000</span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Miliki domain <strong className="text-white">.my.id</strong>, <strong className="text-white">.web.id</strong>, atau <strong className="text-white">.biz.id</strong> aktif 1 tahun penuh. Full DNS Cloudflare ready!
            </p>

            {/* Domain Checker Input Bar */}
            <form onSubmit={handleCheckDomain} className="mt-6">
              <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 focus-within:border-purple-500/60 transition-all">
                <div className="flex-1 flex items-center px-3 py-1.5 sm:py-0">
                  <Search className="w-4 h-4 text-slate-500 mr-2 shrink-0" />
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="Ketik nama domain (misal: botwa-toko)"
                    className="w-full bg-transparent border-none text-white placeholder-slate-500 focus:outline-none text-xs sm:text-sm"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedTld}
                    onChange={(e) => setSelectedTld(e.target.value)}
                    className="bg-slate-900 text-cyan-300 font-bold text-xs px-3 py-2.5 rounded-xl border border-slate-800 focus:outline-none cursor-pointer"
                  >
                    <option value=".my.id">.my.id (5K)</option>
                    <option value=".web.id">.web.id (5K)</option>
                    <option value=".biz.id">.biz.id (5K)</option>
                  </select>

                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0"
                  >
                    {isSearching ? (
                      <span className="inline-block animate-spin">⏳</span>
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>Cek Domain</span>
                  </button>
                </div>
              </div>
            </form>

            {/* WHOIS Simulated Result Box */}
            {searchResult && (
              <div className="mt-5 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm sm:text-base text-white">
                        {searchResult.domain}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300">
                        Tersedia!
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Aktif 1 Tahun • Full DNS Management • Cloudflare Ready
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 line-through">Rp 25.000</span>
                    <div className="text-base sm:text-lg font-black text-emerald-400">Rp 5.000</div>
                  </div>
                  <button
                    onClick={() => handleOrderDomain(searchResult.tld, searchResult.domain)}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md flex items-center gap-1.5 transition-all"
                  >
                    <span>Daftarkan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3 Domain Extension Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-8">
            {domainOptions.map((opt) => (
              <div
                key={opt.tld}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="font-mono font-bold text-lg text-white">
                      {opt.tld}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/15 text-purple-300">
                      {opt.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
                    {opt.desc}
                  </p>

                  <div className="mt-3.5 pt-2.5 border-t border-slate-850 space-y-1 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                      <span>Aktif 1 Tahun Penuh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3.5 h-3.5 text-purple-400" />
                      <span>Support Nameserver Cloudflare</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 line-through">
                      Rp {opt.originalPrice.toLocaleString('id-ID')}
                    </span>
                    <div className="text-base font-black text-white">
                      Rp 5.000 <span className="text-xs font-normal text-slate-400">/ thn</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOrderDomain(opt.tld)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-purple-600 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 transition-all flex items-center gap-1"
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
