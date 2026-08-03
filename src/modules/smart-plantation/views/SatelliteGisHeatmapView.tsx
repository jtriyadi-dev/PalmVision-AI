import React, { useState } from 'react';
import {
  Globe,
  Layers,
  MapPin,
  Eye,
  EyeOff,
  Sliders,
  Shield,
  Activity,
  Maximize2,
  Compass,
  Sparkles,
  Download
} from 'lucide-react';
import { mockSatelliteImagery, mockGisLayers } from '../mockData';

export const SatelliteGisHeatmapView: React.FC = () => {
  const [layers, setLayers] = useState(mockGisLayers);
  const [selectedProvider, setSelectedProvider] = useState<string>('Sentinel-2');
  const [activeHeatmap, setActiveHeatmap] = useState<'HARVEST' | 'RAINFALL' | 'DISEASE' | 'ASSET'>('HARVEST');

  const toggleLayerVisibility = (id: string) => {
    setLayers(layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Advanced GIS, Satellite Remote Sensing & Geofencing</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Multilayer spatial queries, satellite timeline comparison, geofencing boundary alerts & harvest heatmaps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['Sentinel-2', 'PlanetScope', 'Landsat-9'].map(p => (
            <button
              key={p}
              onClick={() => setSelectedProvider(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedProvider === p ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left GIS Layer Manager (1 col) */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-cyan-400" />
              GIS Layer Manager
            </h3>
            <span className="text-[10px] text-slate-400">{layers.length} Layers</span>
          </div>

          <div className="space-y-2.5">
            {layers.map(layer => (
              <div
                key={layer.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-white">{layer.layerName}</div>
                  <div className="text-[10px] text-slate-400">
                    Category: {layer.category} ({layer.featuresCount} features)
                  </div>
                </div>

                <button
                  onClick={() => toggleLayerVisibility(layer.id)}
                  className={`p-1.5 rounded-lg transition ${
                    layer.visible ? 'bg-cyan-600/30 text-cyan-300' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {layer.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-700 space-y-2">
            <h4 className="text-xs font-bold text-slate-300">Spatial Heatmap Mode</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'HARVEST', label: 'Harvest Yield' },
                { id: 'RAINFALL', label: 'Rainfall Density' },
                { id: 'DISEASE', label: 'Ganoderma Risk' },
                { id: 'ASSET', label: 'Vehicle Density' }
              ].map(hm => (
                <button
                  key={hm.id}
                  onClick={() => setActiveHeatmap(hm.id as any)}
                  className={`p-2 rounded-lg text-center font-bold text-[10px] transition ${
                    activeHeatmap === hm.id ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {hm.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center/Right Map Simulation Stage (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative h-[520px] rounded-2xl border border-slate-700/80 overflow-hidden bg-slate-950 shadow-2xl">
            {/* Background Satellite Map Visual */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
              alt="Satellite Base Map"
              className="w-full h-full object-cover filter brightness-90 contrast-110"
            />

            {/* GIS Simulated Overlays */}
            <div className="absolute inset-0 bg-cyan-950/20 pointer-events-none" />

            {/* Floating Top Controls Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 text-xs text-white font-bold flex items-center gap-3">
                <Globe className="h-4 w-4 text-cyan-400 animate-spin" style={{ animationDuration: '12s' }} />
                <span>Riau Central Estate - Spatial Coordinate: 0.5071° N, 101.4478° E</span>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-xs font-bold hover:bg-slate-800">
                  Polygon Drawing
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white text-xs font-bold hover:bg-slate-800">
                  Geofence Rule
                </button>
              </div>
            </div>

            {/* Simulated Geofence Alert Overlay Box */}
            <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-emerald-500/40 text-xs space-y-1.5 max-w-sm pointer-events-auto">
              <div className="flex items-center gap-2 font-bold text-emerald-400">
                <Shield className="h-4 w-4" />
                <span>Geofence Rule Active: Mill Perimeter</span>
              </div>
              <p className="text-slate-300 text-[11px]">
                Auto-trigger alert on unauthorized vehicle entry/exit after 18:00 WIB.
              </p>
            </div>
          </div>

          {/* Satellite Timeline Feed Cards */}
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
            <h4 className="text-xs font-bold text-white mb-3">Recent Satellite Passes Available for Download</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {mockSatelliteImagery.map(sat => (
                <div key={sat.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 flex items-center gap-3">
                  <img src={sat.thumbnailUrl} alt={sat.provider} className="w-14 h-14 rounded-lg object-cover" />
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white">{sat.provider} ({sat.indexType})</div>
                    <div className="text-[10px] text-slate-400">Acquired: {sat.acquisitionDate}</div>
                    <div className="text-[10px] text-cyan-400">Cloud Cover: {sat.cloudCoverPct}% | {sat.resolutionMeters}m Res</div>
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
