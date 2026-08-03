import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Cpu, Eye, FileText, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AiArchitectureView: React.FC = () => {
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const aiServices = [
    {
      title: '1. AI Agronomy Assistant (Chat)',
      desc: 'Sistem pakar percakapan interaktif menggunakan Gemini 3.6 Flash untuk rekomendasi rotasi panen, pemupukan NPK, dan manajemen ALB.',
      icon: Sparkles,
      status: 'Active',
    },
    {
      title: '2. AI Yield & Production Forecast',
      desc: 'Algoritma regresi memprediksi hasil tonase TBS 3-6 bulan ke depan berdasarkan data SPH, curah hujan, dan histori BJR.',
      icon: TrendingUp,
      status: 'Active',
    },
    {
      title: '3. AI Vision Crop Protection',
      desc: 'Deteksi dini penyakit pelepah, gejala Ganoderma boninense, dan ulat api dari foto kamera smartphone di lapangan.',
      icon: Eye,
      status: 'Active',
    },
    {
      title: '4. AI OCR Nota Timbang & SPB',
      desc: 'Ekstraksi otomatis foto lembar Surat Pengantar Buah (SPB) dan Nota Timbangan PKS menjadi data digital terstruktur.',
      icon: FileText,
      status: 'Active',
    },
    {
      title: '5. AI Operational Anomaly Sentinel',
      desc: 'Mendeteksi otomatis anomali lonjakan konsumsi BBM solar pada truk pengangkut atau penurunan tajam BJR panen.',
      icon: AlertTriangle,
      status: 'Active',
    },
  ];

  const handleRunAiSimulation = async () => {
    setIsAnalyzing(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/v1/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Berikan analisis cepat prediksi hasil panen dan rekomendasi dosis pupuk NPK untuk Blok B12 (Areal TM 2018).',
          context: {
            companyName: 'PT Sawit Nusantara Jaya',
            estateName: 'Estate Teluk Dalam',
            block: 'Blok B12',
          },
        }),
      });

      const data = await res.json();
      setTestResult(data.reply);
    } catch (err) {
      setTestResult('Gagal menghubungi AI Server Engine.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">7. AI Architecture & Modular Intelligence Suite</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Powered by Server-Side Gemini 3.6 Flash Engine with Zero Client-Key Exposure
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiServices.map((svc, idx) => {
          const IconComp = svc.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2 hover:border-emerald-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <IconComp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  {svc.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                  {svc.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {svc.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* AI Playground Simulator Card */}
      <div className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-300">
            <Cpu className="h-4 w-4" /> Live AI Engine Simulation Test
          </div>
          <button
            onClick={handleRunAiSimulation}
            disabled={isAnalyzing}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isAnalyzing ? 'Menjalankan Analisis Gemini...' : 'Uji AI Gemini Server Proxy'}
          </button>
        </div>

        {testResult && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-line max-h-60 overflow-y-auto">
            {testResult}
          </div>
        )}
      </div>
    </div>
  );
};
