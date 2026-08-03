import React, { useState } from 'react';
import {
  Wallet,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  RefreshCw,
  CheckCircle2,
  FileCheck,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_BANK_ACCOUNTS, INITIAL_CASH_TRANSACTIONS } from '../mockData';
import { BankAccount, CashTransaction } from '../types';

export const CashBankManagementView: React.FC = () => {
  const [banks] = useState<BankAccount[]>(INITIAL_BANK_ACCOUNTS);
  const [cashTrxs, setCashTrxs] = useState<CashTransaction[]>(INITIAL_CASH_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<'BANKS' | 'CASH' | 'RECONCILIATION'>('BANKS');

  const [showCashOutModal, setShowCashOutModal] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleAddCashOut = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newAmount) || 0;
    const newTrx: CashTransaction = {
      id: `ctx-${Date.now()}`,
      trxNo: `CSH-OUT-202608-${String(cashTrxs.length + 1).padStart(2, '0')}`,
      trxType: 'CASH_OUT',
      accountName: 'Kas Kecil Estate',
      categoryName: 'Operasional Kas Kecil Kebun',
      amountIdr: amount,
      date: '2026-08-03',
      description: newDesc || 'Pengeluaran Kas Kecil',
      recipientOrSource: newRecipient || 'Vendor Lokal',
      status: 'COMPLETED',
    };

    setCashTrxs([newTrx, ...cashTrxs]);
    setShowCashOutModal(false);
    setNewRecipient('');
    setNewDesc('');
    setNewAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <span>Kas, Rekening Bank Operasional & Rekonsiliasi Otomatis</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Petty Cash Estate Kebun, Cash Advance Operasional & Bank Mutation Matching
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('BANKS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'BANKS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rekening Bank ({banks.length})
          </button>
          <button
            onClick={() => setActiveTab('CASH')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'CASH' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Mutasi Kas Kecil ({cashTrxs.length})
          </button>
          <button
            onClick={() => setActiveTab('RECONCILIATION')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'RECONCILIATION' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Rekonsiliasi Bank
          </button>
        </div>
      </div>

      {/* BANKS TAB */}
      {activeTab === 'BANKS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banks.map((b) => (
            <div key={b.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {b.currency} Account
                  </span>
                  <h3 className="font-black text-white text-base mt-1">{b.bankName}</h3>
                  <p className="text-xs text-slate-400">{b.branchName} • {b.accountNumber}</p>
                </div>
                <Building2 className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Saldo Kas Bank Tersedia</span>
                <p className="text-xl font-black text-emerald-400">
                  Rp {b.balanceIdr.toLocaleString('id-ID')}
                </p>
                <p className="text-[11px] text-slate-500 pt-1">PIC Treasury: {b.picName}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CASH TAB */}
      {activeTab === 'CASH' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold">Riwayat Transaksi Kas Kecil (Petty Cash Estate)</span>
            <button
              onClick={() => setShowCashOutModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Pengeluaran Kas (Cash Out)</span>
            </button>
          </div>

          <div className="divide-y divide-slate-800 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden text-xs">
            {cashTrxs.map((ctx) => (
              <div key={ctx.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-400 font-bold">{ctx.trxNo}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ctx.trxType === 'CASH_IN'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {ctx.trxType}
                    </span>
                    <span className="text-slate-400 text-[11px]">{ctx.date}</span>
                  </div>
                  <p className="font-bold text-white text-sm">{ctx.description}</p>
                  <p className="text-slate-400 text-[11px]">Vendor / Penerima: {ctx.recipientOrSource}</p>
                </div>

                <div className="text-right font-mono">
                  <span
                    className={`text-base font-black ${
                      ctx.trxType === 'CASH_IN' ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {ctx.trxType === 'CASH_IN' ? '+' : '-'} Rp {ctx.amountIdr.toLocaleString('id-ID')}
                  </span>
                  <span className="block text-[10px] text-emerald-400 font-bold mt-0.5">COMPLETED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECONCILIATION TAB */}
      {activeTab === 'RECONCILIATION' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-base">Automatic Bank Reconciliation Engine</h3>
              <p className="text-slate-400">Pencocokan Otomatis Mutasi Rekening Mandiri/BRI dengan Jurnal General Ledger</p>
            </div>

            <button
              onClick={() => alert('Sistem Import Mutasi Bank Berhasil')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Import Mutasi Bank (MT940/CSV)</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-slate-300 font-mono">
              <span>Saldo Mutasi Bank Mandiri: <strong>Rp 8,450,000,000</strong></span>
              <span>Saldo Jurnal General Ledger: <strong>Rp 8,450,000,000</strong></span>
            </div>
            <p className="text-emerald-400 font-bold text-center pt-2 border-t border-slate-800">
              STATUS: 100% MATCHED (TIDAK ADA SELISIH) ✓
            </p>
          </div>
        </div>
      )}

      {/* Modal Cash Out */}
      {showCashOutModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-white">Catat Pengeluaran Kas Kecil (Cash Out)</h3>
            <form onSubmit={handleAddCashOut} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Penerima / Vendor</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Toko Bangunan Jaya Kandis"
                  value={newRecipient}
                  onChange={(e) => setNewRecipient(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Keterangan Pengeluaran</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Pembelian Cat & Kuas Kantor Estate"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nominal (IDR)</label>
                <input
                  type="number"
                  required
                  placeholder="1500000"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCashOutModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Simpan Transaksi Kas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
