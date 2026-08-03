import React, { useState } from 'react';
import {
  DollarSign,
  TrendingDown,
  ShieldCheck,
  Trash2,
  Boxes,
  FileText,
  PieChart,
  CheckCircle2,
  Filter,
  Search,
} from 'lucide-react';
import {
  SparePartUsage,
  AssetDepreciationRecord,
  AssetDisposal,
} from '../types';

interface CostDepreciationDisposalViewProps {
  sparePartUsages?: SparePartUsage[];
  depreciationRecords?: AssetDepreciationRecord[];
  disposals?: AssetDisposal[];
}

export const CostDepreciationDisposalView: React.FC<CostDepreciationDisposalViewProps> = ({
  sparePartUsages = [],
  depreciationRecords = [],
  disposals = [],
}) => {
  const [activeTab, setActiveTab] = useState<'depreciation' | 'disposal' | 'spareparts'>('depreciation');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" /> Biaya Perawatan, Penyusutan Aset & Penghapusan (Disposal)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Akuntansi Aset Kebun: Pemakaian Spare Part, Metodologi Depresiasi Garis Lurus/Declining & Workflow Afkir.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('depreciation')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'depreciation' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Penyusutan (Depresiasi)
          </button>
          <button
            onClick={() => setActiveTab('disposal')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'disposal' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Disposal & Afkir ({disposals.length})
          </button>
          <button
            onClick={() => setActiveTab('spareparts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'spareparts' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Pemakaian Sparepart ({sparePartUsages.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Depreciation */}
      {activeTab === 'depreciation' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Kode & Nama Aset</th>
                  <th className="p-3.5">Metode Penyusutan</th>
                  <th className="p-3.5">Harga Perolehan</th>
                  <th className="p-3.5">Akumulasi Penyusutan</th>
                  <th className="p-3.5">Nilai Buku Saat Ini</th>
                  <th className="p-3.5 text-right">Penyusutan Tahunan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                {depreciationRecords.map((dep) => (
                  <tr key={dep.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <span className="font-mono text-emerald-400 font-bold block">{dep.assetCode}</span>
                      <span className="font-bold text-white block text-xs">{dep.assetName}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-slate-200 font-bold block">{dep.method}</span>
                      <span className="text-[10px] text-slate-400">{dep.usefulLifeYears} Tahun Masa Pakai</span>
                    </td>
                    <td className="p-3.5 font-bold text-white">
                      Rp {dep.purchaseCost.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3.5 text-rose-400 font-bold">
                      Rp {dep.accumulatedDepreciation.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3.5 font-black text-emerald-400">
                      Rp {dep.currentBookValue.toLocaleString('id-ID')}
                    </td>
                    <td className="p-3.5 text-right font-bold text-amber-300">
                      Rp {dep.annualDepreciation.toLocaleString('id-ID')} / Thn
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Disposal */}
      {activeTab === 'disposal' && (
        <div className="space-y-4">
          {disposals.map((dsp) => (
            <div key={dsp.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400">{dsp.disposalNumber}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{dsp.assetName} ({dsp.assetCode})</h3>
                </div>
                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
                  {dsp.status}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Metode Afkir</span>
                  <span className="font-bold text-white mt-0.5 block">{dsp.method}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Nilai Perolehan Awal</span>
                  <span className="font-bold text-slate-200 mt-0.5 block">Rp {dsp.originalCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Harga Jual / Scrap</span>
                  <span className="font-bold text-emerald-400 mt-0.5 block">Rp {dsp.saleAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Laba / (Rugi) Pelepasan</span>
                  <span className="font-bold text-amber-400 mt-0.5 block">Rp {dsp.gainLoss.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex justify-between pt-2">
                <span>Disetujui Oleh: <strong className="text-white">{dsp.approvedBy}</strong></span>
                <span>Tanggal Penjualan: {dsp.disposalDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Spare Parts */}
      {activeTab === 'spareparts' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Riwayat Pengeluaran Sparepart Terintegrasi Gudang Inventory</h3>
          <div className="space-y-3">
            {sparePartUsages.map((sp) => (
              <div key={sp.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-emerald-400">{sp.partCode}</span>
                    <span className="font-bold text-white">{sp.partName}</span>
                  </div>
                  <p className="text-slate-400 mt-0.5">
                    Unit Terpasang: {sp.assetName} ({sp.assetCode}) • Gudang Sumber: {sp.warehouseSource}
                  </p>
                </div>

                <div className="text-right self-end sm:self-center">
                  <span className="text-emerald-400 font-bold block">{sp.quantity} Pcs • Rp {sp.totalCost.toLocaleString('id-ID')}</span>
                  <span className="text-[10px] text-slate-400">WO Ref: {sp.workOrderId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
