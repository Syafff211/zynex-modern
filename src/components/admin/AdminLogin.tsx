import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { checkApi } from '../../utils/api';
import {
  Lock,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  User,
  Server,
  Loader2,
} from 'lucide-react';

type LoginMode = 'pin' | 'server';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, loginAdminServer, navigateTo } = useStore();
  const [mode, setMode] = useState<LoginMode>('pin');
  const [apiOnline, setApiOnline] = useState(false);

  const [pin, setPin] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    checkApi().then((online) => {
      if (!cancelled) setApiOnline(online);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMsg('');

    if (mode === 'pin') {
      const success = loginAdmin(pin);
      if (!success) {
        setError(true);
        setErrorMsg('PIN tidak valid. Silakan coba kembali.');
      }
      return;
    }

    if (!username.trim() || !password) {
      setError(true);
      setErrorMsg('Username dan password wajib diisi.');
      return;
    }

    setLoading(true);
    const success = await loginAdminServer(username.trim(), password);
    setLoading(false);
    if (!success) {
      setError(true);
      setErrorMsg('Username atau password salah. Cek kembali kredensial server.');
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
            Masuk ke Control Panel Zynex Studio.
          </p>
        </div>

        {apiOnline && (
          <div className="mt-5 grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setMode('pin');
                setError(false);
              }}
              className={`py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'pin'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              PIN Lokal
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('server');
                setError(false);
              }}
              className={`py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                mode === 'server'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              Server Login
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'pin' ? (
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
              <p className="text-[10px] text-slate-500 mt-1.5">
                Mode lokal: data tersimpan di browser ini.
              </p>
            </div>
          ) : (
            <>
              <div>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError(false);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                    autoFocus
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 -mt-1">
                Mode server: data tersinkronisasi via backend /api (Vercel).
              </p>
            </>
          )}

          {error && (
            <p className="text-xs text-red-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Masuk Panel</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
