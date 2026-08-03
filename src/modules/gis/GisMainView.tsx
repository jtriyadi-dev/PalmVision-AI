import React, { useState } from 'react';
import {
  Compass,
  Layers,
  MapPin,
  Ruler,
  Trees,
  Truck,
  CloudSun,
  Radio,
  Camera,
  Activity,
  Upload,
  Search,
  Filter,
  Plus,
  Building2,
  RefreshCw,
  Sliders,
  Settings,
  Sparkles,
  Download,
  Info,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { GisDashboardView } from './components/GisDashboardView';
import { GisMapEngine } from './components/GisMapEngine';
import { PolygonEditorModal } from './components/PolygonEditorModal';
import { GisImportExportModal } from './components/GisImportExportModal';
import { GisSpatialAnalysisModal } from './components/GisSpatialAnalysisModal';
import {
  INITIAL_POLYGONS,
  INITIAL_MARKERS,
  INITIAL_ROADS,
  INITIAL_DRAINAGES,
  INITIAL_HEATMAP_POINTS,
  INITIAL_SPATIAL_ANALYSES,
  INITIAL_GIS_LOGS,
} from './mockData';
import {
  GisPolygon,
  GisMarker,
  GisRoad,
  GisDrainage,
  HeatmapPoint,
  SpatialAnalysisResult,
  GisImportExportLog,
  MapStyleMode,
  MapProvider,
} from './types';

interface GisMainViewProps {
  initialSubTab?: string;
}

export const GisMainView: React.FC<GisMainViewProps> = ({ initialSubTab = 'dashboard' }) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);

  // Core State
  const [polygons, setPolygons] = useState<GisPolygon[]>(INITIAL_POLYGONS);
  const [markers, setMarkers] = useState<GisMarker[]>(INITIAL_MARKERS);
  const [roads, setRoads] = useState<GisRoad[]>(INITIAL_ROADS);
  const [drainages, setDrainages] = useState<GisDrainage[]>(INITIAL_DRAINAGES);
  const [heatmaps, setHeatmaps] = useState<HeatmapPoint[]>(INITIAL_HEATMAP_POINTS);
  const [analyses, setAnalyses] = useState<SpatialAnalysisResult[]>(INITIAL_SPATIAL_ANALYSES);
  const [logs, setLogs] = useState<GisImportExportLog[]>(INITIAL_GIS_LOGS);

  // Active Layers Toggle State
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    polygons: true,
    roads: true,
    drainages: true,
    mills: true,
    weather: true,
    iot: true,
    vehicles: true,
    drones: true,
    heatmap: true,
  });

  // Map Controls State
  const [mapStyle, setMapStyle] = useState<MapStyleMode>('SATELLITE');
  const [provider, setProvider] = useState<MapProvider>('LEAFLET');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals State
  const [isPolyModalOpen, setIsPolyModalOpen] = useState(false);
  const [polyToEdit, setPolyToEdit] = useState<GisPolygon | null>(null);
  const [isImportExportOpen, setIsImportExportOpen] = useState(false);
  const [isAnalysisOpen, setIsAnalysisOpen] = useState(false);

  const handleToggleLayer = (key: string) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePolygon = (newPoly: GisPolygon) => {
    setPolygons((prev) => {
      const idx = prev.findIndex((p) => p.id === newPoly.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = newPoly;
        return updated;
      }
      return [newPoly, ...prev];
    });
  };

  const filteredPolygons = polygons.filter(
    (p) =>
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.attributes.variety?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Sub-navigation bar for GIS Module */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          {[
            { id: 'dashboard', label: 'Dashboard GIS', icon: Compass },
            { id: 'plantation-map', label: 'Digital Plantation Map', icon: Layers },
            { id: 'roads-infrastructure', label: 'Infrastruktur & Jalan', icon: Ruler },
            { id: 'gps-tracking', label: 'GPS Tracking Armada', icon: Truck },
            { id: 'spatial-analysis', label: 'Spatial Analysis', icon: Activity },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSubTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubTab(item.id)}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setIsImportExportOpen(true)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Import/Export GIS</span>
          </button>
          <button
            onClick={() => {
              setPolyToEdit(null);
              setIsPolyModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105 active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Tambah Polygon Blok</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Dashboard GIS */}
      {activeSubTab === 'dashboard' && (
        <GisDashboardView onOpenMap={() => setActiveSubTab('plantation-map')} />
      )}

      {/* VIEW 2: Interactive Digital Plantation Map */}
      {activeSubTab === 'plantation-map' && (
        <div className="space-y-4">
          {/* Spatial Search Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari Kode Blok (B12, C04), Nama Estate, atau Koordinat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              onClick={() => setIsAnalysisOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-transform hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Spatial Analysis Framework</span>
            </button>
          </div>

          {/* Interactive Map Canvas Engine */}
          <GisMapEngine
            polygons={filteredPolygons}
            markers={markers}
            roads={roads}
            drainages={drainages}
            heatmaps={heatmaps}
            activeLayers={activeLayers}
            onToggleLayer={handleToggleLayer}
            mapStyle={mapStyle}
            onChangeMapStyle={setMapStyle}
            provider={provider}
            onChangeProvider={setProvider}
            onSelectBlockPolygon={(poly) => {
              setPolyToEdit(poly);
            }}
          />

          {/* List Table of Mapped Block Polygons */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Trees className="h-4 w-4 text-emerald-500" /> Daftar Polygon Blok Terdata ({filteredPolygons.length})
              </h3>
              <span className="text-xs text-slate-400 font-mono">Status: WGS84 EPSG:4326</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                    <th className="p-3">Kode Blok</th>
                    <th className="p-3">Nama / Varietas</th>
                    <th className="p-3">Luas (Ha)</th>
                    <th className="p-3">Pokok (SPH)</th>
                    <th className="p-3">Tahun Tanam</th>
                    <th className="p-3">Tanah & Topografi</th>
                    <th className="p-3">AI Health</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredPolygons.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {p.code}
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-slate-900 dark:text-white block">{p.name}</span>
                        <span className="text-slate-400 text-[11px] block">{p.attributes.variety}</span>
                      </td>
                      <td className="p-3 font-bold">{p.hectares} Ha</td>
                      <td className="p-3">
                        {p.attributes.totalTrees} ({p.attributes.sph} SPH)
                      </td>
                      <td className="p-3 font-semibold">{p.attributes.plantingYear}</td>
                      <td className="p-3">
                        <span className="block">{p.attributes.soilType}</span>
                        <span className="text-slate-400 text-[10px] block">{p.attributes.topography}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          Score: {p.attributes.aiHealthScore}/100
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setPolyToEdit(p);
                            setIsPolyModalOpen(true);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-[11px]"
                        >
                          Edit GIS
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Roads & Infrastructure */}
      {activeSubTab === 'roads-infrastructure' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Roads List */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Ruler className="h-4 w-4 text-amber-500" /> Data Jalan Main & Koleksi
            </h3>
            <div className="space-y-3">
              {roads.map((rd) => (
                <div
                  key={rd.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {rd.code} - {rd.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                      {rd.surfaceType}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                    <div>Panjang: <strong>{rd.lengthKm} Km</strong></div>
                    <div>Lebar: <strong>{rd.widthMeters} Meter</strong></div>
                    <div>Kondisi: <strong className="text-emerald-600">{rd.condition}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drainage & Canals */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Info className="h-4 w-4 text-blue-500" /> Data Kanal & Water Gate Drainase
            </h3>
            <div className="space-y-3">
              {drainages.map((drn) => (
                <div
                  key={drn.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white font-mono">
                      {drn.code} - {drn.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                      Muka Air: {drn.waterLevelCm} cm
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                    <div>Panjang Kanal: <strong>{drn.lengthKm} Km</strong></div>
                    <div>Arah Aliran: <strong>{drn.flowDirection}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: Vehicle GPS Live Tracking */}
      {activeSubTab === 'gps-tracking' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Truck className="h-4 w-4 text-orange-500" /> GPS Live Fleet Tracking
            </h3>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold animate-pulse">
              ● Live 10s Telemetry
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {markers
              .filter((m) => m.category === 'VEHICLE')
              .map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {v.code}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 font-bold text-[10px]">
                      {v.details.speedKmh} km/h
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">{v.name}</p>
                  <div className="text-[11px] text-slate-400">
                    Pengemudi: <strong className="text-slate-800 dark:text-slate-200">{v.details.assignedTo}</strong>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* VIEW 5: Spatial Analysis View */}
      {activeSubTab === 'spatial-analysis' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-500" /> Modul Spatial Intelligence & Buffer Analysis
            </h3>
            <button
              onClick={() => setIsAnalysisOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="h-4 w-4" />
              <span>Jalankan Analisis Baru</span>
            </button>
          </div>

          <div className="space-y-3">
            {analyses.map((a) => (
              <div
                key={a.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{a.title}</span>
                  <span className="font-mono text-[11px] text-slate-400">{a.createdAt}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">{a.insightSummary}</p>
                <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 font-medium">
                  <strong>Rekomendasi Tindakan Spasial:</strong> {a.recommendationAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODALS */}
      <PolygonEditorModal
        isOpen={isPolyModalOpen}
        onClose={() => setIsPolyModalOpen(false)}
        polygonToEdit={polyToEdit}
        onSavePolygon={handleSavePolygon}
      />

      <GisImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        logs={logs}
        onAddLog={(newLog) => setLogs((prev) => [newLog, ...prev])}
      />

      <GisSpatialAnalysisModal
        isOpen={isAnalysisOpen}
        onClose={() => setIsAnalysisOpen(false)}
        analyses={analyses}
        onRunAnalysis={(newRes) => setAnalyses((prev) => [newRes, ...prev])}
      />
    </div>
  );
};
