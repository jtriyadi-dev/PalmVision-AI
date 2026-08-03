import React from 'react';
import { 
  Trees, 
  Wheat, 
  TrendingUp, 
  Sparkles, 
  Fuel, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowUpRight, 
  ChevronRight,
  FileText,
  Boxes,
  Users
} from 'lucide-react';
import { CompanyContext, UserRole } from '../../types';

interface FoundationDashboardProps {
  context: CompanyContext;
  userRole: UserRole;
  onOpenAiAssistant: () => void;
  onSelectModule: (id: string) => void;
}

export const FoundationDashboard: React.FC<FoundationDashboardProps> = ({
  context,
  userRole,
  onOpenAiAssistant,
  onSelectModule,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Executive Welcome Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-xl relative overflow-hidden border border-emerald-700/40">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              Live Context: {context.companyName} • {context.estateName}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1 tracking-tight">
              Executive Wireframe Dashboard
            </h1>
            <p className="text-xs text-emerald-100/90 mt-1 max-w-2xl leading-relaxed">
              Monitoring real-time operasional panen TBS, BJR, distribusi solar, dan presensi mandor di <strong className="text-white">{context.afdelingName} ({context.blockCode})</strong>.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAiAssistant}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-md hover:from-amber-400 hover:to-amber-500 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>PalmVision AI Insight</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Estimasi Panen TBS Today</span>
            <Wheat className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            142.8 <span className="text-xs font-semibold text-slate-500">Ton</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <ArrowUpRight className="h-3.5 w-3.5" /> +12.4% vs Target BJR
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Kerapatan Buah Matang</span>
            <Trees className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            18.4 <span className="text-xs font-semibold text-slate-500">Kg / Janjang</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" /> Rotasi Panen 7 Hari
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Konsumsi Solar BBM Truk</span>
            <Fuel className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            420 <span className="text-xs font-semibold text-slate-500">Liter</span>
          </div>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" /> Normal (0.8L/Ton TBS)
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Presensi Mandor & Pemanen</span>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            96.2% <span className="text-xs font-semibold text-slate-500">(128/133)</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircleIcon className="h-3.5 w-3.5" /> BKM Offline Sync Ready
          </p>
        </div>
      </div>

      {/* AI Advisory Callout */}
      <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 text-white shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-amber-300 font-bold">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-amber-300 uppercase tracking-wider block">
              PalmVision AI Executive Insight
            </span>
            <p className="text-slate-200 mt-0.5 max-w-xl">
              "Kadar ALB PKS stabil di 2.85%. Rekomendasi AI: Lakukan pemupukan NPK di Blok B12 dalam 3 hari ke depan mengingat prediksi curah hujan 120mm/minggu."
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectModule('architecture-blueprints')}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Eksplor Blueprint Architecture</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
