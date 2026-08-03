import React from 'react';
import { Plus, Scale, Calendar, UserPlus, Truck, PackagePlus, Sparkles, FileText, ArrowRight, Layers } from 'lucide-react';
import { QuickActionItem } from '../../../types';

interface QuickActionGridProps {
  onSelectAction: (targetModuleId: string) => void;
  onOpenAiAssistant?: () => void;
}

const QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: 'act-1',
    title: 'Input Hasil Panen TBS',
    description: 'Catat tonase panen, BKM & BTP per afdeling',
    category: 'HARVEST',
    iconName: 'Scale',
    shortcut: 'Alt + P',
    color: 'bg-emerald-500',
    targetModuleId: 'dashboard',
  },
  {
    id: 'act-2',
    title: 'Input Aktivitas Perkebunan',
    description: 'Catat pemupukan, semprot, pruning & kualifikasi',
    category: 'DATA',
    iconName: 'Calendar',
    shortcut: 'Alt + A',
    color: 'bg-blue-500',
    targetModuleId: 'dashboard',
  },
  {
    id: 'act-3',
    title: 'Tambah Karyawan Baru',
    description: 'Registrasi data pekerja, BSU & device fingerprint',
    category: 'EMPLOYEE',
    iconName: 'UserPlus',
    shortcut: 'Alt + K',
    color: 'bg-violet-500',
    targetModuleId: 'user-management',
  },
  {
    id: 'act-4',
    title: 'Input Stok & Gudang',
    description: 'Catat penerimaan pupuk, BBM & sparepart',
    category: 'ASSET',
    iconName: 'PackagePlus',
    shortcut: 'Alt + G',
    color: 'bg-amber-500',
    targetModuleId: 'dashboard',
  },
  {
    id: 'act-5',
    title: 'Konsultasi Asisten AI',
    description: 'Analisis diagnosa hama, nutrisi & proyeksi yield',
    category: 'AI',
    iconName: 'Sparkles',
    shortcut: 'Ctrl + AI',
    color: 'bg-teal-500',
    targetModuleId: 'ai-center',
  },
  {
    id: 'act-6',
    title: 'Generate Laporan Executive',
    description: 'Cetak resume RKAP, finansial & GIS snapshot',
    category: 'REPORT',
    iconName: 'FileText',
    shortcut: 'Alt + R',
    color: 'bg-rose-500',
    targetModuleId: 'audit-trail',
  },
];

export const QuickActionGrid: React.FC<QuickActionGridProps> = ({ onSelectAction, onOpenAiAssistant }) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-emerald-500" /> Aksi Cepat Executive & Operasional
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Akses langsung fungsi utama perkebunan dengan pintasan keyboard
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {QUICK_ACTIONS.map((act) => (
          <button
            key={act.id}
            onClick={() => {
              if (act.category === 'AI' && onOpenAiAssistant) {
                onOpenAiAssistant();
              } else {
                onSelectAction(act.targetModuleId);
              }
            }}
            className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/50 bg-slate-50/50 dark:bg-slate-800/30 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 text-left transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className={`p-2.5 rounded-xl ${act.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                {act.category === 'HARVEST' && <Scale className="h-4 w-4" />}
                {act.category === 'DATA' && <Calendar className="h-4 w-4" />}
                {act.category === 'EMPLOYEE' && <UserPlus className="h-4 w-4" />}
                {act.category === 'ASSET' && <PackagePlus className="h-4 w-4" />}
                {act.category === 'AI' && <Sparkles className="h-4 w-4" />}
                {act.category === 'REPORT' && <FileText className="h-4 w-4" />}
              </div>
              {act.shortcut && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
                  {act.shortcut}
                </span>
              )}
            </div>

            <div className="mt-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                {act.title}
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-500" />
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {act.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
