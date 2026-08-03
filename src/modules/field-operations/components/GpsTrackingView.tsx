import React from 'react';
import { MapPin, Navigation, Wifi, Battery, Clock, Activity, User, Compass } from 'lucide-react';
import { GpsTrackingPoint } from '../types';

interface GpsTrackingViewProps {
  gpsTracks: GpsTrackingPoint[];
}

export const GpsTrackingView: React.FC<GpsTrackingViewProps> = ({ gpsTracks }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Interactive GIS Map Simulation Container */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Compass className="h-5 w-5 text-emerald-400" />
              Live Field Personnel GPS Tracking & Breadcrumb Trail
            </h3>
            <p className="text-xs text-slate-400">
              Pemantauan pergerakan mandor dan supervisor kebun secara real-time terhubung dengan Peta GIS
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              ● Live Stream GPS Active
            </span>
          </div>
        </div>

        {/* Visual Map Representation */}
        <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
          {/* Simulated Grid Background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(#10b981 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Map Overlay Pins */}
          {gpsTracks.map((gt, idx) => (
            <div
              key={gt.id}
              className="absolute flex flex-col items-center group cursor-pointer transition-transform hover:scale-110 z-10"
              style={{
                top: `${30 + idx * 25}%`,
                left: `${25 + idx * 30}%`,
              }}
            >
              <div className="p-1.5 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs shadow-lg animate-bounce">
                <MapPin className="h-5 w-5 fill-emerald-950 text-emerald-400" />
              </div>
              <div className="px-2 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-[10px] font-bold text-white shadow-md mt-1 whitespace-nowrap">
                {gt.userName} ({gt.currentLocation.blockCode})
              </div>
            </div>
          ))}

          <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-emerald-400 block">Status Koneksi GPS:</span>
            <span className="text-slate-300 text-[11px]">Akurasi High-Precision High-Accuracy (± 2 Meter)</span>
          </div>
        </div>
      </div>

      {/* Detail Tracking Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gpsTracks.map((gt) => (
          <div
            key={gt.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={gt.avatarUrl}
                  alt={gt.userName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">
                    {gt.userName}
                  </h4>
                  <span className="text-xs text-slate-500">{gt.role}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                  {gt.batteryPct}% Battery 🔋
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">{gt.lastUpdated}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-1 text-xs">
              <span className="text-slate-400 text-[10px] block">Titik Koordinat & Pasar Pikul</span>
              <div className="font-bold text-emerald-600 dark:text-emerald-400">
                {gt.currentLocation.lat}, {gt.currentLocation.lng} ({gt.currentLocation.blockCode})
              </div>
              <p className="text-slate-500 text-[11px]">{gt.currentLocation.address}</p>
            </div>

            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 pt-1">
              <span>Kecepatan: {gt.speedKmh} km/jam</span>
              <span className="text-emerald-600">Jarak Hari Ini: {gt.todayDistanceKm} KM</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
