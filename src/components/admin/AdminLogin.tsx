import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, KeyRound, ShieldAlert, ArrowRight, ArrowLeft } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, navigateTo } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pin);
    if (!success) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#050811] relative overflow-hidden">
      <div className="w-full max-w-sm rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        <button
          onClick={() => navigateTo('store')}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Halaman Utama</span>
        </button>

        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto text-cyan-400 mb-3.5">
            <Lock className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-extrabold text-white">Administrator Access</h2>
          <p className="text-xs text-slate-400 mt-1">
            Silakan masukkan PIN otorisasi untuk masuk ke Control Panel Zynex Studio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="PIN Keamanan"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>PIN tidak valid. Silakan coba kembali.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <span>Masuk Panel</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
