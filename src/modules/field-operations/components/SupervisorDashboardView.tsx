import React from 'react';
import { Users, Activity, CheckCircle2, MapPin, TrendingUp, ShieldCheck, Clock, Award } from 'lucide-react';
import { GpsTrackingPoint, WorkOrderRecord, AttendanceFieldRecord } from '../types';

interface SupervisorDashboardViewProps {
  gpsTracks: GpsTrackingPoint[];
  workOrders: WorkOrderRecord[];
  attendanceRecords: AttendanceFieldRecord[];
}

export const SupervisorDashboardView: React.FC<SupervisorDashboardViewProps> = ({
  gpsTracks,
  workOrders,
  attendanceRecords,
}) => {
  const activeTeams = gpsTracks.filter((g) => g.isOnline);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Tim Aktif di Lapangan</span>
            <Users className="h-5 w-5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            18 / 20 <span className="text-xs font-semibold text-emerald-600">Regu Aktif</span>
          </div>
          <p className="text-[11px] text-slate-500">Total 142 Tenaga Kerja Terdaftar</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Pencapaian Work Order</span>
            <Activity className="h-5 w-5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
            87.5%
          </div>
          <p className="text-[11px] text-emerald-600 font-bold">+4.2% dibanding target kemarin</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Tingkat Kehadiran Mandor</span>
            <ShieldCheck className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            100%
          </div>
          <p className="text-[11px] text-slate-500">Tersinkronisasi Selfie & QR GPS</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold">Rata-rata Jarak Jelajah GPS</span>
            <MapPin className="h-5 w-5 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-teal-600 dark:text-teal-400">
            10.5 KM
          </div>
          <p className="text-[11px] text-slate-500">Monitoring Breadcrumb Real-Time</p>
        </div>
      </div>

      {/* Active Team Supervision Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Supervisi Tim & Mandor Lapangan Real-Time
            </h3>
            <p className="text-xs text-slate-500">
              Pantau lokasi, baterai perangkat HP, kecepatan pergerakan, dan produktivitas mandor
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
            Live GPS Tracking Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gpsTracks.map((gt) => (
            <div
              key={gt.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={gt.avatarUrl}
                    alt={gt.userName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {gt.userName}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">{gt.role}</span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    gt.isOnline
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {gt.isOnline ? 'Online GPS' : 'Offline'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block">Lokasi & Blok</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {gt.currentLocation.blockCode}
                  </span>
                  <span className="text-[10px] text-slate-500 block">{gt.currentLocation.address}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400 block">Statistik Hari Ini</span>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {gt.todayDistanceKm} KM Jelajah
                  </span>
                  <span className="text-[10px] text-slate-500 block">Kec: {gt.speedKmh} km/jam • Baterai: {gt.batteryPct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
