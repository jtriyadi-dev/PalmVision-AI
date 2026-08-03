import React, { useState } from 'react';
import {
  Plane,
  Camera,
  MapPin,
  Layers,
  Sparkles,
  Play,
  CheckCircle2,
  Clock,
  Zap,
  Sliders,
  Eye,
  FileText
} from 'lucide-react';
import { mockDrones, mockDroneMissions } from '../mockData';
import { DroneMission } from '../types';

export const DroneMappingMissionView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'FLEET' | 'MISSIONS' | 'ORTHOMOSAIC' | 'NDVI'>('MISSIONS');
  const [selectedIndex, setSelectedIndex] = useState<'NDVI' | 'NDRE' | 'SAVI' | 'CANOPY'>('NDVI');
  const [missions, setMissions] = useState<DroneMission[]>(mockDroneMissions);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Autonomous Drone Fleet, Flight Missions & Mapping</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Plan RTK waypoint surveys, generate orthomosaics, and run AI multispectral palm canopy NDVI analysis.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
          {[
            { id: 'FLEET', label: 'Drone Fleet' },
            { id: 'MISSIONS', label: 'Flight Missions' },
            { id: 'ORTHOMOSAIC', label: 'Orthomosaic Mapping' },
            { id: 'NDVI', label: 'NDVI & AI Canopy' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'FLEET' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockDrones.map(dr => (
            <div key={dr.id} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{dr.modelName}</h3>
                  <p className="text-[10px] font-mono text-indigo-400">{dr.droneCode}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  dr.status === 'READY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  dr.status === 'IN_FLIGHT' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {dr.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span className="text-slate-400">Assigned Pilot:</span>
                  <span className="font-semibold text-white">{dr.pilotName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span className="text-slate-400">Camera / Sensor Payload:</span>
                  <span className="text-[10px] text-indigo-300 font-medium">{dr.cameraType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span className="text-slate-400">Firmware Version:</span>
                  <span className="font-mono text-slate-300">{dr.firmware}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                  <span className="text-slate-400">Battery Capacity:</span>
                  <span className="font-bold text-emerald-400">{dr.batteryPct}%</span>
                </div>
                <div className="flex justify-between py-1 text-slate-300">
                  <span className="text-slate-400">Total Flight Hours:</span>
                  <span className="font-bold text-amber-300">{dr.flightHoursTotal} hrs</span>
                </div>
              </div>

              <div className="pt-2">
                <button className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition flex items-center justify-center gap-2">
                  <Play className="h-3.5 w-3.5" />
                  <span>Launch Mission Controller</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'MISSIONS' && (
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Planned & In-Progress Drone Flight Missions</h3>
            <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500">
              + Plan Waypoint Mission
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/50">
                  <th className="py-2.5 px-3 font-semibold">Mission No & Name</th>
                  <th className="py-2.5 px-3 font-semibold">Target Block</th>
                  <th className="py-2.5 px-3 font-semibold">Mission Type</th>
                  <th className="py-2.5 px-3 font-semibold">Altitude & Speed</th>
                  <th className="py-2.5 px-3 font-semibold">Waypoints & Duration</th>
                  <th className="py-2.5 px-3 font-semibold">Scheduled Date</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-200">
                {missions.map(m => (
                  <tr key={m.id} className="hover:bg-slate-700/30 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white text-sm">{m.missionName}</div>
                      <div className="text-[10px] font-mono text-indigo-400">{m.missionNo}</div>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-200">{m.targetBlock}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-700 text-indigo-300 text-[10px] font-bold">
                        {m.missionType}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <div>Alt: {m.plannedAltitudeMeters} m</div>
                      <div className="text-[10px] text-slate-400">Speed: {m.flightSpeedMps} m/s</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      <div>Waypoints: {m.waypointCount}</div>
                      <div className="text-[10px] text-amber-300">Est: {m.estimatedTimeMin} mins</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{m.dateScheduled}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        m.approvalStatus === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                        m.approvalStatus === 'IN_PROGRESS' ? 'bg-indigo-500/20 text-indigo-300 animate-pulse' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {m.approvalStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'ORTHOMOSAIC' && (
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Stitched High-Resolution Orthomosaic Projects</h3>
            <span className="text-xs text-indigo-400">Resolution: 2.5 cm/pixel</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700 group h-64">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80"
                alt="Orthomosaic Block A"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
                <span className="px-2 py-0.5 rounded bg-emerald-500/80 text-white text-[10px] font-bold w-fit mb-1">
                  Orthophoto RGB
                </span>
                <h4 className="text-base font-bold text-white">Riau Division 01 Block A10-A15 Orthomosaic</h4>
                <p className="text-xs text-slate-300 mt-0.5">Coverage: 450 Hectares | Captured: Aug 02, 2026</p>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-700 group h-64">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="3D Elevation DEM"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-end">
                <span className="px-2 py-0.5 rounded bg-indigo-500/80 text-white text-[10px] font-bold w-fit mb-1">
                  Digital Surface Model (DSM)
                </span>
                <h4 className="text-base font-bold text-white">Canopy Height & Peat Topography Elevation</h4>
                <p className="text-xs text-slate-300 mt-0.5">3D Contour Map & Drain slope modeling</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'NDVI' && (
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                Multispectral Vegetation Index & AI Tree Counting
              </h3>
              <p className="text-xs text-slate-400">Chlorophyll health, nutrient stress detection & crown canopy density.</p>
            </div>

            <div className="flex items-center gap-2">
              {(['NDVI', 'NDRE', 'SAVI', 'CANOPY'] as const).map(idx => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                    selectedIndex === idx ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {idx}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-lg">
              <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold w-fit">
                AI Vision Detection Result: {selectedIndex}
              </div>
              <h4 className="text-xl font-bold text-white">12,840 Palms Inspected (Health Index: 0.78 Avg)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Multispectral RedEdge sensor flags <b>142 palms</b> with nitrogen deficiency symptoms in Block A12. Automated replanting tag generated.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-emerald-400 font-bold">● Healthy (88%)</span>
                <span className="text-amber-400 font-bold">● Moderate Stress (9%)</span>
                <span className="text-rose-400 font-bold">● Severe Stress (3%)</span>
              </div>
            </div>

            <div className="w-full md:w-80 h-44 rounded-xl border border-emerald-500/40 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80"
                alt="NDVI Heatmap"
                className="w-full h-full object-cover filter contrast-125 saturate-200"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur p-2 rounded text-[10px] text-emerald-300 font-mono text-center">
                NDVI Spectrum Range: -0.1 to +0.92
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
