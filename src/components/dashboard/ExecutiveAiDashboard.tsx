import React, { useState } from 'react';
import {
  Building2,
  Trees,
  Users,
  Truck,
  Package,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  BarChart3,
  Scale,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  Droplet,
  CloudRain,
  SlidersHorizontal,
} from 'lucide-react';
import { LicenseInfo, CompanyContext, UserRole, WhiteLabelConfig, ExecutiveKpiData } from '../../types';
import { ProductionTrendChart } from '../charts/ProductionTrendChart';
import { HarvestYieldBarChart } from '../charts/HarvestYieldBarChart';
import { CostRevenuePieChart } from '../charts/CostRevenuePieChart';
import { EquipmentUtilizationRadar } from '../charts/EquipmentUtilizationRadar';
import { AiForecastChart } from '../charts/AiForecastChart';
import { WeatherWidgetCard } from './widgets/WeatherWidgetCard';
import { GisMapPlaceholderCard } from './widgets/GisMapPlaceholderCard';
import { QuickActionGrid } from './widgets/QuickActionGrid';
import { ActivityTimelineWidget } from './widgets/ActivityTimelineWidget';
import { ReportShortcutCard } from './widgets/ReportShortcutCard';
import { SystemHealthWidget } from './widgets/SystemHealthWidget';

interface ExecutiveAiDashboardProps {
  license: LicenseInfo;
  companyContext?: CompanyContext;
  userRole: UserRole;
  whiteLabel?: WhiteLabelConfig;
  onNavigateToModule: (moduleId: string) => void;
  onOpenAiAssistant?: () => void;
}

export const ExecutiveAiDashboard: React.FC<ExecutiveAiDashboardProps> = ({
  license,
  companyContext,
  userRole,
  whiteLabel,
  onNavigateToModule,
  onOpenAiAssistant,
}) => {
  const [selectedEstateFilter, setSelectedEstateFilter] = useState<string>('ALL');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('THIS_MONTH');

  const EXECUTIVE_KPIS: ExecutiveKpiData[] = [
    {
      id: 'kpi-area',
      title: 'Total Luas Perkebunan',
      value: '12.500',
      unit: 'Hektare',
      trend: 'up',
      trendValue: '+2.4%',
      sparklineData: [11800, 12000, 12200, 12400, 12500],
      target: '13.000 Ha',
      progressPct: 96,
      category: 'estate',
      iconName: 'Building2',
      color: 'bg-emerald-500',
    },
    {
      id: 'kpi-trees',
      title: 'Total Populasi Pohon',
      value: '1.850.000',
      unit: 'Pokok',
      trend: 'up',
      trendValue: '+1.8%',
      sparklineData: [1780000, 1800000, 1820000, 1840000, 1850000],
      target: 'SPH 136/Ha',
      progressPct: 98,
      category: 'estate',
      iconName: 'Trees',
      color: 'bg-green-600',
    },
    {
      id: 'kpi-tbs',
      title: 'Produksi TBS Bulan Ini',
      value: '18.100',
      unit: 'Ton',
      trend: 'up',
      trendValue: '+12.5% vs RKAP',
      sparklineData: [14200, 15600, 16800, 17200, 18100],
      target: '16.000 Ton',
      progressPct: 113,
      category: 'production',
      iconName: 'Scale',
      color: 'bg-blue-600',
    },
    {
      id: 'kpi-yield',
      title: 'Rata-rata Yield Produksi',
      value: '22.8',
      unit: 'Ton/Ha',
      trend: 'up',
      trendValue: '+1.2 Ton',
      sparklineData: [20.5, 21.0, 21.8, 22.1, 22.8],
      target: '22.0 Ton/Ha',
      progressPct: 103,
      category: 'production',
      iconName: 'TrendingUp',
      color: 'bg-indigo-600',
    },
    {
      id: 'kpi-employees',
      title: 'Tenaga Kerja Aktif',
      value: '2.150',
      unit: 'Orang',
      trend: 'neutral',
      trendValue: 'Presensi 98.4%',
      sparklineData: [2100, 2120, 2140, 2145, 2150],
      target: '2.200 Orang',
      progressPct: 97,
      category: 'resource',
      iconName: 'Users',
      color: 'bg-violet-600',
    },
    {
      id: 'kpi-fleet',
      title: 'Armada & Alat Berat',
      value: '120',
      unit: 'Unit',
      trend: 'up',
      trendValue: 'Utilisasi 89%',
      sparklineData: [110, 112, 115, 118, 120],
      target: '125 Unit',
      progressPct: 96,
      category: 'resource',
      iconName: 'Truck',
      color: 'bg-amber-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Executive Welcome Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Trees className="h-64 w-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" /> Executive AI Control Tower v3.0
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 text-xs font-semibold border border-slate-700">
                Holding: {whiteLabel?.companyName || companyContext?.companyName || 'PT Sawit Nusantara Jaya'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Selamat Datang di Command Center, <span className="text-emerald-400 font-extrabold">{userRole.replace('_', ' ')}</span>
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
              Pusat kendali eksekutif real-time seluruh operasional 5 Estate, 38 Afdeling, dan 240 Blok Sawit. Didukung AI Analytics, Telemetri Cuaca, dan GIS Heatmap.
            </p>
          </div>

          {/* Controls & Date Filter */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700 backdrop-blur-md text-xs">
              <span className="text-slate-400 px-2 font-semibold">Estate:</span>
              <select
                value={selectedEstateFilter}
                onChange={(e) => setSelectedEstateFilter(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-hidden"
              >
                <option value="ALL" className="bg-slate-900 text-white">Semua Estate (5 Estate)</option>
                <option value="EST-01" className="bg-slate-900 text-white">Estate Teluk Dalam</option>
                <option value="EST-02" className="bg-slate-900 text-white">Estate Sungai Rungau</option>
                <option value="EST-03" className="bg-slate-900 text-white">Estate Bukit Permata</option>
              </select>
            </div>

            <button
              onClick={() => onNavigateToModule('architecture-blueprints')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition-all"
            >
              <BarChart3 className="h-4 w-4" /> Cetak Laporan RKAP
            </button>
          </div>
        </div>
      </div>

      {/* Top AI Insights Banner */}
      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-600/30 text-emerald-400 shrink-0 mt-0.5">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Diagnosa Agronomis & Yield Forecast (Gemini 2.5 AI)
            </h4>
            <p className="text-xs text-slate-200 mt-0.5">
              Proyeksi puncaknya panen TBS diperkirakan terjadi pada minggu ke-3 Agustus di <span className="font-bold text-white">Estate Teluk Dalam (Blok B12 & A05)</span> dengan kenaikan yield +14.8%. Disarankan penambahan 12 armada Dump Truck di Divisi I.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAiAssistant}
          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-md"
        >
          Tanya Asisten AI <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {EXECUTIVE_KPIS.map((kpi) => (
          <div
            key={kpi.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:border-emerald-500/40 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 truncate">{kpi.title}</span>
              <div className={`p-2 rounded-xl ${kpi.color} text-white shadow-xs shrink-0`}>
                {kpi.iconName === 'Building2' && <Building2 className="h-4 w-4" />}
                {kpi.iconName === 'Trees' && <Trees className="h-4 w-4" />}
                {kpi.iconName === 'Scale' && <Scale className="h-4 w-4" />}
                {kpi.iconName === 'TrendingUp' && <TrendingUp className="h-4 w-4" />}
                {kpi.iconName === 'Users' && <Users className="h-4 w-4" />}
                {kpi.iconName === 'Truck' && <Truck className="h-4 w-4" />}
              </div>
            </div>

            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {kpi.value}
                </span>
                {kpi.unit && <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{kpi.unit}</span>}
              </div>

              <div className="flex items-center gap-1.5 mt-1">
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  {kpi.trendValue}
                </span>
                <span className="text-[10px] text-slate-400">Target: {kpi.target}</span>
              </div>
            </div>

            {/* Target Progress Bar */}
            {kpi.progressPct && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                  <span>Pencapaian Target</span>
                  <span>{kpi.progressPct}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${kpi.progressPct >= 100 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(100, kpi.progressPct)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Analytics Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Trend Chart (2 cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="h-4 w-4 text-emerald-500" /> Tren Produksi TBS vs Target RKAP (Tonnes)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Realisasi bulanan seluruh estate dibanding proyeksi target
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              Surplus +12.5%
            </span>
          </div>
          <ProductionTrendChart />
        </div>

        {/* Weather & Agricultural Telemetry Widget */}
        <div className="lg:col-span-1">
          <WeatherWidgetCard />
        </div>
      </div>

      {/* GIS Spatial Map & AI Yield Projections Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GIS Map Placeholder */}
        <div className="lg:col-span-2">
          <GisMapPlaceholderCard />
        </div>

        {/* AI Forecast & Confidence Band Chart */}
        <div className="lg:col-span-1 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" /> Proyeksi AI Gemini 2.5
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Prediksi panen minggu depan (Confidence 95%)
            </p>
          </div>
          <AiForecastChart />
        </div>
      </div>

      {/* Secondary Charts: Yield Bar Chart, Cost Allocation & Equipment Radar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Yield Per Estate (Ton/Ha)</h3>
          <HarvestYieldBarChart />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Struktur Biaya Operasional (%)</h3>
          <CostRevenuePieChart />
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Utilisasi Alat Berat & Fleet (%)</h3>
          <EquipmentUtilizationRadar />
        </div>
      </div>

      {/* Quick Action Tiles Grid */}
      <QuickActionGrid
        onSelectAction={onNavigateToModule}
        onOpenAiAssistant={onOpenAiAssistant}
      />

      {/* Activity Log Stream & Report Shortcut Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityTimelineWidget />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <ReportShortcutCard />
          <SystemHealthWidget license={license} />
        </div>
      </div>
    </div>
  );
};
