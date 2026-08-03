import React, { useState } from 'react';
import {
  Bot,
  Send,
  User,
  Paperclip,
  FileText,
  Search,
  Pin,
  Folder,
  Download,
  Plus,
  Sparkles,
  BookOpen,
  Code,
  Table as TableIcon,
  CheckCircle2,
  Mic,
  Image as ImageIcon,
} from 'lucide-react';
import { INITIAL_AI_CHAT_SESSIONS } from '../mockData';
import { AiChatSession, AiChatMessage } from '../types';

export const AiChatAssistantView: React.FC = () => {
  const [sessions, setSessions] = useState<AiChatSession[]>(INITIAL_AI_CHAT_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>('ses-1');
  const [inputMsg, setInputMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'Palm Agronomist' | 'Estate CFO' | 'HR Manager' | 'EAM Fleet Engineer' | 'General Enterprise'>('Palm Agronomist');

  const activeSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userMessage: AiChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'USER',
      text: inputMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    let replyText = '';
    let citation = '';

    if (selectedRole === 'Palm Agronomist') {
      replyText = `Berdasarkan SOP Agronomi Kebun Kelapa Sawit (KDOC-SOP-AGRO-001):\n- Rekomendasi teknis untuk "${inputMsg}":\n  1. Lakukan verifikasi kerapatan piringan pohon.\n  2. Pastikan pemupukan NPK 13-6-27 sebanyak 2.5 kg/pohon dilakukan sesuai jadwal.\n  3. Pantau angka restan TBS agar tidak lebih dari 2.0%.`;
      citation = 'KDOC-SOP-AGRO-001 (SOP Agronomi & Pemupukan 2026)';
    } else if (selectedRole === 'Estate CFO') {
      replyText = `Analisis Keuangan Enterprise (CFO Context):\n- Terkait "${inputMsg}":\n  1. HPP Panen TBS saat ini ada di Rp 142,400/Ton.\n  2. Marjin kotor penjualan CPO ke Wilmar Dumai sebesar 32.4%.\n  3. Direkomendasikan melakukan efisiensi biaya solar fleet kendaraan panen.`;
      citation = 'Laporan Keuangan Audit-Ready YTD 2026';
    } else {
      replyText = `Hasil Analisis Enterprise AI Assistant (${selectedRole}):\n- Permintaan: "${inputMsg}" telah diproses via Knowledge RAG Retrieval Engine.\n- Sistem memverifikasi dokumen terkait dan memastikan ketaatan SOP Perkebunan 100%.`;
      citation = 'PalmVision Knowledge Base Index v1';
    }

    const assistantMessage: AiChatMessage = {
      id: `msg-${Date.now() + 1}`,
      sender: 'ASSISTANT',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citationDoc: citation,
      roleContext: selectedRole,
    };

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? {
              ...s,
              updatedAt: 'Baru saja',
              messages: [...s.messages, userMessage, assistantMessage],
            }
          : s
      )
    );

    setInputMsg('');
  };

  const handleCreateNewSession = () => {
    const newId = `ses-${Date.now()}`;
    const newSession: AiChatSession = {
      id: newId,
      title: 'Sesi AI Chat Baru',
      folder: 'General Q&A',
      pinned: false,
      roleContext: selectedRole,
      modelUsed: 'gemini-3.6-flash',
      updatedAt: 'Baru saja',
      messages: [
        {
          id: `msg-init`,
          sender: 'ASSISTANT',
          text: `Halo! Saya PalmVision AI Chat Assistant. Saya siap membantu Anda sebagai **${selectedRole}**. Silakan tanyakan seputar panen TBS, SOP pemupukan, biaya PKS, atau regulasi RSPO.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
  };

  const filteredSessions = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[600px] text-xs">
      {/* Sidebar: Conversation List */}
      <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-white text-sm flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>AI Conversations</span>
            </span>
            <button
              onClick={handleCreateNewSession}
              className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
              title="Sesi Chat Baru"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari percakapan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs"
            />
          </div>

          {/* Session List */}
          <div className="space-y-1.5 max-h-[420px] overflow-y-auto scrollbar-none pt-1">
            {filteredSessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSessionId(s.id)}
                className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer space-y-1 ${
                  activeSessionId === s.id
                    ? 'bg-emerald-950 border border-emerald-800 text-white'
                    : 'bg-slate-950/50 hover:bg-slate-800 text-slate-300 border border-slate-800/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold truncate max-w-[140px] text-xs">{s.title}</span>
                  {s.pinned && <Pin className="w-3 h-3 text-emerald-400 fill-emerald-400" />}
                </div>
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Folder className="w-3 h-3 text-emerald-400" />
                    {s.folder}
                  </span>
                  <span>{s.updatedAt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Role Selector Box */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Role Context Persona</span>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as any)}
            className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-bold text-xs"
          >
            <option value="Palm Agronomist">🌴 Palm Agronomist AI</option>
            <option value="Estate CFO">💰 Estate CFO Financial AI</option>
            <option value="HR Manager">👥 HR & Payroll AI Assistant</option>
            <option value="EAM Fleet Engineer">🔧 EAM Fleet Workshop AI</option>
            <option value="General Enterprise">🏢 General Enterprise AI</option>
          </select>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                {activeSession.modelUsed}
              </span>
              <span className="text-slate-400 text-xs">• Context: <strong>{selectedRole}</strong></span>
            </div>
            <h3 className="font-extrabold text-white text-base mt-1">{activeSession.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Download Chat Log dalam format Markdown/PDF Berhasil!')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Chat</span>
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[440px] p-2 scrollbar-none">
          {activeSession.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ASSISTANT' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] rounded-2xl p-4 space-y-2 ${
                  msg.sender === 'USER'
                    ? 'bg-emerald-600 text-white rounded-tr-none shadow'
                    : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/40 pb-1">
                  <span className="font-bold">{msg.sender === 'USER' ? 'Anda' : `PalmVision AI (${selectedRole})`}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="text-xs leading-relaxed whitespace-pre-line font-sans">
                  {msg.text}
                </div>

                {msg.citationDoc && (
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[10px] text-emerald-400 flex items-center gap-1.5 font-mono">
                    <BookOpen className="w-3 h-3" />
                    <span>RAG Citation: <strong>{msg.citationDoc}</strong></span>
                  </div>
                )}
              </div>

              {msg.sender === 'USER' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-bold flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="space-y-2 pt-2 border-t border-slate-800">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={`Tanyakan kecerdasan AI dalam konteks ${selectedRole}...`}
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="w-full pl-4 pr-24 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500"
            />

            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => alert('Simulasi Upload Lampiran Dokumen SOP/Foto Panen')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                title="Lampirkan Dokumen"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 cursor-pointer shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim</span>
              </button>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 text-center font-mono">
            Powered by Google Gemini 3.6 Flash & RAG Vector Knowledge Retrieval Engine
          </p>
        </form>
      </div>
    </div>
  );
};
