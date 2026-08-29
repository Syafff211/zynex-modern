import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Server,
  MessageCircle,
  Send,
  Lock,
  ExternalLink,
  Bot
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setCurrentView } = useStore();

  const handleAdminClick = () => {
    setCurrentView('admin');
    window.location.hash = 'admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060d] border-t border-cyan-500/15 pt-14 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/5 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Server className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-black text-xl text-white tracking-tight">
                {settings.storeName}
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {settings.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-[10px] text-slate-300 font-semibold">
                🛡️ 100% Legal & Bergaransi
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-[10px] text-slate-300 font-semibold">
                ⚡ Support Node.js v18/20/22
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/5 text-[10px] text-slate-300 font-semibold">
                💬 CS WhatsApp 24 Jam
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Menu Layanan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#panel-bot" className="hover:text-cyan-400 transition-colors">
                  Panel Pterodactyl Node.js Bot WA
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-cyan-400 transition-colors">
                  Canva Pro 1 Bulan (5K)
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-cyan-400 transition-colors">
                  Nokos Indo (+62) OTP
                </a>
              </li>
              <li>
                <a href="#domain" className="hover:text-cyan-400 transition-colors">
                  Domain .my.id, .web.id, .biz.id (5K)
                </a>
              </li>
              <li>
                <a href="#server-status" className="hover:text-cyan-400 transition-colors">
                  Status Server & Uptime
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Admin Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Bantuan & Admin
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp: +{settings.whatsappNumber}</span>
                </a>
              </li>
              {settings.telegramUsername && (
                <li>
                  <a
                    href={`https://t.me/${settings.telegramUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Telegram: @{settings.telegramUsername}</span>
                  </a>
                </li>
              )}
              {settings.pterodactylLoginUrl && (
                <li>
                  <a
                    href={settings.pterodactylLoginUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Panel Login Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              )}
              <li className="pt-2">
                <button
                  onClick={handleAdminClick}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-semibold border border-cyan-500/20 flex items-center gap-1.5 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Dashboard (/admin)</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Payment Badges & Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Metode Bayar Resmi:</span>
            <span className="font-bold text-slate-400">QRIS • DANA • GoPay • BCA • ShopeePay</span>
          </div>

          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} {settings.storeName}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
