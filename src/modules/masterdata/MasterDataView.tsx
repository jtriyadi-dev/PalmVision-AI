import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  Trash2,
  RotateCcw,
  CheckSquare,
  Square,
  Eye,
  Edit,
  Building2,
  Trees,
  Layers,
  MapPin,
  FileSpreadsheet,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  LayoutGrid,
  List,
  ShieldAlert,
  Archive,
  Wrench,
  Truck,
  Users,
  Briefcase,
  Contact2,
  CloudSun,
  Radio,
  Camera,
  FileText,
  Boxes,
} from 'lucide-react';

import {
  INITIAL_COMPANIES,
  INITIAL_ESTATES,
  INITIAL_DIVISIONS,
  INITIAL_AFDELINGS,
  INITIAL_BLOCKS,
  INITIAL_SUBBLOCKS,
  INITIAL_SOILS,
  INITIAL_TOPOGRAPHIES,
  INITIAL_VARIETIES,
  INITIAL_LAND_OWNERSHIPS,
  INITIAL_INFRASTRUCTURES,
  INITIAL_FERTILIZERS,
  INITIAL_PESTICIDES,
  INITIAL_EQUIPMENTS,
  INITIAL_VEHICLES,
  INITIAL_DEPARTMENTS,
  INITIAL_POSITIONS,
  INITIAL_PARTNERS,
  INITIAL_WEATHER_STATIONS,
  INITIAL_IOT_DEVICES,
  INITIAL_DRONES,
  INITIAL_DOC_CATEGORIES,
  INITIAL_AI_CONFIGS,
} from './mockData';

import { MasterDataImportModal } from './components/MasterDataImportModal';
import { MasterDataExportModal } from './components/MasterDataExportModal';
import { MasterDataDetailModal } from './components/MasterDataDetailModal';
import { MasterDataEditModal } from './components/MasterDataEditModal';

export const MasterDataView: React.FC = () => {
  // Master Category & Type Selection
  const [activeTab, setActiveTab] = useState<string>('estate');
  const [viewMode, setViewMode] = useState<'GRID' | 'CARDS'>('GRID');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [showSoftDeleted, setShowSoftDeleted] = useState<boolean>(false);

  // Selection & Bulk Actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modals state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Local Dataset Stores
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [estates, setEstates] = useState(INITIAL_ESTATES);
  const [divisions, setDivisions] = useState(INITIAL_DIVISIONS);
  const [afdelings, setAfdelings] = useState(INITIAL_AFDELINGS);
  const [blocks, setBlocks] = useState(INITIAL_BLOCKS);
  const [subBlocks, setSubBlocks] = useState(INITIAL_SUBBLOCKS);
  const [soils, setSoils] = useState(INITIAL_SOILS);
  const [topographies, setTopographies] = useState(INITIAL_TOPOGRAPHIES);
  const [varieties, setVarieties] = useState(INITIAL_VARIETIES);
  const [landOwnerships, setLandOwnerships] = useState(INITIAL_LAND_OWNERSHIPS);
  const [infrastructures, setInfrastructures] = useState(INITIAL_INFRASTRUCTURES);
  const [fertilizers, setFertilizers] = useState(INITIAL_FERTILIZERS);
  const [pesticides, setPesticides] = useState(INITIAL_PESTICIDES);
  const [equipments, setEquipments] = useState(INITIAL_EQUIPMENTS);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [positions, setPositions] = useState(INITIAL_POSITIONS);
  const [partners, setPartners] = useState(INITIAL_PARTNERS);
  const [weatherStations, setWeatherStations] = useState(INITIAL_WEATHER_STATIONS);
  const [iotDevices, setIotDevices] = useState(INITIAL_IOT_DEVICES);
  const [drones, setDrones] = useState(INITIAL_DRONES);
  const [docCategories, setDocCategories] = useState(INITIAL_DOC_CATEGORIES);
  const [aiConfigs, setAiConfigs] = useState(INITIAL_AI_CONFIGS);

  // Navigation Items
  const SUBMODULE_NAV = [
    { id: 'company', label: 'Company & Holding', icon: Building2, count: companies.length },
    { id: 'estate', label: 'Estate Kebun', icon: Trees, count: estates.length },
    { id: 'division', label: 'Divisi', icon: Layers, count: divisions.length },
    { id: 'afdeling', label: 'Afdeling', icon: Layers, count: afdelings.length },
    { id: 'block', label: 'Blok Tanam', icon: MapPin, count: blocks.length },
    { id: 'subblock', label: 'Sub-Blok', icon: MapPin, count: subBlocks.length },
    { id: 'soil', label: 'Jenis Tanah', icon: Database, count: soils.length },
    { id: 'topography', label: 'Topografi', icon: Database, count: topographies.length },
    { id: 'variety', label: 'Varietas Bibit', icon: Database, count: varieties.length },
    { id: 'land_ownership', label: 'Kepemilikan Lahan', icon: FileText, count: landOwnerships.length },
    { id: 'infrastructure', label: 'Infrastruktur', icon: Wrench, count: infrastructures.length },
    { id: 'fertilizer', label: 'Pupuk Master', icon: Boxes, count: fertilizers.length },
    { id: 'pesticide', label: 'Pestisida & Herbisida', icon: Boxes, count: pesticides.length },
    { id: 'equipment', label: 'Peralatan Kerja', icon: Wrench, count: equipments.length },
    { id: 'vehicle', label: 'Kendaraan & Alat Berat', icon: Truck, count: vehicles.length },
    { id: 'department', label: 'Departemen HR', icon: Briefcase, count: departments.length },
    { id: 'position', label: 'Jabatan Worker', icon: Users, count: positions.length },
    { id: 'partner', label: 'Vendor & Supplier', icon: Contact2, count: partners.length },
    { id: 'weather', label: 'Stasiun Cuaca', icon: CloudSun, count: weatherStations.length },
    { id: 'iot', label: 'Sensor IoT', icon: Radio, count: iotDevices.length },
    { id: 'drone', label: 'Armada Drone', icon: Camera, count: drones.length },
    { id: 'doc', label: 'Kategori Dokumen', icon: FileText, count: docCategories.length },
    { id: 'ai', label: 'Konfigurasi AI', icon: Sparkles, count: aiConfigs.length },
  ];

  // Helper to get active dataset
  const getActiveDataset = () => {
    switch (activeTab) {
      case 'company': return { data: companies, setter: setCompanies, name: 'Company & Holding' };
      case 'estate': return { data: estates, setter: setEstates, name: 'Estate Kebun' };
      case 'division': return { data: divisions, setter: setDivisions, name: 'Divisi Kebun' };
      case 'afdeling': return { data: afdelings, setter: setAfdelings, name: 'Afdeling Kebun' };
      case 'block': return { data: blocks, setter: setBlocks, name: 'Blok Tanam' };
      case 'subblock': return { data: subBlocks, setter: setSubBlocks, name: 'Sub-Blok Tanam' };
      case 'soil': return { data: soils, setter: setSoils, name: 'Jenis Tanah' };
      case 'topography': return { data: topographies, setter: setTopographies, name: 'Topografi Lahan' };
      case 'variety': return { data: varieties, setter: setVarieties, name: 'Varietas Bibit' };
      case 'land_ownership': return { data: landOwnerships, setter: setLandOwnerships, name: 'Kepemilikan Lahan' };
      case 'infrastructure': return { data: infrastructures, setter: setInfrastructures, name: 'Infrastruktur' };
      case 'fertilizer': return { data: fertilizers, setter: setFertilizers, name: 'Master Pupuk' };
      case 'pesticide': return { data: pesticides, setter: setPesticides, name: 'Pestisida' };
      case 'equipment': return { data: equipments, setter: setEquipments, name: 'Peralatan Kerja' };
      case 'vehicle': return { data: vehicles, setter: setVehicles, name: 'Kendaraan' };
      case 'department': return { data: departments, setter: setDepartments, name: 'Departemen' };
      case 'position': return { data: positions, setter: setPositions, name: 'Jabatan Worker' };
      case 'partner': return { data: partners, setter: setPartners, name: 'Vendor & Supplier' };
      case 'weather': return { data: weatherStations, setter: setWeatherStations, name: 'Stasiun Cuaca' };
      case 'iot': return { data: iotDevices, setter: setIotDevices, name: 'Sensor IoT' };
      case 'drone': return { data: drones, setter: setDrones, name: 'Drone Device' };
      case 'doc': return { data: docCategories, setter: setDocCategories, name: 'Kategori Dokumen' };
      case 'ai': return { data: aiConfigs, setter: setAiConfigs, name: 'Konfigurasi AI' };
      default: return { data: estates, setter: setEstates, name: 'Master Data' };
    }
  };

  const activeObj = getActiveDataset();

  // Filtered Dataset
  const filteredData = useMemo(() => {
    return activeObj.data.filter((item: any) => {
      const isDeletedMatch = showSoftDeleted ? item.isDeleted === true : !item.isDeleted;
      const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.code?.toLowerCase().includes(q) ||
        item.notes?.toLowerCase().includes(q);
      return isDeletedMatch && matchesStatus && matchesSearch;
    });
  }, [activeObj.data, searchQuery, statusFilter, showSoftDeleted]);

  // Select all handler
  const handleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map((d: any) => d.id));
    }
  };

  const handleToggleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // CRUD Operations
  const handleSoftDelete = (id: string) => {
    activeObj.setter((prev: any[]) =>
      prev.map((item) => (item.id === id ? { ...item, isDeleted: true } : item))
    );
  };

  const handleRestore = (id: string) => {
    activeObj.setter((prev: any[]) =>
      prev.map((item) => (item.id === id ? { ...item, isDeleted: false } : item))
    );
  };

  const handleBulkSoftDelete = () => {
    activeObj.setter((prev: any[]) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, isDeleted: true } : item))
    );
    setSelectedIds([]);
  };

  const handleBulkRestore = () => {
    activeObj.setter((prev: any[]) =>
      prev.map((item) => (selectedIds.includes(item.id) ? { ...item, isDeleted: false } : item))
    );
    setSelectedIds([]);
  };

  const handleSaveItemSuccess = (savedItem: any) => {
    activeObj.setter((prev: any[]) => {
      const exists = prev.some((i) => i.id === savedItem.id);
      if (exists) {
        return prev.map((i) => (i.id === savedItem.id ? savedItem : i));
      } else {
        return [savedItem, ...prev];
      }
    });
  };

  const handleImportSuccess = (imported: any[]) => {
    activeObj.setter((prev: any[]) => [...imported, ...prev]);
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto animate-fadeIn">
      {/* Top Banner Header */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1">
              <Database className="h-3.5 w-3.5" /> Single Source of Truth
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-amber-300">
              ISO 27001 Audit Ready
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Master Data Enterprise Engine
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Pusat pengelolaan master data perkebunan kelapa sawit (Company, Estate, Divisi, Afdeling, Blok, Tanah, Varietas, Infrastruktur, Agrokimia, Armada & IoT).
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 z-10 shrink-0">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Upload className="h-4 w-4 text-emerald-400" /> Import Excel
          </button>

          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download className="h-4 w-4 text-teal-400" /> Export Data
          </button>

          <button
            onClick={() => {
              setSelectedItem(null);
              setIsEditModalOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-transform active:scale-95"
          >
            <Plus className="h-4 w-4" /> Tambah {activeObj.name}
          </button>
        </div>
      </div>

      {/* Submodule Tabs Navigator */}
      <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs custom-scrollbar">
          {SUBMODULE_NAV.map((sub) => {
            const Icon = sub.icon;
            const isActive = activeTab === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setActiveTab(sub.id);
                  setSelectedIds([]);
                }}
                className={`px-3 py-2 rounded-xl font-bold flex items-center gap-2 shrink-0 transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{sub.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isActive
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {sub.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Cari nama, kode, atau atribut ${activeObj.name}...`}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden font-medium"
          />
        </div>

        {/* Right: Status Filters & View Modes */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold focus:outline-hidden"
          >
            <option value="ALL">Semua Status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
            <option value="MAINTENANCE">MAINTENANCE</option>
          </select>

          <button
            onClick={() => setShowSoftDeleted(!showSoftDeleted)}
            className={`px-3 py-2 rounded-xl border font-bold flex items-center gap-1.5 transition-colors ${
              showSoftDeleted
                ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Archive className="h-3.5 w-3.5" />
            <span>Trash ({activeObj.data.filter((i: any) => i.isDeleted).length})</span>
          </button>

          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800">
            <button
              onClick={() => setViewMode('GRID')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'GRID' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-400'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('CARDS')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'CARDS' ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs' : 'text-slate-400'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Action Bar (if selected) */}
      {selectedIds.length > 0 && (
        <div className="p-3.5 rounded-xl bg-emerald-950 text-white border border-emerald-500/40 flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2 font-bold">
            <CheckSquare className="h-4 w-4 text-emerald-400" />
            <span>{selectedIds.length} Data Terpilih</span>
          </div>
          <div className="flex items-center gap-2">
            {!showSoftDeleted ? (
              <button
                onClick={handleBulkSoftDelete}
                className="px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-500 text-white font-bold flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Hapus Pilihan
              </button>
            ) : (
              <button
                onClick={handleBulkRestore}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Pulihkan Pilihan
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Data Grid / Cards Display */}
      {filteredData.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <Database className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Tidak ada rekaman master data
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau bersihkan filter status master data.
          </p>
        </div>
      ) : viewMode === 'GRID' ? (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  <th className="p-3 font-mono">KODE</th>
                  <th className="p-3">NAMA ENTITAS MASTER</th>
                  <th className="p-3">DETAIL / LOKASI / ATRIBUT</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 font-mono">DIPERBARUI</th>
                  <th className="p-3 text-right">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredData.map((item: any) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                        isSelected ? 'bg-emerald-50/50 dark:bg-emerald-950/20' : ''
                      }`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelectRow(item.id)}
                          className="rounded text-emerald-600 focus:ring-emerald-500"
                        />
                      </td>

                      <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {item.code || item.id}
                      </td>

                      <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                        {item.name || item.title || item.code}
                      </td>

                      <td className="p-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {item.estateName || item.companyName || item.notes || item.description || item.category || '-'}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            item.status === 'ACTIVE'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : item.status === 'MAINTENANCE'
                              ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {item.status || 'ACTIVE'}
                        </span>
                      </td>

                      <td className="p-3 font-mono text-slate-400 text-[11px]">
                        {item.updatedAt || '2026-07-28'}
                      </td>

                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsDetailModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Lihat Detail & Audit Trail"
                        >
                          <Eye className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedItem(item);
                            setIsEditModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit Master Data"
                        >
                          <Edit className="h-4 w-4" />
                        </button>

                        {!item.isDeleted ? (
                          <button
                            onClick={() => handleSoftDelete(item.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Soft Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRestore(item.id)}
                            className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                            title="Restore Data"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item: any) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                    {item.code || item.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.status || 'ACTIVE'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                  {item.name || item.title}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.notes || item.description || item.estateName || 'Tidak ada deskripsi tambahan.'}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-slate-400">
                  {item.updatedAt || '2026-07-28'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsDetailModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsEditModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <MasterDataImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        entityName={activeObj.name}
        onImportSuccess={handleImportSuccess}
      />

      <MasterDataExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        entityName={activeObj.name}
        totalRecordsCount={filteredData.length}
        dataToExport={filteredData}
      />

      <MasterDataDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        item={selectedItem}
        entityName={activeObj.name}
      />

      <MasterDataEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        itemToEdit={selectedItem}
        entityName={activeObj.name}
        onSaveSuccess={handleSaveItemSuccess}
      />
    </div>
  );
};
