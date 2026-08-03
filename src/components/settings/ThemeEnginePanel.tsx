import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Palette, Sun, Moon, Monitor, Sliders, Eye, Sparkles, RefreshCw, Type, LayoutGrid } from 'lucide-react';
import { AccentColor } from '../../types';

export const ThemeEnginePanel: React.FC = () => {
  const {
    settings,
    setMode,
    setAccentColor,
    setFontSize,
    toggleCompactMode,
    toggleHighContrast,
    toggleGlassTransparency,
    resetTheme,
  } = useTheme();

  const ACCENTS: Array<{ id: AccentColor; name: string; hex: string; bg: string }> = [
    { id: 'emerald', name: 'Emerald Palm', hex: '#059669', bg: 'bg-emerald-600' },
    { id: 'sapphire', name: 'Sapphire Ocean', hex: '#2563eb', bg: 'bg-blue-600' },
    { id: 'amber', name: 'Harvest Amber', hex: '#d97706', bg: 'bg-amber-600' },
    { id: 'violet', name: 'Royal Violet', hex: '#7c3aed', bg: 'bg-violet-600' },
    { id: 'rose', name: 'Ruby Rose', hex: '#e11d48', bg: 'bg-rose-600' },
    { id: 'crimson', name: 'Crimson Earth', hex: '#dc2626', bg: 'bg-red-600' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900/90 via-teal-900/80 to-slate-900 border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Palette className="h-48 w-48 text-white" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Realtime Theme Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Theme Engine & Visual Customization</h1>
            <p className="text-sm text-emerald-100/80 mt-1 max-w-xl">
              Kustomisasi tampilan antarmuka secara instan. Pengaturan mode, aksen warna, tingkat transparansi, dan font diprosesan secara otomatis ke seluruh aplikasi.
            </p>
          </div>
          <button
            onClick={resetTheme}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold backdrop-blur-md flex items-center gap-2 transition-all shrink-0"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Reset Default
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color Mode Selector */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Sun className="h-5 w-5 text-amber-500" /> Mode Tampilan (Theme Mode)
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'dark', label: 'Dark Mode', icon: Moon, desc: 'Eye-friendly untuk malam hari' },
              { id: 'light', label: 'Light Mode', icon: Sun, desc: 'Tampilan terang kontras tinggi' },
              { id: 'auto', label: 'Auto (System)', icon: Monitor, desc: 'Ikuti OS pengguna' },
            ].map((m) => {
              const Icon = m.icon;
              const isActive = settings.mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as any)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-500/20 text-emerald-950 dark:text-emerald-100'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-2 ${isActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                  <div>
                    <span className="text-xs font-bold block">{m.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">{m.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accent Color Picker */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Palette className="h-5 w-5 text-emerald-500" /> Custom Primary Accent Color
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Warna aksen utama digunakan untuk button, badge aktif, ring fokus, dan grafik sorotan.
          </p>
          <div className="grid grid-cols-3 gap-2.5">
            {ACCENTS.map((acc) => {
              const isActive = settings.accentColor === acc.id;
              return (
                <button
                  key={acc.id}
                  onClick={() => setAccentColor(acc.id)}
                  className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-xs font-semibold ${
                    isActive
                      ? 'border-slate-900 dark:border-white bg-slate-100 dark:bg-slate-800 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className={`h-4 w-4 rounded-full ${acc.bg} shrink-0 shadow-xs`} />
                  <span className="truncate text-slate-800 dark:text-slate-200">{acc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Size Scaling */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Type className="h-5 w-5 text-blue-500" /> Skala Ukuran Teks (Font Size)
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'sm', label: 'Ringkas (Small)', scale: '90%' },
              { id: 'md', label: 'Standar (Medium)', scale: '100%' },
              { id: 'lg', label: 'Nyaman (Large)', scale: '110%' },
            ].map((f) => {
              const isActive = settings.fontSize === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFontSize(f.id as any)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs block">{f.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5">{f.scale}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Modifiers & Glassmorphism */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Sliders className="h-5 w-5 text-violet-500" /> Fitur Aksesibilitas & Tata Letak
          </div>

          <div className="space-y-3">
            {/* Glassmorphism Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-emerald-500" />
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Glassmorphism Transparency
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    Efek kaca buram transparan pada Topbar, Modal & Drawer
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.glassTransparency}
                onChange={toggleGlassTransparency}
                className="h-4 w-4 rounded-xs border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2.5">
                <Eye className="h-4 w-4 text-amber-500" />
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    High Contrast Mode (WCAG AAA)
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    Meningkatkan kontras garis batas & teks untuk keterbacaan ekstra
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={toggleHighContrast}
                className="h-4 w-4 rounded-xs border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>

            {/* Compact Grid Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center gap-2.5">
                <LayoutGrid className="h-4 w-4 text-blue-500" />
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Compact Grid Density Mode
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    Mengurangi padding tabel & widget untuk menampilkan lebih banyak data
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.compactMode}
                onChange={toggleCompactMode}
                className="h-4 w-4 rounded-xs border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
