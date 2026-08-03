import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  UserCheck,
  CheckSquare,
  FileText,
  Plus,
  Search,
  ChevronRight,
  Sparkles,
  Award,
  CheckCircle2,
  Clock,
  XCircle,
} from 'lucide-react';
import { INITIAL_JOB_VACANCIES, INITIAL_APPLICANTS, INITIAL_ONBOARDING } from '../mockData';
import { JobVacancy, Applicant, OnboardingChecklist } from '../types';

export const RecruitmentOnboardingView: React.FC = () => {
  const [vacancies] = useState<JobVacancy[]>(INITIAL_JOB_VACANCIES);
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [onboardings] = useState<OnboardingChecklist[]>(INITIAL_ONBOARDING);
  const [activeTab, setActiveTab] = useState<'VACANCIES' | 'APPLICANTS' | 'ONBOARDING'>('VACANCIES');

  const updateApplicantStage = (id: string, newStage: Applicant['stage']) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, stage: newStage } : app))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" />
            <span>Rekrutmen, Applicant Tracking & Onboarding</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Sistem Penerimaan Karyawan Perkebunan & PKS dari Tahap Lowongan, Interview, hingga Checklist Onboarding
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('VACANCIES')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'VACANCIES' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lowongan Kerja ({vacancies.length})
          </button>
          <button
            onClick={() => setActiveTab('APPLICANTS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'APPLICANTS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pelamar Pipeline ({applicants.length})
          </button>
          <button
            onClick={() => setActiveTab('ONBOARDING')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'ONBOARDING' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Onboarding Checklist ({onboardings.length})
          </button>
        </div>
      </div>

      {/* VACANCIES TAB */}
      {activeTab === 'VACANCIES' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">Daftar Lowongan Pekerjaan Aktif</span>
            <button
              onClick={() => alert('Form Buka Lowongan Kerja Baru SIAP')}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Buka Vacancy Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {vacancies.map((vac) => (
              <div key={vac.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {vac.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-300">
                    {vac.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-white">{vac.title}</h3>
                  <p className="text-xs text-slate-400">{vac.department} • {vac.estate}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                  <span>Kebutuhan: <strong className="text-emerald-400">{vac.positionsCount} Org</strong></span>
                  <span>Pelamar: <strong className="text-cyan-400">{vac.applicantsCount} Calon</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPLICANTS PIPELINE TAB */}
      {activeTab === 'APPLICANTS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300">Tracking Status Tahapan Pelamar Kerja (Applicant Pipeline)</span>
              <span className="text-xs text-slate-400 font-mono">Total {applicants.length} Kandidate</span>
            </div>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              {applicants.map((app) => (
                <div key={app.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-white">{app.candidateName}</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold border border-emerald-800">
                        Skor CV/Test: {app.scorePercent}%
                      </span>
                    </div>
                    <p className="text-slate-400">{app.vacancyTitle} • {app.lastEducation}</p>
                    <p className="text-slate-500 text-[11px]">{app.email} • Telp: {app.phone}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Stage:</span>
                    <select
                      value={app.stage}
                      onChange={(e) => updateApplicantStage(app.id, e.target.value as Applicant['stage'])}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400 font-bold focus:outline-none"
                    >
                      <option value="APPLIED">Applied</option>
                      <option value="SCREENING">Screening CV</option>
                      <option value="INTERVIEW">Interview Mandor / HR</option>
                      <option value="MEDICAL">Medical Checkup (MCU)</option>
                      <option value="OFFERING">Offering Letter</option>
                      <option value="ACCEPTED">Accepted / Hire</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ONBOARDING CHECKLIST TAB */}
      {activeTab === 'ONBOARDING' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-white">Checklist Karyawan Baru & Orientasi Lapangan</h3>
              <p className="text-xs text-slate-400">Verifikasi Dokumen, Seragam K3, ID Card, Email, & Pendaftaran BPJS</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {onboardings.map((onb) => (
                <div key={onb.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div>
                      <h4 className="font-extrabold text-white text-sm">{onb.employeeName}</h4>
                      <p className="text-slate-400">{onb.position} • Start: {onb.startDate}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-emerald-400 block">{onb.overallPercent}%</span>
                      <span className="text-[10px] text-slate-500">Progress Onboarding</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      {onb.documentsVerified ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                      <span>Dokumen KTP/Ijazah</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      {onb.trainingCompleted ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                      <span>Orientasi K3 & Kebun</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      {onb.uniformIssued ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                      <span>Seragam & Boot Safety</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      {onb.bpjsEnrolled ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                      <span>Pendaftaran BPJS Kes/TK</span>
                    </div>
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
