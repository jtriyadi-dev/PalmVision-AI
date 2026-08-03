import React, { useState } from 'react';
import {
  Building2,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  FileText,
} from 'lucide-react';
import { INITIAL_SUPPLIER_INVOICES, INITIAL_CUSTOMER_INVOICES } from '../mockData';
import { SupplierInvoice, CustomerInvoice } from '../types';

export const ApArInvoicingView: React.FC = () => {
  const [supplierInvoices, setSupplierInvoices] = useState<SupplierInvoice[]>(INITIAL_SUPPLIER_INVOICES);
  const [customerInvoices, setCustomerInvoices] = useState<CustomerInvoice[]>(INITIAL_CUSTOMER_INVOICES);
  const [activeTab, setActiveTab] = useState<'AP' | 'AR' | 'AGING'>('AP');

  const handlePaySupplierInvoice = (id: string) => {
    setSupplierInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              paidAmountIdr: inv.amountIdr,
              remainingAmountIdr: 0,
              status: 'PAID',
            }
          : inv
      )
    );
    alert('Pembayaran Supplier Invoice Berhasil Diposting ke Bank!');
  };

  const handleReceiveCustomerPayment = (id: string) => {
    setCustomerInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              paidAmountIdr: inv.amountIdr,
              remainingAmountIdr: 0,
              status: 'PAID',
            }
          : inv
      )
    );
    alert('Penerimaan Piutang Penjualan CPO Berhasil Diposting ke Bank!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <span>Account Payable (Hutang Supplier) & Account Receivable (Piutang CPO)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tagihan Pupuk Petrokimia, Sparepart UT, & Penjualan CPO Kontrak Wilmar/GAR
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('AP')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'AP' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Hutang Dagang AP ({supplierInvoices.length})
          </button>
          <button
            onClick={() => setActiveTab('AR')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'AR' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Piutang Penjualan AR ({customerInvoices.length})
          </button>
          <button
            onClick={() => setActiveTab('AGING')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'AGING' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Laporan Aging Umur Piutang/Hutang
          </button>
        </div>
      </div>

      {/* AP TAB */}
      {activeTab === 'AP' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold">Daftar Tagihan Supplier (Account Payable)</span>
            <button
              onClick={() => alert('Form Invoicing Supplier Baru Siap')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Register Invoice Supplier</span>
            </button>
          </div>

          <div className="space-y-3">
            {supplierInvoices.map((inv) => (
              <div key={inv.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <span className="font-mono text-xs font-black text-emerald-400">{inv.invoiceNo}</span>
                    <h3 className="font-bold text-white text-sm">{inv.supplierName}</h3>
                    <p className="text-slate-400 text-[11px]">Ref PO Procurement: {inv.poReferenceNo}</p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        inv.status === 'PAID'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Jatuh Tempo: {inv.dueDate}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="font-mono space-y-0.5">
                    <p className="text-slate-400">Total Invoice: <strong className="text-white">Rp {inv.amountIdr.toLocaleString('id-ID')}</strong></p>
                    <p className="text-rose-400 font-bold">Sisa Hutang: Rp {inv.remainingAmountIdr.toLocaleString('id-ID')}</p>
                  </div>

                  {inv.remainingAmountIdr > 0 && (
                    <button
                      onClick={() => handlePaySupplierInvoice(inv.id)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Bayar Pelunasan (Bank Transfer)</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AR TAB */}
      {activeTab === 'AR' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold">Daftar Tagihan Penjualan CPO & PK (Account Receivable)</span>
            <button
              onClick={() => alert('Form Billing CPO Siap')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Terbitkan Billing Invoice CPO</span>
            </button>
          </div>

          <div className="space-y-3">
            {customerInvoices.map((cinv) => (
              <div key={cinv.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                  <div>
                    <span className="font-mono text-xs font-black text-cyan-400">{cinv.invoiceNo}</span>
                    <h3 className="font-bold text-white text-sm">{cinv.customerName}</h3>
                    <p className="text-slate-400 text-[11px]">
                      Kontrak: {cinv.contractReferenceNo} • {cinv.quantityTons} Ton {cinv.productType.replace('_', ' ')}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        cinv.status === 'PAID'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      }`}
                    >
                      {cinv.status}
                    </span>
                    <p className="text-[11px] text-slate-400 mt-0.5">Jatuh Tempo: {cinv.dueDate}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="font-mono space-y-0.5">
                    <p className="text-slate-400">Nilai Invoice CPO: <strong className="text-white">Rp {cinv.amountIdr.toLocaleString('id-ID')}</strong></p>
                    <p className="text-emerald-400 font-bold">Terbayar: Rp {cinv.paidAmountIdr.toLocaleString('id-ID')}</p>
                    {cinv.remainingAmountIdr > 0 && (
                      <p className="text-amber-400 font-bold">Sisa Piutang: Rp {cinv.remainingAmountIdr.toLocaleString('id-ID')}</p>
                    )}
                  </div>

                  {cinv.remainingAmountIdr > 0 && (
                    <button
                      onClick={() => handleReceiveCustomerPayment(cinv.id)}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <DollarSign className="w-4 h-4" />
                      <span>Terima Pembayaran Customer</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AGING TAB */}
      {activeTab === 'AGING' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-white text-base">Laporan Analisis Aging Umur Piutang & Hutang</h3>
            <p className="text-slate-400">Kategori Jatuh Tempo: Current (0-30 Hari), 31-60 Hari, & Overdue 60+ Hari</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">0 - 30 Hari (Lancar)</span>
              <p className="text-lg font-black text-emerald-400">Rp 4.25 Miliar</p>
              <p className="text-[10px] text-slate-500">Invoice CPO Wilmar Dumai</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">31 - 60 Hari</span>
              <p className="text-lg font-black text-amber-400">Rp 850 Juta</p>
              <p className="text-[10px] text-slate-500">Hutang Pupuk Petrokimia</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Overdue &gt; 60 Hari</span>
              <p className="text-lg font-black text-rose-400">Rp 0 (NIL)</p>
              <p className="text-[10px] text-emerald-400 font-bold">Kualitas Kredit Sangat Baik ✓</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
