import React, { useState } from 'react';
import { Shield, Check, X, Lock, CheckCircle2, RefreshCw } from 'lucide-react';
import { UserRole, PermissionAction } from '../../types';

export const RbacMatrixView: React.FC = () => {
  const actionsList: { key: PermissionAction; label: string }[] = [
    { key: 'VIEW', label: 'View / Read' },
    { key: 'CREATE', label: 'Create Record' },
    { key: 'UPDATE', label: 'Update / Edit' },
    { key: 'DELETE', label: 'Delete Data' },
    { key: 'APPROVE', label: 'Approve Workflow' },
    { key: 'EXPORT', label: 'Export PDF/Excel' },
    { key: 'IMPORT', label: 'Import CSV' },
    { key: 'AI_ACCESS', label: 'AI Gemini Access' },
    { key: 'ANALYTICS', label: 'BI Analytics' },
    { key: 'LICENSE_MANAGE', label: 'Manage License' },
  ];

  const rolesList: { role: UserRole; name: string }[] = [
    { role: 'SUPER_ADMIN', name: 'Super Admin' },
    { role: 'DIRECTOR', name: 'Director' },
    { role: 'ESTATE_MANAGER', name: 'Estate Manager' },
    { role: 'ASSISTANT_MANAGER', name: 'Assistant Manager' },
    { role: 'MANDOR', name: 'Mandor' },
    { role: 'FINANCE', name: 'Finance' },
    { role: 'AUDITOR', name: 'Auditor' },
  ];

  // Default permission matrix state
  const [matrix, setMatrix] = useState<Record<UserRole, Record<PermissionAction, boolean>>>({
    SUPER_ADMIN: {
      VIEW: true,
      CREATE: true,
      UPDATE: true,
      DELETE: true,
      APPROVE: true,
      EXPORT: true,
      IMPORT: true,
      PRINT: true,
      AI_ACCESS: true,
      ANALYTICS: true,
      LICENSE_MANAGE: true,
      MASTER_DATA: true,
      SETTING: true,
    },
    DIRECTOR: {
      VIEW: true,
      CREATE: false,
      UPDATE: false,
      DELETE: false,
      APPROVE: true,
      EXPORT: true,
      IMPORT: false,
      PRINT: true,
      AI_ACCESS: true,
      ANALYTICS: true,
      LICENSE_MANAGE: true,
      MASTER_DATA: false,
      SETTING: false,
    },
    ESTATE_MANAGER: {
      VIEW: true,
      CREATE: true,
      UPDATE: true,
      DELETE: false,
      APPROVE: true,
      EXPORT: true,
      IMPORT: true,
      PRINT: true,
      AI_ACCESS: true,
      ANALYTICS: true,
      LICENSE_MANAGE: false,
      MASTER_DATA: true,
      SETTING: false,
    },
    ASSISTANT_MANAGER: {
      VIEW: true,
      CREATE: true,
      UPDATE: true,
      DELETE: false,
      APPROVE: false,
      EXPORT: true,
      IMPORT: true,
      PRINT: true,
      AI_ACCESS: true,
      ANALYTICS: true,
      LICENSE_MANAGE: false,
      MASTER_DATA: false,
      SETTING: false,
    },
    MANDOR: {
      VIEW: true,
      CREATE: true,
      UPDATE: true,
      DELETE: false,
      APPROVE: false,
      EXPORT: false,
      IMPORT: false,
      PRINT: false,
      AI_ACCESS: true,
      ANALYTICS: false,
      LICENSE_MANAGE: false,
      MASTER_DATA: false,
      SETTING: false,
    },
    FINANCE: {
      VIEW: true,
      CREATE: true,
      UPDATE: true,
      DELETE: false,
      APPROVE: true,
      EXPORT: true,
      IMPORT: true,
      PRINT: true,
      AI_ACCESS: true,
      ANALYTICS: true,
      LICENSE_MANAGE: false,
      MASTER_DATA: false,
      SETTING: false,
    },
    AUDITOR: {
      VIEW: true,
      CREATE: false,
      UPDATE: false,
      DELETE: false,
      APPROVE: false,
      EXPORT: true,
      IMPORT: false,
      PRINT: true,
      AI_ACCESS: true,
      ANALYTICS: true,
      LICENSE_MANAGE: false,
      MASTER_DATA: false,
      SETTING: false,
    },
    DEVELOPER: { VIEW: true, CREATE: true, UPDATE: true, DELETE: true, APPROVE: true, EXPORT: true, IMPORT: true, PRINT: true, AI_ACCESS: true, ANALYTICS: true, LICENSE_MANAGE: true, MASTER_DATA: true, SETTING: true },
    OWNER: { VIEW: true, CREATE: true, UPDATE: true, DELETE: true, APPROVE: true, EXPORT: true, IMPORT: true, PRINT: true, AI_ACCESS: true, ANALYTICS: true, LICENSE_MANAGE: true, MASTER_DATA: true, SETTING: true },
    GENERAL_MANAGER: { VIEW: true, CREATE: true, UPDATE: true, DELETE: false, APPROVE: true, EXPORT: true, IMPORT: true, PRINT: true, AI_ACCESS: true, ANALYTICS: true, LICENSE_MANAGE: false, MASTER_DATA: true, SETTING: false },
    SUPERVISOR: { VIEW: true, CREATE: true, UPDATE: true, DELETE: false, APPROVE: false, EXPORT: true, IMPORT: false, PRINT: true, AI_ACCESS: true, ANALYTICS: false, LICENSE_MANAGE: false, MASTER_DATA: false, SETTING: false },
    OPERATOR: { VIEW: true, CREATE: true, UPDATE: false, DELETE: false, APPROVE: false, EXPORT: false, IMPORT: false, PRINT: false, AI_ACCESS: false, ANALYTICS: false, LICENSE_MANAGE: false, MASTER_DATA: false, SETTING: false },
    ACCOUNTING: { VIEW: true, CREATE: true, UPDATE: true, DELETE: false, APPROVE: false, EXPORT: true, IMPORT: true, PRINT: true, AI_ACCESS: true, ANALYTICS: true, LICENSE_MANAGE: false, MASTER_DATA: false, SETTING: false },
    WAREHOUSE: { VIEW: true, CREATE: true, UPDATE: true, DELETE: false, APPROVE: false, EXPORT: true, IMPORT: true, PRINT: true, AI_ACCESS: false, ANALYTICS: false, LICENSE_MANAGE: false, MASTER_DATA: false, SETTING: false },
    HRD: { VIEW: true, CREATE: true, UPDATE: true, DELETE: false, APPROVE: true, EXPORT: true, IMPORT: true, PRINT: true, AI_ACCESS: false, ANALYTICS: false, LICENSE_MANAGE: false, MASTER_DATA: false, SETTING: false },
    PROCUREMENT: { VIEW: true, CREATE: true, UPDATE: true, DELETE: false, APPROVE: false, EXPORT: true, IMPORT: true, PRINT: true, AI_ACCESS: false, ANALYTICS: false, LICENSE_MANAGE: false, MASTER_DATA: false, SETTING: false },
    SECURITY: { VIEW: true, CREATE: true, UPDATE: false, DELETE: false, APPROVE: false, EXPORT: false, IMPORT: false, PRINT: false, AI_ACCESS: false, ANALYTICS: false, LICENSE_MANAGE: false, MASTER_DATA: false, SETTING: false },
    GUEST: { VIEW: true, CREATE: false, UPDATE: false, DELETE: false, APPROVE: false, EXPORT: false, IMPORT: false, PRINT: false, AI_ACCESS: false, ANALYTICS: false, LICENSE_MANAGE: false, MASTER_DATA: false, SETTING: false },
  });

  const [savedMsg, setSavedMsg] = useState(false);

  const togglePermission = (role: UserRole, action: PermissionAction) => {
    setMatrix((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [action]: !prev[role][action],
      },
    }));
  };

  const handleSaveMatrix = () => {
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">RBAC Permission Matrix (Otoritas Peran)</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Atur Matriks Izin Akses Granular untuk 17 Peran Pengguna Perkebunan
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveMatrix}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{savedMsg ? 'Tersimpan!' : 'Simpan Matriks Peran'}</span>
        </button>
      </div>

      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3">Role Peran</th>
              {actionsList.map((act) => (
                <th key={act.key} className="p-3 text-center min-w-[90px]">
                  {act.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
            {rolesList.map((r) => (
              <tr key={r.role} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  {r.name}
                  <span className="block text-[10px] text-slate-400 font-normal">{r.role}</span>
                </td>
                {actionsList.map((act) => {
                  const allowed = matrix[r.role]?.[act.key];
                  return (
                    <td key={act.key} className="p-3 text-center">
                      <button
                        onClick={() => togglePermission(r.role, act.key)}
                        className={`h-6 w-6 rounded-lg inline-flex items-center justify-center transition-all cursor-pointer ${
                          allowed
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {allowed ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
