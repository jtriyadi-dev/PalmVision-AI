import React, { useState } from 'react';
import {
  QrCode,
  Scan,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Camera,
  RefreshCw,
  FileCheck,
  Building,
  Layers,
} from 'lucide-react';

import { StockOpnameRecord, InventoryStockRecord } from '../types';

interface StockOpnameScannerViewProps {
  opnames: StockOpnameRecord[];
  stocks: InventoryStockRecord[];
  onAddOpname: (newOp: StockOpnameRecord) => void;
}

export const StockOpnameScannerView: React.FC<StockOpnameScannerViewProps> = ({
  opnames = [],
  stocks = [],
  onAddOpname = () => {},
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [scannedItem, setScannedItem] = useState<InventoryStockRecord | null>(null);

  const [physicalCount, setPhysicalCount] = useState<number>(0);
  const [opnameNote, setOpnameNote] = useState('');
  const [opnameHistory, setOpnameHistory] = useState<StockOpnameRecord[]>(opnames);
  const [scannedItemsList, setScannedItemsList] = useState<
    { itemCode: string; name: string; systemQty: number; physicalQty: number; variance: number }[]
  >([
    {
      itemCode: 'ITEM-PPK-001',
      name: 'Pupuk Urea Subsidized Granular 50kg',
      systemQty: 840,
      physicalQty: 836,
      variance: -4,
    },
    {
      itemCode: 'ITEM-HER-001',
      name: 'Herbisida Glifosat 480 SL 20L',
      systemQty: 28,
      physicalQty: 28,
      variance: 0,
    },
  ]);

  const handleSimulateScan = (code: string) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedCode(code);
      const found = stocks.find((s) => s.itemCode === code || s.itemId === code) || stocks[0];
      setScannedItem(found);
      setPhysicalCount(found.available);
    }, 1200);
  };

  const handleAddScannedItem = () => {
    if (!scannedItem) return;
    const variance = physicalCount - scannedItem.available;
    const entry = {
      itemCode: scannedItem.itemCode,
      name: scannedItem.itemName,
      systemQty: scannedItem.available,
      physicalQty: physicalCount,
      variance,
    };

    setScannedItemsList([entry, ...scannedItemsList.filter((i) => i.itemCode !== scannedItem.itemCode)]);
    setScannedItem(null);
    setScannedCode(null);
  };

  const handleSubmitOpnameSession = () => {
    const matched = scannedItemsList.filter((i) => i.variance === 0).length;
    const disc = scannedItemsList.filter((i) => i.variance !== 0).length;

    const newOp: StockOpnameRecord = {
      id: `opn-${Date.now()}`,
      opnameNumber: `OPN-PHYSICAL-${Date.now().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      warehouseName: 'Gudang Utama Central Estate',
      zoneCode: 'ZONE-PUPUK-A',
      totalItemsScanned: scannedItemsList.length,
      matchedCount: matched,
      discrepancyCount: disc,
      conductedBy: 'Auditor Stock Opname Field',
      status: 'Submitted for Approval',
    };

    onAddOpname(newOp);
    setOpnameHistory([newOp, ...opnameHistory]);
    alert('Sesi Stock Opname berhasil disubmit untuk approval verifikasi!');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Scan className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Mobile Barcode / QR Code Stock Opname & Variance Verification
        </h2>
        <p className="text-xs text-slate-500">
          Modul pemindaian fisik fisik barang di lokasi rak gudang, perbandingan dengan saldo sistem realtime & penyesuaian selisih
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Scanner & Camera Simulation */}
        <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 text-white space-y-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Camera className="h-4 w-4" /> Visual Barcode / QR Scanner Ready
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Camera Active
            </span>
          </div>

          {/* Scanner Viewfinder Simulation Box */}
          <div className="relative h-56 rounded-2xl bg-slate-900 border-2 border-dashed border-emerald-500/50 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
            {isScanning ? (
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin" />
                <span className="text-xs text-slate-300 font-bold">Membaca Barcode / QR Code...</span>
              </div>
            ) : scannedItem ? (
              <div className="space-y-2 text-center animate-scaleUp">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                  SCANNED: {scannedItem.itemCode}
                </span>
                <h4 className="font-extrabold text-sm text-white">{scannedItem.itemName}</h4>
                <p className="text-xs text-slate-400">
                  Gudang: {scannedItem.warehouseName} ({scannedItem.rackCode})
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <QrCode className="h-12 w-12 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">Arahkan kamera smartphone atau klik tombol cepat di bawah untuk simulasi scan</p>
              </div>
            )}
          </div>

          {/* Quick Scan Preset Buttons */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Simulasi Scan Cepat SKU:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSimulateScan('ITEM-PPK-001')}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left font-mono text-emerald-400 font-bold cursor-pointer"
              >
                Scan ITEM-PPK-001
              </button>
              <button
                type="button"
                onClick={() => handleSimulateScan('ITEM-HER-001')}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left font-mono text-emerald-400 font-bold cursor-pointer"
              >
                Scan ITEM-HER-001
              </button>
              <button
                type="button"
                onClick={() => handleSimulateScan('ITEM-PAN-001')}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left font-mono text-emerald-400 font-bold cursor-pointer"
              >
                Scan ITEM-PAN-001
              </button>
              <button
                type="button"
                onClick={() => handleSimulateScan('ITEM-OLI-001')}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left font-mono text-emerald-400 font-bold cursor-pointer"
              >
                Scan ITEM-OLI-001
              </button>
            </div>
          </div>

          {/* Quantity Verification Inputs */}
          {scannedItem && (
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs animate-fadeIn">
              <div className="flex justify-between items-center text-slate-400 text-[11px]">
                <span>Saluran Stok Sistem:</span>
                <span className="font-bold text-white">{scannedItem.available} {scannedItem.unit}</span>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">Hasil Hitung Fisik (Physical Count):</label>
                <input
                  type="number"
                  value={physicalCount}
                  onChange={(e) => setPhysicalCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-black text-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-xs font-bold">
                <span>Varian Selisih:</span>
                <span
                  className={
                    physicalCount - scannedItem.available === 0
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }
                >
                  {physicalCount - scannedItem.available} {scannedItem.unit}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddScannedItem}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer shadow-md transition-all"
              >
                + Tambah Hasil Hitung ke List Opname
              </button>
            </div>
          )}
        </div>

        {/* Right Columns: Scanned Items Variance Table & History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-emerald-600" />
                  Daftar Barang Dihitung Pada Sesi Opname Saat Ini
                </h3>
                <p className="text-xs text-slate-500">Hasil komparasi saldo di buku stok vs barang riil di rak</p>
              </div>

              <button
                onClick={handleSubmitOpnameSession}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all shadow-xs"
              >
                Submit Verifikasi Opname
              </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-4 py-3 font-bold">Kode SKU</th>
                    <th className="px-4 py-3 font-bold">Nama Barang</th>
                    <th className="px-4 py-3 font-bold text-right">Stok Sistem</th>
                    <th className="px-4 py-3 font-bold text-right">Fisik Dihitung</th>
                    <th className="px-4 py-3 font-bold text-right">Selisih Varian</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {scannedItemsList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                        {item.itemCode}
                      </td>
                      <td className="px-4 py-3 font-bold">{item.name}</td>
                      <td className="px-4 py-3 text-right font-semibold">{item.systemQty}</td>
                      <td className="px-4 py-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                        {item.physicalQty}
                      </td>
                      <td
                        className={`px-4 py-3 text-right font-black ${
                          item.variance === 0
                            ? 'text-emerald-600'
                            : 'text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {item.variance > 0 ? `+${item.variance}` : item.variance}
                      </td>
                      <td className="px-4 py-3 font-bold">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] ${
                            item.variance === 0
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                          }`}
                        >
                          {item.variance === 0 ? 'Sesuai (Matched)' : 'Selisih Diproses'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Historical Opname Audits */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              Riwayat Audit Stock Opname Sebelumnya
            </h3>

            <div className="space-y-3">
              {opnameHistory.map((op) => (
                <div
                  key={op.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{op.opnameNumber}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                        {op.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Lokasi: {op.warehouseName} • Zona: {op.zoneCode} • Oleh: {op.conductedBy}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      {op.matchedCount} Matched / {op.discrepancyCount} Selisih
                    </span>
                    <span className="text-[10px] text-slate-400">{op.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
