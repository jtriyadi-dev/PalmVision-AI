import React from 'react';
import { ShieldCheck, Lock, KeyRound, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { SystemAuditLog } from '../../types';

export const SecurityArchitectureView: React.FC = () => {
  const sampleAuditLogs: SystemAuditLog[] = [
    {
      id: 'log-01',
      timestamp: '2026-08-03 08:14:22',
      user: 'Suhardi (Estate Manager)',
      role: 'ESTATE_MANAGER',
      action: 'INPUT_HARVEST_TONNAGE',
      module: 'Harvest Operasional',
      ipAddress: '10.20.14.88',
      status: 'SUCCESS',
    },
    {
      id: 'log-02',
      timestamp: '2026-08-03 08:05:10',
      user: 'Budiarto (Mandor 01)',
      role: 'MANDOR',
      action: 'OFFLINE_SYNC_UPLOAD',
      module: 'PWA Sync Engine',
      ipAddress: '10.20.18.102',
      status: 'SUCCESS',
    },
    {
      id: 'log-03',
      timestamp: '2026-08-03 07:50:00',
      user: 'Guest User',
      role: 'GUEST',
      action: 'UNAUTHORIZED_PRICE_EDIT',
      module: 'Finance & Costing',
      ipAddress: '192.168.1.45',
      status: 'DENIED',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">9. Security Architecture & Audit Trail</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              JWT Tokens, Role-Based Access Control (RBAC), CSRF Shields & Immutable System Audit Logs
            </p>
          </div>
        </div>
      </div>

      {/* RBAC Roles Grid */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Hirarki Role-Based Access Control (17 Granular Roles)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-xs">
          {[
            'SUPER_ADMIN',
            'DEVELOPER',
            'OWNER',
            'DIRECTOR',
            'GENERAL_MANAGER',
            'ESTATE_MANAGER',
            'ASSISTANT_MANAGER',
            'SUPERVISOR',
            'MANDOR',
            'OPERATOR',
            'FINANCE',
            'ACCOUNTING',
            'WAREHOUSE',
            'HRD',
            'PROCUREMENT',
            'SECURITY',
            'AUDITOR',
          ].map((role) => (
            <div
              key={role}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-between"
            >
              <span>{role}</span>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Live System Audit Trail Table */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <FileText className="h-4 w-4 text-emerald-600" /> Live Security Audit Logs (Sample Stream)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-2.5">Waktu</th>
                <th className="p-2.5">User / Role</th>
                <th className="p-2.5">Aksi / Kegiatan</th>
                <th className="p-2.5">Modul</th>
                <th className="p-2.5">IP Address</th>
                <th className="p-2.5">Status Security</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-mono">
              {sampleAuditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-2.5 text-slate-500">{log.timestamp}</td>
                  <td className="p-2.5 font-bold">{log.user}</td>
                  <td className="p-2.5">{log.action}</td>
                  <td className="p-2.5">{log.module}</td>
                  <td className="p-2.5 text-slate-500">{log.ipAddress}</td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
