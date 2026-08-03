import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Zap,
} from 'lucide-react';
import {
  INITIAL_TRAINING_PROGRAMS,
  INITIAL_CERTIFICATIONS,
  INITIAL_KPIS,
} from '../mockData';

export const TrainingPerformanceView: React.FC = () => {
  const [trainings] = useState(INITIAL_TRAINING_PROGRAMS);
  const [certifications] = useState(INITIAL_CERTIFICATIONS);
  const [kpis] = useState(INITIAL_KPIS);
  const [activeTab, setActiveTab] = useState<'TRAINING' | 'CERTIFICATIONS' | 'KPIS'>('TRAINING');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <span>Pelatihan, Sertifikasi (ISPO/RSPO/SIO) & Penilaian KPI 360</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pelatihan K3 Kebun, Sertifikasi Lisensi K3 Operator Boiler & Heavy Fleet, Penilaian Kinerja Panen
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('TRAINING')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'TRAINING' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Program Training ({trainings.length})
          </button>
          <button
            onClick={() => setActiveTab('CERTIFICATIONS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'CERTIFICATIONS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sertifikasi SIO & K3 ({certifications.length})
          </button>
          <button
            onClick={() => setActiveTab('KPIS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'KPIS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Review Performance KPI ({kpis.length})
          </button>
        </div>
      </div>

      {/* TRAINING TAB */}
      {activeTab === 'TRAINING' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainings.map((trn) => (
              <div key={trn.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {trn.id}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                      trn.status === 'COMPLETED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {trn.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-white text-sm">{trn.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Trainer / Instruktur: {trn.trainer}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <span>Jadwal Pelaksanaan: <strong>{trn.scheduleDate}</strong></span>
                  <span className="text-emerald-400 font-bold">{trn.totalParticipants} Peserta</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CERTIFICATIONS TAB */}
      {activeTab === 'CERTIFICATIONS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">Monitoring Sertifikasi K3 & SIO Operator (Automatic Expired Warning)</span>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
              {certifications.map((crt) => (
                <div key={crt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{crt.employeeName}</h4>
                    <p className="text-emerald-400 font-semibold">{crt.certificateName} ({crt.issuingBody})</p>
                    <p className="text-slate-400 text-[11px]">Berlaku s/d: {crt.expiryDate}</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-bold px-3 py-1 rounded border ${
                        crt.status === 'EXPIRING_SOON'
                          ? 'bg-rose-950 text-rose-400 border-rose-800'
                          : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                      }`}
                    >
                      {crt.status === 'EXPIRING_SOON' ? `PERLU PERPANJANGAN (${crt.daysRemaining} HARI)` : 'SERTIFIKAT VALID'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* KPIS TAB */}
      {activeTab === 'KPIS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">Penilaian KPI Pencapaian Target Tonase & OER Pabrik (360 Review)</span>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{kpi.employeeName}</h4>
                    <p className="text-slate-400">{kpi.department} • Periode {kpi.period}</p>
                    <p className="text-slate-300 mt-1">
                      Kategori KPI: <strong className="text-emerald-400">{kpi.kpiCategory.replace('_', ' ')}</strong>
                    </p>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="text-base font-black text-emerald-400 block">{kpi.achievementPercent}% Target</span>
                    <span className="text-[11px] text-slate-400">
                      Actual: {kpi.actualScore} | Target: {kpi.targetScore}
                    </span>
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
