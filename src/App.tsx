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
  Brain,
  Radio,
  Globe2,
  Rocket,
  Globe,
  Database,
  LogOut,
  ArrowLeft,
  User,
  ShieldAlert,
  Crown
} from 'lucide-react';
import { ExecutiveMainView } from './modules/executive/ExecutiveMainView';
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
import { RealtimeLiveHeaderBar } from './components/RealtimeLiveHeaderBar';
import { EnterpriseDataProvider, useEnterpriseData } from './context/EnterpriseDataContext';

function AppWorkspace() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; email: string; estate: string } | null>({
    name: 'Bpk. Hendra Kusuma, M.B.A.',
    role: 'Group CEO & Managing Director',
    email: 'h.kusuma@nusantarapalm.co.id',
    estate: 'Holding Headquarters (Jakarta)'
  });
  
  const { activeModule, setActiveModule } = useEnterpriseData();
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

      {/* Real-time Ticker & Cross-Module Quick Jump Header Bar */}
      <RealtimeLiveHeaderBar />

      {/* Main App Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Navigation */}
        {sidebarOpen && (
          <aside className="w-72 bg-slate-900 border-r border-slate-800 p-4 space-y-5 shrink-0 hidden md:block overflow-y-auto">
            {/* Quick Menu Filter Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Cari menu & fitur..."
                onChange={(e) => {
                  const val = e.target.value.toLowerCase();
                  const buttons = document.querySelectorAll('.sidebar-menu-item');
                  buttons.forEach((btn) => {
                    const text = btn.textContent?.toLowerCase() || '';
                    if (text.includes(val)) {
                      (btn as HTMLElement).style.display = 'flex';
                    } else {
                      (btn as HTMLElement).style.display = 'none';
                    }
                  });
                }}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* Menu Group 0: Eksekutif & Direksi */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 mb-1.5">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                  0. Eksekutif & Direksi
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">C-Suite</span>
              </div>

              <button
                onClick={() => setActiveModule('executive')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'executive'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Crown className="h-4 w-4 text-amber-400" />
                  <span>Dashboard Eksekutif & Direksi</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>

            {/* Menu Group 1: Panen & Agronomi Kebun */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 mb-1.5">
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider">
                  1. Panen & Agronomi Kebun
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono">3 Modul</span>
              </div>

              <button
                onClick={() => setActiveModule('harvest')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'harvest'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                  <span>Harvest Management</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveModule('field-operations')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'field-operations'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  <span>Field Operations</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveModule('plantation')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'plantation'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Trees className="h-4 w-4 text-emerald-400" />
                  <span>Plantation Lifecycle</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>

            {/* Menu Group 2: Peta GIS & Spasial */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 mb-1.5">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-wider">
                  2. Peta GIS & Spasial
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-950 text-teal-300 font-mono">1 Modul</span>
              </div>

              <button
                onClick={() => setActiveModule('gis')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'gis'
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-teal-400" />
                  <span>GIS & Digital Map</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>

            {/* Menu Group 3: Smart IoT & AI Engine */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 mb-1.5">
                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">
                  3. Smart IoT & AI Engine
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">2 Modul</span>
              </div>

              <button
                onClick={() => setActiveModule('smart-plantation')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'smart-plantation'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Radio className="h-4 w-4 text-cyan-400" />
                  <span>Smart Plantation IoT</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveModule('ai-center')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'ai-center'
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Brain className="h-4 w-4 text-cyan-400" />
                  <span>AI Center Enterprise</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>

            {/* Menu Group 4: Rantai Pasok & Gudang */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 mb-1.5">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                  4. Logistik & Aset Enterprise
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-mono">2 Modul</span>
              </div>

              <button
                onClick={() => setActiveModule('inventory')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'inventory'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Boxes className="h-4 w-4 text-amber-400" />
                  <span>Inventory & Supply Chain</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveModule('eam')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'eam'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="h-4 w-4 text-amber-400" />
                  <span>Asset & Fleet (EAM)</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>

            {/* Menu Group 5: Keuangan & Sumber Daya Manusia */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 mb-1.5">
                <span className="text-[10px] font-black text-sky-400 uppercase tracking-wider">
                  5. Keuangan & Human Capital
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-300 font-mono">2 Modul</span>
              </div>

              <button
                onClick={() => setActiveModule('finance')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'finance'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <DollarSign className="h-4 w-4 text-sky-400" />
                  <span>Finance & Accounting</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveModule('hrm')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'hrm'
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="h-4 w-4 text-sky-400" />
                  <span>Human Resource (HRM)</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>

            {/* Menu Group 6: Master & Platform Core */}
            <div className="space-y-1">
              <div className="flex items-center justify-between px-3 mb-1.5">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">
                  6. Master Data & Platform Core
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">3 Modul</span>
              </div>

              <button
                onClick={() => setActiveModule('master-data')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'master-data'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Database className="h-4 w-4 text-indigo-400" />
                  <span>Master Data Enterprise</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveModule('platform')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'platform'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Globe2 className="h-4 w-4 text-indigo-400" />
                  <span>Commercial SaaS Platform</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>

              <button
                onClick={() => setActiveModule('release')}
                className={`sidebar-menu-item w-full p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                  activeModule === 'release'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/50'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Rocket className="h-4 w-4 text-indigo-400" />
                  <span>Production Release & QA</span>
                </div>
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-[11px]">
                <Smartphone className="h-3.5 w-3.5" />
                <span>Terintegrasi Lintas Modul</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Semua data panen, pabrik, keuangan, dan GPS tersinkronisasi secara real-time.
              </p>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {activeModule === 'executive' && <ExecutiveMainView />}
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

export default function App() {
  return (
    <EnterpriseDataProvider>
      <AppWorkspace />
    </EnterpriseDataProvider>
  );
}
