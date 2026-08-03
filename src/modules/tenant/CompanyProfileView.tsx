import React, { useState } from 'react';
import { Building2, Save, Upload, MapPin, Globe, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { CompanyEntity } from '../../types';

export const CompanyProfileView: React.FC = () => {
  const [company, setCompany] = useState<CompanyEntity>({
    id: 'comp-01',
    name: 'PT Sawit Nusantara Jaya',
    code: 'SNJ',
    nib: '9120308910291',
    npwp: '01.234.567.8-123.000',
    address: 'Jl. Jendral Sudirman No. 88, Pekanbaru, Riau',
    email: 'corp@sawitnusantara.co.id',
    phone: '+62 761-889900',
    website: 'https://sawitnusantara.co.id',
    logoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120',
    estates: [],
  });

  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Profil Perusahaan & Holding (Multi-Tenant)</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Identitas Legal Perusahaan, NPWP, Legalitas NIB, dan Informasi Operasional Holding
            </p>
          </div>
        </div>

        {savedMsg && (
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4" /> Tersimpan!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-6 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3 md:col-span-1 text-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pr-0 md:pr-6 pb-6 md:pb-0">
            <label className="block font-bold text-slate-700 dark:text-slate-300">Logo Perusahaan</label>
            <div className="h-32 w-32 mx-auto rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 overflow-hidden relative group flex items-center justify-center bg-slate-50 dark:bg-slate-800">
              <img src={company.logoUrl} alt="Logo" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Upload className="h-6 w-6" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400">PNG / JPG Transparan Max 2MB</p>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nama Perusahaan Holding
                </label>
                <input
                  type="text"
                  value={company.name}
                  onChange={(e) => setCompany({ ...company, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Kode Perusahaan (Short Code)
                </label>
                <input
                  type="text"
                  value={company.code}
                  onChange={(e) => setCompany({ ...company, code: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Nomor Induk Berusaha (NIB)
                </label>
                <input
                  type="text"
                  value={company.nib}
                  onChange={(e) => setCompany({ ...company, nib: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-mono text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  NPWP Perusahaan
                </label>
                <input
                  type="text"
                  value={company.npwp}
                  onChange={(e) => setCompany({ ...company, npwp: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-mono text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Alamat Kantor Pusat / Holding
              </label>
              <textarea
                rows={2}
                value={company.address}
                onChange={(e) => setCompany({ ...company, address: e.target.value })}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Perusahaan
                </label>
                <input
                  type="email"
                  value={company.email}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Telepon Kantor
                </label>
                <input
                  type="text"
                  value={company.phone}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Website Resmi
                </label>
                <input
                  type="text"
                  value={company.website}
                  onChange={(e) => setCompany({ ...company, website: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="h-4 w-4" />
            <span>Simpan Profil Perusahaan</span>
          </button>
        </div>
      </form>
    </div>
  );
};
