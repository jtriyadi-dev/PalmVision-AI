import React, { useState } from 'react';
import {
  Trees,
  Sprout,
  Activity,
  Calendar,
  Layers,
  Pickaxe,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  Award,
  FileText,
  Sparkles,
  Camera,
  Search,
  Building2,
  ChevronRight,
  Menu,
  X,
  MapPin,
  ShieldCheck,
  Smartphone,
  Scale,
  Truck,
  TrendingUp,
  Boxes,
  Wrench,
  Users,
  DollarSign,
} from 'lucide-react';
import { PlantationMainView } from './modules/plantation/PlantationMainView';
import { FieldOperationsMainView } from './modules/field-operations/FieldOperationsMainView';
import { HarvestMainView } from './modules/harvest/HarvestMainView';
import { InventoryMainView } from './modules/inventory/InventoryMainView';
import { EamMainView } from './modules/eam/EamMainView';
import { HrmMainView } from './modules/hrm/HrmMainView';
import { FinanceMainView } from './modules/finance/FinanceMainView';
import { AiCenterMainView } from './modules/ai-center/AiCenterMainView';
import { SmartPlantationMainView } from './modules/smart-plantation/SmartPlantationMainView';
import { PlatformMainView } from './modules/platform/PlatformMainView';
import { ProductionLaunchMainView } from './modules/production-launch/ProductionLaunchMainView';
import { GisMapMainView } from './modules/gis/GisMapMainView';
import { MasterDataMainView } from './modules/master-data/MasterDataMainView';
import { LandingPage } from './components/LandingPage';
import { LoginModal } from './components/LoginModal';
import { Brain, Radio, Globe2, Rocket, Globe, Database, LogOut, ArrowLeft, User, ShieldAlert } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; email: string; estate: string } | null>({
    name: 'Bpk. Hendra Kusuma, M.B.A.',
    role: 'Group CEO & Managing Director',
    email: 'h.kusuma@nusantarapalm.co.id',
    estate: 'Holding Headquarters (Jakarta)'
  });
  const [activeModule, setActiveModule] = useState<string>('platform');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onEnterAppDirectly={() => setViewMode('app')}
        />
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setViewMode('app');
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white shadow-md">
              <Trees className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white block leading-tight">
                PalmVision <span className="text-emerald-400">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Enterprise Plantation Management
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode('landing')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-emerald-400" />
            <span>Kembali ke Landing Page</span>
          </button>

          {currentUser && (
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-indigo-950/80 border border-indigo-800/80 text-xs text-indigo-200">
              <User className="h-4 w-4 text-indigo-400" />
              <div className="hidden md:block">
                <span className="font-bold text-white block text-[11px] leading-tight">{currentUser.name}</span>
                <span className="text-[9px] text-indigo-300 block font-mono">{currentUser.role}</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setIsLoginModalOpen(true)}
            title="Ganti Pengguna / Login"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Main App Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        {sidebarOpen && (
          <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 space-y-6 shrink-0 hidden md:block overflow-y-auto">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block px-3 mb-2">
                Modul Utama System
              </span>

              <button
                onClick={() => setActiveModule('release')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'release'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Rocket className="h-4 w-4 text-emerald-400" />
                  <span>Production Release & QA</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('platform')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'platform'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe2 className="h-4 w-4 text-indigo-400" />
                  <span>Commercial SaaS Platform</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('smart-plantation')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'smart-plantation'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Radio className="h-4 w-4 text-emerald-400" />
                  <span>Smart Plantation IoT</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('ai-center')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'ai-center'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Brain className="h-4 w-4 text-emerald-400" />
                  <span>AI Center Enterprise</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('finance')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'finance'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="h-4 w-4 text-emerald-400" />
                  <span>Finance & Accounting</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('hrm')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'hrm'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <span>Human Resource (HRM)</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('eam')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'eam'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="h-4 w-4 text-purple-400" />
                  <span>Asset & Fleet (EAM)</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('inventory')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'inventory'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Boxes className="h-4 w-4 text-emerald-400" />
                  <span>Inventory & Supply Chain</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('harvest')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'harvest'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span>Harvest Management</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('field-operations')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'field-operations'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span>Field Operations</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('plantation')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'plantation'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Trees className="h-4 w-4" />
                  <span>Plantation Lifecycle</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('gis')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'gis'
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-teal-400" />
                  <span>GIS & Digital Map</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>

              <button
                onClick={() => setActiveModule('master-data')}
                className={`w-full p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'master-data'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="h-4 w-4 text-indigo-400" />
                  <span>Master Data Enterprise</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-70" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <Smartphone className="h-4 w-4" />
                <span>Harvest & Weighbridge Ready</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                TBS Quick Entry, TPH Grading, QR Tickets, Jembatan Timbang PKS & AI Forecast.
              </p>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {activeModule === 'release' && <ProductionLaunchMainView />}
          {activeModule === 'platform' && <PlatformMainView />}
          {activeModule === 'smart-plantation' && <SmartPlantationMainView />}
          {activeModule === 'gis' && <GisMapMainView />}
          {activeModule === 'master-data' && <MasterDataMainView />}
          {activeModule === 'ai-center' && <AiCenterMainView />}
          {activeModule === 'finance' && <FinanceMainView />}
          {activeModule === 'hrm' && <HrmMainView />}
          {activeModule === 'eam' && <EamMainView />}
          {activeModule === 'inventory' && <InventoryMainView />}
          {activeModule === 'harvest' && <HarvestMainView />}
          {activeModule === 'field-operations' && <FieldOperationsMainView />}
          {activeModule === 'plantation' && <PlantationMainView />}
        </main>
      </div>
    </div>
  );
}

