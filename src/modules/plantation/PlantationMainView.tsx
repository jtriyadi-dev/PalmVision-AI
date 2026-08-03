import React, { useState } from 'react';
import {
  Trees,
  Sprout,
  Calendar,
  Layers,
  Pickaxe,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Clock,
  Award,
  FileText,
  Activity,
  Sparkles,
  Camera,
  Filter,
  Search,
  Building2,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Sliders,
  Check,
} from 'lucide-react';
import { PlantationFilterState } from './types';
import {
  INITIAL_PLANT_AGE_CATEGORIES,
  INITIAL_POPULATION_METRICS,
  INITIAL_PLANT_VARIETIES,
  INITIAL_NURSERIES,
  INITIAL_SEEDLINGS,
  INITIAL_LAND_CLEARINGS,
  INITIAL_LAND_PREPARATIONS,
  INITIAL_PLANTING_PROGRAMS,
  INITIAL_PLANTINGS,
  INITIAL_TREE_CENSUS,
  INITIAL_DEAD_PALMS,
  INITIAL_GAP_PLANTINGS,
  INITIAL_REPLANTINGS,
  INITIAL_BLOCK_HISTORIES,
  INITIAL_GROWTH_RECORDS,
  INITIAL_AGRONOMY_NOTES,
  INITIAL_PLANT_HEALTH,
  INITIAL_AI_HEALTH_FOUNDATIONS,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_PLANT_PHOTOS,
  INITIAL_PLANT_DOCUMENTS,
} from './mockData';

// View Subcomponents
import { PlantationDashboardView } from './components/PlantationDashboardView';
import { NurserySeedlingView } from './components/NurserySeedlingView';
import { LandClearingPrepView } from './components/LandClearingPrepView';
import { PlantingProgramView } from './components/PlantingProgramView';
import { TreeCensusView } from './components/TreeCensusView';
import { PlantAgeVarietyView } from './components/PlantAgeVarietyView';
import { BlockHistoryTimelineView } from './components/BlockHistoryTimelineView';
import { GrowthAgronomyView } from './components/GrowthAgronomyView';
import { PlantHealthAiView } from './components/PlantHealthAiView';
import { PlantationMediaApiDocsView } from './components/PlantationMediaApiDocsView';

interface PlantationMainViewProps {
  initialSubTab?: string;
}

export const PlantationMainView: React.FC<PlantationMainViewProps> = ({
  initialSubTab = 'dashboard',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<string>(initialSubTab);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Global Filter State
  const [filters, setFilters] = useState<PlantationFilterState>({
    searchQuery: '',
    companyId: 'ALL',
    estateId: 'ALL',
    afdelingName: 'ALL',
    blockCode: 'ALL',
    varietyId: 'ALL',
    year: 'ALL',
    ageCategory: 'ALL',
    healthStatus: 'ALL',
    dateFrom: '',
    dateTo: '',
  });

  // All 22 Submenus Required by Prompt 6 Specifications
  const SUBMENU_ITEMS = [
    { id: 'dashboard', label: 'Plantation Dashboard', icon: Activity, group: 'Utama' },
    { id: 'planting-program', label: 'Planting Program', icon: Calendar, group: 'Lahan & Tanam' },
    { id: 'nursery', label: 'Nursery Management', icon: Sprout, group: 'Lahan & Tanam' },
    { id: 'seedling', label: 'Seedling Management', icon: Sprout, group: 'Lahan & Tanam' },
    { id: 'land-clearing', label: 'Land Clearing', icon: Pickaxe, group: 'Lahan & Tanam' },
    { id: 'land-prep', label: 'Land Preparation', icon: Layers, group: 'Lahan & Tanam' },
    { id: 'planting', label: 'Planting History', icon: Trees, group: 'Lahan & Tanam' },
    { id: 'population', label: 'Plant Population', icon: Trees, group: 'Sensus & Populasi' },
    { id: 'tree-census', label: 'Tree Census', icon: CheckCircle2, group: 'Sensus & Populasi' },
    { id: 'missing-palm', label: 'Missing Palm', icon: AlertTriangle, group: 'Sensus & Populasi' },
    { id: 'dead-palm', label: 'Dead Palm', icon: AlertTriangle, group: 'Sensus & Populasi' },
    { id: 'gap-planting', label: 'Gap Planting (Penyulaman)', icon: RotateCcw, group: 'Sensus & Populasi' },
    { id: 'replanting', label: 'Replanting', icon: Trees, group: 'Sensus & Populasi' },
    { id: 'plant-age', label: 'Plant Age Monitoring', icon: Clock, group: 'Profil Tanaman' },
    { id: 'plant-variety', label: 'Plant Variety Master', icon: Award, group: 'Profil Tanaman' },
    { id: 'block-history', label: 'Block History / Land Ledger', icon: FileText, group: 'Agronomi & AI' },
    { id: 'growth-monitoring', label: 'Growth Monitoring', icon: Activity, group: 'Agronomi & AI' },
    { id: 'agronomy-notes', label: 'Agronomy Notes', icon: FileText, group: 'Agronomi & AI' },
    { id: 'plant-health', label: 'Plant Health', icon: CheckCircle2, group: 'Agronomi & AI' },
    { id: 'ai-health', label: 'AI Health Monitoring', icon: Sparkles, group: 'Agronomi & AI' },
    { id: 'timeline', label: 'Plantation Timeline', icon: Clock, group: 'Agronomi & AI' },
    { id: 'docs-photos-api', label: 'Galeri, Dokumen & API', icon: Camera, group: 'Dokumentasi & API' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter Bar & Submenu Selector */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">
              <Trees className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white text-base">
                Plantation Lifecycle Management & Tree Census
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pusat data siklus hidup tanaman kelapa sawit: TBM, TM, SPH Density, Agronomi & AI Monitoring
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {/* Context Filters */}
            <select
              value={filters.companyId}
              onChange={(e) => setFilters({ ...filters, companyId: e.target.value })}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <option value="ALL">Holding NPL Group</option>
              <option value="comp-1">PT Nusantara Palm Lestari</option>
            </select>

            <select
              value={filters.estateId}
              onChange={(e) => setFilters({ ...filters, estateId: e.target.value })}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              <option value="ALL">Semua Estate Kebun</option>
              <option value="est-1">Sei Buatan Estate</option>
              <option value="est-2">Riau Utara Estate</option>
            </select>

            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
                showFilterDrawer
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" />
              <span>Filter Lanjutan</span>
            </button>
          </div>
        </div>

        {/* Filter Drawer Expand */}
        {showFilterDrawer && (
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 text-xs animate-fadeIn">
            <div>
              <label className="block text-slate-400 text-[10px] font-bold mb-1">Afdeling</label>
              <select
                value={filters.afdelingName}
                onChange={(e) => setFilters({ ...filters, afdelingName: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              >
                <option value="ALL">Semua Afdeling</option>
                <option value="Afdeling I">Afdeling I</option>
                <option value="Afdeling II">Afdeling II</option>
                <option value="Afdeling III">Afdeling III</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] font-bold mb-1">Blok Kebun</label>
              <select
                value={filters.blockCode}
                onChange={(e) => setFilters({ ...filters, blockCode: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              >
                <option value="ALL">Semua Blok</option>
                <option value="BLK-A01">Blok A01</option>
                <option value="BLK-A02">Blok A02</option>
                <option value="BLK-A05">Blok A05</option>
                <option value="BLK-B02">Blok B02</option>
                <option value="BLK-C03">Blok C03</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] font-bold mb-1">Varietas Tanaman</label>
              <select
                value={filters.varietyId}
                onChange={(e) => setFilters({ ...filters, varietyId: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              >
                <option value="ALL">Semua Varietas</option>
                <option value="var-1">Dami Mas DxP Super</option>
                <option value="var-2">Socfindo MtG</option>
                <option value="var-3">Marihat DxP Standard</option>
                <option value="var-4">Topaz 3 Premium</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] font-bold mb-1">Kategori Umur</label>
              <select
                value={filters.ageCategory}
                onChange={(e) => setFilters({ ...filters, ageCategory: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              >
                <option value="ALL">Semua Umur</option>
                <option value="TBM0">TBM-0 (0 Thn)</option>
                <option value="TBM1_3">TBM 1–3 (1-3 Thn)</option>
                <option value="TM_MUDA">TM Muda (4-7 Thn)</option>
                <option value="TM_PRIMA">TM Prima (8-15 Thn)</option>
                <option value="TM_TUA">TM Tua (16-20 Thn)</option>
                <option value="TM_RENTAN">Rentan (&gt;20 Thn)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] font-bold mb-1">Health Status</label>
              <select
                value={filters.healthStatus}
                onChange={(e) => setFilters({ ...filters, healthStatus: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
              >
                <option value="ALL">Semua Health Status</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Critical">Critical</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() =>
                  setFilters({
                    searchQuery: '',
                    companyId: 'ALL',
                    estateId: 'ALL',
                    afdelingName: 'ALL',
                    blockCode: 'ALL',
                    varietyId: 'ALL',
                    year: 'ALL',
                    ageCategory: 'ALL',
                    healthStatus: 'ALL',
                    dateFrom: '',
                    dateTo: '',
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300 transition-colors"
              >
                Reset Filter
              </button>
            </div>
          </div>
        )}

        {/* Horizontal Scrollable Submenu Pills Bar */}
        <div className="overflow-x-auto pt-2 pb-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 min-w-max">
            {SUBMENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSubTab(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE SUBVIEW */}
      {activeSubTab === 'dashboard' && (
        <PlantationDashboardView
          metrics={INITIAL_POPULATION_METRICS}
          ageCategories={INITIAL_PLANT_AGE_CATEGORIES}
          onNavigateSubTab={setActiveSubTab}
        />
      )}

      {(activeSubTab === 'nursery' || activeSubTab === 'seedling') && (
        <NurserySeedlingView
          nurseries={INITIAL_NURSERIES}
          seedlings={INITIAL_SEEDLINGS}
          activeSubTab={activeSubTab}
        />
      )}

      {(activeSubTab === 'land-clearing' || activeSubTab === 'land-prep') && (
        <LandClearingPrepView
          clearings={INITIAL_LAND_CLEARINGS}
          preparations={INITIAL_LAND_PREPARATIONS}
        />
      )}

      {(activeSubTab === 'planting-program' || activeSubTab === 'planting') && (
        <PlantingProgramView
          programs={INITIAL_PLANTING_PROGRAMS}
          plantings={INITIAL_PLANTINGS}
        />
      )}

      {(activeSubTab === 'population' ||
        activeSubTab === 'tree-census' ||
        activeSubTab === 'missing-palm' ||
        activeSubTab === 'dead-palm' ||
        activeSubTab === 'gap-planting' ||
        activeSubTab === 'replanting') && (
        <TreeCensusView
          censusRecords={INITIAL_TREE_CENSUS}
          deadPalms={INITIAL_DEAD_PALMS}
          gapPlantings={INITIAL_GAP_PLANTINGS}
          replantings={INITIAL_REPLANTINGS}
          activeSubTab={activeSubTab}
        />
      )}

      {(activeSubTab === 'plant-age' || activeSubTab === 'plant-variety') && (
        <PlantAgeVarietyView
          ageCategories={INITIAL_PLANT_AGE_CATEGORIES}
          varieties={INITIAL_PLANT_VARIETIES}
          activeSubTab={activeSubTab}
        />
      )}

      {(activeSubTab === 'block-history' || activeSubTab === 'timeline') && (
        <BlockHistoryTimelineView
          blockHistories={INITIAL_BLOCK_HISTORIES}
          timelineEvents={INITIAL_TIMELINE_EVENTS}
          activeSubTab={activeSubTab}
        />
      )}

      {(activeSubTab === 'growth-monitoring' || activeSubTab === 'agronomy-notes') && (
        <GrowthAgronomyView
          growthRecords={INITIAL_GROWTH_RECORDS}
          agronomyNotes={INITIAL_AGRONOMY_NOTES}
          activeSubTab={activeSubTab}
        />
      )}

      {(activeSubTab === 'plant-health' || activeSubTab === 'ai-health') && (
        <PlantHealthAiView
          healthRecords={INITIAL_PLANT_HEALTH}
          aiFoundations={INITIAL_AI_HEALTH_FOUNDATIONS}
          activeSubTab={activeSubTab}
        />
      )}

      {activeSubTab === 'docs-photos-api' && (
        <PlantationMediaApiDocsView
          photos={INITIAL_PLANT_PHOTOS}
          documents={INITIAL_PLANT_DOCUMENTS}
          activeSubTab={activeSubTab}
        />
      )}

      {/* Prompt 7 Roadmap Banner */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-slate-900 via-slate-950 to-emerald-950 text-white border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Prompt 7 Roadmap Preview • Field Operation Management</span>
            </div>
            <h3 className="text-lg font-bold">
              Tahap Selanjutnya: Pembangunan Modul Field Operation Management
            </h3>
            <p className="text-slate-300 text-xs max-w-3xl leading-relaxed">
              Modul berikutnya akan menangani aktivitas operasional kebun harian: Pemupukan, Penyemprotan (Weed Control), Pemangkasan Pelepah (Pruning), Perawatan Jalan & Drainase, Pekerjaan Mandor, Penugasan Regu Tim, GPS Tracking, Checklist Digital, Foto Lapangan, Mode Offline Field Engine, dan Rekomendasi Operasional AI.
            </p>
          </div>
          <button
            onClick={() => alert('Roadmap Prompt 7 Siap Dilanjutkan')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-all shrink-0 cursor-pointer"
          >
            <span>Daftar Tugas Prompt 7</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
