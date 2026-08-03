import React, { useState } from 'react';
import { Key, ShieldCheck, Smartphone, RefreshCw, Plus, Trash2, Edit3, Lock, CheckCircle2, AlertTriangle, Cpu } from 'lucide-react';
import { LicenseInfo, BoundDevice } from '../../types';

interface LicenseDashboardViewProps {
  license: LicenseInfo;
  onUpdateLicense: (updated: LicenseInfo) => void;
}

export const LicenseDashboardView: React.FC<LicenseDashboardViewProps> = ({
  license,
  onUpdateLicense,
}) => {
  const [devices, setDevices] = useState<BoundDevice[]>([
    {
      id: 'dev-01',
      deviceName: 'HP Samsung Galaxy Tab Mandor 01',
      hwid: 'HWID-3891-8910-4491-SNJ',
      os: 'Android 14',
      browser: 'PWA PalmVision App',
      registeredAt: '2026-01-10 09:00:00',
      lastUsedAt: '2026-08-03 08:05:10',
      status: 'ACTIVE',
      ipAddress: '10.20.18.102',
      mandorName: 'Budiarto (Mandor 01)',
    },
    {
      id: 'dev-02',
      deviceName: 'Tablet iPad Asisten Afdeling Alpha',
      hwid: 'HWID-1092-2901-5501-SNJ',
      os: 'iPadOS 17',
      browser: 'Safari Mobile',
      registeredAt: '2026-02-01 10:30:00',
      lastUsedAt: '2026-08-02 16:45:00',
      status: 'ACTIVE',
      ipAddress: '10.20.14.88',
      mandorName: 'Ahmad Ridwan (Asisten)',
    },
    {
      id: 'dev-03',
      deviceName: 'Workstation Estate Manager PC',
      hwid: 'HWID-9901-8812-3301-SNJ',
      os: 'Windows 11 Pro',
      browser: 'Chrome 126',
      registeredAt: '2026-01-05 08:00:00',
      lastUsedAt: '2026-08-03 08:14:22',
      status: 'ACTIVE',
      ipAddress: '10.20.10.15',
      mandorName: 'Suhardi (EM)',
    },
  ]);

  const [inputLicenseKey, setInputLicenseKey] = useState(license.licenseKey);
  const [verifying, setVerifying] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleVerifyLicense = async () => {
    setVerifying(true);
    setMsg(null);
    try {
      const res = await fetch('/api/v1/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: inputLicenseKey }),
      });
      const data = await res.json();
      if (data.valid) {
        setMsg('Lisensi Terverifikasi Server Cloud!');
        onUpdateLicense({
          ...license,
          licenseKey: data.licenseKey,
          status: 'ACTIVE',
          type: data.type,
          customerName: data.customer,
        });
      } else {
        setMsg('Lisensi Tidak Valid.');
      }
    } catch (e) {
      setMsg('Gagal terhubung ke server lisensi.');
    } finally {
      setVerifying(false);
    }
  };

  const handleToggleDeviceStatus = (id: string) => {
    setDevices(
      devices.map((d) =>
        d.id === id
          ? { ...d, status: d.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : d
      )
    );
  };

  const handleRemoveDevice = (id: string) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Key className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">License Dashboard & Device Binding Management</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Manajemen Lisensi Produk, Hardware ID Fingerprint, Grace Period & Registrasi Perangkat Lapangan
            </p>
          </div>
        </div>
      </div>

      {/* License Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white shadow-xl space-y-2">
          <div className="flex items-center justify-between text-amber-300 font-bold">
            <span className="uppercase tracking-wider text-[10px]">Product License Status</span>
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="text-xl font-black">{license.type}</div>
          <p className="text-slate-300 text-[11px]">Pelanggan: {license.customerName}</p>
          <div className="pt-2 flex justify-between items-center text-[10px]">
            <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 font-bold">{license.status}</span>
            <span className="text-amber-300 font-mono font-bold">{license.daysRemaining} Hari Tersisa</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-semibold">
            <span>Perangkat Terdaftar (Device Limits)</span>
            <Smartphone className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {devices.length} <span className="text-xs text-slate-500">/ {license.maxDevices || 10} Device</span>
          </div>
          <p className="text-slate-500 text-[11px]">Hardware ID Bound & Fingerprint Security Active</p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 font-semibold">
            <span>Offline Grace Period</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {license.gracePeriodDays} <span className="text-xs text-slate-500">Hari Tanpa Sinyal</span>
          </div>
          <p className="text-slate-500 text-[11px]">Mendukung Transaksi BKM Offline di Kebun Sawit</p>
        </div>
      </div>

      {/* Online License Verification Box */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Aktivasi & Verifikasi Server Lisensi</h3>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={inputLicenseKey}
            onChange={(e) => setInputLicenseKey(e.target.value)}
            className="flex-1 min-w-[280px] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-mono text-slate-900 dark:text-slate-100"
          />
          <button
            onClick={handleVerifyLicense}
            disabled={verifying}
            className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {verifying ? 'Memverifikasi...' : 'Verifikasi Cloud'}
          </button>
        </div>
        {msg && <p className="font-bold text-emerald-600 dark:text-emerald-400">{msg}</p>}
      </div>

      {/* Device Binding Table */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-emerald-600" /> Perangkat HP Mandor / Tablet Terikat (Device Binding)
          </h3>
          <button className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-200">
            <Plus className="h-3.5 w-3.5" /> Registrasi Device Baru
          </button>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Nama Perangkat</th>
                <th className="p-3">Pengguna / Mandor</th>
                <th className="p-3">HWID Fingerprint</th>
                <th className="p-3">OS / Browser</th>
                <th className="p-3">Terakhir Digunakan</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
              {devices.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{d.deviceName}</td>
                  <td className="p-3">{d.mandorName}</td>
                  <td className="p-3 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">{d.hwid}</td>
                  <td className="p-3 text-slate-500">{d.os} • {d.browser}</td>
                  <td className="p-3 text-slate-500 font-mono text-[11px]">{d.lastUsedAt}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.status === 'ACTIVE'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleToggleDeviceStatus(d.id)}
                      className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]"
                    >
                      {d.status === 'ACTIVE' ? 'Suspend' : 'Aktifkan'}
                    </button>
                    <button
                      onClick={() => handleRemoveDevice(d.id)}
                      className="p-1 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 hover:bg-rose-200"
                      title="Hapus Binding"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
