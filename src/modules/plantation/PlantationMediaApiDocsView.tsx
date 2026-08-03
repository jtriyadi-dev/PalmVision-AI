import React, { useState } from 'react';
import {
  Camera,
  FileText,
  Upload,
  Download,
  Code,
  Database,
  Filter,
  CheckCircle2,
  MapPin,
  Calendar,
  X,
  FileSpreadsheet,
  Layers,
  Sparkles,
  Printer,
  Trash2,
  RefreshCw,
  Archive,
} from 'lucide-react';
import {
  PlantPhotoRecord,
  PlantDocumentRecord,
} from '../types';
import { PLANTATION_REST_API_DOCS, PLANTATION_DB_SCHEMA_DOCS } from '../mockData';

interface PlantationMediaApiDocsViewProps {
  photos: PlantPhotoRecord[];
  documents: PlantDocumentRecord[];
  activeSubTab: string;
}

export const PlantationMediaApiDocsView: React.FC<PlantationMediaApiDocsViewProps> = ({
  photos,
  documents,
  activeSubTab,
}) => {
  const [subTab, setSubTab] = useState<'photos' | 'docs' | 'api-db' | 'import-export'>(
    activeSubTab === 'agronomy-notes'
      ? 'photos'
      : activeSubTab === 'docs-photos-api'
      ? 'api-db'
      : 'photos'
  );

  const [selectedPhotoCategory, setSelectedPhotoCategory] = useState<string>('ALL');
  const [showImportModal, setShowImportModal] = useState(false);
  const [bulkSelectedIds, setBulkSelectedIds] = useState<string[]>([]);

  const filteredPhotos = photos.filter((p) => {
    return selectedPhotoCategory === 'ALL' || p.category === selectedPhotoCategory;
  });

  const toggleBulkSelect = (id: string) => {
    if (bulkSelectedIds.includes(id)) {
      setBulkSelectedIds(bulkSelectedIds.filter((item) => item !== id));
    } else {
      setBulkSelectedIds([...bulkSelectedIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSubTab('photos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'photos'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Galeri Foto Kebun ({photos.length})
          </button>
          <button
            onClick={() => setSubTab('docs')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'docs'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Manajemen Dokumen ({documents.length})
          </button>
          <button
            onClick={() => setSubTab('import-export')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'import-export'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Bulk Action & Import / Export
          </button>
          <button
            onClick={() => setSubTab('api-db')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'api-db'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            REST API & Database Schema
          </button>
        </div>
      </div>

      {/* SUB TAB 1: PHOTO GALLERY */}
      {subTab === 'photos' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1">Kategori Foto:</span>
              {['ALL', 'Kebun', 'Akar', 'Batang', 'Pelepah', 'Buah TBS', 'Hama & Penyakit'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedPhotoCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedPhotoCategory === cat
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? 'Semua Foto' : cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => alert('Simulasi Upload Multi-Foto Lapangan Berhasil')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Multi-Foto</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="relative overflow-hidden rounded-xl group">
                  <img
                    src={photo.fileUrl}
                    alt={photo.caption}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold">
                    {photo.category}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                  {photo.caption}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-emerald-500" />
                    GPS: {photo.lat}, {photo.lng}
                  </span>
                  <span>{photo.uploadDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB TAB 2: DOCUMENT MANAGEMENT */}
      {subTab === 'docs' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => alert('Simulasi Upload Dokumen PDF/Excel Berhasil')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Dokumen Baru</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Kode & Judul Dokumen</th>
                  <th className="px-4 py-3 font-bold">Kategori</th>
                  <th className="px-4 py-3 font-bold">Tipe File & Ukuran</th>
                  <th className="px-4 py-3 font-bold">Tanggal & Pengunggah</th>
                  <th className="px-4 py-3 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      <div>{doc.title}</div>
                      <span className="text-[10px] text-slate-400 font-normal">{doc.docCode}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                        {doc.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      {doc.fileType} ({doc.fileSizeMb} MB)
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="block font-semibold">{doc.uploadedBy}</span>
                      <span className="text-[10px] text-slate-400">{doc.uploadDate}</span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors inline-flex items-center gap-1"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB TAB 3: BULK ACTION & IMPORT/EXPORT */}
      {subTab === 'import-export' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Bulk Operations & Import/Export Center
            </h3>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400">Bulk Actions:</span>
              <button
                onClick={() => alert('Bulk Update Berhasil Diterapkan')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Bulk Update Status
              </button>
              <button
                onClick={() => alert('Bulk Export Data CSV / Excel Berhasil')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                Export Excel / CSV
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Printer className="h-3.5 w-3.5" /> Print PDF Report
              </button>
              <button
                onClick={() => setShowImportModal(true)}
                className="px-3 py-1.5 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-500 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Upload className="h-3.5 w-3.5" /> Bulk Import Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 4: REST API & DB SCHEMA */}
      {subTab === 'api-db' && (
        <div className="space-y-6">
          {/* REST API SECTION */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Code className="h-5 w-5 text-emerald-600" />
              REST API Endpoints Specification (Prompt 6)
            </h3>

            <div className="space-y-2">
              {PLANTATION_REST_API_DOCS.map((api, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-black ${
                        api.method === 'GET'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                      }`}
                    >
                      {api.method}
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{api.path}</span>
                  </div>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">{api.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DB SCHEMA SECTION */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Database className="h-5 w-5 text-teal-600" />
              Database Relational Blueprint (PostgreSQL / Drizzle Schema)
            </h3>

            <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800">
              {PLANTATION_DB_SCHEMA_DOCS}
            </pre>
          </div>
        </div>
      )}

      {/* Import Template Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Bulk Import Template Sensus Pohon
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Unggah file Excel/CSV sesuai template standar untuk memperbarui ribuan record sensus pohon secara otomatis.
            </p>

            <div className="border-2 border-dashed border-emerald-500/40 rounded-xl p-8 text-center space-y-2 bg-emerald-50/50 dark:bg-emerald-950/20">
              <Upload className="h-8 w-8 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Drag & Drop file Excel/CSV disini
              </p>
              <p className="text-[10px] text-slate-400">Atau klik untuk memilih file dari komputer</p>
            </div>

            <div className="flex justify-between items-center text-xs">
              <button
                onClick={() => alert('Download Template Excel (.xlsx) Berhasil')}
                className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Unduh Template Blank (.xlsx)
              </button>
              <button
                onClick={() => {
                  alert('Bulk Import Sensus Pohon Berhasil Diperbarui ke System!');
                  setShowImportModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                Proses Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
