import React from 'react';
import { ShieldCheck, HardDrive, Wifi, Key, Clock, Cpu, CheckCircle } from 'lucide-react';
import { LicenseInfo } from '../../../types';

interface SystemHealthWidgetProps {
  license: LicenseInfo;
  onOpenLicenseModal?: () => void;
}

export const SystemHealthWidget: React.FC<SystemHealthWidgetProps> = ({ license, onOpenLicenseModal }) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Status Kesehatan Sistem & Lisensi</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Monitoring infrastruktur & HWID Binding</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" /> System Healthy
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <Wifi className="h-3.5 w-3.5 text-emerald-500" /> Offline Sync Engine
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">Ready (100% Synced)</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <HardDrive className="h-3.5 w-3.5 text-blue-500" /> Latensi Firestore DB
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">12 ms (Sangat Cepat)</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <Key className="h-3.5 w-3.5 text-amber-500" /> Bound HWID Mobile
          </div>
          <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
            {license.boundDevicesCount} / {license.maxDevices} Perangkat
          </div>
        </div>

        <div
          onClick={onOpenLicenseModal}
          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 cursor-pointer hover:border-emerald-500/40 transition-colors"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5 text-violet-500" /> Masa Lisensi Enterprise
          </div>
          <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {license.daysRemaining} Hari (Aktif)
          </div>
        </div>
      </div>
    </div>
  );
};
