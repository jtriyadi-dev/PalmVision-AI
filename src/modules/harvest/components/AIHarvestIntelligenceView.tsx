import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Compass,
  Cpu,
  BrainCircuit,
  Bot,
  Zap,
} from 'lucide-react';

import { AiHarvestInsight } from '../types';

interface AIHarvestIntelligenceViewProps {
  insights: AiHarvestInsight[];
}

export const AIHarvestIntelligenceView: React.FC<AIHarvestIntelligenceViewProps> = ({ insights }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredInsights = insights.filter(
    (i) => selectedCategory === 'All' || i.category === selectedCategory
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* AI Intelligence Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-800/60 text-white space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BrainCircuit className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                PalmVision AI Harvest Intelligence Foundation
              </h2>
              <p className="text-xs text-slate-300">
                Mesin Rekomendasi Preskriptif: Estimasi Yield, Kesiapan Kematangan TBS, & Optimasi Rute Pabrik
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" /> Engine Status: Active Model v2.4
          </span>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['All', 'Harvest Readiness', 'Transport Routing', 'Mill Queue Prediction'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat === 'All' ? 'Semua Insight' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredInsights.map((insight) => (
          <div
            key={insight.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                {insight.category}
              </span>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                {insight.confidenceScore}% Confidence
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 font-bold block">Target Blok: {insight.blockCode}</span>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">
                {insight.title}
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {insight.insightText}
            </p>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 text-xs space-y-1">
              <span className="font-extrabold text-emerald-800 dark:text-emerald-300 block flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" /> Preskriptif Rekomendasi AI:
              </span>
              <p className="text-slate-700 dark:text-slate-200 font-medium">{insight.recommendedAction}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
