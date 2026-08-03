import React from 'react';
import {
  Trees,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  Sparkles,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ChevronRight,
  Sprout,
} from 'lucide-react';
import { PlantPopulationMetrics, PlantAgeCategoryInfo } from '../types';

interface PlantationDashboardViewProps {
  metrics: PlantPopulationMetrics;
  ageCategories: PlantAgeCategoryInfo[];
  onNavigateSubTab: (subTab: string) => void;
}

export const PlantationDashboardView: React.FC<PlantationDashboardViewProps> = ({
  metrics,
  ageCategories,
  onNavigateSubTab,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 11 Core KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Total Luas Kebun</span>
            <Trees className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {metrics.totalEstateHa.toLocaleString('id-ID')} <span className="text-xs font-semibold">Ha</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold">Tanam: {metrics.totalPlantedHa.toLocaleString('id-ID')} Ha</p>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Total Pop. Pohon</span>
            <Sprout className="h-4 w-4 text-teal-600" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {(metrics.totalPalmTrees / 1000000).toFixed(2)}M <span className="text-xs font-semibold">Pokok</span>
          </div>
          <p className="text-[10px] text-slate-500">{(metrics.totalPalmTrees).toLocaleString('id-ID')} Pokok Sensus</p>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Pohon TM Produktif</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
            {(metrics.productiveTreesTM / 1000000).toFixed(2)}M
          </div>
          <p className="text-[10px] text-slate-500">
            {((metrics.productiveTreesTM / metrics.totalPalmTrees) * 100).toFixed(1)}% TM Produksi
          </p>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Pohon TBM (Muda)</span>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-xl font-black text-blue-600 dark:text-blue-400">
            {(metrics.immatureTreesTBM / 1000).toFixed(0)}k <span className="text-xs font-semibold">Pokok</span>
          </div>
          <p className="text-[10px] text-slate-500">
            {((metrics.immatureTreesTBM / metrics.totalPalmTrees) * 100).toFixed(1)}% TBM
          </p>
        </div>

        {/* KPI 5 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Area Replanting</span>
            <RotateCcw className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400">
            {metrics.replantingHa} <span className="text-xs font-semibold">Ha</span>
          </div>
          <p className="text-[10px] text-amber-600 font-bold">Peremajaan Berjalan</p>
        </div>

        {/* KPI 6 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Pohon Mati (Mati)</span>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <div className="text-xl font-black text-red-600 dark:text-red-400">
            {metrics.deadTreesCount.toLocaleString('id-ID')}
          </div>
          <p className="text-[10px] text-red-500 font-bold">Perlu Sisipan (Gap)</p>
        </div>

        {/* KPI 7 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Titik Kosong</span>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </div>
          <div className="text-xl font-black text-orange-600 dark:text-orange-400">
            {metrics.missingTreesCount.toLocaleString('id-ID')}
          </div>
          <p className="text-[10px] text-slate-500">Belum Ada Tanaman</p>
        </div>

        {/* KPI 8 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Kerapatan SPH</span>
            <Activity className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {metrics.sphDensityAverage} <span className="text-xs font-semibold">SPH</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold">Target Standar: 136–143</p>
        </div>

        {/* KPI 9 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Gap Sisipan Pending</span>
            <RotateCcw className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-xl font-black text-purple-600 dark:text-purple-400">
            {metrics.gapPlantingPending}
          </div>
          <p className="text-[10px] text-purple-600 font-bold">Antrian Sisipan</p>
        </div>

        {/* KPI 10 & 11 Span 2 columns */}
        <div className="p-4 rounded-2xl bg-linear-to-br from-emerald-900 to-slate-900 text-white border border-emerald-800/40 shadow-xs space-y-1 col-span-2">
          <div className="flex items-center justify-between text-emerald-300">
            <span className="text-xs font-bold flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-emerald-400" /> AI Health Score Average
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              Prompt 6 Baseline
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-400">
            {metrics.healthScoreAverage} / 100
          </div>
          <p className="text-[11px] text-slate-300">
            Kesehatan Tajuk & Vegetasi Terpantau Baik di 92% Blok Kebun.
          </p>
        </div>
      </div>

      {/* Main Content Layout: Plant Age Distribution & AI Health Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plant Age Category Distribution List */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Distribusi Umur Tanaman & Profil Produksi
              </h3>
              <p className="text-xs text-slate-500">
                Segmentasi TBM, TM Muda, TM Prima, TM Tua, dan Target Peremajaan (Replanting)
              </p>
            </div>
            <button
              onClick={() => onNavigateSubTab('plant-age')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Detail Umur</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {ageCategories.map((cat) => (
              <div
                key={cat.key}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{cat.label}</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                      {cat.rangeYears}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {cat.count.toLocaleString('id-ID')} Pokok ({cat.percentage}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Health Foundation Card */}
        <div className="p-5 rounded-2xl bg-linear-to-b from-slate-900 via-slate-900 to-emerald-950 text-white border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">AI Health Monitoring</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              Foundation Active
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Sistem AI PalmVision mendeteksi pola kesehatan tanaman melalui analisis citra multispektral drone & satelit.
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
              <span className="text-emerald-400 font-bold block">1. Indikator Hama & Penyakit</span>
              <p className="text-slate-300 text-[11px]">
                Deteksi dini ancaman Ganoderma boninense, Oryctes rhinoceros, dan Defoliator Pelepah.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
              <span className="text-blue-400 font-bold block">2. Indikator Defisiensi Hara</span>
              <p className="text-slate-300 text-[11px]">
                Analisis kandungan Nitrogen, Kalium, Magnesium & Boron dari warna tajuk tanaman.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
              <span className="text-amber-400 font-bold block">3. Water Stress & NDWI Index</span>
              <p className="text-slate-300 text-[11px]">
                Monitoring tingkat kekeringan gambut & area rawan tergenang secara spasial.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateSubTab('ai-health')}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Buka Dashboard AI Health</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
