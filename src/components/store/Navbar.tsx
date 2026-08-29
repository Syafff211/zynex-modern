import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Server,
  MessageCircle,
  Menu,
  X,
  ExternalLink,
  Bot
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Panel Bot WA', href: '#panel-bot' },
    { name: 'Domain 5K', href: '#domain' },
    { name: 'Katalog Produk', href: '#produk' },
    { name: 'Status Server', href: '#server-status' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const cleanPhone = settings.whatsappNumber.replace(/\D/g, '');

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060913]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/50 py-2.5 sm:py-3'
          : 'bg-[#060913]/60 backdrop-blur-md border-b border-white/5 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 group select-none"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Server className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  {settings.storeName || 'Zynex Studio'}
                </span>
                <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-cyan-500/20">
                  ID
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Pterodactyl & Digital Services</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/70 px-2 py-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="px-3.5 py-1 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-all duration-150"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            {settings.pterodactylLoginUrl && (
              <a
                href={settings.pterodactylLoginUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all"
                title="Buka Login Panel Pterodactyl"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Login Panel</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}

            {/* WhatsApp Contact CTA */}
            <a
              href={`https://wa.me/${cleanPhone}?text=Halo%20Admin%20Zynex%20Studio,%20saya%20tertarik%20dengan%20layanan%20hosting%20/%20produk%20digital`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp CS</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`https://wa.me/${cleanPhone}?text=Halo%20Admin%20Zynex%20Studio`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WA</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-5 mt-2 space-y-3 shadow-2xl backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800/80">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-left px-3 py-2.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 hover:bg-slate-900 rounded-xl transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {settings.pterodactylLoginUrl && (
              <a
                href={settings.pterodactylLoginUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-800"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Login Panel Pterodactyl</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            )}

            <a
              href={`https://wa.me/${cleanPhone}?text=Halo%20Admin%20Zynex%20Studio`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Chat WhatsApp Admin (24 Jam)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
