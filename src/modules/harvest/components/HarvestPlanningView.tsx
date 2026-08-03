import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  BarChart2,
  List,
  Grid,
} from 'lucide-react';

import { HarvestPlanRecord, HarvestPriority, HarvestStatus } from '../types';

interface HarvestPlanningViewProps {
  plans: HarvestPlanRecord[];
  onAddPlan: (newPlan: HarvestPlanRecord) => void;
}

export const HarvestPlanningView: React.FC<HarvestPlanningViewProps> = ({ plans, onAddPlan }) => {
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEstate, setSelectedEstate] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [programName, setProgramName] = useState('');
  const [companyName, setCompanyName] = useState('PT Sawit Nusantara Mandiri');
  const [estateName, setEstateName] = useState('Nusa Indah Estate');
  const [divisionName, setDivisionName] = useState('Division 1 - Agronomi');
  const [afdelingName, setAfdelingName] = useState('Afdeling A');
  const [blockCode, setBlockCode] = useState('BLK-A12');
  const [harvestDate, setHarvestDate] = useState('2026-08-05');
  const [estimatedBunches, setEstimatedBunches] = useState(1500);
  const [estimatedBjrKg, setEstimatedBjrKg] = useState(18.0);
  const [priority, setPriority] = useState<HarvestPriority>('High');
  const [picName, setPicName] = useState('Assistant Afdeling A');
  const [notes, setNotes] = useState('');

  const filteredPlans = plans.filter((p) => {
    const matchSearch =
      p.planCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.blockCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.programName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstate = selectedEstate === 'All' || p.estateName === selectedEstate;
    const matchPriority = selectedPriority === 'All' || p.priority === selectedPriority;
    return matchSearch && matchEstate && matchPriority;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ton = (estimatedBunches * estimatedBjrKg) / 1000;
    const newRecord: HarvestPlanRecord = {
      id: `hp-${Date.now()}`,
      planCode: `PLN-2026-H${Math.floor(10 + Math.random() * 90)}`,
      programName: programName || 'Program Panen Rotasi Standard',
      companyName,
      estateName,
      divisionName,
      afdelingName,
      blockCode,
      harvestDate,
      estimatedBunches,
      estimatedTonnageTon: parseFloat(ton.toFixed(2)),
      estimatedBjrKg,
      priority,
      picName,
      status: 'Planned',
      notes,
      createdAt: new Date().toISOString(),
    };
    onAddPlan(newRecord);
    setIsModalOpen(false);
    setProgramName('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Harvest Planning & Scheduling Matrix
          </h2>
          <p className="text-xs text-slate-500">
            Perencanaan estimasi produksi, tonase, BJR, dan rotasi panen per blok kebun
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'kanban' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto sm:ml-0"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Perencanaan Panen</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari Kode Plan, Blok, Program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <select
          value={selectedEstate}
          onChange={(e) => setSelectedEstate(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="All">Semua Estate</option>
          <option value="Nusa Indah Estate">Nusa Indah Estate</option>
          <option value="Sejahtera Estate">Sejahtera Estate</option>
        </select>

        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
        >
          <option value="All">Semua Prioritas</option>
          <option value="Urgent">Urgent</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
        </select>
      </div>

      {/* Table / Kanban View */}
      {viewMode === 'table' ? (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Plan Code & Program</th>
                  <th className="px-4 py-3 font-bold">Estate & Blok</th>
                  <th className="px-4 py-3 font-bold">Tanggal Panen</th>
                  <th className="px-4 py-3 font-bold">Est. Janjang</th>
                  <th className="px-4 py-3 font-bold">Est. Tonase</th>
                  <th className="px-4 py-3 font-bold">BJR (Kg)</th>
                  <th className="px-4 py-3 font-bold">Prioritas</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredPlans.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{p.planCode}</div>
                      <span className="text-[10px] text-slate-500 block">{p.programName}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">{p.blockCode}</div>
                      <span className="text-[10px] text-slate-400 block">{p.estateName} ({p.afdelingName})</span>
                    </td>
                    <td className="px-4 py-3.5 font-medium">{p.harvestDate}</td>
                    <td className="px-4 py-3.5 font-black text-slate-900 dark:text-white">
                      {p.estimatedBunches.toLocaleString('id-ID')} Tandan
                    </td>
                    <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                      {p.estimatedTonnageTon} Ton
                    </td>
                    <td className="px-4 py-3.5 font-bold">{p.estimatedBjrKg} Kg</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.priority === 'Urgent'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                            : p.priority === 'High'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                        }`}
                      >
                        {p.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredPlans.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 dark:text-white">{p.planCode}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  {p.status}
                </span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{p.programName}</p>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                <div className="flex justify-between text-slate-500">
                  <span>Blok & Afdeling:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{p.blockCode} ({p.afdelingName})</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Est. Janjang:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{p.estimatedBunches} Janjang</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Est. Tonase & BJR:</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{p.estimatedTonnageTon} Ton ({p.estimatedBjrKg} Kg)</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Tanggal: {p.harvestDate}</span>
                <span>PIC: {p.picName}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Plan */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full space-y-4 shadow-xl animate-scaleIn">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Tambah Perencanaan Panen TBS Baru
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Nama Program Panen</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Rotasi Panen Puncak PKS"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Estate</label>
                  <input
                    type="text"
                    value={estateName}
                    onChange={(e) => setEstateName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Afdeling & Blok</label>
                  <input
                    type="text"
                    value={blockCode}
                    onChange={(e) => setBlockCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Tanggal Panen</label>
                  <input
                    type="date"
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Est. Janjang</label>
                  <input
                    type="number"
                    value={estimatedBunches}
                    onChange={(e) => setEstimatedBunches(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Est. BJR (Kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={estimatedBjrKg}
                    onChange={(e) => setEstimatedBjrKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all cursor-pointer"
                >
                  Simpan Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
