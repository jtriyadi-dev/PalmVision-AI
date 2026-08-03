import React, { useState } from 'react';
import {
  CreditCard,
  FileText,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Download,
  Eye,
  Send,
  Calculator,
  Percent,
  Check,
  Sparkles,
  Search,
} from 'lucide-react';
import {
  INITIAL_PAYROLL_PERIODS,
  INITIAL_PAYSLIPS,
  INITIAL_BPJS_CONFIG,
  INITIAL_LOANS,
} from '../mockData';
import { PayslipItem, PayrollPeriod } from '../types';

export const PayrollBpjsPph21View: React.FC = () => {
  const [payrollPeriods] = useState<PayrollPeriod[]>(INITIAL_PAYROLL_PERIODS);
  const [payslips] = useState<PayslipItem[]>(INITIAL_PAYSLIPS);
  const [selectedPayslip, setSelectedPayslip] = useState<PayslipItem | null>(null);
  const [activeTab, setActiveTab] = useState<'PAYSLIPS' | 'PROCESS' | 'BPJS_PPH21' | 'LOANS'>('PAYSLIPS');

  const bpjsConfig = INITIAL_BPJS_CONFIG;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <span>Payroll Enterprise, BPJS & PPh21 TER (e-Bupot Ready)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Penggajian Perkebunan Kelapa Sawit (Gaji Pokok, Premi Panen TBS, Tunjangan Natura, Lembur, BPJS & Tax TER)
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('PAYSLIPS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'PAYSLIPS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Slip Gaji / Payslip ({payslips.length})
          </button>
          <button
            onClick={() => setActiveTab('PROCESS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'PROCESS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Periode Payroll ({payrollPeriods.length})
          </button>
          <button
            onClick={() => setActiveTab('BPJS_PPH21')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'BPJS_PPH21' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            BPJS & PPh21 Framework
          </button>
          <button
            onClick={() => setActiveTab('LOANS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'LOANS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pinjaman Kasbon ({INITIAL_LOANS.length})
          </button>
        </div>
      </div>

      {/* PAYSLIPS TAB */}
      {activeTab === 'PAYSLIPS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300">Rincian Slip Gaji Karyawan Periode Juli 2026</span>
              <button
                onClick={() => alert('Download File Mass Transfer Bank Mandiri / BRI SIAP')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Mass Bank Transfer (.csv)</span>
              </button>
            </div>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              {payslips.map((ps) => (
                <div key={ps.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{ps.employeeName}</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                        {ps.employeeId}
                      </span>
                    </div>
                    <p className="text-slate-400">{ps.positionTitle} • {ps.department}</p>
                    <p className="text-slate-500 text-[11px]">
                      Gaji Pokok: Rp {ps.basicSalary.toLocaleString('id-ID')} | Premi TBS: <strong className="text-emerald-400">Rp {ps.harvestIncentivePremi.toLocaleString('id-ID')}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-slate-500 text-[10px] block">Gaji Bersih (THP Nett)</span>
                      <span className="font-extrabold text-emerald-400 text-base block">
                        Rp {ps.nettSalary.toLocaleString('id-ID')}
                      </span>
                      <span className="text-[10px] text-slate-400">Deductions: Rp {ps.totalDeductions.toLocaleString('id-ID')}</span>
                    </div>

                    <button
                      onClick={() => setSelectedPayslip(ps)}
                      className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Lihat Slip</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PERIODS PROCESS TAB */}
      {activeTab === 'PROCESS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {payrollPeriods.map((period) => (
              <div key={period.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {period.id}
                    </span>
                    <h3 className="font-extrabold text-white text-base mt-1">{period.periodName}</h3>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {period.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Karyawan Diproses</span>
                    <span className="text-base font-extrabold text-white">{period.totalEmployeesProcessed} Orang</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Total Gross Payroll</span>
                    <span className="text-base font-extrabold text-emerald-400">Rp {period.totalGrossPayrollIdr.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Setoran BPJS Kes & TK</span>
                    <span className="text-base font-extrabold text-cyan-400">Rp {period.totalBpjsPaidIdr.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block">Potongan PPh21 TER</span>
                    <span className="text-base font-extrabold text-amber-400">Rp {period.totalPph21Idr.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Kalkulasi Ulang Payroll ${period.periodName} Berhasil`)}
                  className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  <span>Jalankan Kalkulasi Batch Auto-Calculate</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BPJS & PPH21 FRAMEWORK TAB */}
      {activeTab === 'BPJS_PPH21' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Konfigurasi Presentase BPJS & PPh21 Tarif Efektif Rata-Rata (TER)</span>
            </h3>
            <p className="text-xs text-slate-400">Sesuai Regulasi BPJS Kesehatan, BPJS Ketenagakerjaan & UU HPP Indonesia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* BPJS Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-extrabold text-emerald-400 text-sm block border-b border-slate-800 pb-2">
                1. BPJS Kesehatan & Ketenagakerjaan
              </span>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>BPJS Kesehatan (Perusahaan / Karyawan):</span>
                  <span className="font-bold text-white">{bpjsConfig.bpjsKesCompanyPercent}% / {bpjsConfig.bpjsKesEmployeePercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span>BPJS TK - JHT (Jaminan Hari Tua):</span>
                  <span className="font-bold text-white">{bpjsConfig.bpjsTkJhtCompanyPercent}% / {bpjsConfig.bpjsTkJhtEmployeePercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span>BPJS TK - JKK (Jaminan Kecelakaan Kerja):</span>
                  <span className="font-bold text-white">{bpjsConfig.bpjsTkJkkCompanyPercent}% (Risk High Kebun)</span>
                </div>
                <div className="flex justify-between">
                  <span>BPJS TK - JKM (Jaminan Kematian):</span>
                  <span className="font-bold text-white">{bpjsConfig.bpjsTkJkmCompanyPercent}%</span>
                </div>
                <div className="flex justify-between">
                  <span>BPJS TK - JP (Jaminan Pensiun):</span>
                  <span className="font-bold text-white">{bpjsConfig.bpjsTkJpCompanyPercent}% / {bpjsConfig.bpjsTkJpEmployeePercent}%</span>
                </div>
              </div>
            </div>

            {/* PPh21 TER Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="font-extrabold text-amber-400 text-sm block border-b border-slate-800 pb-2">
                2. Framework PPh21 TER (Tarif Efektif Rata-Rata)
              </span>
              <div className="space-y-2 text-slate-300">
                <p>• Kategori TER A: PTKP TK/0, TK/1, K/0</p>
                <p>• Kategori TER B: PTKP TK/2, TK/3, K/1, K/2</p>
                <p>• Kategori TER C: PTKP K/3</p>
                <div className="p-3 rounded bg-amber-950/40 border border-amber-800/40 text-[11px] text-amber-300 mt-2">
                  <strong>e-Bupot Ready:</strong> Seluruh potongan PPh21 TER dikategorikan otomatis untuk kemudahan pelaporan Pajak Bulanan / Tahunan ke DJP.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOANS TAB */}
      {activeTab === 'LOANS' && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <span className="text-xs font-bold text-slate-300 block">Pinjaman & Kasbon Karyawan (Dipotong Otomatis dari Payroll)</span>
          <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
            {INITIAL_LOANS.map((loan) => (
              <div key={loan.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-extrabold text-white text-sm">{loan.employeeName}</h4>
                  <p className="text-slate-400">{loan.loanType.replace('_', ' ')}</p>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] block">Sisa Pinjaman / Cicilan Bulan Ini</span>
                  <span className="font-bold text-rose-400">
                    Rp {loan.remainingAmountIdr.toLocaleString('id-ID')} / Rp {loan.monthlyInstallmentIdr.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PAYSLIP MODAL VIEWER */}
      {selectedPayslip && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">SLIP GAJI DIGITAL</span>
                <h3 className="text-lg font-black text-white">PT NUSANTARA PALM LESTARI</h3>
                <p className="text-xs text-slate-400">Periode: Juli 2026 • Unit Estate Sei Riau</p>
              </div>
              <button
                onClick={() => setSelectedPayslip(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block">Nama Karyawan:</span>
                  <span className="font-bold text-white">{selectedPayslip.employeeName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">NIK / ID:</span>
                  <span className="font-bold text-white">{selectedPayslip.employeeId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Jabatan:</span>
                  <span className="font-bold text-emerald-400">{selectedPayslip.positionTitle}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Departemen:</span>
                  <span className="font-bold text-white">{selectedPayslip.department}</span>
                </div>
              </div>

              {/* Earnings */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-extrabold text-emerald-400 block border-b border-slate-800 pb-1">PENERIMAAN (EARNINGS)</span>
                <div className="flex justify-between"><span>Gaji Pokok:</span><span className="font-mono text-white">Rp {selectedPayslip.basicSalary.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>Premi Panen TBS / Insentif:</span><span className="font-mono text-emerald-400 font-bold">Rp {selectedPayslip.harvestIncentivePremi.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>Upah Lembur:</span><span className="font-mono text-white">Rp {selectedPayslip.overtimePay.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>Tunjangan Natura & Beras:</span><span className="font-mono text-white">Rp {selectedPayslip.allowances.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between pt-2 border-t border-slate-800 font-bold"><span>Total Gaji Kotor (Gross):</span><span className="font-mono text-emerald-300">Rp {selectedPayslip.grossSalary.toLocaleString('id-ID')}</span></div>
              </div>

              {/* Deductions */}
              <div className="space-y-2 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="font-extrabold text-rose-400 block border-b border-slate-800 pb-1">POTONGAN (DEDUCTIONS)</span>
                <div className="flex justify-between"><span>BPJS Kesehatan (1%):</span><span className="font-mono text-white">Rp {selectedPayslip.bpjsKesEmployeeDeduction.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>BPJS Ketenagakerjaan (3% JHT+JP):</span><span className="font-mono text-white">Rp {selectedPayslip.bpjsTkEmployeeDeduction.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>PPh21 TER Tax:</span><span className="font-mono text-white">Rp {selectedPayslip.pph21TERDeduction.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between"><span>Potongan Kasbon:</span><span className="font-mono text-white">Rp {selectedPayslip.loanDeduction.toLocaleString('id-ID')}</span></div>
                <div className="flex justify-between pt-2 border-t border-slate-800 font-bold"><span>Total Potongan:</span><span className="font-mono text-rose-400">Rp {selectedPayslip.totalDeductions.toLocaleString('id-ID')}</span></div>
              </div>

              {/* THP */}
              <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-between text-emerald-300">
                <span className="font-extrabold text-sm">GAJI BERSIH DITERIMA (TAKE HOME PAY)</span>
                <span className="font-black text-xl font-mono text-emerald-400">Rp {selectedPayslip.nettSalary.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => alert('PDF Payslip Berhasil Di-Generate')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Cetak PDF Slip Gaji</span>
              </button>
              <button
                onClick={() => setSelectedPayslip(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
