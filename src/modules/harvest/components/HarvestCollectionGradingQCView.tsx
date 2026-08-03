import React, { useState } from 'react';
import {
  Award,
  Layers,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Percent,
  Plus,
} from 'lucide-react';

import {
  HarvestCollectionPointRecord,
  HarvestGradingRecord,
  HarvestQcRecord,
} from '../types';

interface HarvestCollectionGradingQCViewProps {
  collections: HarvestCollectionPointRecord[];
  gradings: HarvestGradingRecord[];
  qcRecords: HarvestQcRecord[];
  onAddGrading: (grading: HarvestGradingRecord) => void;
}

export const HarvestCollectionGradingQCView: React.FC<HarvestCollectionGradingQCViewProps> = ({
  collections,
  gradings,
  qcRecords,
  onAddGrading,
}) => {
  const [activeTab, setActiveTab] = useState<'tph' | 'grading' | 'qc'>('grading');
  const [isGradingModalOpen, setIsGradingModalOpen] = useState(false);

  // Form Grading
  const [tphCode, setTphCode] = useState('TPH-A12-01');
  const [blockCode, setBlockCode] = useState('BLK-A12');
  const [graderName, setGraderName] = useState('QC Inspector Hendra');
  const [rawPct, setRawPct] = useState(1.0);
  const [underRipePct, setUnderRipePct] = useState(4.0);
  const [ripePct, setRipePct] = useState(92.0);
  const [overRipePct, setOverRipePct] = useState(2.0);
  const [rottenPct, setRottenPct] = useState(0.5);
  const [emptyBunchesPct, setEmptyBunchesPct] = useState(0.5);
  const [notes, setNotes] = useState('Kualitas TBS baik, tingkat kematangan memenuhi standar PKS');

  const handleGradingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newG: HarvestGradingRecord = {
      id: `hg-${Date.now()}`,
      gradingCode: `GRD-${tphCode}`,
      tphCode,
      blockCode,
      graderName,
      date: new Date().toISOString().split('T')[0],
      rawPct,
      underRipePct,
      ripePct,
      overRipePct,
      rottenPct,
      emptyBunchesPct,
      abnormalPct: 0,
      longStalkPct: 1.0,
      notes,
      photoUrl: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80',
    };
    onAddGrading(newG);
    setIsGradingModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Navigation Switch Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            TPH Collection, Digital Grading & QC Inspection
          </h2>
          <p className="text-xs text-slate-500">
            Penyusunan TBS di Tempat Pengumpulan Hasil (TPH), grading kriteria kematangan buah, dan audit mutu panen
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('tph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tph'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              TPH Collection ({collections.length})
            </button>
            <button
              onClick={() => setActiveTab('grading')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'grading'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Digital Grading ({gradings.length})
            </button>
            <button
              onClick={() => setActiveTab('qc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'qc'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Harvest QC Audit ({qcRecords.length})
            </button>
          </div>

          {activeTab === 'grading' && (
            <button
              onClick={() => setIsGradingModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto sm:ml-0"
            >
              <Plus className="h-4 w-4" />
              <span>Input Grading TPH</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'tph' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                  {c.collectionPointCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {c.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Blok Kebun:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{c.blockCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tumpukan TBS:</span>
                  <span className="font-black text-slate-900 dark:text-white">{c.totalBunchesCount} Janjang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Brondolan TPH:</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">{c.totalLooseFruitKg} Kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Armada Truk Pengangkut:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{c.assignedTruckNo || '-'}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                <MapPin className="h-3 w-3 text-emerald-500" />
                GPS: {c.gpsLat}, {c.gpsLng}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'grading' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gradings.map((g) => (
              <div
                key={g.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block">{g.gradingCode}</span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      Grading {g.tphCode} ({g.blockCode})
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold">
                    {g.ripePct}% Matang Sempurna
                  </span>
                </div>

                {/* Breakdown Progress Bars */}
                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        Matang (Ripe Grade A):
                      </span>
                      <span className="font-black text-slate-900 dark:text-white">{g.ripePct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${g.ripePct}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px] pt-1">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="text-slate-500 block">Kurang Matang:</span>
                      <span className="font-bold text-amber-600">{g.underRipePct}%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="text-slate-500 block">Mentah (Raw):</span>
                      <span className="font-bold text-rose-600">{g.rawPct}%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="text-slate-500 block">Lewat Matang:</span>
                      <span className="font-bold text-purple-600">{g.overRipePct}%</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <span className="text-slate-500 block">Tandan Kosong/Busuk:</span>
                      <span className="font-bold text-slate-600">{g.emptyBunchesPct + g.rottenPct}%</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  "{g.notes}" — <span className="font-bold text-slate-700 dark:text-slate-300">{g.graderName}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'qc' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {qcRecords.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    {q.qcCode}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Inspeksi Mutu Panen Blok {q.blockCode}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                    {q.overallScore} <span className="text-xs text-slate-400 font-bold">/100</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{q.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-500 block text-[10px]">Kualitas Buah:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{q.fruitQualityScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-500 block text-[10px]">Sapu Brondolan:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{q.leftoverLooseFruitScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-500 block text-[10px]">Rapih Pelepah:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{q.frondPruningScore}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-500 block text-[10px]">Buah Tinggal:</span>
                  <span className="font-bold text-rose-600">{q.leftoverBunchesCount} Janjang</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                Inspector: {q.inspectorName} ({q.date})
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Grading */}
      {isGradingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full space-y-4 shadow-xl animate-scaleIn">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Input Form Grading TPH Digital
            </h3>
            <form onSubmit={handleGradingSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Kode TPH</label>
                  <input
                    type="text"
                    required
                    value={tphCode}
                    onChange={(e) => setTphCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Blok Kebun</label>
                  <input
                    type="text"
                    required
                    value={blockCode}
                    onChange={(e) => setBlockCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Matang (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={ripePct}
                    onChange={(e) => setRipePct(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Kurang Matang (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={underRipePct}
                    onChange={(e) => setUnderRipePct(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Mentah (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rawPct}
                    onChange={(e) => setRawPct(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsGradingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 cursor-pointer"
                >
                  Simpan Grading
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
