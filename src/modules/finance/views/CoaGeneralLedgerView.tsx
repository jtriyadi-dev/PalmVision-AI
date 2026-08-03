import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Layers,
  FileCheck,
  BookOpen,
  ArrowRightLeft,
  DollarSign,
  Download,
} from 'lucide-react';
import { INITIAL_COA, INITIAL_JOURNALS } from '../mockData';
import { ChartOfAccount, JournalEntry } from '../types';

export const CoaGeneralLedgerView: React.FC = () => {
  const [coaList] = useState<ChartOfAccount[]>(INITIAL_COA);
  const [journals, setJournals] = useState<JournalEntry[]>(INITIAL_JOURNALS);
  const [activeTab, setActiveTab] = useState<'COA' | 'JOURNALS' | 'GL' | 'TRIAL_BALANCE'>('COA');
  const [searchTerm, setSearchTerm] = useState('');

  const [showNewJournalModal, setShowNewJournalModal] = useState(false);
  const [newDesc, setNewDesc] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleCreateJournal = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newAmount) || 0;
    const newEntry: JournalEntry = {
      id: `jv-${Date.now()}`,
      journalNo: `JV-2026-08-${String(journals.length + 1).padStart(3, '0')}`,
      transactionDate: '2026-08-03',
      sourceModule: 'MANUAL_FINANCE',
      referenceNo: 'MANUAL-REF-001',
      description: newDesc || 'Jurnal Manual Operasional Kebun',
      totalDebitIdr: amount,
      totalCreditIdr: amount,
      status: 'POSTED',
      createdBy: 'Budi Rahardjo (Chief Accountant)',
      approvedBy: 'Direktur Keuangan',
      details: [
        {
          id: `jvd-${Date.now()}-1`,
          accountCode: '5101-001',
          accountName: 'Biaya Panen & Angkut TBS',
          debitAmountIdr: amount,
          creditAmountIdr: 0,
          costCenterCode: 'CC-EST-HARVEST',
          memo: newDesc,
        },
        {
          id: `jvd-${Date.now()}-2`,
          accountCode: '1101-001',
          accountName: 'Kas Kecil Estate (Petty Cash)',
          debitAmountIdr: 0,
          creditAmountIdr: amount,
          costCenterCode: 'CC-EST-SEIRIAU',
          memo: 'Pembayaran Kas Kecil',
        },
      ],
    };

    setJournals([newEntry, ...journals]);
    setShowNewJournalModal(false);
    setNewDesc('');
    setNewAmount('');
  };

  const filteredCoa = coaList.filter(
    (a) =>
      a.accountCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.accountName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
            <span>Chart of Accounts, Journal Posting & General Ledger</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Bagan Akun Perkebunan Sawit, Jurnal Otomatis Cross-Module & Trial Balance
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('COA')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'COA' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Chart of Accounts ({coaList.length})
          </button>
          <button
            onClick={() => setActiveTab('JOURNALS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'JOURNALS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Posting Jurnal ({journals.length})
          </button>
          <button
            onClick={() => setActiveTab('GL')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'GL' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            General Ledger
          </button>
          <button
            onClick={() => setActiveTab('TRIAL_BALANCE')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'TRIAL_BALANCE' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trial Balance
          </button>
        </div>
      </div>

      {/* COA TAB */}
      {activeTab === 'COA' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Cari Kode atau Nama Akun..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              onClick={() => alert('Form Tambah Akun COA Siap')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-4 h-4" />
              <span>+ Akun COA Baru</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Kode Akun</th>
                  <th className="p-3.5">Nama Akun COA</th>
                  <th className="p-3.5">Kategori</th>
                  <th className="p-3.5">Saldo Normal</th>
                  <th className="p-3.5">Cost Center</th>
                  <th className="p-3.5 text-right">Saldo IDR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {filteredCoa.map((coa) => (
                  <tr key={coa.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-emerald-400">{coa.accountCode}</td>
                    <td className="p-3.5 font-bold text-white">{coa.accountName}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        {coa.category}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-[11px]">{coa.normalBalance}</td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-400">{coa.costCenterCode || '-'}</td>
                    <td className="p-3.5 text-right font-mono font-bold text-white">
                      Rp {coa.currentBalanceIdr.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* JOURNALS TAB */}
      {activeTab === 'JOURNALS' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold">Daftar Posting Jurnal Otomatis & Manual</span>
            <button
              onClick={() => setShowNewJournalModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Buat Jurnal Manual</span>
            </button>
          </div>

          <div className="space-y-3">
            {journals.map((jv) => (
              <div key={jv.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-emerald-400">{jv.journalNo}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                      {jv.sourceModule}
                    </span>
                    <span className="text-xs text-slate-400">Ref: {jv.referenceNo}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{jv.transactionDate}</span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {jv.status}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white font-bold">{jv.description}</p>

                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 overflow-x-auto text-xs font-mono">
                  <div className="grid grid-cols-12 font-bold text-slate-400 border-b border-slate-800 pb-1 mb-1">
                    <div className="col-span-3">Kode / Akun</div>
                    <div className="col-span-5">Memo Keterangan</div>
                    <div className="col-span-2 text-right">Debit (IDR)</div>
                    <div className="col-span-2 text-right">Kredit (IDR)</div>
                  </div>
                  {jv.details.map((d) => (
                    <div key={d.id} className="grid grid-cols-12 py-1 text-slate-300">
                      <div className="col-span-3 text-emerald-400 font-bold">{d.accountCode} - {d.accountName}</div>
                      <div className="col-span-5 text-slate-400">{d.memo}</div>
                      <div className="col-span-2 text-right font-bold text-white">
                        {d.debitAmountIdr > 0 ? `Rp ${d.debitAmountIdr.toLocaleString('id-ID')}` : '-'}
                      </div>
                      <div className="col-span-2 text-right font-bold text-white">
                        {d.creditAmountIdr > 0 ? `Rp ${d.creditAmountIdr.toLocaleString('id-ID')}` : '-'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GENERAL LEDGER TAB */}
      {activeTab === 'GL' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-base">Buku Besar (General Ledger Detail)</h3>
              <p className="text-xs text-slate-400">Rincian mutasi debit & kredit seluruh transaksi perkebunan</p>
            </div>
            <button
              onClick={() => alert('Download GL CSV/Excel')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export Ledger</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
            <span className="text-emerald-400 font-extrabold block">Akun: 5101-001 - Biaya Panen & Angkut TBS</span>
            <div className="flex justify-between border-b border-slate-800 pb-2 text-slate-400 font-mono">
              <span>Saldo Awal MoM: Rp 3,000,000,000</span>
              <span>Total Debet YTD: Rp 1,120,000,000</span>
              <span className="text-white font-bold">Saldo Akhir: Rp 4,120,000,000</span>
            </div>
          </div>
        </div>
      )}

      {/* TRIAL BALANCE TAB */}
      {activeTab === 'TRIAL_BALANCE' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-base">Neraca Saldo (Trial Balance)</h3>
              <p className="text-xs text-slate-400">Keseimbangan Debet & Kredit Seluruh Bagan Akun COA</p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-xs">
              BALANCED ✓
            </span>
          </div>

          <div className="overflow-x-auto text-xs font-mono">
            <table className="w-full text-left">
              <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Kode Akun</th>
                  <th className="p-3">Nama Akun</th>
                  <th className="p-3 text-right">Debit (IDR)</th>
                  <th className="p-3 text-right">Kredit (IDR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {coaList.map((c) => (
                  <tr key={c.id}>
                    <td className="p-3 text-emerald-400 font-bold">{c.accountCode}</td>
                    <td className="p-3 font-sans font-bold text-white">{c.accountName}</td>
                    <td className="p-3 text-right font-bold">
                      {c.normalBalance === 'DEBIT' ? `Rp ${c.currentBalanceIdr.toLocaleString('id-ID')}` : 'Rp 0'}
                    </td>
                    <td className="p-3 text-right font-bold">
                      {c.normalBalance === 'CREDIT' ? `Rp ${c.currentBalanceIdr.toLocaleString('id-ID')}` : 'Rp 0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Jurnal Manual */}
      {showNewJournalModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs">
            <h3 className="text-base font-extrabold text-white">Buat Jurnal Manual Baru</h3>
            <form onSubmit={handleCreateJournal} className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Keterangan Transaksi Jurnal</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Penyesuaian Biaya Solar Darurat"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nominal Transaksi (IDR)</label>
                <input
                  type="number"
                  required
                  placeholder="5000000"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewJournalModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Posting Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
