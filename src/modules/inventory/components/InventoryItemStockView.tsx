import React, { useState } from 'react';
import {
  Package,
  QrCode,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Tag,
  DollarSign,
  Building,
  Layers,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

import { InventoryItemRecord, InventoryStockRecord, ItemCategory } from '../types';

interface InventoryItemStockViewProps {
  items: InventoryItemRecord[];
  stocks: InventoryStockRecord[];
  onAddItem: (newItem: InventoryItemRecord) => void;
}

const ALL_CATEGORIES: ItemCategory[] = [
  'Pupuk',
  'Pestisida',
  'Herbisida',
  'Bibit',
  'Alat Panen',
  'Alat Kerja',
  'Suku Cadang',
  'Oli & Pelumas',
  'BBM (Solar)',
  'APD',
  'ATK',
  'Elektronik',
  'Material Bangunan',
  'Bahan Kimia',
  'Lainnya',
];

export const InventoryItemStockView: React.FC<InventoryItemStockViewProps> = ({
  items = [],
  stocks = [],
  onAddItem = () => {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form state
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Pupuk');
  const [brand, setBrand] = useState('');
  const [unit, setUnit] = useState('Karung');
  const [buyPrice, setBuyPrice] = useState(150000);
  const [minStock, setMinStock] = useState(50);
  const [maxStock, setMaxStock] = useState(500);
  const [supplier, setSupplier] = useState('PT Pupuk Indonesia');

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !name) return;

    const newItem: InventoryItemRecord = {
      id: `item-${Date.now()}`,
      itemCode: code,
      barcode: `899${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      qrCode: `QR-${code}`,
      name,
      category,
      brand: brand || 'Standard Palm Grade',
      specification: 'Spesifikasi standar operasional kebun',
      unit,
      primarySupplierName: supplier,
      buyPrice: Number(buyPrice),
      standardPrice: Number(buyPrice) * 1.05,
      minStock: Number(minStock),
      maxStock: Number(maxStock),
      safetyStock: Math.round(Number(minStock) * 1.2),
      leadTimeDays: 7,
      defaultWarehouseName: 'Gudang Utama Central Estate',
      defaultRackCode: 'RACK-A01-L1',
      status: 'Active',
      photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60',
      lastRestockedDate: new Date().toISOString().split('T')[0],
    };

    onAddItem(newItem);
    setShowAddModal(false);
    setToastMessage(`SKU Item baru ${newItem.name} (${newItem.itemCode}) berhasil didaftarkan!`);
    setTimeout(() => setToastMessage(null), 4000);
    setCode('');
    setName('');
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

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Package className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Inventory Item Master Catalog & Live Stock Monitoring
          </h2>
          <p className="text-xs text-slate-500">
            Katalog barang terintegrasi dengan kode Barcode & QR, harga standar, batas minimum/maksimum stok
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Daftarkan SKU Item Baru
        </button>
      </div>

      {/* Category Pills & Search */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Semua Kategori ({items.length})
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama barang, kode SKU, barcode, atau merek..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Items Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const stockRecord = stocks.find((s) => s.itemId === item.id) || {
            available: 0,
            reserved: 0,
            inTransit: 0,
            stockStatus: 'Normal' as const,
          };

          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-40 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={item.photoUrl} alt={item.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] text-emerald-400 font-mono font-bold border border-slate-700">
                    {item.itemCode}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] text-slate-300 font-bold border border-slate-700 flex items-center gap-1">
                    <QrCode className="h-3 w-3 text-emerald-400" /> {item.barcode.slice(-6)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Merek: {item.brand}</span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.specification}</p>
                </div>

                {/* Live Stock Level Bar */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">Stok Tersedia:</span>
                    <span
                      className={`text-sm ${
                        stockRecord.stockStatus === 'Critical'
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {stockRecord.available.toLocaleString()} {item.unit}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Min: {item.minStock}</span>
                    <span>Safety: {item.safetyStock}</span>
                    <span>Max: {item.maxStock}</span>
                  </div>
                </div>

                {/* Price & Supplier */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Harga Beli Standar:</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      Rp {item.buyPrice.toLocaleString('id-ID')} / {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Primary Vendor:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[150px]">
                      {item.primarySupplierName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full space-y-4 animate-scaleUp">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" /> Pendaftaran SKU Item Barang Baru
            </h3>

            <form onSubmit={handleSubmitNewItem} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kode SKU Barang</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: ITEM-PPK-009"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ItemCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {ALL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Barang Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pupuk KCL MOP Canpotex 50kg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Merek</label>
                  <input
                    type="text"
                    placeholder="Cap Mahkota / Syngenta"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Satuan</label>
                  <input
                    type="text"
                    placeholder="Karung / Jerigen / Pcs / Drum"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Harga Beli (Rp)</label>
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Min Stock</label>
                  <input
                    type="number"
                    value={minStock}
                    onChange={(e) => setMinStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Max Stock</label>
                  <input
                    type="number"
                    value={maxStock}
                    onChange={(e) => setMaxStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Supplier</label>
                <input
                  type="text"
                  placeholder="PT Supplier Utama"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-500 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  Simpan SKU Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
