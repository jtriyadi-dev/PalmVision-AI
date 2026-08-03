import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Camera,
  Smartphone,
  Check,
  X,
  Plus,
  RotateCcw,
  Users,
} from 'lucide-react';
import {
  INITIAL_ATTENDANCE,
  INITIAL_ATTENDANCE_CORRECTIONS,
  INITIAL_SHIFTS,
  INITIAL_OVERTIMES,
} from '../mockData';
import { AttendanceRecord, AttendanceCorrection, OvertimeRequest } from '../types';

export const AttendanceShiftView: React.FC = () => {
  const [attendanceLogs] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [corrections, setCorrections] = useState<AttendanceCorrection[]>(INITIAL_ATTENDANCE_CORRECTIONS);
  const [shifts] = useState(INITIAL_SHIFTS);
  const [overtimes, setOvertimes] = useState<OvertimeRequest[]>(INITIAL_OVERTIMES);
  const [activeTab, setActiveTab] = useState<'LOGS' | 'SHIFTS' | 'CORRECTIONS' | 'OVERTIME'>('LOGS');

  const approveCorrection = (id: string) => {
    setCorrections((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'APPROVED' } : c))
    );
  };

  const approveOvertime = (id: string) => {
    setOvertimes((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: 'APPROVED' } : o))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" />
            <span>Absensi, Shift Roster & Lembur</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Presensi GPS Offline, Face Recognition Ready, Fingerprint Station, Pengaturan Shift PKS & Overtime
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('LOGS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'LOGS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Absensi Real-Time ({attendanceLogs.length})
          </button>
          <button
            onClick={() => setActiveTab('SHIFTS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'SHIFTS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Roster Shift ({shifts.length})
          </button>
          <button
            onClick={() => setActiveTab('CORRECTIONS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'CORRECTIONS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Koreksi Absen ({corrections.filter((c) => c.status === 'PENDING').length})
          </button>
          <button
            onClick={() => setActiveTab('OVERTIME')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'OVERTIME' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lembur ({overtimes.length})
          </button>
        </div>
      </div>

      {/* LOGS TAB */}
      {activeTab === 'LOGS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300">Presensi Karyawan Hari Ini (GPS & Biometrik)</span>
              <span className="text-xs text-emerald-400 font-bold">100% Data Terverifikasi Location Tagging</span>
            </div>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              {attendanceLogs.map((att) => (
                <div key={att.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={att.photoVerificationUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                      alt={att.employeeName}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">{att.employeeName}</h4>
                      <p className="text-slate-400 text-[11px]">{att.department} • {att.shiftName}</p>
                      {att.gpsLocation && (
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          <span>{att.gpsLocation.locationName} ({att.gpsLocation.lat}, {att.gpsLocation.lng})</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-slate-500 text-[10px] block">Clock In - Clock Out</span>
                      <span className="font-mono text-emerald-400 font-extrabold text-sm block">{att.clockIn} - {att.clockOut}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 block">
                        {att.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{att.method}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SHIFTS TAB */}
      {activeTab === 'SHIFTS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {shifts.map((sft) => (
              <div key={sft.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {sft.shiftName}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{sft.assignedCount} Karyawan</span>
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm">{sft.estate}</h3>
                  <p className="text-xs text-slate-400">{sft.division}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 flex items-center justify-between">
                  <span>Jam Kerja:</span>
                  <span className="font-bold">{sft.startTime} - {sft.endTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CORRECTIONS TAB */}
      {activeTab === 'CORRECTIONS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">Pengajuan Koreksi Absensi Mandor & Operator</span>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              {corrections.map((corr) => (
                <div key={corr.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{corr.employeeName}</h4>
                    <p className="text-slate-400">Tanggal: {corr.date}</p>
                    <p className="text-slate-300 text-[11px] mt-1 bg-slate-900 p-2 rounded border border-slate-800">
                      <strong>Alasan:</strong> {corr.reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-slate-500 text-[10px] block">Usulan Jam:</span>
                      <span className="font-mono text-amber-400 font-bold">{corr.proposedClockIn} - {corr.proposedClockOut}</span>
                    </div>

                    {corr.status === 'PENDING' ? (
                      <button
                        onClick={() => approveCorrection(corr.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Setujui</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                        {corr.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* OVERTIME TAB */}
      {activeTab === 'OVERTIME' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300">Pengajuan & Biaya Lembur Karyawan (SPL)</span>
              <button
                onClick={() => alert('Form Surat Perintah Lembur SIAP')}
                className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 cursor-pointer"
              >
                + Buat SPL Lembur
              </button>
            </div>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              {overtimes.map((ovt) => (
                <div key={ovt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{ovt.employeeName}</h4>
                    <p className="text-slate-400">Tanggal: {ovt.date} ({ovt.hours} Jam Lembur)</p>
                    <p className="text-slate-300 mt-1">{ovt.activityDescription}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-slate-500 text-[10px] block">Estimasi Upah Lembur</span>
                      <span className="font-bold text-emerald-400">Rp {ovt.calculatedCostIdr.toLocaleString('id-ID')}</span>
                    </div>

                    {ovt.status === 'PENDING' ? (
                      <button
                        onClick={() => approveOvertime(ovt.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                        {ovt.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
