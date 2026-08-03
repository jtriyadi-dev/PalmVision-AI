import React, { useState } from 'react';
import {
  Building2,
  Globe,
  Database,
  Users,
  HardDrive,
  ShieldAlert,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Sliders,
  Sparkles
} from 'lucide-react';
import { mockTenants } from '../mockData';
import { Tenant } from '../types';

export const TenantCustomerView: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIsolation, setSelectedIsolation] = useState('ALL');

  const filteredTenants = tenants.filter(t => {
    const matchesSearch = t.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIsolation = selectedIsolation === 'ALL' || t.isolationMode === selectedIsolation;
    return matchesSearch && matchesIsolation;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
              Multi-Tenant Architecture
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Tenant & Customer Enterprise Management</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Configure isolated database schemas, subdomains, storage quotas & user seat allocations.
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>Provision Tenant Schema</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tenant name, domain, company..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold">Isolation Mode:</span>
          <select
            value={selectedIsolation}
            onChange={e => setSelectedIsolation(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-white rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="ALL">All Modes</option>
            <option value="SCHEMA_PER_TENANT">Schema Per Tenant</option>
            <option value="MULTI_DB">Multi Database</option>
            <option value="SINGLE_DB_ISOLATED">Single DB Isolated</option>
          </select>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-[11px] uppercase font-semibold border-b border-slate-700">
                <th className="py-3.5 px-4">Tenant & Company</th>
                <th className="py-3.5 px-4">Subdomain & Domain</th>
                <th className="py-3.5 px-4">Isolation Mode</th>
                <th className="py-3.5 px-4">User Seats</th>
                <th className="py-3.5 px-4">Storage Usage</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {filteredTenants.map(t => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-4 px-4 font-bold text-white">
                    <div>{t.tenantName}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{t.companyName} ({t.tenantCode})</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-indigo-300">
                    <div>{t.subdomain}</div>
                    {t.customDomain && <div className="text-[10px] text-emerald-400">{t.customDomain}</div>}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-mono text-[10px]">
                      {t.isolationMode}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold">
                    {t.activeUsersCount} / {t.maxUsersLimit}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-200">{t.storageUsedGb} GB / {t.storageLimitGb} GB</div>
                    <div className="w-24 bg-slate-800 rounded-full h-1.5 mt-1 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full"
                        style={{ width: `${(t.storageUsedGb / t.storageLimitGb) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      t.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      t.status === 'TRIAL' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition">
                        <Sliders className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-400 transition">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
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
