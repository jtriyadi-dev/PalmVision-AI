import React, { useState } from 'react';
import { FileText, Search, Filter, ShieldCheck, AlertCircle, Download, CheckCircle2 } from 'lucide-react';
import { SystemAuditLog } from '../../types';

export const AuditTrailView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('ALL');

  const [logs, setLogs] = useState<SystemAuditLog[]>([
    {
      id: 'log-101',
      timestamp: '2026-08-03 08:14:22',
      user: 'Suhardi, S.P. (Estate Manager)',
      role: 'ESTATE_MANAGER',
      action: 'INPUT_HARVEST_TONNAGE',
      module: 'Harvest Operasional',
      ipAddress: '10.20.14.88',
      status: 'SUCCESS',
      details: 'Pencatatan 142.8 Ton TBS di Blok B12 Afdeling Alpha',
    },
    {
      id: 'log-102',
      timestamp: '2026-08-03 08:05:10',
      user: 'Budiarto (Mandor 01)',
      role: 'MANDOR',
      action: 'OFFLINE_SYNC_UPLOAD',
      module: 'PWA Field Engine',
      ipAddress: '10.20.18.102',
      status: 'SUCCESS',
      details: 'Unggah 28 data BKM panen dari IndexedDB HP Mandor',
    },
    {
      id: 'log-103',
      timestamp: '2026-08-03 07:50:00',
      user: 'Guest User (IP 192.168.1.45)',
      role: 'GUEST',
      action: 'UNAUTHORIZED_PRICE_EDIT',
      module: 'Finance & Costing',
      ipAddress: '192.168.1.45',
      status: 'DENIED',
      details: 'Upaya pengubahan harga TBS tanpa otoritas RBAC',
    },
    {
      id: 'log-104',
      timestamp: '2026-08-03 07:30:12',
      user: 'Suhardi, S.P.',
      role: 'ESTATE_MANAGER',
      action: 'LOGIN_PORTAL_SUCCESS',
      module: 'Authentication',
      ipAddress: '10.20.14.88',
      status: 'SUCCESS',
      details: 'Login portal sukses menggunakan HWID-3891',
    },
    {
      id: 'log-105',
      timestamp: '2026-08-02 18:00:00',
      user: 'Super Admin',
      role: 'SUPER_ADMIN',
      action: 'UPDATE_LICENSE_KEY',
      module: 'License Core',
      ipAddress: '127.0.0.1',
      status: 'SUCCESS',
      details: 'Aktivasi kunci lisensi PVAI-ENT-SNJ-2027',
    },
  ]);

  const filteredLogs = logs.filter((l) => {
    const matchesSearch =
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'ALL' || l.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Audit Trail & Immutable Security Logs</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Jejak Rekam Lengkap Aktivitas Pengguna, Transaksi, Perubahan Lisensi & Akses AI
            </p>
          </div>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md">
          <Download className="h-4 w-4" />
          <span>Export Log Audit (CSV/Excel)</span>
        </button>
      </div>

      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari user, aksi, atau rincian audit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 pl-9 pr-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">Filter Modul:</span>
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">Semua Modul</option>
            <option value="Harvest Operasional">Harvest Operasional</option>
            <option value="PWA Field Engine">PWA Field Engine</option>
            <option value="Finance & Costing">Finance & Costing</option>
            <option value="Authentication">Authentication</option>
            <option value="License Core">License Core</option>
          </select>
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-x-auto text-xs">
        <table className="w-full text-left font-mono">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700 font-sans">
            <tr>
              <th className="p-3">Waktu</th>
              <th className="p-3">Pengguna & Role</th>
              <th className="p-3">Aksi Transaksi</th>
              <th className="p-3">Modul System</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Rincian Activity</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
            {filteredLogs.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3 text-slate-500 text-[11px]">{l.timestamp}</td>
                <td className="p-3 font-sans">
                  <div className="font-bold">{l.user}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">{l.role}</div>
                </td>
                <td className="p-3 font-bold">{l.action}</td>
                <td className="p-3 font-sans text-slate-600 dark:text-slate-300">{l.module}</td>
                <td className="p-3 text-slate-500">{l.ipAddress}</td>
                <td className="p-3 font-sans text-slate-600 dark:text-slate-300 max-w-xs">{l.details}</td>
                <td className="p-3 font-sans">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      l.status === 'SUCCESS'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
