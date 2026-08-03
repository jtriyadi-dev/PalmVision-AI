import React, { useState, useRef } from 'react';
import {
  MapPin,
  Layers,
  Compass,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  Info,
  Ruler,
  Building2,
  Trees,
  Truck,
  Radio,
  CloudSun,
  Camera,
  Activity,
  Layers3,
  Sliders,
  Sparkles,
  Check,
  X,
  FileText,
  MousePointer,
  Square,
  Scissors,
} from 'lucide-react';
import { GisPolygon, GisMarker, GisRoad, GisDrainage, HeatmapPoint, MapStyleMode, MapProvider } from '../types';

interface GisMapEngineProps {
  polygons: GisPolygon[];
  markers: GisMarker[];
  roads: GisRoad[];
  drainages: GisDrainage[];
  heatmaps: HeatmapPoint[];
  onSelectBlockPolygon?: (poly: GisPolygon) => void;
  onSelectMarker?: (marker: GisMarker) => void;
  activeLayers: Record<string, boolean>;
  onToggleLayer: (layerKey: string) => void;
  mapStyle: MapStyleMode;
  onChangeMapStyle: (style: MapStyleMode) => void;
  provider: MapProvider;
  onChangeProvider: (provider: MapProvider) => void;
}

export const GisMapEngine: React.FC<GisMapEngineProps> = ({
  polygons,
  markers,
  roads,
  drainages,
  heatmaps,
  onSelectBlockPolygon,
  onSelectMarker,
  activeLayers,
  onToggleLayer,
  mapStyle,
  onChangeMapStyle,
  provider,
  onChangeProvider,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(14);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedPoly, setSelectedPoly] = useState<GisPolygon | null>(null);
  const [selectedMrk, setSelectedMrk] = useState<GisMarker | null>(null);
  const [activeTool, setActiveTool] = useState<'PAN' | 'MEASURE_DIST' | 'MEASURE_AREA' | 'DRAW_POLY'>('PAN');
  const [hoveredCoords, setHoveredCoords] = useState<{ lat: number; lng: number }>({ lat: 0.8912, lng: 101.4421 });
  const [showLayerPanel, setShowLayerPanel] = useState(false);
  const [showStylePanel, setShowStylePanel] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 1, 18));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 1, 10));
  const handleResetView = () => {
    setZoomLevel(14);
    setSelectedPoly(null);
    setSelectedMrk(null);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  // Helper mapping SVG canvas bounds for Teluk Dalam Estate (Lat 0.880 - 0.905, Lng 101.435 - 101.460)
  const mapToCanvasCoords = (lat: number, lng: number) => {
    const minLat = 0.885;
    const maxLat = 0.905;
    const minLng = 101.435;
    const maxLng = 101.458;

    const x = ((lng - minLng) / (maxLng - minLng)) * 800;
    const y = 600 - ((lat - minLat) / (maxLat - minLat)) * 600;
    return { x, y };
  };

  // Map Background Style SVG classes
  const getMapBackgroundClass = () => {
    switch (mapStyle) {
      case 'SATELLITE':
      case 'HYBRID':
        return 'bg-slate-950 text-slate-100';
      case 'DARK':
        return 'bg-slate-900 text-slate-200';
      case 'TERRAIN':
        return 'bg-amber-950/20 bg-emerald-950/40 text-slate-100';
      case 'LIGHT':
        return 'bg-emerald-50/50 text-slate-800';
      case 'CORPORATE':
        return 'bg-slate-100 text-slate-900';
      default:
        return 'bg-slate-900 text-slate-100';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : 'h-[620px] w-full'
      } ${getMapBackgroundClass()}`}
    >
      {/* Top Map Engine Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Map Title & Coordinates Badge */}
        <div className="pointer-events-auto px-3.5 py-2 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white shadow-lg flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 font-extrabold text-emerald-400">
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span>PalmVision Spatial Engine</span>
          </div>
          <span className="h-3 w-px bg-slate-700" />
          <div className="font-mono text-[11px] text-slate-300">
            Lat: <span className="font-bold text-white">{hoveredCoords.lat.toFixed(4)}° N</span> • Lng:{' '}
            <span className="font-bold text-white">{hoveredCoords.lng.toFixed(4)}° E</span>
          </div>
          <span className="h-3 w-px bg-slate-700 hidden sm:inline" />
          <div className="hidden sm:flex items-center gap-1.5 font-bold text-[10px] text-amber-300">
            <span>Provider: {provider}</span>
          </div>
        </div>

        {/* Right: Quick Tools & Layer Toggles */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Active Tool Selector */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white shadow-lg text-xs">
            {[
              { id: 'PAN', label: 'Geser', icon: MousePointer },
              { id: 'MEASURE_DIST', label: 'Jarak', icon: Ruler },
              { id: 'MEASURE_AREA', label: 'Luas', icon: Square },
              { id: 'DRAW_POLY', label: 'Editor', icon: Scissors },
            ].map((tool) => {
              const Icon = tool.icon;
              const isSelected = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-colors ${
                    isSelected ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                  title={tool.label}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden md:inline text-[11px]">{tool.label}</span>
                </button>
              );
            })}
          </div>

          {/* Layer Panel Button */}
          <button
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className={`p-2 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border text-xs font-bold flex items-center gap-1.5 shadow-lg transition-colors ${
              showLayerPanel ? 'border-emerald-500 text-emerald-400 bg-emerald-950/50' : 'border-slate-700 text-white hover:bg-slate-800'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span className="hidden sm:inline">Layer ({Object.values(activeLayers).filter(Boolean).length})</span>
          </button>

          {/* Style Panel Button */}
          <button
            onClick={() => setShowStylePanel(!showStylePanel)}
            className={`p-2 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border text-xs font-bold flex items-center gap-1.5 shadow-lg transition-colors ${
              showStylePanel ? 'border-emerald-500 text-emerald-400 bg-emerald-950/50' : 'border-slate-700 text-white hover:bg-slate-800'
            }`}
          >
            <Layers3 className="h-4 w-4" />
            <span className="hidden sm:inline">{mapStyle}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800 text-xs shadow-lg"
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Floating Layer Control Panel Drawer */}
      {showLayerPanel && (
        <div className="absolute top-16 right-4 z-30 w-72 p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-lg border border-slate-700 text-white shadow-2xl space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Layers className="h-4 w-4" /> Pengaturan Spatial Layer
            </span>
            <button onClick={() => setShowLayerPanel(false)} className="text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-1">
            {[
              { key: 'polygons', label: 'Polygon Blok & Estate', icon: Trees, color: 'text-emerald-400' },
              { key: 'roads', label: 'Jalan Main & Koleksi', icon: MapPin, color: 'text-amber-400' },
              { key: 'drainages', label: 'Kanal & Parit Water Gate', icon: Info, color: 'text-blue-400' },
              { key: 'mills', label: 'Pabrik (PKS) & Bangunan', icon: Building2, color: 'text-purple-400' },
              { key: 'weather', label: 'Stasiun Telemetri Cuaca', icon: CloudSun, color: 'text-teal-400' },
              { key: 'iot', label: 'Sensor Node IoT', icon: Radio, color: 'text-pink-400' },
              { key: 'vehicles', label: 'GPS Live Tracking Armada', icon: Truck, color: 'text-orange-400' },
              { key: 'drones', label: 'Armada Drone & Ortho', icon: Camera, color: 'text-sky-400' },
              { key: 'heatmap', label: 'Heatmap NDVI & Produksi', icon: Activity, color: 'text-red-400' },
            ].map((layer) => {
              const Icon = layer.icon;
              const isChecked = activeLayers[layer.key] !== false;
              return (
                <label
                  key={layer.key}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-800/50 hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${layer.color}`} />
                    <span className="font-semibold">{layer.label}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleLayer(layer.key)}
                    className="rounded text-emerald-500 focus:ring-emerald-500"
                  />
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Style & Provider Panel Drawer */}
      {showStylePanel && (
        <div className="absolute top-16 right-4 z-30 w-72 p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-lg border border-slate-700 text-white shadow-2xl space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Layers3 className="h-4 w-4" /> Gaya Peta & Map Provider
            </span>
            <button onClick={() => setShowStylePanel(false)} className="text-slate-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Map Provider
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['LEAFLET', 'OPENSTREETMAP', 'GOOGLE_MAPS', 'MAPBOX'] as MapProvider[]).map((p) => (
                <button
                  key={p}
                  onClick={() => onChangeProvider(p)}
                  className={`p-2 rounded-xl font-bold text-[11px] border transition-all ${
                    provider === p ? 'border-emerald-500 bg-emerald-950 text-emerald-300' : 'border-slate-800 bg-slate-800/40 text-slate-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block pt-2">
              Visual Map Style
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['SATELLITE', 'HYBRID', 'TERRAIN', 'DARK', 'LIGHT', 'CORPORATE'] as MapStyleMode[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onChangeMapStyle(s)}
                  className={`p-2 rounded-xl font-bold text-[11px] border transition-all ${
                    mapStyle === s ? 'border-emerald-500 bg-emerald-950 text-emerald-300' : 'border-slate-800 bg-slate-800/40 text-slate-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SVG Map Canvas Container */}
      <div
        className="w-full h-full cursor-crosshair overflow-hidden relative"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;
          const lat = 0.885 + (1 - mouseY / 600) * 0.02;
          const lng = 101.435 + (mouseX / 800) * 0.023;
          setHoveredCoords({ lat, lng });
        }}
      >
        <svg
          viewBox="0 0 800 600"
          className="w-full h-full transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel / 14})`, transformOrigin: 'center center' }}
        >
          {/* Simulated Satellite Grid Lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </pattern>
            {/* Heatmap Radial Gradients */}
            <radialGradient id="heatGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(239, 68, 68, 0.8)" />
              <stop offset="50%" stopColor="rgba(245, 158, 11, 0.5)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </radialGradient>
          </defs>
          <rect width="800" height="600" fill="url(#grid)" />

          {/* 1. Render Drainage Canals */}
          {activeLayers.drainages !== false &&
            drainages.map((drn) => {
              const pointsStr = drn.coordinates
                .map((c) => {
                  const pt = mapToCanvasCoords(c.lat, c.lng);
                  return `${pt.x},${pt.y}`;
                })
                .join(' ');
              return (
                <g key={drn.id}>
                  <polyline
                    points={pointsStr}
                    fill="none"
                    stroke="#0284c7"
                    strokeWidth="4"
                    strokeDasharray="4 2"
                    opacity="0.8"
                  />
                </g>
              );
            })}

          {/* 2. Render Roads */}
          {activeLayers.roads !== false &&
            roads.map((rd) => {
              const pointsStr = rd.coordinates
                .map((c) => {
                  const pt = mapToCanvasCoords(c.lat, c.lng);
                  return `${pt.x},${pt.y}`;
                })
                .join(' ');
              return (
                <g key={rd.id}>
                  <polyline
                    points={pointsStr}
                    fill="none"
                    stroke={rd.roadType === 'MAIN_ROAD' ? '#f59e0b' : '#d97706'}
                    strokeWidth={rd.roadType === 'MAIN_ROAD' ? '5' : '3'}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

          {/* 3. Render Block Polygons */}
          {activeLayers.polygons !== false &&
            polygons.map((poly) => {
              const pointsStr = poly.coordinates
                .map((c) => {
                  const pt = mapToCanvasCoords(c.lat, c.lng);
                  return `${pt.x},${pt.y}`;
                })
                .join(' ');

              const centerPt = mapToCanvasCoords(
                poly.coordinates.reduce((sum, c) => sum + c.lat, 0) / poly.coordinates.length,
                poly.coordinates.reduce((sum, c) => sum + c.lng, 0) / poly.coordinates.length
              );

              const isSelected = selectedPoly?.id === poly.id;

              return (
                <g key={poly.id} className="cursor-pointer transition-opacity hover:opacity-90">
                  <polygon
                    points={pointsStr}
                    fill={poly.fillColor}
                    fillOpacity={isSelected ? 0.75 : 0.45}
                    stroke={isSelected ? '#38bdf8' : poly.strokeColor}
                    strokeWidth={isSelected ? 3.5 : poly.strokeWidth}
                    onClick={() => {
                      setSelectedPoly(poly);
                      if (onSelectBlockPolygon) onSelectBlockPolygon(poly);
                    }}
                  />
                  {/* Polygon Label Text */}
                  <text
                    x={centerPt.x}
                    y={centerPt.y}
                    fill="#ffffff"
                    fontSize="11"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="pointer-events-none drop-shadow-md select-none font-mono"
                  >
                    {poly.code} ({poly.hectares} Ha)
                  </text>
                </g>
              );
            })}

          {/* 4. Render Heatmap Overlay */}
          {activeLayers.heatmap !== false &&
            heatmaps.map((hm, idx) => {
              const pt = mapToCanvasCoords(hm.lat, hm.lng);
              return (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={hm.intensity * 60}
                  fill="url(#heatGrad)"
                  opacity="0.6"
                />
              );
            })}

          {/* 5. Render Markers (Mills, Weather Stations, IoT, GPS Vehicles) */}
          {markers.map((mrk) => {
            const pt = mapToCanvasCoords(mrk.coordinates.lat, mrk.coordinates.lng);
            const isSelected = selectedMrk?.id === mrk.id;

            let isLayerActive = true;
            if (mrk.category === 'MILL' && activeLayers.mills === false) isLayerActive = false;
            if (mrk.category === 'WEATHER' && activeLayers.weather === false) isLayerActive = false;
            if (mrk.category === 'IOT' && activeLayers.iot === false) isLayerActive = false;
            if (mrk.category === 'VEHICLE' && activeLayers.vehicles === false) isLayerActive = false;
            if (mrk.category === 'DRONE' && activeLayers.drones === false) isLayerActive = false;

            if (!isLayerActive) return null;

            return (
              <g
                key={mrk.id}
                transform={`translate(${pt.x}, ${pt.y})`}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedMrk(mrk);
                  if (onSelectMarker) onSelectMarker(mrk);
                }}
              >
                {/* Marker Pulse effect */}
                <circle r="14" fill="#10b981" opacity="0.3" className="animate-ping" />
                <circle r="10" fill={mrk.category === 'VEHICLE' ? '#f97316' : mrk.category === 'WEATHER' ? '#06b6d4' : '#10b981'} stroke="#ffffff" strokeWidth="2" />
                <text
                  x="0"
                  y="18"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="pointer-events-none drop-shadow-md select-none font-mono"
                >
                  {mrk.code}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Bottom Scale & Compass Overlay */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 pointer-events-none">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white font-mono text-[11px] font-bold shadow-lg flex items-center gap-2">
            <span>Zoom: {zoomLevel}x</span>
            <span className="h-3 w-px bg-slate-700" />
            <div className="flex items-center gap-1">
              <span className="w-8 h-1 bg-white inline-block border-x border-slate-400" />
              <span>500 Meter</span>
            </div>
          </div>
        </div>

        {/* Right Floating Map Navigation Buttons */}
        <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800 shadow-lg text-xs font-bold"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800 shadow-lg text-xs font-bold"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-slate-700 text-white hover:bg-slate-800 shadow-lg text-xs font-bold"
            title="Reset Peta"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Polygon / Block Drawer Tooltip Card */}
      {selectedPoly && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-md p-4 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-lg border border-emerald-500/50 text-white shadow-2xl space-y-3 animate-fadeIn text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                {selectedPoly.code}
              </span>
              <h4 className="font-bold text-sm text-white">{selectedPoly.name}</h4>
            </div>
            <button
              onClick={() => setSelectedPoly(null)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block">Luas Area:</span>
              <span className="font-bold text-white">{selectedPoly.hectares} Hektar</span>
            </div>
            <div>
              <span className="text-slate-400 block">Populasi Pohon:</span>
              <span className="font-bold text-white">{selectedPoly.attributes.totalTrees} Pokok ({selectedPoly.attributes.sph} SPH)</span>
            </div>
            <div>
              <span className="text-slate-400 block">Tahun Tanam / Varietas:</span>
              <span className="font-bold text-white">{selectedPoly.attributes.plantingYear} • {selectedPoly.attributes.variety}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Tanah / Topografi:</span>
              <span className="font-bold text-white">{selectedPoly.attributes.soilType} • {selectedPoly.attributes.topography}</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-300">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>AI Health Score: {selectedPoly.attributes.aiHealthScore}/100</span>
            </div>
            <span className="font-mono text-slate-300">NDVI: {selectedPoly.attributes.ndviIndex}</span>
          </div>
        </div>
      )}
    </div>
  );
};
