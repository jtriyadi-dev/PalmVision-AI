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
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal Form State
  const [newRuleNo, setNewRuleNo] = useState('');
  const [newRuleName, setNewRuleName] = useState('');
  const [newTrigger, setNewTrigger] = useState('Stock Agrokimia Di Bawah Minimum');
  const [newCondition, setNewCondition] = useState('stock_kg <= 5000');
  const [newAiAction, setNewAiAction] = useState('Buat Draf Purchase Request (PR)');
  const [newActionType, setNewActionType] = useState('AUTO_DRAFT_PR');

  const toggleStatus = (id: string) => {
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, status: w.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : w
      )
    );
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleNo || !newRuleName) return;

    const created: AiWorkflowRule = {
      id: `wf-${Date.now()}`,
      ruleNo: newRuleNo.toUpperCase(),
      ruleName: newRuleName,
      triggerEvent: newTrigger,
      condition: newCondition,
      aiAction: newAiAction,
      actionType: newActionType,
      status: 'ACTIVE',
      executionCount: 0,
      lastExecutedAt: 'Belum pernah',
    };

    setWorkflows((prev) => [created, ...prev]);
    setShowAddModal(false);
    setToastMessage(`AI Workflow Rule ${created.ruleNo} (${created.ruleName}) berhasil diaktifkan!`);
    setTimeout(() => setToastMessage(null), 4000);

    setNewRuleNo('');
    setNewRuleName('');
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
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Workflow Rule Baru</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white cursor-pointer text-sm font-bold">✕</button>
        </div>
      )}

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

      {/* Modal Buat Workflow Rule Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-lg w-full space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Workflow className="w-5 h-5 text-indigo-400" />
                <span>Buat AI Automation Rule Baru</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Rule No / Ref
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., WFR-AUTO-06"
                    value={newRuleNo}
                    onChange={(e) => setNewRuleNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Action Type
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., AUTO_DRAFT_PR"
                    value={newActionType}
                    onChange={(e) => setNewActionType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Nama Workflow Rule
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Otomatisasi Restock Pupuk NPK saat Stok Kritis"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Trigger Event
                </label>
                <input
                  type="text"
                  required
                  value={newTrigger}
                  onChange={(e) => setNewTrigger(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-cyan-400 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Condition Logic (Expression)
                </label>
                <input
                  type="text"
                  required
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-amber-400 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  AI Action Description
                </label>
                <input
                  type="text"
                  required
                  value={newAiAction}
                  onChange={(e) => setNewAiAction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-lg"
                >
                  Aktifkan Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
