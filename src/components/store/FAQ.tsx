import React, { useState } from 'react';
import { INITIAL_FAQS } from '../../data/initialData';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(INITIAL_FAQS[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            Tanya Jawab
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pertanyaan yang <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-300">Sering Diajukan (FAQ)</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Punya pertanyaan seputar Panel Bot, Canva Pro, Nokos Indo, atau Domain? Temukan jawabannya di sini.
          </p>
        </div>

        <div className="space-y-3">
          {INITIAL_FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-900/80 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                    : 'bg-slate-900/50 border-white/5 hover:border-slate-700'
                } backdrop-blur-xl`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 border-t border-slate-800/80 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
