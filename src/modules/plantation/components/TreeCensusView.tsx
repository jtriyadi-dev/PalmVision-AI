import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Trees,
  Search,
  Plus,
  User,
  Calendar,
  MapPin,
  Filter,
} from 'lucide-react';
import {
  TreeCensusRecord,
  DeadPalmRecord,
  GapPlantingRecord,
  ReplantingRecord,
} from '../types';

interface TreeCensusViewProps {
  censusRecords: TreeCensusRecord[];
  deadPalms: DeadPalmRecord[];
  gapPlantings: GapPlantingRecord[];
  replantings: ReplantingRecord[];
  activeSubTab: string;
}

export const TreeCensusView: React.FC<TreeCensusViewProps> = ({
  censusRecords,
  deadPalms,
  gapPlantings,
  replantings,
  activeSubTab,
}) => {
  const [tab, setTab] = useState<'census' | 'dead' | 'gap' | 'replanting'>(
    activeSubTab === 'dead-palm' || activeSubTab === 'missing-palm'
      ? 'dead'
      : activeSubTab === 'gap-planting'
      ? 'gap'
      : activeSubTab === 'replanting'
      ? 'replanting'
      : 'census'
  );

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCensus = censusRecords.filter(
    (c) =>
      c.censusCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.surveyorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDead = deadPalms.filter(
    (d) =>
      d.palmCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deathCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGap = gapPlantings.filter(
    (g) =>
      g.gapCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.varietyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReplanting = replantings.filter(
    (r) =>
      r.replantingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.programName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub-tab navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTab('census')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'census'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Sensus Pohon ({censusRecords.length})
          </button>
          <button
            onClick={() => setTab('dead')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'dead'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Pohon Mati & Titik Kosong ({deadPalms.length})
          </button>
          <button
            onClick={() => setTab('gap')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'gap'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Gap Planting / Penyulaman ({gapPlantings.length})
          </button>
          <button
            onClick={() => setTab('replanting')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'replanting'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Replanting ({replantings.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari record sensus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => alert(`Input Record Sensus Baru`)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Record</span>
          </button>
        </div>
      </div>

      {/* CENSUS RECORDS */}
      {tab === 'census' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Kode Sensus / Blok</th>
                  <th className="px-4 py-3 font-bold">Pohon Produktif (TM)</th>
                  <th className="px-4 py-3 font-bold">Pohon TBM</th>
                  <th className="px-4 py-3 font-bold">Pohon Mati / Terserang</th>
                  <th className="px-4 py-3 font-bold">Titik Kosong</th>
                  <th className="px-4 py-3 font-bold">SPH Aktual</th>
                  <th className="px-4 py-3 font-bold">Surveyor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredCensus.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      <div>{c.censusCode}</div>
                      <span className="text-[10px] text-emerald-600 font-semibold">{c.blockCode}</span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                      {c.productiveTrees.toLocaleString('id-ID')} Pokok
                    </td>
                    <td className="px-4 py-3.5 font-bold text-blue-600 dark:text-blue-400">
                      {c.immatureTrees.toLocaleString('id-ID')} Pokok
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-red-600 font-bold block">{c.deadTrees} Mati</span>
                      <span className="text-amber-500 text-[10px]">{c.diseasedTrees} Terserang</span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-orange-600">
                      {c.vacantPoints} Titik
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      {c.sphActual} SPH
                    </td>
                    <td className="px-4 py-3.5">
                      <div>{c.surveyorName}</div>
                      <span className="text-[10px] text-slate-400">{c.surveyorRole}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DEAD PALMS */}
      {tab === 'dead' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDead.map((dp) => (
            <div
              key={dp.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400 text-[10px] font-extrabold">
                    {dp.palmCode}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                    {dp.blockCode} • No. Pohon: {dp.treeNumber}
                  </h3>
                  <p className="text-xs text-red-600 font-bold mt-0.5">
                    Kategori: {dp.deathCategory}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-bold text-[10px]">
                  {dp.actionStatus}
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
                {dp.causeDetails}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Pelapor: {dp.reportedBy}</span>
                <span>{dp.reportDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* GAP PLANTING */}
      {tab === 'gap' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Kode Gap / Blok</th>
                  <th className="px-4 py-3 font-bold">No. Pohon</th>
                  <th className="px-4 py-3 font-bold">Varietas Sisipan</th>
                  <th className="px-4 py-3 font-bold">Alasan Penyulaman</th>
                  <th className="px-4 py-3 font-bold">PIC / Tanggal</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredGap.map((gp) => (
                  <tr key={gp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      <div>{gp.gapCode}</div>
                      <span className="text-[10px] text-emerald-600 font-semibold">{gp.blockCode}</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono">{gp.treeNumber}</td>
                    <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{gp.varietyName}</td>
                    <td className="px-4 py-3.5 text-slate-500">{gp.reason}</td>
                    <td className="px-4 py-3.5">
                      <div>{gp.picName}</div>
                      <span className="text-[10px] text-slate-400">{gp.date}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                        {gp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPLANTING */}
      {tab === 'replanting' && (
        <div className="space-y-4">
          {filteredReplanting.map((rp) => (
            <div
              key={rp.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-[10px] font-extrabold">
                    {rp.replantingCode}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                    {rp.programName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {rp.estateName} • {rp.blockCode} ({rp.areaHa} Ha)
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-bold text-[10px]">
                  {rp.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Pohon Lama Diganti</span>
                  <span className="font-bold text-slate-900 dark:text-white">{rp.treeCountOld.toLocaleString('id-ID')} Pokok</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Varietas Baru</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{rp.newVarietyName}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Biaya Replanting</span>
                  <span className="font-bold text-slate-900 dark:text-white">Rp {rp.costIdr.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
