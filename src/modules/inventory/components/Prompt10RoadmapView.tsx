import React from 'react';
import {
  Boxes,
  Truck,
  Wrench,
  Fuel,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Gauge,
  Cpu,
} from 'lucide-react';

export const Prompt10RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 border border-indigo-800/60 text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-3 border-b border-indigo-800/50 pb-4">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Truck className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
              Roadmap Pengembangan Modul Selanjutnya
            </span>
            <h2 className="text-xl font-black text-white">
              Prompt 10 — Asset Management, Workshop & Fleet Management System
            </h2>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Modul berikutnya akan menghubungkan gudang persediaan (suku cadang & BBM) dengan manajemen aset perusahaan,
          alat berat (Excavator, Traktor, Buldozer), armada kendaraan pengangkut TBS (Dump Truck, Light Truck),
          operasional workshop/bengkel kebun, jadwal Preventive Maintenance, Corrective Maintenance, pemantauan konsumsi BBM (Fuel Management),
          GPS Telematics tracking, serta AI Predictive Maintenance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="font-bold text-indigo-400 flex items-center gap-1.5">
              <Truck className="h-4 w-4" /> Heavy Machinery & Fleet
            </div>
            <p className="text-slate-400 text-[11px]">
              Tracking Excavator, Tractor, Dump Truck, Odometer / Hour Meter (HM/KM)
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Wrench className="h-4 w-4" /> Workshop & Maintenance
            </div>
            <p className="text-slate-400 text-[11px]">
              Preventive Maintenance, Service Work Orders, Integrasi Sparepart Gudang
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <Fuel className="h-4 w-4" /> Fuel & GPS Telematics
            </div>
            <p className="text-slate-400 text-[11px]">
              Monitoring Jatah Solar B35, Rasio Liter/KM, Geofencing Kebun & Speeding Alerts
            </p>
          </div>
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Gauge className="h-4 w-4 text-indigo-600" /> AI Predictive Maintenance Foundation
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Deteksi dini potensi kerusakan transmisi traktor & mesin PKS sebelum timbul breakdown berdasarkan analisis tren HM/KM & histori ganti oli.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Fuel className="h-4 w-4 text-amber-600" /> Smart Fuel Station Integration
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Pencatatan pengisian BBM Solar B35 dari tangki utama gudang ke unit armada dengan QR Scan dispenser & sensor flowmeter.
          </p>
        </div>
      </div>
    </div>
  );
};
