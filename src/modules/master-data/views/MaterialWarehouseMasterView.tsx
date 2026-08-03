import React, { useState } from 'react';
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  Boxes,
  DollarSign,
  Tag,
  Warehouse
} from 'lucide-react';
import { mockMaterialItems } from '../mockData';
import { MaterialItemMaster } from '../types';

export const MaterialWarehouseMasterView: React.FC = () => {
  const [items, setItems] = useState<MaterialItemMaster[]>(mockMaterialItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filteredItems = items.filter(i => {
    const matchesSearch = i.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || i.itemCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || i.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 border border-amber-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
              Warehouse & Inventory SKU Master
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Master Material, Pupuk, Agrokimia & Sparepart PKS</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Katalog SKU persediaan perkebunan: Pupuk NPK/Urea, Herbisida/Pestisida, Sparepart Mesin PKS, BBM Solar Industri, dan APD K3.
          </p>
        </div>
      </div>

      {/* Material Master Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari SKU Kode atau Nama Material..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="FERTILIZER">Pupuk Organik & Anorganik</option>
              <option value="AGROCHEMICAL">Agrokimia & Herbisida</option>
              <option value="SPAREPART">Sparepart PKS & Kendaraan</option>
              <option value="FUEL">BBM Solar & Pelumas</option>
            </select>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Total SKU Item: <strong className="text-white">{filteredItems.length} SKU</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-[11px] uppercase font-semibold border-b border-slate-700">
                <th className="py-3.5 px-4">SKU Code</th>
                <th className="py-3.5 px-4">Nama Material / Item</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Satuan UOM</th>
                <th className="py-3.5 px-4">Stok Gudang</th>
                <th className="py-3.5 px-4">Estimasi Harga Satuan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-mono text-amber-300 font-bold">{item.itemCode}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{item.itemName}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{item.unitOfMeasure}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                    {item.currentStock.toLocaleString()} {item.unitOfMeasure}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    Rp {item.unitPriceCostIdr.toLocaleString('id-ID')}
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
