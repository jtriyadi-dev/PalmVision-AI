import React, { useState } from 'react';
import {
  Trees,
  Lock,
  Mail,
  UserCheck,
  Building2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  X,
  Eye,
  EyeOff,
  Briefcase,
  KeyRound
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; role: string; email: string; estate: string }) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('director@palmvision.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'ceo' | 'estate' | 'mill' | 'cfo' | 'gis'>('ceo');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const roles = [
    {
      id: 'ceo',
      title: 'Executive Director / CEO',
      name: 'Bpk. Hendra Kusuma, M.B.A.',
      email: 'h.kusuma@nusantarapalm.co.id',
      estate: 'Holding Headquarters (Jakarta)',
      roleLabel: 'Group CEO & Managing Director'
    },
    {
      id: 'estate',
      title: 'General Estate Manager',
      name: 'Ir. Budi Santoso, S.P.',
      email: 'budi.santoso@nusantarapalm.co.id',
      estate: 'Kebun Riau Central (Zone 1)',
      roleLabel: 'Senior Estate Manager'
    },
    {
      id: 'mill',
      title: 'Palm Oil Mill (PKS) Manager',
      name: 'Suryadi, S.T. (Mill Lead)',
      email: 'suryadi.mill@nusantarapalm.co.id',
      estate: 'PKS Tapung Hilir (60 Ton/Jam)',
      roleLabel: 'Head of Mill Operations'
    },
    {
      id: 'cfo',
      title: 'Chief Financial Officer (CFO)',
      name: 'Ibu Ratna Dewi, S.E., Ak.',
      email: 'ratna.dewi@nusantarapalm.co.id',
      estate: 'Finance & CPO Commercial Div.',
      roleLabel: 'CFO & Enterprise Commercials'
    },
    {
      id: 'gis',
      title: 'AGRI & GIS AI Specialist',
      name: 'Dr. Agus Wijaya (Agronomist)',
      email: 'agus.gis@nusantarapalm.co.id',
      estate: 'Drone & Remote Sensing Lab',
      roleLabel: 'Lead GIS & Drone Analyst'
    }
  ];

  const handleSelectRole = (roleId: 'ceo' | 'estate' | 'mill' | 'cfo' | 'gis') => {
    setSelectedRole(roleId);
    const matched = roles.find(r => r.id === roleId);
    if (matched) {
      setEmail(matched.email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const activeRoleObj = roles.find(r => r.id === selectedRole) || roles[0];
      onLoginSuccess({
        name: activeRoleObj.name,
        role: activeRoleObj.roleLabel,
        email: activeRoleObj.email,
        estate: activeRoleObj.estate
      });
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side Banner: Branding & Demo Quick Presets */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-800">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-emerald-500/20">
                <Trees className="h-6 w-6 text-slate-950" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block leading-tight">
                  PalmVision <span className="text-emerald-400">AI</span>
                </span>
                <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider block">
                  Enterprise Secure Portal
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase text-slate-400 tracking-wider block">
                Pilih Akses Demostrasi Instant (1-Click Login):
              </span>

              <div className="space-y-2">
                {roles.map(r => {
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleSelectRole(r.id as any)}
                      className={`w-full text-left p-3 rounded-2xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <span className="font-bold block text-white">{r.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono block">{r.name}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>256-Bit SSL Encrypted SSO Integration with Multi-Tenant Enterprise Security.</span>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-center space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-bold border border-emerald-500/20 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>PalmVision Enterprise Identity v2.4</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">Masuk Sistem PalmVision AI</h3>
            <p className="text-xs text-slate-400 mt-1">
              Masukkan kredensial korporat Anda untuk mengakses dashboard manajemen kebun dan PKS.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Email Korporat / ID Pengguna</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="user@nusantarapalm.co.id"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Kata Sandi (Password)</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  placeholder="••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-0" />
                <span>Ingat Sesi Saya</span>
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Instruksi reset password telah dikirim ke email administrator IT Anda.'); }} className="text-emerald-400 hover:underline">
                Lupa Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <span>Memverifikasi Akses Enterprise...</span>
              ) : (
                <>
                  <span>Masuk Sistem Sekarang</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-400">
              <Building2 className="h-3.5 w-3.5" />
              <span>Akses Aktif Terkoneksi:</span>
            </div>
            <p className="font-mono text-slate-300">
              {roles.find(r => r.id === selectedRole)?.estate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
