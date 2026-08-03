import React from 'react';
import {
  Brain,
  Sparkles,
  Bot,
  Scan,
  FileCheck,
  TrendingUp,
  Workflow,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export const Prompt13RoadmapView: React.FC = () => {
  const prompt13Modules = [
    {
      title: 'AI Enterprise Chat Assistant (PalmVision Chat)',
      desc: 'Asisten AI interaktif untuk query real-time stok pupuk, tonase panen TBS, & status kas bank perusahaan.',
      icon: Bot,
    },
    {
      title: 'AI Vision & Drone Analytics',
      desc: 'Sistem komputer visi untuk deteksi otomatis kematangan Janjang TBS, infeksi penyakit Ganoderma, & hitung pohon.',
      icon: Scan,
    },
    {
      title: 'AI OCR & Document Intelligence',
      desc: 'Ekstraksi otomatis faktur pupuk, kwitansi Bensin, & dokumen nota timbangan PKS tanpa ketik manual.',
      icon: FileCheck,
    },
    {
      title: 'AI Predictive Forecasting & Recommendation',
      desc: 'Model estimasi panen TBS 30 hari ke depan, kebutuhan pupuk harian, & rekomendasi perawatan fleet CAT 320D.',
      icon: TrendingUp,
    },
    {
      title: 'Knowledge Base & RAG Engine (Palm Knowledge)',
      desc: 'Pusat pengetahuan SOP Perkebunan, Regulasi RSPO/ISPO, & manual perbaikan alat berat berbasis Vector DB.',
      icon: BookOpen,
    },
    {
      title: 'AI Command Center & Workflow Automation',
      desc: 'Otomatisasi alur kerja persetujuan (Approval Agent) & pemantauan ketaatan SOP secara terpusat.',
      icon: Workflow,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Roadmap Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/60 relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pratinjau Modul Lanjutan — Prompt 13</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            AI Center — AI Chat Assistant, AI Vision, OCR, RAG & AI Command Center
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Pusat Kecerdasan Buatan Enterprise PalmVision AI terintegrasi penuh dengan Gemini 3.5, Antigravity Agent, Deep Research, RAG Vector Search & Automasi Workflow.
          </p>
        </div>
      </div>

      {/* Grid Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prompt13Modules.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-emerald-700 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold">
                <IconComp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">{m.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              <div className="pt-2 text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                <span>Siap Di-Implementasikan di Prompt 13</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
