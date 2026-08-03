import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Layers,
  Grid,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Phone,
  Maximize2,
  FileText,
} from 'lucide-react';

import { WarehouseRecord, WarehouseZoneRecord, WarehouseRackRecord } from '../types';

interface WarehouseRackZoneViewProps {
  warehouses: WarehouseRecord[];
  zones: WarehouseZoneRecord[];
  racks: WarehouseRackRecord[];
  onAddWarehouse: (wh: WarehouseRecord) => void;
}

export const WarehouseRackZoneView: React.FC<WarehouseRackZoneViewProps> = ({
  warehouses = [],
  zones = [],
  racks = [],
  onAddWarehouse = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'warehouses' | 'zones' | 'racks'>('warehouses');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Warehouse Form State
  const [newWhCode, setNewWhCode] = useState('');
  const [newWhName, setNewWhName] = useState('');
  const [newWhType, setNewWhType] = useState<any>('Gudang Utama Estate');
  const [newWhPic, setNewWhPic] = useState('');
  const [newWhArea, setNewWhArea] = useState(1000);
  const [newWhCapacity, setNewWhCapacity] = useState(500);

  const filteredWarehouses = warehouses.filter(
    (w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.estateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitNewWarehouse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWhCode || !newWhName) return;

    const created: WarehouseRecord = {
      id: `wh-${Date.now()}`,
      code: newWhCode,
      name: newWhName,
      companyId: 'COMP-PALM-01',
      companyName: 'PT Sawit Nusantara Mandiri',
      estateId: 'EST-01',
      estateName: 'Riau Central Estate',
      type: newWhType,
      address: 'Jl. Poros Kebun Utama',
      picName: newWhPic || 'Petugas Gudang',
      picPhone: '+62 812-0000-1111',
      areaSqm: Number(newWhArea),
      capacityTon: Number(newWhCapacity),
      usedCapacityTon: 0,
      latitude: 0.507,
      longitude: 101.447,
      status: 'Active',
      photoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60',
      totalZones: 2,
      totalRacks: 12,
    };

    onAddWarehouse(created);
    setShowAddModal(false);
    setNewWhCode('');
    setNewWhName('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Warehouse, Zone & Rack Structure Management
          </h2>
          <p className="text-xs text-slate-500">
            Arsitektur tata letak gudang, zona bahaya agrokimia, serta rak penyimpanan ber-QR/Barcode
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('warehouses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'warehouses'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Master Gudang ({warehouses.length})
            </button>
            <button
              onClick={() => setActiveTab('zones')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'zones'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Zona Storage ({zones.length})
            </button>
            <button
              onClick={() => setActiveTab('racks')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'racks'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Rak Storage ({racks.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Tambah Gudang
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari kode gudang, nama gudang, atau lokasi estate..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Warehouses Tab */}
      {activeTab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredWarehouses.map((wh) => {
            const usagePercent = Math.min(
              100,
              Math.round((wh.usedCapacityTon / (wh.capacityTon || 1)) * 100)
            );
            return (
              <div
                key={wh.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500 transition-all"
              >
                <div className="relative h-44 rounded-xl overflow-hidden">
                  <img src={wh.photoUrl} alt={wh.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-[10px] text-emerald-400 font-bold border border-slate-700">
                    {wh.code}
                  </div>
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold">
                    {wh.status}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{wh.type}</span>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-0.5">{wh.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" /> {wh.estateName} ({wh.latitude}, {wh.longitude})
                  </p>
                </div>

                {/* Capacity Progress Bar */}
                <div className="space-y-1.5 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600 dark:text-slate-400">Kapasitas Terpakai</span>
                    <span className="text-slate-900 dark:text-white">
                      {wh.usedCapacityTon} / {wh.capacityTon} Ton ({usagePercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        usagePercent > 85 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </div>

                {/* Info Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-slate-500 flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                    <span>PIC: {wh.picName}</span>
                  </div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-slate-400" />
                    <span>{wh.totalZones} Zona / {wh.totalRacks} Rak</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Zones Tab */}
      {activeTab === 'zones' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {zones.map((z) => (
            <div
              key={z.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {z.code}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  {z.status}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{z.name}</h4>
                <p className="text-xs text-slate-500">Gudang Parent: {z.warehouseName}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Kategori Barang Diizinkan:</span>
                <div className="flex flex-wrap gap-1">
                  {z.categoryAllowed.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Racks Tab */}
      {activeTab === 'racks' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {racks.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-black text-slate-900 dark:text-white">{r.code}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  {r.status}
                </span>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-medium">Zona: {r.zoneName}</p>
                <p className="text-slate-400 text-[11px]">Gudang: {r.warehouseName}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex justify-between font-bold">
                <span>Koordinat Rak:</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  Baris {r.rowNumber} • Kolom {r.columnNumber} • Level {r.levelNumber}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 flex justify-between">
                <span>Kapasitas Beban:</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {r.currentWeightKg.toLocaleString()} / {r.maxCapacityKg.toLocaleString()} kg
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Warehouse Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full space-y-4 animate-scaleUp">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-emerald-600" /> Pendaftaran Master Gudang Baru
            </h3>

            <form onSubmit={handleSubmitNewWarehouse} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kode Gudang</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: WH-AFD2-01"
                  value={newWhCode}
                  onChange={(e) => setNewWhCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Gudang</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Gudang Pupuk Afdeling 2"
                  value={newWhName}
                  onChange={(e) => setNewWhName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Jenis Gudang</label>
                <select
                  value={newWhType}
                  onChange={(e) => setNewWhType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Gudang Utama Estate">Gudang Utama Estate</option>
                  <option value="Gudang Afdeling">Gudang Afdeling</option>
                  <option value="Gudang Chemical">Gudang Chemical</option>
                  <option value="Gudang Workshop">Gudang Workshop</option>
                  <option value="Gudang Bibitan">Gudang Bibitan</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Penanggung Jawab (PIC)</label>
                <input
                  type="text"
                  placeholder="Nama Kepala Gudang / PIC"
                  value={newWhPic}
                  onChange={(e) => setNewWhPic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Luas (m²)</label>
                  <input
                    type="number"
                    value={newWhArea}
                    onChange={(e) => setNewWhArea(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Kapasitas (Ton)</label>
                  <input
                    type="number"
                    value={newWhCapacity}
                    onChange={(e) => setNewWhCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
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
                  Simpan Gudang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
