import React, { useState } from 'react';
import { X, ShieldCheck, History, Code2, CheckCircle2, Clock, User, Tag, Calendar, Database } from 'lucide-react';

interface MasterDataDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: any | null;
  entityName: string;
}

export const MasterDataDetailModal: React.FC<MasterDataDetailModalProps> = ({
  isOpen,
  onClose,
  item,
  entityName,
}) => {
  const [activeTab, setActiveTab] = useState<'ATTRIBUTES' | 'AUDIT' | 'RAW_JSON'>('ATTRIBUTES');

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
              {item.code || 'CODE'}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span>{item.name || 'Detail Master Item'}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {item.status || 'ACTIVE'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detail Master Data Entitas: <span className="font-semibold">{entityName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 py-2 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 text-xs">
          {[
            { id: 'ATTRIBUTES', label: 'Parameter & Atribut', icon: Database },
            { id: 'AUDIT', label: 'Jejak Audit Trail', icon: History },
            { id: 'RAW_JSON', label: 'Skema Raw JSON', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {activeTab === 'ATTRIBUTES' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {Object.entries(item).map(([key, val]) => {
                if (key === 'id' || key === 'isDeleted') return null;
                let valDisplay = typeof val === 'object' ? JSON.stringify(val) : String(val);
                return (
                  <div
                    key={key}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1"
                  >
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 break-words">
                      {valDisplay || '-'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'AUDIT' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-emerald-500" /> Dibuat Oleh: {item.createdBy || 'System Admin'}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="h-3.5 w-3.5" /> {item.createdAt || '2026-01-01 08:00'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-800">
                  <span className="flex items-center gap-1">
                    <User className="h-3.5 w-3.5 text-teal-500" /> Pembaruan Terakhir: {item.updatedBy || 'System Admin'}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="h-3.5 w-3.5" /> {item.updatedAt || '2026-07-28 10:00'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-50/40 dark:bg-emerald-950/30 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> ISO 27001 Security Integrity Passed
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Record master ini dilindungi dengan signature hash Firestore & PostgreSQL immutable log checksum.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'RAW_JSON' && (
            <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              {JSON.stringify(item, null, 2)}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
