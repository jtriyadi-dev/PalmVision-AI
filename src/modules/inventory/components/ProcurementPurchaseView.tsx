import React, { useState } from 'react';
import {
  ShoppingBag,
  FileCheck,
  CheckCircle2,
  Clock,
  Plus,
  AlertTriangle,
  UserCheck,
  DollarSign,
  Send,
  Building,
} from 'lucide-react';

import {
  PurchaseRequestRecord,
  PurchaseOrderRecord,
  PurchaseInvoiceRecord,
  ItemCategory,
  PRPriority,
} from '../types';

interface ProcurementPurchaseViewProps {
  purchaseRequests: PurchaseRequestRecord[];
  purchaseOrders: PurchaseOrderRecord[];
  purchaseInvoices: PurchaseInvoiceRecord[];
  onAddPR: (newPR: PurchaseRequestRecord) => void;
  onAddPO: (newPO: PurchaseOrderRecord) => void;
}

export const ProcurementPurchaseView: React.FC<ProcurementPurchaseViewProps> = ({
  purchaseRequests = [],
  purchaseOrders = [],
  purchaseInvoices = [],
  onAddPR = () => {},
  onAddPO = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'pr' | 'approval' | 'po' | 'invoices'>('pr');
  const [showAddPRModal, setShowAddPRModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New PR form
  const [prItem, setPrItem] = useState('');
  const [prCategory, setPrCategory] = useState<ItemCategory>('Pupuk');
  const [prQty, setPrQty] = useState(100);
  const [prUnit, setPrUnit] = useState('Karung');
  const [prPriority, setPrPriority] = useState<PRPriority>('High');
  const [prJustification, setPrJustification] = useState('');
  const [prCost, setPrCost] = useState(38500000);

  const handleCreatePR = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prItem) return;

    const newPR: PurchaseRequestRecord = {
      id: `pr-${Date.now()}`,
      prNumber: `PR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      requestorName: 'Ir. Agus Wijaya',
      department: 'Agronomy Field Operations',
      workOrderRef: 'WO-FERT-AUG-02',
      priority: prPriority,
      itemName: prItem,
      category: prCategory,
      requestedQuantity: Number(prQty),
      unit: prUnit,
      estimatedTotalCost: Number(prCost),
      justification: prJustification || 'Kebutuhan pemupukan & operasional kebun.',
      status: 'Submitted',
      currentApproverLevel: 'Approval Level 1: Estate Manager',
    };

    onAddPR(newPR);
    setShowAddPRModal(false);
    setPrItem('');
    setToastMessage(`Purchase Request ${newPR.prNumber} (${newPR.itemName}) berhasil dibuat!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleApprovePR = (pr: PurchaseRequestRecord) => {
    // Generate PO automatically from PR
    const newPO: PurchaseOrderRecord = {
      id: `po-${Date.now()}`,
      poNumber: `PO-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      prReference: pr.prNumber,
      supplierName: 'PT Wilmar Nabati Indonesia',
      poDate: new Date().toISOString().split('T')[0],
      expectedDeliveryDate: '2026-08-15',
      itemName: pr.itemName,
      quantity: pr.requestedQuantity,
      unit: pr.unit,
      unitPrice: Math.round(pr.estimatedTotalCost / pr.requestedQuantity),
      discountPercentage: 2,
      vatPercentage: 11,
      totalAmount: Math.round(pr.estimatedTotalCost * 1.09),
      status: 'Issued',
    };

    onAddPO(newPO);
    setToastMessage(`Purchase Request ${pr.prNumber} disetujui! PO ${newPO.poNumber} berhasil diterbitkan.`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white cursor-pointer text-sm font-bold">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Procurement Cycle — Purchase Requests, Approvals, PO & Invoices
          </h2>
          <p className="text-xs text-slate-500">
            Siklus pengadaan barang transparan: Permintaan (PR), Workflow Approval Multi-Level, Purchase Order (PO) & Tagihan Invoice
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('pr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'pr'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Purchase Request ({purchaseRequests.length})
            </button>
            <button
              onClick={() => setActiveTab('approval')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'approval'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Approval Workflow
            </button>
            <button
              onClick={() => setActiveTab('po')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'po'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Purchase Order ({purchaseOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'invoices'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Invoices ({purchaseInvoices.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddPRModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Ajukan PR Baru
          </button>
        </div>
      </div>

      {/* PR Tab */}
      {activeTab === 'pr' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchaseRequests.map((pr) => (
            <div
              key={pr.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">{pr.prNumber}</span>
                <span
                  className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                    pr.priority === 'Urgent'
                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                  }`}
                >
                  Prioritas: {pr.priority}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Pemohon: {pr.requestorName} ({pr.department})</span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">
                  {pr.itemName} ({pr.requestedQuantity} {pr.unit})
                </h4>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimasi Biaya:</span>
                  <span className="font-bold text-emerald-600">Rp {pr.estimatedTotalCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status PR:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{pr.status}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">"{pr.justification}"</p>

              {pr.status === 'Submitted' && (
                <button
                  type="button"
                  onClick={() => handleApprovePR(pr)}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-xs transition-all"
                >
                  Setujui & Terbitkan Purchase Order (PO)
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Approval Workflow Tab */}
      {activeTab === 'approval' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Struktur Workflow Multi-Level Purchase Approval Matrix
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Level 1 (&lt; Rp 50 Juta)</span>
              <h4 className="font-bold text-slate-900 dark:text-white">Kepala Gudang / Asisten Afdeling</h4>
              <p className="text-slate-500 text-[11px]">Verifikasi ketersediaan di rak & kesesuaian anggaran mingguan.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-blue-600 uppercase">Level 2 (Rp 50M - 200M)</span>
              <h4 className="font-bold text-slate-900 dark:text-white">Estate Manager / Mill Manager</h4>
              <p className="text-slate-500 text-[11px]">Persetujuan teknis operasional kebun & keselarasan Work Order.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-purple-600 uppercase">Level 3 (Rp 200M - 1M)</span>
              <h4 className="font-bold text-slate-900 dark:text-white">General Manager / Procurement Manager</h4>
              <p className="text-slate-500 text-[11px]">Negosiasi harga supplier, penentuan termin bayar & vendor contract.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Level 4 (&gt; Rp 1 Miliar)</span>
              <h4 className="font-bold text-slate-900 dark:text-white">Direksi Operasional / CFO</h4>
              <p className="text-slate-500 text-[11px]">Persetujuan capex/opex strategis pengadaan barang besar.</p>
            </div>
          </div>
        </div>
      )}

      {/* PO Tab */}
      {activeTab === 'po' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchaseOrders.map((po) => (
            <div
              key={po.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{po.poNumber}</span>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {po.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Ref PR: {po.prReference}</span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{po.supplierName}</h4>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Item Pesanan:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {po.itemName} ({po.quantity} {po.unit})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Harga Satuan:</span>
                  <span className="font-medium">Rp {po.unitPrice.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200/50 dark:border-slate-700/50 font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Total Nominal PO (inc. PPN):</span>
                  <span className="text-emerald-600">Rp {po.totalAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>Tanggal Terbit: {po.poDate}</span>
                <span>Est. Tiba: {po.expectedDeliveryDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {purchaseInvoices.map((inv) => (
            <div
              key={inv.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    inv.paymentStatus === 'Paid'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                  }`}
                >
                  {inv.paymentStatus}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Ref PO: {inv.poNumber} • GRN: {inv.grNumber}</span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{inv.supplierName}</h4>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center font-bold">
                <span>Total Tagihan:</span>
                <span className="text-emerald-600 text-sm">Rp {inv.amountTotal.toLocaleString('id-ID')}</span>
              </div>

              <p className="text-[10px] text-slate-400">Jatuh Tempo Pembayaran: {inv.dueDate}</p>
            </div>
          ))}
        </div>
      )}

      {/* Create PR Modal */}
      {showAddPRModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full space-y-4 animate-scaleUp">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-emerald-600" /> Form Pengajuan Purchase Request (PR)
            </h3>

            <form onSubmit={handleCreatePR} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Barang Kebutuhan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pupuk NPK Mahkota 50kg"
                  value={prItem}
                  onChange={(e) => setPrItem(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jumlah</label>
                  <input
                    type="number"
                    value={prQty}
                    onChange={(e) => setPrQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Satuan</label>
                  <input
                    type="text"
                    value={prUnit}
                    onChange={(e) => setPrUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Estimasi Total Biaya (Rp)</label>
                <input
                  type="number"
                  value={prCost}
                  onChange={(e) => setPrCost(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Alasan Justifikasi Kebutuhan</label>
                <textarea
                  rows={2}
                  value={prJustification}
                  onChange={(e) => setPrJustification(e.target.value)}
                  placeholder="Justifikasi penggunaan barang untuk operasional kebun..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddPRModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  Kirim PR Ke Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
