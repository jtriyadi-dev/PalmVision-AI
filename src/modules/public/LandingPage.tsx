import React, { useState } from 'react';
import { 
  Trees, 
  ShieldCheck, 
  Sparkles, 
  BarChart3, 
  Map, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  Lock, 
  Globe, 
  Layers, 
  Key, 
  PhoneCall,
  Zap,
  Building2
} from 'lucide-react';
import { WhiteLabelConfig, LicenseInfo } from '../../types';

interface LandingPageProps {
  whiteLabel: WhiteLabelConfig;
  license: LicenseInfo;
  onGoToLogin: () => void;
  onOpenLicenseActivate: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  whiteLabel,
  license,
  onGoToLogin,
  onOpenLicenseActivate,
}) => {
  const [hectares, setHectares] = useState(5000);
  const [tbsPrice, setTbsPrice] = useState(2600);

  // ROI estimation calculation
  const annualTonnage = (hectares * 22).toFixed(0); // 22 Ton TBS/Ha/Year
  const annualRevenue = (Number(annualTonnage) * tbsPrice).toLocaleString('id-ID');
  const efficiencySaving = (Number(annualTonnage) * tbsPrice * 0.085).toLocaleString('id-ID'); // 8.5% efficiency gain

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Commercial Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-emerald-500/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-400 text-slate-950 font-black shadow-lg">
            <Trees className="h-6 w-6" />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white">{whiteLabel.appName}</span>
            <span className="text-[10px] font-bold text-amber-300 block uppercase tracking-widest">
              Smart Plantation AI
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-emerald-400 transition-colors">Fitur Unggulan</a>
          <a href="#roi" className="hover:text-emerald-400 transition-colors">Kalkulator ROI</a>
          <a href="#pricing" className="hover:text-emerald-400 transition-colors">Model Lisensi</a>
          <a href="#compliance" className="hover:text-emerald-400 transition-colors">Sertifikasi ISPO/RSPO</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLicenseActivate}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-amber-300 font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Key className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Aktivasi Kunci</span>
          </button>
          <button
            onClick={onGoToLogin}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-extrabold text-xs hover:from-emerald-500 hover:to-emerald-400 shadow-lg shadow-emerald-950 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Masuk Portal</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 max-w-7xl mx-auto text-center space-y-8 overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-amber-300 text-xs font-bold shadow-inner">
          <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" />
          <span>Generasi Baru ERP Sawit Indonesia Berbasis Gemini 3.6 AI</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
          One Platform to Manage the Entire <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-amber-300">Palm Oil Plantation</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Kelola seluruh operasional perkebunan kelapa sawit dari <strong className="text-white">Blok Tanam, BKM Panen, Pemupukan, Mill PKS, GIS Mapping, hingga Costing ERP</strong> dengan prediksi AI real-time & dukungan Sync Lapangan Offline.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onGoToLogin}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 font-black text-sm hover:from-emerald-400 hover:to-emerald-300 shadow-xl shadow-emerald-950 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Buka Portal Demo Enterprise</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section id="roi" className="py-16 bg-slate-900/60 border-y border-slate-800 px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Kalkulator Estimasi ROI Perkebunan</h2>
            <p className="text-xs text-slate-400">Hitung potensi penghematan biaya operasional & peningkatan yield panen TBS Anda</p>
          </div>

          <div className="p-8 rounded-3xl border border-emerald-500/30 bg-slate-900/90 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            <div className="space-y-6">
              <div>
                <label className="block text-slate-300 font-bold mb-2">Total Luas Areal Kebun (Hektare): {hectares.toLocaleString()} Ha</label>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={hectares}
                  onChange={(e) => setHectares(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-2">Harga TBS Rata-Rata (Rp/Kg): Rp {tbsPrice.toLocaleString('id-ID')}</label>
                <input
                  type="range"
                  min="1500"
                  max="4000"
                  step="100"
                  value={tbsPrice}
                  onChange={(e) => setTbsPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-emerald-500/20 space-y-4">
              <div className="text-slate-400 text-[11px]">Estimasi Produksi TBS Per Tahun</div>
              <div className="text-2xl font-black text-amber-300">{Number(annualTonnage).toLocaleString('id-ID')} Ton TBS</div>

              <div className="text-slate-400 text-[11px] pt-2">Estimasi Potensi Nilai Efisiensi AI (8.5% Gain)</div>
              <div className="text-3xl font-black text-emerald-400">Rp {efficiencySaving} / Tahun</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Models */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-white">Model Lisensi Commercial Grade</h2>
          <p className="text-xs text-slate-400">Pilih opsi deployment Cloud SaaS, On-Premise White Label, atau Koperasi Plasma</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-emerald-400 font-bold text-sm">SaaS Enterprise Cloud</div>
              <div className="text-3xl font-black">Rp 12.500 <span className="text-xs font-normal text-slate-400">/ Ha / Tahun</span></div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Multi Estate & Multi Division</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Gemini 3.6 Harvest Prediction</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Auto Backups & SLA 99.9%</li>
              </ul>
            </div>
            <button onClick={onGoToLogin} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500">Pilih SaaS Cloud</button>
          </div>

          <div className="p-6 rounded-3xl border-2 border-emerald-500 bg-slate-900 space-y-6 flex flex-col justify-between relative shadow-2xl">
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">PALING POPULER</div>
            <div className="space-y-4">
              <div className="text-amber-300 font-bold text-sm">On-Premise White Label</div>
              <div className="text-3xl font-black">Custom <span className="text-xs font-normal text-slate-400">/ Perpetual License</span></div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-400" /> Full Source Code & Branding</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-400" /> Dedicated Local Server & Private AI</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-amber-400" /> HWID Device Binding & Offline Sync</li>
              </ul>
            </div>
            <button onClick={onGoToLogin} className="w-full py-3 rounded-xl bg-amber-400 text-slate-950 font-black hover:bg-amber-300">Hubungi Sales Enterprise</button>
          </div>

          <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-emerald-400 font-bold text-sm">Koperasi Plasma Sawit</div>
              <div className="text-3xl font-black">Rp 5.000 <span className="text-xs font-normal text-slate-400">/ Ha / Tahun</span></div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Pencatatan TBS Petani Swadaya</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Transparansi Penimbangan PKS</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Laporan Bagi Hasil Mandiri</li>
              </ul>
            </div>
            <button onClick={onGoToLogin} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500">Pilih Koperasi Plasma</button>
          </div>
        </div>
      </section>

      {/* Footer Commercial */}
      <footer className="border-t border-slate-800 py-8 px-6 text-center text-xs text-slate-500 space-y-2">
        <p>{whiteLabel.copyright}</p>
        <p>{whiteLabel.footerText}</p>
      </footer>
    </div>
  );
};
