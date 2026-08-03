import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Filter,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';
import { INITIAL_AI_RECOMMENDATIONS } from '../mockData';
import { AiRecommendationItem } from '../types';

export const AiRecommendationView: React.FC = () => {
  const [recommendations, setRecommendations] = useState<AiRecommendationItem[]>(INITIAL_AI_RECOMMENDATIONS);
  const [selectedModule, setSelectedModule] = useState<string>('ALL');

  const handleImplement = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'IMPLEMENTED' } : r))
    );
  };

  const handleDismiss = (id: string) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'DISMISSED' } : r))
    );
  };

  const filtered = recommendations.filter(
    (r) => selectedModule === 'ALL' || r.module === selectedModule
  );

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>AI Recommendation Engine & Cross-Module Operational Intelligence</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Rekomendasi tindakan preskriptif berbasis AI dengan Confidence Score, Severity Level & Proyeksi Dampak IDR.
          </p>
        </div>

        {/* Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-xs"
          >
            <option value="ALL">Semua Modul ERP</option>
            <option value="HARVEST">Harvest & Mill</option>
            <option value="INVENTORY">Inventory & Procurement</option>
            <option value="EAM">Enterprise Asset Management</option>
            <option value="FINANCE">Finance & Costing</option>
          </select>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="space-y-4">
        {filtered.map((rec) => (
          <div
            key={rec.id}
            className={`p-5 rounded-2xl bg-slate-900 border transition-all space-y-3 ${
              rec.status === 'IMPLEMENTED'
                ? 'border-emerald-800 opacity-85'
                : rec.status === 'DISMISSED'
                ? 'border-slate-800 opacity-50'
                : rec.severity === 'CRITICAL'
                ? 'border-rose-800/80 shadow-rose-950/20 shadow-xl'
                : 'border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2 font-mono">
                <span className="font-bold text-amber-400">{rec.recNo}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
                  {rec.module}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    rec.severity === 'CRITICAL'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800'
                      : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}
                >
                  SEVERITY: {rec.severity}
                </span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Confidence: {rec.confidenceScorePercent}%
                </span>
                <span className="text-slate-400">Created: {rec.createdAt}</span>
              </div>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white">{rec.title}</h3>
              <p className="text-slate-300 text-xs mt-1 leading-relaxed">{rec.summary}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 font-mono">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Prescriptive Action Plan:</span>
              <p className="text-slate-200 text-xs font-sans font-bold">{rec.actionPlan}</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm font-mono">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>Proyeksi Dampak Efisiensi: +Rp {rec.potentialImpactIdr.toLocaleString('id-ID')}</span>
              </div>

              {rec.status === 'OPEN' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleImplement(rec.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 cursor-pointer shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Eksekusi Rekomendasi</span>
                  </button>
                  <button
                    onClick={() => handleDismiss(rec.id)}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-bold cursor-pointer"
                  >
                    Abaikan
                  </button>
                </div>
              ) : (
                <span className="font-bold text-xs px-3 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                  STATUS: {rec.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
