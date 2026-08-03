import React from 'react';
import {
  DollarSign,
  TrendingUp,
  Building2,
  PieChart,
  FileSpreadsheet,
  Wallet,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

export const Prompt12RoadmapView: React.FC = () => {
  const roadmapModules = [
    {
      title: 'General Ledger & Chart of Accounts (COA)',
      desc: 'Bagan Akun standar perkebunan sawit (Cost Center Estate, Mill, Transport, Nursery) & Jurnal Otomatis.',
      icon: FileSpreadsheet,
    },
    {
      title: 'Cash & Bank Management',
      desc: 'Rekonsiliasi Bank otomatis, Kas Kecil (Petty Cash Kebun) & Kas Kasbon Operasional.',
      icon: Wallet,
    },
    {
      title: 'Accounts Payable & Receivable (AP/AR)',
      desc: 'Hutang Pupuk & Sparepart Supplier, Piutang Penjualan CPO/PK ke Refinery.',
      icon: DollarSign,
    },
    {
      title: 'Fixed Asset & Depreciation Accounting',
      desc: 'Depresiasi Otomatis Alat Berat, Kendaraan Transport TBS, Pabrik PKS & Bangunan Housing.',
      icon: Building2,
    },
    {
      title: 'Cost Center & Budget Control',
      desc: 'Anggaran vs Realisasi Biaya Panen (Rp/Kg TBS), Biaya Perawatan, & OER Mill Efficiency.',
      icon: PieChart,
    },
    {
      title: 'Financial Statements & BI Dashboard',
      desc: 'Laporan Laba Rugi (P&L), Neraca (Balance Sheet), Arus Kas (Cash Flow) & AI Financial Forecast.',
      icon: BarChart3,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Roadmap Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 relative overflow-hidden shadow-xl">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Pratinjau Modul Lanjutan — Prompt 12</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Finance, Accounting, Budgeting, Cost Control & Business Intelligence
          </h2>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Modul keuangan enterprise terintegrasi penuh dengan HR Payroll, Inventory Procurement, Harvest Sales CPO/PK, & Asset EAM PalmVision AI.
          </p>
        </div>
      </div>

      {/* Roadmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {roadmapModules.map((m, idx) => {
          const IconComp = m.icon;
          return (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative group hover:border-indigo-700 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800 flex items-center justify-center font-bold">
                <IconComp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-white">{m.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
              <div className="pt-2 text-[11px] text-indigo-400 font-bold flex items-center gap-1">
                <span>Siap Di-Implementasikan di Prompt 12</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
