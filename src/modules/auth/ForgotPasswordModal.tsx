import React, { useState } from 'react';
import { KeyRound, Mail, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 text-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-bold text-sm">
            <KeyRound className="h-5 w-5 text-emerald-400" />
            <span>Reset Password Pengguna</span>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded">
            <X className="h-4 w-4" />
          </button>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <p className="text-slate-300 leading-relaxed">
              Masukkan alamat email terdaftar perusahaan Anda. Tautan reset kata sandi aman akan dikirimkan oleh sistem server PalmVision AI.
            </p>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Perusahaan</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="manager@sawitnusantara.co.id"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 disabled:opacity-50"
              >
                {isLoading ? 'Mengirim Link...' : 'Kirim Link Reset'}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-3 py-4 text-xs">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Tautan Reset Terkirim!</h3>
            <p className="text-slate-300">
              Instruksi reset password telah dikirim ke <strong className="text-emerald-400">{email}</strong>. Periksa kotak masuk atau folder spam Anda.
            </p>
            <button
              onClick={onClose}
              className="mt-2 w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500"
            >
              Kembali ke Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
