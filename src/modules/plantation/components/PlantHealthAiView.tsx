import React, { useState } from 'react';
import {
  Activity,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  Sprout,
  TrendingUp,
  Brain,
  ShieldCheck,
  Search,
  Plus,
  Zap,
} from 'lucide-react';
import { PlantHealthRecord, AiHealthFoundationRecord } from '../types';

interface PlantHealthAiViewProps {
  healthRecords: PlantHealthRecord[];
  aiFoundations: AiHealthFoundationRecord[];
  activeSubTab: string;
}

export const PlantHealthAiView: React.FC<PlantHealthAiViewProps> = ({
  healthRecords,
  aiFoundations,
  activeSubTab,
}) => {
  const [subTab, setSubTab] = useState<'ai' | 'manual'>(
    activeSubTab === 'plant-health' ? 'manual' : 'ai'
  );

  const [searchQuery, setSearchQuery] = useState('');

  const filteredHealth = healthRecords.filter(
    (h) =>
      h.healthCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.primarySymptom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAi = aiFoundations.filter(
    (ai) =>
      ai.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ai.estateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header tab */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('ai')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              subTab === 'ai'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="h-4 w-4 text-emerald-300" />
            <span>AI Health Monitoring Foundation ({aiFoundations.length})</span>
          </button>
          <button
            onClick={() => setSubTab('manual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'manual'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Inspeksi Kesehatan Manual ({healthRecords.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari blok..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* SUB TAB 1: AI HEALTH MONITORING FOUNDATION */}
      {subTab === 'ai' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-linear-to-r from-emerald-950 via-slate-900 to-slate-900 text-white border border-emerald-800/40 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                <Brain className="h-3.5 w-3.5" />
                <span>AI Health Model Baseline • Prompt 6 Foundation</span>
              </div>
              <h3 className="font-bold text-sm">
                Struktur data siap dihubungkan dengan AI Multispectral Drone, Satelit Sentinel, & Sensor IoT Suhu/Kelembaban.
              </h3>
            </div>
            <button
              onClick={() => alert('Jadwalkan Analisis AI Ulang')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
            >
              <Zap className="h-4 w-4" />
              <span>Jadwalkan AI Drone Scan</span>
            </button>
          </div>

          <div className="space-y-6">
            {filteredAi.map((ai) => (
              <div
                key={ai.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs">
                        Blok {ai.blockCode}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {ai.estateName}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Analisis AI Terakhir: {new Date(ai.lastAnalysedAt).toLocaleString('id-ID')}
                    </p>
                  </div>

                  {/* Health Score Gauge */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-center">
                      <span className="text-[10px] font-bold text-slate-500 block">Health Score</span>
                      <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                        {ai.healthScore} / 100
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-center">
                      <span className="text-[10px] font-bold text-slate-500 block">Risk Score</span>
                      <span className="text-xl font-black text-red-600 dark:text-red-400">
                        {ai.riskScore} / 100
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6 Core AI Feature Placeholders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Disease Placeholder */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs">
                    <span className="font-bold text-red-600 dark:text-red-400 block text-[11px] flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Disease Placeholder (Penyakit)
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Suspek: {ai.diseasePlaceholder.suspectedDisease}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      Probabilitas: {ai.diseasePlaceholder.probabilityPct}% | Area: {ai.diseasePlaceholder.affectedAreaEstHa} Ha
                    </p>
                  </div>

                  {/* Nutrient Placeholder */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[11px] flex items-center gap-1">
                      <Sprout className="h-3.5 w-3.5" />
                      Nutrient Deficiency Placeholder
                    </span>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300">
                      N: {ai.nutrientPlaceholder.nitrogenStatus} | K: {ai.nutrientPlaceholder.potassiumStatus}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Mg: {ai.nutrientPlaceholder.magnesiumStatus} | B: {ai.nutrientPlaceholder.boronStatus}
                    </p>
                  </div>

                  {/* Water Stress Placeholder */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs">
                    <span className="font-bold text-blue-600 dark:text-blue-400 block text-[11px] flex items-center gap-1">
                      <Droplets className="h-3.5 w-3.5" />
                      Water Stress Placeholder (NDWI)
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Level Stress: {ai.waterStressPlaceholder.stressLevel} ({ai.waterStressPlaceholder.index})
                    </p>
                    <p className="text-slate-500 text-[11px]">{ai.waterStressPlaceholder.recommendation}</p>
                  </div>

                  {/* Growth Prediction Placeholder */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs">
                    <span className="font-bold text-teal-600 dark:text-teal-400 block text-[11px] flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Growth Prediction Placeholder
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {ai.growthPredictionPlaceholder.predictedFrondGrowthPerMonth} Pelepah/Bulan
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      Tinggi: +{ai.growthPredictionPlaceholder.predictedStemHeightGrowthCmYear} cm/thn ({ai.growthPredictionPlaceholder.benchmarkStatus})
                    </p>
                  </div>

                  {/* Harvest Prediction Placeholder */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1 text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 block text-[11px] flex items-center gap-1">
                      <Activity className="h-3.5 w-3.5" />
                      Harvest Yield Prediction Placeholder
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Estimasi Panen Bln Depan: {ai.harvestPredictionPlaceholder.nextMonthYieldEstimateTon} Ton
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      Est. BJR: {ai.harvestPredictionPlaceholder.tbwEstimateKg} Kg | Puncak: {ai.harvestPredictionPlaceholder.peakHarvestMonth}
                    </p>
                  </div>

                  {/* AI Recommendation Placeholder */}
                  <div className="p-3.5 rounded-xl bg-emerald-950 text-white space-y-1 text-xs col-span-1 sm:col-span-2 lg:col-span-1">
                    <span className="font-bold text-emerald-300 block text-[11px] flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                      AI Action Recommendation
                    </span>
                    <p className="text-[11px] text-slate-200 leading-tight">
                      • Pupuk: {ai.aiRecommendationPlaceholder.fertilizerAction}
                    </p>
                    <p className="text-[11px] text-slate-200 leading-tight">
                      • Proteksi: {ai.aiRecommendationPlaceholder.pestProtectionAction}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: MANUAL PLANT HEALTH INSPECTION */}
      {subTab === 'manual' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Kode Health</th>
                  <th className="px-4 py-3 font-bold">Blok / Sampel</th>
                  <th className="px-4 py-3 font-bold">Status Kesehatan</th>
                  <th className="px-4 py-3 font-bold">Gejala Utama</th>
                  <th className="px-4 py-3 font-bold">Rencana Penanganan</th>
                  <th className="px-4 py-3 font-bold">Agronomis Penanggung Jawab</th>
                  <th className="px-4 py-3 font-bold">Inspeksi Terakhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredHealth.map((ph) => (
                  <tr key={ph.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">{ph.healthCode}</td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-emerald-600 block">{ph.blockCode}</span>
                      <span className="text-[10px] text-slate-400">{ph.treeSampleCode}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          ph.healthStatus === 'Excellent'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ph.healthStatus === 'Good'
                            ? 'bg-teal-100 text-teal-800'
                            : ph.healthStatus === 'Fair'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {ph.healthStatus} ({ph.affectedPct}% Terpengaruh)
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-medium">{ph.primarySymptom}</td>
                    <td className="px-4 py-3.5 text-slate-600">{ph.treatmentPlan}</td>
                    <td className="px-4 py-3.5 font-semibold">{ph.assignedAgronomist}</td>
                    <td className="px-4 py-3.5 text-slate-400">{ph.lastInspectionDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
