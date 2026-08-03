import React from 'react';
import {
  Building2,
  Package,
  TrendingUp,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Truck,
  FileCheck,
  CheckCircle2,
  Boxes,
  Sparkles,
  BarChart3,
  Layers,
  ShoppingBag,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

import {
  WarehouseRecord,
  InventoryStockRecord,
  PurchaseRequestRecord,
  PurchaseOrderRecord,
  GoodsReceiptRecord,
  SupplierPerformanceRecord,
  AiInventoryInsight,
} from '../types';

interface InventoryDashboardViewProps {
  warehouses: WarehouseRecord[];
  stocks: InventoryStockRecord[];
  purchaseRequests: PurchaseRequestRecord[];
  purchaseOrders: PurchaseOrderRecord[];
  goodsReceipts: GoodsReceiptRecord[];
  suppliers: SupplierPerformanceRecord[];
  aiInsights: AiInventoryInsight[];
  onNavigateSubTab: (tabId: string) => void;
}

export const InventoryDashboardView: React.FC<InventoryDashboardViewProps> = ({
  warehouses = [],
  stocks = [],
  purchaseRequests = [],
  purchaseOrders = [],
  goodsReceipts = [],
  suppliers = [],
  aiInsights = [],
  onNavigateSubTab = () => {},
}) => {
  const totalItems = stocks.length;
  const totalValue = stocks.reduce((acc, s) => acc + s.totalValue, 0);
  const totalAvailableUnits = stocks.reduce((acc, s) => acc + s.available, 0);
  const totalReservedUnits = stocks.reduce((acc, s) => acc + s.reserved, 0);
  const totalInTransitUnits = stocks.reduce((acc, s) => acc + s.inTransit, 0);

  const lowStockCount = stocks.filter((s) => s.stockStatus === 'Warning' || s.stockStatus === 'Critical').length;
  const outOfStockCount = stocks.filter((s) => s.stockStatus === 'Out of Stock').length;

  const pendingPRCount = purchaseRequests.filter((pr) => pr.status === 'Submitted').length;
  const pendingPOCount = purchaseOrders.filter((po) => po.status === 'Issued').length;
  const pendingGRCount = goodsReceipts.filter((gr) => gr.status === 'Pending Review').length;

  const avgSupplierScore = (
    suppliers.reduce((acc, sup) => acc + sup.kpiScore, 0) / (suppliers.length || 1)
  ).toFixed(1);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Welcome & Quick Stats */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-950 text-white shadow-xl border border-emerald-800/50 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-800/40 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
              <Building2 className="h-4 w-4" /> Supply Chain & Inventory Central Control
            </div>
            <h2 className="text-xl font-black text-white mt-1">
              Executive Overview — Stock Valuation & Operational Logistics
            </h2>
            <p className="text-xs text-slate-300">
              Monitoring stok pupuk, agrokimia, suku cadang, BBM solar, & pengadaan barang perkebunan kelapa sawit
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateSubTab('opname-scanner')}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" /> Stock Opname Mobile
            </button>
            <button
              onClick={() => onNavigateSubTab('procurement-po')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShoppingBag className="h-4 w-4 text-emerald-400" /> Buat Purchase Request
            </button>
          </div>
        </div>

        {/* Highlight Valuation Card */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs pt-1">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Nilai Persediaan</span>
            <div className="text-lg font-black text-emerald-400">
              Rp {totalValue.toLocaleString('id-ID')}
            </div>
            <p className="text-[10px] text-slate-400">Terdistribusi di {warehouses.length} Gudang Estate</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tersedia vs Reserved</span>
            <div className="text-lg font-black text-white">
              {totalAvailableUnits.toLocaleString('id-ID')} <span className="text-xs text-slate-400 font-normal">Tersedia</span>
            </div>
            <p className="text-[10px] text-amber-400 font-bold">{totalReservedUnits.toLocaleString('id-ID')} Unit Diminta/Reserved</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pengiriman Dalam Perjalanan</span>
            <div className="text-lg font-black text-blue-400 flex items-center gap-1">
              <Truck className="h-4 w-4" /> {totalInTransitUnits.toLocaleString('id-ID')} Unit
            </div>
            <p className="text-[10px] text-slate-400">In-Transit Antar Gudang & Supplier</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Performa Vendor Supplier</span>
            <div className="text-lg font-black text-emerald-300 flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> {avgSupplierScore} / 100
            </div>
            <p className="text-[10px] text-emerald-400 font-bold">{suppliers.length} Partner Vendor Aktif</p>
          </div>
        </div>
      </div>

      {/* Grid KPI Widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          onClick={() => onNavigateSubTab('warehouse-zones')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 cursor-pointer hover:border-emerald-500 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <Building2 className="h-4 w-4 text-emerald-600" />
            <span className="text-[10px] font-bold">Gudang</span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">{warehouses.length}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Total Lokasi Storage</span>
        </div>

        <div
          onClick={() => onNavigateSubTab('item-catalog')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 cursor-pointer hover:border-emerald-500 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <Package className="h-4 w-4 text-blue-600" />
            <span className="text-[10px] font-bold">Total SKU</span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">{totalItems}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Item Barang Terdaftar</span>
        </div>

        <div
          onClick={() => onNavigateSubTab('item-catalog')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 cursor-pointer hover:border-amber-500 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-[10px] font-bold">Low Stock</span>
          </div>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400">{lowStockCount}</div>
          <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold block">Memerlukan Reorder</span>
        </div>

        <div
          onClick={() => onNavigateSubTab('procurement-po')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 cursor-pointer hover:border-purple-500 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <FileCheck className="h-4 w-4 text-purple-600" />
            <span className="text-[10px] font-bold">Pending PR</span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">{pendingPRCount}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Menunggu Approval</span>
        </div>

        <div
          onClick={() => onNavigateSubTab('procurement-po')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 cursor-pointer hover:border-emerald-500 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <ShoppingBag className="h-4 w-4 text-emerald-600" />
            <span className="text-[10px] font-bold">Pending PO</span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">{pendingPOCount}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Order Ke Supplier</span>
        </div>

        <div
          onClick={() => onNavigateSubTab('stock-movements')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 cursor-pointer hover:border-indigo-500 transition-all"
        >
          <div className="flex items-center justify-between text-slate-400">
            <Truck className="h-4 w-4 text-indigo-600" />
            <span className="text-[10px] font-bold">Goods Receipt</span>
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">{goodsReceipts.length}</div>
          <span className="text-[10px] text-slate-500 font-medium block">Sudah Diterima GRN</span>
        </div>
      </div>

      {/* Main Grid: Critical Stock Warning & AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Low Stock Items List */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                Peringatan Stok Kritis & Minimum Stock Monitoring
              </h3>
              <p className="text-xs text-slate-500">
                Item barang yang berada di bawah ambang batas safety stock atau memerlukan reorder segera
              </p>
            </div>
            <button
              onClick={() => onNavigateSubTab('item-catalog')}
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Lihat Katalog Stok →
            </button>
          </div>

          <div className="space-y-3">
            {stocks
              .filter((s) => s.stockStatus !== 'Normal')
              .map((stk) => (
                <div
                  key={stk.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {stk.itemCode}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          stk.stockStatus === 'Critical'
                            ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                        }`}
                      >
                        {stk.stockStatus}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">{stk.itemName}</h4>
                    <p className="text-[11px] text-slate-500">
                      Lokasi: {stk.warehouseName} ({stk.rackCode})
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {stk.available} / {stk.minStock} {stk.unit}
                      </div>
                      <span className="text-[10px] text-slate-400">Tersedia vs Min Stock</span>
                    </div>

                    <button
                      onClick={() => onNavigateSubTab('procurement-po')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                    >
                      Buat PR
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Right Column: AI Inventory Insights Panel */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 text-white border border-emerald-800/50 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <h3 className="font-extrabold text-sm text-white">AI Inventory Intelligence</h3>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              Active Engine
            </span>
          </div>

          <div className="space-y-3">
            {aiInsights.slice(0, 3).map((insight) => (
              <div
                key={insight.id}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-bold text-emerald-400 uppercase">{insight.category}</span>
                  <span className="text-slate-400">{insight.confidenceScore}% Confidence</span>
                </div>
                <h4 className="font-bold text-white text-xs leading-snug">{insight.title}</h4>
                <p className="text-[11px] text-slate-300">{insight.recommendedAction}</p>
                <div className="text-[10px] text-emerald-300 font-bold border-t border-slate-800 pt-1.5">
                  Estimasi Dampak: {insight.impactEstimate}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateSubTab('ai-inventory')}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs border border-slate-700 transition-all cursor-pointer text-center"
          >
            Buka AI Intelligence Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};
