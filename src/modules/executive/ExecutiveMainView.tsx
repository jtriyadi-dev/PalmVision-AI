import React, { useState } from 'react';
import { ScrollableSubNav, TabItem } from '../../components/ScrollableSubNav';
import {
  Crown,
  TrendingUp,
  DollarSign,
  Building2,
  Brain,
  ShieldCheck,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BarChart3,
  PieChart,
  Trees,
  Scale,
  Sliders,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Download,
  Calendar,
  Layers,
  Factory,
  Zap,
  Leaf,
  RefreshCw,
  Users
} from 'lucide-react';
import { useEnterpriseData } from '../../context/EnterpriseDataContext';

export const ExecutiveMainView: React.FC = () => {
  const { navigateToModule } = useEnterpriseData();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'estates' | 'finance' | 'ai-briefing' | 'esg-governance'
  >('overview');

  const [selectedEstateFilter, setSelectedEstateFilter] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('YTD 2026');

  // What-If Simulator State
  const [cpoPriceSim, setCpoPriceSim] = useState<number>(12650); // IDR / kg
  const [oerSim, setOerSim] = useState<number>(23.85); // %
  const [fertilizerCostSim, setFertilizerCostSim] = useState<number>(0); // % change

  // Calculate simulated EBITDA impact
  const baseRevenue = 1480; // Miliar IDR
  const baseEbitda = 515; // Miliar IDR
  const cpoPriceDiffPercent = (cpoPriceSim - 12650) / 12650;
  const oerDiffPercent = (oerSim - 23.85) / 23.85;
  const fertilizerImpact = (fertilizerCostSim / 100) * 120; // 120B fertilizer budget

  const simulatedRevenue = Math.round(baseRevenue * (1 + cpoPriceDiffPercent * 0.85 + oerDiffPercent * 0.75));
  const simulatedEbitda = Math.round(baseEbitda + (simulatedRevenue - baseRevenue) - fertilizerImpact);
  const simulatedMargin = ((simulatedEbitda / simulatedRevenue) * 100).toFixed(1);

  const subNavItems: TabItem[] = [
    { id: 'overview', label: 'Ringkasan Eksekutif Group', icon: Crown },
    { id: 'estates', label: 'Matrix & Peringkat Kebun/PKS', icon: Building2 },
    { id: 'finance', label: 'EBITDA, CPO Margin & Budget', icon: DollarSign },
    { id: 'ai-briefing', label: 'AI Executive Briefing & Simulator', icon: Brain },
    { id: 'esg-governance', label: 'Tatakelola, RSPO/ISPO & ESG', icon: ShieldCheck },
  ];

  const estateMatrixData = [
    {
      id: 'est-01',
      name: 'Kebun Riau Sejahtera 01',
      region: 'Riau Utara',
      areaHa: 14500,
      tbsYieldTonHa: 24.8,
      oerPercent: 24.1,
      cpoCostPerKg: 6850,
      ebitdaContributionIdr: 185.4,
      rspoCertified: true,
      status: 'Outstanding',
      statusBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      manager: 'Ir. Bambang Trihatmojo'
    },
    {
      id: 'est-02',
      name: 'Kebun Kaltim Utama 02',
      region: 'Kutai Timur',
      areaHa: 16200,
      tbsYieldTonHa: 22.4,
      oerPercent: 23.6,
      cpoCostPerKg: 7200,
      ebitdaContributionIdr: 162.0,
      rspoCertified: true,
      status: 'Memenuhi Target',
      statusBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      manager: 'H. Suryadi, S.T.'
    },
    {
      id: 'est-03',
      name: 'Kebun Sumut Makmur 04',
      region: 'Labuhanbatu',
      areaHa: 9800,
      tbsYieldTonHa: 25.6,
      oerPercent: 24.5,
      cpoCostPerKg: 6700,
      ebitdaContributionIdr: 128.5,
      rspoCertified: true,
      status: 'Top Performer',
      statusBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      manager: 'Drs. Iskandar Muda'
    },
    {
      id: 'est-04',
      name: 'Kebun Kalbar Jaya 03',
      region: 'Sintang',
      areaHa: 12000,
      tbsYieldTonHa: 20.2,
      oerPercent: 23.1,
      cpoCostPerKg: 7750,
      ebitdaContributionIdr: 89.1,
      rspoCertified: false,
      status: 'Perlu Perhatian (Ganoderma)',
      statusBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      manager: 'Dedi Kurniawan, M.Sc.'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Executive Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/80 to-slate-900 border border-emerald-800/50 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-40 top-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <Crown className="w-3 h-3 text-amber-400" /> Executive & Board View
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-300 bg-slate-800 border border-slate-700">
                PT Nusantara Palm Energy Tbk
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              Dashboard Eksekutif & Direksi
            </h1>
            <p className="text-xs text-slate-300 max-w-2xl">
              Pusat kendali kinerja konsolidasi Holding, margin keuntungan CPO, realisasi budget operational & rapat keputusan strategis Dewan Direksi.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 p-1.5 rounded-2xl">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 ml-1.5" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer pr-2"
              >
                <option value="MTD Ags 2026">MTD Agustus 2026</option>
                <option value="Q3 2026">Q3 2026 (Proyeksi)</option>
                <option value="YTD 2026">YTD 2026 (Jan - Ags)</option>
                <option value="FY 2025">FY 2025 (Audited)</option>
              </select>
            </div>

            <button
              onClick={() => setActiveTab('ai-briefing')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-900/40 flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive AI Briefing</span>
            </button>
          </div>
        </div>
      </div>

      {/* Submenu Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-lg">
        <ScrollableSubNav
          items={subNavItems}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          activeColorClass="bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
        />
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Key Performance Indicators (KPIs) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pendapatan Group</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-white">Rp 1.48 Triliun</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>+14.2% YoY (Target: 1.30 T)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">EBITDA Margin</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-white">34.8%</div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Rp 515.0 Miliar (+2.3% vs Target)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Produksi TBS Total</span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Trees className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-white">1.240.500 Ton</div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  Inti: 78% | Plasma/Ketiga: 22%
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Rata-rata OER PKS</span>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Factory className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-white">23.85%</div>
                <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-bold mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>Target: 23.50% (Super Grade)</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Harga Terjual CPO</span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-white">Rp 12.650 / kg</div>
                <div className="text-[11px] text-purple-400 font-bold mt-1">
                  HPP Produksi: Rp 7.420 / kg
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 hover:border-emerald-500/40 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sertifikasi & ESG</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-xl font-black text-white">98.4% Compliance</div>
                <div className="text-[11px] text-emerald-400 font-bold mt-1">
                  RSPO / ISPO Verified • Zero Fatality
                </div>
              </div>
            </div>
          </div>

          {/* Main Charts & Strategic Financial Briefing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Consolidated Production & Financial Trend Chart */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    Tren Pendapatan & EBITDA Bulanan 2026 (Miliar Rp)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Perbandingan Pendapatan CPO, PK, dan Margin EBITDA Lintas Bulan
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block" /> Revenue
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-3 h-3 rounded-xs bg-cyan-500 inline-block" /> EBITDA
                  </span>
                </div>
              </div>

              {/* Visual Bar Chart */}
              <div className="space-y-4 pt-2">
                {[
                  { month: 'Jan', rev: 175, ebitda: 61, targetRev: 160 },
                  { month: 'Feb', rev: 182, ebitda: 64, targetRev: 165 },
                  { month: 'Mar', rev: 190, ebitda: 68, targetRev: 170 },
                  { month: 'Apr', rev: 185, ebitda: 63, targetRev: 170 },
                  { month: 'Mei', rev: 198, ebitda: 71, targetRev: 175 },
                  { month: 'Jun', rev: 205, ebitda: 74, targetRev: 180 },
                  { month: 'Jul', rev: 215, ebitda: 78, targetRev: 185 },
                  { month: 'Ags (Est)', rev: 230, ebitda: 82, targetRev: 190 }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-300 w-20">{item.month}</span>
                      <div className="flex gap-4 text-slate-400">
                        <span>Rev: <strong className="text-white">Rp {item.rev} B</strong></span>
                        <span>EBITDA: <strong className="text-emerald-400">Rp {item.ebitda} B</strong></span>
                      </div>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden flex gap-1 p-0.5">
                      <div
                        className="bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full h-full transition-all duration-500"
                        style={{ width: `${(item.rev / 250) * 100}%` }}
                      />
                      <div
                        className="bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full h-full transition-all duration-500"
                        style={{ width: `${(item.ebitda / 250) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Total EBITDA Terkumulasi: <strong className="text-emerald-400 font-bold">Rp 561 Miliar</strong></span>
                <button
                  onClick={() => navigateToModule('finance')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  Detail Keuangan Lengkap →
                </button>
              </div>
            </div>

            {/* Board Directive & Strategic Action Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-400" />
                  Arahan Strategis Direksi
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Q3 Agenda
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Replanting 1.500 Ha
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">82% Selesai</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Peremajaan pohon tua Kebun Riau 01 menggunakan varietas unggul DxP Tenera potensi yield 30 Ton/Ha.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" /> Mitigasi Ganoderma Kalbar
                    </span>
                    <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-1.5 py-0.5 rounded">Prioritas</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Pengaplikasian Agen Hayati Trichoderma & sanitasi tunggul di Blok B12-B14 Kalbar Jaya 03.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Methane Capture PKS Sumut
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Commissioning</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Pembangkit listrik biogas limbah cair POME menghasilkan 2.4 MW energi hijau pengganti genset solar.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-950 border border-emerald-800/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" /> Executive Summary AI
                  </span>
                  <button
                    onClick={() => setActiveTab('ai-briefing')}
                    className="text-[11px] text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    Buka Simulator
                  </button>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  "Profitabilitas Q3 terproyeksi naik 8.4% apabila OER PKS dijaga diatas 23.8% dan harga CPO bertahan di atas Rp 12.500/kg."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESTATES MATRIX TAB */}
      {activeTab === 'estates' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-emerald-400" />
                  Matrix Kinerja & Peringkat Kebun / PKS Group
                </h3>
                <p className="text-xs text-slate-400">
                  Perbandingan produktivitas TBS, OER Pabrik Kelapa Sawit, dan Biaya Produksi per Kebun
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedEstateFilter}
                  onChange={(e) => setSelectedEstateFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none cursor-pointer"
                >
                  <option value="all">Semua Unit Kebun (4 Unit)</option>
                  <option value="Riau">Region Riau</option>
                  <option value="Kaltim">Region Kaltim</option>
                  <option value="Sumut">Region Sumut</option>
                  <option value="Kalbar">Region Kalbar</option>
                </select>
              </div>
            </div>

            {/* Estate Matrix Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {estateMatrixData.map((est) => (
                <div key={est.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3 hover:border-emerald-500/40 transition">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{est.name}</h4>
                      <span className="text-[11px] text-slate-400 font-medium">{est.region} • {est.areaHa.toLocaleString()} Ha</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${est.statusBg}`}>
                      {est.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 font-medium block">Yield TBS</span>
                      <span className="font-bold text-emerald-400 text-sm">{est.tbsYieldTonHa} Ton/Ha</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-medium block">OER PKS</span>
                      <span className="font-bold text-cyan-400 text-sm">{est.oerPercent}%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-medium block">Biaya / kg CPO</span>
                      <span className="font-bold text-white">Rp {est.cpoCostPerKg.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-medium block">Kontribusi EBITDA</span>
                      <span className="font-bold text-amber-400">Rp {est.ebitdaContributionIdr} B</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Manager: <strong className="text-slate-200">{est.manager}</strong></span>
                    {est.rspoCertified && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[9px] border border-emerald-800">
                        RSPO Certified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Table Matrix */}
            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-black border-b border-slate-800">
                  <tr>
                    <th className="p-3">Nama Unit Kebun</th>
                    <th className="p-3">Manajer Kebun</th>
                    <th className="p-3 text-right">Luas HGU (Ha)</th>
                    <th className="p-3 text-right">Yield TBS (Ton/Ha)</th>
                    <th className="p-3 text-right">OER PKS (%)</th>
                    <th className="p-3 text-right">HPP CPO (Rp/kg)</th>
                    <th className="p-3 text-right">EBITDA (Miliar Rp)</th>
                    <th className="p-3 text-center">Status Operasional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                  {estateMatrixData.map((est) => (
                    <tr key={est.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3 font-bold text-white flex items-center gap-2">
                        <Trees className="w-4 h-4 text-emerald-400" />
                        {est.name}
                      </td>
                      <td className="p-3 text-slate-300">{est.manager}</td>
                      <td className="p-3 text-right font-mono text-slate-200">{est.areaHa.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-emerald-400">{est.tbsYieldTonHa}</td>
                      <td className="p-3 text-right font-bold text-cyan-400">{est.oerPercent}%</td>
                      <td className="p-3 text-right font-mono text-slate-200">Rp {est.cpoCostPerKg.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-amber-400">Rp {est.ebitdaContributionIdr} B</td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${est.statusBg}`}>
                          {est.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FINANCE & EBITDA TAB */}
      {activeTab === 'finance' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                Struktur Biaya Produksi CPO & OPEX Holding
              </h3>
              <p className="text-xs text-slate-400">
                Alokasi Pengeluaran Operasional per Tonne CPO (Total HPP Rata-rata: Rp 7.420 / kg)
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { name: 'Pemupukan & Nutrisi Tanaman (NPK/Urea)', amount: 2597, pct: 35, color: 'bg-emerald-500' },
                  { name: 'Tenaga Kerja Kebun & Manpower Panen', amount: 2077, pct: 28, color: 'bg-cyan-500' },
                  { name: 'Pengolahan Pabrik Kelapa Sawit (PKS)', amount: 1113, pct: 15, color: 'bg-purple-500' },
                  { name: 'Angkutan & Dispatch Transport TBS/CPO', amount: 1038, pct: 14, color: 'bg-amber-500' },
                  { name: 'Pemeliharaan Alat Berat & Infrastruktur', amount: 595, pct: 8, color: 'bg-rose-500' },
                ].map((cost, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-200">{cost.name}</span>
                      <span className="text-slate-300 font-mono">Rp {cost.amount.toLocaleString()} / kg ({cost.pct}%)</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div className={`h-full ${cost.color} rounded-full`} style={{ width: `${cost.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Marjin Kotor (Gross Margin CPO): <strong className="text-emerald-400 font-bold">41.3%</strong></span>
                <button
                  onClick={() => navigateToModule('finance')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" /> Buka Laporan Keuangan Lengkap
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-amber-400" />
                Penjualan CPO & Kontrak Futures
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Pasar Domestik (Refinery & Biodiesel B35)</span>
                  <div className="text-lg font-black text-white">65% Vol (Rp 12.450 / kg)</div>
                  <span className="text-[10px] text-emerald-400 font-mono">Kontrak Jangka Panjang PT Wilmar & Musim Mas</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">Ekspor FOB Belawan (India & China)</span>
                  <div className="text-lg font-black text-cyan-400">35% Vol (USD 985 / MT)</div>
                  <span className="text-[10px] text-cyan-300 font-mono">Bebas Bea Ekspor Tambahan</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400 block font-medium">CPO Sales Forward Commitment</span>
                  <div className="text-lg font-black text-amber-400">145.000 Ton Terkunci</div>
                  <span className="text-[10px] text-slate-400 font-mono">Untuk Delivery Q4 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI EXECUTIVE BRIEFING & SIMULATOR TAB */}
      {activeTab === 'ai-briefing' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive What-If Scenario Simulator */}
            <div className="lg:col-span-2 bg-slate-900 border border-emerald-800/60 rounded-3xl p-6 space-y-6 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-emerald-400" />
                    Simulator Skenario Keuangan Direksi (What-If Analysis)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Geser parameter untuk mensimulasikan dampak perubahan Harga CPO, OER Pabrik, dan Biaya Pupuk terhadap EBITDA Group.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCpoPriceSim(12650);
                    setOerSim(23.85);
                    setFertilizerCostSim(0);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Slider 1: CPO Price */}
                <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block">
                    1. Harga CPO (Rp / kg):
                  </label>
                  <div className="text-xl font-black text-emerald-400 font-mono">
                    Rp {cpoPriceSim.toLocaleString()}
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="16000"
                    step="100"
                    value={cpoPriceSim}
                    onChange={(e) => setCpoPriceSim(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Rp 10.000</span>
                    <span>Baseline: Rp 12.650</span>
                    <span>Rp 16.000</span>
                  </div>
                </div>

                {/* Slider 2: OER % */}
                <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block">
                    2. Ekstraksi OER PKS (%):
                  </label>
                  <div className="text-xl font-black text-cyan-400 font-mono">
                    {oerSim.toFixed(2)}%
                  </div>
                  <input
                    type="range"
                    min="22.0"
                    max="25.5"
                    step="0.05"
                    value={oerSim}
                    onChange={(e) => setOerSim(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>22.0%</span>
                    <span>Baseline: 23.85%</span>
                    <span>25.5%</span>
                  </div>
                </div>

                {/* Slider 3: Fertilizer Cost % */}
                <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <label className="text-xs font-bold text-slate-300 block">
                    3. Perubahan Biaya Pupuk (%):
                  </label>
                  <div className="text-xl font-black text-amber-400 font-mono">
                    {fertilizerCostSim > 0 ? `+${fertilizerCostSim}%` : `${fertilizerCostSim}%`}
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="40"
                    step="5"
                    value={fertilizerCostSim}
                    onChange={(e) => setFertilizerCostSim(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>-20%</span>
                    <span>Baseline: 0%</span>
                    <span>+40%</span>
                  </div>
                </div>
              </div>

              {/* Simulation Result Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 border border-emerald-500/50 space-y-3">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                  Hasil Proyeksi Simulasi Konsolidasi:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Proyeksi Pendapatan</span>
                    <div className="text-xl font-black text-white">Rp {simulatedRevenue.toLocaleString()} B</div>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      {simulatedRevenue >= baseRevenue ? `+${simulatedRevenue - baseRevenue} B` : `${simulatedRevenue - baseRevenue} B`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Proyeksi EBITDA Group</span>
                    <div className="text-xl font-black text-emerald-400">Rp {simulatedEbitda.toLocaleString()} B</div>
                    <span className="text-[10px] text-cyan-400 font-bold">
                      {simulatedEbitda >= baseEbitda ? `+${simulatedEbitda - baseEbitda} B` : `${simulatedEbitda - baseEbitda} B`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">EBITDA Margin Proyeksi</span>
                    <div className="text-xl font-black text-cyan-400">{simulatedMargin}%</div>
                    <span className="text-[10px] text-slate-400">vs Baseline 34.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Strategic Intelligence Briefing */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-emerald-400" />
                  Rekomendasi AI Direksi
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
                  Gemini 2.5 Flash
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-emerald-400 block">1. Hedging Kontrak CPO Q4</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Disarankan mengunci harga futures 20.000 Ton CPO di kisaran Rp 12.800/kg untuk melindungi dari volatilitas harga minyak sawit global.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-cyan-400 block">2. Percepatan Pemupukan Semester 2</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Percepat aplikasi pupuk NPK sebelum memasuki musim hujan tinggi di Oktober untuk memaksimalkan penyerapan hara di Kebun Kaltim.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="font-bold text-amber-400 block">3. Digitalisasi Weighbridge Real-time</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Integrasi 100% sensor jembatan timbang otomatis dapat menekan potensi susut (loss) restan TBS hingga 1.8%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESG & GOVERNANCE TAB */}
      {activeTab === 'esg-governance' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Tatakelola Keberlanjutan (ESG), RSPO/ISPO & Legalitas HGU
                </h3>
                <p className="text-xs text-slate-400">
                  Compliance Audit, Sertifikasi Keberlanjutan Lingkungan & Sertifikasi HGU Holding
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-bold">Total Area HGU Legitim</span>
                <div className="text-xl font-black text-white">52.500 Ha</div>
                <span className="text-[10px] text-emerald-400 font-mono">Aktif hingga 2048+</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-bold">Cakupan Sertifikasi RSPO</span>
                <div className="text-xl font-black text-emerald-400">94.2% Area</div>
                <span className="text-[10px] text-slate-400 font-mono">Audit Tahunan Pass</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-bold">Traceability (NDPE)</span>
                <div className="text-xl font-black text-cyan-400">99.1% Verified</div>
                <span className="text-[10px] text-slate-400 font-mono">100% Kebun Inti & Plasma</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-xs text-slate-400 block font-bold">K3 / Safety Health Index</span>
                <div className="text-xl font-black text-amber-400">Zero Fatality</div>
                <span className="text-[10px] text-emerald-400 font-mono">1.2M Hours Safe Work</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
