import React, { useState } from 'react';
import { Settings, Save, Database, Shield, Wifi, Bell, Cpu, CheckCircle2 } from 'lucide-react';

export const SystemSettingsView: React.FC = () => {
  const [offlineSyncInterval, setOfflineSyncInterval] = useState('15');
  const [enable2FA, setEnable2FA] = useState(true);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState('85');
  const [backupSchedule, setBackupSchedule] = useState('DAILY');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Pengaturan Sistem & Konfigurasi Field Engine</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Konfigurasi Sync Interval PWA, Ambang Akurasi Gemini AI, Security Policy & Backup Database
            </p>
          </div>
        </div>

        {savedMsg && (
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Pengaturan Tersimpan!
          </span>
        )}
      </div>

      <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Wifi className="h-4 w-4 text-emerald-600" /> Pengaturan Offline Field Engine & Sync
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Interval Auto-Sync Lapangan (Menit)
              </label>
              <select
                value={offlineSyncInterval}
                onChange={(e) => setOfflineSyncInterval(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-medium text-slate-900 dark:text-slate-100"
              >
                <option value="5">Setiap 5 Menit (High Traffic)</option>
                <option value="15">Setiap 15 Menit (Standar Kebun)</option>
                <option value="30">Setiap 30 Menit (Hemat Baterai)</option>
                <option value="60">Setiap 1 Jam</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Jadwal Otomatis Backup Database
              </label>
              <select
                value={backupSchedule}
                onChange={(e) => setBackupSchedule(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-medium text-slate-900 dark:text-slate-100"
              >
                <option value="HOURLY">Setiap Jam (Incremental)</option>
                <option value="DAILY">Harian Jam 00:00 WIB (Rekomendasi)</option>
                <option value="WEEKLY">Mingguan Hari Minggu</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-600" /> Ambang Akurasi Model Gemini 3.6 AI
            </h3>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Minimum Confidence Threshold Deteksi Kematangan TBS (%): {aiConfidenceThreshold}%
              </label>
              <input
                type="range"
                min="50"
                max="98"
                value={aiConfidenceThreshold}
                onChange={(e) => setAiConfidenceThreshold(e.target.value)}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Akurasi di bawah {aiConfidenceThreshold}% akan ditandai untuk re-kualifikasi mandor.
              </p>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enable2FA}
                  onChange={(e) => setEnable2FA(e.target.checked)}
                  className="rounded border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Wajibkan Autentikasi 2FA untuk Level Estate Manager & Direksi
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="h-4 w-4" />
            <span>Simpan Pengaturan Sistem</span>
          </button>
        </div>
      </form>
    </div>
  );
};
