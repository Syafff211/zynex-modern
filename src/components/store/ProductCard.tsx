import React from 'react';
import { Product } from '../../types';
import { formatIDR } from '../../utils/helpers';
import { DynamicIcon } from '../ui/DynamicIcon';
import { Check, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openOrderModal } = useStore();

  const isOutOfStock = product.stock === 'out_of_stock';
  const isLimited = product.stock === 'limited';

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      className={`rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between ${
        product.popular
          ? 'bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg shadow-black/40'
          : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
      } backdrop-blur-xl hover:-translate-y-0.5`}
    >
      <div>
        {/* Top badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                product.popular
                  ? 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-400'
                  : 'bg-slate-850 border border-slate-800 text-slate-300'
              }`}
            >
              <DynamicIcon name={product.icon} className="w-5 h-5" />
            </div>

            <div className="overflow-hidden">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {product.category === 'panel'
                  ? 'Hosting Panel'
                  : product.category === 'premium'
                  ? 'Akun Premium'
                  : product.category === 'nokos'
                  ? 'Virtual OTP'
                  : product.category === 'domain'
                  ? 'Domain Resmi'
                  : 'Layanan'}
              </span>
              <div className="flex items-center gap-1.5 text-[10px]">
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
              className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wide shrink-0 ${
                product.badge.includes('5K') || product.badge.includes('PROMO')
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details */}
        <h3 className="text-base font-extrabold text-white">
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
          {product.shortDesc}
        </p>

        {/* Features list */}
        <div className="pt-3 pb-1 space-y-1.5 border-t border-slate-800/80 mt-3">
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

      {/* Price & CTA Button */}
      <div className="mt-5 pt-3.5 border-t border-slate-800 flex items-center justify-between gap-2">
        <div>
          {product.originalPrice && (
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-slate-500 line-through">
                {formatIDR(product.originalPrice)}
              </span>
              {discountPercent && (
                <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                  -{discountPercent}%
                </span>
              )}
            </div>
          )}
          <div className="text-lg font-black text-white">
            {formatIDR(product.price)}
            <span className="text-xs font-normal text-slate-400"> / {product.period}</span>
          </div>
        </div>

        <button
          onClick={() => openOrderModal(product)}
          disabled={isOutOfStock}
          className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
            isOutOfStock
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
          }`}
        >
          <span>Pesan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
