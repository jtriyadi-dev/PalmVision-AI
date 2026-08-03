import React, { useState } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Sliders,
  Globe,
  Bot,
  ShieldAlert,
} from 'lucide-react';

export const AiSettingsView: React.FC = () => {
  const [defaultModel, setDefaultModel] = useState('gemini-3.6-flash');
  const [fallbackModel, setFallbackModel] = useState('deepseek-r1-local');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(8192);
  const [circuitBreakerThreshold, setCircuitBreakerThreshold] = useState(5);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 text-xs max-w-4xl">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-emerald-400" />
            <span>AI Enterprise Global System Configuration</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Pengaturan Default AI Provider Routing, Fallback Strategy, Temperature & Limit Parameter.
          </p>
        </div>

        {savedSuccess && (
          <span className="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold text-xs flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Config Saved!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 font-mono">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-slate-400 text-[10px] font-bold uppercase block">PRIMARY DEFAULT MODEL</label>
            <select
              value={defaultModel}
              onChange={(e) => setDefaultModel(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-emerald-400 font-bold text-xs"
            >
              <option value="gemini-3.6-flash">Google Gemini 3.6 Flash (Super Fast)</option>
              <option value="gemini-3.1-pro-preview">Google Gemini 3.1 Pro (Deep Reasoning)</option>
              <option value="deepseek-r1-local">DeepSeek R1 Reasoning (On-Premise)</option>
              <option value="gpt-4o-enterprise">OpenAI GPT-4o Omni</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-400 text-[10px] font-bold uppercase block">FALLBACK BACKUP MODEL</label>
            <select
              value={fallbackModel}
              onChange={(e) => setFallbackModel(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-bold text-xs"
            >
              <option value="deepseek-r1-local">DeepSeek R1 Reasoning (On-Premise Local)</option>
              <option value="gemini-3.6-flash">Google Gemini 3.6 Flash</option>
              <option value="ollama-llama3">Ollama Llama 3.3 (Offline Local)</option>
            </select>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div>
            <label className="text-slate-400 text-[10px] font-bold block mb-1">GLOBAL TEMPERATURE: {temperature}</label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="text-slate-400 text-[10px] font-bold block mb-1">MAX COMPLETION TOKENS: {maxTokens}</label>
            <input
              type="range"
              min={1024}
              max={16384}
              step={1024}
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 cursor-pointer shadow-lg font-sans"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Konfigurasi AI</span>
          </button>
        </div>
      </form>
    </div>
  );
};
