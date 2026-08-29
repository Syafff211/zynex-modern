import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../../types';
import {
  Layers,
  Search,
  Bot,
  Palette,
  Smartphone,
  Globe,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

export const ProductList: React.FC = () => {
  const { products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high'>('default');

  const categories: { id: ProductCategory; name: string; icon: React.ReactNode; count: number }[] = [
    {
      id: 'all',
      name: 'Semua Produk',
      icon: <Layers className="w-4 h-4" />,
      count: products.length
    },
    {
      id: 'panel',
      name: 'Panel Pterodactyl',
      icon: <Bot className="w-4 h-4" />,
      count: products.filter((p) => p.category === 'panel').length
    },
    {
      id: 'premium',
      name: 'Canva & Premium',
      icon: <Palette className="w-4 h-4" />,
      count: products.filter((p) => p.category === 'premium').length
    },
    {
      id: 'nokos',
      name: 'Nokos Indo OTP',
      icon: <Smartphone className="w-4 h-4" />,
      count: products.filter((p) => p.category === 'nokos').length
    },
    {
      id: 'domain',
      name: 'Domain Murah (5K)',
      icon: <Globe className="w-4 h-4" />,
      count: products.filter((p) => p.category === 'domain').length
    }
  ];

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="produk" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Katalog Lengkap Zynex Studio
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pilihan Layanan & <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">Produk Digital</span>
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Semua produk aktif instan, bergaransi penuh, dan didukung Customer Service 24/7.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari produk (e.g. Canva, Bot...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 backdrop-blur-md"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-white/10 rounded-xl px-2.5 py-1.5 backdrop-blur-md">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="default" className="bg-slate-900">Urutkan</option>
                <option value="price-low" className="bg-slate-900">Harga Termurah</option>
                <option value="price-high" className="bg-slate-900">Harga Tertinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/25'
                    : 'bg-slate-900/60 text-slate-300 hover:text-white border-white/5 hover:border-slate-700 hover:bg-slate-850'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive ? 'bg-slate-950 text-cyan-300' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-white/5 backdrop-blur-md mt-6">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-300">Produk Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba kata kunci lain atau pilih kategori lain.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold hover:bg-slate-700 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
