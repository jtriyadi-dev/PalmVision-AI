import React, { useState } from 'react';
import { Calendar, Trees, Plus, Search, CheckCircle2, User, MapPin, FileText } from 'lucide-react';
import { PlantingProgramItem, PlantingExecutionRecord } from '../types';

interface PlantingProgramViewProps {
  programs: PlantingProgramItem[];
  plantings: PlantingExecutionRecord[];
}

export const PlantingProgramView: React.FC<PlantingProgramViewProps> = ({
  programs,
  plantings,
}) => {
  const [tab, setTab] = useState<'program' | 'history'>('program');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrograms = programs.filter(
    (p) =>
      p.programCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.programName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.blockCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlantings = plantings.filter(
    (pl) =>
      pl.plantingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pl.varietyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pl.blockCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab bar & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('program')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'program'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Program Penanaman ({programs.length})
          </button>
          <button
            onClick={() => setTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'history'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Riwayat Eksekusi Tanam ({plantings.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari program/varietas/blok..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => alert(`Input Entry Baru ${tab === 'program' ? 'Program' : 'Tanam'}`)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Record</span>
          </button>
        </div>
      </div>

      {tab === 'program' && (
        <div className="space-y-4">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                      {prog.programCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                      {prog.blockCode}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                    {prog.programName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {prog.estateName} • {prog.afdelingName}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                  {prog.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                  <span>Progres Tanam: {prog.progressPct}%</span>
                  <span>Target: {prog.targetTrees.toLocaleString('id-ID')} Pokok ({prog.targetAreaHa} Ha)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${prog.progressPct}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>PIC: {prog.picName}</span>
                <span>Periode: {prog.startDate} s/d {prog.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'history' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlantings.map((pl) => (
            <div
              key={pl.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                    {pl.plantingCode}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                    {pl.blockCode} • {pl.subBlockCode}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                    Varietas: {pl.varietyName}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                  {pl.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Jumlah Ditanam</span>
                  <span className="font-bold text-slate-900 dark:text-white">{pl.quantityPlanted.toLocaleString('id-ID')} Pokok</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Kerapatan SPH</span>
                  <span className="font-bold text-slate-900 dark:text-white">{pl.sphDensity} SPH</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Mandor: {pl.mandorName} ({pl.teamName})</span>
                <span>{pl.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
