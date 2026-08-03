import React from 'react';
import {
  Brain,
  Zap,
  Bot,
  Activity,
  Cpu,
  Database,
  Layers,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  DollarSign,
  FileCode2,
  Workflow,
  CheckCircle2,
  Server,
  RefreshCw,
} from 'lucide-react';

interface AiDashboardViewProps {
  onNavigateSubTab?: (tabId: string) => void;
}

export const AiDashboardView: React.FC<AiDashboardViewProps> = ({ onNavigateSubTab }) => {
  return (
    <div className="space-y-6">
      {/* Executive Hero */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/60 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>PalmVision AI Enterprise Platform</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              AI Center — Pusat Kecerdasan Buatan Perkebunan Kelapa Sawit
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Platform AI Enterprise Provider-Agnostic terintegrasi penuh dengan Gemini 3.6, Gemini 3.1 Pro, DeepSeek R1, Knowledge Base RAG, AI Vision, OCR, & Workflow Automation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateSubTab?.('command-center')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg transition-all"
            >
              <Activity className="w-4 h-4" />
              <span>Buka AI Command Center</span>
            </button>
            <button
              onClick={() => onNavigateSubTab?.('chat')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 cursor-pointer border border-slate-700 transition-all"
            >
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>Tanya AI Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total AI Request</span>
            <Zap className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">148,920</p>
          <span className="text-[10px] text-emerald-400 font-bold">+18.4% bulan ini</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Today's Request</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">14,250</p>
          <span className="text-[10px] text-cyan-400 font-bold">140 req/min peak</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Models</span>
            <Cpu className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">5 Model</p>
          <span className="text-[10px] text-indigo-400 font-bold">Gemini & DeepSeek</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Token Usage 24h</span>
            <FileCode2 className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">4.28 M</p>
          <span className="text-[10px] text-amber-400 font-bold">Prompt + Completion</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Avg Latency</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400 font-mono">140 ms</p>
          <span className="text-[10px] text-slate-400 font-bold">Sangat Cepat ✓</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Est. Cost 24h</span>
            <DollarSign className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-xl font-black text-white font-mono">$1.42</p>
          <span className="text-[10px] text-emerald-400 font-bold">Teroptimasi (Low Cost)</span>
        </div>
      </div>

      {/* Main Grid: Health Status & Feature Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* System Health Card */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-extrabold text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Status AI Enterprise Health</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              OPERATIONAL 100%
            </span>
          </div>

          <div className="space-y-3 font-mono">
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Google Gemini API Gateway:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE (140ms)
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">DeepSeek R1 Reasoning:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> ONLINE (380ms)
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">Knowledge Vector DB (pgvector):</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 28.4K Vectors
              </span>
            </div>

            <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-300">AI Workflow Automation Engine:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 3 Active Rules
              </span>
            </div>
          </div>
        </div>

        {/* Knowledge & RAG Overview */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-extrabold text-white text-sm flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Knowledge Base & RAG Engine</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              12 Documents
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Dokumen Terindeks Terakhir</span>
              <p className="font-bold text-white text-xs">SOP Pemupukan NPK 13-6-27 (KDOC-SOP-AGRO-001)</p>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                <span>142 Chunks</span>
                <span className="text-emerald-400">Embedding: Gemini Embedding 2</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Sertifikasi & Regulasi Compliance</span>
              <p className="font-bold text-white text-xs">Manual RSPO Principles & Criteria 2026</p>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                <span>380 Chunks</span>
                <span className="text-emerald-400">Vector Search Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations Highlight */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-extrabold text-white text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Rekomendasi AI Terkini</span>
            </span>
            <button
              onClick={() => onNavigateSubTab?.('recommendation')}
              className="text-[10px] text-amber-400 hover:underline font-bold"
            >
              Lihat Semua →
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="font-mono font-bold text-amber-400">HARVEST • REC-202608-001</span>
                <span className="text-emerald-400 font-bold">94% Confidence</span>
              </div>
              <p className="font-bold text-white text-xs">Optimasi Jadwal Rotasi Panen Afdeling 3</p>
              <p className="text-[11px] text-slate-400">Potensi Dampak Nilai: +Rp 145,000,000</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="font-mono font-bold text-rose-400">INVENTORY • REC-202608-002</span>
                <span className="text-emerald-400 font-bold">91% Confidence</span>
              </div>
              <p className="font-bold text-white text-xs">Diskon Pembelian Solar Fleet Transport B35</p>
              <p className="text-[11px] text-slate-400">Potensi Hemat: +Rp 85,000,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
