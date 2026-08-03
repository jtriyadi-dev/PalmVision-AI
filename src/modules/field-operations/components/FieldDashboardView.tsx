import React from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  Wifi,
  WifiOff,
  CloudSun,
  Sparkles,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  WorkOrderRecord,
  TaskAssignmentItem,
  DailyActivityRecord,
  GpsTrackingPoint,
  AiOperationRecommendation,
} from '../types';

interface FieldDashboardViewProps {
  workOrders: WorkOrderRecord[];
  tasks: TaskAssignmentItem[];
  dailyActivities: DailyActivityRecord[];
  gpsTracks: GpsTrackingPoint[];
  aiRecommendations: AiOperationRecommendation[];
  onNavigateSubTab: (subTab: string) => void;
}

export const FieldDashboardView: React.FC<FieldDashboardViewProps> = ({
  workOrders,
  tasks,
  dailyActivities,
  gpsTracks,
  aiRecommendations,
  onNavigateSubTab,
}) => {
  const totalWO = workOrders.length;
  const completedWO = workOrders.filter((w) => w.status === 'Completed').length;
  const inProgressWO = workOrders.filter((w) => w.status === 'In Progress').length;
  const pendingWO = workOrders.filter((w) => w.status === 'Assigned' || w.status === 'Draft').length;

  const activeTeamsCount = gpsTracks.filter((g) => g.isOnline).length;
  const offlineDevicesCount = gpsTracks.filter((g) => !g.isOnline).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 11+ KPI Widgets Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Today's Tasks / WO</span>
            <Activity className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {totalWO} <span className="text-xs font-semibold">Work Order</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold">Terjadwal Hari Ini</p>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Completed Tasks</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
            {completedWO}
          </div>
          <p className="text-[10px] text-slate-500">
            {((completedWO / (totalWO || 1)) * 100).toFixed(0)}% Selesai
          </p>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">In Progress</span>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-xl font-black text-blue-600 dark:text-blue-400">
            {inProgressWO}
          </div>
          <p className="text-[10px] text-slate-500">Sedang Dikerjakan</p>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Pending / Draft</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400">
            {pendingWO}
          </div>
          <p className="text-[10px] text-amber-600 font-bold">Antrian Penugasan</p>
        </div>

        {/* KPI 5 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Active Teams</span>
            <Users className="h-4 w-4 text-teal-600" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            18 <span className="text-xs font-semibold">Regu</span>
          </div>
          <p className="text-[10px] text-emerald-600 font-bold">142 Pekerja di Lapangan</p>
        </div>

        {/* KPI 6 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">GPS Online / Live</span>
            <Wifi className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">
            {activeTeamsCount}
          </div>
          <p className="text-[10px] text-slate-500">Perangkat Online</p>
        </div>

        {/* KPI 7 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Offline Devices</span>
            <WifiOff className="h-4 w-4 text-slate-400" />
          </div>
          <div className="text-xl font-black text-slate-700 dark:text-slate-300">
            {offlineDevicesCount}
          </div>
          <p className="text-[10px] text-slate-400">Mode Antrian Offline</p>
        </div>

        {/* KPI 8 */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold">Daily Attendance</span>
            <ShieldCheck className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            96.8%
          </div>
          <p className="text-[10px] text-emerald-600 font-bold">Selfie & GPS Verified</p>
        </div>

        {/* KPI 9 Weather Placeholder */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white border border-blue-800/40 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-blue-300">
            <span className="text-[11px] font-bold">Weather Today</span>
            <CloudSun className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-white">
            29°C <span className="text-xs font-normal">Cerah Berawan</span>
          </div>
          <p className="text-[10px] text-blue-200">Kelembaban 78% • Hujan 10%</p>
        </div>

        {/* KPI 10 & 11 Span 3 columns */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white border border-emerald-800/40 shadow-xs space-y-1 col-span-2 sm:col-span-3 lg:col-span-3">
          <div className="flex items-center justify-between text-emerald-300">
            <span className="text-xs font-bold flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-emerald-400" /> AI Operational Recommendation
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              Prompt 7 Assistant Active
            </span>
          </div>
          <p className="text-xs font-semibold text-white mt-1">
            "Potensi hujan lokal di Afdeling III siang ini. Prioritaskan aplikasi pemupukan NPK di Blok A01 pagi ini sebelum pukul 11:30 WIB."
          </p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-slate-300">Rekomendasi otomatis berbasis data BMKG & GIS Spasial</span>
            <button
              onClick={() => onNavigateSubTab('ai-assistant')}
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Lihat Detail</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Sections: Work Orders Overview & Quick Mobile Mandor Entry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Work Orders List Section */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Digital Work Orders Berjalan
              </h3>
              <p className="text-xs text-slate-500">
                Penugasan aktivitas operasional lapangan yang terintegrasi dengan Mandor Mobile & GIS
              </p>
            </div>
            <button
              onClick={() => onNavigateSubTab('work-order')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Kelola Work Order</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {workOrders.map((wo) => (
              <div
                key={wo.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3 hover:border-emerald-500/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold font-mono">
                      {wo.woNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                      {wo.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        wo.priority === 'Darurat'
                          ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400'
                          : wo.priority === 'Tinggi'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {wo.priority}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                    {wo.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    {wo.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {wo.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 gap-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                    {wo.estateName} • {wo.blockCode}
                  </span>
                  <span>Mandor: {wo.mandorName}</span>
                  <span>Target: {wo.targetQuantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Mandor Mobile Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white border border-slate-800 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Mandor Mobile UI</h3>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
              Offline First
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Antarmuka mobile khusus mandor perkebunan dengan navigasi satu tangan, absensi selfie GPS, dan mode kerja tanpa sinyal.
          </p>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
              <span className="text-emerald-400 font-bold block">1. Quick Check-In & Absensi</span>
              <p className="text-slate-300 text-[11px]">
                Absensi mandor & regu kerja terverifikasi GPS lokasi blok dan selfie foto.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
              <span className="text-blue-400 font-bold block">2. Mode Offline & Auto Sync</span>
              <p className="text-slate-300 text-[11px]">
                Pencatatan aktivitas tersimpan aman di HP meski tanpa sinyal, otomatis tersinkron saat ada koneksi.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
              <span className="text-amber-400 font-bold block">3. Checklist & Foto Bukti</span>
              <p className="text-slate-300 text-[11px]">
                Input checklist digital & unggah foto kegiatan dengan geo-tagging otomatis.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateSubTab('mandor-mobile')}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Buka Antarmuka Mandor Mobile</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
