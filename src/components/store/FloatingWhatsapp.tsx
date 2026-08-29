import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsapp: React.FC = () => {
  const { settings } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const finalMsg = msg.trim() || 'Halo Admin Zynex Studio, saya mau tanya produk / panel bot WA';
    const cleanPhone = settings.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}`, '_blank');
    setIsOpen(false);
    setMsg('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Mini Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl bg-slate-900 border border-emerald-500/30 backdrop-blur-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-3.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                  ZS
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 ring-2 ring-emerald-600"></span>
              </div>
              <div>
                <div className="font-bold text-xs">Customer Support</div>
                <div className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse"></span>
                  Online • Siap Membantu
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 bg-slate-950/70 text-xs space-y-2">
            <div className="p-3 rounded-xl bg-slate-800/80 text-slate-200 border border-white/5">
              👋 Halo kak! Ada yang bisa kami bantu seputar Panel Pterodactyl Bot WA, Canva Pro 5K, Nokos Indo, atau Domain?
            </div>
          </div>

          <form onSubmit={handleSend} className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5">
            <input
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
              title="Kirim ke WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 p-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all duration-200"
        aria-label="Chat WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-200"></span>
        </span>
        <MessageCircle className="w-6 h-6 text-slate-950" />
        <span className="hidden sm:inline text-xs font-black pr-1">CS WhatsApp (24 Jam)</span>
      </button>
    </div>
  );
};
