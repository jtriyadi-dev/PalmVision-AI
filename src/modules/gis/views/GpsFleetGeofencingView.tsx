import React, { useState } from 'react';
import {
  Navigation,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Radio,
  Clock,
  Play,
  RotateCw,
  Search,
  CheckCircle2
} from 'lucide-react';
import { mockLiveGpsPins, mockGeofenceZones } from '../mockData';
import { LiveGpsPin, GeofenceZone } from '../types';

export const GpsFleetGeofencingView: React.FC = () => {
  const [gpsPins] = useState<LiveGpsPin[]>(mockLiveGpsPins);
  const [zones] = useState<GeofenceZone[]>(mockGeofenceZones);
  const [isSimulatingPlayback, setIsSimulatingPlayback] = useState(false);

  const handleSimulatePlayback = () => {
    setIsSimulatingPlayback(true);
    setTimeout(() => {
      setIsSimulatingPlayback(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
              GPS Telemetry & Spatial Geofencing
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Live Vehicle Fleet Tracking & Geofence Boundary Rules</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Realtime GPS tracking for FFB dump trucks, tractors, excavators, and field mandor motorbikes with automated geofence perimeter alerts.
          </p>
        </div>

        <button
          onClick={handleSimulatePlayback}
          disabled={isSimulatingPlayback}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
        >
          <Play className={`h-4 w-4 ${isSimulatingPlayback ? 'animate-spin' : ''}`} />
          <span>{isSimulatingPlayback ? 'Playing GPS Route Replay...' : 'Simulate GPS Route Playback'}</span>
        </button>
      </div>

      {/* Grid for Live Fleet Cards & Geofence Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Fleet Tracker Table (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Live GPS Telemetry Vehicles & Field Personnel</span>
            <span className="text-xs text-indigo-400 font-mono">{gpsPins.length} Units Active</span>
          </h3>

          <div className="space-y-3">
            {gpsPins.map(pin => (
              <div key={pin.id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-indigo-300 font-mono text-[10px] font-bold">
                      {pin.unitCode}
                    </span>
                    <h4 className="text-sm font-bold text-white">{pin.driverOrMandorName}</h4>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    pin.engineStatus === 'RUNNING' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700 text-slate-400'
                  }`}>
                    {pin.engineStatus}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Speed</span>
                    <strong className="text-white font-mono">{pin.speedKmH} km/h</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Current Location Zone</span>
                    <strong className="text-indigo-300">{pin.currentGeofenceZone}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Last GPS Ping</span>
                    <strong className="text-slate-300 font-mono">{pin.lastUpdated}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Geofence Perimeter Zones (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center justify-between">
            <span>Active Geofence Boundaries</span>
            <span className="text-xs text-emerald-400 font-mono">{zones.length} Zones</span>
          </h3>

          <div className="space-y-3">
            {zones.map(z => (
              <div key={z.id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-teal-300 font-mono text-[10px] font-bold">
                    {z.zoneType}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{z.radiusOrAreaKm}</span>
                </div>

                <h4 className="text-xs font-bold text-white">{z.zoneName}</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">{z.activeRule}</p>

                <div className="pt-2 border-t border-slate-700 text-[10px] font-mono flex items-center justify-between">
                  <span className="text-slate-400">Speed Limit: <strong className="text-white">{z.speedLimitKmH} km/h</strong></span>
                  <span className={z.activeViolationsCount > 0 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                    Violations: {z.activeViolationsCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
