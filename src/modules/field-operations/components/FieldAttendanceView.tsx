import React, { useState } from 'react';
import { UserCheck, ShieldCheck, MapPin, Search, Plus, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { AttendanceFieldRecord } from '../types';

interface FieldAttendanceViewProps {
  attendances: AttendanceFieldRecord[];
  onAddAttendance: (att: AttendanceFieldRecord) => void;
}

export const FieldAttendanceView: React.FC<FieldAttendanceViewProps> = ({
  attendances,
  onAddAttendance,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAttendances = attendances.filter(
    (a) =>
      a.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari karyawan / NIK / peran..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          onClick={() => alert('Quick Check-In Absensi Mandor')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <UserCheck className="h-4 w-4" />
          <span>Quick Absensi GPS & Selfie</span>
        </button>
      </div>

      {/* Attendance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAttendances.map((att) => (
          <div
            key={att.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={att.selfiePhotoUrl}
                  alt={att.employeeName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {att.employeeName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {att.role} • NIK: <span className="font-mono">{att.employeeId}</span>
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                {att.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-slate-400 text-[10px] block">Waktu Check-In & GPS</span>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  {att.checkInTime}
                </span>
                <span className="text-[10px] text-emerald-600 block">{att.checkInGps.blockCode}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1">
                <span className="text-slate-400 text-[10px] block">Waktu Check-Out</span>
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  {att.checkOutTime || 'Belum Check-Out'}
                </span>
                <span className="text-[10px] text-slate-400 block">Sesi Masih Aktif</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-500">
              <span className="flex items-center gap-1 font-bold text-emerald-600">
                <ShieldCheck className="h-3.5 w-3.5" />
                QR Code Validated
              </span>
              <span>{att.estateName} • {att.afdelingName}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
