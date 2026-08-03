import React, { useState } from 'react';
import { Palette, Sparkles, Image, CheckCircle2, Save, Globe } from 'lucide-react';
import { WhiteLabelConfig } from '../../types';

interface WhiteLabelViewProps {
  whiteLabel: WhiteLabelConfig;
  onUpdateWhiteLabel: (updated: WhiteLabelConfig) => void;
}

export const WhiteLabelView: React.FC<WhiteLabelViewProps> = ({
  whiteLabel,
  onUpdateWhiteLabel,
}) => {
  const [config, setConfig] = useState<WhiteLabelConfig>(whiteLabel);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateWhiteLabel(config);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Palette className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">White Label & Brand Customization</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Sesuaikan Nama Aplikasi, Logo Sidebar, Warna Utama, Domain Custom, & Tampilan Login
            </p>
          </div>
        </div>

        {savedMsg && (
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> White Label Tersimpan!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nama Aplikasi Custom (App Title)
            </label>
            <input
              type="text"
              value={config.appName}
              onChange={(e) => setConfig({ ...config, appName: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-bold text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Custom Domain (e.g. erp.sawitnusantara.co.id)
            </label>
            <input
              type="text"
              value={config.domain}
              onChange={(e) => setConfig({ ...config, domain: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-mono text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Warna Utama (Primary Color Token)
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                className="h-9 w-12 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-700 p-0.5"
              />
              <input
                type="text"
                value={config.primaryColor}
                onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-mono text-slate-900 dark:text-slate-100 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Warna Sekunder (Secondary Color)
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={config.secondaryColor}
                onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                className="h-9 w-12 rounded-xl cursor-pointer border border-slate-300 dark:border-slate-700 p-0.5"
              />
              <input
                type="text"
                value={config.secondaryColor}
                onChange={(e) => setConfig({ ...config, secondaryColor: e.target.value })}
                className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-mono text-slate-900 dark:text-slate-100 uppercase"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Gaya Latar Belakang Login Page
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'gradient', label: 'Dark Emerald Gradient' },
              { id: 'glass', label: 'Glassmorphism Minimalist' },
              { id: 'plantation-photo', label: 'Aerial Plantation Photo' },
            ].map((style) => (
              <button
                type="button"
                key={style.id}
                onClick={() => setConfig({ ...config, loginBgStyle: style.id as any })}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  config.loginBgStyle === style.id
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300'
                }`}
              >
                {style.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Teks Hak Cipta (Footer Copyright)
            </label>
            <input
              type="text"
              value={config.copyright}
              onChange={(e) => setConfig({ ...config, copyright: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Catatan Kaki Portal (Footer Note)
            </label>
            <input
              type="text"
              value={config.footerText}
              onChange={(e) => setConfig({ ...config, footerText: e.target.value })}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="h-4 w-4" />
            <span>Terapkan White Label</span>
          </button>
        </div>
      </form>
    </div>
  );
};
