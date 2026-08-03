import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Flame,
  CheckCircle2,
  TreePine,
  Sparkles,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { mockEstateBlocks } from '../mockData';

export const AgronomyHeatmapView: React.FC = () => {
  const [selectedHeatmapType, setSelectedHeatmapType] = useState<'GANODERMA' | 'YIELD' | 'SOIL_MOISTURE'>('GANODERMA');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              Agronomy AI & Disease Spatial Heatmaps
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Ganoderma Infection Risk & Soil Nutrient Heatmap Engine</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Spatial epidemiology for oil palm plantations: early Ganoderma boninense detection, leaf nutrient deficiency heatmaps, and drainage moisture maps.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedHeatmapType('GANODERMA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedHeatmapType === 'GANODERMA' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ganoderma Risk
          </button>
          <button
            onClick={() => setSelectedHeatmapType('YIELD')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedHeatmapType === 'YIELD' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Yield Density
          </button>
          <button
            onClick={() => setSelectedHeatmapType('SOIL_MOISTURE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              selectedHeatmapType === 'SOIL_MOISTURE' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Soil Moisture
          </button>
        </div>
      </div>

      {/* Heatmap Blocks Summary Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {mockEstateBlocks.map(blk => (
          <div key={blk.id} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-slate-900 text-teal-300 font-mono text-xs font-bold">
                {blk.blockCode}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                blk.ganodermaStatus === 'INFECTED_HOTSPOT' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {blk.ganodermaStatus}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">{blk.divisionName}</h4>
              <p className="text-xs text-slate-400">{blk.soilType} • {blk.topography}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-700/80">
              <div>
                <span className="text-[10px] text-slate-400 block">NDVI Score</span>
                <strong className="text-emerald-400 font-mono">{blk.currentNdviScore}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Yield Ton/Ha</span>
                <strong className="text-teal-300 font-mono">{blk.harvestYieldTonHa} T/Ha</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
