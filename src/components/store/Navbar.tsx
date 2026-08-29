import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Server,
  MessageCircle,
  Menu,
  X,
  Lock,
  Layers,
  ExternalLink,
  Bot
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { settings, setCurrentView, currentView, isAdminAuthenticated } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Semua Produk', href: '#produk' },
    { name: 'Panel Bot WA', href: '#panel-bot' },
    { name: 'Domain 5K', href: '#domain' },
    { name: 'Status Server', href: '#server-status' },
    { name: 'Testimoni', href: '#testimoni' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      setCurrentView('store');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAdminToggle = () => {
    if (currentView === 'admin') {
      setCurrentView('store');
      window.location.hash = '';
    } else {
      setCurrentView('admin');
      window.location.hash = 'admin';
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060a17]/85 backdrop-blur-xl border-b border-cyan-500/15 shadow-lg shadow-black/40 py-3'
          : 'bg-[#060a17]/50 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('store');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1.5px] shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Server className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyan-400">
                  {settings.storeName || 'Zynex Studio'}
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-cyan-500/30">
                  PRO
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Pterodactyl & Digital Store</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Pterodactyl Panel Direct Link */}
            {settings.pterodactylLoginUrl && (
              <a
                href={settings.pterodactylLoginUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 hover:text-cyan-300 transition-all"
                title="Login ke Panel Pterodactyl"
              >
                <Bot className="w-3.5 h-3.5 text-cyan-400" />
                <span>Login Panel</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            )}

            {/* Admin toggle button */}
            <button
              onClick={handleAdminToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'admin'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                  : 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/10'
              }`}
            >
              {currentView === 'admin' ? (
                <>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Ke Storefront</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Admin Panel</span>
                  {isAdminAuthenticated && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  )}
                </>
              )}
            </button>

            {/* WhatsApp Contact CTA */}
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Halo%20Admin%20Zynex%20Studio,%20saya%20mau%20tanya%20produk`}
              target="_blank"
              rel="noreferrer"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-xl group font-medium text-xs shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-shadow"
            >
              <span className="w-full h-full bg-gradient-to-br from-cyan-500 via-teal-400 to-emerald-500 group-hover:from-cyan-400 group-hover:to-teal-300 absolute"></span>
              <span className="relative px-3.5 py-1.5 transition-all ease-out bg-slate-950 rounded-[10px] group-hover:bg-opacity-0 text-white font-semibold flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 group-hover:text-white" />
                <span>Hubungi CS</span>
              </span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleAdminToggle}
              className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-white/10 text-xs flex items-center gap-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-cyan-500/20 backdrop-blur-2xl px-4 pt-4 pb-6 mt-3 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-left px-3 py-2 text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            {settings.pterodactylLoginUrl && (
              <a
                href={settings.pterodactylLoginUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-800 text-slate-200 border border-slate-700"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>Login Panel Pterodactyl</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            )}

            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=Halo%20Admin%20Zynex%20Studio,%20saya%20mau%20tanya%20produk`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>Chat WhatsApp Admin (24 Jam)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
