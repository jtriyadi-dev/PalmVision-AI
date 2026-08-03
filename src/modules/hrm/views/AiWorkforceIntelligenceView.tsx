import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Zap,
  Users,
  Brain,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';
import { INITIAL_AI_WORKFORCE_INSIGHTS } from '../mockData';

export const AiWorkforceIntelligenceView: React.FC = () => {
  const [insights] = useState(INITIAL_AI_WORKFORCE_INSIGHTS);
  const [isGenerating, setIsGenerating] = useState(false);

  const reanalyze = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-emerald-400" />
            <span>AI Workforce Intelligence & Analytics Foundation</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Prediksi Kehadiran Pemanen, Risk Analytics Turnover Tenaga Kerja Harian (BHL), & Optimalisasi Shift
          </p>
        </div>

        <button
          onClick={reanalyze}
          disabled={isGenerating}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Menganalisis Data...' : 'Jalankan Prompt AI Analytics'}</span>
        </button>
      </div>

      {/* AI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((ins) => (
          <div key={ins.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-mono font-extrabold text-emerald-400 uppercase tracking-wider">
                {ins.metricType.replace('_', ' ')}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Akurasi {ins.confidenceScorePercent}%
              </span>
            </div>

            <p className="text-sm font-semibold text-white leading-relaxed">
              {ins.predictionSummary}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
              <span className="text-emerald-400 font-extrabold block flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Rekomendasi Tindakan AI:
              </span>
              <p className="text-slate-300">{ins.actionableRecommendation}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Future AI Roadmap Placeholder */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-800 space-y-3 text-xs">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Algoritma AI Workforce Lanjutan (Koneksi Model Gemini 3.5 & Live Stream)</span>
        </div>
        <p className="text-slate-300">
          Sistem disiapkan untuk integrasi AI dalam memprediksi kebutuhan harvester per tonase panen harian, estimasi lembur otomatis berdasarkan beban antrean TBS di jembatan timbang PKS, serta rekomendasi pelatihan spesifik operator heavy equipment.
        </p>
      </div>
    </div>
  );
};
