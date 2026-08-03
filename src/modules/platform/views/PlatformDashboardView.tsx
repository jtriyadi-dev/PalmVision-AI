import React from 'react';
import {
  Building2,
  Key,
  CreditCard,
  HardDrive,
  Activity,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Server,
  Download,
  PlusCircle,
  RefreshCw,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockTenants, mockLicenses, mockSubscriptions, mockHealthMetrics } from '../mockData';

export const PlatformDashboardView: React.FC = () => {
  const activeTenantsCount = mockTenants.filter(t => t.status === 'ACTIVE').length;
  const trialTenantsCount = mockTenants.filter(t => t.status === 'TRIAL').length;
  const totalRevenue = mockSubscriptions.reduce((acc, curr) => acc + curr.amountUsd, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Building2 className="h-7 w-7 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-[10px] font-bold uppercase tracking-wider">
                  Commercial SaaS Platform v1.0
                </span>
                <span className="text-xs text-slate-400">Global Multi-Tenant Hub</span>
              </div>
              <h1 className="text-lg font-bold text-white mt-1">
                PalmVision AI Commercial Control Center
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Executive overview of tenant subscriptions, license allocations, system health & SaaS revenue metrics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer">
              <PlusCircle className="h-4 w-4" />
              <span>Provision New Tenant</span>
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center gap-2 cursor-pointer">
              <Key className="h-4 w-4 text-amber-400" />
              <span>Issue License Key</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Tenants</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Building2 className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{activeTenantsCount + trialTenantsCount}</span>
            <span className="text-xs text-emerald-400 font-bold">({activeTenantsCount} Paid, {trialTenantsCount} Trial)</span>
          </div>
          <p className="text-[11px] text-slate-400">Isolated schema & multi-db instances</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Annual Recurring Revenue (ARR)</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">${(totalRevenue).toLocaleString()}</span>
            <span className="text-xs text-emerald-400 font-bold">+28% YoY</span>
          </div>
          <p className="text-[11px] text-slate-400">3 Enterprise Conglomerates</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Devices & Users</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">1,765</span>
            <span className="text-xs text-purple-300 font-bold">202 Bound HW</span>
          </div>
          <p className="text-[11px] text-slate-400">Hardware Fingerprint Verified</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Platform Security & Uptime</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">99.98%</span>
            <span className="text-xs text-cyan-300 font-bold">Score 98/100</span>
          </div>
          <p className="text-[11px] text-slate-400">Encrypted AES-256 + Vault</p>
        </div>
      </div>

      {/* Middle Section: Active Tenants Overview & Live Infrastructure Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tenant Summary List */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <h3 className="text-sm font-bold text-white">Enterprise Tenants Overview</h3>
              <p className="text-xs text-slate-400">Live multi-tenant schema isolation & storage utilization</p>
            </div>
            <span className="text-xs text-indigo-400 font-bold">View All 4 Tenants</span>
          </div>

          <div className="space-y-3">
            {mockTenants.map(tenant => (
              <div key={tenant.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{tenant.tenantName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      tenant.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {tenant.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>Domain: {tenant.subdomain}</span>
                    <span>•</span>
                    <span>Isolation: {tenant.isolationMode}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs text-slate-300">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Users</div>
                    <div className="font-bold text-white">{tenant.activeUsersCount} / {tenant.maxUsersLimit}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Storage</div>
                    <div className="font-bold text-indigo-300">{tenant.storageUsedGb} GB</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health Service Matrix */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Cluster Microservices</h3>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Healthy
            </span>
          </div>

          <div className="space-y-3">
            {mockHealthMetrics.map(sys => (
              <div key={sys.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-700/50 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{sys.serviceName}</span>
                  <span className="text-emerald-400 font-mono font-bold">{sys.latencyMs}ms</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>CPU: {sys.cpuLoadPct}%</span>
                  <span>RAM: {sys.memoryUsagePct}%</span>
                  <span>Conn: {sys.activeConnections}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
