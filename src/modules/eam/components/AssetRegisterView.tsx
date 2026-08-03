import React, { useState } from 'react';
import {
  Boxes,
  Search,
  Plus,
  Filter,
  QrCode,
  Tag,
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  X,
  Upload,
} from 'lucide-react';
import { AssetItem, AssetCategory, AssetLocation } from '../types';

interface AssetRegisterViewProps {
  assets?: AssetItem[];
  categories?: AssetCategory[];
  locations?: AssetLocation[];
  onAddAsset?: (newAsset: AssetItem) => void;
}

export const AssetRegisterView: React.FC<AssetRegisterViewProps> = ({
  assets = [],
  categories = [],
  locations = [],
  onAddAsset = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAssetForView, setSelectedAssetForView] = useState<AssetItem | null>(null);

  // Form State
  const [assetName, setAssetName] = useState('');
  const [category, setCategory] = useState('Heavy Equipment');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [company, setCompany] = useState('PT NPL');
  const [estate, setEstate] = useState('Riau Mill & Estate');
  const [department, setDepartment] = useState('Civil & Fleet Dept');
  const [currentLocation, setCurrentLocation] = useState('Central Workshop Kebun Riau');
  const [purchasePrice, setPurchasePrice] = useState(500000000);
  const [usefulLifeYears, setUsefulLifeYears] = useState(8);
  const [supplierName, setSupplierName] = useState('PT Trakindo Utama');

  const filteredAssets = assets.filter((item) => {
    const matchesSearch =
      item.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmitNewAsset = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `AST-${category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: AssetItem = {
      id: `ast-${Date.now()}`,
      assetCode: newCode,
      barcode: `BC-${Math.floor(1000000 + Math.random() * 9000000)}`,
      qrCode: `QR-${newCode}-NPL`,
      rfidReady: true,
      rfidTag: `RFID-${Math.floor(1000 + Math.random() * 9000)}-TAG`,
      assetName,
      category: category as any,
      brand,
      model,
      serialNumber,
      company,
      estate,
      department,
      currentLocation,
      gpsCoordinate: '0.5071° N, 101.4478° E',
      purchaseDate: new Date().toISOString().split('T')[0],
      supplierName,
      purchasePrice,
      usefulLifeYears,
      residualValue: Math.round(purchasePrice * 0.1),
      warrantyStart: new Date().toISOString().split('T')[0],
      warrantyEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Active',
      photoUrl: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=600&auto=format&fit=crop&q=80',
    };

    onAddAsset(newItem);
    setShowAddModal(false);
    setAssetName('');
    setBrand('');
    setModel('');
    setSerialNumber('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Boxes className="h-5 w-5 text-emerald-400" /> Registrasi Master Aset Enterprise
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Database Inventaris Aset Terpadu: Barcode, QR Code, RFID, Lokasi GIS, Umur Ekonomis & Status Garansi.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Registrasi Aset Baru
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div className="relative flex-1">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari Nama Aset, Kode Aset, Barcode, Serial Number, atau Brand..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="All">Semua Status</option>
            <option value="Active">Active</option>
            <option value="In Maintenance">In Maintenance</option>
            <option value="Idle">Idle</option>
            <option value="Damaged">Damaged</option>
            <option value="Disposed">Disposed</option>
          </select>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">Aset & Kode Identification</th>
                <th className="p-3.5">Kategori & Brand</th>
                <th className="p-3.5">Lokasi & Estate</th>
                <th className="p-3.5">Nilai Perolehan</th>
                <th className="p-3.5">Umur & Garansi</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5">
                    <div className="flex items-center gap-3">
                      {asset.photoUrl ? (
                        <img
                          src={asset.photoUrl}
                          alt={asset.assetName}
                          className="w-10 h-10 rounded-lg object-cover border border-slate-700 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                          <Boxes className="h-5 w-5" />
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-white block text-xs">{asset.assetName}</span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-mono text-[11px] text-emerald-400 font-bold">{asset.assetCode}</span>
                          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-mono">
                            {asset.barcode}
                          </span>
                          {asset.rfidReady && (
                            <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-800/60 px-1.5 rounded font-bold">
                              RFID
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="font-bold text-slate-200 block">{asset.category}</span>
                    <span className="text-[11px] text-slate-400">
                      {asset.brand} • {asset.model}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="text-slate-200 font-bold block">{asset.estate}</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-teal-400" /> {asset.currentLocation}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="font-bold text-emerald-400 block">
                      Rp {asset.purchasePrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-[10px] text-slate-400">Pemasok: {asset.supplierName}</span>
                  </td>

                  <td className="p-3.5">
                    <span className="text-slate-200 block">{asset.usefulLifeYears} Tahun (Ekonomis)</span>
                    <span className="text-[10px] text-slate-400">Garansi s/d {asset.warrantyEnd}</span>
                  </td>

                  <td className="p-3.5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        asset.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : asset.status === 'In Maintenance'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" /> {asset.status}
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => setSelectedAssetForView(asset)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                    >
                      Detail Tag
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal View Asset Tag */}
      {selectedAssetForView && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setSelectedAssetForView(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <QrCode className="h-8 w-8 text-emerald-400" />
              <div>
                <h3 className="text-base font-black text-white">{selectedAssetForView.assetName}</h3>
                <span className="font-mono text-xs font-bold text-emerald-400">{selectedAssetForView.assetCode}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Barcode Label</span>
                <span className="font-mono font-black text-white text-sm mt-1 block">{selectedAssetForView.barcode}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">RFID Tag Code</span>
                <span className="font-mono font-black text-purple-400 text-sm mt-1 block">
                  {selectedAssetForView.rfidTag || 'N/A'}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Brand & Model:</span>
                <span className="font-bold text-white">{selectedAssetForView.brand} {selectedAssetForView.model}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Serial Number:</span>
                <span className="font-mono font-bold text-slate-200">{selectedAssetForView.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lokasi Penempatan:</span>
                <span className="font-bold text-teal-300">{selectedAssetForView.currentLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Koordinat GIS:</span>
                <span className="font-mono text-slate-300">{selectedAssetForView.gpsCoordinate}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => alert(`Cetak Tag QR & Barcode untuk ${selectedAssetForView.assetCode} berhasil dikirim ke printer Zebra EAM`)}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
              >
                Cetak Tag QR & Barcode Zebra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Asset */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Plus className="h-5 w-5 text-emerald-400" /> Registrasi Aset Baru
            </h3>

            <form onSubmit={handleSubmitNewAsset} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Nama Aset / Unit</label>
                <input
                  type="text"
                  required
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="Contoh: Excavator CAT 320D2 Heavy Duty"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Kategori Aset</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Merk / Brand</label>
                  <input
                    type="text"
                    required
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="Caterpillar / Toyota / Fuso"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Model / Tipe</label>
                  <input
                    type="text"
                    required
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="320D2 / Hilux 4x4"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Serial Number (SN)</label>
                  <input
                    type="text"
                    required
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    placeholder="SN-9901823-XYZ"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Nilai Perolehan (Rp)</label>
                  <input
                    type="number"
                    required
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Umur Ekonomis (Tahun)</label>
                  <input
                    type="number"
                    required
                    value={usefulLifeYears}
                    onChange={(e) => setUsefulLifeYears(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg"
                >
                  Simpan Aset ke Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
