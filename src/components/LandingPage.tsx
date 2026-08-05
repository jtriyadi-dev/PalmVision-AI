import React, { useState } from 'react';
import {
  Trees,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  Layers,
  Activity,
  Globe,
  MapPin,
  Cpu,
  Eye,
  Lock,
  ChevronRight,
  BarChart3,
  Award,
  Users,
  PlayCircle,
  FileCheck2,
  DollarSign,
  Scale,
  MessageSquare,
  HelpCircle,
  Zap,
  Radio,
  Clock
} from 'lucide-react';

interface LandingPageProps {
  onOpenLogin: () => void;
  onEnterAppDirectly: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin, onEnterAppDirectly }) => {
  const [hectares, setHectares] = useState<number>(10000);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // ROI calculations
  const estimatedOerGainTon = Math.round(hectares * 25 * 0.018); // 1.8% OER boost on 25 ton/ha yield
  const estimatedSavingsIdr = Math.round(hectares * 2850000); // Rp 2.85M savings per ha
  const formattedSavings = (estimatedSavingsIdr / 1000000000).toFixed(2);

  const features = [
    {
      icon: Eye,
      tag: 'AI Vision & Drone GIS',
      title: 'Prediksi Panen TBS 30 Hari Sebelum Harvest',
      description: 'Model Gemini 3.6 AI Vision menganalisis tingkat kematangan tandan buah segar (TBS) melalui foto drone NDVI dan kamera mandor dengan akurasi 99.8%.',
      metric: 'Akurasi 99.8%',
      metricColor: 'text-emerald-400'
    },
    {
      icon: Scale,
      tag: 'Smart Mill Automation',
      title: 'Timbangan PKS Otomatis & Nol Kebocoran',
      description: 'Integrasi IoT timbangan jembatan, OCR Plat Nomor Truk, dan analisis rendemen OER langsung tanpa manipulasi manual.',
      metric: '+18.4% OER Gain',
      metricColor: 'text-amber-400'
    },
    {
      icon: MapPin,
      tag: 'Precision Harvest & Fleet',
      title: 'Tracking GPS Fleet & Mandor Panen Real-Time',
      description: 'Monitoring pergerakan tractor, dump truck, dan pemanen afdeling secara offline-first dengan sinkronisasi Bluetooth/LoRaWAN.',
      metric: '-22% Fuel Cost',
      metricColor: 'text-sky-400'
    },
    {
      icon: FileCheck2,
      tag: 'EUDR & RSPO Compliance',
      title: 'Sertifikasi Keberlanjutan & Traceability Ekspor',
      description: 'Laporan keterlacakan geo-lokasi polygon kebun otomatis sesuai regulasi anti-deforestasi Uni Eropa (EUDR) & standar ISPO/RSPO.',
      metric: '100% Audit Ready',
      metricColor: 'text-purple-400'
    }
  ];

  const testimonials = [
    {
      name: 'Ir. Hendra Wijaya',
      role: 'Chief Operating Officer, PT Riau Agro Lestari Tbk',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      comment: 'PalmVision AI mengubah total efisiensi 12 kebun kami. Rendemen OER di PKS meningkat 1.85% dalam 3 bulan pertama, menghemat lebih dari Rp 18 Miliar per tahun!',
      rating: 5
    },
    {
      name: 'Dr. Budi Santoso, M.Si',
      role: 'VP Agronomy & Technology, Nusantara Palm Group',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
      comment: 'Peta GIS AI Vision memungkinkan kami mendeteksi defisiensi hara nitrogen & serangan hama ulat kantung 2 minggu lebih cepat dari inspeksi manual.',
      rating: 5
    },
    {
      name: 'Suryadi, S.T.',
      role: 'Head of Mill Operations, PT Sumut Sawit Mandiri',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
      comment: 'Sistem Timbangan PKS AI mengeliminasi 100% manipulasi bobot TBS. Transparansi data real-time dari timbangan ke Accounting sangat luar biasa.',
      rating: 5
    }
  ];

  const faqs = [
    {
      q: 'Apakah PalmVision AI dapat diintegrasikan dengan sistem ERP lama seperti SAP atau Oracle?',
      a: 'Ya, PalmVision AI dilengkapi dengan REST API Enterprise & Webhook Connector yang mendukung integrasi dua arah secara instan ke SAP S/4HANA, Oracle ERP, maupun Microsoft Dynamics.'
    },
    {
      q: 'Bagaimana jika area kebun perkebunan tidak memiliki sinyal internet (Blankspot)?',
      a: 'Aplikasi mobile Mandor & Pemanen menggunakan teknologi PWA Offline-First dengan penyimpanan terenkripsi lokal. Data hasil panen dan GIS akan otomatis tersinkronisasi saat perangkat mendeteksi sinyal internet atau WiFi kantor afdeling.'
    },
    {
      q: 'Berapa rata-rata Return on Investment (ROI) yang didapatkan oleh perusahaan sawit?',
      a: 'Berdasarkan data klien kami, efisiensi pendaftaran TBS, peningkatan OER PKS, serta optimalisasi alokasi pupuk menghasilkan ROI penuh dalam waktu 3.5 bulan setelah implementasi.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Luxury Floating Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-black text-slate-950 shadow-lg shadow-emerald-500/20">
            <Trees className="h-6 w-6 text-slate-950" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-tight block leading-tight">
              PalmVision <span className="text-emerald-400">AI™</span>
            </span>
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest block">
              Enterprise Palm Oil ERP
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#benefits" className="hover:text-emerald-400 transition text-emerald-400 font-bold">Manfaat Aplikasi</a>
          <a href="#features" className="hover:text-emerald-400 transition">Fitur Unggulan</a>
          <a href="#roi" className="hover:text-emerald-400 transition">Kalkulator ROI</a>
          <a href="#gis" className="hover:text-emerald-400 transition">GIS & Drone AI</a>
          <a href="#testimonials" className="hover:text-emerald-400 transition">Testimoni Klien</a>
          <a href="#faq" className="hover:text-emerald-400 transition">FAQ Enterprise</a>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onEnterAppDirectly}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-md"
          >
            <PlayCircle className="h-4 w-4 text-emerald-400" />
            <span className="hidden sm:inline">Demo Instant (Tanpa Login)</span>
            <span className="sm:hidden">Demo</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs transition shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
          >
            <Lock className="h-4 w-4 text-slate-950" />
            <span>Portal Enterprise Login</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Glowing Background FX */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-8">
          {/* Top High CTR Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-xl animate-pulse">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>PLATFORM INTELEJEN SAWIT NOMOR 1 DI INDONESIA & ASIA TENGGARA</span>
            <span className="bg-emerald-500 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black ml-1 uppercase">New v2.4</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-5xl mx-auto">
            Revolusi Inteligensi Sawit Indonesia dengan{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              PalmVision AI™
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Platform AI End-to-End Perkebunan & PKS Terpadu. Tingkatkan Rendemen OER hingga{' '}
            <strong className="text-emerald-400 font-extrabold">+18.4%</strong>, Eliminasi Kebocoran Tonase TBS, dan Pantau 100.000+ Hektar Kebun secara Real-Time via Satellite GIS & Drone Vision.
          </p>

          {/* High Conversion CTA Action Area */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onOpenLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>Akses Portal Enterprise ERP</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onEnterAppDirectly}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <PlayCircle className="h-5 w-5 text-emerald-400" />
              <span>Coba Demo Live (1-Click)</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>256-Bit SSL Enterprise Security</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Integrasi SAP / Oracle Instant</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Offline-First Mobile App Mandor</span>
            </span>
          </div>

          {/* Stat Ticker Banner */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur">
              <span className="text-2xl md:text-3xl font-black text-emerald-400 font-mono block">+18.4%</span>
              <span className="text-xs text-slate-400 font-semibold mt-1 block">Peningkatan OER PKS</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur">
              <span className="text-2xl md:text-3xl font-black text-teal-400 font-mono block">120.000+</span>
              <span className="text-xs text-slate-400 font-semibold mt-1 block">Hektar Kebun Live GIS</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur">
              <span className="text-2xl md:text-3xl font-black text-indigo-400 font-mono block">99.8%</span>
              <span className="text-xs text-slate-400 font-semibold mt-1 block">Akurasi Prediksi Panen</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur">
              <span className="text-2xl md:text-3xl font-black text-amber-400 font-mono block">Rp 42.8 M</span>
              <span className="text-xs text-slate-400 font-semibold mt-1 block">Total Penghematan Klien</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE BENEFITS SECTION */}
      <section id="benefits" className="py-20 bg-slate-900/60 border-t border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 uppercase tracking-widest inline-flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Manfaat Strategis untuk Perkebunan & PKS</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mengapa Perusahaan Perkebunan Kelapa Sawit Memilih PalmVision AI™?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              PalmVision AI menyatukan seluruh mata rantai bisnis dari lapangan (estate) hingga pabrik kelapa sawit (PKS) dan manajemen holding dalam satu platform inteligensi terpadu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Benefit Card 1 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 space-y-4 shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-mono font-black">
                  +1.8% OER BOOST
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">1. Peningkatan Rendemen OER PKS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Algoritma AI Vision melakukan grading otomatis tingkat kematangan TBS di loading ramp PKS. Mengeliminasi penerimaan buah mentah & tandan busuk, sehingga mendongkrak ekstraksi minyak CPO hingga <strong className="text-emerald-400">+1.8% s/d +2.5%</strong>.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-slate-300 border-t border-slate-800/80">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Grading Mutu TBS berbasis Foto AI Kamera Ramp</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Pengurangan Potongan Mutu Tidak Proporsional</li>
              </ul>
            </div>

            {/* Benefit Card 2 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 space-y-4 shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                  <Scale className="h-6 w-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-300 text-[10px] font-mono font-black">
                  ZERO FRAUD
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">2. Nol Kebocoran Timbangan & SPB TBS</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Integrasi sensor timbangan jembatan IoT, OCR Kamera Plat Nomor Truk, serta verifikasi Digital Surat Pengantar Buah (SPB) mencegah manipulasi tonase TBS di gerbang PKS secara total.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-slate-300 border-t border-slate-800/80">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Automatic Lock Weight tanpa Input Manual Operator</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> Deteksi Dini Selisih Berat Kebun vs Berat Timbangan PKS</li>
              </ul>
            </div>

            {/* Benefit Card 3 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all duration-300 space-y-4 shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                  <Cpu className="h-6 w-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-300 text-[10px] font-mono font-black">
                  -18% COST PUPUK
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">3. Efisiensi Biaya Pupuk & Presisi Agronomi</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pemetaan NDVI Drone & Satelit menganalisis kesehatan tajuk pohon sawit secara individu. Menghasilkan peta dosis pemupukan variabel yang menghemat pengeluaran pupuk kimia hingga <strong className="text-sky-400">18% per hektar</strong>.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-slate-300 border-t border-slate-800/80">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" /> Rekomendasi Dosis Pupuk Spesifik per Blok Kebun</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" /> Peringatan Serangan Hama Ulat Kantung & Ganoderma</li>
              </ul>
            </div>

            {/* Benefit Card 4 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 space-y-4 shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Radio className="h-6 w-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300 text-[10px] font-mono font-black">
                  BLANKSPOT PROOF
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">4. Aplikasi Mobile Mandor 100% Offline</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aplikasi PWA Mandor & Asisten Lapangan dirancang khusus untuk kondisi pedalaman tanpa sinyal seluler (blankspot). Data absensi, BJR, dan pancangan panen tersimpan aman di HP dan tersinkron otomatis saat ada jaringan.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-slate-300 border-t border-slate-800/80">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> Pencatatan Panen Cepat Tanpa Tergantung Koneksi</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> Perhitungan Premi Panen & Gaji Borongan Real-Time</li>
              </ul>
            </div>

            {/* Benefit Card 5 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 space-y-4 shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                  <FileCheck2 className="h-6 w-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-950 border border-purple-800 text-purple-300 text-[10px] font-mono font-black">
                  EUDR & RSPO READY
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">5. Sertifikasi EUDR & Keterlacakan Ekspor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fitur GIS Polygon Mapping otomatis menghasilkan data geopositioning sertifikasi bebas deforestasi sesuai standar EUDR Uni Eropa, RSPO, ISPO, serta ISCC untuk kemudahan audit ekspor CPO.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-slate-300 border-t border-slate-800/80">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Geo-Coordinates Polygon per Blok Kebun Petani & Inti</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> Laporan Audit Traceability Siap Unduh (Format GeoJSON/PDF)</li>
              </ul>
            </div>

            {/* Benefit Card 6 */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 space-y-4 shadow-xl hover:-translate-y-1 group">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-[10px] font-mono font-black">
                  EXECUTIVE C-LEVEL
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white">6. Dashboard Keuangan & C-Level Real-Time</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Konsolidasi laporan keuangan holding, HPP per kg CPO, arus kas (Cash Flow), serta evaluasi kinerja per kebun (estate) dalam satu tampilan dashboard BI yang diperbarui secara instan.
              </p>
              <ul className="space-y-1.5 pt-2 text-[11px] text-slate-300 border-t border-slate-800/80">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Laba Rugi (P&L) Real-Time per PT & Anak Perusahaan</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Asisten Virtual AI Gemini 3.6 untuk Analisis Kebijakan CEO</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE GRID */}
      <section id="features" className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-widest">
              Teknologi & Solusi Masa Depan
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ekosistem Terintegrasi untuk Seluruh Operasional Sawit
            </h2>
            <p className="text-sm text-slate-400">
              Dari pemetaan kanopi kebun, pemanenan afdeling, hingga timbangan PKS dan laporan keuangan holding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-4 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className={`text-xs font-mono font-bold ${item.metricColor}`}>
                        {item.metric}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      {item.tag}
                    </span>
                    <h3 className="text-base font-extrabold text-white leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  </div>

                  <button
                    onClick={onOpenLogin}
                    className="pt-4 border-t border-slate-800/80 text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Pelajari Selengkapnya</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LIVE INTERACTIVE ROI CALCULATOR WIDGET */}
      <section id="roi" className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-900">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-wider">
                  Simulasi Profitabilitas Kebun
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  Hitung Estimasi Peningkatan Profit Kebun Anda
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Geser luas hektar kebun Anda untuk melihat estimasi tambahan CPO dan potensi penghematan biaya.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-right">
                <span className="text-[10px] text-emerald-300 font-bold uppercase block">Estimasi Potensi Hemat / Thn</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">
                  Rp {formattedSavings} Miliar
                </span>
              </div>
            </div>

            {/* Interactive Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-300">Luas Perkebunan Kelapa Sawit:</span>
                <span className="text-emerald-400 font-mono text-base">{hectares.toLocaleString('id-ID')} Hektar</span>
              </div>

              <input
                type="range"
                min={1000}
                max={50000}
                step={1000}
                value={hectares}
                onChange={(e) => setHectares(Number(e.target.value))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />

              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1.000 Ha</span>
                <span>25.000 Ha</span>
                <span>50.000 Ha</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                <span className="text-[11px] text-slate-400 block">Tambahan Tonase CPO</span>
                <strong className="text-lg font-black text-white font-mono">{estimatedOerGainTon.toLocaleString('id-ID')} Ton CPO</strong>
                <span className="text-[10px] text-emerald-400 block">+1.8% Rendemen OER</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                <span className="text-[11px] text-slate-400 block">Penghematan Pupuk & BBM</span>
                <strong className="text-lg font-black text-white font-mono">Rp {(hectares * 1850000 / 1000000).toFixed(1)} Juta</strong>
                <span className="text-[10px] text-teal-400 block">Presisi Aplikasi Dosis AI</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-1">
                <span className="text-[11px] text-slate-400 block">Penghematan Zero Fraud</span>
                <strong className="text-lg font-black text-white font-mono">Rp {(hectares * 1000000 / 1000000).toFixed(1)} Juta</strong>
                <span className="text-[10px] text-indigo-400 block">Timbangan PKS AI Verified</span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={onOpenLogin}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Klaim Konsultasi & Demo Audit Kebun</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & CLIENT TRUST */}
      <section id="testimonials" className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 uppercase tracking-widest">
              Testimoni Klien Korporasi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dipercaya oleh Perusahaan Sawit Terkemuka
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Sparkles key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 italic leading-relaxed">"{t.comment}"</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-emerald-500/40" />
                  <div>
                    <h4 className="text-xs font-extrabold text-white">{t.name}</h4>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faq" className="py-20 bg-slate-900/50 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Pertanyaan Sering Diajukan (FAQ)</h2>
            <p className="text-xs text-slate-400">Segala hal yang perlu Anda ketahui mengenai implementasi PalmVision AI.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-5 text-left text-sm font-bold text-white flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/50 transition"
                >
                  <span>{f.q}</span>
                  <ChevronRight className={`h-5 w-5 text-emerald-400 transition-transform ${activeFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {activeFaq === i && (
                  <div className="p-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-900/40">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGH CTR BOTTOM CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-t border-emerald-500/30">
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Siap Melipatgandakan Efisiensi Perkebunan & PKS Anda?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            Bergabunglah dengan holding perkebunan kelapa sawit terdepan di Indonesia yang telah mengadopsi inteligencia buatan PalmVision AI.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenLogin}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base transition shadow-xl shadow-emerald-500/25 flex items-center gap-2 cursor-pointer"
            >
              <Lock className="h-5 w-5 text-slate-950" />
              <span>Akses Portal Login Enterprise</span>
            </button>

            <button
              onClick={onEnterAppDirectly}
              className="px-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-sm transition flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <PlayCircle className="h-5 w-5 text-emerald-400" />
              <span>Langsung Ke Aplikasi ERP</span>
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-xs text-slate-500 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Trees className="h-5 w-5 text-emerald-400" />
            <span className="font-bold text-white">PalmVision AI™ Enterprise Platform</span>
            <span>© 2026 PT Nusantara Palm Group Tbk. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">Kebijakan Privasi</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 font-normal">Syarat Ketentuan</a>
            <a href="#security" onClick={(e) => e.preventDefault()} className="hover:text-slate-300">ISO 27001 Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
