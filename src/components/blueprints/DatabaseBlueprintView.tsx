import React, { useState } from 'react';
import { Database, Table, Key, Shield, Layers, Code, CheckCircle2 } from 'lucide-react';

export const DatabaseBlueprintView: React.FC = () => {
  const [activeDomain, setActiveDomain] = useState<'master' | 'transaction' | 'analytics' | 'security'>('master');

  const domainTables = {
    master: [
      { name: 'master_companies', desc: 'Holding / Perusahaan Sawit (Nama, NIB, Total Hektar)' },
      { name: 'master_estates', desc: 'Estate / Kebun Utama (Kode, Lokasi, Manager)' },
      { name: 'master_divisions', desc: 'Divisi Kebun (Divisi I - IV)' },
      { name: 'master_afdelings', desc: 'Afdeling Kebun (Afdeling A - F)' },
      { name: 'master_blocks', desc: 'Blok Tanam (Kode B12, Hektar, Tahun Tanam, SPH 136)' },
      { name: 'master_employees', desc: 'Mandor, Pemanen, Driver, Operator, Supervisor' },
      { name: 'master_items', desc: 'Agrokimia, Pupuk NPK, Solar, Sparepart, Alat Panen' },
    ],
    transaction: [
      { name: 'tx_harvest_header', desc: 'Sesi Panen Harian per Afdeling & Blok' },
      { name: 'tx_harvest_detail', desc: 'Rincian Janjang TBS (Matang, Mentah, Lewat Matang, Tangkai Panjang)' },
      { name: 'tx_spb_delivery', desc: 'Surat Pengantar Buah (SPB) Truk ke Pabrik Kelapa Sawit (PKS)' },
      { name: 'tx_weighbridge', desc: 'Nota Timbangan PKS (Gross, Tare, Netto, Refraksi ALB)' },
      { name: 'tx_field_activities', desc: 'Kegiatan Pemupukan, Tunas Pelepah, Semprot Gulma' },
      { name: 'tx_fuel_distribution', desc: 'Log Pengisian Solar Truk & Alat Berat' },
      { name: 'tx_bkm_attendance', desc: 'Presensi Harian BKM (Buku Kegiatan Mandor) & Premi' },
    ],
    analytics: [
      { name: 'ai_yield_forecasts', desc: 'Hasil Prediksi Tonase Hasil Panen per Blok (3 - 6 Bulan)' },
      { name: 'ai_disease_detections', desc: 'Log Analisis Visual Penyakit Pelepah / Ganoderma' },
      { name: 'ai_anomaly_alerts', desc: 'Terdeteksinya Anomali Pemakaian Solar / Drop BJR' },
      { name: 'bi_cost_per_hectare', desc: 'Agregasi Biaya Operasional/Ha per Estate' },
    ],
    security: [
      { name: 'sys_licenses', desc: 'Product License Key, Serial Number, HWID Hash, Expiry' },
      { name: 'sys_user_roles', desc: 'RBAC Permission Matrix (17 User Roles)' },
      { name: 'sys_audit_logs', desc: 'Immutable Security Audit Logs (IP, User, Delta)' },
      { name: 'sys_device_bindings', desc: 'Fingerprint Perangkat HP Mandor / Tablet' },
    ],
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">3. Blueprint Database Enterprise</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              High-Scalability Schema Blueprint for PostgreSQL (Cloud SQL) & Firestore Document Store
            </p>
          </div>
        </div>
      </div>

      {/* Domain Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveDomain('master')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeDomain === 'master'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          Master Domain (1:N Hierarchy)
        </button>
        <button
          onClick={() => setActiveDomain('transaction')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeDomain === 'transaction'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          Transaction Domain (Operational Logs)
        </button>
        <button
          onClick={() => setActiveDomain('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeDomain === 'analytics'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          AI & Analytics Domain
        </button>
        <button
          onClick={() => setActiveDomain('security')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeDomain === 'security'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
          }`}
        >
          License & Security Domain
        </button>
      </div>

      {/* Domain Schema Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {domainTables[activeDomain].map((tbl, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2 hover:border-emerald-500 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Table className="h-4 w-4" /> {tbl.name}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                Indexed Table
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {tbl.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Relational Hierarchy Map */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Layers className="h-4 w-4 text-emerald-600" /> Multi-Company Plantation Hierarchy Mapping
        </h4>
        <div className="p-3 rounded-xl bg-slate-950 text-amber-300 font-mono text-xs overflow-x-auto">
          Company (1) ───&gt; Estate (N) ───&gt; Division (N) ───&gt; Afdeling (N) ───&gt; Block (N) ───&gt; Sub-Block (N)
        </div>
      </div>
    </div>
  );
};
