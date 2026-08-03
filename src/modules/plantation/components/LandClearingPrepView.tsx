import React, { useState } from 'react';
import { Pickaxe, Layers, Search, Plus, MapPin, Calendar, CheckCircle2, User, DollarSign } from 'lucide-react';
import { LandClearingRecord, LandPreparationRecord } from '../types';

interface LandClearingPrepViewProps {
  clearings: LandClearingRecord[];
  preparations: LandPreparationRecord[];
}

export const LandClearingPrepView: React.FC<LandClearingPrepViewProps> = ({
  clearings,
  preparations,
}) => {
  const [tab, setTab] = useState<'clearing' | 'prep'>('clearing');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClearings = clearings.filter(
    (c) =>
      c.clearingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contractorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPreparations = preparations.filter(
    (p) =>
      p.prepCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.blockCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('clearing')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'clearing'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Land Clearing ({clearings.length})
          </button>
          <button
            onClick={() => setTab('prep')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'prep'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Land Preparation ({preparations.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kode/blok/kontraktor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => alert(`Input Entry ${tab === 'clearing' ? 'Land Clearing' : 'Land Prep'}`)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Record</span>
          </button>
        </div>
      </div>

      {tab === 'clearing' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClearings.map((lc) => (
            <div
              key={lc.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                    {lc.clearingCode}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                    {lc.blockCode} • {lc.areaHa} Ha
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Metode: <span className="font-semibold text-slate-700 dark:text-slate-300">{lc.method}</span>
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                  {lc.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Kontraktor</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{lc.contractorName}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Biaya (IDR)</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Rp {lc.costIdr.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  PIC: {lc.picName}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  {lc.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'prep' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Kode Prep / Blok</th>
                  <th className="px-4 py-3 font-bold">Terasering (km)</th>
                  <th className="px-4 py-3 font-bold">Drainase & Jalan (m)</th>
                  <th className="px-4 py-3 font-bold">Pengolahan Tanah (Ha)</th>
                  <th className="px-4 py-3 font-bold">Cover Crop (%)</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredPreparations.map((lp) => (
                  <tr key={lp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      <div>{lp.prepCode}</div>
                      <span className="text-[10px] text-emerald-600 font-semibold">{lp.blockCode}</span>
                    </td>
                    <td className="px-4 py-3.5 font-bold">{lp.terracingKm} km</td>
                    <td className="px-4 py-3.5">
                      <div>Drainase: {lp.drainageM} m</div>
                      <span className="text-[10px] text-slate-400">Jalan: {lp.roadM} m</span>
                    </td>
                    <td className="px-4 py-3.5 font-bold">{lp.soilTillageHa} Ha</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                        {lp.coverCropCoveragePct}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                        {lp.status}
                      </span>
                    </td>
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
