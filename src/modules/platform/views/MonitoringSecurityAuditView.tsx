import React, { useState } from 'react';
import {
  ShieldCheck,
  Activity,
  Lock,
  Eye,
  FileText,
  AlertOctagon,
  Key,
  Server,
  RefreshCw,
  Search
} from 'lucide-react';
import { mockAuditLogs, mockHealthMetrics } from '../mockData';

export const MonitoringSecurityAuditView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'AUDIT' | 'SECURITY' | 'HEALTH'>('AUDIT');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-rose-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider">
              Security Vault & SIEM Audit Center
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Enterprise Security Center, Audit Logs & SIEM</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Real-time audit trails, hardware fingerprint verification failures, secret vault rotation, and rate limiting rules.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('AUDIT')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'AUDIT' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Audit Logs
          </button>
          <button
            onClick={() => setActiveTab('SECURITY')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'SECURITY' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Security Policy & Vault
          </button>
        </div>
      </div>

      {activeTab === 'AUDIT' ? (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden space-y-4 p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Immutable Platform Audit Trail</h3>
              <p className="text-xs text-slate-400">SIEM event logs with actor IP, tenant ID, and cryptographic hashes</p>
            </div>
            <span className="text-xs text-rose-400 font-bold font-mono">3 Logs Captured</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-400 text-[11px] uppercase font-semibold border-b border-slate-700">
                  <th className="py-3.5 px-4">Timestamp & Severity</th>
                  <th className="py-3.5 px-4">Actor Email</th>
                  <th className="py-3.5 px-4">Action & Module</th>
                  <th className="py-3.5 px-4">Tenant Name</th>
                  <th className="py-3.5 px-4">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
                {mockAuditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition font-mono">
                    <td className="py-3.5 px-4">
                      <div className="text-slate-300">{log.timestamp}</div>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-bold ${
                        log.severity === 'WARN' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-white font-bold">{log.actorEmail}</td>
                    <td className="py-3.5 px-4">
                      <div className="text-rose-300 font-bold">{log.action}</div>
                      <div className="text-[10px] text-slate-400">{log.module}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">{log.tenantName}</td>
                    <td className="py-3.5 px-4 text-indigo-300">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="h-4 w-4 text-rose-400" />
              Secret Vault & Encryption Controls
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Database Field Level Encryption (KMS)</div>
                  <div className="text-slate-400 text-[11px]">AES-256 GCM Envelope Key Rotation</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">ACTIVE</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Hardware Device Fingerprint Enforcer</div>
                  <div className="text-slate-400 text-[11px]">Strict CPU ID / MAC address binding</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">ENFORCED</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Security Scorecard
            </h3>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
              <div className="text-4xl font-extrabold text-emerald-400 font-mono">98 / 100</div>
              <div className="text-xs text-slate-300 font-bold">OWASP Top 10 Enterprise Grade Compliance</div>
              <p className="text-[11px] text-slate-400">Zero critical vulnerabilities detected in last automated container audit.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
