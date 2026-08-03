import React from 'react';
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
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
  Zap,
  Building2,
  PieChart as PieIcon,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

interface GisDashboardProps {
  onOpenMap: () => void;
}

export const GisDashboardView: React.FC<GisDashboardProps> = ({ onOpenMap }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner KPI Summary */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-emerald-900 via-slate-900 to-slate-900 text-white shadow-xl border border-emerald-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <Compass className="h-64 w-64 text-emerald-400" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>GIS & Spatial Intelligence Foundation</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Pusat Pemetaan Spasial & Digital Plantation Map
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Integrasi peta digital, pemetaan blok, GPS armada, sensor telemetri IoT, stasiun cuaca, serta layer citra satelit dan drone orthomosaic terkoneksi real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenMap}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Compass className="h-4 w-4" />
              <span>Buka Peta Interaktif</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Total Luas Perkebunan',
            value: '14,250 Ha',
            subtitle: '3 Estate • 12 Afdeling',
            icon: Trees,
            color: 'from-emerald-500 to-teal-600',
            badge: '100% Total HGU',
          },
          {
            title: 'Area Terpetakan (Mapped)',
            value: '13,980 Ha',
            subtitle: 'Unmapped: 270 Ha (Buffer)',
            icon: Layers,
            color: 'from-blue-500 to-cyan-600',
            badge: '98.1% Coverage',
          },
          {
            title: 'Total Polygon Terverifikasi',
            value: '428 Polygon',
            subtitle: 'Blok, Sub-Blok & Konservasi',
            icon: MapPin,
            color: 'from-purple-500 to-indigo-600',
            badge: 'RTK GPS ±2cm',
          },
          {
            title: 'Infrastruktur Terdata',
            value: '382.5 Km Jalan',
            subtitle: '142 Km Kanal • 38 Jembatan',
            icon: Ruler,
            color: 'from-amber-500 to-orange-600',
            badge: 'GIS Infrastructure',
          },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {kpi.title}
                  </span>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {kpi.value}
                  </div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block">
                    {kpi.subtitle}
                  </span>
                </div>
                <div className={`p-3 rounded-2xl bg-linear-to-br ${kpi.color} text-white shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  {kpi.badge}
                </span>
                <span className="text-slate-400">Terupdate Hari Ini</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section: IoT, Weather, Vehicles, Drone Devices & Spatial Accuracy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Device & Layer Telemetry Summary */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <Radio className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Perangkat Telemetri & Sensor Spasial Terhubung
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Perangkat terdaftar pada layer GIS real-time PalmVision
                </p>
              </div>
            </div>
            <button className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline">
              <RefreshCw className="h-3.5 w-3.5" /> Synchronize
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Stasiun Cuaca', count: '6 Unit', status: 'All Online', icon: CloudSun, color: 'text-teal-500' },
              { label: 'Sensor IoT Tanah/Water', count: '42 Node', status: '40 Online', icon: Radio, color: 'text-pink-500' },
              { label: 'GPS Truck & Alat', count: '85 Unit', status: 'Live Track', icon: Truck, color: 'text-orange-500' },
              { label: 'Mavic Drone Base', count: '3 Drone', status: 'Ready Mission', icon: Camera, color: 'text-sky-500' },
            ].map((dev, idx) => {
              const Icon = dev.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/50 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`h-5 w-5 ${dev.color}`} />
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-lg font-black text-slate-900 dark:text-white block">
                      {dev.count}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 block">
                      {dev.label}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block pt-0.5">
                      {dev.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI Spatial Intelligence Insight Placeholder Card */}
          <div className="p-4 rounded-xl bg-linear-to-r from-slate-900 to-emerald-950 border border-emerald-500/40 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <Sparkles className="h-4 w-4" />
                <span>AI Spatial Intelligence Insights (Riau Cluster)</span>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                Model: PalmVision-Geo-v2
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deteksi otomatis dari citra drone multispectral terbaru menunjukkan <strong>Blok C04 (Afdeling Beta)</strong> mengalami defisit air & nutrisi ringan seluas 12.2 Ha. Direkomendasikan pembukaan pintu air kanal sekundar K-04 dan aplikasi pupuk MOP dosis khusus.
            </p>
          </div>
        </div>

        {/* Right 1 Col: Spatial Layer Accuracy & Legend Summary */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" /> Akurasi Pemetaan GIS
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-600">RTK Verified</span>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Polygon Boundary Accuracy', score: '99.4%', status: 'Sangat Presisi (WGS84)' },
              { name: 'Road & Drainage Network', score: '98.8%', status: 'Terkoneksi Topologi' },
              { name: 'Tree Crown & SPH Density', score: '97.5%', status: 'AI Count Baseline' },
              { name: 'Building & Asset Markers', score: '100%', status: 'Verified Field GPS' },
            ].map((acc, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{acc.name}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{acc.score}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: acc.score }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 block">{acc.status}</span>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={onOpenMap}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Compass className="h-4 w-4 text-emerald-400" /> Buka Interactive Map Editor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
