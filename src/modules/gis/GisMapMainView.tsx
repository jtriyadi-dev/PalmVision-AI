import React, { useState } from 'react';
import { ScrollableSubNav, TabItem } from '../../components/ScrollableSubNav';
import {
  Globe,
  Layers,
  MapPin,
  Plane,
  Navigation,
  Activity,
  Download,
  CheckCircle2,
  Wifi,
  ArrowRight,
  Radio,
  TrendingUp,
  Database
} from 'lucide-react';
import { InteractiveMapExplorerView } from './views/InteractiveMapExplorerView';
import { BlockPolygonManagerView } from './views/BlockPolygonManagerView';
import { DroneOrthomosaicView } from './views/DroneOrthomosaicView';
import { GpsFleetGeofencingView } from './views/GpsFleetGeofencingView';
import { AgronomyHeatmapView } from './views/AgronomyHeatmapView';
import { GisExportToolsView } from './views/GisExportToolsView';
import { useEnterpriseData } from '../../context/EnterpriseDataContext';

export const GisMapMainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explorer' | 'blocks' | 'drone' | 'gps' | 'heatmap' | 'export'>('explorer');
  const { navigateToModule } = useEnterpriseData();

  const gisTabs: TabItem[] = [
    { id: 'explorer', label: 'Interactive Map Explorer', icon: Globe },
    { id: 'blocks', label: 'Block Polygons Registry', icon: Layers },
    { id: 'drone', label: 'Drone Orthomosaic & AI Tree Stand', icon: Plane },
    { id: 'gps', label: 'Live GPS Fleet & Geofencing', icon: Navigation },
    { id: 'heatmap', label: 'Ganoderma & Agronomy Heatmap', icon: Activity },
    { id: 'export', label: 'GeoJSON & Spatial Exports', icon: Download },
  ];

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

        {/* Cross-Module Quick Jump Links */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigateToModule('smart-plantation')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Radio className="h-3.5 w-3.5 text-emerald-400" />
            <span>Lihat Telemetri IoT PKS</span>
            <ArrowRight className="h-3 w-3" />
          </button>
          <button
            onClick={() => navigateToModule('harvest')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
            <span>Panen Realtime</span>
            <ArrowRight className="h-3 w-3" />
          </button>
          <button
            onClick={() => navigateToModule('master-data')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <Database className="h-3.5 w-3.5 text-indigo-400" />
            <span>Master Kebun</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Navigation Submenu Tabs */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-lg">
        <ScrollableSubNav
          items={gisTabs}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          activeColorClass="bg-teal-600 text-white shadow-md"
        />
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
