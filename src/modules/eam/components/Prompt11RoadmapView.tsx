import React from 'react';
import {
  Users,
  Award,
  Calendar,
  Clock,
  DollarSign,
  UserCheck,
  BookOpen,
  UserPlus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const Prompt11RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/80 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Pratinjau Prompt 11
            </span>
            <span className="text-xs text-slate-400">Generasi Modul Berikutnya</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Human Resource Management (HRM) & Workforce Intelligence <Users className="h-6 w-6 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Modul pengolahan SDM perkebunan kelapa sawit terpadu: Data Pegawai/Karyawan Lapangan (BHL/SKU), Absensi Fingerprint/Biometrik GPS, Penggajian Payroll Sawit, Rotasi Shift & AI Workforce Productivity.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-800/50 text-right">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Status Kesiapan</span>
          <span className="text-xs font-black text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
            <CheckCircle2 className="h-4 w-4" /> Ready for Prompt 11
          </span>
        </div>
      </div>

      {/* Grid of Planned Modules in Prompt 11 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">1. Master Data Karyawan Perkebunan</h3>
          <p className="text-xs text-slate-400">
            Database Karyawan Tetap (SKU-H/SKU-A), Pekerja Harian Lepas (BHL), Kontraktor, Jabatan, Afdeling & Berkas Legal (KTP, BPJS, NPWP, Kontrak).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Clock className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">2. Absensi Biometrik & GPS Mobile</h3>
          <p className="text-xs text-slate-400">
            Pencatatan Kehadiran Mandor & Pemanen di Kemang/Mancor via Face Recognition, Geofencing Lokasi Blok & Integrasi Mesin Fingerprint Pabrik.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <DollarSign className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">3. Payroll & Premia Pemanen Sawit</h3>
          <p className="text-xs text-slate-400">
            Kalkulasi Gaji Pokok, Premi Basis Panen (TBS), Premi Kerajinan, Lembur Kebun, Tunjangan Natura (Beras/Minyak), PPh 21 & BPJS Ketenagakerjaan.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Calendar className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">4. Penjadwalan Shift & Cuti Kebun</h3>
          <p className="text-xs text-slate-400">
            Pengaturan Shift Pabrik Kelapa Sawit (PKS) 24/7, Permohonan Cuti Tahunan, Cuti Melahirkan, Izin Sakit & Kebijakan Rotasi Lapangan.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">5. Pelatihan K3 & Sertifikasi Sawit</h3>
          <p className="text-xs text-slate-400">
            Tracking Pelatihan Keselamatan Kerja (K3), Sertifikasi ISPO/RSPO, Operator Alat Berat (SIO) & Lisensi Penggunaan Bahan Kimia.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
            <Sparkles className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-white">6. AI Workforce Productivity Analytics</h3>
          <p className="text-xs text-slate-400">
            Analisis AI untuk rasio produktivitas pemanen per hektar, deteksi turnover karyawan, peramalan kebutuhan tenaga kerja panen puncak & evaluasi kinerja Mandor.
          </p>
        </div>
      </div>
    </div>
  );
};
