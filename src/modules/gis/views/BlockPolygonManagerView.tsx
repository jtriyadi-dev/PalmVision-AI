import React, { useState } from 'react';
import {
  Trees,
  Search,
  Plus,
  Download,
  Upload,
  Layers,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Edit2,
  Trash2,
  FileCode
} from 'lucide-react';
import { mockEstateBlocks } from '../mockData';
import { EstateBlockGis } from '../types';

export const BlockPolygonManagerView: React.FC = () => {
  const [blocks, setBlocks] = useState<EstateBlockGis[]>(mockEstateBlocks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlock, setSelectedBlock] = useState<EstateBlockGis | null>(null);
  const [isExportingGeoJson, setIsExportingGeoJson] = useState(false);

  const filtered = blocks.filter(b =>
    b.blockCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.divisionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.estateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportGeoJson = () => {
    setIsExportingGeoJson(true);
    setTimeout(() => {
      setIsExportingGeoJson(false);
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(blocks, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "estate_blocks_polygon.geojson");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider">
              Estate Spatial Boundary Registry
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Estate Block Polygons & Spatial Hectarage Master Data</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage oil palm estate block boundaries, palm tree stand counts, planting year, soil classification, and GeoJSON geometry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportGeoJson}
            disabled={isExportingGeoJson}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{isExportingGeoJson ? 'Exporting GeoJSON...' : 'Export GeoJSON Shapefile'}</span>
          </button>
        </div>
      </div>

      {/* Blocks Table Manager */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Block Code or Division..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Total Blocks: <strong className="text-white">{filtered.length}</strong> | Total Area: <strong className="text-teal-300">{filtered.reduce((acc, b) => acc + b.areaHectares, 0).toFixed(1)} Ha</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-[11px] uppercase font-semibold border-b border-slate-700">
                <th className="py-3.5 px-4">Block Code</th>
                <th className="py-3.5 px-4">Division / Estate</th>
                <th className="py-3.5 px-4">Area (Ha)</th>
                <th className="py-3.5 px-4">Palm Trees</th>
                <th className="py-3.5 px-4">Year Planted</th>
                <th className="py-3.5 px-4">Soil & Topo</th>
                <th className="py-3.5 px-4">NDVI Score</th>
                <th className="py-3.5 px-4">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {filtered.map(blk => (
                <tr key={blk.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-mono text-teal-300 font-bold">{blk.blockCode}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{blk.divisionName}</div>
                    <div className="text-[10px] text-slate-400">{blk.estateName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">{blk.areaHectares} Ha</td>
                  <td className="py-3.5 px-4 font-mono">{blk.palmTreeCount.toLocaleString()} Trees</td>
                  <td className="py-3.5 px-4 font-mono">{blk.yearPlanted}</td>
                  <td className="py-3.5 px-4">
                    <div className="text-white">{blk.soilType}</div>
                    <div className="text-[10px] text-slate-400">{blk.topography}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{blk.currentNdviScore}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      blk.ganodermaStatus === 'INFECTED_HOTSPOT'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {blk.ganodermaStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
