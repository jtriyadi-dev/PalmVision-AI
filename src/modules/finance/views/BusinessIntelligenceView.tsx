import React from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Building2,
  Layers,
  Sparkles,
  ArrowUpRight,
  Zap,
} from 'lucide-react';

export const BusinessIntelligenceView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Executive Business Intelligence (BI) Analytics</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Dashboard BI Performa Keuangan & Costing Per Kebun / PKS
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl">
            Visualisasi Tren Margin Keuntungan CPO, Variansi Budget vs Realisasi, & Komparasi Costing Per Afdeling
          </p>
        </div>
      </div>

      {/* BI Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Trend Revenue vs Expense */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-extrabold text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Tren Omzet CPO vs Total Beban (6 Bulan Terakhir)</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              MARGIN +32%
            </span>
          </div>

          <div className="space-y-3 font-mono">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Agustus 2026: Revenue Rp 18.2M</span>
                <span className="text-emerald-400 font-bold">Cost: Rp 14.81M</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: '70%' }} />
                <div className="bg-rose-500 h-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-300">Juli 2026: Revenue Rp 17.5M</span>
                <span className="text-emerald-400 font-bold">Cost: Rp 14.10M</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: '68%' }} />
                <div className="bg-rose-500 h-full" style={{ width: '32%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Cost Structure Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-extrabold text-white text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-amber-400" />
              <span>Distribusi Struktur Biaya Perkebunan (OpEx Breakdown)</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              PUPUK 39%
            </span>
          </div>

          <div className="space-y-2 font-mono">
            <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-300">1. Pupuk NPK & Agrokimia:</span>
              <strong className="text-emerald-400">Rp 4.80 Miliar (39.0%)</strong>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-300">2. Panen, Pemuatan & Transport TBS:</span>
              <strong className="text-emerald-400">Rp 4.12 Miliar (33.5%)</strong>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-300">3. Operasional Pabrik PKS Mill:</span>
              <strong className="text-cyan-400">Rp 3.38 Miliar (27.5%)</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
