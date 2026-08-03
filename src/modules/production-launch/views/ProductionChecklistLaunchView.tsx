import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
  Zap,
  Clock,
  Check,
  Server,
  Building2,
  Download,
  Share2
} from 'lucide-react';
import { mockProductionChecklist } from '../mockData';

export const ProductionChecklistLaunchView: React.FC = () => {
  const [checklist, setChecklist] = useState(mockProductionChecklist);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLaunched, setIsLaunched] = useState(true);

  const verifiedCount = checklist.filter(c => c.isVerified).length;
  const totalCount = checklist.length;

  const handleRunFinalLaunchSignoff = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setIsLaunching(false);
      setIsLaunched(true);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Launch Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Rocket className="h-8 w-8 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider">
                  PalmVision AI v1.0 Commercial Release
                </span>
                <span className="text-xs text-slate-400">Production Ready</span>
              </div>
              <h1 className="text-xl font-extrabold text-white mt-1">
                Enterprise Palm Plantation ERP + Smart AI + IoT Platform
              </h1>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                Official commercial launch signoff verified across 16 enterprise modules, 38 database tables, and multi-tenant SaaS architecture.
              </p>
            </div>
          </div>

          <button
            onClick={handleRunFinalLaunchSignoff}
            disabled={isLaunching}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-xs transition shadow-xl flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`h-4 w-4 ${isLaunching ? 'animate-spin' : ''}`} />
            <span>{isLaunching ? 'Verifying Production Release...' : 'Run Final Release Signoff'}</span>
          </button>
        </div>
      </div>

      {/* Production Metrics Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Integrated Modules</span>
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">16 / 16</span>
            <span className="text-xs text-emerald-400 font-bold">100% Ready</span>
          </div>
          <p className="text-[11px] text-slate-400">ERP, AI, Smart IoT, GIS, SaaS & DevOps</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">System Security Score</span>
            <ShieldCheck className="h-5 w-5 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">98 / 100</span>
            <span className="text-xs text-cyan-300 font-bold">OWASP Hardened</span>
          </div>
          <p className="text-[11px] text-slate-400">AES-256 Vault + RSA License Key</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Performance Index</span>
            <Zap className="h-5 w-5 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">96 / 100</span>
            <span className="text-xs text-amber-300 font-bold">&lt;1.8s Load</span>
          </div>
          <p className="text-[11px] text-slate-400">Sub-300ms API response time</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Deployment Compatibility</span>
            <Server className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">SaaS / On-Prem</span>
            <span className="text-xs text-indigo-300 font-bold">Docker / K8s</span>
          </div>
          <p className="text-[11px] text-slate-400">Supports air-gapped estate servers</p>
        </div>
      </div>

      {/* Production Readiness Verification Checklist */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Production Readiness Signoff Checklist</h3>
            <p className="text-xs text-slate-400">Verified by Enterprise Architects, Security Auditors & SRE Engineers</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono">
            {verifiedCount} / {totalCount} Requirements Signoff Complete
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checklist.map(item => (
            <div key={item.id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-slate-900 text-indigo-300 font-mono text-[10px] font-bold">
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Signoff Verified
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

              <div className="pt-2 border-t border-slate-700/60 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                <span>Signoff Lead: <strong className="text-slate-200">{item.verifiedBy}</strong></span>
                <span className="text-emerald-400">STATUS: APPROVED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
