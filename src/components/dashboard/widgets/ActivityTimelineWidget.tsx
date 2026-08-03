import React, { useState } from 'react';
import { Activity, CheckCircle, ShieldAlert, Sparkles, User, Settings, FileCheck, Filter } from 'lucide-react';
import { ActivityLogItem } from '../../../types';

const INITIAL_ACTIVITIES: ActivityLogItem[] = [
  {
    id: 'act-1',
    timestamp: '10 menit yang lalu',
    user: 'Syaiful Anwar',
    role: 'ESTATE_MANAGER',
    type: 'APPROVE',
    title: 'Persetujuan BKM Panen Blok B12',
    description: 'Menyetujui BKM panen TBS sebesar 42.8 Ton di Afdeling Alpha.',
    module: 'Harvesting',
    estateName: 'Estate Teluk Dalam',
  },
  {
    id: 'act-2',
    timestamp: '25 menit yang lalu',
    user: 'Mandor Budi',
    role: 'MANDOR',
    type: 'CREATE',
    title: 'Input Timbangan TPH 04',
    description: 'Input data 180 janjang TBS via Android Field App (Offline Synced).',
    module: 'Field App',
    estateName: 'Estate Teluk Dalam',
  },
  {
    id: 'act-3',
    timestamp: '1 jam yang lalu',
    user: 'PalmVision AI Assistant',
    role: 'SUPER_ADMIN',
    type: 'AI_QUERY',
    title: 'Rekomendasi Pemupukan Urea Blok C09',
    description: 'Menghasilkan kalkulasi kebutuhan pupuk NPK 12-12-17-2 + TE sebanyak 8.4 Ton.',
    module: 'AI Diagnostics',
  },
  {
    id: 'act-4',
    timestamp: '2 jam yang lalu',
    user: 'Dedi Kurniawan',
    role: 'FINANCE',
    type: 'EXPORT',
    title: 'Export Laporan RKAP Q1 2026',
    description: 'Mencetak dokumen rekapitulasi biaya operasional estate ke format Excel.',
    module: 'Finance',
  },
  {
    id: 'act-5',
    timestamp: '4 jam yang lalu',
    user: 'Admin System',
    role: 'SUPER_ADMIN',
    type: 'SETTINGS',
    title: 'Pembaruan Konfigurasi White Label',
    description: 'Mengubah tema aksen warna utama dan logo footer holding.',
    module: 'System Settings',
  },
];

export const ActivityTimelineWidget: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredLogs = INITIAL_ACTIVITIES.filter((item) => {
    if (filterType === 'ALL') return true;
    return item.type === filterType;
  });

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Aktivitas Realtime & Audit Trail</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Jejak rekam transaksi & aktivitas pengguna</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs overflow-x-auto no-scrollbar">
          {[
            { id: 'ALL', label: 'Semua' },
            { id: 'APPROVE', label: 'Persetujuan' },
            { id: 'CREATE', label: 'Input Data' },
            { id: 'AI_QUERY', label: 'Aktivitas AI' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors shrink-0 ${
                filterType === f.id
                  ? 'bg-violet-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-3 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {filteredLogs.map((log) => (
          <div key={log.id} className="relative pl-9 flex items-start justify-between gap-3 group">
            {/* Timeline Dot Icon */}
            <div
              className={`absolute left-1.5 top-1 p-1.5 rounded-full border-2 border-white dark:border-slate-900 shadow-xs z-10 ${
                log.type === 'APPROVE'
                  ? 'bg-emerald-500 text-white'
                  : log.type === 'CREATE'
                  ? 'bg-blue-500 text-white'
                  : log.type === 'AI_QUERY'
                  ? 'bg-amber-500 text-white'
                  : 'bg-violet-500 text-white'
              }`}
            >
              {log.type === 'APPROVE' && <CheckCircle className="h-3 w-3" />}
              {log.type === 'CREATE' && <FileCheck className="h-3 w-3" />}
              {log.type === 'AI_QUERY' && <Sparkles className="h-3 w-3" />}
              {log.type === 'EXPORT' && <Activity className="h-3 w-3" />}
              {log.type === 'SETTINGS' && <Settings className="h-3 w-3" />}
            </div>

            {/* Content Body */}
            <div className="flex-1 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 group-hover:border-violet-500/30 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{log.title}</span>
                <span className="text-[10px] text-slate-400 shrink-0">{log.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">{log.description}</p>
              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/80 text-[10px] text-slate-500">
                <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                  <User className="h-3 w-3 text-slate-400" /> {log.user} ({log.role})
                </span>
                <span className="px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-400">
                  {log.module}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
