import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, KeyRound, ShieldAlert, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setCurrentView } = useStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pin);
    if (!success) {
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('123456');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md rounded-3xl bg-slate-900/85 border border-cyan-500/30 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 relative z-10">
        <button
          onClick={() => {
            setCurrentView('store');
            window.location.hash = '';
          }}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Storefront</span>
        </button>

        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 mb-4 shadow-lg shadow-cyan-500/20">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-black text-white">Admin Portal</h2>
          <p className="text-xs text-slate-400 mt-1">
            Zynex Studio Management Panel & Store Controller
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Masukkan PIN / Password Admin:
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                placeholder="PIN Admin (Default: 123456)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className="w-full bg-slate-950 border border-white/10 focus:border-cyan-500/60 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>PIN salah! Silakan coba lagi atau gunakan tombol login instan di bawah.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Masuk ke Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 mb-2">Akses Demo Cepat:</p>
          <button
            onClick={handleQuickDemoLogin}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-white/5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Login Instan (PIN: 123456)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
