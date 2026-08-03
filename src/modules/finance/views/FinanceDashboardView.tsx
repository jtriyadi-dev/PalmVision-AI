import React from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Wallet,
  Building2,
  PieChart,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  INITIAL_BANK_ACCOUNTS,
  INITIAL_COA,
  INITIAL_SUPPLIER_INVOICES,
  INITIAL_CUSTOMER_INVOICES,
  INITIAL_FINANCIAL_RATIOS,
  INITIAL_AI_FINANCIAL_INSIGHTS,
} from '../mockData';

interface FinanceDashboardViewProps {
  onNavigateSubTab: (tab: string) => void;
}

export const FinanceDashboardView: React.FC<FinanceDashboardViewProps> = ({
  onNavigateSubTab,
}) => {
  const totalBankBalance = INITIAL_BANK_ACCOUNTS.reduce(
    (acc, b) => acc + b.balanceIdr,
    0
  );
  const totalApOutstanding = INITIAL_SUPPLIER_INVOICES.reduce(
    (acc, s) => acc + s.remainingAmountIdr,
    0
  );
  const totalArOutstanding = INITIAL_CUSTOMER_INVOICES.reduce(
    (acc, c) => acc + c.remainingAmountIdr,
    0
  );

  return (
    <div className="space-y-6">
      {/* Top Banner Executive Financial Overview */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-800/60 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>PalmVision AI Enterprise Financial & Cost Control System</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Ringkasan Keuangan Enterprise & Cost Per Hektar Kebun
          </h1>
          <p className="text-xs text-slate-300">
            Real-time posting otomatis dari Panen TBS, Gudang Pupuk, EAM Workshop, & Payroll Gaji BHL
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <button
            onClick={() => onNavigateSubTab('journal')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>+ Buat Jurnal Manual</span>
          </button>
          <button
            onClick={() => onNavigateSubTab('reports')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <PieChart className="w-4 h-4 text-emerald-400" />
            <span>Laporan Laba Rugi (P&L)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Bank Balance */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Saldo Bank & Cash</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-white">
            Rp {(totalBankBalance / 1000000000).toFixed(2)} Miliar
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% MoM
            </span>
            <span className="text-slate-500">2 Bank Accounts</span>
          </div>
        </div>

        {/* Monthly Revenue CPO */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Omzet CPO & PK</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-black text-emerald-400">
            Rp 18.20 Miliar
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +8.5% Target
            </span>
            <span className="text-slate-500">OER Mill 22.4%</span>
          </div>
        </div>

        {/* Cost Per Ton CPO */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Cost / Ton CPO</span>
            <PieChart className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-black text-white">
            Rp {(INITIAL_FINANCIAL_RATIOS.costPerTonCpoIdr / 1000000).toFixed(2)} Juta
          </p>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" /> -2.1% Biaya Efisien
            </span>
            <span className="text-slate-500">Budget: Rp 8.5M</span>
          </div>
        </div>

        {/* Outstanding AP vs AR */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Piutang AR / Hutang AP</span>
            <Building2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-emerald-400">
              AR: Rp {(totalArOutstanding / 1000000000).toFixed(2)} M (Tagihan CPO)
            </p>
            <p className="text-xs font-bold text-rose-400">
              AP: Rp {(totalApOutstanding / 1000000000).toFixed(2)} M (Pupuk & Part)
            </p>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1">
            <span className="text-cyan-400 font-bold">Rasio Kas 2.85x</span>
            <span className="text-slate-500">Lancar</span>
          </div>
        </div>
      </div>

      {/* AI Financial Insight Banner Widget */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI Financial Intelligence Recommendations</span>
          </span>
          <button
            onClick={() => onNavigateSubTab('ai-finance')}
            className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer"
          >
            Buka AI Command Center →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {INITIAL_AI_FINANCIAL_INSIGHTS.slice(0, 2).map((ins) => (
            <div
              key={ins.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {ins.metricType.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">
                  Akurasi {ins.confidencePercent}%
                </span>
              </div>
              <p className="font-bold text-white leading-snug">{ins.summary}</p>
              <p className="text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{ins.recommendation}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigateSubTab('coa')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all text-left space-y-2 cursor-pointer group"
        >
          <FileSpreadsheet className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-sm">Chart of Accounts & General Ledger</h3>
          <p className="text-xs text-slate-400">
            Bagan akun perkebunan, posting jurnal otomatis, & neraca saldo Trial Balance.
          </p>
        </button>

        <button
          onClick={() => onNavigateSubTab('cash-bank')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all text-left space-y-2 cursor-pointer group"
        >
          <Wallet className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-sm">Cash & Bank Reconciliation</h3>
          <p className="text-xs text-slate-400">
            Kas kecil estate, rekening bank operasional & rekonsiliasi mutasi otomatis.
          </p>
        </button>

        <button
          onClick={() => onNavigateSubTab('budget')}
          className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all text-left space-y-2 cursor-pointer group"
        >
          <PieChart className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
          <h3 className="font-extrabold text-white text-sm">Budget & Cost Center Control</h3>
          <p className="text-xs text-slate-400">
            Pengendalian anggaran biaya panen, pupuk, PKS mill, & analisis per hektar.
          </p>
        </button>
      </div>
    </div>
  );
};
