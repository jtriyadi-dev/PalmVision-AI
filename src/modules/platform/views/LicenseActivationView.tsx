import React, { useState } from 'react';
import {
  Key,
  ShieldCheck,
  Cpu,
  QrCode,
  Laptop,
  Smartphone,
  RefreshCw,
  Plus,
  Copy,
  Check,
  AlertTriangle,
  Lock,
  Download,
  CheckCircle2
} from 'lucide-react';
import { mockLicenses, mockDevices } from '../mockData';
import { LicenseKey, ActivatedDevice } from '../types';

export const LicenseActivationView: React.FC = () => {
  const [licenses, setLicenses] = useState<LicenseKey[]>(mockLicenses);
  const [devices, setDevices] = useState<ActivatedDevice[]>(mockDevices);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleGenerateLicense = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      const newLicense: LicenseKey = {
        id: `lic-${Date.now()}`,
        licenseKey: `PVAI-ENTPRO-${Math.floor(1000 + Math.random() * 9000)}-2026-X880`,
        edition: 'ENTERPRISE_PRO',
        tenantId: 'ten-001',
        companyName: 'PT Sampoerna Agro Tbk',
        deviceLimit: 50,
        userLimit: 500,
        activatedDevicesCount: 0,
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: '2027-08-03',
        status: 'ACTIVE',
        offlineActivationSupported: true,
        hardwareFingerprintRequired: true
      };
      setLicenses([newLicense, ...licenses]);
      setIsGeneratingKey(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              License & Device Security Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Enterprise License Keys & Hardware Fingerprinting</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Issue cryptographically signed license keys, offline activation payloads, and bind devices via CPU/MAC hardware hashes.
          </p>
        </div>

        <button
          onClick={handleGenerateLicense}
          disabled={isGeneratingKey}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          <span>{isGeneratingKey ? 'Cryptographically Signing...' : 'Issue New License Key'}</span>
        </button>
      </div>

      {/* License Keys Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {licenses.map(lic => (
          <div key={lic.id} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                {lic.edition}
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {lic.status}
              </span>
            </div>

            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold">Tenant Company</div>
              <div className="text-sm font-bold text-white">{lic.companyName}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between font-mono text-xs text-amber-300">
              <span className="truncate max-w-[200px]">{lic.licenseKey}</span>
              <button
                onClick={() => handleCopy(lic.licenseKey)}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                {copiedKey === lic.licenseKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-slate-700/80 pt-3">
              <div>
                <span className="text-[10px] text-slate-400 block">Bound Devices</span>
                <span className="font-bold text-white">{lic.activatedDevicesCount} / {lic.deviceLimit}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Expiration</span>
                <span className="font-bold text-slate-200">{lic.expiryDate}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button className="text-[11px] text-indigo-400 font-bold hover:underline flex items-center gap-1">
                <QrCode className="h-3.5 w-3.5" />
                Offline License QR Payload
              </button>
              <button className="text-[11px] text-slate-400 hover:text-white">Download Cert</button>
            </div>
          </div>
        ))}
      </div>

      {/* Activated Hardware Devices Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Bound Hardware Devices Registry</h3>
            <p className="text-xs text-slate-400">Device fingerprint hashes verified against RSA-2048 public cert</p>
          </div>
          <span className="text-xs text-amber-400 font-bold font-mono">3 Active Device Licenses</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-[11px] uppercase font-semibold border-b border-slate-700">
                <th className="py-3.5 px-4">Device ID & Name</th>
                <th className="py-3.5 px-4">Platform</th>
                <th className="py-3.5 px-4">Hardware Fingerprint Hash</th>
                <th className="py-3.5 px-4">IP Address</th>
                <th className="py-3.5 px-4">Last Sync</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Revoke</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {devices.map(dev => (
                <tr key={dev.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div>{dev.deviceName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{dev.deviceId}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {dev.platform}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-amber-300 text-[11px]">
                    {dev.fingerprintHash}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{dev.ipAddress}</td>
                  <td className="py-3.5 px-4 text-slate-400">{dev.lastActive}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      {dev.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition font-bold text-[10px]">
                      Revoke
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
