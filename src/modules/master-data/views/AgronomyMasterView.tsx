import React, { useState } from 'react';
import {
  Trees,
  Search,
  Plus,
  CheckCircle2,
  Award,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Layers,
  FileCheck2
} from 'lucide-react';
import { mockAgronomyVarieties, mockFfbGradingStandards } from '../mockData';
import { AgronomyVariety, FfbGradingStandard } from '../types';

export const AgronomyMasterView: React.FC = () => {
  const [varieties, setVarieties] = useState<AgronomyVariety[]>(mockAgronomyVarieties);
  const [gradingStandards, setGradingStandards] = useState<FfbGradingStandard[]>(mockFfbGradingStandards);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVarieties = varieties.filter(v =>
    v.varietyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.breederName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              Agronomy & Plant Science Master
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Master Varietas Bibit Sawit & Standar Gradasi Kematangan TBS</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Database spesifikasi keunggulan genetik DxP Tenera, estimasi potensi BJR/tonase per hektar, serta kriteria potongan mutu penerimaan TBS PKS.
          </p>
        </div>
      </div>

      {/* Grid: Seed Varieties & Grading Standards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Palm Seed Varieties Catalog (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Trees className="h-4 w-4 text-emerald-400" />
              Varietas Bibit Unggul Sawit (DxP Tenera Master)
            </h3>
            <span className="text-xs text-emerald-400 font-mono font-bold">{varieties.length} Varietas</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Varietas atau Produsen Benih..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="space-y-3">
            {filteredVarieties.map(varItem => (
              <div key={varItem.id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono text-[10px] font-bold">
                    {varItem.varietyCode}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                    {varItem.status}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white">{varItem.varietyName}</h4>
                <p className="text-[11px] text-slate-400">Produsen / Pemulia: <strong className="text-slate-200">{varItem.breederName}</strong></p>

                <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-700">
                  <div>
                    <span className="text-slate-400 text-[10px] block">Potensi Tonase</span>
                    <strong className="text-emerald-400 font-mono">{varItem.yieldPotentialTonHa} Ton/Ha/Thn</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Rata-rata BJR</span>
                    <strong className="text-teal-300 font-mono">{varItem.avgBunchWeightKg} Kg / Tandan</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block">Rekomendasi Tanah</span>
                    <strong className="text-white text-[11px]">{varItem.recommendedSoil}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FFB Grading Standards Catalog (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-teal-400" />
              Standar Gradasi Kematangan TBS PKS
            </h3>
            <span className="text-xs text-teal-400 font-mono font-bold">{gradingStandards.length} Kriteria</span>
          </div>

          <div className="space-y-3">
            {gradingStandards.map(grd => (
              <div key={grd.id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-teal-300 font-mono text-[10px] font-bold">
                    {grd.gradeCode}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    grd.penaltyBonusPercent >= 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {grd.penaltyBonusPercent >= 0 ? `+${grd.penaltyBonusPercent}% Bonus` : `${grd.penaltyBonusPercent}% Potongan`}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white">{grd.gradeName}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">{grd.description}</p>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-2 border-t border-slate-700">
                  <span className="text-slate-400">Rendemen Rendemen: <strong className="text-emerald-400">{grd.oilContentPct}% OER</strong></span>
                  <span className="text-slate-400">Batas ALB/FFA: <strong className="text-amber-400">{grd.ffaPctLimit}%</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
