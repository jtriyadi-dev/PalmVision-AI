import React from 'react';
import { Milestone, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export const RoadmapView: React.FC = () => {
  const phases = [
    {
      phase: 'Prompt 1 (COMPLETED)',
      title: 'Fondasi, Arsitektur, Design System & UI Shell',
      status: 'DONE',
      items: [
        'Struktur Folder Clean Architecture & Server Express',
        'Multi-Company / Estate Context Switcher Header',
        '21 Enterprise Navigation Menu Items',
        'Design System Kit & Color Tokens (Emerald Green & Charcoal)',
        'Server Proxy Gemini 3.6 AI Assistant Integration',
        'License Key Verification & HWID Binding Simulator',
        '12 Architectural Blueprint Specification Documentation',
      ],
    },
    {
      phase: 'Prompt 2 - Fase 1',
      title: 'Modul Panen TBS & Operasional Lapangan (Harvest)',
      status: 'NEXT',
      items: [
        'Pencatatan Janjang TBS per Pemanen / Mandor di TPH',
        'Kalkulasi Otomatis Berat BJR (Berat Janjang Rata-rata)',
        'Sistem Penalti Potongan Buah Mentah & Tangkai Panjang',
        'SPB (Surat Pengantar Buah) & Integrasi Timbangan PKS',
        'PWA Offline Record BKM Mandor dengan Auto Background Sync',
      ],
    },
    {
      phase: 'Prompt 2 - Fase 2',
      title: 'Modul Logistik, Workshop, Solar BBM & Inventory',
      status: 'UPCOMING',
      items: [
        'Manajemen Stok Pupuk NPK, Agrokimia & Sparepart',
        'Sistem Pengisian Solar BBM Truk & Alat Berat dengan AI Anomaly Detection',
        'Workshop Maintenance Work Order (Tractor & Dump Truck)',
        'Procurement Purchase Request (PR) -> Purchase Order (PO) Workflow',
      ],
    },
    {
      phase: 'Prompt 2 - Fase 3',
      title: 'Modul SDM (HR), Financial Costing & Executive BI',
      status: 'UPCOMING',
      items: [
        'Presensi Mandor, Hitungan Premi Borongan & Payroll',
        'Kalkulasi Biaya Operasional Kebun (Cost / Hektar & Cost / Kg TBS)',
        'GIS Polygon Map Visualizer Kerapatan Panen & Topografi Blok',
        'Executive AI Report Generator & Laporan Operasional Bulanan (LOB)',
      ],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Milestone className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">12. Roadmap Implementasi Prompt 2</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Rollout Plan for Full Palm Oil Plantation ERP Modules Implementation
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {phases.map((p, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border shadow-sm space-y-3 transition-all ${
              p.status === 'DONE'
                ? 'border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-extrabold ${
                    p.status === 'DONE'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {p.phase}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {p.title}
                </h3>
              </div>

              {p.status === 'DONE' ? (
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> SELESAI
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-400">
                  {p.status}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {p.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
