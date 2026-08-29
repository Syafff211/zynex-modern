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
  SlidersHorizontal
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
      icon: <Layers className="w-3.5 h-3.5" />,
      count: products.length
    },
    {
      id: 'panel',
      name: 'Panel Pterodactyl',
      icon: <Bot className="w-3.5 h-3.5" />,
      count: products.filter((p) => p.category === 'panel').length
    },
    {
      id: 'premium',
      name: 'Canva Pro',
      icon: <Palette className="w-3.5 h-3.5" />,
      count: products.filter((p) => p.category === 'premium').length
    },
    {
      id: 'nokos',
      name: 'Nokos Indo (+62)',
      icon: <Smartphone className="w-3.5 h-3.5" />,
      count: products.filter((p) => p.category === 'nokos').length
    },
    {
      id: 'domain',
      name: 'Domain (5K)',
      icon: <Globe className="w-3.5 h-3.5" />,
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
    <section id="produk" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              Katalog Layanan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Daftar Produk & Layanan Digital
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
              Semua produk bergaransi penuh, aktif instan, dan diproses via Customer Service WhatsApp.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-2">
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

        {/* Horizontal Category Filter Pills (Mobile friendly) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-800 hover:bg-slate-850'
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

        {/* Products Grid (Responsive: 1 col on mobile, 2 on tablet, 3 on desktop, 4 on xl) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Search className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-300">Produk Tidak Ditemukan</h3>
            <p className="text-xs text-slate-500 mt-1">Coba kata kunci pencarian yang lain.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-800 text-cyan-300 text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
