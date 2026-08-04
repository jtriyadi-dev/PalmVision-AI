import React, { useState } from 'react';
import {
  FileCode2,
  Plus,
  Play,
  Save,
  RotateCcw,
  CheckCircle2,
  Copy,
  Sparkles,
  Code2,
  Filter,
} from 'lucide-react';
import { INITIAL_PROMPTS } from '../mockData';
import { PromptItem } from '../types';

export const PromptManagementView: React.FC = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>(INITIAL_PROMPTS);
  const [selectedPromptId, setSelectedPromptId] = useState<string>('prm-1');
  const [activeTab, setActiveTab] = useState<'HARVEST' | 'FINANCE' | 'ASSET' | 'ALL'>('ALL');

  const selectedPrompt = prompts.find((p) => p.id === selectedPromptId) || prompts[0];

  const [templateText, setTemplateText] = useState(selectedPrompt.templateContent);
  const [testOutput, setTestOutput] = useState<string | null>(null);

  // Modal & Toast States
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<'HARVEST' | 'FINANCE' | 'ASSET'>('HARVEST');
  const [newSystem, setNewSystem] = useState('Anda adalah Pakar Asisten AI Perkebunan Kelapa Sawit.');
  const [newTemplate, setNewTemplate] = useState('Analisis data berikut: {{input}}');

  const handleCreatePrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newName) return;

    const created: PromptItem = {
      id: `prm-${Date.now()}`,
      promptCode: newCode.toUpperCase(),
      promptName: newName,
      category: newCategory,
      version: 'v1.0',
      systemInstruction: newSystem,
      templateContent: newTemplate,
      variables: ['input'],
      status: 'PUBLISHED',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setPrompts((prev) => [created, ...prev]);
    setSelectedPromptId(created.id);
    setTemplateText(created.templateContent);
    setShowAddModal(false);
    setToastMessage(`Prompt Template Baru ${created.promptCode} (${created.promptName}) berhasil disimpan!`);
    setTimeout(() => setToastMessage(null), 4000);

    setNewCode('');
    setNewName('');
  };

  const handleRunTest = () => {
    setTestOutput(
      `[SIMULASI PROMPT EXECUTION VIA GEMINI 3.6 FLASH]\nOutput Hasil Generasi:\n"Berdasarkan data panen TBS Afdeling III periode Minggu-4 Juli 2026:\n- Biji matang 82% berada di bawah standar ideal 90%.\n- Rekomendasi Mandor: Evaluasi 4 Karyawan Pemanen di Blok A4 dan tingkatkan pengawasan K3."`
    );
  };

  const filteredPrompts = prompts.filter(
    (p) => activeTab === 'ALL' || p.category === activeTab
  );

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-amber-400" />
            <span>Prompt Management, Prompt Studio & Enterprise Prompt Library</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Manajemen Templat Prompt Sistem, Variabel `{{afdeling}}`, Versi Control v2.1, Preview Studio & Approval.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Prompt Baru</span>
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

      {/* Grid: Prompt List & Prompt Studio Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: Prompt Library List */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-extrabold text-white text-sm">Prompt Library</span>
            <span className="text-[10px] text-slate-400 font-mono font-bold">
              {prompts.length} Prompts
            </span>
          </div>

          <div className="space-y-2">
            {filteredPrompts.map((prm) => (
              <button
                key={prm.id}
                onClick={() => {
                  setSelectedPromptId(prm.id);
                  setTemplateText(prm.templateContent);
                  setTestOutput(null);
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer space-y-1.5 ${
                  selectedPromptId === prm.id
                    ? 'bg-amber-950/40 border-amber-700 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="font-bold text-amber-400">{prm.promptCode}</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 font-bold text-slate-300">{prm.version}</span>
                </div>
                <p className="font-bold text-xs text-white leading-snug">{prm.promptName}</p>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>Kategori: {prm.category}</span>
                  <span className="text-emerald-400 font-bold">{prm.status}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Prompt Studio Editor */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px]">
                <span className="font-bold text-amber-400">{selectedPrompt.promptCode}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                  Versi: {selectedPrompt.version}
                </span>
                <span className="text-slate-400">Penulis: {selectedPrompt.author}</span>
              </div>
              <h3 className="text-base font-extrabold text-white mt-1">{selectedPrompt.promptName}</h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunTest}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Uji Prompt</span>
              </button>
              <button
                onClick={() => alert('Simulasi Simpan Prompt Studio Berhasil!')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1 cursor-pointer border border-slate-700"
              >
                <Save className="w-3.5 h-3.5 text-emerald-400" />
                <span>Simpan</span>
              </button>
            </div>
          </div>

          {/* Variables Pill */}
          <div className="space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Variabel Terdeteksi:</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedPrompt.variables.map((v, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-emerald-400 font-bold border border-slate-800">
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* System Instruction */}
          <div className="space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">System Instruction Persona:</span>
            <input
              type="text"
              value={selectedPrompt.systemInstruction}
              readOnly
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-xs"
            />
          </div>

          {/* Template Editor */}
          <div className="space-y-1 font-mono">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Template Prompt Content:</span>
            <textarea
              rows={5}
              value={templateText}
              onChange={(e) => setTemplateText(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-mono text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
          </div>

          {/* Test Execution Output */}
          {testOutput && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
              <span className="text-emerald-400 font-bold text-[11px] block">PROMPT TEST OUTPUT RESULT:</span>
              <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-line font-sans">
                {testOutput}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Buat Prompt Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-lg w-full space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCode2 className="w-5 h-5 text-amber-400" />
                <span>Buat Prompt Template AI Baru</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePrompt} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Kode Prompt (Unique Code)
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g., PRM-HARVEST-EVAL"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Nama Prompt Template
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Evaluasi Kualitas Panen TBS Kebun"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Kategori Module
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="HARVEST">HARVEST (Panen & PKS)</option>
                    <option value="FINANCE">FINANCE (Keuangan)</option>
                    <option value="ASSET">ASSET (Aset & Fleet)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Target System Persona
                  </label>
                  <input
                    type="text"
                    value={newSystem}
                    onChange={(e) => setNewSystem(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Template Content (Gunakan {'{{variabel}}'})
                </label>
                <textarea
                  rows={4}
                  required
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
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
                  Simpan Prompt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
