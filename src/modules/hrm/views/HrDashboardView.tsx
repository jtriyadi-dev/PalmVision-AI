import React from 'react';
import {
  Users,
  UserCheck,
  UserX,
  Clock,
  Calendar,
  CreditCard,
  GraduationCap,
  Award,
  Sparkles,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Building2,
  FileCheck,
  Zap,
} from 'lucide-react';
import { INITIAL_EMPLOYEES, INITIAL_ATTENDANCE, INITIAL_PAYROLL_PERIODS, INITIAL_AI_WORKFORCE_INSIGHTS } from '../mockData';

interface HrDashboardViewProps {
  onNavigateSubTab: (tab: string) => void;
}

export const HrDashboardView: React.FC<HrDashboardViewProps> = ({ onNavigateSubTab }) => {
  const totalEmployees = INITIAL_EMPLOYEES.length + 1010; // Simulated scale
  const permanentSkuCount = 740;
  const contractBhlCount = 210;
  const dailyWorkersCount = 65;

  const latestPayroll = INITIAL_PAYROLL_PERIODS[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/40 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Users className="w-64 h-64 text-emerald-400" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>PalmVision HRIS Enterprise v4.2 Active</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Human Resource & Workforce Intelligence
            </h1>
            <p className="text-sm text-slate-300 max-w-2xl mt-1">
              Manajemen 1,015+ Karyawan SKU, BHL, Mandor Panen & Operator PKS PT Nusantara Palm Lestari. Terintegrasi dengan Payroll, BPJS, PPh21 TER, dan ESS Mobile.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateSubTab('ess')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Portal ESS Mobile</span>
            </button>
            <button
              onClick={() => onNavigateSubTab('payroll')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Proses Payroll</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Total Employees */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Karyawan</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{totalEmployees.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+2.4% MoM</span>
          </div>
        </div>

        {/* Kehadiran Hari Ini */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Hadir Hari Ini</span>
            <UserCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">982 <span className="text-xs text-slate-400 font-normal">/ 1,015</span></div>
          <div className="text-[11px] text-emerald-400 font-bold">96.7% Rate Kehadiran</div>
        </div>

        {/* Cuti & Izin */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Cuti / Sakit / Izin</span>
            <Calendar className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">18</div>
          <div className="text-[11px] text-slate-400">12 Cuti, 6 Sakit</div>
        </div>

        {/* Absen / Alpha */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Mangkir / Alpha</span>
            <UserX className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400">15</div>
          <div className="text-[11px] text-rose-400/80 font-bold">Terdeteksi Mandor</div>
        </div>

        {/* Total Payroll Running */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Payroll Juli 2026</span>
            <CreditCard className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-extrabold text-white">Rp 4.85 M</div>
          <div className="text-[11px] text-cyan-400 font-bold">100% Disetujui Direksi</div>
        </div>

        {/* Sertifikasi Expired */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 shadow-sm hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Sertifikat SIO Expiring</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-extrabold text-purple-400">3</div>
          <div className="text-[11px] text-purple-300">Operator Boiler & Heavy</div>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Workforce Demographics & Attendance Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Karyawan & Distributon */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-bold text-white">Komposisi Tenaga Kerja Perkebunan</h2>
              </div>
              <button
                onClick={() => onNavigateSubTab('employee')}
                className="text-xs text-emerald-400 font-bold hover:underline"
              >
                Lihat Semua Profil →
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold block">SKU Permanent</span>
                <span className="text-xl font-black text-emerald-400">{permanentSkuCount} <span className="text-xs font-normal text-slate-400">(73%)</span></span>
                <p className="text-[11px] text-slate-500">Karyawan Bulanan Tetap</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold block">BHL (Kontrak)</span>
                <span className="text-xl font-black text-cyan-400">{contractBhlCount} <span className="text-xs font-normal text-slate-400">(21%)</span></span>
                <p className="text-[11px] text-slate-500">Harian Lepas & Panen PKWT</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 font-bold block">Pekerja Musiman</span>
                <span className="text-xl font-black text-amber-400">{dailyWorkersCount} <span className="text-xs font-normal text-slate-400">(6%)</span></span>
                <p className="text-[11px] text-slate-500">Tenaga Pemupukan Borongan</p>
              </div>
            </div>

            {/* Attendance Live Log Sample */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-slate-300 block">Absensi Real-Time Afdeling & PKS Today</span>
              <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                {INITIAL_ATTENDANCE.map((att) => (
                  <div key={att.id} className="p-3 flex items-center justify-between text-xs hover:bg-slate-900/60 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold">
                        {att.employeeName.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block">{att.employeeName}</span>
                        <span className="text-[11px] text-slate-400">{att.department} • {att.shiftName}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-emerald-400 font-bold block">{att.clockIn}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">{att.method}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payroll & BPJS Summary Card */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h2 className="text-base font-bold text-white">Ringkasan Payroll & Kepatuhan BPJS / PPh21 TER</h2>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                {latestPayroll.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Total Gaji Bruto</span>
                <span className="text-lg font-bold text-white">Rp {latestPayroll.totalGrossPayrollIdr.toLocaleString('id-ID')}</span>
                <span className="text-[10px] text-slate-500 block">Gaji Pokok + Premi Panen TBS + Lembur</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Potongan BPJS & PPh21 TER</span>
                <span className="text-lg font-bold text-amber-400">
                  Rp {(latestPayroll.totalBpjsPaidIdr + latestPayroll.totalPph21Idr).toLocaleString('id-ID')}
                </span>
                <span className="text-[10px] text-slate-500 block">BPJS Kes (5%) + BPJS TK (9.24%) + PPh21 TER</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-medium block">Nett Payroll Disalurkan</span>
                <span className="text-lg font-bold text-emerald-400">Rp {latestPayroll.totalNettPayrollIdr.toLocaleString('id-ID')}</span>
                <span className="text-[10px] text-slate-500 block">Transfer Rekening Mandiri / BRI / BNI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Workforce Intelligence & Quick Actions */}
        <div className="space-y-6">
          {/* AI Workforce Insights Widget */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-800/60 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                <h2 className="text-base font-bold text-white">AI Workforce Intelligence</h2>
              </div>
              <span className="text-[10px] font-bold bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full">
                Prediksi Geminis 96%
              </span>
            </div>

            <div className="space-y-3">
              {INITIAL_AI_WORKFORCE_INSIGHTS.map((insight) => (
                <div key={insight.id} className="p-3.5 rounded-xl bg-slate-950/90 border border-emerald-900/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-400 tracking-wide uppercase text-[10px]">
                      {insight.metricType.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      Akurasi {insight.confidenceScorePercent}%
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {insight.predictionSummary}
                  </p>
                  <div className="p-2 rounded bg-emerald-950/80 border border-emerald-800/40 text-[11px] text-emerald-300">
                    <span className="font-bold">Rekomendasi AI:</span> {insight.actionableRecommendation}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateSubTab('ai-intelligence')}
              className="w-full py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all text-center block cursor-pointer"
            >
              Lihat Analisis AI Ketenagakerjaan Lengkap →
            </button>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <span className="font-bold text-slate-300 block mb-1">Aksi Cepat HRD & Supervisor</span>

            <button
              onClick={() => onNavigateSubTab('leave')}
              className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-left flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Persetujuan Cuti & Izin</span>
              </div>
              <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold text-[10px]">2 Baru</span>
            </button>

            <button
              onClick={() => onNavigateSubTab('recruitment')}
              className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-left flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Pelamar Rekrutmen Baru</span>
              </div>
              <span className="bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded font-bold text-[10px]">14 Pelamar</span>
            </button>

            <button
              onClick={() => onNavigateSubTab('contracts')}
              className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold text-left flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-amber-400" />
                <span>Kontrak PKWT Expiring</span>
              </div>
              <span className="bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-bold text-[10px]">1 Expiring</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
