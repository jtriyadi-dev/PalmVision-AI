import React, { useState } from 'react';
import { RefreshCw, Database, Wifi, WifiOff, CheckCircle2, AlertTriangle, Play, ShieldAlert, Layers } from 'lucide-react';
import { OfflineSyncQueueItem } from '../types';

interface OfflineSyncCenterViewProps {
  queueItems: OfflineSyncQueueItem[];
  onTriggerSync: () => void;
}

export const OfflineSyncCenterView: React.FC<OfflineSyncCenterViewProps> = ({
  queueItems,
  onTriggerSync,
}) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onTriggerSync();
      alert('Proses Auto-Sync berhasil diselesaikan. Semua queue offline terkirim ke server!');
    }, 1500);
  };

  const pendingCount = queueItems.filter((q) => q.syncStatus === 'Pending').length;
  const successCount = queueItems.filter((q) => q.syncStatus === 'Success').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Overview */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center font-bold text-white shadow-lg">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Offline First & Sync Center Management
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  IndexedDB Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pusat rekonsiliasi data dan antrian sinkronisasi otomatis dari perangkat HP Mandor di area blindspot
              </p>
            </div>
          </div>

          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Memproses Sync...' : 'Jalankan Synchronization Now'}</span>
          </button>
        </div>

        {/* Sync KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block">Pending Sync Queue</span>
            <span className="text-xl font-black text-amber-400">{pendingCount} Item</span>
            <span className="text-[10px] text-slate-400 block">Menunggu Koneksi 4G</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block">Berhasil Tersimpan Server</span>
            <span className="text-xl font-black text-emerald-400">{successCount} Item</span>
            <span className="text-[10px] text-slate-400 block">Status Terverifikasi</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block">Konflik Data (Resolution)</span>
            <span className="text-xl font-black text-slate-200">0 Item</span>
            <span className="text-[10px] text-emerald-400 block">Auto Conflict Solved</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
            <span className="text-slate-400 text-[10px] font-bold block">Total Penyimpanan Lokal</span>
            <span className="text-xl font-black text-blue-400">2.27 MB</span>
            <span className="text-[10px] text-slate-400 block">Kapasitas Maks 50 MB</span>
          </div>
        </div>
      </div>

      {/* Sync Queue List Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3 font-bold">Entitas & Judul Record</th>
              <th className="px-4 py-3 font-bold">Waktu Dibuat di HP</th>
              <th className="px-4 py-3 font-bold">Ukuran Payload</th>
              <th className="px-4 py-3 font-bold">Percobaan Retry</th>
              <th className="px-4 py-3 font-bold">Status Sinkronisasi</th>
              <th className="px-4 py-3 font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {queueItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                  <div>{item.title}</div>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold inline-block mt-0.5">
                    {item.entityType}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-slate-500">
                  {new Date(item.createdAtLocal).toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-3.5 font-mono font-bold text-slate-700 dark:text-slate-300">
                  {item.payloadSizeKb} KB
                </td>
                <td className="px-4 py-3.5 text-slate-500 font-bold">{item.retryCount}x Retry</td>
                <td className="px-4 py-3.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.syncStatus === 'Success'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                        : item.syncStatus === 'Pending'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                        : 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                    }`}
                  >
                    {item.syncStatus}
                  </span>
                  {item.errorMessage && (
                    <span className="block text-[10px] text-amber-600 mt-0.5">{item.errorMessage}</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <button
                    onClick={() => alert(`Paksa re-sync item ${item.title}`)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] cursor-pointer"
                  >
                    Sync Item
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
