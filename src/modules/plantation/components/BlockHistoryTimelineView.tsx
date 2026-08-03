import React, { useState } from 'react';
import {
  Clock,
  FileText,
  Calendar,
  User,
  Sparkles,
  Map,
  Filter,
  Search,
  CheckCircle2,
  AlertTriangle,
  Droplets,
  Trees,
  ClipboardCheck,
} from 'lucide-react';
import { BlockHistoryRecord, PlantTimelineEvent } from '../types';

interface BlockHistoryTimelineViewProps {
  blockHistories: BlockHistoryRecord[];
  timelineEvents: PlantTimelineEvent[];
  activeSubTab: string;
}

export const BlockHistoryTimelineView: React.FC<BlockHistoryTimelineViewProps> = ({
  blockHistories,
  timelineEvents,
  activeSubTab,
}) => {
  const [subTab, setSubTab] = useState<'history' | 'timeline'>(
    activeSubTab === 'timeline' ? 'timeline' : 'history'
  );

  const [selectedBlock, setSelectedBlock] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistories = blockHistories.filter((bh) => {
    const matchesBlock = selectedBlock === 'ALL' || bh.blockCode === selectedBlock;
    const matchesSearch =
      bh.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bh.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bh.blockCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBlock && matchesSearch;
  });

  const filteredTimeline = timelineEvents.filter((ev) => {
    const matchesBlock = selectedBlock === 'ALL' || ev.blockCode === selectedBlock;
    const matchesSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBlock && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Tab bar & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'history'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Buku Tanah & Riwayat Blok ({blockHistories.length})
          </button>
          <button
            onClick={() => setSubTab('timeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'timeline'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Kronologis Timeline Aktivitas ({timelineEvents.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedBlock}
            onChange={(e) => setSelectedBlock(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
          >
            <option value="ALL">Semua Blok Kebun</option>
            <option value="BLK-A01">Blok A01</option>
            <option value="BLK-A02">Blok A02</option>
            <option value="BLK-A05">Blok A05</option>
            <option value="BLK-B02">Blok B02</option>
          </select>

          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari aktivitas/judul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* SUB TAB 1: BLOCK HISTORY / LAND LEDGER */}
      {subTab === 'history' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">
              Land Ledger (Buku Tanah Perkebunan): Audit trail lengkap dari pembukaan lahan hingga peremajaan.
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
              GIS & AI Integrated
            </span>
          </div>

          <div className="space-y-3">
            {filteredHistories.map((bh) => (
              <div
                key={bh.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold text-[11px]">
                      {bh.blockCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px]">
                      {bh.eventType}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{bh.eventDate}</span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-base">{bh.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{bh.description}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Pelaku / Penanggung Jawab: {bh.actorUser} ({bh.actorRole})</span>
                  {bh.costIdr && (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      Biaya: Rp {bh.costIdr.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: CHRONOLOGICAL TIMELINE */}
      {subTab === 'timeline' && (
        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
          {filteredTimeline.map((ev) => (
            <div key={ev.id} className="relative group">
              {/* Node Indicator */}
              <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-emerald-600 border-4 border-white dark:border-slate-900 shadow-sm" />

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-emerald-500/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px]">
                      {ev.blockCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-[10px]">
                      {ev.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(ev.timestamp).toLocaleString('id-ID')}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ev.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">{ev.description}</p>
                <div className="text-[11px] text-slate-400">Eksekutor: {ev.executor}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
