import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Plus,
  Droplets,
  TreeDeciduous,
  Truck,
  Wrench,
  ShieldAlert,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import {
  FertilizerActivityRecord,
  SprayingActivityRecord,
  PruningActivityRecord,
  MaintenanceActivityRecord,
  PestControlRecord,
} from '../types';

interface ActivitiesManagementViewProps {
  fertilizers: FertilizerActivityRecord[];
  sprayings: SprayingActivityRecord[];
  prunings: PruningActivityRecord[];
  maintenances: MaintenanceActivityRecord[];
  pestControls: PestControlRecord[];
  activeSubTab: string;
}

export const ActivitiesManagementView: React.FC<ActivitiesManagementViewProps> = ({
  fertilizers,
  sprayings,
  prunings,
  maintenances,
  pestControls,
  activeSubTab,
}) => {
  const [tab, setTab] = useState<'fert' | 'spray' | 'prun' | 'maint' | 'pest'>(
    activeSubTab === 'fertilizer-activity'
      ? 'fert'
      : activeSubTab === 'spraying-activity'
      ? 'spray'
      : activeSubTab === 'pruning-activity'
      ? 'prun'
      : activeSubTab === 'pest-control-activity'
      ? 'pest'
      : 'maint'
  );

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTab('fert')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'fert'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Aktivitas Pemupukan ({fertilizers.length})
          </button>

          <button
            onClick={() => setTab('spray')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'spray'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Aktivitas Penyemprotan ({sprayings.length})
          </button>

          <button
            onClick={() => setTab('prun')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'prun'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Pemangkasan / Pruning ({prunings.length})
          </button>

          <button
            onClick={() => setTab('maint')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'maint'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Perawatan Infrastruktur & Jalan ({maintenances.length})
          </button>

          <button
            onClick={() => setTab('pest')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'pest'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Pengendalian Hama ({pestControls.length})
          </button>
        </div>

        <button
          onClick={() => alert(`Input Entry ${tab}`)}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Record Baru</span>
        </button>
      </div>

      {/* FERTILIZER TAB */}
      {tab === 'fert' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-bold">Kode Record / Tanggal</th>
                <th className="px-4 py-3 font-bold">Kebun / Blok</th>
                <th className="px-4 py-3 font-bold">Jenis Pupuk</th>
                <th className="px-4 py-3 font-bold">Jumlah (Kg / Ton)</th>
                <th className="px-4 py-3 font-bold">Metode Aplikasi</th>
                <th className="px-4 py-3 font-bold">Mandor & Regu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {fertilizers.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                    <div>{f.recordCode}</div>
                    <span className="text-[10px] text-slate-400">{f.date}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">{f.blockCode}</div>
                    <span className="text-[10px] text-slate-400">{f.estateName}</span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">{f.fertilizerType}</td>
                  <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                    {f.quantityKg.toLocaleString('id-ID')} Kg ({(f.quantityKg / 1000).toFixed(2)} Ton)
                  </td>
                  <td className="px-4 py-3.5 font-medium">{f.applicationMethod}</td>
                  <td className="px-4 py-3.5">
                    <div>{f.mandorName}</div>
                    <span className="text-[10px] text-slate-400">{f.teamName}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SPRAYING TAB */}
      {tab === 'spray' && (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-bold">Kode Record / Tanggal</th>
                <th className="px-4 py-3 font-bold">Kebun / Blok</th>
                <th className="px-4 py-3 font-bold">Bahan Kimia & Kategori</th>
                <th className="px-4 py-3 font-bold">Cakupan Area (Ha)</th>
                <th className="px-4 py-3 font-bold">Volume Larutan (Liter)</th>
                <th className="px-4 py-3 font-bold">Cuaca</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {sprayings.map((sp) => (
                <tr key={sp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                    <div>{sp.recordCode}</div>
                    <span className="text-[10px] text-slate-400">{sp.date}</span>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">{sp.blockCode}</td>
                  <td className="px-4 py-3.5">
                    <div className="font-bold text-slate-900 dark:text-white">{sp.chemicalType}</div>
                    <span className="text-[10px] text-blue-600 font-bold">{sp.chemicalCategory}</span>
                  </td>
                  <td className="px-4 py-3.5 font-bold">{sp.areaCoverageHa} Ha</td>
                  <td className="px-4 py-3.5 font-bold text-blue-600 dark:text-blue-400">{sp.solutionVolumeLiters} Liters</td>
                  <td className="px-4 py-3.5 text-slate-500">{sp.weatherCondition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PRUNING TAB */}
      {tab === 'prun' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prunings.map((pr) => (
            <div
              key={pr.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-extrabold">
                  {pr.recordCode}
                </span>
                <span className="text-xs font-bold text-slate-500">{pr.date}</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Blok {pr.blockCode} • {pr.treesCount} Pokok
              </h3>
              <p className="text-xs text-emerald-600 font-bold">{pr.pruningType}</p>
              <p className="text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl">
                {pr.notes}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* MAINTENANCE TAB */}
      {tab === 'maint' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Tipe Aset & Nama</th>
                  <th className="px-4 py-3 font-bold">Lokasi Blok</th>
                  <th className="px-4 py-3 font-bold">Volume Pekerjaan</th>
                  <th className="px-4 py-3 font-bold">Biaya (IDR)</th>
                  <th className="px-4 py-3 font-bold">Kontraktor / Tim</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {maintenances.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      <div>{m.assetName}</div>
                      <span className="text-[10px] text-blue-600">{m.assetType}</span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-emerald-600">{m.blockCode}</td>
                    <td className="px-4 py-3.5">{m.volumeWork}</td>
                    <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                      Rp {m.costIdr.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3.5">{m.contractorOrTeam}</td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PEST CONTROL TAB */}
      {tab === 'pest' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pestControls.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 font-mono text-[10px] font-extrabold">
                  {p.recordCode}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                  Tingkat: {p.severityLevel}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {p.pestName} • Blok {p.blockCode}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Metode Treatment: <strong className="text-emerald-600">{p.treatmentMethod}</strong> ({p.affectedTreesCount} Pokok Terserang)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
