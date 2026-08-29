import React from 'react';
import { ShieldCheck, Zap, Globe2, Radio } from 'lucide-react';

export const ServerStatusWidget: React.FC = () => {
  const nodes = [
    {
      name: 'Singapore Node 01 (NVMe Ryzen)',
      type: 'Pterodactyl Main Node',
      status: 'Operational',
      uptime: '99.98%',
      ping: '18 ms',
      load: '32%'
    },
    {
      name: 'Singapore Node 02 (High Memory)',
      type: 'Bot WA Dedicated Node',
      status: 'Operational',
      uptime: '99.95%',
      ping: '21 ms',
      load: '45%'
    },
    {
      name: 'WhatsApp Baileys Gateway',
      type: 'Multi-Device QR & Pairing',
      status: 'Operational',
      uptime: '100%',
      ping: '14 ms',
      load: '28%'
    },
    {
      name: 'Cloudflare Anycast DNS',
      type: 'Global Edge Proxy & SSL',
      status: 'Operational',
      uptime: '100%',
      ping: '8 ms',
      load: '12%'
    }
  ];

  return (
    <section id="server-status" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-cyan-500/20 backdrop-blur-2xl shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
                <span>Live Infrastructure Status</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Status Server & Jaringan Zynex Studio
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Semua Sistem Normal (100% Online)</span>
            </div>
          </div>

          {/* Node Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {nodes.map((node, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-950/70 border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {node.type}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {node.status}
                  </span>
                </div>

                <div className="font-bold text-sm text-white mt-2 group-hover:text-cyan-300 transition-colors">
                  {node.name}
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center">
                  <div>
                    <div className="text-[9px] text-slate-500">Uptime</div>
                    <div className="text-xs font-mono font-bold text-slate-200">{node.uptime}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500">Ping</div>
                    <div className="text-xs font-mono font-bold text-cyan-400">{node.ping}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500">Node Load</div>
                    <div className="text-xs font-mono font-bold text-slate-200">{node.load}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Badges */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Garansi 30 Hari Penuh</div>
                <div className="text-slate-400">Uptime panel terjamin atau ganti baru</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Auto Restart Anti-Crash</div>
                <div className="text-slate-400">Bot otomatis hidup kembali jika error</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40">
              <Globe2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Direct SFTP & File Manager</div>
                <div className="text-slate-400">Kelola script bot semudah drag & drop</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
