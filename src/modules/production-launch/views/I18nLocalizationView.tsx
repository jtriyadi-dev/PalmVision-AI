import React, { useState } from 'react';
import {
  Globe,
  Languages,
  CheckCircle2,
  RefreshCw,
  Search,
  Plus,
  Save,
  Check
} from 'lucide-react';
import { mockTranslations } from '../mockData';
import { TranslationKeyMap, LocaleLanguage } from '../types';

export const I18nLocalizationView: React.FC = () => {
  const [translations, setTranslations] = useState<TranslationKeyMap[]>(mockTranslations);
  const [currentLocale, setCurrentLocale] = useState<LocaleLanguage>('id');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const filtered = translations.filter(t =>
    t.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider">
              Multilingual Framework (i18n)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Internationalization & Bilingual Localized Translations</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Switch UI between Bahasa Indonesia and English with localized date, currency (IDR / USD), and number formats.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setCurrentLocale('id')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              currentLocale === 'id' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇮🇩</span>
            <span>Bahasa Indonesia</span>
          </button>

          <button
            onClick={() => setCurrentLocale('en')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              currentLocale === 'en' ? 'bg-teal-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🇬🇧</span>
            <span>English (US)</span>
          </button>
        </div>
      </div>

      {/* Translations Table Manager */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search translation key or text..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer"
          >
            {savedSuccess ? <Check className="h-4 w-4 text-white" /> : <Save className="h-4 w-4" />}
            <span>{savedSuccess ? 'Translation Bundle Saved!' : 'Save Translations'}</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-[11px] uppercase font-semibold border-b border-slate-700">
                <th className="py-3.5 px-4">Translation Key</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">English (US)</th>
                <th className="py-3.5 px-4">Bahasa Indonesia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {filtered.map((item, idx) => (
                <tr key={item.key} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-mono text-teal-300 font-bold">{item.key}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-white">
                    <input
                      type="text"
                      value={item.en}
                      onChange={e => {
                        const updated = [...translations];
                        updated[idx].en = e.target.value;
                        setTranslations(updated);
                      }}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded px-2.5 py-1 text-white text-xs"
                    />
                  </td>
                  <td className="py-3.5 px-4 text-white">
                    <input
                      type="text"
                      value={item.id}
                      onChange={e => {
                        const updated = [...translations];
                        updated[idx].id = e.target.value;
                        setTranslations(updated);
                      }}
                      className="w-full bg-slate-800/80 border border-slate-700 rounded px-2.5 py-1 text-white text-xs"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
