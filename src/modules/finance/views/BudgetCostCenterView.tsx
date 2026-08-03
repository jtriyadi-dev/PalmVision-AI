import React, { useState } from 'react';
import {
  PieChart,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Layers,
  Sparkles,
} from 'lucide-react';
import { INITIAL_BUDGET_COST_CENTERS } from '../mockData';
import { BudgetCostCenter } from '../types';

export const BudgetCostCenterView: React.FC = () => {
  const [costCenters] = useState<BudgetCostCenter[]>(INITIAL_BUDGET_COST_CENTERS);
  const [activeTab, setActiveTab] = useState<'BUDGET_REALIZATION' | 'COST_CENTERS' | 'COST_PER_HA'>('BUDGET_REALIZATION');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-400" />
            <span>Budget Control, Cost Center Allocation & Biaya Per Hektar Kebun</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pengendalian Anggaran Biaya Panen, Pemupukan NPK, Workshop EAM, & Efisiensi Pengolahan PKS Mill
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('BUDGET_REALIZATION')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'BUDGET_REALIZATION' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Realisasi Anggaran ({costCenters.length})
          </button>
          <button
            onClick={() => setActiveTab('COST_CENTERS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'COST_CENTERS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Alokasi Cost Center
          </button>
          <button
            onClick={() => setActiveTab('COST_PER_HA')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'COST_PER_HA' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Analisis Biaya (Rp/Ha & Rp/Ton)
          </button>
        </div>
      </div>

      {/* BUDGET REALIZATION TAB */}
      {activeTab === 'BUDGET_REALIZATION' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {costCenters.map((cc) => (
              <div key={cc.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-mono text-xs font-black text-emerald-400">{cc.costCenterCode}</span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                      cc.status === 'WARNING_NEAR_LIMIT'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}
                  >
                    {cc.status === 'WARNING_NEAR_LIMIT' ? 'WARNING (80% USED)' : 'NORMAL'}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-white text-sm">{cc.costCenterName}</h3>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Budget Tahunan:</span>
                      <strong className="text-white">Rp {(cc.annualBudgetIdr / 1000000000).toFixed(2)} M</strong>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Realisasi YTD:</span>
                      <strong className="text-emerald-400">Rp {(cc.ytdActualCostIdr / 1000000000).toFixed(2)} M</strong>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Utilisasi Anggaran</span>
                    <span className="text-emerald-400">{cc.utilizationPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        cc.utilizationPercent > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${cc.utilizationPercent}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] flex justify-between font-mono">
                  <span>Biaya/Ha: <strong>Rp {cc.costPerHectareIdr.toLocaleString('id-ID')}</strong></span>
                  <span>Biaya/Ton: <strong>Rp {cc.costPerTonTbsIdr.toLocaleString('id-ID')}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COST CENTERS TAB */}
      {activeTab === 'COST_CENTERS' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-base">Struktur Cost Center & Rumus Alokasi Overhead Kebun</h3>
            <p className="text-slate-400">Alokasi Biaya Workshop, Solar Fleet, & Kantor Direksi ke Afdeling Kebun</p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400 block">Cost Center 1: Workshop & Heavy Equipment Fleet (CC-WORKSHOP)</span>
              <p className="text-slate-300">
                Alokasi Biaya Service excavator & truck berdasarkan Jam Kerja Mesin (Hour Meter HM) per Afdeling.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-400 block">Cost Center 2: Pengolahan Pabrik PKS Mill (CC-MILL-SEIRIAU)</span>
              <p className="text-slate-300">
                Alokasi Biaya Sterilizer & Pressing berdasarkan Tonase TBS Masuk Timbangan PKS.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* COST PER HA ANALYTICS TAB */}
      {activeTab === 'COST_PER_HA' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-base">Analisis Biaya Per Hektar Kebun (Rp / Ha)</h3>
            <p className="text-slate-400">Benchmarking Biaya Perawatan TM (Tanaman Menghasilkan) & TBM (Tanaman Belum Menghasilkan)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
            <div className="flex justify-between items-center text-sm font-bold text-white">
              <span>Rata-Rata Biaya Pemeliharaan Kebun TM:</span>
              <span className="text-emerald-400">Rp 8,920,000 / Hektar / Tahun</span>
            </div>
            <div className="flex justify-between items-center text-sm font-bold text-white">
              <span>Biaya HPP Produksi TBS Panen:</span>
              <span className="text-cyan-400">Rp 142,400 / Ton TBS</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
