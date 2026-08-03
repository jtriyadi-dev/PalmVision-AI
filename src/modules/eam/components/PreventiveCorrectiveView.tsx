import React, { useState } from 'react';
import {
  Clock,
  AlertTriangle,
  Calendar,
  Wrench,
  CheckCircle2,
  Plus,
  DollarSign,
  User,
  ShieldAlert,
  ArrowRight,
  Filter,
  Search,
} from 'lucide-react';
import {
  PreventivePlan,
  CorrectiveWorkOrder,
  MaintenanceCalendarEvent,
  AssetItem,
} from '../types';

interface PreventiveCorrectiveViewProps {
  preventivePlans?: PreventivePlan[];
  correctiveWos?: CorrectiveWorkOrder[];
  calendarEvents?: MaintenanceCalendarEvent[];
  assets?: AssetItem[];
  onAddPreventive?: (plan: PreventivePlan) => void;
  onAddCorrective?: (wo: CorrectiveWorkOrder) => void;
}

export const PreventiveCorrectiveView: React.FC<PreventiveCorrectiveViewProps> = ({
  preventivePlans = [],
  correctiveWos = [],
  calendarEvents = [],
  assets = [],
  onAddPreventive = () => {},
  onAddCorrective = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'preventive' | 'corrective' | 'calendar'>('preventive');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-400" /> Preventive & Corrective Maintenance Engine
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Perencanaan Pemeliharaan Terjadwal (HM/KM/Tanggal) & Work Order Perbaikan Kerusakan Unit.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('preventive')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'preventive' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Preventive ({preventivePlans.length})
          </button>
          <button
            onClick={() => setActiveTab('corrective')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'corrective' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Corrective WO ({correctiveWos.length})
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'calendar' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Kalender Service
          </button>
        </div>
      </div>

      {/* Tab 1: Preventive Maintenance */}
      {activeTab === 'preventive' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {preventivePlans.map((plan) => (
              <div key={plan.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400">{plan.planCode}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{plan.planName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Aset: <strong>{plan.assetName}</strong> ({plan.assetCode})
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      plan.status === 'Overdue'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {plan.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block">Pemicu Service</span>
                    <span className="font-bold text-slate-200 mt-0.5 block">
                      {plan.triggerType}: {plan.intervalValue} {plan.intervalUnit}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-bold block">Target Service Berikutnya</span>
                    <span className="font-mono font-bold text-emerald-400 mt-0.5 block">{plan.nextServiceValue}</span>
                  </div>
                </div>

                {/* Required Parts */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400">Part & Pelumas Dibutuhkan:</span>
                  <div className="flex flex-wrap gap-1">
                    {plan.requiredParts.map((part, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                        {part}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Tim Penanggung Jawab: <strong className="text-white">{plan.responsibleTeam}</strong></span>
                  <button
                    onClick={() => alert(`Jadwal PM ${plan.planCode} otomatis dikirim ke Job Order Workshop`)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] cursor-pointer"
                  >
                    Generate Job Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Corrective Maintenance WOs */}
      {activeTab === 'corrective' && (
        <div className="space-y-4">
          <div className="space-y-4">
            {correctiveWos.map((wo) => (
              <div key={wo.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">{wo.woNumber}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        wo.priority === 'Emergency' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {wo.priority}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1">{wo.assetName} ({wo.assetCode})</h3>
                    <p className="text-xs text-slate-400">Pelapor: {wo.reportedBy} • Tanggal Laporan: {wo.reportedDate}</p>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-xs">
                    Status: {wo.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="font-bold text-rose-400 block">Deskripsi Kerusakan:</span>
                    <p className="text-slate-300 mt-1">{wo.damageDescription}</p>
                    <span className="font-bold text-amber-400 block mt-2">Akar Penyebab (Root Cause):</span>
                    <p className="text-slate-300 mt-1">{wo.rootCause}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="font-bold text-emerald-400 block">Tindakan Perbaikan:</span>
                    <p className="text-slate-300 mt-1">{wo.actionTaken}</p>
                    <div className="pt-2 mt-2 border-t border-slate-900 flex justify-between text-[11px]">
                      <span className="text-slate-400">Mekanik Assigned: <strong className="text-white">{wo.assignedMechanic}</strong></span>
                      <span className="text-slate-400">Downtime: <strong className="text-rose-400">{wo.downtimeHours} Jam</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Lokasi Workshop: <strong className="text-slate-200">{wo.workshopName}</strong></span>
                  <span className="font-bold text-emerald-400">Biaya Aktual: Rp {wo.actualCost.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Maintenance Calendar */}
      {activeTab === 'calendar' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-emerald-400" /> Jadwal Service & Maintenance Agustus 2026
            </h3>
            <span className="text-xs text-slate-400">Mode Tampilan: Agendaku Terpadu</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {calendarEvents.map((evt) => (
              <div key={evt.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-emerald-400">{evt.date}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                    {evt.type}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white">{evt.title}</h4>
                <p className="text-[11px] text-slate-400">Unit: {evt.assetCode}</p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[10px]">
                  <span className="text-slate-400">Tim: {evt.assignedTo}</span>
                  <span className="font-bold text-amber-400">{evt.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
