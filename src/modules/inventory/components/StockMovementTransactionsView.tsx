import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  FileCheck,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building,
  UserCheck,
} from 'lucide-react';

import {
  InventoryMovementRecord,
  GoodsReceiptRecord,
  GoodsIssueRecord,
  StockTransferRecord,
  StockAdjustmentRecord,
} from '../types';

interface StockMovementTransactionsViewProps {
  movements: InventoryMovementRecord[];
  goodsReceipts: GoodsReceiptRecord[];
  goodsIssues: GoodsIssueRecord[];
  transfers: StockTransferRecord[];
  adjustments: StockAdjustmentRecord[];
  onAddMovement: (mov: InventoryMovementRecord) => void;
  onAddTransfer: (trf: StockTransferRecord) => void;
}

export const StockMovementTransactionsView: React.FC<StockMovementTransactionsViewProps> = ({
  movements = [],
  goodsReceipts = [],
  goodsIssues = [],
  transfers = [],
  adjustments = [],
  onAddMovement = () => {},
  onAddTransfer = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'receipts' | 'issues' | 'transfers' | 'adjustments'>('timeline');
  const [showTransferModal, setShowTransferModal] = useState(false);

  // New Transfer form state
  const [trfItem, setTrfItem] = useState('Pupuk Urea Subsidized Granular 50kg');
  const [trfCode, setTrfCode] = useState('ITEM-PPK-001');
  const [trfQty, setTrfQty] = useState(50);
  const [sourceWh, setSourceWh] = useState('Gudang Utama Central Estate');
  const [destWh, setDestWh] = useState('Gudang Pupuk & Bahan Kimia Afdeling 1');

  const handleCreateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const created: StockTransferRecord = {
      id: `trf-${Date.now()}`,
      transferNumber: `TRF-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      sourceWarehouse: sourceWh,
      destinationWarehouse: destWh,
      itemCode: trfCode,
      itemName: trfItem,
      quantity: Number(trfQty),
      unit: 'Karung',
      status: 'In Transit',
      requestedBy: 'Asisten Afdeling',
      approvedBy: 'Head Estate Manager',
    };

    onAddTransfer(created);

    // Also record movement
    const mov: InventoryMovementRecord = {
      id: `mov-${Date.now()}`,
      movementNumber: `MOV-TRF-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      movementType: 'Stock Transfer',
      itemId: 'item-01',
      itemCode: trfCode,
      itemName: trfItem,
      quantity: Number(trfQty),
      unit: 'Karung',
      sourceLocation: sourceWh,
      destinationLocation: destWh,
      referenceNumber: created.transferNumber,
      actorName: 'Asisten Afdeling',
      notes: 'Transfer stok antar gudang afdeling kebun.',
    };
    onAddMovement(mov);

    setShowTransferModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Stock Movements, Receipts, Issues & Transfers
          </h2>
          <p className="text-xs text-slate-500">
            Pencatatan mutasi barang masuk (GRN), keluar (GI), transfer antar gudang, dan adjustment fisik
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'timeline'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Timeline Mutasi ({movements.length})
            </button>
            <button
              onClick={() => setActiveTab('receipts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'receipts'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Goods Receipt ({goodsReceipts.length})
            </button>
            <button
              onClick={() => setActiveTab('issues')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'issues'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Goods Issue ({goodsIssues.length})
            </button>
            <button
              onClick={() => setActiveTab('transfers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'transfers'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Stock Transfer ({transfers.length})
            </button>
          </div>

          <button
            onClick={() => setShowTransferModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Buat Transfer Stok
          </button>
        </div>
      </div>

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Realtime Audit Trail Log Mutasi Barang Gudang
          </h3>

          <div className="space-y-3">
            {movements.map((mov) => (
              <div
                key={mov.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        mov.movementType === 'Goods Receipt'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : mov.movementType === 'Goods Issue'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                      }`}
                    >
                      {mov.movementType}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{mov.movementNumber}</span>
                    <span className="text-[10px] font-mono text-slate-400">• {mov.timestamp}</span>
                  </div>

                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                    {mov.itemName} ({mov.quantity} {mov.unit})
                  </h4>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    <span className="font-bold">Dari:</span> {mov.sourceLocation} → <span className="font-bold">Ke:</span> {mov.destinationLocation}
                  </p>
                </div>

                <div className="text-right text-[11px]">
                  <span className="text-slate-400 block">Ref: {mov.referenceNumber}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Petugas: {mov.actorName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goods Receipt Tab */}
      {activeTab === 'receipts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goodsReceipts.map((gr) => (
            <div
              key={gr.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{gr.grNumber}</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {gr.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Ref PO: {gr.poNumber}</span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{gr.supplierName}</h4>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Gudang Penerima:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{gr.warehouseName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Jumlah Diterima:</span>
                  <span className="font-bold text-emerald-600">{gr.totalQuantity} Unit</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Status Fisik QC:</span>
                  <span className="font-bold text-blue-600">{gr.conditionStatus}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 italic">"{gr.notes}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Goods Issue Tab */}
      {activeTab === 'issues' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goodsIssues.map((gi) => (
            <div
              key={gi.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">{gi.giNumber}</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                  {gi.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">Work Order: {gi.destinationWorkOrder}</span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{gi.fieldActivity}</h4>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Item Barang:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{gi.itemName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Jumlah Dikeluarkan:</span>
                  <span className="font-bold text-amber-600">{gi.quantity} {gi.unit}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Pemohon / Approver:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{gi.requestorName} / {gi.approverName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stock Transfers Tab */}
      {activeTab === 'transfers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {transfers.map((trf) => (
            <div
              key={trf.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">{trf.transferNumber}</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  {trf.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-bold block">{trf.itemCode}</span>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">
                  {trf.itemName} ({trf.quantity} {trf.unit})
                </h4>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Asal Gudang:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{trf.sourceWarehouse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tujuan Transfer:</span>
                  <span className="font-bold text-emerald-600">{trf.destinationWarehouse}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Transfer Stock Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full space-y-4 animate-scaleUp">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <ArrowRightLeft className="h-5 w-5 text-emerald-600" /> Permintaan Transfer Stok Antar Gudang
            </h3>

            <form onSubmit={handleCreateTransfer} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Pilih Item Barang</label>
                <select
                  value={trfItem}
                  onChange={(e) => {
                    setTrfItem(e.target.value);
                    if (e.target.value.includes('Urea')) setTrfCode('ITEM-PPK-001');
                    else setTrfCode('ITEM-HER-001');
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Pupuk Urea Subsidized Granular 50kg">Pupuk Urea Subsidized Granular 50kg</option>
                  <option value="Pupuk NPK 13-6-27-4+B Sawit Premium 50kg">Pupuk NPK 13-6-27-4+B Sawit Premium 50kg</option>
                  <option value="Herbisida Glifosat 480 SL 20L">Herbisida Glifosat 480 SL 20L</option>
                  <option value="Oli Mesin Heavy Duty Diesel 15W-40 200L">Oli Mesin Heavy Duty Diesel 15W-40 200L</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jumlah Transfer</label>
                <input
                  type="number"
                  required
                  value={trfQty}
                  onChange={(e) => setTrfQty(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Asal Gudang Pengirim</label>
                <input
                  type="text"
                  value={sourceWh}
                  onChange={(e) => setSourceWh(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Gudang Tujuan Penerima</label>
                <input
                  type="text"
                  value={destWh}
                  onChange={(e) => setDestWh(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  Kirim Dokumen Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
