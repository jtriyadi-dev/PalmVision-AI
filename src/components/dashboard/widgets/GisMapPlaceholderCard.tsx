import React, { useState } from 'react';
import { Map, Layers, Eye, Compass, Maximize2, Sparkles, Filter, Navigation2, CheckCircle2 } from 'lucide-react';

export const GisMapPlaceholderCard: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'HARVEST' | 'NUTRIENT' | 'DRONE' | 'ELEVATION'>('HARVEST');
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  const BLOCKS = [
    { id: 'blk-b12', code: 'Blok B12', yieldTon: 24.8, status: 'HIGH_YIELD', ha: 42, color: 'bg-emerald-500' },
    { id: 'blk-a05', code: 'Blok A05', yieldTon: 22.1, status: 'NORMAL', ha: 38, color: 'bg-green-500' },
    { id: 'blk-c09', code: 'Blok C09', yieldTon: 18.5, status: 'DEFICIT_NPK', ha: 28, color: 'bg-amber-500' },
    { id: 'blk-d02', code: 'Blok D02', yieldTon: 14.2, status: 'REPLANTING', ha: 35, color: 'bg-blue-500' },
    { id: 'blk-e14', code: 'Blok E14', yieldTon: 26.4, status: 'HIGH_YIELD', ha: 45, color: 'bg-emerald-600' },
    { id: 'blk-f08', code: 'Blok F08', yieldTon: 19.8, status: 'NORMAL', ha: 40, color: 'bg-green-600' },
  ];

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Map className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">GIS Spatial Estate Map & Drone Telemetry</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Visualisasi Peta Digital Estate Teluk Dalam (12.500 Ha)</p>
          </div>
        </div>

        {/* Layer Switches */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
          {[
            { id: 'HARVEST', label: 'Blok Panen' },
            { id: 'NUTRIENT', label: 'Heatmap Nutrisi' },
            { id: 'DRONE', label: 'Drone Orthophoto' },
            { id: 'ELEVATION', label: 'Kontur' },
          ].map((layer) => (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id as any)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                activeLayer === layer.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Interactive GIS Canvas Container */}
      <div className="relative h-72 sm:h-80 w-full rounded-xl bg-slate-950 overflow-hidden border border-slate-800 group">
        {/* Synthetic Map Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

        {/* Vector Boundary Lines Mockup */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-emerald-500/40 fill-none stroke-[1.5]" viewBox="0 0 400 200">
          <polygon points="20,20 180,10 380,40 360,180 190,190 30,160" strokeDasharray="4 4" />
          <line x1="190" y1="10" x2="190" y2="190" />
          <line x1="20" y1="100" x2="380" y2="100" />
        </svg>

        {/* Interactive Block Grid Markers */}
        <div className="absolute inset-4 grid grid-cols-3 gap-3">
          {BLOCKS.map((blk) => {
            const isSelected = selectedBlock === blk.id;
            return (
              <div
                key={blk.id}
                onClick={() => setSelectedBlock(blk.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all border flex flex-col justify-between relative backdrop-blur-md ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-900/60 ring-2 ring-emerald-500/40 text-white shadow-lg scale-[1.02]'
                    : 'border-slate-800 bg-slate-900/70 hover:bg-slate-800/80 text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono">{blk.code}</span>
                  <span className={`h-2.5 w-2.5 rounded-full ${blk.color} animate-pulse`} />
                </div>

                <div>
                  <div className="text-[10px] text-slate-400">Yield Saat Ini</div>
                  <div className="text-sm font-extrabold text-emerald-400">{blk.yieldTon} Ton/Ha</div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>Luas: {blk.ha} Ha</span>
                  <span className="uppercase font-semibold text-emerald-300">{blk.status.replace('_', ' ')}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Map Compass & Legend Overlay */}
        <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md text-[10px] text-slate-300 flex items-center gap-3">
          <span className="flex items-center gap-1 font-mono">
            <Compass className="h-3.5 w-3.5 text-emerald-400" /> N 0°54'12" E 101°26'40"
          </span>
          <span className="text-slate-500">|</span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <CheckCircle2 className="h-3.5 w-3.5" /> Drone Orthophoto Synchronized
          </span>
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-200 backdrop-blur-md">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Selected Block Quick Details Drawer */}
      {selectedBlock && (
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-100 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold">Analisis AI Spasial:</span> {selectedBlock.toUpperCase()} menunjukkan tingkat kerapatan tajuk 96.2% dengan indeks kehijauan NDVI optimal.
            </div>
          </div>
          <button
            onClick={() => setSelectedBlock(null)}
            className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold shrink-0"
          >
            Tutup Detil
          </button>
        </div>
      )}
    </div>
  );
};
