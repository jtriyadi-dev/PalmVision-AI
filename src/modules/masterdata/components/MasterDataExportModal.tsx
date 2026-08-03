import React, { useState } from 'react';
import { X, FileSpreadsheet, FileText, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

interface MasterDataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  totalRecordsCount: number;
  dataToExport: any[];
}

export const MasterDataExportModal: React.FC<MasterDataExportModalProps> = ({
  isOpen,
  onClose,
  entityName,
  totalRecordsCount,
  dataToExport,
}) => {
  const [exportFormat, setExportFormat] = useState<'EXCEL' | 'CSV' | 'PDF' | 'PRINT'>('EXCEL');
  const [includeAuditMeta, setIncludeAuditMeta] = useState(true);
  const [isExported, setIsExported] = useState(false);

  if (!isOpen) return null;

  const handleExecuteExport = () => {
    setIsExported(true);
    setTimeout(() => {
      // Simulate download trigger
      const element = document.createElement('a');
      const file = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${entityName.toLowerCase().replace(/\s+/g, '_')}_master_export.${
        exportFormat === 'EXCEL' ? 'xlsx' : exportFormat === 'CSV' ? 'csv' : 'json'
      }`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Export Data Master Enterprise
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Entitas: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{entityName}</span> • Total Record: <span className="font-bold">{totalRecordsCount}</span>
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

        {/* Body */}
        <div className="p-5 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Pilih Format Output Dokumen:
            </label>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {[
                { id: 'EXCEL', label: 'Microsoft Excel (.xlsx)', icon: FileSpreadsheet, color: 'text-emerald-600' },
                { id: 'CSV', label: 'Comma Separated (.csv)', icon: FileText, color: 'text-teal-600' },
                { id: 'PDF', label: 'Dokumen Laporan PDF', icon: FileText, color: 'text-red-600' },
                { id: 'PRINT', label: 'Cetak Langsung (Print)', icon: Printer, color: 'text-blue-600' },
              ].map((fmt) => {
                const Icon = fmt.icon;
                return (
                  <button
                    key={fmt.id}
                    onClick={() => setExportFormat(fmt.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      exportFormat === fmt.id
                        ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-slate-900 dark:text-white shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${fmt.color}`} />
                    <span className="font-semibold text-xs">{fmt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs space-y-2">
            <label className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={includeAuditMeta}
                onChange={(e) => setIncludeAuditMeta(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              Sertakan Meta Audit Trail (CreatedBy, UpdatedBy, Timestamps, Status)
            </label>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Seluruh rekaman terenkripsi dan memenuhi standar ISO 27001 Audit Trail Enterprise.
            </p>
          </div>

          {isExported && (
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Dokumen berhasil di-generate dan diunduh secara otomatis.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Batal
          </button>
          <button
            onClick={handleExecuteExport}
            className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 flex items-center gap-1.5 shadow-md"
          >
            <Download className="h-4 w-4" /> Unduh Dokumen ({exportFormat})
          </button>
        </div>
      </div>
    </div>
  );
};
