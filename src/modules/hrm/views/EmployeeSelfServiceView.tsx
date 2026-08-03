import React, { useState } from 'react';
import {
  Smartphone,
  Camera,
  MapPin,
  Clock,
  Download,
  Calendar,
  CreditCard,
  User,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Bell,
  Sparkles,
} from 'lucide-react';
import { INITIAL_EMPLOYEES, INITIAL_PAYSLIPS } from '../mockData';

export const EmployeeSelfServiceView: React.FC = () => {
  const employee = INITIAL_EMPLOYEES[0]; // Budi Santoso
  const payslip = INITIAL_PAYSLIPS[0];
  const [clockedIn, setClockedIn] = useState(true);
  const [activeEssTab, setActiveEssTab] = useState<'HOME' | 'ATTENDANCE' | 'PAYSLIP' | 'LEAVE' | 'IDCARD'>('HOME');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* ESS Top Header */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center font-black text-white shadow-lg text-lg">
            ESS
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
              Employee Self Service (ESS) Mobile Portal
            </span>
            <h2 className="text-xl font-black text-white">Selamat Datang, {employee.name}</h2>
            <p className="text-xs text-slate-300">{employee.positionTitle} • {employee.estateName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-emerald-400">
            {employee.employeeId}
          </span>
        </div>
      </div>

      {/* ESS Navigation Tabs (Mobile-Friendly Pill Bar) */}
      <div className="flex items-center justify-between gap-1 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveEssTab('HOME')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap text-center ${
            activeEssTab === 'HOME' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Beranda ESS
        </button>
        <button
          onClick={() => setActiveEssTab('ATTENDANCE')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap text-center ${
            activeEssTab === 'ATTENDANCE' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Absensi Kamera
        </button>
        <button
          onClick={() => setActiveEssTab('PAYSLIP')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap text-center ${
            activeEssTab === 'PAYSLIP' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Slip Gaji
        </button>
        <button
          onClick={() => setActiveEssTab('LEAVE')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap text-center ${
            activeEssTab === 'LEAVE' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Ajukan Cuti
        </button>
        <button
          onClick={() => setActiveEssTab('IDCARD')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer whitespace-nowrap text-center ${
            activeEssTab === 'IDCARD' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Digital ID
        </button>
      </div>

      {/* HOME TAB */}
      {activeEssTab === 'HOME' && (
        <div className="space-y-6">
          {/* Quick Attendance Widget */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Presensi Masuk / Pulang Hari Ini</span>
              </span>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2.5 py-0.5 rounded border border-emerald-800 font-bold">
                Afdeling I Sei Riau Tag
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-slate-400 block">Status Absen Anda:</span>
                <span className="text-lg font-black text-emerald-400 block">
                  {clockedIn ? 'MASUK PUKUL 05:48 WIB' : 'BELUM PRESENSI'}
                </span>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 justify-center sm:justify-start">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>TPH 12 Afdeling I (Lat: 0.5071, Lng: 101.4478)</span>
                </p>
              </div>

              <button
                onClick={() => setClockedIn(!clockedIn)}
                className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer transition-all ${
                  clockedIn
                    ? 'bg-rose-600 hover:bg-rose-500 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{clockedIn ? 'Clock Out (Pulang)' : 'Clock In (Kamera Selfie)'}</span>
              </button>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <button
              onClick={() => setActiveEssTab('PAYSLIP')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 space-y-2 text-left cursor-pointer transition-all"
            >
              <CreditCard className="w-5 h-5 text-emerald-400" />
              <span className="font-bold text-white block">Lihat Slip Gaji</span>
              <span className="text-[10px] text-slate-400 block">THP Juli 2026: Rp 7.20 Jt</span>
            </button>

            <button
              onClick={() => setActiveEssTab('LEAVE')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 space-y-2 text-left cursor-pointer transition-all"
            >
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white block">Sisa Cuti Tahunan</span>
              <span className="text-[10px] text-cyan-300 block">Sisa 8 Hari Hak Cuti</span>
            </button>

            <button
              onClick={() => setActiveEssTab('IDCARD')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 space-y-2 text-left cursor-pointer transition-all"
            >
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="font-bold text-white block">Kartu BPJS Digital</span>
              <span className="text-[10px] text-amber-300 block">Kes & Ketenagakerjaan</span>
            </button>
          </div>
        </div>
      )}

      {/* ATTENDANCE CAMERA TAB */}
      {activeEssTab === 'ATTENDANCE' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
          <div className="w-full max-w-sm mx-auto h-64 rounded-2xl bg-slate-950 border-2 border-dashed border-emerald-500/50 flex flex-col items-center justify-center p-4 space-y-3">
            <Camera className="w-12 h-12 text-emerald-400 animate-pulse" />
            <p className="text-xs text-slate-300 font-bold">Simulator Kamera Selfie Biometrik ESS</p>
            <p className="text-[11px] text-slate-500">Deteksi Wajah Face Recognition & Tagging Lokasi GPS Kebun</p>
          </div>

          <button
            onClick={() => {
              setClockedIn(true);
              alert('Presensi Berhasil Diverifikasi!');
            }}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-lg"
          >
            Ambil Foto & Verifikasi Presensi
          </button>
        </div>
      )}

      {/* PAYSLIP TAB */}
      {activeEssTab === 'PAYSLIP' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-extrabold text-white text-base">Slip Gaji Elektronik ESS</h3>
              <p className="text-slate-400 text-[11px]">Periode Juli 2026 • Mandiri Direct Transfer</p>
            </div>
            <button
              onClick={() => alert('PDF Slip Gaji Terunduh')}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono">
            <div className="flex justify-between"><span>Gaji Pokok:</span><span className="text-white">Rp {payslip.basicSalary.toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between"><span>Premi Panen TBS:</span><span className="text-emerald-400 font-bold">Rp {payslip.harvestIncentivePremi.toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between"><span>Tunjangan:</span><span className="text-white">Rp {payslip.allowances.toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between text-rose-400"><span>Potongan BPJS & Tax:</span><span>- Rp {payslip.totalDeductions.toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-emerald-400 text-sm">
              <span>Nett THP Diterima:</span><span>Rp {payslip.nettSalary.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      )}

      {/* LEAVE FORM TAB */}
      {activeEssTab === 'LEAVE' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="font-extrabold text-white text-base">Form Pengajuan Cuti Mandiri</h3>

          <div className="space-y-3">
            <div>
              <label className="text-slate-400 block mb-1 font-medium">Jenis Cuti</label>
              <select className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none">
                <option>Cuti Tahunan (Sisa 8 Hari)</option>
                <option>Cuti Sakit (Lampiran Klinik)</option>
                <option>Cuti Melahirkan / Duka</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Mulai Tanggal</label>
                <input type="date" className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white" />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Sampai Tanggal</label>
                <input type="date" className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white" />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1 font-medium">Alasan Cuti</label>
              <textarea placeholder="Tuliskan keperluan pengajuan cuti..." className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white h-20" />
            </div>

            <button
              onClick={() => alert('Pengajuan Cuti Terkirim ke Supervisor Mandor')}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
            >
              Kirim Permohonan Cuti
            </button>
          </div>
        </div>
      )}

      {/* DIGITAL ID CARD TAB */}
      {activeEssTab === 'IDCARD' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-center">
          <div className="w-full max-w-sm mx-auto p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 border border-emerald-800 shadow-2xl text-left space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-black text-white text-base">PALMVISION AI ID</h4>
                <p className="text-[10px] text-emerald-400 font-bold">PT NUSANTARA PALM LESTARI</p>
              </div>
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>

            <div className="flex gap-3 items-center">
              <img
                src={employee.photoUrl}
                alt={employee.name}
                className="w-16 h-16 rounded-xl object-cover border border-emerald-500/50"
              />
              <div className="text-xs">
                <span className="font-extrabold text-white block">{employee.name}</span>
                <span className="text-emerald-300 font-bold block">{employee.positionTitle}</span>
                <span className="text-[10px] text-slate-400 block">ID: {employee.employeeId}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 space-y-0.5">
              <p>NIK: 140102**********</p>
              <p>BPJS Kes: {employee.bpjsKesehatan}</p>
              <p>BPJS TK: {employee.bpjsKetenagakerjaan}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
