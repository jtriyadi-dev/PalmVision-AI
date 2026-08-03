import React, { useState } from 'react';
import {
  Sprout,
  Search,
  Plus,
  Building2,
  Calendar,
  User,
  CheckCircle2,
  Award,
  FileText,
  MapPin,
  Sparkles,
  Filter,
} from 'lucide-react';
import { NurseryRecord, SeedlingBatchRecord } from '../types';

interface NurserySeedlingViewProps {
  nurseries: NurseryRecord[];
  seedlings: SeedlingBatchRecord[];
  activeSubTab: string;
}

export const NurserySeedlingView: React.FC<NurserySeedlingViewProps> = ({
  nurseries,
  seedlings,
  activeSubTab,
}) => {
  const [tab, setTab] = useState<'nursery' | 'seedling'>(
    activeSubTab === 'seedling' ? 'seedling' : 'nursery'
  );

  const [searchQuery, setSearchQuery] = useState('');

  const filteredNurseries = nurseries.filter(
    (n) =>
      n.nurseryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.nurseryCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.picName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSeedlings = seedlings.filter(
    (s) =>
      s.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.varietyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.supplierName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab bar & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTab('nursery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'nursery'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Lokasi Nursery ({nurseries.length})
          </button>
          <button
            onClick={() => setTab('seedling')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              tab === 'seedling'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Batch Seedling & Sertifikat ({seedlings.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nursery/batch/varietas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => alert(`Input Entry ${tab === 'nursery' ? 'Nursery' : 'Seedling'} Baru`)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah {tab === 'nursery' ? 'Nursery' : 'Batch Seedling'}</span>
          </button>
        </div>
      </div>

      {/* NURSERY LIST */}
      {tab === 'nursery' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNurseries.map((nur) => (
            <div
              key={nur.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                      {nur.nurseryCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                      {nur.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                    {nur.nurseryName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {nur.estateName} • {nur.afdelingName}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                  {nur.status}
                </span>
              </div>

              {/* Capacities */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Kapasitas Tempat</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {nur.capacitySeeds.toLocaleString('id-ID')} Kecambah
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-400 block text-[10px]">Stok Kecambah Saat Ini</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {nur.currentSeedsCount.toLocaleString('id-ID')} Polibag
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  PIC: {nur.picName}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                  GPS: {nur.locationGps.lat}, {nur.locationGps.lng}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SEEDLING LIST */}
      {tab === 'seedling' && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Kode Batch / Nursery</th>
                  <th className="px-4 py-3 font-bold">Varietas & Supplier</th>
                  <th className="px-4 py-3 font-bold">No. Sertifikat Legality</th>
                  <th className="px-4 py-3 font-bold">Populasi awal / Stok</th>
                  <th className="px-4 py-3 font-bold">Afkir (Cull)</th>
                  <th className="px-4 py-3 font-bold">Umur (Bulan)</th>
                  <th className="px-4 py-3 font-bold">Status Kesehatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredSeedlings.map((seed) => (
                  <tr key={seed.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      <div>{seed.batchCode}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{seed.nurseryName}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block">{seed.varietyName}</span>
                      <span className="text-[10px] text-slate-400">{seed.supplierName}</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                      {seed.certificateNumber}
                    </td>
                    <td className="px-4 py-3.5 font-bold">
                      {seed.quantityCurrent.toLocaleString('id-ID')} / {seed.quantityInitial.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3.5 text-red-600 font-bold">
                      {seed.cullCount} Pokok
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      {seed.ageMonths} Bulan
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                        {seed.healthStatus}
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
