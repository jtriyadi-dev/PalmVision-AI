import React, { useState } from 'react';
import {
  X,
  Activity,
  Layers,
  Ruler,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Play,
  Trees,
} from 'lucide-react';
import { SpatialAnalysisResult } from '../types';

interface GisSpatialAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analyses: SpatialAnalysisResult[];
  onRunAnalysis: (newAnalysis: SpatialAnalysisResult) => void;
}

export const GisSpatialAnalysisModal: React.FC<GisSpatialAnalysisModalProps> = ({
  isOpen,
  onClose,
  analyses,
  onRunAnalysis,
}) => {
  const [selectedTool, setSelectedTool] = useState<'BUFFER' | 'OVERLAY' | 'ELEVATION' | 'AI_NDVI'>('BUFFER');
  const [bufferDistance, setBufferDistance] = useState<number>(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleExecute = () => {
    setIsProcessing(true);
    setSuccessMsg('');

    setTimeout(() => {
      setIsProcessing(false);
      let title = '';
      let desc = '';
      let rec = '';
      let type: SpatialAnalysisResult['type'] = 'BUFFER_ZONE';

      if (selectedTool === 'BUFFER') {
        type = 'BUFFER_ZONE';
        title = `Analisis Zonasi Buffer Ring ${bufferDistance} Meter Sempadan River/Kanal`;
        desc = `Hasil perhitungan spatial buffer memperlihatkan 6.4 Hektar area perkebunan berada di dalam radius konservasi ${bufferDistance}m.`;
        rec = 'Direkomendasikan pengayaan vegetasi penutup tanah & penghentian pemupukan anorganik di zonasi ini.';
      } else if (selectedTool === 'OVERLAY') {
        type = 'OVERLAY_INTERSECT';
        title = 'Analisis Overlay Tumpang Tjhug HGU & Batas Desa Sekitar';
        desc = 'Tebal perbatasan HGU sempurna 100% klop tanpa tumpang tindih lahan klaim warga.';
        rec = 'Pertahankan sertifikasi RSPO / ISPO audit kesesuaian lahan.';
      } else if (selectedTool === 'AI_NDVI') {
        type = 'AI_CANOPY_HEALTH';
        title = 'Analisis AI Multi-Spectral Index NDVI & Canopy Stress';
        desc = 'Pemetaan AI menemukan 14.2 Hektar pada Blok B13 mengalami indikasi defisit unsur hara N & K.';
        rec = 'Jadwalkan pemupukan rekomendasi tim agronomis R&D dalam 14 hari ke depan.';
      } else {
        type = 'ELEVATION_SLOPE';
        title = 'Analisis Kontur Elevasi & Kemiringan Lereng Lahan';
        desc = 'Lahan terklasifikasi 82% Datar (0-3%), 15% Bergelombang (3-8%), dan 3% Curam (>15%).';
        rec = 'Pembuatan teras bersambung (contour terrace) untuk 3% area curam guna mencegah erosi tanah.';
      }

      const newRes: SpatialAnalysisResult = {
        id: `spatial-${Date.now()}`,
        title,
        type,
        affectedBlockCodes: ['B12', 'B13', 'C04'],
        calculatedAreaHa: Number((Math.random() * 10 + 4).toFixed(1)),
        insightSummary: desc,
        recommendationAction: rec,
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      };

      onRunAnalysis(newRes);
      setSuccessMsg(`Analisis Spasial "${title}" Selesai Di-generate!`);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-white space-y-0">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Framework Spatial Analysis GIS</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lakukan kalkulasi Buffer, Overlay, Elevation Slope, & AI Multispectral Canopy Health
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

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto custom-scrollbar text-xs">
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Select Tool */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
              Pilih Algoritma Analisis Spasial
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'BUFFER', label: 'Buffer Zone', icon: Ruler },
                { id: 'OVERLAY', label: 'Overlay Intersect', icon: Layers },
                { id: 'ELEVATION', label: 'Elevation Slope', icon: Compass },
                { id: 'AI_NDVI', label: 'AI Canopy Health', icon: Sparkles },
              ].map((t) => {
                const Icon = t.icon;
                const isSelected = selectedTool === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTool(t.id as any)}
                    className={`p-3 rounded-xl border text-left font-bold transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedTool === 'BUFFER' && (
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <label className="block font-bold text-slate-800 dark:text-white">
                Jarak Radius Buffer (Meter):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={bufferDistance}
                  onChange={(e) => setBufferDistance(Number(e.target.value))}
                  className="w-full accent-purple-600"
                />
                <span className="font-mono font-bold text-sm text-purple-600 dark:text-purple-400 w-16">
                  {bufferDistance} m
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleExecute}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md shadow-purple-600/20 flex items-center gap-2 disabled:opacity-50"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Jalankan Analisis Spasial</span>
            </button>
          </div>

          {/* Historical Results */}
          <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Hasil Analisis Spasial Terakhir
            </h4>
            <div className="space-y-2">
              {analyses.map((res) => (
                <div
                  key={res.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-xs">
                      {res.title}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">{res.createdAt}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">{res.insightSummary}</p>
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-[11px] font-medium text-purple-800 dark:text-purple-300">
                    <strong>Rekomendasi Tindakan:</strong> {res.recommendationAction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
