import React, { useState } from 'react';
import { Activity, Search, Plus, Calendar, MapPin, CheckCircle2, User, Camera } from 'lucide-react';
import { DailyActivityRecord } from '../types';

interface DailyActivityViewProps {
  activities: DailyActivityRecord[];
  onAddActivity: (act: DailyActivityRecord) => void;
}

export const DailyActivityView: React.FC<DailyActivityViewProps> = ({
  activities,
  onAddActivity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      act.activityCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.mandorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.blockCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = categoryFilter === 'All' || act.category === categoryFilter;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kode / mandor / blok..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-hidden"
          >
            <option value="All">Semua Kategori Aktivitas</option>
            <option value="Pemupukan">Pemupukan</option>
            <option value="Penyemprotan">Penyemprotan</option>
            <option value="Pemangkasan">Pemangkasan</option>
            <option value="Pembersihan">Pembersihan</option>
            <option value="Drainase">Drainase</option>
            <option value="Perawatan Jalan">Perawatan Jalan</option>
          </select>
        </div>

        <button
          onClick={() => alert('Form Laporan Aktivitas Harian')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Input Aktivitas Harian</span>
        </button>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-extrabold">
                  {act.activityCode}
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                  {act.category} • {act.blockCode}
                </h3>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  act.isOfflineSynced
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                }`}
              >
                {act.isOfflineSynced ? 'Synced Server' : 'Offline Queue'}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
              {act.notes}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Volume Hasil</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{act.workVolume}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-slate-400 block text-[10px]">Pekerja & Jam</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {act.workersCount} Pekerja ({act.timeStart} - {act.timeEnd})
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-slate-400" />
                Mandor: {act.mandorName}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                {act.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
