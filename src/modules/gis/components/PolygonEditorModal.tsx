import React, { useState } from 'react';
import { X, Save, MapPin, Trees, Layers, AlertCircle, Plus, Trash2, Check, RefreshCw } from 'lucide-react';
import { GisPolygon } from '../types';

interface PolygonEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  polygonToEdit?: GisPolygon | null;
  onSavePolygon: (poly: GisPolygon) => void;
}

export const PolygonEditorModal: React.FC<PolygonEditorModalProps> = ({
  isOpen,
  onClose,
  polygonToEdit,
  onSavePolygon,
}) => {
  const [code, setCode] = useState(polygonToEdit?.code || 'B14');
  const [name, setName] = useState(polygonToEdit?.name || 'Blok B14 (TM-2020)');
  const [hectares, setHectares] = useState(polygonToEdit?.hectares || 30.0);
  const [status, setStatus] = useState<GisPolygon['status']>(polygonToEdit?.status || 'ACTIVE');
  const [plantingYear, setPlantingYear] = useState(polygonToEdit?.attributes.plantingYear || 2020);
  const [variety, setVariety] = useState(polygonToEdit?.attributes.variety || 'DxP Socfindo Premier');
  const [soilType, setSoilType] = useState(polygonToEdit?.attributes.soilType || 'Mineral Alluvial');
  const [topography, setTopography] = useState(polygonToEdit?.attributes.topography || 'Datar (0-3%)');
  const [totalTrees, setTotalTrees] = useState(polygonToEdit?.attributes.totalTrees || 4050);
  const [sph, setSph] = useState(polygonToEdit?.attributes.sph || 135);
  const [fillColor, setFillColor] = useState(polygonToEdit?.fillColor || '#10b981');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPoly: GisPolygon = {
      id: polygonToEdit?.id || `poly-${Date.now()}`,
      code,
      name,
      entityType: 'BLOCK',
      companyId: 'SNJ-HOLDING',
      estateId: 'EST-TLD',
      divisionId: 'DIV-I',
      afdelingId: 'AFD-ALPHA',
      blockCode: code,
      hectares: Number(hectares),
      perimeterMeters: Math.round(Number(hectares) * 70),
      fillColor,
      strokeColor: '#047857',
      strokeWidth: 2,
      status,
      coordinates: polygonToEdit?.coordinates || [
        { lat: 0.8900, lng: 101.4520 },
        { lat: 0.8950, lng: 101.4520 },
        { lat: 0.8950, lng: 101.4580 },
        { lat: 0.8900, lng: 101.4580 },
      ],
      attributes: {
        totalTrees: Number(totalTrees),
        plantingYear: Number(plantingYear),
        variety,
        soilType,
        topography,
        sph: Number(sph),
        managerName: 'Rian Hidayat S.P.',
        lastHarvestDate: '2026-08-01',
        aiHealthScore: 92,
        ndviIndex: 0.76,
      },
    };
    onSavePolygon(newPoly);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-slate-900 dark:text-white space-y-0">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {polygonToEdit ? 'Edit Polygon & Master Data Blok' : 'Tambah Polygon Blok Baru'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lengkapi atribut batas geografis WGS84 & data agronomi
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Kode Blok
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Nama Blok / Deskripsi
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Luas Polygon (Hektar)
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={hectares}
                onChange={(e) => setHectares(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Status Blok
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ACTIVE">ACTIVE (Tanaman Menghasilkan)</option>
                <option value="MAINTENANCE">MAINTENANCE (Pemulihan)</option>
                <option value="PLANNED">PLANNED (Persiapan Lahan)</option>
                <option value="REPLANTING">REPLANTING (Peremajaan TBM)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Tahun Tanam
              </label>
              <input
                type="number"
                required
                value={plantingYear}
                onChange={(e) => setPlantingYear(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Varietas Bibit
              </label>
              <input
                type="text"
                required
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Jenis Tanah
              </label>
              <input
                type="text"
                required
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Topografi Lahan
              </label>
              <input
                type="text"
                required
                value={topography}
                onChange={(e) => setTopography(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Populasi Pohon
              </label>
              <input
                type="number"
                required
                value={totalTrees}
                onChange={(e) => setTotalTrees(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Stand Per Hectare (SPH)
              </label>
              <input
                type="number"
                required
                value={sph}
                onChange={(e) => setSph(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Save className="h-4 w-4" />
              <span>Simpan Polygon GIS</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
