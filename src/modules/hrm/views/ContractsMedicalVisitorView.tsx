import React, { useState } from 'react';
import {
  FileCheck,
  Activity,
  UserCheck,
  Shirt,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Plus,
  QrCode,
} from 'lucide-react';
import {
  INITIAL_CONTRACTS,
  INITIAL_MEDICAL_RECORDS,
  INITIAL_VISITORS,
  INITIAL_UNIFORMS,
} from '../mockData';

export const ContractsMedicalVisitorView: React.FC = () => {
  const [contracts] = useState(INITIAL_CONTRACTS);
  const [medicals] = useState(INITIAL_MEDICAL_RECORDS);
  const [visitors] = useState(INITIAL_VISITORS);
  const [uniforms] = useState(INITIAL_UNIFORMS);
  const [activeTab, setActiveTab] = useState<'CONTRACTS' | 'MCU' | 'VISITORS' | 'UNIFORMS'>('CONTRACTS');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            <span>Manajemen Kontrak PKWT, MCU, Tamu & Seragam APD K3</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitoring Masa Berlaku Kontrak Kerja, Riwayat MCU Klinik Estate, Buku Tamu QR Code & Distribusi Boots/Helm Safety
          </p>
        </div>

        <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('CONTRACTS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'CONTRACTS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Kontrak PKWT ({contracts.length})
          </button>
          <button
            onClick={() => setActiveTab('MCU')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'MCU' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Medical Checkup MCU
          </button>
          <button
            onClick={() => setActiveTab('VISITORS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'VISITORS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Visitor QR Badge
          </button>
          <button
            onClick={() => setActiveTab('UNIFORMS')}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === 'UNIFORMS' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Seragam & APD K3
          </button>
        </div>
      </div>

      {/* CONTRACTS TAB */}
      {activeTab === 'CONTRACTS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">Monitoring Masa Berakhir Kontrak Kerja PKWT (Automatic Warning)</span>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
              {contracts.map((cnt) => (
                <div key={cnt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{cnt.employeeName}</h4>
                    <p className="text-slate-400">Jenis: {cnt.contractType.replace('_', ' ')}</p>
                    <p className="text-slate-500 text-[11px]">Periode: {cnt.startDate} s/d {cnt.endDate}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold px-3 py-1 rounded bg-amber-950 text-amber-400 border border-amber-800 inline-block mb-1">
                      SISA {cnt.daysToExpiry} HARI KERJA
                    </span>
                    <button
                      onClick={() => alert(`Sistem Perpanjangan Kontrak ${cnt.employeeName} Diproses`)}
                      className="block text-emerald-400 font-bold hover:underline text-[11px] cursor-pointer"
                    >
                      Proses Perpanjangan Kontrak →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MCU TAB */}
      {activeTab === 'MCU' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">Riwayat Medical Checkup MCU Operator Boiler & Pemanen</span>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
              {medicals.map((mcu) => (
                <div key={mcu.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{mcu.employeeName}</h4>
                    <p className="text-slate-400">{mcu.position} • Tanggal MCU: {mcu.mcuDate}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      STATUS: {mcu.healthResult}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1">MCU Berikutnya: {mcu.nextMcuDueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VISITORS TAB */}
      {activeTab === 'VISITORS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300">Buku Tamu Digital & Verification QR Badge</span>
              <button
                onClick={() => alert('Form Register Tamu Baru SIAP')}
                className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 cursor-pointer"
              >
                + Register Tamu
              </button>
            </div>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
              {visitors.map((vis) => (
                <div key={vis.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{vis.visitorName}</span>
                      <span className="font-mono text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-bold">
                        {vis.qrBadgeCode}
                      </span>
                    </div>
                    <p className="text-slate-400">{vis.companyOrigin} • Host: {vis.hostEmployeeName}</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">{vis.purpose}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">{vis.checkInTime}</span>
                    <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                      CHECKED IN
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* UNIFORMS TAB */}
      {activeTab === 'UNIFORMS' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-300 block">Distribusi APD K3, Boots Safety & Seragam Kebun</span>

            <div className="divide-y divide-slate-800 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden text-xs">
              {uniforms.map((unf) => (
                <div key={unf.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="font-extrabold text-white text-sm">{unf.employeeName}</h4>
                    <p className="text-emerald-400 font-bold">{unf.itemType.replace('_', ' ')} (Ukuran: {unf.size})</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white text-sm block">{unf.quantity} Set</span>
                    <span className="text-[10px] text-slate-500">Diserahkan: {unf.distributedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
