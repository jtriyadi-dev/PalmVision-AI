import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  Server,
  Database,
  Layers,
  Zap,
  ShieldCheck,
  RefreshCw,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Clock,
  HardDrive,
  Workflow,
} from 'lucide-react';
import { INITIAL_AI_PROVIDERS, INITIAL_AI_MODELS } from '../mockData';

export const AiCommandCenterView: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    '[09:12:01] [GATEWAY] Request received from /api/ai/chat -> Provider: Google Gemini (gemini-3.6-flash)',
    '[09:12:02] [RAG] Performing Hybrid Vector Search on pgvector -> 3 context chunks retrieved (score: 0.89)',
    '[09:12:03] [MODEL] Stream response generated in 138ms. Tokens: Prompt 840, Completion 290.',
    '[09:12:05] [VISION] Processing image tbs_sample_afdeling2.jpg -> 84 bunches detected (96% confidence)',
    '[09:12:08] [WORKFLOW] Rule WFR-AUTO-01 evaluated: Stock NPK 4,200kg <= Min 5,000kg -> Draft PO Created',
  ]);

  const [simulating, setSimulating] = useState(false);

  const handleRefresh = () => {
    setSimulating(true);
    setTimeout(() => {
      const newLog = `[${new Date().toLocaleTimeString()}] [SYSTEM] Self-test complete: All 5 Providers & Vector Indexes healthy.`;
      setLogs((prev) => [newLog, ...prev.slice(0, 9)]);
      setSimulating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>AI Command Center & Real-Time Enterprise Gateway Monitor</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitoring Provider Latency, Model Queues, GPU/CPU Allocation, Vector DB Health & Traffic Gateway
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={simulating}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
        >
          <RefreshCw className={`w-4 h-4 ${simulating ? 'animate-spin' : ''}`} />
          <span>Ping Self-Test Gateway</span>
        </button>
      </div>

      {/* System Resources & Infrastructure Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold font-sans">CPU Cores (Host Server)</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400">18.4%</p>
          <p className="text-[10px] text-slate-400 font-sans">8 vCPU / 3.2 GHz High-Frequency</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold font-sans">RAM Allocation</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-xl font-black text-cyan-400">6.2 / 16.0 GB</p>
          <p className="text-[10px] text-slate-400 font-sans">38.7% Memory Utilization</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold font-sans">GPU Vector Accelerator</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-black text-amber-400">NVIDIA T4 (Active)</p>
          <p className="text-[10px] text-slate-400 font-sans">On-Premise Embedding Acceleration</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold font-sans">Vector DB Storage</span>
            <HardDrive className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-xl font-black text-indigo-400">1.4 GB / 50 GB</p>
          <p className="text-[10px] text-slate-400 font-sans">pgvector Index Storage</p>
        </div>
      </div>

      {/* Active AI Providers Latency Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
            <Server className="w-4 h-4 text-emerald-400" />
            <span>AI Provider Gateway & Model Routing Status</span>
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 font-bold">CIRCUIT BREAKER: HEALTHY</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-2.5 px-3">PROVIDER NAME</th>
                <th className="py-2.5 px-3">TYPE</th>
                <th className="py-2.5 px-3">API BASE ENDPOINT</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">PRIORITY</th>
                <th className="py-2.5 px-3">RATE LIMIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
              {INITIAL_AI_PROVIDERS.map((prv) => (
                <tr key={prv.id} className="hover:bg-slate-950/50">
                  <td className="py-2.5 px-3 font-bold text-white font-sans">{prv.providerName}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-bold">
                      {prv.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 text-[11px]">{prv.baseUrl}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      ● {prv.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">#{prv.priorityOrder}</td>
                  <td className="py-2.5 px-3 text-slate-400">{prv.rateLimitPerMin} req/min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live AI Command Stream Console */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
        <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
          <span className="font-bold flex items-center gap-2 text-emerald-400">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>AI Gateway Live Event & Request Stream</span>
          </span>
          <span className="text-[10px] text-slate-500">Auto-Refresh Active</span>
        </div>

        <div className="space-y-1 text-slate-300 text-[11px] max-h-48 overflow-y-auto scrollbar-none">
          {logs.map((lg, i) => (
            <div key={i} className="py-0.5 hover:text-white transition-all">
              {lg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
