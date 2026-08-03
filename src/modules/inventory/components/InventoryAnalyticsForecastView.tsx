import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  FileSpreadsheet,
  Download,
  Printer,
  Sparkles,
  Calendar,
  AlertTriangle,
  Clock,
  PieChart,
} from 'lucide-react';

import { InventoryStockRecord, InventoryForecastRecord } from '../types';

interface InventoryAnalyticsForecastViewProps {
  stocks: InventoryStockRecord[];
  forecasts: InventoryForecastRecord[];
}

export const InventoryAnalyticsForecastView: React.FC<InventoryAnalyticsForecastViewProps> = ({
  stocks = [],
  forecasts = [],
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'30 Hari' | '90 Hari' | '1 Tahun'>('30 Hari');

  const totalValuation = stocks.reduce((acc, s) => acc + s.totalValue, 0);

  // Group Valuation by Category
  const categoryValuationMap: Record<string, number> = {};
  stocks.forEach((s) => {
    categoryValuationMap[s.category] = (categoryValuationMap[s.category] || 0) + s.totalValue;
  });

  const handleExport = (format: string) => {
    alert(`Laporan Persediaan & Forecast (${format}) berhasil diekspor!`);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Inventory Valuation, Fast/Slow Moving & Demand Forecast
          </h2>
          <p className="text-xs text-slate-500">
            Analisis finansial persediaan kebun, deteksi barang mati (dead stock), dan proyeksi konsumsi pupuk & BBM
          </p>
        </div>

        {/* Export Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('PDF')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-red-500" /> PDF Report
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" /> Excel (.xlsx)
          </button>
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Printer className="h-3.5 w-3.5" /> Print
          </button>
        </div>
      </div>

      {/* Valuation Breakdown & Fast vs Slow Moving */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Valuation Chart Card */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Metrik Finansial</span>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">
              Distribusi Nilai Persediaan Per Kategori
            </h3>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1">
              Rp {totalValuation.toLocaleString('id-ID')}
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(categoryValuationMap).map(([cat, val]) => {
              const pct = Math.round((val / (totalValuation || 1)) * 100);
              return (
                <div key={cat} className="space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300">
                    <span>{cat}</span>
                    <span>Rp {val.toLocaleString('id-ID')} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fast Moving vs Slow Moving vs Dead Stock */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">
            Klasifikasi Perputaran Barang (ABC Analysis & Turn Over Rate)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Fast Moving (Turnover &lt; 15 Hari)</span>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Solar B35 Industri, Pupuk Urea 50kg, Egrek Panen KAPLUS
              </p>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block">
                Intensitas Reorder: Sangat Tinggi
              </span>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 space-y-2">
              <span className="font-bold text-blue-800 dark:text-blue-300 block">Medium Moving (15 - 45 Hari)</span>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Pupuk NPK Mahkota, Herbisida Glifosat, Oli Mesin Diesel 15W40
              </p>
              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 block">
                Intensitas Reorder: Normal Terjadwal
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 space-y-2">
              <span className="font-bold text-amber-800 dark:text-amber-300 block">Slow / Dead Stock (&gt; 90 Hari)</span>
              <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                Egrek Model-2021 Lama, Sparepart Traktor Generasi Tua
              </p>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 block">
                Rekomendasi: Pemutihan / Lelang
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Demand Forecast Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-emerald-600" /> Proyeksi Demand Forecast Konsumsi Barang
            </h3>
            <p className="text-xs text-slate-500">Estimasi kebutuhan berdasarkan histori pemakaian rotasi kebun</p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            {['30 Hari', '90 Hari', '1 Tahun'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period as any)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedPeriod === period
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-bold">Kode SKU & Item</th>
                <th className="px-4 py-3 font-bold">Kategori</th>
                <th className="px-4 py-3 font-bold text-right">Stok Saat Ini</th>
                <th className="px-4 py-3 font-bold text-right">Prediksi Konsumsi ({selectedPeriod})</th>
                <th className="px-4 py-3 font-bold text-right">Rekomendasi Reorder</th>
                <th className="px-4 py-3 font-bold">Tanggal Reorder Disarankan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {forecasts.map((fc) => (
                <tr key={fc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 text-[10px] block">{fc.itemCode}</span>
                    {fc.itemName}
                  </td>
                  <td className="px-4 py-3 font-semibold">{fc.category}</td>
                  <td className="px-4 py-3 text-right font-bold">
                    {fc.currentStock} {fc.unit}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-amber-600 dark:text-amber-400">
                    {fc.predictedConsumption} {fc.unit}
                  </td>
                  <td className="px-4 py-3 text-right font-black text-emerald-600 dark:text-emerald-400">
                    {fc.recommendedOrderQuantity} {fc.unit}
                  </td>
                  <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-300">
                    {fc.suggestedOrderDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
