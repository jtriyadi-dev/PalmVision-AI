import React from 'react';
import {
  TrendingUp,
  Award,
  Truck,
  Users,
  Clock,
  Sparkles,
  BarChart3,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Scale,
  MapPin,
  Flame,
} from 'lucide-react';

import {
  HarvestPlanRecord,
  HarvestTeamRecord,
  HarvestExecutionRecord,
  WeighbridgeRecord,
  TransportDispatchRecord,
  AiHarvestInsight,
} from '../types';

interface HarvestDashboardViewProps {
  plans: HarvestPlanRecord[];
  teams: HarvestTeamRecord[];
  executions: HarvestExecutionRecord[];
  weighbridgeRecords: WeighbridgeRecord[];
  dispatches: TransportDispatchRecord[];
  aiInsights: AiHarvestInsight[];
  onNavigateSubTab: (subTabId: string) => void;
}

export const HarvestDashboardView: React.FC<HarvestDashboardViewProps> = ({
  plans,
  teams,
  executions,
  weighbridgeRecords,
  dispatches,
  aiInsights,
  onNavigateSubTab,
}) => {
  // Calculations
  const totalExecWeightTon = executions.reduce((sum, e) => sum + e.estimatedWeightKg, 0) / 1000;
  const totalBunches = executions.reduce((sum, e) => sum + e.bunchesCount, 0);
  const totalLooseFruitKg = executions.reduce((sum, e) => sum + e.looseFruitKg, 0);
  const avgBjr = executions.length > 0
    ? (executions.reduce((sum, e) => sum + e.calculatedBjrKg, 0) / executions.length).toFixed(1)
    : '18.2';

  const pendingTransportCount = dispatches.filter((d) => d.status === 'In Transit' || d.status === 'Pending Loading').length;
  const pendingWeighingCount = weighbridgeRecords.filter((w) => w.status === 'First Weighing (Bruto)').length;
  const completedWeighedTon = weighbridgeRecords
    .filter((w) => w.status === 'Completed')
    .reduce((sum, w) => sum + w.netWeightKg, 0) / 1000;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today Harvest Achievement */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Hasil Panen Hari Ini</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            184.5 <span className="text-xs font-bold text-emerald-600">Ton TBS</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Target Hari Ini: 200 Ton</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">92.25% Achievement</span>
          </div>
        </div>

        {/* Average BJR & Janjang */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Rata-rata BJR & Janjang</span>
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Scale className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {avgBjr} <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Kg/Janjang</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Total Janjang: {totalBunches.toLocaleString('id-ID')}</span>
            <span>Brondolan: {totalLooseFruitKg} Kg</span>
          </div>
        </div>

        {/* Harvest Teams & Productivity */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Regu Panen & Produktivitas</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            18 / 20 <span className="text-xs font-bold text-amber-600">Regu On Duty</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Produktivitas: 1.85 Ton/Pemanen</span>
            <span className="text-emerald-600 font-bold">+5.2% vs Std</span>
          </div>
        </div>

        {/* Weighbridge & Transport Status */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Timbang PKS & Pengiriman</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Truck className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
            {completedWeighedTon.toFixed(2)} <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Ton Netto</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>In Transit: {pendingTransportCount} Truk</span>
            <span>Antri Timbang: {pendingWeighingCount} Truk</span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Shortcuts */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <Flame className="h-4 w-4 text-emerald-400" />
            Pusat Modul Utama Harvest Management System
          </h3>
          <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800/60 font-bold">
            End-to-End Digital Palm Trace
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
          <button
            onClick={() => onNavigateSubTab('harvest-execution')}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 transition-all text-left space-y-1 cursor-pointer group"
          >
            <span className="text-[10px] text-slate-400 group-hover:text-white block font-bold">01. Exec</span>
            <span className="font-bold text-white block">Input Panen</span>
          </button>

          <button
            onClick={() => onNavigateSubTab('harvest-grading')}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 transition-all text-left space-y-1 cursor-pointer group"
          >
            <span className="text-[10px] text-slate-400 group-hover:text-white block font-bold">02. TPH</span>
            <span className="font-bold text-white block">Grading TBS</span>
          </button>

          <button
            onClick={() => onNavigateSubTab('transport-dispatch')}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 transition-all text-left space-y-1 cursor-pointer group"
          >
            <span className="text-[10px] text-slate-400 group-hover:text-white block font-bold">03. DO</span>
            <span className="font-bold text-white block">Angkut Truk</span>
          </button>

          <button
            onClick={() => onNavigateSubTab('weighbridge')}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 transition-all text-left space-y-1 cursor-pointer group"
          >
            <span className="text-[10px] text-slate-400 group-hover:text-white block font-bold">04. PKS</span>
            <span className="font-bold text-white block">Timbang Netto</span>
          </button>

          <button
            onClick={() => onNavigateSubTab('ai-harvest')}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 transition-all text-left space-y-1 cursor-pointer group"
          >
            <span className="text-[10px] text-slate-400 group-hover:text-white block font-bold">05. AI</span>
            <span className="font-bold text-white block">AI Forecast</span>
          </button>

          <button
            onClick={() => onNavigateSubTab('qr-timeline')}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 transition-all text-left space-y-1 cursor-pointer group"
          >
            <span className="text-[10px] text-slate-400 group-hover:text-white block font-bold">06. QR</span>
            <span className="font-bold text-white block">QR & Timeline</span>
          </button>
        </div>
      </div>

      {/* AI Harvest Insight Placeholder Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 text-white space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>AI Harvest Intelligence Insight</span>
          </div>
          <button
            onClick={() => onNavigateSubTab('ai-harvest')}
            className="text-xs text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat AI Engine Selengkapnya</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {aiInsights.slice(0, 2).map((ai) => (
            <div
              key={ai.id}
              className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{ai.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  {ai.confidenceScore}% Match
                </span>
              </div>
              <p className="text-xs text-slate-300">{ai.insightText}</p>
              <span className="text-[10px] text-emerald-400 font-bold block pt-1">
                💡 Rekomendasi: {ai.recommendedAction}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Today Executions Table Preview */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Pencatatan Panen Real-Time Hari Ini (TPH & Pemanen)
            </h3>
            <p className="text-xs text-slate-500">
              Integrasi GPS lokasi ancak, foto geo-tag, BJR, dan pencatatan brondolan
            </p>
          </div>
          <button
            onClick={() => onNavigateSubTab('harvest-execution')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Record</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-bold">Kode Exec / Jam</th>
                <th className="px-4 py-3 font-bold">Blok / Ancak</th>
                <th className="px-4 py-3 font-bold">Pemanen & Regu</th>
                <th className="px-4 py-3 font-bold">Janjang</th>
                <th className="px-4 py-3 font-bold">Estimasi Berat</th>
                <th className="px-4 py-3 font-bold">BJR (Kg)</th>
                <th className="px-4 py-3 font-bold">Kualitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {executions.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                    <div>{e.executionCode}</div>
                    <span className="text-[10px] text-slate-400 font-mono">{e.time}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{e.blockCode}</span>
                    <span className="text-[10px] text-slate-500 block">{e.ancakNo}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-800 dark:text-slate-200">{e.harvesterName}</div>
                    <span className="text-[10px] text-slate-400">{e.teamName}</span>
                  </td>
                  <td className="px-4 py-3.5 font-black text-slate-900 dark:text-white">
                    {e.bunchesCount} Tandan
                  </td>
                  <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                    {e.estimatedWeightKg.toLocaleString('id-ID')} Kg
                  </td>
                  <td className="px-4 py-3.5 font-bold">{e.calculatedBjrKg} Kg</td>
                  <td className="px-4 py-3.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                      {e.qualityGrade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
