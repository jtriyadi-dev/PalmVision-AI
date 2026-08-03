import React, { useState } from 'react';
import {
  Clock,
  Award,
  TrendingUp,
  Search,
  Plus,
  Layers,
  Sparkles,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { PlantAgeCategoryInfo, PlantVarietyMaster } from '../types';

interface PlantAgeVarietyViewProps {
  ageCategories: PlantAgeCategoryInfo[];
  varieties: PlantVarietyMaster[];
  activeSubTab: string;
}

export const PlantAgeVarietyView: React.FC<PlantAgeVarietyViewProps> = ({
  ageCategories,
  varieties,
  activeSubTab,
}) => {
  const [subTab, setSubTab] = useState<'age' | 'variety'>(
    activeSubTab === 'plant-variety' ? 'variety' : 'age'
  );

  const [searchQuery, setSearchQuery] = useState('');

  const filteredVarieties = varieties.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.varietyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.breederName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('age')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'age'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Monitoring Umur Tanaman ({ageCategories.length} Kategori)
          </button>
          <button
            onClick={() => setSubTab('variety')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'variety'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Master Varietas Unggul ({varieties.length})
          </button>
        </div>

        {subTab === 'variety' && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari varietas/produsen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              onClick={() => alert('Tambah Varietas Baru Siap Digunakan')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Varietas</span>
            </button>
          </div>
        )}
      </div>

      {/* SUB TAB 1: PLANT AGE MONITORING */}
      {subTab === 'age' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ageCategories.map((cat) => (
              <div
                key={cat.key}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold">
                    {cat.rangeYears}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{cat.percentage}% Populasi</span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">{cat.label}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{cat.description}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Jumlah Pohon:</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {cat.count.toLocaleString('id-ID')} Pokok
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: VARIETY MASTER */}
      {subTab === 'variety' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVarieties.map((varItem) => (
            <div
              key={varItem.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                    {varItem.varietyCode}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                    {varItem.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Produsen / Pemulia: <span className="font-bold text-slate-700 dark:text-slate-300">{varItem.breederName}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                  <span className="text-slate-400 block text-[10px]">Potensi TBS</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {varItem.yieldPotentialTonHa} <span className="text-[10px] font-normal">Ton/Ha</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                  <span className="text-slate-400 block text-[10px]">Rendemen (OER)</span>
                  <span className="font-black text-teal-600 dark:text-teal-400 text-sm">
                    {varItem.oilExtractionRatePct}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                  <span className="text-slate-400 block text-[10px]">Mulai Panen</span>
                  <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm">
                    Bln {varItem.harvestStartMonth}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">Habitus Tumbuh:</span> {varItem.growthHabit}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">Ketahanan Spesifik:</span> {varItem.resistanceTraits}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
