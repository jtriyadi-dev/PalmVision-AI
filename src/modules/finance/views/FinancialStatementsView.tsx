import React, { useState } from 'react';
import {
  FileText,
  PieChart,
  BarChart3,
  Download,
  TrendingUp,
  Building2,
  DollarSign,
  CheckCircle2,
  ShieldCheck,
  Printer,
} from 'lucide-react';
import { INITIAL_FINANCIAL_RATIOS } from '../mockData';

export const FinancialStatementsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'PL' | 'BALANCE_SHEET' | 'CASH_FLOW' | 'RATIOS' | 'TAX'>('PL');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <span>Laporan Keuangan Audit-Ready & Perpajakan (P&L, Balance Sheet, PPN/PPh)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Laporan Laba Rugi Konsolidasi, Neraca Aset, Arus Kas Direct, Rasio Keuangan & e-Faktur Pajak
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('PL')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'PL' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Laba Rugi (P&L)
          </button>
          <button
            onClick={() => setActiveTab('BALANCE_SHEET')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'BALANCE_SHEET' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Neraca (Balance Sheet)
          </button>
          <button
            onClick={() => setActiveTab('CASH_FLOW')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'CASH_FLOW' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Arus Kas (Cash Flow)
          </button>
          <button
            onClick={() => setActiveTab('RATIOS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'RATIOS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rasio Keuangan
          </button>
          <button
            onClick={() => setActiveTab('TAX')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'TAX' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Manajemen Pajak
          </button>
        </div>
      </div>

      {/* PROFIT & LOSS TAB */}
      {activeTab === 'PL' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 text-xs font-mono">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-base font-sans">
                Laporan Laba Rugi Konsolidasi (Profit & Loss Statement)
              </h3>
              <p className="text-slate-400 font-sans">PT Nusantara Palm Lestari • Periode YTD Agustus 2026</p>
            </div>
            <button
              onClick={() => alert('Download PDF Laba Rugi Selesai')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-sans flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF / Excel</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Revenue */}
            <div className="space-y-1">
              <div className="flex justify-between font-extrabold text-emerald-400 border-b border-slate-800 pb-1">
                <span>PENDAPATAN USAN (REVENUE)</span>
                <span>Rp 18,200,000,000</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-4">
                <span>Penjualan CPO (Crude Palm Oil) - Wilmar Dumai</span>
                <span>Rp 16,310,000,000</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-4">
                <span>Penjualan Palm Kernel (PK) - GAR</span>
                <span>Rp 1,890,000,000</span>
              </div>
            </div>

            {/* COGS */}
            <div className="space-y-1">
              <div className="flex justify-between font-extrabold text-rose-400 border-b border-slate-800 pb-1">
                <span>BEBAN HOKO POKOK PENJUALAN (COGS)</span>
                <span>- Rp 12,300,000,000</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-4">
                <span>Biaya Panen, Pemuatan & Angkut TBS Kebun</span>
                <span>Rp 4,120,000,000</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-4">
                <span>Biaya Pemupukan & Agrokimia</span>
                <span>Rp 4,800,000,000</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-4">
                <span>Biaya Pengolahan Pabrik PKS Mill</span>
                <span>Rp 3,380,000,000</span>
              </div>
            </div>

            {/* Gross Profit */}
            <div className="flex justify-between font-black text-sm text-white bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span>LABA KOTOR (GROSS PROFIT)</span>
              <span className="text-emerald-400">Rp 5,900,000,000 (32.4%)</span>
            </div>

            {/* OPEX */}
            <div className="space-y-1">
              <div className="flex justify-between font-extrabold text-amber-400 border-b border-slate-800 pb-1">
                <span>BEBAN OPERASIONAL (OPERATING EXPENSE)</span>
                <span>- Rp 2,510,000,000</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-4">
                <span>Gaji & Tunjangan Direksi/HQ HR</span>
                <span>Rp 1,200,000,000</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-4">
                <span>Penyusutan Alat Berat & Bangunan (Depreciation)</span>
                <span>Rp 850,000,000</span>
              </div>
              <div className="flex justify-between text-slate-300 pl-4">
                <span>Biaya Umur Sertifikasi RSPO/ISPO & K3</span>
                <span>Rp 460,000,000</span>
              </div>
            </div>

            {/* Net Profit */}
            <div className="flex justify-between font-black text-base text-white bg-emerald-950 p-4 rounded-xl border border-emerald-800">
              <span>LABA BERSIH (NET PROFIT AFTER TAX)</span>
              <span className="text-emerald-400">Rp 3,390,000,000 (18.6%)</span>
            </div>
          </div>
        </div>
      )}

      {/* BALANCE SHEET TAB */}
      {activeTab === 'BALANCE_SHEET' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs font-mono">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-base font-sans">Neraca Keuangan (Balance Sheet)</h3>
            <p className="text-slate-400 font-sans font-normal">Keseimbangan Aset = Liabilitas + Ekuitas Perusahaan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ASSETS */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-extrabold text-emerald-400 text-sm block font-sans">TOTAL ASET</span>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between"><span>Kas & Bank:</span><span>Rp 11,570,000,000</span></div>
                <div className="flex justify-between"><span>Piutang AR CPO:</span><span>Rp 4,250,000,000</span></div>
                <div className="flex justify-between"><span>Persediaan Gudang:</span><span>Rp 2,180,000,000</span></div>
                <div className="flex justify-between border-t border-slate-800 pt-1 text-white font-bold">
                  <span>Aset Tetap Kebun/PKS:</span><span>Rp 12,000,000,000</span>
                </div>
              </div>
              <div className="p-2.5 rounded bg-emerald-950 text-emerald-400 font-black text-sm flex justify-between">
                <span>TOTAL ASET:</span><span>Rp 30,000,000,000</span>
              </div>
            </div>

            {/* LIABILITIES & EQUITY */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-extrabold text-cyan-400 text-sm block font-sans">TOTAL LIABILITAS & EKUITAS</span>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between"><span>Hutang AP Supplier:</span><span>Rp 1,850,000,000</span></div>
                <div className="flex justify-between"><span>Hutang Pajak PPN/PPh:</span><span>Rp 340,000,000</span></div>
                <div className="flex justify-between border-t border-slate-800 pt-1 text-white font-bold">
                  <span>Modal Disetor Disetor:</span><span>Rp 25,000,000,000</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Laba Ditahan YTD:</span><span>Rp 2,810,000,000</span>
                </div>
              </div>
              <div className="p-2.5 rounded bg-cyan-950 text-cyan-400 font-black text-sm flex justify-between">
                <span>TOTAL PASIVA:</span><span>Rp 30,000,000,000</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CASH FLOW TAB */}
      {activeTab === 'CASH_FLOW' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs font-mono">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-base font-sans">Laporan Arus Kas (Cash Flow Direct Method)</h3>
            <p className="text-slate-400 font-sans">Arus Kas Operasional, Investasi Replanting, & Pendanaan Modal</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-emerald-400 font-bold">
              <span>Arus Kas dari Aktivitas Operasional:</span><span>+ Rp 4,820,000,000</span>
            </div>
            <div className="flex justify-between text-rose-400 font-bold">
              <span>Arus Kas dari Investasi (Replanting Kebun & CAT 320D):</span><span>- Rp 1,500,000,000</span>
            </div>
            <div className="flex justify-between text-slate-300 font-bold">
              <span>Arus Kas dari Pendanaan:</span><span>Rp 0</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-white text-sm font-sans">
              <span>Net Perubahan Kas Bersih:</span>
              <span className="text-emerald-400">+ Rp 3,320,000,000</span>
            </div>
          </div>
        </div>
      )}

      {/* RATIOS TAB */}
      {activeTab === 'RATIOS' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-base">Rasio Keuangan Perkebunan (Financial Key Ratios)</h3>
            <p className="text-slate-400">Likuiditas, Solvabilitas, Profitabilitas, & HPP Cost Per Ton CPO</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Current Ratio</span>
              <p className="text-lg font-black text-emerald-400">{INITIAL_FINANCIAL_RATIOS.currentRatio}x</p>
              <span className="text-[10px] text-slate-500">Likuiditas Sangat Baik</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Debt to Equity (DER)</span>
              <p className="text-lg font-black text-cyan-400">{INITIAL_FINANCIAL_RATIOS.debtToEquityRatio}x</p>
              <span className="text-[10px] text-slate-500">Hutang Rendah (Safe)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Gross Margin %</span>
              <p className="text-lg font-black text-emerald-400">{INITIAL_FINANCIAL_RATIOS.grossProfitMarginPercent}%</p>
              <span className="text-[10px] text-slate-500">Target Industry &gt; 28%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Cost / Ton CPO</span>
              <p className="text-lg font-black text-amber-400">Rp {(INITIAL_FINANCIAL_RATIOS.costPerTonCpoIdr/1000000).toFixed(2)} Jt</p>
              <span className="text-[10px] text-slate-500">HPP Produksi Pabrik</span>
            </div>
          </div>
        </div>
      )}

      {/* TAX TAB */}
      {activeTab === 'TAX' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-base">Manajemen Perpajakan Kebun (PPN, PPh 21, PPh 23)</h3>
            <p className="text-slate-400">Integrasi e-Faktur PPN Keluaran/Masukan & Potongan PPh 21 Payroll BHL</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-slate-300">
              <span>PPN Masukan (Pembelian Pupuk Petrokimia):</span>
              <span className="font-bold text-emerald-400">Rp 125,000,000</span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span>PPN Keluaran (Penjualan CPO Wilmar 11%):</span>
              <span className="font-bold text-rose-400">Rp 1,794,100,000</span>
            </div>
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
              <span>Status PPN Masa Kurang Bayar:</span>
              <span className="text-rose-400">Rp 1,669,100,000</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
