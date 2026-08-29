import React from 'react';
import { INITIAL_TESTIMONIALS } from '../../data/initialData';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
            <span>Testimoni Pelanggan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Apa Kata Developer & Pengguna Kami
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-300">
            Ulasan dari pembeli Canva Pro, Nokos Indo, dan pengguna Panel Pterodactyl Zynex Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 backdrop-blur-xl flex flex-col justify-between transition-all"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-2.5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{item.product}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
