import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  FileText,
  UserCheck,
  Check,
  X,
  AlertCircle,
} from 'lucide-react';
import { INITIAL_LEAVE_REQUESTS } from '../mockData';
import { LeaveRequest } from '../types';

export const LeavePermissionView: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(INITIAL_LEAVE_REQUESTS);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');

  const approveLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'APPROVED' } : l))
    );
  };

  const rejectLeave = (id: string) => {
    setLeaveRequests((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'REJECTED' } : l))
    );
  };

  const filtered = leaveRequests.filter(
    (l) => selectedTypeFilter === 'ALL' || l.leaveType === selectedTypeFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <span>Manajemen Cuti, Izin & Dispensasi Karyawan</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pengajuan & Workflow Persetujuan Cuti Tahunan, Cuti Besar, Melahirkan, Sakit Klinik & Izin Dinas
          </p>
        </div>

        <button
          onClick={() => alert('Form Pengajuan Cuti Baru SIAP')}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Pengajuan Cuti Baru</span>
        </button>
      </div>

      {/* Leave Summary Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium block">Total Cuti Tahunan Hak SKU</span>
          <span className="text-xl font-extrabold text-white">12 Hari / Tahun</span>
          <span className="text-[10px] text-emerald-400 block">+6 Hari Cuti Besar per 6 Tahun</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium block">Permohonan Menunggu Approval</span>
          <span className="text-xl font-extrabold text-amber-400">
            {leaveRequests.filter((l) => l.status === 'PENDING_SUPERVISOR').length} Pengajuan
          </span>
          <span className="text-[10px] text-slate-400 block">Supervisor Afdeling</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium block">Disetujui Bulan Ini</span>
          <span className="text-xl font-extrabold text-emerald-400">
            {leaveRequests.filter((l) => l.status === 'APPROVED').length} Pengajuan
          </span>
          <span className="text-[10px] text-slate-500 block">Terhubung Roster Master</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 font-medium block">Sakit Terkonfirmasi Surat Klinik</span>
          <span className="text-xl font-extrabold text-cyan-400">1 Karyawan</span>
          <span className="text-[10px] text-cyan-300 block">Klinik Estate Sei Riau</span>
        </div>
      </div>

      {/* Leave Filter & List */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-bold text-slate-300">Daftar Pengajuan Cuti & Izin Real-Time</span>
          <div className="flex items-center gap-1.5 text-xs">
            {['ALL', 'CUTI_TAHUNAN', 'CUTI_SAKIT', 'CUTI_MELAHIRKAN'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTypeFilter(t)}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all ${
                  selectedTypeFilter === t
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {t === 'ALL' ? 'Semua Jenis' : t.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          {filtered.map((leave) => (
            <div key={leave.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-sm">{leave.employeeName}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {leave.employeeId}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                    {leave.leaveType.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-slate-400">
                  Periode: <strong className="text-white">{leave.startDate} s/d {leave.endDate}</strong> ({leave.totalDays} Hari Kerja)
                </p>
                <p className="text-slate-300 text-[11px] bg-slate-900 p-2 rounded border border-slate-800 mt-1">
                  <strong>Keterangan / Alasan:</strong> {leave.reason}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {leave.status === 'PENDING_SUPERVISOR' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveLeave(leave.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Setujui</span>
                    </button>
                    <button
                      onClick={() => rejectLeave(leave.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Tolak</span>
                    </button>
                  </div>
                ) : (
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-lg border ${
                      leave.status === 'APPROVED'
                        ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                        : 'bg-rose-950 text-rose-400 border-rose-800'
                    }`}
                  >
                    {leave.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
