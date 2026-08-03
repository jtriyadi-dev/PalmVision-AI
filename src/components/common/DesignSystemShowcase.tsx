import React, { useState } from 'react';
import { 
  Palette, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Info, 
  Sparkles, 
  Sliders, 
  Search, 
  Calendar, 
  Download, 
  Eye, 
  Plus, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Trees
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const [toggleVal, setToggleVal] = useState(true);
  const [sliderVal, setSliderVal] = useState(75);
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'cards' | 'tables'>('tokens');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white shadow-xl relative overflow-hidden border border-emerald-700/40">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Palette className="h-48 w-48 text-emerald-300" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="px-2.5 py-1 rounded-md bg-amber-400 text-emerald-950 text-xs font-bold uppercase tracking-wider">
            PalmVision UI System
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            Design System & Component Specification
          </h2>
          <p className="text-sm text-emerald-100/90 mt-1 leading-relaxed">
            Spesifikasi komponen UI/UX enterprise khusus untuk aplikasi perkebunan kelapa sawit. Memenuhi standar kontras WCAG AA, pendukung mode gelap charcoal, dan optimasi input layar sentuh di lapangan.
          </p>

          <div className="flex flex-wrap gap-2 mt-4 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('tokens')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                activeTab === 'tokens'
                  ? 'bg-white text-emerald-900 border-white font-bold'
                  : 'bg-emerald-800/60 text-emerald-100 border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              Color Tokens & Typography
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                activeTab === 'components'
                  ? 'bg-white text-emerald-900 border-white font-bold'
                  : 'bg-emerald-800/60 text-emerald-100 border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              Buttons & Form Inputs
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                activeTab === 'cards'
                  ? 'bg-white text-emerald-900 border-white font-bold'
                  : 'bg-emerald-800/60 text-emerald-100 border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              Modern Cards & Glassmorphism
            </button>
            <button
              onClick={() => setActiveTab('tables')}
              className={`px-3 py-1.5 rounded-lg border transition-colors ${
                activeTab === 'tables'
                  ? 'bg-white text-emerald-900 border-white font-bold'
                  : 'bg-emerald-800/60 text-emerald-100 border-emerald-700 hover:bg-emerald-800'
              }`}
            >
              Data Grid & Skeletons
            </button>
          </div>
        </div>
      </div>

      {/* Tab 1: Color Tokens & Typography */}
      {activeTab === 'tokens' && (
        <div className="space-y-6">
          {/* Color Palette Cards */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              PalmVision Color Palette Tokens
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-emerald-600 text-white shadow-sm">
                <div className="font-bold">Primary Emerald</div>
                <div className="text-[10px] opacity-80 mt-1">#059669 • 600</div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-900 text-emerald-100 shadow-sm">
                <div className="font-bold">Dark Forest</div>
                <div className="text-[10px] opacity-80 mt-1">#064E3B • 900</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500 text-slate-950 shadow-sm">
                <div className="font-bold">Gold Accent</div>
                <div className="text-[10px] opacity-80 mt-1">#D97706 • Accent</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 text-slate-100 shadow-sm">
                <div className="font-bold">Charcoal Dark</div>
                <div className="text-[10px] opacity-80 mt-1">#111827 • Dark BG</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-600 text-white shadow-sm">
                <div className="font-bold">Danger Red</div>
                <div className="text-[10px] opacity-80 mt-1">#E11D48 • Alert</div>
              </div>
              <div className="p-3 rounded-xl bg-blue-600 text-white shadow-sm">
                <div className="font-bold">Info Blue</div>
                <div className="text-[10px] opacity-80 mt-1">#2563EB • Info</div>
              </div>
            </div>
          </div>

          {/* Typography Scale */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Typography Scale (Plus Jakarta Sans / Inter)
            </h3>

            <div className="space-y-3">
              <div className="border-b pb-2 border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Heading 1 Display (32px)</span>
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Panen TBS Estate Teluk Dalam
                </h1>
              </div>

              <div className="border-b pb-2 border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Heading 2 Section (24px)</span>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Laporan Produksi & Kerapatan Buah Matang
                </h2>
              </div>

              <div className="border-b pb-2 border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-400">Heading 3 Subsection (18px)</span>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Distribusi Pupuk NPK Blok B12
                </h3>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400">Body Text (14px / 1.6 Line Height)</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                  Setiap mandor wajib memverifikasi hasil janjang TBS yang dipanen di TPH (Tempat Pengumpulan Hasil) menggunakan aplikasi mobile PalmVision AI secara offline sebelum diangkut oleh Dump Truck ke Pabrik Kelapa Sawit.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Buttons & Form Inputs */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Button Variants</h3>
              <div className="flex flex-wrap gap-3 items-center">
                <button className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-md shadow-emerald-700/20 hover:bg-emerald-700 transition-colors">
                  Primary Emerald
                </button>
                <button className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-semibold text-xs hover:bg-slate-800 transition-colors">
                  Secondary Dark
                </button>
                <button className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-sm hover:bg-amber-400 transition-colors">
                  Accent Gold
                </button>
                <button className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Outline Neutral
                </button>
                <button className="px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold text-xs hover:bg-rose-700 transition-colors">
                  Danger Action
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Form Controls</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Search Mandor / Kebun
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ketik nama mandor..."
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-9 pr-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pilih Afdeling Tanam
                  </label>
                  <select className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500">
                    <option>Afdeling Alpha (TM 2018)</option>
                    <option>Afdeling Beta (TM 2015)</option>
                    <option>Afdeling Gamma (TBM 2022)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Tanggal Kegiatan Panen
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      defaultValue="2026-08-03"
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Toggles & Sliders</h3>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setToggleVal(!toggleVal)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      toggleVal ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        toggleVal ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Offline Sync Auto ({toggleVal ? 'Aktif' : 'Non-aktif'})
                  </span>
                </div>

                <div className="flex items-center gap-3 w-64">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    Rotasi Panen: {sliderVal} Hari
                  </span>
                  <input
                    type="range"
                    min="5"
                    max="14"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Modern Cards & Glassmorphism */}
      {activeTab === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl border border-emerald-900/10 dark:border-emerald-500/20 bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800/80 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
                Produksi TBS Hari Ini
              </span>
              <div className="p-2 rounded-xl bg-emerald-600 text-white shadow-sm">
                <Trees className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
              142.85 <span className="text-sm font-semibold text-slate-500">Ton</span>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              +12.4% melebihi target BJR
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Rata-rata BJR
              </span>
              <div className="p-2 rounded-xl bg-amber-500 text-slate-950 shadow-sm">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
              18.4 <span className="text-sm font-semibold text-slate-500">Kg / Janjang</span>
            </div>
            <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">
              Kualitas TBS Matang Optimal
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Status ALB Pabrik (PKS)
              </span>
              <div className="p-2 rounded-xl bg-blue-600 text-white shadow-sm">
                <ShieldCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
              2.85% <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">(Aman &lt; 3.5%)</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Terverifikasi Otomatis oleh AI
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Data Grid & Skeletons */}
      {activeTab === 'tables' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Enterprise Responsive Data Grid (TBS Harvest Sample)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3">Kode Blok</th>
                  <th className="p-3">Afdeling</th>
                  <th className="p-3">Pemanen / Mandor</th>
                  <th className="p-3">Janjang TBS</th>
                  <th className="p-3">Est. Berat (Kg)</th>
                  <th className="p-3">Status Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Blok B12</td>
                  <td className="p-3">Afdeling Alpha</td>
                  <td className="p-3">Suhardi (Mandor 01)</td>
                  <td className="p-3 font-semibold">1,240 Janjang</td>
                  <td className="p-3 font-semibold">22,816 Kg</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      98% Matang
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Blok B13</td>
                  <td className="p-3">Afdeling Alpha</td>
                  <td className="p-3">Budiarto (Mandor 02)</td>
                  <td className="p-3 font-semibold">980 Janjang</td>
                  <td className="p-3 font-semibold">18,032 Kg</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      Ada Mentah (2%)
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
