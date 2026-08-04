import React, { useState } from 'react';
import { ScrollableSubNav } from '../../components/ScrollableSubNav';
import {
  Building2,
  Key,
  CreditCard,
  Users,
  Palette,
  RefreshCw,
  ShieldCheck,
  Rocket,
  Activity,
  Layers,
  Server
} from 'lucide-react';
import { PlatformDashboardView } from './views/PlatformDashboardView';
import { TenantCustomerView } from './views/TenantCustomerView';
import { LicenseActivationView } from './views/LicenseActivationView';
import { SubscriptionBillingView } from './views/SubscriptionBillingView';
import { CustomerPartnerPortalView } from './views/CustomerPartnerPortalView';
import { WhiteLabelMarketplaceView } from './views/WhiteLabelMarketplaceView';
import { UpdateBackupDevOpsView } from './views/UpdateBackupDevOpsView';
import { MonitoringSecurityAuditView } from './views/MonitoringSecurityAuditView';
import { Prompt16RoadmapView } from './views/Prompt16RoadmapView';

export const PlatformMainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Platform Dashboard', icon: Activity },
    { id: 'tenants', label: 'Tenant Management', icon: Building2 },
    { id: 'licenses', label: 'License & Devices', icon: Key },
    { id: 'billing', label: 'Subscriptions & Billing', icon: CreditCard },
    { id: 'portals', label: 'Customer & Partner Portal', icon: Users },
    { id: 'whitelabel', label: 'White Label & Marketplace', icon: Palette },
    { id: 'devops', label: 'Update & Backup DevOps', icon: Server },
    { id: 'security', label: 'Security & Audit SIEM', icon: ShieldCheck },
    { id: 'prompt16', label: 'Prompt 16 Roadmap', icon: Rocket }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Module Title Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 text-white shadow-lg">
            <Building2 className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
                Module 15 Active
              </span>
              <span className="text-xs text-slate-400">PalmVision AI Commercial Platform</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">
              Commercial Platform, Multi-Tenant SaaS, License & DevOps Engine
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-indigo-950/60 px-3.5 py-2 rounded-xl border border-indigo-800/60">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>SaaS Commercial Platform Ready</span>
        </div>
      </div>

      {/* Navigation Submenu Tabs */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-lg">
        <ScrollableSubNav
          items={navItems}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id)}
          activeColorClass="bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
        />
      </div>

      {/* Main Tab Content View Switcher */}
      <div className="min-h-[500px]">
        {activeTab === 'dashboard' && <PlatformDashboardView />}
        {activeTab === 'tenants' && <TenantCustomerView />}
        {activeTab === 'licenses' && <LicenseActivationView />}
        {activeTab === 'billing' && <SubscriptionBillingView />}
        {activeTab === 'portals' && <CustomerPartnerPortalView />}
        {activeTab === 'whitelabel' && <WhiteLabelMarketplaceView />}
        {activeTab === 'devops' && <UpdateBackupDevOpsView />}
        {activeTab === 'security' && <MonitoringSecurityAuditView />}
        {activeTab === 'prompt16' && <Prompt16RoadmapView />}
      </div>
    </div>
  );
};
