import React from 'react';
import { ShieldCheck, Zap, Globe2, Radio } from 'lucide-react';

export const ServerStatusWidget: React.FC = () => {
  const nodes = [
    {
      name: 'Singapore Equinix SG1',
      type: 'Pterodactyl Main Node',
      status: 'Operational',
      uptime: '99.98%',
      ping: '18 ms',
      load: '32%'
    },
    {
      name: 'Singapore Dedicated Node 02',
      type: 'Bot WA High RAM Node',
      status: 'Operational',
      uptime: '99.95%',
      ping: '21 ms',
      load: '45%'
    },
    {
      name: 'WhatsApp Baileys Gateway',
      type: 'Socket & Pairing Service',
      status: 'Operational',
      uptime: '100%',
      ping: '14 ms',
      load: '28%'
    },
    {
      name: 'Cloudflare Edge Proxy',
      type: 'Global DNS & SSL Edge',
      status: 'Operational',
      uptime: '100%',
      ping: '8 ms',
      load: '12%'
    }
  ];

  return (
    <section id="server-status" className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-5 sm:p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>Monitoring Status Infrastruktur</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Status Node & Jaringan Server
              </h3>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Semua Sistem Normal (100% Online)</span>
            </div>
          </div>

          {/* Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-5">
            {nodes.map((node, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">
                      {node.type}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {node.status}
                    </span>
                  </div>

                  <div className="font-bold text-xs sm:text-sm text-white mt-2">
                    {node.name}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-850 text-center">
                  <div>
                    <div className="text-[9px] text-slate-500">Uptime</div>
                    <div className="text-xs font-mono font-bold text-slate-200">{node.uptime}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500">Ping</div>
                    <div className="text-xs font-mono font-bold text-cyan-400">{node.ping}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500">Load</div>
                    <div className="text-xs font-mono font-bold text-slate-200">{node.load}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantees Strip */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-850">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Garansi 30 Hari Penuh</div>
                <div className="text-slate-400 text-[11px]">Server drop diganti baru tanpa biaya</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-850">
              <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Auto Restart Anti-Crash</div>
                <div className="text-slate-400 text-[11px]">Bot otomatis restart saat memory penuh</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-850">
              <Globe2 className="w-5 h-5 text-cyan-400 shrink-0" />
              <div className="text-xs">
                <div className="font-bold text-white">Akses SFTP & File Manager</div>
                <div className="text-slate-400 text-[11px]">Upload script bot via WinSCP / Web</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
