import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Megaphone, X, Sparkles } from 'lucide-react';

export const AnnouncementBanner: React.FC = () => {
  const { settings, updateSettings } = useStore();

  if (!settings.showAnnouncement || !settings.announcement) {
    return null;
  }

  return (
    <div className="relative z-40 bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-purple-950/80 backdrop-blur-md border-b border-cyan-500/20 text-xs sm:text-sm py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-cyan-400 shrink-0 font-semibold">
          <Sparkles className="w-4 h-4 animate-spin text-cyan-300" style={{ animationDuration: '4s' }} />
          <span className="hidden sm:inline bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded-full text-xs uppercase tracking-wider font-bold">
            Info Promo
          </span>
        </div>

        <div className="overflow-hidden whitespace-nowrap flex-1 relative">
          <div className="inline-block animate-marquee font-medium text-slate-200">
            <span className="inline-flex items-center gap-2 mr-12">
              <Megaphone className="w-3.5 h-3.5 text-cyan-400 inline" />
              {settings.announcement}
            </span>
          </div>
        </div>

        <button
          onClick={() => updateSettings({ showAnnouncement: false })}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors shrink-0"
          title="Tutup Pengumuman"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
