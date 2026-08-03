import React from 'react';
import { Layers, Database, Building2, Trees, CheckCircle2, ArrowRight, Sparkles, FileCode, Shield } from 'lucide-react';

export const Prompt4RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Database className="h-64 w-64 text-white" />
        </div>
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
            <Sparkles className="h-3.5 w-3.5" /> Prompt 4 Preparation & Component Standards
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Roadmap Prompt 4: Master Data Perkebunan Complete Engine
          </h1>
          <p className="text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
            Dokumentasi komponen reusable dan rancangan modul Master Data Perkebunan (Company, Estate, Divisi, Afdeling, Block, Sub Block, Jenis Tanah, Varietas Bibit, dan Infrastruktur).
          </p>
        </div>
      </div>

      {/* Target Master Data Modules Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: '1. Perusahaan & Holding',
            code: 'COMPANY_MASTER',
            desc: 'Struktur legal NIB, NPWP, direksi, logo, & unit anak perusahaan holding.',
            status: 'COMPLETED_PROMPT2',
            icon: Building2,
          },
          {
            title: '2. Estate & Kebun Utama',
            code: 'ESTATE_MASTER',
            desc: 'Pengelolaan daftar kebun, nama manager, total hektar, & koordinat GIS.',
            status: 'READY_FOR_PROMPT4',
            icon: Trees,
          },
          {
            title: '3. Divisi & Afdeling',
            code: 'DIVISION_AFDELING',
            desc: 'Hirarki operasional divisi, afdeling, nama asisten, & peta administratif.',
            status: 'READY_FOR_PROMPT4',
            icon: Layers,
          },
          {
            title: '4. Blok & Sub-Blok Tanam',
            code: 'BLOCK_SUBBLOCK',
            desc: 'Atribut blok: SPH, tahun tanam, varietas, jumlah pokok, & kontur topografi.',
            status: 'READY_FOR_PROMPT4',
            icon: Database,
          },
          {
            title: '5. Jenis Tanah & Topografi',
            code: 'SOIL_TOPOGRAPHY',
            desc: 'Master klasifikasi tanah (Gambut, Mineral, Alluvial), drainase, & kelerengan.',
            status: 'READY_FOR_PROMPT4',
            icon: FileCode,
          },
          {
            title: '6. Varietas Bibit & Legume',
            code: 'SEED_VARIETY',
            desc: 'Master varietas DxP Socfindo, Marihat, Lonsum, Topaz, & tanaman penutup tanah LCC.',
            status: 'READY_FOR_PROMPT4',
            icon: Shield,
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {item.code}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Siap Diintegrasikan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Component Reuse Guidelines for Devs */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Pedoman Komponen Reusable (Clean Architecture)
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Seluruh modul pada Prompt 4 wajib memanfaatkan komponen yang sudah tersedia di <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">DesignSystemShowcase</span>, <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">ThemeContext</span>, <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">CommandPaletteModal</span>, dan <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">NotificationCenter</span> tanpa perlu penulisan ulang style or UI baseline.
        </p>
      </div>
    </div>
  );
};
