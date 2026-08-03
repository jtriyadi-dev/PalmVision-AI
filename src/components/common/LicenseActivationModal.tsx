import React, { useState } from 'react';
import { Key, ShieldCheck, X, RefreshCw, CheckCircle2 } from 'lucide-react';
import { LicenseInfo } from '../../types';

interface LicenseActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  license: LicenseInfo;
  onUpdateLicense: (updated: LicenseInfo) => void;
}

export const LicenseActivationModal: React.FC<LicenseActivationModalProps> = ({
  isOpen,
  onClose,
  license,
  onUpdateLicense,
}) => {
  const [inputKey, setInputKey] = useState(license.licenseKey);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleVerify = async () => {
    setIsLoading(true);
    setMsg(null);

    try {
      const res = await fetch('/api/v1/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: inputKey }),
      });
      const data = await res.json();

      if (data.valid) {
        setMsg('Lisensi Berhasil Terverifikasi & Aktif!');
        onUpdateLicense({
          ...license,
          licenseKey: data.licenseKey,
          status: 'ACTIVE',
          type: data.type,
          customerName: data.customer,
        });
      } else {
        setMsg('Kunci Lisensi Tidak Valid.');
      }
    } catch (e) {
      setMsg('Gagal memproses verifikasi lisensi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-emerald-500/30 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-base">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>Product License Activation</span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200">
          <div className="font-bold">PalmVision AI Enterprise License</div>
          <div>Pelanggan: {license.customerName}</div>
          <div>Masa Berlaku: {license.expiresAt} ({license.daysRemaining} Hari)</div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Serial Product Key (PVAI-ENT-XXXX)
          </label>
          <input
            type="text"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-mono text-slate-800 dark:text-slate-100"
          />
        </div>

        {msg && <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{msg}</div>}

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700">
            Tutup
          </button>
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 disabled:opacity-50"
          >
            {isLoading ? 'Verifikasi...' : 'Aktivasi Lisensi'}
          </button>
        </div>
      </div>
    </div>
  );
};
