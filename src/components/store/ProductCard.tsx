import React from 'react';
import { Product } from '../../types';
import { formatIDR } from '../../utils/helpers';
import { DynamicIcon } from '../ui/DynamicIcon';
import { Check, ShoppingCart, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openOrderModal } = useStore();

  const isOutOfStock = product.stock === 'out_of_stock';
  const isLimited = product.stock === 'limited';

  // Calculate discount percentage if original price exists
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className={`relative group rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
        product.popular
          ? 'bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-cyan-950/20 border border-cyan-500/30 shadow-xl shadow-cyan-500/5 hover:border-cyan-400 hover:shadow-cyan-500/20'
          : 'bg-slate-900/60 border border-white/10 hover:border-slate-600 hover:bg-slate-900/80'
      } backdrop-blur-2xl hover:-translate-y-1.5`}
    >
      {/* Top badges */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
              product.popular
                ? 'bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400'
                : 'bg-slate-800/80 border border-white/10 text-slate-300'
            }`}
          >
            <DynamicIcon name={product.icon} className="w-6 h-6" />
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {product.category === 'panel'
                ? 'Hosting Panel'
                : product.category === 'premium'
                ? 'Akun Premium'
                : product.category === 'nokos'
                ? 'Virtual OTP'
                : product.category === 'domain'
                ? 'Domain Web'
                : 'Layanan Digital'}
            </span>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isOutOfStock
                    ? 'bg-red-500'
                    : isLimited
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              <span
                className={
                  isOutOfStock
                    ? 'text-red-400 font-medium'
                    : isLimited
                    ? 'text-amber-300 font-medium'
                    : 'text-emerald-400 font-medium'
                }
              >
                {isOutOfStock ? 'Stok Habis' : isLimited ? 'Stok Terbatas' : 'Ready Stock'}
              </span>
            </div>
          </div>
        </div>

        {product.badge && (
          <span
            className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border tracking-wide uppercase ${
              product.badge.includes('PROMO') || product.badge.includes('5K')
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse'
                : product.badge.includes('HOT') || product.badge.includes('POPULAR')
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Main product info */}
      <div className="space-y-2">
        <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {product.shortDesc}
        </p>

        {/* Feature List */}
        <div className="pt-3 pb-1 space-y-1.5 border-t border-slate-800/80">
          {product.features.slice(0, 4).map((feat, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
              <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
          {product.features.length > 4 && (
            <div className="text-[11px] text-cyan-400/80 font-medium pt-0.5">
              + {product.features.length - 4} fitur lainnya
            </div>
          )}
        </div>
      </div>

      {/* Price and CTA */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
        <div>
          {product.originalPrice && (
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 line-through">
                {formatIDR(product.originalPrice)}
              </span>
              {discountPercent && (
                <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                  -{discountPercent}%
                </span>
              )}
            </div>
          )}
          <div className="text-xl font-black text-white">
            {formatIDR(product.price)}
            <span className="text-xs font-normal text-slate-400"> / {product.period}</span>
          </div>
        </div>

        <button
          onClick={() => openOrderModal(product)}
          disabled={isOutOfStock}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
            isOutOfStock
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:scale-105'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>Beli</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
