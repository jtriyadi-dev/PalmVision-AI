import React, { useState } from 'react';
import {
  Boxes,
  Building,
  Radio,
  Truck,
  Droplets,
  CloudRain,
  MapPin,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Search,
  Maximize2
} from 'lucide-react';
import { mockDigitalTwinObjects } from '../mockData';
import { DigitalTwinObject } from '../types';

export const DigitalTwinView: React.FC = () => {
  const [selectedObjectType, setSelectedObjectType] = useState<string>('ALL');
  const [selectedObject, setSelectedObject] = useState<DigitalTwinObject>(mockDigitalTwinObjects[1]);

  const filteredObjects = selectedObjectType === 'ALL'
    ? mockDigitalTwinObjects
    : mockDigitalTwinObjects.filter(o => o.objectType === selectedObjectType);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="h-6 w-6 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Digital Twin Plantation Engine</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            2D Spatial Digital Status representation connecting physical estate assets, blocks, canals, weather nodes, and mills.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold flex items-center gap-1.5">
            <Activity className="h-4 w-4 animate-pulse text-purple-400" />
            <span>Digital Twin Realtime Sync Active</span>
          </span>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Tree Hierarchy Inspector (1 col) */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h3 className="text-sm font-bold text-white">Spatial Digital Objects</h3>
            <select
              value={selectedObjectType}
              onChange={e => setSelectedObjectType(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
            >
              <option value="ALL">All Types</option>
              <option value="COMPANY">Company</option>
              <option value="ESTATE">Estate</option>
              <option value="AFDELING">Afdeling</option>
              <option value="BLOCK">Block</option>
              <option value="CANAL">Canal</option>
              <option value="MILL">Mill</option>
            </select>
          </div>

          <div className="space-y-2">
            {filteredObjects.map(obj => (
              <div
                key={obj.id}
                onClick={() => setSelectedObject(obj)}
                className={`p-3.5 rounded-xl border transition cursor-pointer ${
                  selectedObject.id === obj.id
                    ? 'bg-purple-950/60 border-purple-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-700/60 hover:bg-slate-900 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      obj.statusColor === 'GREEN' ? 'bg-emerald-400 animate-pulse' :
                      obj.statusColor === 'YELLOW' ? 'bg-amber-400' : 'bg-rose-500'
                    }`} />
                    <h4 className="text-xs font-bold text-white">{obj.objectName}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300">{obj.objectCode}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1">{obj.metricsSummary}</div>
                <div className="text-[9px] text-slate-500 mt-1">Sync: {obj.lastSync}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Twin Visual Stage & Telemetry Inspector (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950/30 border border-slate-700 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase">
                  {selectedObject.objectType} TWIN NODE
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedObject.objectName}</h3>
                <p className="text-xs text-slate-400">Code: {selectedObject.objectCode} | Location: {selectedObject.locationBlock}</p>
              </div>

              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  selectedObject.statusColor === 'GREEN' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  selectedObject.statusColor === 'YELLOW' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  Status: {selectedObject.statusColor}
                </span>
              </div>
            </div>

            {/* 2D Digital Twin Interactive Representation Grid */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Digital Twin Sub-System Topology
              </h4>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400">Microclimate Node</span>
                  <div className="text-sm font-bold text-emerald-300">AWS Station #01</div>
                  <div className="text-[10px] text-slate-400">Temp: 31.8°C | Rain: 28mm</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400">Hydrology Line</span>
                  <div className="text-sm font-bold text-rose-400">Canal #2 (185cm)</div>
                  <div className="text-[10px] text-rose-300">Flood Threshold Alert</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400">Heavy Fleet Active</span>
                  <div className="text-sm font-bold text-white">4 Tractors Working</div>
                  <div className="text-[10px] text-slate-400">GPS Locked (18 km/h)</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-400">Peat Soil Health</span>
                  <div className="text-sm font-bold text-amber-300">Moisture 22.1%</div>
                  <div className="text-[10px] text-amber-300">pH 4.8 Acid Peat</div>
                </div>
              </div>
            </div>

            {/* Live Metrics Log Stream */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-white">Realtime Digital Twin Event Bus</div>
              <p className="text-slate-400 text-[11px]">
                {selectedObject.metricsSummary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
