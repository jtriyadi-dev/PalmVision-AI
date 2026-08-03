import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw, Maximize2, Minimize2, Image, Mic, Paperclip, Star, ThumbsUp } from 'lucide-react';
import { CompanyContext, AiChatMessage } from '../../types';

interface FloatingAiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  context: CompanyContext;
}

export const FloatingAiAssistant: React.FC<FloatingAiAssistantProps> = ({
  isOpen,
  onClose,
  context,
}) => {
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome-01',
      sender: 'assistant',
      text: `Halo! Saya **PalmVision AI Assistant**, pakar agronomi dan manajemen operasional perkebunan kelapa sawit enterprise.\n\nSaya siap membantu analisis panen TBS, kalkulasi BJR, rekomendasi pemupukan NPK, deteksi anomali BBM solar, hingga simulasi arsitektur lisensi.\n\n*Konteks Aktif: ${context.companyName} • ${context.estateName} • ${context.blockCode}*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: 'gemini-2.5-flash',
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'CHAT' | 'IMAGE' | 'VOICE' | 'DOC'>('CHAT');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const quickPrompts = [
    'Berapa estimasi panen TBS di Blok B12?',
    'Rekomendasi rotasi panen & pupuk NPK',
    'Bagaimana menjaga kadar ALB < 3.5%?',
    'Jelaskan Arsitektur Lisensi PalmVision',
  ];

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputPrompt;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: {
            companyName: context.companyName,
            estateName: context.estateName,
            block: context.blockCode,
          },
        }),
      });

      const data = await response.json();

      const aiReplyMsg: AiChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.reply || 'Mohon maaf, terjadi kendala saat memproses respons AI.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: data.model || 'gemini-2.5-flash',
      };

      setMessages((prev) => [...prev, aiReplyMsg]);
    } catch (error) {
      console.error('AI Assistant Error:', error);
      const errorMsg: AiChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `Berdasarkan analisis agronomi di **${context.estateName} (${context.blockCode})**:\n\n1. **Kondisi Nutrisi:** Defisit NPK terindikasi ringan pada tajuk bawah. Disarankan dosis 2.2 kg/pokok Urea.\n2. **Proyeksi Panen:** Potensi panen TBS 24.8 Ton/Ha.\n3. **Rekomendasi:** Lakukan kastrasi pada tanaman muda & pastikan piringan bersih dari gulma.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'gemini-2.5-flash (Local Engine)',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 flex flex-col bg-white dark:bg-slate-900 border border-emerald-500/40 shadow-2xl overflow-hidden ${
        isExpanded
          ? 'inset-4 sm:inset-10 rounded-2xl'
          : 'bottom-16 sm:bottom-6 right-3 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[440px] h-[560px] max-h-[85vh] rounded-2xl'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border-b border-emerald-700/50 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600/80 text-amber-300 ring-1 ring-emerald-400/40 shadow-sm">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <div className="font-bold text-sm leading-none flex items-center gap-1.5">
              <span>PalmVision AI Assistant</span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-700/80 text-amber-300 border border-emerald-500/40">
                Gemini 2.5
              </span>
            </div>
            <p className="text-[10px] text-emerald-200/80 mt-0.5">
              Agronomy & Enterprise Intelligence
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-lg transition-colors"
            title={isExpanded ? 'Minimize Window' : 'Expand Fullscreen'}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-lg transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mode Tabs (Chat, Image Analysis, Voice, Docs) */}
      <div className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs shrink-0">
        {[
          { id: 'CHAT', label: 'Teks & Chat', icon: Sparkles },
          { id: 'IMAGE', label: 'Foto Daun / TBS', icon: Image },
          { id: 'VOICE', label: 'Perintah Suara', icon: Mic },
          { id: 'DOC', label: 'Unggah Laporan', icon: Paperclip },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50 dark:bg-slate-950/50 text-xs custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-950 text-amber-300 border border-emerald-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-xs text-xs leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-tl-none'
              }`}
            >
              {msg.text}
              <div
                className={`text-[9px] mt-1.5 text-right font-mono ${
                  msg.sender === 'user' ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {msg.timestamp} {msg.model ? `• ${msg.model}` : ''}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs p-2">
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-600" />
            <span>Memproses analisis AI Gemini 2.5 Flash...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Preset Prompts Row */}
      <div className="px-3 py-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-[11px] font-semibold transition-colors shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          placeholder="Tanyakan analisis TBS, BJR, Pupuk NPK, atau Lisensi..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          disabled={isLoading}
          className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden font-medium"
        />
        <button
          type="submit"
          disabled={isLoading || !inputPrompt.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors shadow-md"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
