import React from 'react';
import {
  TrendingUp,
  LineChart,
  AlertTriangle,
  Brain,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { INITIAL_AI_FORECASTS } from '../mockData';

export const AiAnalyticsForecastingView: React.FC = () => {
  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <LineChart className="w-5 h-5 text-cyan-400" />
            <span>AI Predictive Analytics, Forecasting & Root Cause Intelligence</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Model Machine Learning & AI Time-Series Forecasting untuk Tonase Panen, Cash Flow, Solar, & Rendemen PKS.
          </p>
        </div>
      </div>

      {/* Forecasting Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INITIAL_AI_FORECASTS.map((fct) => (
          <div key={fct.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2 font-mono">
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
                {fct.targetModule}
              </span>
              <span className="text-emerald-400 font-bold text-[11px]">
                {fct.confidenceScorePercent}% Confidence
              </span>
            </div>

            <h3 className="font-extrabold text-white text-sm leading-snug">{fct.metricName}</h3>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
              <div>
                <span className="text-slate-400 text-[10px] block">RATA-RATA HISTORIS</span>
                <span className="text-slate-300 font-bold">{fct.historicalAvg}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">PROYEKSI 30 HARI AI</span>
                <span className="text-emerald-400 font-bold">{fct.forecast30Days}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Key Driver Factors:</span>
              <ul className="space-y-1 text-slate-300 text-xs">
                {fct.keyDrivers.map((driver, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Root Cause Analysis Module */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <Brain className="w-4 h-4 text-emerald-400" />
            <span>AI Automated Root Cause Analysis (RCA) Engine</span>
          </h3>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">MODE: REAL-TIME ANOMALY DETECTOR</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-rose-400 font-bold">ANOMALY DETECTED • HARVEST MILL</span>
              <span className="text-slate-400">03 Agustus 2026</span>
            </div>
            <p className="font-bold text-white text-xs">Penurunan Rendemen Minyak Sawit (OER) Mill -0.4% di Shift 2</p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs leading-relaxed">
              <strong>Root Cause Diagnosis AI:</strong> Suhu digester steam terdeteksi turun ke 82°C (Standar 95°C) akibat fluktuasi tekanan boiler No. 2.
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-amber-400 font-bold">ANOMALY DETECTED • FLEET COST</span>
              <span className="text-slate-400">02 Agustus 2026</span>
            </div>
            <p className="font-bold text-white text-xs">Lonjakan Konsumsi Solar Dump Truck Afdeling 3 (+14.2%)</p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs leading-relaxed">
              <strong>Root Cause Diagnosis AI:</strong> Rute angkut TBS berputar lebih jauh 3.8 km akibat jembatan penghubung Blok B10 rusak tergenang air.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
