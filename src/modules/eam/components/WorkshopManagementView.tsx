import React, { useState } from 'react';
import {
  Wrench,
  Users,
  History,
  CheckCircle2,
  Clock,
  Plus,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';
import {
  WorkshopJobOrder,
  Mechanic,
  ServiceHistoryRecord,
  AssetItem,
} from '../types';

interface WorkshopManagementViewProps {
  workshopJobs?: WorkshopJobOrder[];
  mechanics?: Mechanic[];
  serviceHistory?: ServiceHistoryRecord[];
  assets?: AssetItem[];
  onAddJobOrder?: (job: WorkshopJobOrder) => void;
}

export const WorkshopManagementView: React.FC<WorkshopManagementViewProps> = ({
  workshopJobs = [],
  mechanics = [],
  serviceHistory = [],
  assets = [],
  onAddJobOrder = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'job-orders' | 'mechanics' | 'history'>('job-orders');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Wrench className="h-5 w-5 text-purple-400" /> Workshop & Job Order Operations
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manajemen Bengkel Kebun Central & Field: Penugasan Mekanik, Service History & Biaya Perbaikan.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('job-orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'job-orders' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Job Orders ({workshopJobs.length})
          </button>
          <button
            onClick={() => setActiveTab('mechanics')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mechanics' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Daftar Mekanik ({mechanics.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'history' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Service History ({serviceHistory.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Workshop Job Orders */}
      {activeTab === 'job-orders' && (
        <div className="space-y-4">
          <div className="space-y-4">
            {workshopJobs.map((job) => (
              <div key={job.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">{job.jobOrderNumber}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          job.priority === 'Emergency' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {job.priority}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1">
                      {job.assetName} ({job.assetCode})
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold text-xs">
                    Status: {job.status}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                  <span className="text-slate-400 font-bold block">Keluhan Operator & Instruksi Kerja:</span>
                  <p className="text-slate-200">{job.complaint}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold">Tim Mekanik:</span>
                    <p className="text-white font-bold">Mekanik Utama: {job.leadMechanic}</p>
                    <p className="text-slate-400 text-[11px]">Asisten: {job.assistantMechanics.join(', ')}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-slate-400 font-bold">Spare Part Dibutuhkan:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {job.partsRequired.map((p, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Rincian Biaya: Part Rp {job.partsCost.toLocaleString('id-ID')} + Labor Rp {job.laborCost.toLocaleString('id-ID')}</span>
                  <span className="font-bold text-emerald-400 text-sm">Total: Rp {job.totalCost.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Mechanics Directory */}
      {activeTab === 'mechanics' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {mechanics.map((mec) => (
            <div key={mec.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400">{mec.code}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{mec.name}</h4>
                  <span className="text-[11px] text-purple-400 font-bold">{mec.specialty}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    mec.status === 'On Job' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}
                >
                  {mec.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Workshop:</span>
                  <span className="text-slate-200 font-bold">{mec.workshop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shift Kerja:</span>
                  <span className="text-slate-300">{mec.shift}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Selesai Bulan Ini:</span>
                  <span className="text-emerald-400 font-bold">{mec.completedJobsMonth} Unit</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Service History */}
      {activeTab === 'history' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Riwayat Penanganan Servis Aset</h3>
          <div className="space-y-3">
            {serviceHistory.map((rec) => (
              <div key={rec.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-400">{rec.assetCode}</span>
                    <span className="text-xs font-bold text-white">{rec.assetName}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-bold">
                      {rec.serviceType}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{rec.notes}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Mekanik: {rec.performedBy} • Tanggal: {rec.serviceDate} • Workshop: {rec.workshopName}
                  </p>
                </div>

                <div className="text-right self-end md:self-center">
                  <span className="font-bold text-emerald-400 text-xs block">Rp {rec.cost.toLocaleString('id-ID')}</span>
                  {rec.hourMeterHours && <span className="text-[10px] text-slate-400">{rec.hourMeterHours} Engine Hour</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
