import React from 'react';
import { Server, Cpu, Database, Cloud, WifiOff, Smartphone, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

export const SystemArchitectureView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Server className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">1. Arsitektur Aplikasi & Cloud Infrastructure</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Modular Monolith Enterprise with Server-Side Gemini API Proxy & Edge Field Sync Engine
            </p>
          </div>
        </div>
      </div>

      {/* Visual Architectural Flow Diagram */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Enterprise Cloud & Edge Architecture Diagram
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {/* Layer 1: Client Devices */}
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700/60 space-y-2">
            <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
              <span className="flex items-center gap-1.5"><Smartphone className="h-4 w-4" /> Client Layer</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-800">PWA</span>
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
              <li>• Mobile Android / iOS (Mandor Field)</li>
              <li>• Tablet Dashboard (Assistant Manager)</li>
              <li>• Desktop Web App (Director / EM)</li>
              <li>• IndexedDB Offline Store</li>
            </ul>
          </div>

          {/* Layer 2: Express Gateway */}
          <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-slate-100">
              <span className="flex items-center gap-1.5"><Server className="h-4 w-4 text-emerald-500" /> Express API Gateway</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">Port 3000</span>
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
              <li>• JWT Auth & Refresh Tokens</li>
              <li>• Rate Limiting & Input Validation</li>
              <li>• Organization Context Switcher</li>
              <li>• REST API /api/v1/ Endpoints</li>
            </ul>
          </div>

          {/* Layer 3: AI Engine Proxy */}
          <div className="p-4 rounded-xl bg-slate-900 text-white border border-emerald-500/40 space-y-2">
            <div className="flex items-center justify-between font-bold text-amber-300">
              <span className="flex items-center gap-1.5"><Cpu className="h-4 w-4" /> AI Engine Proxy</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-800 text-emerald-200">Gemini 3.6</span>
            </div>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>• @google/genai Server SDK</li>
              <li>• User-Agent: aistudio-build</li>
              <li>• Yield Forecast & OCR SPB</li>
              <li>• Agronomy Advisory AI</li>
            </ul>
          </div>

          {/* Layer 4: Storage & Database */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-300 dark:border-blue-700/60 space-y-2">
            <div className="flex items-center justify-between font-bold text-blue-800 dark:text-blue-300">
              <span className="flex items-center gap-1.5"><Database className="h-4 w-4" /> Data Store</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-800">Cloud SQL</span>
            </div>
            <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
              <li>• PostgreSQL / Firestore Master</li>
              <li>• Audit Trail Versioning</li>
              <li>• Time-Series Harvest Indexing</li>
              <li>• Secure Media Storage</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Architectural Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> Enterprise Reliability Guarantees
          </h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Sistem menggunakan model deployment Cloud Run containerized dengan dukungan auto-scaling. Semua panggilan AI disalurkan melalui server proxy tertutup untuk mencegah paparan API key di jaringan publik.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
            <WifiOff className="h-4 w-4 text-amber-600" /> Offline Field First Strategy
          </h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Di area kebun sawit tanpa sinyal 4G, aplikasi berpindah secara mulus ke local IndexedDB cache engine. Saat HP mandor mendapatkan sinyal di kantor afdeling, background sync secara otomatis mengunggah data panen.
          </p>
        </div>
      </div>
    </div>
  );
};
