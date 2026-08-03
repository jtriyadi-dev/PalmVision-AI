import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Zap,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  DollarSign,
  Package,
} from 'lucide-react';

import { AiInventoryInsight } from '../types';

interface AIInventoryIntelligenceViewProps {
  insights: AiInventoryInsight[];
}

export const AIInventoryIntelligenceView: React.FC<AIInventoryIntelligenceViewProps> = ({ insights = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filtered = insights.filter(
    (i) => selectedCategory === 'All' || i.category === selectedCategory
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border border-emerald-800/60 text-white space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/50 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <BrainCircuit className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                PalmVision AI Inventory & Procurement Intelligence
              </h2>
              <p className="text-xs text-slate-300">
                Prescriptive Analytics: Deteksi Kritis Reorder Point, Optimasi Safety Stock, Pemutihan Dead Stock & Diskon Konsolidasi PO
              </p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" /> Engine Status: Active Model v3.1
          </span>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 text-xs">
          {['All', 'Reorder Alert', 'Dead Stock Detection', 'Cost Optimization', 'Safety Stock'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat === 'All' ? 'Semua Insight AI' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((insight) => (
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
              <span className="text-[10px] text-slate-400 font-bold block">Entitas / SKU: {insight.itemOrWarehouse}</span>
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

            <div className="text-[11px] font-bold text-slate-500 border-t border-slate-100 dark:border-slate-800 pt-2 flex justify-between">
              <span>Estimasi Dampak Finansial / Operasional:</span>
              <span className="text-emerald-600 dark:text-emerald-400">{insight.impactEstimate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
