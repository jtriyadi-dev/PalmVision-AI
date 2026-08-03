import React, { useState } from 'react';
import {
  Globe,
  Layers,
  MapPin,
  Eye,
  EyeOff,
  Maximize2,
  Sliders,
  Compass,
  Search,
  Ruler,
  AlertTriangle,
  Info,
  CheckCircle2,
  TreePine,
  TrendingUp,
  Download,
  Share2,
  RefreshCw,
  Navigation
} from 'lucide-react';
import { mockEstateBlocks, mockLiveGpsPins } from '../mockData';
import { EstateBlockGis, LiveGpsPin, SatelliteProvider, HeatmapLayerType } from '../types';

export const InteractiveMapExplorerView: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<SatelliteProvider>('Sentinel-2 HD');
  const [activeHeatmap, setActiveHeatmap] = useState<HeatmapLayerType>('NDVI_VEGETATION');
  const [selectedBlock, setSelectedBlock] = useState<EstateBlockGis | null>(mockEstateBlocks[0]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Layer Toggles
  const [showBlockPolygons, setShowBlockPolygons] = useState(true);
  const [showGpsVehicles, setShowGpsVehicles] = useState(true);
  const [showNdviOverlay, setShowNdviOverlay] = useState(true);
  const [showTopographyContours, setShowTopographyContours] = useState(false);
  const [showGanodermaHotspots, setShowGanodermaHotspots] = useState(true);

  // Measure Tool Mode
  const [measureMode, setMeasureMode] = useState(false);
  const [measureDistance, setMeasureDistance] = useState<string | null>(null);

  const filteredBlocks = mockEstateBlocks.filter(b =>
    b.blockCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.divisionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.estateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSimulateMeasure = () => {
    setMeasureMode(!measureMode);
    if (!measureMode) {
      setMeasureDistance('1,240.50 Meter (Area: 18.2 Ha)');
    } else {
      setMeasureDistance(null);
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Controls Header */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider">
              Prompt 5 Integrated • Interactive GIS Platform
            </span>
            <span className="text-xs text-slate-400">Riau Central & Sumatra Estates</span>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-1">Interactive Spatial GIS & Satellite Digital Map</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Realtime multi-layer spatial engine with estate block boundary polygons, NDVI vegetation health, live GPS vehicles, and Ganoderma alerts.
          </p>
        </div>

        {/* Satellite Imagery Provider Switcher */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {(['Sentinel-2 HD', 'PlanetScope 3m', 'Landsat-9', 'Drone Orthomosaic'] as SatelliteProvider[]).map(p => (
            <button
              key={p}
              onClick={() => setSelectedProvider(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                selectedProvider === p ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Layers & Spatial Control Panel (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Layers className="h-4 w-4 text-teal-400" />
                Spatial Layers
              </h3>
              <span className="text-[10px] text-teal-400 font-mono font-bold">5 Active</span>
            </div>

            {/* Layer Toggles List */}
            <div className="space-y-2 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 cursor-pointer hover:bg-slate-800 transition">
                <span className="font-semibold text-slate-200">Estate Block Polygons</span>
                <input
                  type="checkbox"
                  checked={showBlockPolygons}
                  onChange={e => setShowBlockPolygons(e.target.checked)}
                  className="rounded text-teal-500 focus:ring-0 accent-teal-500 h-4 w-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 cursor-pointer hover:bg-slate-800 transition">
                <span className="font-semibold text-slate-200">NDVI Vegetation Overlay</span>
                <input
                  type="checkbox"
                  checked={showNdviOverlay}
                  onChange={e => setShowNdviOverlay(e.target.checked)}
                  className="rounded text-teal-500 focus:ring-0 accent-teal-500 h-4 w-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 cursor-pointer hover:bg-slate-800 transition">
                <span className="font-semibold text-slate-200">Live GPS Vehicles & Mandor</span>
                <input
                  type="checkbox"
                  checked={showGpsVehicles}
                  onChange={e => setShowGpsVehicles(e.target.checked)}
                  className="rounded text-teal-500 focus:ring-0 accent-teal-500 h-4 w-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 cursor-pointer hover:bg-slate-800 transition">
                <span className="font-semibold text-slate-200">Ganoderma Disease Hotspots</span>
                <input
                  type="checkbox"
                  checked={showGanodermaHotspots}
                  onChange={e => setShowGanodermaHotspots(e.target.checked)}
                  className="rounded text-teal-500 focus:ring-0 accent-teal-500 h-4 w-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 cursor-pointer hover:bg-slate-800 transition">
                <span className="font-semibold text-slate-200">Topography & Elevation Contour</span>
                <input
                  type="checkbox"
                  checked={showTopographyContours}
                  onChange={e => setShowTopographyContours(e.target.checked)}
                  className="rounded text-teal-500 focus:ring-0 accent-teal-500 h-4 w-4 cursor-pointer"
                />
              </label>
            </div>

            {/* Heatmap Layer Selector */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-300">Spatial Heatmap Density</span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                {[
                  { id: 'NDVI_VEGETATION', label: 'NDVI Health' },
                  { id: 'YIELD_DENSITY', label: 'Harvest Tonnage' },
                  { id: 'GANODERMA_RISK', label: 'Ganoderma Hotspot' },
                  { id: 'SOIL_MOISTURE', label: 'Soil Moisture' }
                ].map(hm => (
                  <button
                    key={hm.id}
                    onClick={() => setActiveHeatmap(hm.id as HeatmapLayerType)}
                    className={`p-2 rounded-lg font-bold text-center transition cursor-pointer ${
                      activeHeatmap === hm.id ? 'bg-teal-600 text-white shadow' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {hm.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Measure Tool & Tools */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={handleSimulateMeasure}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer ${
                  measureMode ? 'bg-amber-600 text-white shadow' : 'bg-slate-800 text-teal-300 hover:bg-slate-700'
                }`}
              >
                <Ruler className="h-4 w-4" />
                <span>{measureMode ? 'Cancel Measuring' : 'Spatial Measure Tool'}</span>
              </button>

              {measureDistance && (
                <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-600/50 text-[11px] font-mono text-amber-200 space-y-1">
                  <div className="font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                    <span>Distance Measured:</span>
                  </div>
                  <div>{measureDistance}</div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Block Search */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Search Estate Block</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search Block (e.g. BLK-A01)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {filteredBlocks.map(blk => (
                <div
                  key={blk.id}
                  onClick={() => setSelectedBlock(blk)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                    selectedBlock?.id === blk.id
                      ? 'bg-teal-950/80 border-teal-500 text-white shadow'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="font-bold text-teal-300">{blk.blockCode}</div>
                  <div className="text-[10px] text-slate-400">{blk.areaHectares} Ha • NDVI {blk.currentNdviScore}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center/Right: Interactive Map Canvas (9 cols) */}
        <div className="lg:col-span-9 space-y-4">
          <div className="relative h-[620px] rounded-2xl border border-slate-800 overflow-hidden bg-slate-950 shadow-2xl">
            {/* Satellite Base Imagery Map Layer */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&q=80"
              alt="Satellite Base Map"
              className="w-full h-full object-cover filter brightness-95 contrast-110"
            />

            {/* Heatmap Filter Tint */}
            {activeHeatmap === 'NDVI_VEGETATION' && showNdviOverlay && (
              <div className="absolute inset-0 bg-emerald-900/25 mix-blend-multiply pointer-events-none" />
            )}
            {activeHeatmap === 'GANODERMA_RISK' && showGanodermaHotspots && (
              <div className="absolute inset-0 bg-amber-900/25 mix-blend-color-burn pointer-events-none" />
            )}

            {/* Top Floating Coordinates & Info Bar */}
            <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pointer-events-auto z-10">
              <div className="bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700 text-xs text-white font-bold flex items-center gap-3 shadow-xl">
                <Globe className="h-4 w-4 text-teal-400 animate-spin" style={{ animationDuration: '15s' }} />
                <span>Riau Central Estate: 0.5071° N, 101.4478° E | Provider: {selectedProvider}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono">
                  Live Spatial Sync Active
                </span>
              </div>
            </div>

            {/* Interactive Block Markers Overlay on Canvas */}
            {showBlockPolygons && mockEstateBlocks.map((blk, idx) => {
              const positions = [
                { top: '25%', left: '30%' },
                { top: '35%', left: '55%' },
                { top: '60%', left: '25%' },
                { top: '70%', left: '65%' },
                { top: '45%', left: '75%' }
              ];
              const pos = positions[idx % positions.length];
              const isSelected = selectedBlock?.id === blk.id;

              return (
                <div
                  key={blk.id}
                  onClick={() => setSelectedBlock(blk)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 z-20 hover:scale-110 ${
                    isSelected ? 'ring-4 ring-teal-400 z-30' : ''
                  }`}
                >
                  <div className={`p-2.5 rounded-xl backdrop-blur-md border shadow-2xl space-y-0.5 text-center min-w-[120px] ${
                    blk.ganodermaStatus === 'INFECTED_HOTSPOT'
                      ? 'bg-amber-950/90 border-amber-500 text-amber-200'
                      : 'bg-slate-900/90 border-teal-500/80 text-white'
                  }`}>
                    <div className="text-xs font-black flex items-center justify-center gap-1">
                      <TreePine className="h-3.5 w-3.5 text-teal-400" />
                      <span>{blk.blockCode}</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-300">{blk.areaHectares} Ha</div>
                    <div className="text-[9px] font-mono text-emerald-400">NDVI: {blk.currentNdviScore}</div>
                  </div>
                </div>
              );
            })}

            {/* Live GPS Fleet Vehicles Markers */}
            {showGpsVehicles && mockLiveGpsPins.map((pin, idx) => {
              const posList = [
                { top: '30%', left: '42%' },
                { top: '65%', left: '32%' },
                { top: '75%', left: '70%' },
                { top: '50%', left: '80%' }
              ];
              const pos = posList[idx % posList.length];

              return (
                <div
                  key={pin.id}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
                >
                  <div className="px-2.5 py-1 rounded-lg bg-indigo-950/90 border border-indigo-400 backdrop-blur-md text-white text-[10px] font-bold font-mono shadow-xl flex items-center gap-1.5 animate-pulse">
                    <Navigation className="h-3 w-3 text-indigo-400" />
                    <span>{pin.unitCode} ({pin.speedKmH} km/h)</span>
                  </div>
                </div>
              );
            })}

            {/* Bottom Left Legend Box */}
            <div className="absolute bottom-4 left-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs space-y-2 pointer-events-auto z-10 max-w-xs">
              <div className="font-bold text-white text-[11px] uppercase tracking-wider">Spatial Layer Legend</div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-300"></span>
                  <span>NDVI High (&gt;0.8)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-300"></span>
                  <span>Ganoderma Alert</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 border border-indigo-300"></span>
                  <span>Live GPS Vehicles</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-teal-500 border border-teal-300"></span>
                  <span>Estate Boundary</span>
                </div>
              </div>
            </div>
          </div>

          {/* Block Inspector Modal / Details Bar */}
          {selectedBlock && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-teal-500/40 shadow-xl space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    <TreePine className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-400 uppercase">{selectedBlock.divisionName}</span>
                    <h3 className="text-base font-extrabold text-white">{selectedBlock.blockCode} • Spatial Details</h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    selectedBlock.ganodermaStatus === 'INFECTED_HOTSPOT'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  }`}>
                    {selectedBlock.ganodermaStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">Area Hectares</span>
                  <span className="text-sm font-bold text-white">{selectedBlock.areaHectares} Ha</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">Palm Trees Count</span>
                  <span className="text-sm font-bold text-white">{selectedBlock.palmTreeCount.toLocaleString()} Trees</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">Year Planted / Variety</span>
                  <span className="text-sm font-bold text-white">{selectedBlock.yearPlanted} ({selectedBlock.palmVariety})</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">Soil Classification</span>
                  <span className="text-sm font-bold text-white">{selectedBlock.soilType}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">NDVI Vegetation Score</span>
                  <span className="text-sm font-bold text-emerald-400">{selectedBlock.currentNdviScore} Score</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  <span className="text-slate-400 text-[10px] block">Harvest Yield Ton/Ha</span>
                  <span className="text-sm font-bold text-teal-300">{selectedBlock.harvestYieldTonHa} Ton/Ha</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
