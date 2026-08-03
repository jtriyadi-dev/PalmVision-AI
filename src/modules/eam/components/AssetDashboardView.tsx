import React from 'react';
import {
  Wrench,
  Truck,
  HardHat,
  Fuel,
  DollarSign,
  AlertTriangle,
  Sparkles,
  Clock,
  ShieldAlert,
  Activity,
  Boxes,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Search,
  ArrowRight,
} from 'lucide-react';
import {
  AssetItem,
  FleetVehicle,
  HeavyEquipment,
  WorkshopJobOrder,
  PreventivePlan,
  CorrectiveWorkOrder,
  FuelTransaction,
  AiPredictiveMaintenanceInsight,
} from '../types';

interface AssetDashboardViewProps {
  assets?: AssetItem[];
  vehicles?: FleetVehicle[];
  heavyEquipment?: HeavyEquipment[];
  workshopJobs?: WorkshopJobOrder[];
  preventivePlans?: PreventivePlan[];
  correctiveWos?: CorrectiveWorkOrder[];
  fuelTransactions?: FuelTransaction[];
  aiInsights?: AiPredictiveMaintenanceInsight[];
  onNavigateSubTab?: (tabId: string) => void;
}

export const AssetDashboardView: React.FC<AssetDashboardViewProps> = ({
  assets = [],
  vehicles = [],
  heavyEquipment = [],
  workshopJobs = [],
  preventivePlans = [],
  correctiveWos = [],
  fuelTransactions = [],
  aiInsights = [],
  onNavigateSubTab = () => {},
}) => {
  const totalAssets = assets.length;
  const totalVehicles = vehicles.length;
  const totalHeavy = heavyEquipment.length;
  const openJobs = workshopJobs.filter((j) => j.status !== 'Completed').length;
  const pmDue = preventivePlans.filter((p) => p.status === 'Overdue' || p.status === 'Due Soon').length;
  const openCorrective = correctiveWos.filter((c) => c.status !== 'Completed').length;
  const totalFuelLiters = fuelTransactions.reduce((acc, f) => acc + f.quantityLiters, 0);
  const totalFuelCost = fuelTransactions.reduce((acc, f) => acc + f.totalCost, 0);
  const totalMaintCost = correctiveWos.reduce((acc, c) => acc + c.actualCost, 0) + workshopJobs.reduce((acc, w) => acc + w.totalCost, 0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700/80 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Prompt 10 Complete
            </span>
            <span className="text-xs text-slate-400">Enterprise Asset & Fleet Operations</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Asset & Fleet Management (EAM) <Wrench className="h-6 w-6 text-emerald-400" />
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Sistem pengolahan siklus hidup aset terpadu: Registrasi Barcode/RFID, Fleet & Alat Berat, Workshop Job Order, Preventive/Corrective Maintenance, BBM & AI Predictive Health.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigateSubTab('register')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
          >
            <Boxes className="h-4 w-4" />
            + Tambah Aset Baru
          </button>
          <button
            onClick={() => onNavigateSubTab('workshop')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Wrench className="h-4 w-4 text-emerald-400" />
            Job Order Workshop
          </button>
        </div>
      </div>

      {/* Top 8 Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold">Total Aset</span>
            <Boxes className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-lg font-black text-white">{totalAssets}</p>
          <span className="text-[10px] text-emerald-400 font-bold">Terdaftar</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold">Armada Fleet</span>
            <Truck className="h-4 w-4 text-blue-400" />
          </div>
          <p className="text-lg font-black text-white">{totalVehicles}</p>
          <span className="text-[10px] text-blue-400 font-bold">Mobil & Truck</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold">Alat Berat</span>
            <HardHat className="h-4 w-4 text-amber-400" />
          </div>
          <p className="text-lg font-black text-white">{totalHeavy}</p>
          <span className="text-[10px] text-amber-400 font-bold">Heavy Equipment</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold">Workshop Job</span>
            <Wrench className="h-4 w-4 text-purple-400" />
          </div>
          <p className="text-lg font-black text-white">{openJobs}</p>
          <span className="text-[10px] text-purple-400 font-bold">Aktif Dikerjakan</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold">PM Maintenance</span>
            <Clock className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-lg font-black text-amber-300">{pmDue}</p>
          <span className="text-[10px] text-amber-400 font-bold">Due / Overdue</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold">Corrective WO</span>
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </div>
          <p className="text-lg font-black text-rose-300">{openCorrective}</p>
          <span className="text-[10px] text-rose-400 font-bold">Perbaikan Aktif</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold">Konsumsi BBM</span>
            <Fuel className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-lg font-black text-white">{totalFuelLiters.toLocaleString('id-ID')} L</p>
          <span className="text-[10px] text-emerald-400 font-bold">Rp {(totalFuelCost / 1000000).toFixed(1)} Jt</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold">Biaya Perawatan</span>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-lg font-black text-white">Rp {(totalMaintCost / 1000000).toFixed(1)}M</p>
          <span className="text-[10px] text-emerald-400 font-bold">Kombinasi Parts+Labor</span>
        </div>
      </div>

      {/* AI Predictive Maintenance Alert Banner */}
      {aiInsights.length > 0 && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-800/60 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
              <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-purple-300 uppercase tracking-wider">
                  AI Predictive Maintenance Intelligence Active
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Risk Level High ({aiInsights[0].failureRiskPercent}%)
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {aiInsights[0].assetName} ({aiInsights[0].assetCode}): Terdeteksi {aiInsights[0].predictedFailureComponent}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Rekomendasi AI: {aiInsights[0].recommendedAction} • Potensi Penghematan Biaya: Rp {(aiInsights[0].estimatedSavedCost / 1000000).toFixed(1)} Juta
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateSubTab('ai-predictive')}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            Buka AI Health Analytics <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Urgent Maintenance & Workshop Jobs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Workshop Job Orders */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Workshop Job Orders Aktif</h3>
              </div>
              <button
                onClick={() => onNavigateSubTab('workshop')}
                className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Lihat Semua ({workshopJobs.length}) <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="space-y-3">
              {workshopJobs.map((job) => (
                <div key={job.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">{job.jobOrderNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        job.priority === 'Emergency' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {job.priority}
                      </span>
                      <span className="text-xs font-semibold text-slate-300">• {job.assetName} ({job.assetCode})</span>
                    </div>
                    <p className="text-xs text-slate-400">{job.complaint}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                      <span>Mekanik Utama: <strong className="text-slate-200">{job.leadMechanic}</strong></span>
                      <span>Target Selesai: <strong className="text-slate-200">{job.estimatedCompletion}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      job.status === 'In Progress' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Submodule Navigation Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => onNavigateSubTab('fleet')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-left group cursor-pointer"
            >
              <Truck className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform mb-2" />
              <h4 className="text-xs font-bold text-white">Armada Fleet</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Mobil, Truck, STNK, KIR & Pajak</p>
            </button>

            <button
              onClick={() => onNavigateSubTab('fleet')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-left group cursor-pointer"
            >
              <HardHat className="h-5 w-5 text-amber-400 group-hover:scale-110 transition-transform mb-2" />
              <h4 className="text-xs font-bold text-white">Alat Berat</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Excavator, Buldozer & Produktivitas</p>
            </button>

            <button
              onClick={() => onNavigateSubTab('fuel')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-left group cursor-pointer"
            >
              <Fuel className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform mb-2" />
              <h4 className="text-xs font-bold text-white">Manajemen BBM</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Tangki, Transaksi & Odometer</p>
            </button>

            <button
              onClick={() => onNavigateSubTab('gps')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all text-left group cursor-pointer"
            >
              <Activity className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform mb-2" />
              <h4 className="text-xs font-bold text-white">GPS Live Tracking</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Lokasi Realtime & Geofence</p>
            </button>
          </div>
        </div>

        {/* Right Column: PM Overdue List & Quick Asset Health */}
        <div className="space-y-6">
          {/* Preventive Maintenance Status */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Jadwal Maintenance Mendatang</h3>
              </div>
              <button
                onClick={() => onNavigateSubTab('preventive')}
                className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
              >
                Atur
              </button>
            </div>

            <div className="space-y-3">
              {preventivePlans.map((plan) => (
                <div key={plan.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-200">{plan.planCode}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      plan.status === 'Overdue' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{plan.planName}</h4>
                  <p className="text-[11px] text-slate-400">
                    Aset: {plan.assetName} • Interval: {plan.intervalValue} {plan.intervalUnit}
                  </p>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1 border-t border-slate-900">
                    <span>Estimasi Biaya: Rp {(plan.estimatedCost / 1000000).toFixed(1)} Jt</span>
                    <span className="text-emerald-400 font-bold">{plan.responsibleTeam}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asset Health Overview */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Status Kesehatan Aset Enterprise
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Aset Beroperasi Normal</span>
                <span className="font-bold text-emerald-400">82%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-300">Dalam Perawatan Workshop</span>
                <span className="font-bold text-amber-400">12%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '12%' }}></div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-slate-300">Breakdown & Kerusakan Critical</span>
                <span className="font-bold text-rose-400">6%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-rose-500 h-2 rounded-full" style={{ width: '6%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
