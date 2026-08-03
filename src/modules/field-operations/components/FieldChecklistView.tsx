import React, { useState } from 'react';
import { CheckSquare, ShieldCheck, Camera, MapPin, Plus, Search, CheckCircle2, XCircle } from 'lucide-react';
import { FieldChecklistItem } from '../types';

interface FieldChecklistViewProps {
  checklists: FieldChecklistItem[];
  onAddChecklist: (chk: FieldChecklistItem) => void;
}

export const FieldChecklistView: React.FC<FieldChecklistViewProps> = ({
  checklists,
  onAddChecklist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredChecklists = checklists.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.inspectorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.blockCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari checklist / inspektur / blok..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <button
          onClick={() => alert('Form Checklist Digital Baru')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Buat Checklist Baru</span>
        </button>
      </div>

      {/* Checklist Cards */}
      <div className="space-y-4">
        {filteredChecklists.map((chk) => (
          <div
            key={chk.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-extrabold">
                    {chk.checklistCode}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                    {chk.category}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                  {chk.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Inspektur: {chk.inspectorName} ({chk.inspectorRole}) • Tanggal: {chk.date}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                {chk.status}
              </span>
            </div>

            {/* Checklist Items list */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pemeriksaan Item Checklist:</span>
              {chk.itemsChecked.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-700/50 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    {item.isPassed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                    )}
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{item.question}</span>
                  </div>
                  <span className="text-[11px] text-slate-500 italic">{item.remark}</span>
                </div>
              ))}
            </div>

            {/* Signature & GPS footer */}
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                GPS Tag: {chk.lat}, {chk.lng} ({chk.blockCode})
              </span>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                ✍️ Terverifikasi Tanda Tangan Digital
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
