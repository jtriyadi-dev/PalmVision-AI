import React, { useState } from 'react';
import {
  Cpu,
  Server,
  Plus,
  CheckCircle2,
  Zap,
  DollarSign,
  Clock,
  ShieldCheck,
  Globe,
  HardDrive,
  Settings,
} from 'lucide-react';
import { INITIAL_AI_MODELS, INITIAL_AI_PROVIDERS } from '../mockData';
import { AiModel, AiProvider } from '../types';

export const ModelProviderManagementView: React.FC = () => {
  const [models, setModels] = useState<AiModel[]>(INITIAL_AI_MODELS);
  const [providers, setProviders] = useState<AiProvider[]>(INITIAL_AI_PROVIDERS);

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>AI Model Registry & Multi-Provider Infrastructure Management</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Integrasi Provider-Agnostic: Google Gemini, OpenAI, Anthropic, DeepSeek R1, & Ollama Local On-Premise Engine.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => alert('Simulasi Modal Tambah Provider Baru')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
          >
            <Server className="w-4 h-4 text-emerald-400" />
            <span>Tambah Provider</span>
          </button>
          <button
            onClick={() => alert('Simulasi Register Model Baru')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Register Model</span>
          </button>
        </div>
      </div>

      {/* Model Registry Cards */}
      <div className="space-y-3">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-400" />
          <span>Registered AI Model Catalog</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((mdl) => (
            <div key={mdl.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div>
                  <span className="font-bold text-emerald-400 text-xs">{mdl.modelCode}</span>
                  <span className="text-[10px] text-slate-400 block font-sans">{mdl.providerName} • {mdl.version}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] border border-emerald-800">
                  {mdl.status}
                </span>
              </div>

              <h4 className="font-extrabold text-white text-sm font-sans">{mdl.modelName}</h4>

              {/* Capability Badges */}
              <div className="flex flex-wrap gap-1">
                {mdl.capabilities.text && <span className="px-2 py-0.5 bg-slate-950 text-slate-300 rounded text-[9px]">Text</span>}
                {mdl.capabilities.vision && <span className="px-2 py-0.5 bg-cyan-950 text-cyan-300 rounded text-[9px] font-bold">Vision</span>}
                {mdl.capabilities.ocr && <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded text-[9px] font-bold">OCR</span>}
                {mdl.capabilities.reasoning && <span className="px-2 py-0.5 bg-amber-950 text-amber-300 rounded text-[9px] font-bold">Reasoning</span>}
                {mdl.capabilities.embedding && <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded text-[9px] font-bold">Embedding</span>}
              </div>

              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[10px]">
                <div>
                  <span className="text-slate-400 block">CONTEXT WINDOW</span>
                  <span className="text-white font-bold">{mdl.contextWindowTokens.toLocaleString()} tkn</span>
                </div>
                <div>
                  <span className="text-slate-400 block">AVG LATENCY</span>
                  <span className="text-emerald-400 font-bold">{mdl.latencyMs} ms</span>
                </div>
                <div>
                  <span className="text-slate-400 block">USAGE 24H</span>
                  <span className="text-cyan-400 font-bold">{mdl.usageCount24h.toLocaleString()} req</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
