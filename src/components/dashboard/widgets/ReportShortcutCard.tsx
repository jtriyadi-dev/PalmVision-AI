import React, { useState } from 'react';
import { FileText, Download, Printer, Share2, Check, Sparkles } from 'lucide-react';

export const ReportShortcutCard: React.FC = () => {
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const handleDownload = (format: string) => {
    setDownloadingFormat(format);
    setTimeout(() => {
      setDownloadingFormat(null);
    }, 1500);
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quick Export & Executive Reports</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Cetak resume data operasional & GIS snapshot</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {[
          { id: 'PDF', label: 'Cetak PDF Executive', icon: FileText, color: 'hover:bg-red-50 dark:hover:bg-red-950/40 hover:border-red-400' },
          { id: 'EXCEL', label: 'Export Data Excel', icon: Download, color: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:border-emerald-400' },
          { id: 'WORD', label: 'Laporan Word Doc', icon: Printer, color: 'hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-400' },
          { id: 'SNAPSHOT', label: 'GIS Snapshot Image', icon: Share2, color: 'hover:bg-violet-50 dark:hover:bg-violet-950/40 hover:border-violet-400' },
        ].map((rep) => {
          const Icon = rep.icon;
          const isLoading = downloadingFormat === rep.id;
          return (
            <button
              key={rep.id}
              onClick={() => handleDownload(rep.id)}
              disabled={isLoading}
              className={`p-3 rounded-xl border border-slate-200 dark:border-slate-800 ${rep.color} transition-all text-left flex flex-col justify-between space-y-2 group`}
            >
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-slate-600 dark:text-slate-300 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {rep.id}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {isLoading ? (
                  <span className="text-emerald-500 flex items-center gap-1">
                    <Check className="h-3.5 w-3.5 animate-spin" /> Generating...
                  </span>
                ) : (
                  rep.label
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
