import React from 'react';
import { Truck, CheckCircle2, ArrowRight, Layers, QrCode, Sparkles, MapPin, BarChart3, Camera } from 'lucide-react';

export const Prompt8RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Roadmap Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white border border-emerald-800/50 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
          <Truck className="h-4 w-4" />
          <span>Next Phase — Enterprise Palm Oil System</span>
        </div>
        <h2 className="text-xl font-black text-white">
          Persiapan & Roadmap Prompt 8 — Harvest Management System
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Modul berikutnya akan memfokuskan pengelolaan hasil panen TBS (Tandan Buah Segar), tim pemanen, grading TBS di TPH, timbang pabrik, pengangkutan truk, integrasi PKS (Pabrik Kelapa Sawit), dan Harvest AI Intelligence.
        </p>
      </div>

      {/* Feature Modules Checklist for Prompt 8 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Truck className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            1. Panen TBS & Tim Pemanen
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pencatatan produksi TBS harian, janjang panen, estimasi tonase, penetapan regu pemanen, dan perhitungan kualifikasi ancak panen.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <QrCode className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            2. Digital Grading & QR Code TPH
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Inspeksi grading buah matang, mentah, lewat matang, tangkai panjang, serta cetak label QR Code TPH (Tempat Pengumpulan Hasil).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            3. Penimbangan & Integration PKS
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Surat Pengantar Tandan (SPT), timbang bruto-tarra pabrik, perhitungan Rendemen Minyak Sawit (CPO Extract Ratio), dan restan buah.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
            <Camera className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            4. Foto Panen & GPS Fleet Tracking
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Galeri foto tumpukan TBS di TPH, rute perjalanan truk pengangkut TBS dari kebun ke jembatan timbang PKS.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            5. AI Harvest Intelligence
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Prediksi estimasi panen minggu depan berbasis siklus pembuahan, deteksi fraud penimbangan, dan optimasi rotasi panen.
          </p>
        </div>
      </div>
    </div>
  );
};
