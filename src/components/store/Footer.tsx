import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Server,
  MessageCircle,
  Send,
  ExternalLink,
  Bot,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings } = useStore();
  const cleanPhone = settings.whatsappNumber.replace(/\D/g, '');

  return (
    <footer className="relative bg-[#04060c] border-t border-slate-850 pt-12 pb-8 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Server className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                {settings.storeName}
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {settings.tagline || 'Penyedia infrastruktur Cloud Panel Pterodactyl, Node.js Bot WhatsApp Hosting, Canva Pro, Nokos Indo, dan Domain Murah Terpercaya di Indonesia.'}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Garansi 30 Hari Penuh</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Aktivasi Instan 1-5 Menit</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Support Baileys & WhiskeySockets</span>
              </span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Layanan Utama
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#panel-bot" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Panel Pterodactyl Bot WA (5K)
                </a>
              </li>
              <li>
                <a href="#produk" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Canva Pro 1 Bulan (5K)
                </a>
              </li>
              <li>
                <a href="#produk" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Nokos Indo (+62) OTP Fresh (5K)
                </a>
              </li>
              <li>
                <a href="#domain" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Domain .my.id / .web.id / .biz.id (5K)
                </a>
              </li>
              <li>
                <a href="#server-status" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Status Server & Monitoring Uptime
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support & Links (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Bantuan & Dukungan Pelanggan
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp CS: +{settings.whatsappNumber}</span>
                </a>
              </li>
              {settings.telegramUsername && (
                <li>
                  <a
                    href={`https://t.me/${settings.telegramUsername}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Telegram Channel: @{settings.telegramUsername}</span>
                  </a>
                </li>
              )}
              {settings.pterodactylLoginUrl && (
                <li>
                  <a
                    href={settings.pterodactylLoginUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-300 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
                  >
                    <Bot className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Login Panel Pterodactyl</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Payment Badges & Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>Metode Bayar:</span>
            <span className="font-semibold text-slate-400">QRIS (All E-Wallet) • DANA • GoPay • BCA</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} {settings.storeName}. Hak cipta dilindungi.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
