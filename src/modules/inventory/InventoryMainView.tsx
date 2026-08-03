import React, { useState } from 'react';
import {
  Boxes,
  LayoutDashboard,
  Building2,
  Package,
  ArrowRightLeft,
  Scan,
  ShoppingBag,
  Award,
  BarChart3,
  BrainCircuit,
  Server,
  Truck,
} from 'lucide-react';

import {
  INITIAL_WAREHOUSES,
  INITIAL_WAREHOUSE_ZONES as INITIAL_ZONES,
  INITIAL_WAREHOUSE_RACKS as INITIAL_RACKS,
  INITIAL_INVENTORY_ITEMS as INITIAL_ITEMS,
  INITIAL_INVENTORY_STOCKS as INITIAL_STOCKS,
  INITIAL_INVENTORY_MOVEMENTS as INITIAL_MOVEMENTS,
  INITIAL_GOODS_RECEIPTS as INITIAL_RECEIPTS,
  INITIAL_GOODS_ISSUES as INITIAL_ISSUES,
  INITIAL_STOCK_TRANSFERS as INITIAL_TRANSFERS,
  INITIAL_STOCK_ADJUSTMENTS as INITIAL_ADJUSTMENTS,
  INITIAL_STOCK_OPNAMES as INITIAL_OPNAMES,
  INITIAL_PURCHASE_REQUESTS as INITIAL_PRS,
  INITIAL_PURCHASE_ORDERS as INITIAL_POS,
  INITIAL_PURCHASE_INVOICES as INITIAL_INVOICES,
  INITIAL_SUPPLIER_PERFORMANCE as INITIAL_SUPPLIERS,
  INITIAL_INVENTORY_FORECASTS as INITIAL_FORECASTS,
  INITIAL_AI_INVENTORY_INSIGHTS as INITIAL_AI_INSIGHTS,
} from './mockData';

import {
  WarehouseRecord,
  InventoryItemRecord,
  InventoryStockRecord,
  InventoryMovementRecord,
  StockTransferRecord,
  StockOpnameRecord,
  PurchaseRequestRecord,
  PurchaseOrderRecord,
} from './types';

import { InventoryDashboardView } from './components/InventoryDashboardView';
import { WarehouseRackZoneView } from './components/WarehouseRackZoneView';
import { InventoryItemStockView } from './components/InventoryItemStockView';
import { StockMovementTransactionsView } from './components/StockMovementTransactionsView';
import { StockOpnameScannerView } from './components/StockOpnameScannerView';
import { ProcurementPurchaseView } from './components/ProcurementPurchaseView';
import { SupplierPerformanceView } from './components/SupplierPerformanceView';
import { InventoryAnalyticsForecastView } from './components/InventoryAnalyticsForecastView';
import { AIInventoryIntelligenceView } from './components/AIInventoryIntelligenceView';
import { InventoryApiDocsView } from './components/InventoryApiDocsView';
import { Prompt10RoadmapView } from './components/Prompt10RoadmapView';

export const InventoryMainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'warehouses'
    | 'catalog'
    | 'movements'
    | 'opname'
    | 'procurement'
    | 'suppliers'
    | 'analytics'
    | 'ai'
    | 'api'
    | 'prompt10'
  >('dashboard');

  // State Management
  const [warehouses, setWarehouses] = useState<WarehouseRecord[]>(INITIAL_WAREHOUSES);
  const [zones] = useState(INITIAL_ZONES);
  const [racks] = useState(INITIAL_RACKS);
  const [items, setItems] = useState<InventoryItemRecord[]>(INITIAL_ITEMS);
  const [stocks, setStocks] = useState<InventoryStockRecord[]>(INITIAL_STOCKS);
  const [movements, setMovements] = useState<InventoryMovementRecord[]>(INITIAL_MOVEMENTS);
  const [receipts] = useState(INITIAL_RECEIPTS);
  const [issues] = useState(INITIAL_ISSUES);
  const [transfers, setTransfers] = useState<StockTransferRecord[]>(INITIAL_TRANSFERS);
  const [adjustments] = useState(INITIAL_ADJUSTMENTS);
  const [opnames, setOpnames] = useState<StockOpnameRecord[]>(INITIAL_OPNAMES);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequestRecord[]>(INITIAL_PRS);
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderRecord[]>(INITIAL_POS);
  const [purchaseInvoices] = useState(INITIAL_INVOICES);
  const [suppliers] = useState(INITIAL_SUPPLIERS);
  const [forecasts] = useState(INITIAL_FORECASTS);
  const [aiInsights] = useState(INITIAL_AI_INSIGHTS);

  // Add Handlers
  const handleAddWarehouse = (wh: WarehouseRecord) => {
    setWarehouses([wh, ...warehouses]);
  };

  const handleAddItem = (newItem: InventoryItemRecord) => {
    setItems([newItem, ...items]);
    const newStock: InventoryStockRecord = {
      id: `stock-${newItem.id}`,
      itemId: newItem.id,
      itemCode: newItem.itemCode,
      itemName: newItem.name,
      category: newItem.category,
      warehouseName: newItem.defaultWarehouseName,
      rackCode: newItem.defaultRackCode,
      available: newItem.minStock,
      reserved: 0,
      inTransit: 0,
      totalValue: newItem.minStock * newItem.buyPrice,
      lastUpdated: new Date().toISOString().split('T')[0],
      stockStatus: 'Normal',
    };
    setStocks([newStock, ...stocks]);
  };

  const handleAddMovement = (mov: InventoryMovementRecord) => {
    setMovements([mov, ...movements]);
  };

  const handleAddTransfer = (trf: StockTransferRecord) => {
    setTransfers([trf, ...transfers]);
  };

  const handleAddOpname = (op: StockOpnameRecord) => {
    setOpnames([op, ...opnames]);
  };

  const handleAddPR = (pr: PurchaseRequestRecord) => {
    setPurchaseRequests([pr, ...purchaseRequests]);
  };

  const handleAddPO = (po: PurchaseOrderRecord) => {
    setPurchaseOrders([po, ...purchaseOrders]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Main Navigation Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
            <Boxes className="h-7 w-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                Supply Chain & ERP Module (Prompt 9)
              </span>
              <span className="text-xs text-slate-400 font-mono">• v3.2 Enterprise Edition</span>
            </div>
            <h1 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
              Inventory, Warehouse, Procurement & Smart Supply Chain
            </h1>
          </div>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-3 text-xs border-t lg:border-t-0 border-slate-100 dark:border-slate-800 pt-3 lg:pt-0">
          <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">
            <span className="text-slate-400 block text-[10px]">Total Gudang</span>
            <span className="text-slate-900 dark:text-white text-sm">{warehouses.length} Gudang</span>
          </div>
          <div className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold">
            <span className="text-slate-400 block text-[10px]">Total Item SKU</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-sm">{items.length} Barang</span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" /> Dashboard Executive
        </button>

        <button
          onClick={() => setActiveTab('warehouses')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'warehouses'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Building2 className="h-4 w-4" /> Gudang, Zona & Rak
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Package className="h-4 w-4" /> SKU Barang & Stok
        </button>

        <button
          onClick={() => setActiveTab('movements')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'movements'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <ArrowRightLeft className="h-4 w-4" /> Mutasi & Transaksi
        </button>

        <button
          onClick={() => setActiveTab('opname')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'opname'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Scan className="h-4 w-4" /> Mobile Stock Opname
        </button>

        <button
          onClick={() => setActiveTab('procurement')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'procurement'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <ShoppingBag className="h-4 w-4" /> Procurement & Approval
        </button>

        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'suppliers'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Award className="h-4 w-4" /> Evaluasi Vendor
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'analytics'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <BarChart3 className="h-4 w-4" /> Valuation & Demand Forecast
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'ai'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <BrainCircuit className="h-4 w-4 text-emerald-400" /> AI Intelligence
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'api'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Server className="h-4 w-4" /> API & DB Schema
        </button>

        <button
          onClick={() => setActiveTab('prompt10')}
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'prompt10'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
          }`}
        >
          <Truck className="h-4 w-4 text-indigo-400" /> Roadmap Prompt 10
        </button>
      </div>

      {/* Main Tab Render */}
      <div>
        {activeTab === 'dashboard' && (
          <InventoryDashboardView
            warehouses={warehouses}
            stocks={stocks}
            purchaseRequests={purchaseRequests}
            purchaseOrders={purchaseOrders}
            goodsReceipts={receipts}
            suppliers={suppliers}
            aiInsights={aiInsights}
            onNavigateSubTab={(tabId) => {
              if (tabId === 'opname-scanner') setActiveTab('opname');
              else if (tabId === 'procurement-po') setActiveTab('procurement');
              else if (tabId === 'warehouses') setActiveTab('warehouses');
              else if (tabId === 'catalog') setActiveTab('catalog');
            }}
          />
        )}

        {activeTab === 'warehouses' && (
          <WarehouseRackZoneView
            warehouses={warehouses}
            zones={zones}
            racks={racks}
            onAddWarehouse={handleAddWarehouse}
          />
        )}

        {activeTab === 'catalog' && (
          <InventoryItemStockView
            items={items}
            stocks={stocks}
            onAddItem={handleAddItem}
          />
        )}

        {activeTab === 'movements' && (
          <StockMovementTransactionsView
            movements={movements}
            goodsReceipts={receipts}
            goodsIssues={issues}
            transfers={transfers}
            adjustments={adjustments}
            onAddMovement={handleAddMovement}
            onAddTransfer={handleAddTransfer}
          />
        )}

        {activeTab === 'opname' && (
          <StockOpnameScannerView
            opnames={opnames}
            stocks={stocks}
            onAddOpname={handleAddOpname}
          />
        )}

        {activeTab === 'procurement' && (
          <ProcurementPurchaseView
            purchaseRequests={purchaseRequests}
            purchaseOrders={purchaseOrders}
            purchaseInvoices={purchaseInvoices}
            onAddPR={handleAddPR}
            onAddPO={handleAddPO}
          />
        )}

        {activeTab === 'suppliers' && (
          <SupplierPerformanceView suppliers={suppliers} />
        )}

        {activeTab === 'analytics' && (
          <InventoryAnalyticsForecastView
            stocks={stocks}
            forecasts={forecasts}
          />
        )}

        {activeTab === 'ai' && (
          <AIInventoryIntelligenceView insights={aiInsights} />
        )}

        {activeTab === 'api' && <InventoryApiDocsView />}

        {activeTab === 'prompt10' && <Prompt10RoadmapView />}
      </div>
    </div>
  );
};
