import React, { useState } from 'react';
import {
  Users,
  MapPin,
  ShieldCheck,
  Truck,
  Wrench,
  CheckCircle2,
  Plus,
  Navigation,
  UserCheck,
} from 'lucide-react';

import { HarvestTeamRecord, HarvestAssignmentRecord } from '../types';

interface HarvestTeamAssignmentViewProps {
  teams: HarvestTeamRecord[];
  assignments: HarvestAssignmentRecord[];
  onAddTeam: (team: HarvestTeamRecord) => void;
  onAddAssignment: (assignment: HarvestAssignmentRecord) => void;
}

export const HarvestTeamAssignmentView: React.FC<HarvestTeamAssignmentViewProps> = ({
  teams,
  assignments,
  onAddTeam,
  onAddAssignment,
}) => {
  const [activeTab, setActiveTab] = useState<'teams' | 'assignments'>('teams');
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  // New Team Form State
  const [teamName, setTeamName] = useState('');
  const [mandorName, setMandorName] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [harvestersCount, setHarvestersCount] = useState(12);
  const [loosePickersCount, setLoosePickersCount] = useState(6);
  const [truckNo, setTruckNo] = useState('BK 8899 XX');

  // New Assignment Form State
  const [assignTeamName, setAssignTeamName] = useState('Regu Panen Harimau 1');
  const [assignMandor, setAssignMandor] = useState('Mandor Suparno');
  const [assignBlockCode, setAssignBlockCode] = useState('BLK-A12');
  const [targetBunches, setTargetBunches] = useState(1800);
  const [targetTon, setTargetTon] = useState(32.4);

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeam: HarvestTeamRecord = {
      id: `ht-${Date.now()}`,
      teamCode: `TM-${teamName.substring(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
      teamName: teamName || 'Regu Panen Baru',
      mandorName: mandorName || 'Mandor Lapangan',
      supervisorName: supervisorName || 'Spv. Agronomi',
      harvestersCount,
      looseFruitPickersCount: loosePickersCount,
      helpersCount: 2,
      assignedTruckNo: truckNo,
      equipmentSummary: `${harvestersCount} Egrek, ${harvestersCount} Angkong, ${loosePickersCount} Tojok`,
      status: 'On Duty',
    };
    onAddTeam(newTeam);
    setIsTeamModalOpen(false);
    setTeamName('');
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const newAssignment: HarvestAssignmentRecord = {
      id: `ha-${Date.now()}`,
      assignmentCode: `ASN-PAN-${Math.floor(100 + Math.random() * 900)}`,
      teamName: assignTeamName,
      mandorName: assignMandor,
      assignmentType: 'Single Block',
      blockCodes: [assignBlockCode],
      targetBunches,
      targetTonnageTon: targetTon,
      dateAssigned: new Date().toISOString().split('T')[0],
      gpsTargetLat: 2.9102,
      gpsTargetLng: 99.1234,
      status: 'In Execution',
    };
    onAddAssignment(newAssignment);
    setIsAssignmentModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Switch Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Harvest Team & Assignment Management
          </h2>
          <p className="text-xs text-slate-500">
            Pengelolaan Mandor, Pemanen, Pengutip Brondolan, Peralatan, dan Penugasan Blok GPS Ready
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('teams')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'teams'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Regu Panen ({teams.length})
            </button>
            <button
              onClick={() => setActiveTab('assignments')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'assignments'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Penugasan Panen ({assignments.length})
            </button>
          </div>

          {activeTab === 'teams' ? (
            <button
              onClick={() => setIsTeamModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto sm:ml-0"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Regu Panen</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAssignmentModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ml-auto sm:ml-0"
            >
              <Plus className="h-4 w-4" />
              <span>Buat Penugasan Blok</span>
            </button>
          )}
        </div>
      </div>

      {/* Content Body */}
      {activeTab === 'teams' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {teams.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    {t.teamCode}
                  </span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {t.teamName}
                  </h3>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    t.status === 'On Duty'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5 text-emerald-600" /> Mandor:
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{t.mandorName}</span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-blue-500" /> Pemanen & Pengutip:
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {t.harvestersCount} Pemanen + {t.looseFruitPickersCount} Brondolan
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5 text-amber-500" /> Armada Truk:
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {t.assignedTruckNo || 'Belum Diassigned'}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  <span className="font-bold block text-slate-700 dark:text-slate-300 mb-0.5">
                    Alokasi Peralatan:
                  </span>
                  {t.equipmentSummary}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Kode Penugasan</th>
                  <th className="px-4 py-3 font-bold">Regu & Mandor</th>
                  <th className="px-4 py-3 font-bold">Tipe & Blok Target</th>
                  <th className="px-4 py-3 font-bold">Target Janjang</th>
                  <th className="px-4 py-3 font-bold">Target Tonase</th>
                  <th className="px-4 py-3 font-bold">GPS Coordinate Target</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {assignments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      {a.assignmentCode}
                      <span className="text-[10px] text-slate-400 block">{a.dateAssigned}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-800 dark:text-slate-200">{a.teamName}</div>
                      <span className="text-[10px] text-slate-500">{a.mandorName}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold mr-1">
                        {a.blockCodes.join(', ')}
                      </span>
                      <span className="text-[10px] text-slate-400">({a.assignmentType})</span>
                    </td>
                    <td className="px-4 py-3.5 font-black text-slate-900 dark:text-white">
                      {a.targetBunches.toLocaleString('id-ID')} Janjang
                    </td>
                    <td className="px-4 py-3.5 font-bold text-emerald-600 dark:text-emerald-400">
                      {a.targetTonnageTon} Ton
                    </td>
                    <td className="px-4 py-3.5 font-mono text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Navigation className="h-3 w-3 text-emerald-500" />
                        {a.gpsTargetLat}, {a.gpsTargetLng}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 text-[10px] font-bold">
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Add Team */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full space-y-4 shadow-xl animate-scaleIn">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Tambah Regu Panen Baru
            </h3>
            <form onSubmit={handleCreateTeam} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Nama Regu Panen</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Regu Panen Elang 4"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Nama Mandor</label>
                  <input
                    type="text"
                    required
                    placeholder="Mandor Panen"
                    value={mandorName}
                    onChange={(e) => setMandorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Plat Truk Angkut</label>
                  <input
                    type="text"
                    value={truckNo}
                    onChange={(e) => setTruckNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Jumlah Pemanen</label>
                  <input
                    type="number"
                    value={harvestersCount}
                    onChange={(e) => setHarvestersCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Pengutip Brondolan</label>
                  <input
                    type="number"
                    value={loosePickersCount}
                    onChange={(e) => setLoosePickersCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsTeamModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 cursor-pointer"
                >
                  Simpan Regu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Assignment */}
      {isAssignmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full space-y-4 shadow-xl animate-scaleIn">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Buat Penugasan Blok Panen Baru
            </h3>
            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Blok Target</label>
                <input
                  type="text"
                  required
                  value={assignBlockCode}
                  onChange={(e) => setAssignBlockCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Target Janjang</label>
                  <input
                    type="number"
                    value={targetBunches}
                    onChange={(e) => setTargetBunches(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Target Tonase</label>
                  <input
                    type="number"
                    step="0.1"
                    value={targetTon}
                    onChange={(e) => setTargetTon(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAssignmentModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 cursor-pointer"
                >
                  Tugaskan Regu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
