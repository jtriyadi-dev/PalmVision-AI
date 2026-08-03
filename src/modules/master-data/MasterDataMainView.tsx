import React, { useState } from 'react';
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
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-lg flex items-center gap-1 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('company')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'company'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Building2 className="h-4 w-4 text-indigo-300" />
          <span>Struktur Holding & Kebun/PKS</span>
        </button>

        <button
          onClick={() => setActiveTab('agronomy')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'agronomy'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Trees className="h-4 w-4 text-emerald-300" />
          <span>Master Varietas Bibit & Gradasi TBS</span>
        </button>

        <button
          onClick={() => setActiveTab('warehouse')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'warehouse'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Package className="h-4 w-4 text-amber-300" />
          <span>SKU Material, Pupuk & Sparepart</span>
        </button>

        <button
          onClick={() => setActiveTab('vendor')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
            activeTab === 'vendor'
              ? 'bg-sky-600 text-white shadow-md'
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
        >
          <Users className="h-4 w-4 text-sky-300" />
          <span>Master Buyer CPO, Vendor & Transporter</span>
        </button>
      </div>

      {/* Active Tab View Rendering */}
      {activeTab === 'company' && <CompanyOrgHierarchyView />}
      {activeTab === 'agronomy' && <AgronomyMasterView />}
      {activeTab === 'warehouse' && <MaterialWarehouseMasterView />}
      {activeTab === 'vendor' && <VendorBuyerMasterView />}
    </div>
  );
};
