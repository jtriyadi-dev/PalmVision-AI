import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  HardDrive,
  RefreshCw,
  CheckCircle2,
  Database,
  Smartphone,
  Layers,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { mockPwaStatus } from '../mockData';

export const PwaOfflineSyncView: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [pwaState, setPwaState] = useState(mockPwaStatus);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setPwaState(prev => ({
        ...prev,
        pendingSyncQueueCount: 0,
        lastSyncedTimestamp: 'Just now'
      }));
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
              Progressive Web App & Offline First Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">PWA Service Worker & Field Offline Sync Queue</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Designed for remote oil palm estates with zero cellular coverage. Mandor harvests and weighbridge scale tickets cache locally in IndexedDB and sync automatically when connected.
          </p>
        </div>

        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg ${
            isOnline ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-amber-600 hover:bg-amber-500 text-white'
          }`}
        >
          {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
          <span>{isOnline ? 'Network Online (Simulate Offline)' : 'Network Offline (Simulate Online)'}</span>
        </button>
      </div>

      {/* PWA Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>PWA Installation Status</span>
            <Smartphone className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <span className="text-lg font-bold text-white">Installed & Active</span>
          </div>
          <p className="text-[11px] text-slate-400">Standalone App Manifest registered with push notification support.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>IndexedDB Offline Storage</span>
            <HardDrive className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">{pwaState.offlineStorageUsedMb} MB</span>
            <span className="text-xs text-slate-400">used of 500 MB</span>
          </div>
          <p className="text-[11px] text-slate-400">Caches offline GIS tiles, harvest logs, and employee lists.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pending Offline Sync Queue</span>
            <Database className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{pwaState.pendingSyncQueueCount} Records</span>
            <button
              onClick={handleSimulateSync}
              disabled={isSyncing || pwaState.pendingSyncQueueCount === 0 || !isOnline}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-40"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Sync Queue</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">Last Synced: {pwaState.lastSyncedTimestamp}</p>
        </div>
      </div>

      {/* Offline Sync Log List */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-white">IndexedDB Offline Sync Queue Buffer</h3>

        <div className="space-y-3">
          {pwaState.pendingSyncQueueCount > 0 ? (
            <>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                    QUEUED
                  </span>
                  <div>
                    <h4 className="font-bold text-white">FFB Weighbridge Scale Ticket #WB-2026-0803-089</h4>
                    <p className="text-[11px] text-slate-400">Captured offline at Mill Scale #02 (12,450 kg Net)</p>
                  </div>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">10 mins ago</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                    QUEUED
                  </span>
                  <div>
                    <h4 className="font-bold text-white">Mandor Daily Harvest Log (Block C12 - 450 Bunches)</h4>
                    <p className="text-[11px] text-slate-400">Recorded by Mandor Budi Setiawan (Division 2)</p>
                  </div>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">24 mins ago</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                    QUEUED
                  </span>
                  <div>
                    <h4 className="font-bold text-white">Field Pest Inspection Inspection Log (Ganoderma Alert)</h4>
                    <p className="text-[11px] text-slate-400">Photo attached with GPS coordinates (-0.9481, 101.4283)</p>
                  </div>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">42 mins ago</span>
              </div>
            </>
          ) : (
            <div className="p-8 text-center bg-slate-800/40 rounded-xl border border-slate-800 space-y-2">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Offline Sync Queue Clean</h4>
              <p className="text-xs text-slate-400">All offline field records have been successfully synchronized with the central cloud database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
