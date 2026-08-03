import React from 'react';
import { Map, Layers, Compass, Satellite, Sparkles, CheckCircle2, ArrowRight, Shield, Globe } from 'lucide-react';

export const Prompt5RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950 via-emerald-950 to-slate-900 border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Map className="h-64 w-64 text-white" />
        </div>
        <div className="relative z-10 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
            <Sparkles className="h-3.5 w-3.5" /> Roadmap Prompt 5 Preparation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Prompt 5: Modul GIS & Digital Plantation Map Engine
          </h1>
          <p className="text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
            Rancangan arsitektur peta spasial interaktif, integrasi polygon blok, foto udara drone, GPS tracking armada, layer kontur topografi, dan fondasi analisis AI Spasial.
          </p>
        </div>
      </div>

      {/* Breakdown GIS Target Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            title: '1. Peta Interaktif & Polygon Blok',
            code: 'GIS_POLYGON',
            desc: 'Rendering polygon GeoJSON blok tanam, afdeling, & batas estate secara realtime.',
            icon: Map,
          },
          {
            title: '2. Layer Drone & Citra Satelit',
            code: 'DRONE_ORTHO',
            desc: 'Layer raster Orthomosaic foto udara drone dengan skala zoom resolusi tinggi.',
            icon: Satellite,
          },
          {
            title: '3. GPS Telemetri & Tracking Armada',
            code: 'FLEET_GPS',
            desc: 'Live posisi alat berat, dump truck DT-08, & traktor di atas peta kebun.',
            icon: Compass,
          },
          {
            title: '4. Heatmap Anomali Panen & NDVI',
            code: 'AI_NDVI_HEATMAP',
            desc: 'Overlay heatmap produktivitas Ton/Ha & indeks kesehatan tajuk kelapa sawit.',
            icon: Globe,
          },
          {
            title: '5. Topografi & Drainage Layer',
            code: 'CONTOUR_DRAIN',
            desc: 'Layer garis kontur ketinggian, arah aliran parit, & titik rawan banjir.',
            icon: Layers,
          },
          {
            title: '6. AI Spatial Anomaly Detector',
            code: 'AI_SPATIAL_SENTINEL',
            desc: 'Deteksi otomatis penyakit Fusarium, serangan Hama Ulat Api, & defisit air.',
            icon: Shield,
          },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {item.code}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Fondasi Master Data Terhubung</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Integration readiness with Prompt 4 Master Data */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Keterhubungan Single Source of Truth
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          Seluruh data geografis pada Prompt 5 akan langsung membaca <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Master Data Blok</span>, <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Infrastruktur</span>, <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">Weather Station</span>, dan <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">IoT Sensor Node</span> dari Master Data Engine yang telah siap dibangun pada Prompt 4 ini.
        </p>
      </div>
    </div>
  );
};
