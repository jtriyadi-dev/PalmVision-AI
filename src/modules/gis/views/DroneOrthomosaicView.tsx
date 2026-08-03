import React, { useState } from 'react';
import {
  Plane,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sparkles,
  Maximize2,
  RefreshCw,
  Search,
  Scan
} from 'lucide-react';
import { mockDroneSurveys } from '../mockData';
import { DroneFlightSurvey } from '../types';

export const DroneOrthomosaicView: React.FC = () => {
  const [surveys] = useState<DroneFlightSurvey[]>(mockDroneSurveys);
  const [selectedSurvey, setSelectedSurvey] = useState<DroneFlightSurvey>(mockDroneSurveys[0]);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [detectedTreesCount, setDetectedTreesCount] = useState<number | null>(null);

  const handleRunAiTreeCount = () => {
    setAiAnalyzing(true);
    setTimeout(() => {
      setAiAnalyzing(false);
      setDetectedTreesCount(selectedSurvey.treesDetectedCount);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider">
              UAV / Drone Orthomosaic Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Drone Photogrammetry & AI Palm Stand Count</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            High-resolution orthomosaic mapping (&lt; 2.5cm/pixel), automated tree canopy count, missing palm gap detection, and health AI analysis.
          </p>
        </div>

        <button
          onClick={handleRunAiTreeCount}
          disabled={aiAnalyzing}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
        >
          <Sparkles className={`h-4 w-4 ${aiAnalyzing ? 'animate-spin' : ''}`} />
          <span>{aiAnalyzing ? 'Running AI Tree Counter...' : 'Run AI Palm Tree Stand Detection'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Survey List Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Drone Mission Flights</h3>

          <div className="space-y-3">
            {surveys.map(srv => (
              <div
                key={srv.id}
                onClick={() => {
                  setSelectedSurvey(srv);
                  setDetectedTreesCount(null);
                }}
                className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                  selectedSurvey.id === srv.id
                    ? 'bg-sky-950/80 border-sky-500 text-white shadow-lg'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-sky-300 font-mono text-[10px] font-bold">
                    {srv.flightCode}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{srv.flightDate}</span>
                </div>

                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{srv.blockCode} Survey</h4>
                  <span className="text-xs text-sky-400 font-bold">{srv.coveredAreaHa} Ha</span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Res: {srv.resolutionCmPerPixel} cm/px</span>
                  <span className="text-emerald-400 font-mono">{srv.treesDetectedCount} Palms</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orthomosaic Image Preview Stage (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">{selectedSurvey.flightCode}</span>
              <h3 className="text-sm font-bold text-white">Orthomosaic Photogrammetry • {selectedSurvey.blockCode}</h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
                Resolution: {selectedSurvey.resolutionCmPerPixel} cm / pixel
              </span>
            </div>
          </div>

          <div className="relative h-[420px] rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <img
              src={selectedSurvey.orthomosaicUrl}
              alt="Drone Orthomosaic"
              className="w-full h-full object-cover filter brightness-105 contrast-110"
            />

            {/* AI Bounding Boxes Simulation */}
            {detectedTreesCount && (
              <div className="absolute inset-0 bg-sky-950/20 border-2 border-sky-400/60 p-4 flex flex-col justify-between pointer-events-none">
                <div className="bg-slate-900/90 p-3 rounded-xl border border-sky-400 text-xs font-mono text-sky-300 max-w-xs shadow-2xl">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>AI Palm Detection Complete</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Detected: <strong className="text-emerald-400">{detectedTreesCount}</strong> Healthy Palms<br />
                    Missing Stand Gaps: <strong className="text-amber-400">{selectedSurvey.missingTreesCount}</strong>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 text-[10px] block">Covered Survey Area</span>
              <span className="text-sm font-bold text-white">{selectedSurvey.coveredAreaHa} Hectares</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 text-[10px] block">Detected Palm Stands</span>
              <span className="text-sm font-bold text-emerald-400">{selectedSurvey.treesDetectedCount} Trees</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-slate-400 text-[10px] block">Missing Palm Tree Gaps</span>
              <span className="text-sm font-bold text-amber-400">{selectedSurvey.missingTreesCount} Gaps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
