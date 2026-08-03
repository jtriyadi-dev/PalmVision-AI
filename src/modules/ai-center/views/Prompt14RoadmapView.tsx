import React from 'react';
import {
  Radio,
  Plane,
  CloudSun,
  Globe,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';

export const Prompt14RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6 text-xs">
      {/* Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-800/60 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold font-mono">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Roadmap Preview — Next Module Prompt 14</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            IoT, Drone Aerial Inspection, Weather Station & Digital Twin Architecture
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
            Pusat integrasi Telemetri Sensor Lapangan, Penerbangan Drone Otonom, Stasiun Cuaca Kebun, Citra Satelit Real-Time, & Model Digital Twin 3D Perkebunan Kelapa Sawit.
          </p>
        </div>
      </div>

      {/* Grid of Planned Capability Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-sm">1. IoT Sensor Gateway & Telemetri</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Streaming data sensor kelembaban tanah, sensor Debit PKS, sensor suhu digester, & Telemetri GPS unit kendaraan panen via MQTT protocol.
          </p>
          <span className="inline-block text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
            MQTT / LoRaWAN Ready
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center">
            <Plane className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-sm">2. Drone Aerial Inspection System</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Pengolahan ortofoto drone multispektral untuk penghitungan otomatis populasi kelapa sawit (Palm Count) & klasifikasi kesehatan tajuk.
          </p>
          <span className="inline-block text-[10px] font-mono font-bold text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
            Multispectral Orthophoto
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 border border-amber-800 flex items-center justify-center">
            <CloudSun className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-sm">3. Automatic Weather Station (AWS)</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Pemantauan curah hujan (mm/hari), radiasi matahari, kecepatan angin, & indeks evapotranspirasi untuk prediksi kebutuhan pemupukan.
          </p>
          <span className="inline-block text-[10px] font-mono font-bold text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
            Real-Time AWS Sensor
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-sm">4. Satellite Monitoring & GIS Advanced</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Integrasi Sentinel-2 & PlanetScope untuk pemantauan indeks vegetasi NDVI, EVI, & pengawasan area konsesi konservasi HCV.
          </p>
          <span className="inline-block text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            Sentinel-2 / PlanetScope
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-white text-sm">5. Digital Twin Perkebunan Kelapa Sawit</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Replikasi digital 3D seluruh blok kebun, pabrik PKS, infrastruktur jalan & jembatan untuk simulasi operasi real-time.
          </p>
          <span className="inline-block text-[10px] font-mono font-bold text-rose-400 bg-rose-950 px-2 py-0.5 rounded border border-rose-800">
            3D Spatial Plantation Twin
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center font-bold">
              Prompt 14
            </div>
            <h3 className="font-extrabold text-white text-sm">Siap Diimplementasikan</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Arsitektur data AI Center (Prompt 13) yang telah dibangun siap menerima aliran data streaming IoT & Drone dari Prompt 14.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-emerald-400 font-bold">READY FOR NEXT PROMPT ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};
