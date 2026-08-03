import React from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Key, 
  Monitor, 
  Wifi, 
  Layers, 
  Activity, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';
import { LicenseInfo, UserRole, CompanyContext, WhiteLabelConfig } from '../../types';

interface EnterpriseFoundationDashboardProps {
  license: LicenseInfo;
  companyContext: CompanyContext;
  userRole: UserRole;
  whiteLabel: WhiteLabelConfig;
  onNavigateToModule: (moduleId: string) => void;
}

export const EnterpriseFoundationDashboard: React.FC<EnterpriseFoundationDashboardProps> = ({
  license,
  companyContext,
  userRole,
  whiteLabel,
  onNavigateToModule,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Banner Welcome & System Status */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white border border-emerald-500/30 shadow-2xl relative overflow-hidden flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-amber-300 text-[11px] font-bold">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>PalmVision AI Enterprise Foundation Ready</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Selamat Datang, Portal {whiteLabel?.appName || 'PalmVision AI'}
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Sistem Fondasi Teknis Aktif: Multi-Tenant Holding <strong className="text-white">{companyContext?.companyName || 'PT Sawit Nusantara Jaya'}</strong> • Unit <strong className="text-white">{companyContext?.estateName || 'Estate Teluk Dalam'}</strong> • Otoritas Peran <strong className="text-amber-300">{userRole}</strong>.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-xs space-y-2 min-w-[240px] z-10">
          <div className="flex items-center justify-between font-bold">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" /> Kunci Lisensi Status
            </span>
            <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[10px]">
              {license.status}
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-300">{license.customerName}</div>
          <div className="text-[10px] text-slate-400 flex justify-between">
            <span>Masa Berlaku: {license.daysRemaining} Hari</span>
            <span>HWID Bound: YES</span>
          </div>
        </div>
      </div>

      {/* Technical Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div 
          onClick={() => onNavigateToModule('company-profile')}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2 hover:border-emerald-500 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-semibold">Multi-Tenant Holding</span>
            <Building2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            {companyContext.companyName}
          </div>
          <p className="text-[11px] text-slate-400">Isolated Tenant ID & Corporate Data Boundary</p>
        </div>

        <div 
          onClick={() => onNavigateToModule('user-management')}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2 hover:border-emerald-500 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-semibold">RBAC Users Directory</span>
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            128 User Terdaftar
          </div>
          <p className="text-[11px] text-slate-400">17 Level Otoritas Peran & Granular Permissions</p>
        </div>

        <div 
          onClick={() => onNavigateToModule('license-dashboard')}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2 hover:border-emerald-500 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-semibold">Perangkat HP Field Bind</span>
            <Wifi className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            3 / 10 Device Bound
          </div>
          <p className="text-[11px] text-slate-400">Hardware ID Fingerprint & Offline Grace Active</p>
        </div>

        <div 
          onClick={() => onNavigateToModule('audit-trail')}
          className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2 hover:border-emerald-500 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-semibold">Audit Trail Logs</span>
            <FileText className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 dark:text-white">
            100% Immutable
          </div>
          <p className="text-[11px] text-slate-400">Tercatat di Server Log dengan IP & User Timestamp</p>
        </div>
      </div>

      {/* Core Foundation Shortcut Quick Grid */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Navigasi Modul Fondasi Teknis & Arsitektur
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
          {[
            { id: 'user-management', label: 'User Directory & 2FA', icon: Users, desc: 'Kelola pengguna, status 2FA, dan fingerprint' },
            { id: 'rbac-matrix', label: 'RBAC Matrix (17 Roles)', icon: Lock, desc: 'Atur matriks izin tindakan granular' },
            { id: 'hierarchy-view', label: '5-Tier Hierarchy', icon: Layers, desc: 'Company → Estate → Division → Block' },
            { id: 'white-label', label: 'White Labeling', icon: Building2, desc: 'Kustomisasi logo, warna, dan domain' },
            { id: 'license-dashboard', label: 'License & HWID', icon: Key, desc: 'Aktivasi, verifikasi, dan device binding' },
            { id: 'session-management', label: 'Session Control', icon: Monitor, desc: 'Remote logout dan pantauan IP aktif' },
            { id: 'audit-trail', label: 'Audit Trail Logs', icon: FileText, desc: 'Rekam jejak transaksi immutable' },
            { id: 'architecture-blueprints', label: 'System Blueprints', icon: Activity, desc: '10 dokumen arsitektur enterprise' },
          ].map((m) => {
            const IconComponent = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigateToModule(m.id)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:border-emerald-500/50 transition-all cursor-pointer space-y-1.5"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <IconComponent className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{m.label}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
