import React, { useState } from 'react';
import { 
  Key, 
  ShieldCheck, 
  Trees, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  RefreshCw,
  Building2
} from 'lucide-react';
import { WhiteLabelConfig, LicenseInfo, UserRole } from '../../types';

interface LoginPageProps {
  whiteLabel: WhiteLabelConfig;
  license: LicenseInfo;
  onLoginSuccess: (user: { name: string; role: UserRole; username: string }) => void;
  onOpenForgotPassword: () => void;
  onOpenLicenseActivate: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  whiteLabel,
  license,
  onLoginSuccess,
  onOpenForgotPassword,
  onOpenLicenseActivate,
}) => {
  const [username, setUsername] = useState('admin.snj');
  const [password, setPassword] = useState('PalmVision2026!');
  const [selectedRole, setSelectedRole] = useState<UserRole>('ESTATE_MANAGER');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [require2FA, setRequire2FA] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          role: selectedRole,
          rememberMe,
          twoFactorCode: require2FA ? twoFactorCode : undefined,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess({
          name: data.user.name,
          role: data.user.role,
          username: data.user.username,
        });
      } else {
        if (data.require2FA) {
          setRequire2FA(true);
          setErrorMsg('Masukkan kode 2FA Authenticator Anda.');
        } else {
          setErrorMsg(data.message || 'Kredensial login tidak valid.');
        }
      }
    } catch (err) {
      setErrorMsg('Gagal terhubung ke server autentikasi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 p-4 relative overflow-hidden font-sans">
      {/* Background Animated Palm Silhouette Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <div className="w-full max-w-4xl rounded-3xl border border-emerald-500/30 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 relative z-10 animate-in fade-in zoom-in duration-300">
        
        {/* Left Branding Banner Column (5 cols) */}
        <div className="md:col-span-5 p-8 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-slate-900 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-emerald-500/20 relative">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-amber-500 text-slate-950 font-extrabold shadow-lg">
                <Trees className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-white">{whiteLabel.appName}</h1>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                  Enterprise Plantation ERP
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-emerald-100/90 leading-relaxed">
              <p className="font-semibold text-white">
                Sistem Terpadu Manajemen Perkebunan Kelapa Sawit Berbasis AI & Offline Field Sync Engine.
              </p>
              <ul className="space-y-2 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Sertifikasi ISPO / RSPO Compliance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Prediksi Hasil Panen Gemini 3.6</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Audit Trail Immutable & Device Binding</span>
                </li>
              </ul>
            </div>
          </div>

          {/* License Status Pill in Left Card */}
          <div className="mt-8 p-3.5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 space-y-1 text-xs">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> Lisensi Produk
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px]">
                {license.status}
              </span>
            </div>
            <div className="text-slate-300 font-mono text-[11px] truncate">{license.customerName}</div>
            <div className="text-[10px] text-slate-400">
              Masa Berlaku: {license.expiresAt.substring(0, 10)} ({license.daysRemaining} hari tersisa)
            </div>
          </div>
        </div>

        {/* Right Form Column (7 cols) */}
        <div className="md:col-span-7 p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">Login Portal Enterprise</h2>
            <p className="text-xs text-slate-400">
              Silakan masukkan username, password, dan pilih peran akses Anda.
            </p>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-600/50 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {/* Username Input */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Username / Email SSO</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin.snj"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-slate-300 font-semibold">Password Security</label>
                <button
                  type="button"
                  onClick={onOpenForgotPassword}
                  className="text-emerald-400 hover:underline text-[11px] font-semibold"
                >
                  Lupa Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Role Context Selector */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Otoritas Peran (RBAC Role Context)</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              >
                <option value="ESTATE_MANAGER">Estate Manager (EM)</option>
                <option value="ASSISTANT_MANAGER">Assistant Manager / Asisten Afdeling</option>
                <option value="MANDOR">Mandor Lapangan / BKM Sync</option>
                <option value="SUPER_ADMIN">Super Admin System</option>
                <option value="DIRECTOR">Director / Executive Owner</option>
                <option value="FINANCE">Finance & Costing Auditor</option>
              </select>
            </div>

            {/* 2FA input if required */}
            {require2FA && (
              <div>
                <label className="block text-amber-300 font-bold mb-1">Kode 2FA Authenticator (6 Digit)</label>
                <input
                  type="text"
                  maxLength={6}
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="123456"
                  className="w-full rounded-xl border border-amber-500 bg-slate-950/80 px-3 py-2 text-amber-300 font-mono text-center text-lg tracking-widest focus:outline-none"
                />
              </div>
            )}

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Ingat Sesi Perangkat Ini</span>
              </label>

              <button
                type="button"
                onClick={onOpenLicenseActivate}
                className="text-amber-300 hover:underline flex items-center gap-1 font-semibold text-[11px]"
              >
                <Key className="h-3 w-3" /> Aktivasi Lisensi
              </button>
            </div>

            {/* Login Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-extrabold text-sm hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-950 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Memverifikasi Akses Enterprise...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard Perkebunan</span>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="border-t border-slate-800 pt-3 flex items-center justify-between text-[10px] text-slate-500">
            <span>{whiteLabel.copyright}</span>
            <span>v2.6 Enterprise Cloud</span>
          </div>
        </div>
      </div>
    </div>
  );
};
