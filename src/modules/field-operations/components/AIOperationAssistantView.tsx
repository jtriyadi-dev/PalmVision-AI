import React from 'react';
import { Sparkles, AlertTriangle, ShieldAlert, CloudSun, TrendingUp, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { AiOperationRecommendation } from '../types';

interface AIOperationAssistantViewProps {
  aiRecommendations: AiOperationRecommendation[];
}

export const AIOperationAssistantView: React.FC<AIOperationAssistantViewProps> = ({
  aiRecommendations,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white border border-emerald-800/50 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          <span>PalmVision AI Operational Intelligence Engine</span>
        </div>
        <h2 className="text-xl font-black text-white">
          AI Operational Assistant Foundation
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Sistem fondasi rekomendasi operasional berbasis kecerdasan buatan. Menggabungkan data cuaca presisi, beban kerja mandor, kondisi jalan kebun, dan risiko keterlambatan pupuk secara otomatis.
        </p>
      </div>

      {/* AI Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiRecommendations.map((ai) => (
          <div
            key={ai.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                {ai.category}
              </span>

              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  ai.severity === 'Critical'
                    ? 'bg-red-100 text-red-700'
                    : ai.severity === 'Warning'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                Tingkat: {ai.severity}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {ai.title} ({ai.blockCode})
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl">
              {ai.recommendationText}
            </p>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-extrabold block">
                Tindakan Rekomendasi AI:
              </span>
              <p className="font-bold text-slate-900 dark:text-white">{ai.suggestedAction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
