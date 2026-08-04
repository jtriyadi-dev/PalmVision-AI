import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  Bell,
  Search,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Scale,
  DollarSign,
  Activity,
  Layers,
  X,
  ArrowRight,
  Database,
  MapPin,
  Trees,
  Boxes,
  Wrench,
  Users,
  Brain,
  Radio,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { useEnterpriseData, LiveEvent } from '../context/EnterpriseDataContext';

export const RealtimeLiveHeaderBar: React.FC = () => {
  const {
    activeModule,
    navigateToModule,
    isRealtimeActive,
    setIsRealtimeActive,
    liveStats,
    liveEvents,
    latestToast,
    dismissToast
  } = useEnterpriseData();

  const [showEventsDrawer, setShowEventsDrawer] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');

  const modulesList = [
    { key: 'platform', label: 'Commercial SaaS', icon: Globe2, category: 'Core Platform' },
    { key: 'master-data', label: 'Master Data Enterprise', icon: Database, category: 'Core Platform' },
    { key: 'smart-plantation', label: 'Smart Plantation IoT', icon: Radio, category: 'Operations' },
    { key: 'gis', label: 'GIS & Digital Map', icon: MapPin, category: 'Operations' },
    { key: 'harvest', label: 'Harvest Management', icon: TrendingUp, category: 'Operations' },
    { key: 'field-operations', label: 'Field Operations', icon: Activity, category: 'Operations' },
    { key: 'plantation', label: 'Plantation Lifecycle', icon: Trees, category: 'Operations' },
    { key: 'eam', label: 'Asset & Fleet (EAM)', icon: Wrench, category: 'Supply & Asset' },
    { key: 'inventory', label: 'Inventory & Supply Chain', icon: Boxes, category: 'Supply & Asset' },
    { key: 'finance', label: 'Finance & Sales CPO', icon: DollarSign, category: 'Corporate' },
    { key: 'hrm', label: 'Human Resource (HRM)', icon: Users, category: 'Corporate' },
    { key: 'ai-center', label: 'AI Center Enterprise', icon: Brain, category: 'Analytics' },
  ];

  const filteredSearchModules = quickSearch.trim()
    ? modulesList.filter(m => m.label.toLowerCase().includes(quickSearch.toLowerCase()))
    : [];

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 relative z-30 text-xs">
      {/* Left: Real-Time Sync Status Indicator & Live Metrics */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800">
          <span className="relative flex h-2.5 w-2.5">
            {isRealtimeActive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isRealtimeActive ? 'bg-emerald-500' : 'bg-slate-600'}`} />
          </span>
          <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
            {isRealtimeActive ? 'LIVE SYNC • 50ms' : 'PAUSED'}
          </span>

          <button
            onClick={() => setIsRealtimeActive(!isRealtimeActive)}
            title="Toggle Simulasi Real-Time Sync"
            className="ml-1 text-[10px] font-bold text-slate-400 hover:text-emerald-400 underline cursor-pointer"
          >
            {isRealtimeActive ? 'Jeda' : 'Aktifkan'}
          </button>
        </div>

        {/* Live Metrics Quick Ticker */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Panen Hari Ini:</span>
            <strong className="text-emerald-400 font-bold">{liveStats.totalHarvestTodayTon.toLocaleString('id-ID')} Ton</strong>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">PKS Rate:</span>
            <strong className="text-teal-400 font-bold">{liveStats.millProcessingRateTonHr} T/Jam</strong>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Avg OER:</span>
            <strong className="text-amber-400 font-bold">{liveStats.avgOerPercentage}%</strong>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">CPO Market:</span>
            <strong className="text-sky-400 font-bold">Rp {liveStats.cpoPriceIdrKg.toLocaleString('id-ID')}/Kg</strong>
          </div>
        </div>
      </div>

      {/* Right: Quick Cross-Module Jump Bar & Real-time Live Stream Drawer Button */}
      <div className="flex items-center gap-3">
        {/* Quick Module Jump Input */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Lompat Cepat ke Fitur / Modul..."
            value={quickSearch}
            onChange={e => setQuickSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-white focus:outline-none focus:border-indigo-500"
          />

          {/* Quick Jump Search Dropdown */}
          {filteredSearchModules.length > 0 && (
            <div className="absolute top-full right-0 mt-1 w-72 bg-slate-900 border border-indigo-500/40 rounded-xl shadow-2xl p-2 z-50 space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block px-2 py-1">
                Navigasi Lintas Fitur Instant:
              </span>
              {filteredSearchModules.map(m => {
                const IconComp = m.icon;
                return (
                  <button
                    key={m.key}
                    onClick={() => {
                      navigateToModule(m.key);
                      setQuickSearch('');
                    }}
                    className="w-full p-2 rounded-lg hover:bg-indigo-950 hover:text-white text-slate-300 flex items-center justify-between text-left text-xs transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <IconComp className="h-3.5 w-3.5 text-indigo-400" />
                      <span className="font-semibold">{m.label}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Realtime Live Events Drawer Trigger Button */}
        <div className="relative">
          <button
            onClick={() => setShowEventsDrawer(!showEventsDrawer)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-[11px] transition flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Bell className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span className="hidden sm:inline">Live Stream Feed</span>
            <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[9px] font-extrabold rounded-full">
              {liveEvents.length}
            </span>
          </button>

          {/* Real-time Events Stream Popover Drawer */}
          {showEventsDrawer && (
            <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-400 animate-spin" />
                  <span className="font-extrabold text-white text-xs">Aktivitas Lintas Fitur Real-Time</span>
                </div>
                <button
                  onClick={() => setShowEventsDrawer(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
                {liveEvents.map(evt => (
                  <div
                    key={evt.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-mono font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                        {evt.moduleLabel}
                      </span>
                      <span className="font-mono text-slate-500">{evt.timestamp}</span>
                    </div>

                    <h5 className="font-bold text-white text-xs leading-tight">{evt.title}</h5>
                    <p className="text-[11px] text-slate-300 leading-normal">{evt.detail}</p>

                    {evt.actionLink && (
                      <button
                        onClick={() => {
                          navigateToModule(evt.actionLink!.module, evt.actionLink!.payload);
                          setShowEventsDrawer(false);
                        }}
                        className="mt-1 text-[10px] font-extrabold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 underline cursor-pointer"
                      >
                        <span>{evt.actionLink.label}</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Real-time Toast Banner Popup (if latestToast exists) */}
      {latestToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm bg-slate-900 border border-emerald-500/50 rounded-2xl p-4 shadow-2xl space-y-2 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                {latestToast.moduleLabel} • Live Event
              </span>
            </div>
            <button onClick={dismissToast} className="text-slate-400 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <h5 className="text-xs font-bold text-white leading-snug">{latestToast.title}</h5>
          <p className="text-[11px] text-slate-300 leading-snug">{latestToast.detail}</p>

          {latestToast.actionLink && (
            <button
              onClick={() => {
                navigateToModule(latestToast.actionLink!.module, latestToast.actionLink!.payload);
                dismissToast();
              }}
              className="mt-1 w-full py-1.5 px-3 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>{latestToast.actionLink.label}</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
