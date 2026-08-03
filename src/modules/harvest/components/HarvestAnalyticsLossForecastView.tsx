import React, { useState } from 'react';
import {
  TrendingUp,
  AlertOctagon,
  BarChart3,
  Calendar,
  Sparkles,
  ArrowUpRight,
  TrendingDown,
  Clock,
} from 'lucide-react';

import {
  HarvestProductivityRecord,
  HarvestLossRecord,
  HarvestForecastRecord,
} from '../types';

interface HarvestAnalyticsLossForecastViewProps {
  productivities: HarvestProductivityRecord[];
  losses: HarvestLossRecord[];
  forecasts: HarvestForecastRecord[];
}

export const HarvestAnalyticsLossForecastView: React.FC<HarvestAnalyticsLossForecastViewProps> = ({
  productivities,
  losses,
  forecasts,
}) => {
  const [activeTab, setActiveTab] = useState<'productivity' | 'loss' | 'forecast'>('productivity');

  const totalLossKg = losses.reduce((sum, l) => sum + l.estimatedLossKg, 0);
  const totalLossIdr = losses.reduce((sum, l) => sum + l.estimatedFinancialLossIdr, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Switch Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Harvest Yield, Productivity & Loss Intelligence
          </h2>
          <p className="text-xs text-slate-500">
            Analisis produktivitas pemanen, audit kehilang hasil (buah/brondolan tinggal), dan proyeksi hasil panen
          </p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('productivity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'productivity'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Produktivitas ({productivities.length})
          </button>
          <button
            onClick={() => setActiveTab('loss')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'loss'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Harvest Loss ({losses.length})
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'forecast'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Harvest Forecast ({forecasts.length})
          </button>
        </div>
      </div>

      {/* Productivity Tab */}
      {activeTab === 'productivity' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productivities.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                    {p.entityType} Analytics
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">{p.period}</span>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{p.entityName}</h3>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Produksi TBS:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      {p.tonnageProducedTon} Ton ({p.bunchesCount.toLocaleString('id-ID')} Janjang)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Rata-rata BJR:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{p.avgBjrKg} Kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Produktivitas Pemanen:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {p.productivityPerHarvesterTon} Ton / Hari
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Pencapaian vs Target:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                    <ArrowUpRight className="h-4 w-4" /> {p.achievementVsTargetPct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Harvest Loss Tab */}
      {activeTab === 'loss' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-800/40 text-rose-300 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 font-bold">
              <AlertOctagon className="h-5 w-5 text-rose-500" />
              <span>Ringkasan Kehilangan Hasil (Loss Summary)</span>
            </div>
            <div className="font-black text-sm">
              Total Loss: {totalLossKg} Kg (~Rp {totalLossIdr.toLocaleString('id-ID')})
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {losses.map((l) => (
              <div
                key={l.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{l.lossCode}</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 text-[10px] font-bold">
                    {l.category}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blok Kebun:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{l.blockCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimasi Kehilangan:</span>
                    <span className="font-black text-rose-600 dark:text-rose-400">
                      {l.estimatedLossKg} Kg (Rp {l.estimatedFinancialLossIdr.toLocaleString('id-ID')})
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-[11px] space-y-1">
                  <p className="text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-900 dark:text-white">Akar Masalah:</strong> {l.rootCause}
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400">
                    <strong>Tindakan Korektif:</strong> {l.correctiveAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Harvest Forecast Tab */}
      {activeTab === 'forecast' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm">
                <Sparkles className="h-5 w-5" />
                <span>Framework Prediksi Panen (Forecast Engine)</span>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-800">
                Ready for AI Model Training
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">7 HARI</span>
                <span className="font-bold text-white">245 Ton</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">30 HARI</span>
                <span className="font-bold text-white">980 Ton</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">90 HARI</span>
                <span className="font-bold text-white">2,940 Ton</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">6 BULAN</span>
                <span className="font-bold text-white">5,880 Ton</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-[10px] text-slate-400 block font-bold">1 TAHUN</span>
                <span className="font-bold text-white">11,760 Ton</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forecasts.map((f) => (
              <div
                key={f.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">
                    Proyeksi Periode {f.forecastPeriod}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold">
                    {f.confidenceScorePct}% Confidence
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Prediksi Hasil Tonase:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">
                      {f.predictedTonnageTon} Ton ({f.predictedBunches.toLocaleString('id-ID')} Janjang)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Indeks Kematangan Panen:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{f.harvestReadinessIndex}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
