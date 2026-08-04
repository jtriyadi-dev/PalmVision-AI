import React, { useState } from 'react';
import { ScrollableSubNav, TabItem } from '../../components/ScrollableSubNav';
import {
  Database,
  Building2,
  Trees,
  Package,
  Users,
  Wifi,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { CompanyOrgHierarchyView } from './views/CompanyOrgHierarchyView';
import { AgronomyMasterView } from './views/AgronomyMasterView';
import { MaterialWarehouseMasterView } from './views/MaterialWarehouseMasterView';
import { VendorBuyerMasterView } from './views/VendorBuyerMasterView';

export const MasterDataMainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'company' | 'agronomy' | 'warehouse' | 'vendor'>('company');

  const masterTabs: TabItem[] = [
    { id: 'company', label: 'Struktur Holding & Kebun/PKS', icon: Building2 },
    { id: 'agronomy', label: 'Master Varietas Bibit & Gradasi TBS', icon: Trees },
    { id: 'warehouse', label: 'SKU Material, Pupuk & Sparepart', icon: Package },
    { id: 'vendor', label: 'Master Buyer CPO, Vendor & Transporter', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Module Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 text-white shadow-lg">
            <Database className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
                Enterprise Central Registry
              </span>
              <span className="text-xs text-slate-400">PalmVision ERP Integrated Master Data</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">
              Master Data Enterprise Plantation & Mill Management
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 bg-indigo-950/60 px-3.5 py-2 rounded-xl border border-indigo-800/60">
          <ShieldCheck className="h-4 w-4 text-indigo-400" />
          <span>Central Master Data Standard Active</span>
        </div>
      </div>

      {/* Submenu Navigation Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-lg">
        <ScrollableSubNav
          items={masterTabs}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          activeColorClass="bg-indigo-600 text-white shadow-md"
        />
      </div>

      {/* Active Tab View Rendering */}
      {activeTab === 'company' && <CompanyOrgHierarchyView />}
      {activeTab === 'agronomy' && <AgronomyMasterView />}
      {activeTab === 'warehouse' && <MaterialWarehouseMasterView />}
      {activeTab === 'vendor' && <VendorBuyerMasterView />}
    </div>
  );
};
