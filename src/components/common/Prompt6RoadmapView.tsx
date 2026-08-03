import React from 'react';
import {
  Trees,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Activity,
  BarChart3,
  ListTodo,
  FileText,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

export const Prompt6RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-emerald-950 via-slate-900 to-slate-900 text-white border border-emerald-800/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Perencanaan Prompt 6 • Next Operational Module</span>
          </div>
          <h2 className="text-2xl font-black">
            Modul Plantation Lifecycle Management & Sensus Pohon Sawit
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Daftar rencana kerja dan arsitektur untuk Prompt 6: Pengelolaan siklus hidup tanaman (TBM, TM, Replanting), sensus pohon individual, SPH density, pelacakan umur tanaman, histori perlakuan blok, dan fondasi AI Health Monitoring.
          </p>
        </div>
      </div>

      {/* Task Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            title: '1. Siklus Hidup Tanaman (Lifecycle State Machine)',
            desc: 'Pengelolaan fase TBM-0, TBM-1, TBM-2, TBM-3, TM-Muda, TM-Prima, TM-Tua, dan Replanting (Peremajaan Lahan).',
            icon: Calendar,
          },
          {
            title: '2. Sensus Pohon Individual & SPH Density Tracker',
            desc: 'Pencatatan sensus jumlah pokok produktif, pokok mati, sisipan, pokok kerdil, dan abnormalitas tajuk per blok.',
            icon: Trees,
          },
          {
            title: '3. Histori Perlakuan Blok & Buku Tanah (Block History Log)',
            desc: 'Audit trail rotasi pemupukan, kastrasi, tunas gantung, penyiangan piringan, dan histori aplikasi agronomi.',
            icon: FileText,
          },
          {
            title: '4. AI Tree Health Monitoring Baseline',
            desc: 'Interfacing AI Multispectral drone data untuk penilaian klorosis daun, kesehatan tajuk, dan skor kesehatan blok.',
            icon: Activity,
          },
          {
            title: '5. Manajemen Pembibitan (Nursery Management)',
            desc: 'Monitoring Pre-Nursery & Main-Nursery, persentase culling bibit, serta sertifikasi varietas unggul.',
            icon: Layers,
          },
          {
            title: '6. Integrasi Spasial GIS PalmVision',
            desc: 'Setiap pohon sensus & histori blok otomatis terhubung dengan polygon WGS84 yang dibangun pada Prompt 5.',
            icon: ShieldCheck,
          },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed pl-9">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
