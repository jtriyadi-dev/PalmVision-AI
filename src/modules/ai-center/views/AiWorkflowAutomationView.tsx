import React, { useState } from 'react';
import {
  Workflow,
  Plus,
  Zap,
  CheckCircle2,
  Pause,
  Play,
  ArrowRight,
  Clock,
  Layers,
  Sparkles,
  Settings,
} from 'lucide-react';
import { INITIAL_AI_WORKFLOWS } from '../mockData';
import { AiWorkflowRule } from '../types';

export const AiWorkflowAutomationView: React.FC = () => {
  const [workflows, setWorkflows] = useState<AiWorkflowRule[]>(INITIAL_AI_WORKFLOWS);

  const toggleStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: w.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : w
      )
    );
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-indigo-400" />
            <span>AI Workflow Engine & Event-Driven Automation Rules</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Otomatisasi Lintas Modul: Trigger Event → Condition Evaluation → AI Agent Action → Webhook & Auto Approval.
          </p>
        </div>

        <button
          onClick={() => alert('Simulasi Buat AI Workflow Builder Rule Baru')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Workflow Rule Baru</span>
        </button>
      </div>

      {/* Visual Workflow Steps Concept */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Struktur Alur Kerja AI Automation Node Pipeline</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-cyan-400 text-[10px] font-bold uppercase block">1. TRIGGER EVENT</span>
            <p className="font-bold text-white text-xs">Sinyal Sistem / Telemetri</p>
            <span className="text-slate-400 text-[10px]">Misal: Stock &lt; Min Reorder</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-amber-400 text-[10px] font-bold uppercase block">2. CONDITION LOGIC</span>
            <p className="font-bold text-white text-xs">Evaluasi Parameter</p>
            <span className="text-slate-400 text-[10px]">If stock_kg &lt;= 5000</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-emerald-400 text-[10px] font-bold uppercase block">3. AI INTELLIGENCE</span>
            <p className="font-bold text-white text-xs">Generasi Rekomendasi</p>
            <span className="text-slate-400 text-[10px]">Gemini 3.6 Prescriptive</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-indigo-400 text-[10px] font-bold uppercase block">4. ACTION EXECUTION</span>
            <p className="font-bold text-white text-xs">Draft PO / Work Order / Email</p>
            <span className="text-slate-400 text-[10px]">Webhook API Payload</span>
          </div>
        </div>
      </div>

      {/* Workflow Rules List */}
      <div className="space-y-4">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-indigo-400">{wf.ruleNo}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold text-[10px]">
                  ACTION: {wf.actionType}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-[11px]">Eksekusi: {wf.executionCount}x</span>
                <button
                  onClick={() => toggleStatus(wf.id)}
                  className={`px-3 py-1 rounded-lg font-bold text-[10px] flex items-center gap-1 cursor-pointer ${
                    wf.status === 'ACTIVE'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {wf.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  <span>{wf.status}</span>
                </button>
              </div>
            </div>

            <h3 className="font-extrabold text-white text-sm font-sans">{wf.ruleName}</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs font-sans">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] font-mono uppercase block">Trigger:</span>
                <span className="font-bold text-cyan-400">{wf.triggerEvent}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] font-mono uppercase block">Condition:</span>
                <span className="font-bold text-amber-400 font-mono">{wf.condition}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 text-[10px] font-mono uppercase block">AI Action:</span>
                <span className="font-bold text-emerald-400">{wf.aiAction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
