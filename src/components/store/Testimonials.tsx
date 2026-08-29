import React from 'react';
import { INITIAL_TESTIMONIALS } from '../../data/initialData';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimoni" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
            Ulasan Pelanggan
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Dipercaya Oleh <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">1,500+ Developer & Pelanggan</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Berikut testimoni nyata dari customer yang menggunakan layanan Zynex Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/30 backdrop-blur-xl flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-9 h-9 rounded-full object-cover border border-cyan-500/30"
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate flex items-center gap-1">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
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
