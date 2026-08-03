import React, { useState } from 'react';
import {
  Globe,
  Layers,
  MapPin,
  Plane,
  Navigation,
  Activity,
  Download,
  CheckCircle2,
  Wifi
} from 'lucide-react';
import { InteractiveMapExplorerView } from './views/InteractiveMapExplorerView';
import { BlockPolygonManagerView } from './views/BlockPolygonManagerView';
import { DroneOrthomosaicView } from './views/DroneOrthomosaicView';
import { GpsFleetGeofencingView } from './views/GpsFleetGeofencingView';
import { AgronomyHeatmapView } from './views/AgronomyHeatmapView';
import { GisExportToolsView } from './views/GisExportToolsView';

export const GisMapMainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'blocks' | 'drone' | 'gps' | 'heatmap' | 'export'>('explorer');

  return (
    <div className="space-y-6">
      {/* GIS Module Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-700 text-white shadow-lg">
            <Globe className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider">
                Module 05 Active
              </span>
              <span className="text-xs text-slate-400">PalmVision AI Spatial Intelligence</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">
              GIS Spatial Intelligence & Digital Plantation Map Platform
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-teal-300 bg-teal-950/60 px-3.5 py-2 rounded-xl border border-teal-800/60">
          <Wifi className="h-4 w-4 text-teal-400 animate-pulse" />
          <span>Realtime GIS & Satellite Feeds Active</span>
        </div>
      </div>

      {/* Navigation Submenu Tabs */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-lg flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'explorer'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Globe className="h-4 w-4 text-teal-300" />
            <span>Interactive Map Explorer</span>
          </button>

          <button
            onClick={() => setActiveTab('blocks')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'blocks'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4 text-teal-300" />
            <span>Block Polygons Registry</span>
          </button>

          <button
            onClick={() => setActiveTab('drone')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'drone'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Plane className="h-4 w-4 text-sky-300" />
            <span>Drone Orthomosaic & AI Tree Stand</span>
          </button>

          <button
            onClick={() => setActiveTab('gps')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'gps'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Navigation className="h-4 w-4 text-indigo-300" />
            <span>Live GPS Fleet & Geofencing</span>
          </button>

          <button
            onClick={() => setActiveTab('heatmap')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'heatmap'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Activity className="h-4 w-4 text-amber-300" />
            <span>Ganoderma & Agronomy Heatmap</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'export'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Download className="h-4 w-4 text-teal-300" />
            <span>GeoJSON & Spatial Exports</span>
          </button>
        </div>
      </div>

      {/* View Switcher Body */}
      {activeTab === 'explorer' && <InteractiveMapExplorerView />}
      {activeTab === 'blocks' && <BlockPolygonManagerView />}
      {activeTab === 'drone' && <DroneOrthomosaicView />}
      {activeTab === 'gps' && <GpsFleetGeofencingView />}
      {activeTab === 'heatmap' && <AgronomyHeatmapView />}
      {activeTab === 'export' && <GisExportToolsView />}
    </div>
  );
};
