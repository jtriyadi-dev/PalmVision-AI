import React, { useState } from 'react';
import {
  Sparkles,
  Brain,
  Cpu,
  CloudRain,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Droplets,
  Activity,
  Bot
} from 'lucide-react';
import { mockAiPredictions } from '../mockData';

export const AiSensorIntelligenceView: React.FC = () => {
  const [predictions, setPredictions] = useState(mockAiPredictions);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-emerald-950 border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-400/40">
              <Brain className="h-7 w-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 text-[10px] font-bold uppercase tracking-wider">
                  Gemini 3.6 Sensor AI Engine
                </span>
                <span className="text-xs text-slate-400">Autonomous Telemetry Analytics</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                Predictive Sensor Intelligence & Climate Risk Engine
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Automated predictive modeling for rainfall floods, equipment failure, peat fire risk & harvest readiness.
              </p>
            </div>
          </div>

          <button
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Running Neural Inferences...' : 'Re-Analyze All Sensor Streams'}</span>
          </button>
        </div>
      </div>

      {/* AI Inference Predictions List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {predictions.map(pred => (
          <div key={pred.id} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                pred.severityLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                pred.severityLevel === 'WARNING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {pred.predictionType}
              </span>

              <span className="text-xs font-mono font-bold text-purple-300">
                {pred.confidenceScorePercent}% Confidence
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{pred.targetEntity}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 p-3 rounded-xl bg-slate-900/70 border border-slate-700/50">
                {pred.recommendationText}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800">
              <span>Generated: {pred.createdAt}</span>
              <button className="text-purple-400 hover:underline font-bold">Auto-Execute Action</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
