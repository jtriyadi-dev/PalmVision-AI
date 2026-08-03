import React, { useState } from 'react';
import { Key, ShieldCheck, Cpu, HardDrive, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { LicenseInfo } from '../../types';

interface LicenseArchitectureViewProps {
  license: LicenseInfo;
  onUpdateLicense: (updated: LicenseInfo) => void;
}

export const LicenseArchitectureView: React.FC<LicenseArchitectureViewProps> = ({
  license,
  onUpdateLicense,
}) => {
  const [inputKey, setInputKey] = useState(license.licenseKey);
  const [hwid, setHwid] = useState('HWID-3891-8910-4491-SNJ');
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleValidateKey = async () => {
    setIsValidating(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/v1/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          licenseKey: inputKey,
          hwid,
        }),
      });

      const data = await res.json();

      if (data.valid) {
        setStatusMsg('Lisensi Berhasil Diverifikasi! Produk Komersial Aktif.');
        onUpdateLicense({
          ...license,
          licenseKey: data.licenseKey,
          status: 'ACTIVE',
          type: data.type,
          customerName: data.customer,
          expiresAt: data.expiresAt,
          daysRemaining: 512,
        });
      } else {
        setStatusMsg('Kunci Lisensi Tidak Valid atau Kadaluarsa.');
      }
    } catch (err) {
      setStatusMsg('Gagal menghubungi Server Lisensi.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleGenerateNewKey = () => {
    const randomKey = `PVAI-ENT-SNJ-${Math.floor(1000 + Math.random() * 9000)}-2027`;
    setInputKey(randomKey);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Key className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">8. Commercial License & Activation Architecture</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Serial Key Generation, Hardware Binding (HWID), and Offline Grace Period Verification Engine
            </p>
          </div>
        </div>
      </div>

      {/* Active License Status Banner */}
      <div className="p-5 rounded-2xl border border-emerald-900/10 dark:border-emerald-500/20 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
              {license.type}
            </span>
            <h3 className="text-lg font-bold mt-2">
              Customer: {license.customerName}
            </h3>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Status: <span className="font-extrabold text-amber-300">{license.status}</span> • Masa Berlaku: {license.expiresAt} ({license.daysRemaining} Hari Tersisa)
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-semibold text-emerald-200 block">Offline Grace Period</span>
            <span className="text-xl font-extrabold text-amber-300">{license.gracePeriodDays} Hari</span>
          </div>
        </div>
      </div>

      {/* License Key Validation Simulator */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Simulasi Verifikasi Kunci Lisensi & Fingerprint Perangkat
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Serial License Key Format (PVAI-ENT-XXXX)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-mono text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={handleGenerateNewKey}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600"
                title="Generate Serial Key Sample"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Hardware ID Fingerprint (HWID Binding)
            </label>
            <input
              type="text"
              readOnly
              value={hwid}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 px-3 py-2 font-mono text-slate-500 dark:text-slate-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleValidateKey}
            disabled={isValidating}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isValidating ? 'Memverifikasi...' : 'Verifikasi Lisensi Produk'}
          </button>

          {statusMsg && (
            <span
              className={`font-semibold ${
                statusMsg.includes('Berhasil') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'
              }`}
            >
              {statusMsg}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
