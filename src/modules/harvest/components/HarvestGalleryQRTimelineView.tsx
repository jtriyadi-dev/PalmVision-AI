import React, { useState } from 'react';
import {
  Image as ImageIcon,
  QrCode,
  Clock,
  CheckCircle2,
  Search,
  Scan,
  MapPin,
  ExternalLink,
} from 'lucide-react';

import {
  HarvestTimelineEvent,
  HarvestGalleryItem,
  QrBarcodeRegistryItem,
} from '../types';

interface HarvestGalleryQRTimelineViewProps {
  timeline: HarvestTimelineEvent[];
  gallery: HarvestGalleryItem[];
  qrCodes: QrBarcodeRegistryItem[];
}

export const HarvestGalleryQRTimelineView: React.FC<HarvestGalleryQRTimelineViewProps> = ({
  timeline,
  gallery,
  qrCodes,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'gallery' | 'qr'>('timeline');
  const [selectedTag, setSelectedTag] = useState('All');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Digital Audit Trail, Gallery & QR Framework
          </h2>
          <p className="text-xs text-slate-500">
            Jejak digital lengkap dari perencanaan hingga penimbangan PKS, galeri dokumentasi foto & tiket QR
          </p>
        </div>

        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Digital Timeline ({timeline.length})
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Harvest Gallery ({gallery.length})
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            QR & Barcode Tickets ({qrCodes.length})
          </button>
        </div>
      </div>

      {/* Timeline View */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            End-to-End Palm Oil Digital Traceability Lifecycle
          </h3>

          <div className="relative pl-6 border-l-2 border-emerald-500/40 space-y-6">
            {timeline.map((item, idx) => (
              <div key={item.id} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 ring-2 ring-emerald-500/20" />

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Tahap {idx + 1}: {item.stage}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{item.timestamp}</span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{item.details}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                    <span>Aktor/Petugas: {item.actorName}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Entitas: {item.blockOrEntity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery View */}
      {activeTab === 'gallery' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {gallery.map((g) => (
            <div
              key={g.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="relative h-44 rounded-xl overflow-hidden group">
                <img src={g.photoUrl} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] text-emerald-400 font-bold border border-slate-700">
                  {g.category}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{g.title}</h4>
                <p className="text-[10px] text-slate-500 font-mono">{g.date} {g.time} • {g.blockCode}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {g.tags.map((t) => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR & Barcode Registry View */}
      {activeTab === 'qr' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {qrCodes.map((q) => (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-center"
            >
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold inline-block">
                {q.codeType}
              </span>

              <div className="flex justify-center py-2">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <img src={q.qrDataUrl} alt="QR Code" className="w-28 h-28" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs font-black text-slate-900 dark:text-white">{q.codeValue}</div>
                <p className="text-[11px] text-slate-500">{q.associatedEntity}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Diterbitkan: {q.issuedAt}</span>
                <span className="font-bold text-emerald-600">{q.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
