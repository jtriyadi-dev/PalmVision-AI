import React, { useState } from 'react';
import { X, Upload, FileSpreadsheet, CheckCircle2, AlertTriangle, Download, ArrowRight, RefreshCw, FileText } from 'lucide-react';

interface MasterDataImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  entityName: string;
  onImportSuccess: (importedRecords: any[]) => void;
}

export const MasterDataImportModal: React.FC<MasterDataImportModalProps> = ({
  isOpen,
  onClose,
  entityName,
  onImportSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<'SELECT' | 'PREVIEW' | 'RESULT'>('SELECT');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const mockParsedData = [
    { code: `${entityName.toUpperCase().slice(0, 3)}-IMP-01`, name: `Sample ${entityName} 1`, status: 'ACTIVE', validation: 'VALID' },
    { code: `${entityName.toUpperCase().slice(0, 3)}-IMP-02`, name: `Sample ${entityName} 2`, status: 'ACTIVE', validation: 'VALID' },
    { code: `${entityName.toUpperCase().slice(0, 3)}-IMP-03`, name: `Sample ${entityName} 3`, status: 'INACTIVE', validation: 'WARNING: Duplikat Nama' },
  ];

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setStep('PREVIEW');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStep('PREVIEW');
    }
  };

  const handleExecuteImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep('RESULT');
      const newItems = mockParsedData.map((d, i) => ({
        id: `imp-${Date.now()}-${i}`,
        code: d.code,
        name: d.name,
        status: d.status,
        createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        createdBy: 'Excel Import User',
        updatedBy: 'Excel Import User',
      }));
      onImportSuccess(newItems);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Import Data Master Excel / CSV
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Format Entitas Target: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{entityName}</span>
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

        {/* Modal Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {step === 'SELECT' && (
            <div className="space-y-4">
              {/* Template Download Box */}
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/30 flex items-center justify-between text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    Unduh Format Template Standard Excel
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Gunakan file template resmi untuk menghindari kesalahan skema kolom data.
                  </p>
                </div>
                <button
                  onClick={() => alert(`Mengunduh Template Excel untuk ${entityName}...`)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shrink-0 flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" /> Download Template
                </button>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center space-y-3 hover:border-emerald-500 transition-colors bg-slate-50/50 dark:bg-slate-800/30"
              >
                <Upload className="h-10 w-10 text-emerald-500 mx-auto animate-bounce" />
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Tarik dan lepaskan file Excel (.xlsx) atau .CSV di sini
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Maksimal ukuran file: 15 MB • Ukuran batch disarankan max 5.000 baris
                  </p>
                </div>
                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                  <FileText className="h-4 w-4" /> Pilih File Dari Perangkat
                  <input
                    type="file"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 'PREVIEW' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Pratinjau Hasil Parser: {file?.name} (3 Baris Terdeteksi)
                </span>
                <button
                  onClick={() => setStep('SELECT')}
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Ganti File
                </button>
              </div>

              <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="p-2.5">Kode</th>
                      <th className="p-2.5">Nama Entitas</th>
                      <th className="p-2.5">Status</th>
                      <th className="p-2.5">Hasil Validasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {mockParsedData.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="p-2.5 font-mono font-bold">{row.code}</td>
                        <td className="p-2.5">{row.name}</td>
                        <td className="p-2.5">{row.status}</td>
                        <td className="p-2.5">
                          {row.validation.includes('VALID') ? (
                            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                              <CheckCircle2 className="h-3.5 w-3.5" /> Siap Import
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-500 font-bold">
                              <AlertTriangle className="h-3.5 w-3.5" /> Peringatan Skema
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === 'RESULT' && (
            <div className="p-6 text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Import Data Berhasil Disimpan!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                3 Data baru <span className="font-bold text-slate-700 dark:text-slate-300">{entityName}</span> telah berhasil dimasukkan ke dalam basis data Master Data Enterprise.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            {step === 'RESULT' ? 'Tutup' : 'Batal'}
          </button>

          {step === 'PREVIEW' && (
            <button
              onClick={handleExecuteImport}
              disabled={isProcessing}
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Memproses Import...
                </>
              ) : (
                <>
                  Eksekusi Import Data <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
