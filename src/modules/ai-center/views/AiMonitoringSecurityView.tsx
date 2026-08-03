import React from 'react';
import {
  ShieldCheck,
  Lock,
  DollarSign,
  Activity,
  FileCode2,
  AlertTriangle,
  Key,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_USAGE_LOGS } from '../mockData';

export const AiMonitoringSecurityView: React.FC = () => {
  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>AI Cost Monitoring, API Key Vault & Security Guardrails</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Manajemen API Keys, Prompt Injection Protection, Sensitive Data Masking, & Telemetri Penggunaan Token.
          </p>
        </div>
      </div>

      {/* Top Security Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 font-mono">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold font-sans">API Key Vault Status</span>
            <Key className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-lg font-black text-emerald-400">ENCRYPTED (AES-256)</p>
          <p className="text-[10px] text-slate-400 font-sans">Kunci Tersimpan Aman Server-Side</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 font-mono">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold font-sans">Prompt Injection Guard</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-lg font-black text-emerald-400">ACTIVE (0 Threat)</p>
          <p className="text-[10px] text-slate-400 font-sans">Filter Sanitasi Payload Prompt</p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 font-mono">
          <div className="flex justify-between items-center text-slate-400">
            <span className="font-bold font-sans">Data Masking (PII / NIK)</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-lg font-black text-cyan-400">MASKED ON GATEWAY</p>
          <p className="text-[10px] text-slate-400 font-sans">Gaji & NIK Otomatis Di-Anonymize</p>
        </div>
      </div>

      {/* Usage & Cost Audit Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>Audit Log Usage Token & Biaya AI Per Pengguna</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2.5 px-3">TIMESTAMP</th>
                <th className="py-2.5 px-3">PENGGUNA</th>
                <th className="py-2.5 px-3">DEPARTEMEN</th>
                <th className="py-2.5 px-3">MODEL AI</th>
                <th className="py-2.5 px-3">PROMPT TOKENS</th>
                <th className="py-2.5 px-3">COMPLETION TOKENS</th>
                <th className="py-2.5 px-3">EST. COST (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {INITIAL_USAGE_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-950/50">
                  <td className="py-2.5 px-3 text-slate-400">{log.timestamp}</td>
                  <td className="py-2.5 px-3 font-bold font-sans text-white">{log.userName}</td>
                  <td className="py-2.5 px-3">{log.department}</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-400">{log.model}</td>
                  <td className="py-2.5 px-3">{log.promptTokens}</td>
                  <td className="py-2.5 px-3">{log.completionTokens}</td>
                  <td className="py-2.5 px-3 font-bold text-amber-400">${log.estimatedCostUsd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
