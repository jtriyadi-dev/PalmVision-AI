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
  const [gradingStandards] = useState<FfbGradingStandard[]>(mockFfbGradingStandards);
  const [searchTerm, setSearchTerm] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [varCode, setVarCode] = useState('');
  const [varName, setVarName] = useState('');
  const [breeder, setBreeder] = useState('');
  const [yieldTon, setYieldTon] = useState(30);
  const [bunchKg, setBunchKg] = useState(16);
  const [soilType, setSoilType] = useState('Alluvial & Mineral Soil');

  const handleCreateVariety = (e: React.FormEvent) => {
    e.preventDefault();
    if (!varCode || !varName) return;

    const created: AgronomyVariety = {
      id: `var-${Date.now()}`,
      varietyCode: varCode.toUpperCase(),
      varietyName: varName,
      breederName: breeder || 'Pusat Penelitian Kelapa Sawit (PPKS)',
      yieldPotentialTonHa: Number(yieldTon),
      avgBunchWeightKg: Number(bunchKg),
      recommendedSoil: soilType,
      status: 'CERTIFIED'
    };

    setVarieties([created, ...varieties]);
    setShowAddModal(false);
    setToastMessage(`Varietas Bibit Unggul ${created.varietyCode} (${created.varietyName}) berhasil didaftarkan!`);
    setTimeout(() => setToastMessage(null), 4000);

    setVarCode('');
    setVarName('');
    setBreeder('');
  };

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

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Varietas Bibit Baru</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white cursor-pointer text-sm font-bold">✕</button>
        </div>
      )}

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

      {/* Modal Tambah Varietas Bibit Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-lg w-full space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Trees className="w-5 h-5 text-emerald-400" />
                <span>Registrasi Varietas Bibit Sawit Baru</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVariety} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Kode Varietas
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., DXP-TNR-08"
                    value={varCode}
                    onChange={(e) => setVarCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Produsen / Pemulia Benih
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., PPKS Medan / SOCFIN"
                    value={breeder}
                    onChange={(e) => setBreeder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Nama Varietas Bibit
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g., DxP Yangambi Super Yield"
                  value={varName}
                  onChange={(e) => setVarName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Potensi Hasil (Ton/Ha/Thn)
                  </label>
                  <input
                    type="number"
                    value={yieldTon}
                    onChange={(e) => setYieldTon(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Rata-rata Berat Tandan (Kg)
                  </label>
                  <input
                    type="number"
                    value={bunchKg}
                    onChange={(e) => setBunchKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Kesesuaian Tipologi Tanah
                </label>
                <input
                  type="text"
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-lg"
                >
                  Simpan Varietas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
