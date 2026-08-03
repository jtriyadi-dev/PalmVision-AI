import React, { useState } from 'react';
import {
  X,
  Upload,
  Download,
  FileText,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  RefreshCw,
  Layers,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { GisImportExportLog } from '../types';

interface GisImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  logs: GisImportExportLog[];
  onAddLog: (log: GisImportExportLog) => void;
}

export const GisImportExportModal: React.FC<GisImportExportModalProps> = ({
  isOpen,
  onClose,
  logs,
  onAddLog,
}) => {
  const [activeTab, setActiveTab] = useState<'IMPORT' | 'EXPORT' | 'LOGS'>('IMPORT');
  const [selectedFormat, setSelectedFormat] = useState<'GeoJSON' | 'KML' | 'GPX' | 'Shapefile' | 'CSV'>('GeoJSON');
  const [isSimulating, setIsSimulating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSimulateImport = () => {
    setIsSimulating(true);
    setSuccessMsg('');

    setTimeout(() => {
      setIsSimulating(false);
      const newLog: GisImportExportLog = {
        id: `log-${Date.now()}`,
        filename: `teluk_dalam_estate_import_${Date.now()}.${selectedFormat.toLowerCase()}`,
        format: selectedFormat,
        recordCount: Math.floor(Math.random() * 30) + 10,
        importedBy: 'GIS Administrator',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'SUCCESS',
        notes: `Import ${selectedFormat} berhasil diproses. Seluruh koordinat WGS84 valid & terhubung.`,
      };
      onAddLog(newLog);
      setSuccessMsg(`Berhasil mengimpor ${newLog.recordCount} polygon & atribut dari file ${newLog.filename}!`);
    }, 1200);
  };

  const handleSimulateExport = (format: string) => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSuccessMsg(`File Peta Spatial PalmVision berhasil di-export sebagai format ${format}. Download otomatis dimulai.`);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-white space-y-0">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">
              <Upload className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Import & Export Data Spasial GIS</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Dukungan format standar industri: Shapefile (.shp/.zip), GeoJSON, KML, GPX, CSV
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Tab Controls */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-2 bg-slate-50/50 dark:bg-slate-800/30 text-xs font-bold">
          {[
            { id: 'IMPORT', label: 'Import Peta & Feature', icon: Upload },
            { id: 'EXPORT', label: 'Export Layer & Print PDF', icon: Download },
            { id: 'LOGS', label: 'Riwayat Log Import/Export', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSuccessMsg('');
                }}
                className={`px-4 py-3 border-b-2 font-bold flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto custom-scrollbar text-xs">
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'IMPORT' && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pilih Format File
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {(['Shapefile', 'GeoJSON', 'KML', 'GPX', 'CSV'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setSelectedFormat(fmt)}
                      className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                        selectedFormat === fmt
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Dropzone Box */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-800/20 hover:border-emerald-500 transition-colors cursor-pointer space-y-2">
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-12 h-12 mx-auto flex items-center justify-center">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 dark:text-white block text-sm">
                    Drag & Drop file {selectedFormat} di sini, atau klik untuk memilih
                  </span>
                  <span className="text-slate-400 text-xs block">
                    Mendukung proyeksi WGS84 (EPSG:4326) atau UTM Zone 47N/48N
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  Validasi Otomatis Sebelum Import:
                </span>
                <ul className="list-disc pl-4 space-y-0.5">
                  <li>Pemeriksaan validitas simpul polygon & overlapping boundary</li>
                  <li>Satu rentang koordinat geografis perkebunan Riau/Sumatra/Kalimantan</li>
                  <li>Auto-mapping atribut kode blok, varietas, dan luas hektar</li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleSimulateImport}
                  disabled={isSimulating}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 disabled:opacity-50"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Memproses Validation & Import...</span>
                    </>
                  ) : (
                    <>
                      <FileCheck className="h-4 w-4" />
                      <span>Proses Import {selectedFormat}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'EXPORT' && (
            <div className="space-y-4">
              <span className="font-bold text-slate-800 dark:text-white block">
                Pilih Format Output Export Peta & Data GIS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'GeoJSON Spatial Feature', desc: 'Sangat cocok untuk WebGIS & QGIS analysis', fmt: 'GeoJSON' },
                  { name: 'Google Earth KML / KMZ', desc: 'Lengkap dengan styling warna & tooltip info', fmt: 'KML' },
                  { name: 'Peta Cetak High-Res PDF', desc: 'Skala 1:10,000 lengkap dengan grid & legenda', fmt: 'PDF Map' },
                  { name: 'Gambar Peta PNG / JPEG', desc: 'Gambar resolusi tinggi untuk laporan eksekutif', fmt: 'PNG' },
                  { name: 'Tabular CSV Coordinate List', desc: 'Daftar koordinat simpul & atribut lengkap', fmt: 'CSV' },
                ].map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-emerald-500 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {exp.name}
                      </span>
                      <span className="text-slate-400 text-[11px] block">{exp.desc}</span>
                    </div>
                    <button
                      onClick={() => handleSimulateExport(exp.fmt)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'LOGS' && (
            <div className="space-y-3">
              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                      <th className="p-3">Nama File</th>
                      <th className="p-3">Format</th>
                      <th className="p-3">Jumlah Record</th>
                      <th className="p-3">Diimpor Oleh</th>
                      <th className="p-3">Waktu</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">
                          {log.filename}
                        </td>
                        <td className="p-3 font-semibold">{log.format}</td>
                        <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                          {log.recordCount} Features
                        </td>
                        <td className="p-3">{log.importedBy}</td>
                        <td className="p-3 font-mono text-slate-400">{log.timestamp}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
