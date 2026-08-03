import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  LayoutGrid,
  TrendingUp,
  FileSpreadsheet,
  Users,
  Wrench,
  Compass,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export const AiCopilotModuleView: React.FC = () => {
  const [activeModuleContext, setActiveModuleContext] = useState<string>('harvest');
  const [copilotResponse, setCopilotResponse] = useState<string | null>(null);

  const modules = [
    { id: 'harvest', label: 'Harvest & Mill Management', icon: TrendingUp },
    { id: 'finance', label: 'Finance & Accounting', icon: FileSpreadsheet },
    { id: 'hrm', label: 'Human Resource & Payroll', icon: Users },
    { id: 'inventory', label: 'Inventory & Procurement', icon: LayoutGrid },
    { id: 'eam', label: 'Enterprise Asset Management', icon: Wrench },
    { id: 'gis', label: 'GIS & Field Mapping', icon: Compass },
  ];

  const copilotActions: Record<string, { prompt: string; result: string }[]> = {
    harvest: [
      {
        prompt: 'Analisis Tonase TBS Panen & Kerugian Restan Afdeling 2',
        result: 'AI Copilot Context Harvest:\n- Tonase Panen Afdeling 2: 420 Ton TBS.\n- Restan TBS di Piringan: 3.2 Ton (Di atas toleransi 1.5%).\n- Solusi: Alokasikan 2 Dump Truck tambahan dari Workshop jam 13:00.',
      },
      {
        prompt: 'Evaluasi Rendemen Minyak Sawit (KER/OER) Mill PKS',
        result: 'AI Copilot Context Mill:\n- OER Actual: 22.8% (Target 23.0%).\n- Faktor Penyebab: Kadar biji mentah (Unripe) dari Afdeling 4 mencapai 4.5%.\n- Copilot Rekomendasi: Terbitkan Surat Teguran ke Mandor Panen Afdeling 4.',
      },
    ],
    finance: [
      {
        prompt: 'Deteksi Anomali Pengeluaran Kas Operasional PKS',
        result: 'AI Copilot Context Finance:\n- Anomali terdeteksi: Pembelian Sparepart Pump PKS sebesar Rp 45,000,000 tanpa PO tertulis.\n- Tindakan: Tahan pencairan voucher kas sebelum persetujuan Head CFO.',
      },
      {
        prompt: 'Simulasi Dampak Kenaikan Harga Solar Terhadap HPP',
        result: 'AI Copilot Context Financial Modeling:\n- Kenaikan Solar B35 +5% akan menaikkan HPP Transport Panen sebesar Rp 4,200 / Ton TBS.\n- Rekomendasi: Lakukan hedging kontrak solar dengan Pertamina.',
      },
    ],
    hrm: [
      {
        prompt: 'Analisis Turn Over Tenaga Kerja BHL & Lembur Mandor',
        result: 'AI Copilot Context HR:\n- Jam lembur Mandor Panen Afdeling 1 melebihi kuota 40 jam/bulan (+18%).\n- Penyebab: Kurang 6 Bemanen BHL di blok B8-B10.',
      },
    ],
    inventory: [
      {
        prompt: 'Rekomendasi Reorder Point Pupuk NPK & Solar B35',
        result: 'AI Copilot Context Procurement:\n- Stock NPK: 4,200 kg (Minimum Reorder 5,000 kg).\n- Action: Buat Purchase Requisition (PR) otomatis untuk 20 Ton NPK 13-6-27.',
      },
    ],
    eam: [
      {
        prompt: 'Prediksi Kerusakan Hydraulic Cylinder Excavator EXC-01',
        result: 'AI Copilot Context EAM:\n- Prediksi Breakdown: 30 jam HM mendatang.\n- Suku cadang O-ring Kit tersedia di Gudang Workshop 1.\n- Copilot Action: Otomatis buat Work Order Maintenance #WO-2026-890.',
      },
    ],
    gis: [
      {
        prompt: 'Analisis NDVI Defisit Air & Ganoderma via Satelit',
        result: 'AI Copilot Context GIS:\n- Citra Satelit Sentinel-2: Blok C4 mengalami penurunan indeks vegetasi NDVI (-12%).\n- Terindikasi stres air ringan. Jadwalkan perbaikan parit drainase.',
      },
    ],
  };

  const currentActions = copilotActions[activeModuleContext] || copilotActions.harvest;

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PalmVision Enterprise AI Copilot</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">
            AI Copilot Integration & Page Context Engine
          </h2>
          <p className="text-slate-400 text-xs">
            Asisten AI cerdas yang secara otomatis menyesuaikan konteks analisis berdasarkan halaman ERP tempat Anda bekerja.
          </p>
        </div>
      </div>

      {/* Module Context Selector */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {modules.map((m) => {
          const Icon = m.icon;
          const isActive = activeModuleContext === m.id;
          return (
            <button
              key={m.id}
              onClick={() => {
                setActiveModuleContext(m.id);
                setCopilotResponse(null);
              }}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between space-y-2 cursor-pointer transition-all ${
                isActive
                  ? 'bg-emerald-950 border-emerald-700 text-white shadow-lg'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-between items-center">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
              <span className="font-bold text-xs leading-tight">{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Copilot Playground */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Suggested Actions for Selected Context */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Aksi Copilot Kontekstual ({activeModuleContext.toUpperCase()})</span>
          </h3>

          <div className="space-y-2">
            {currentActions.map((act, idx) => (
              <button
                key={idx}
                onClick={() => setCopilotResponse(act.result)}
                className="w-full text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800/80 text-white font-bold flex items-center justify-between group transition-all cursor-pointer"
              >
                <span>{act.prompt}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Output Console */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-emerald-400 flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span>Analisis Real-Time AI Copilot</span>
            </span>
            <span className="text-[10px] text-slate-500">Context: {activeModuleContext}</span>
          </div>

          {copilotResponse ? (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line text-xs font-sans">
              {copilotResponse}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Bot className="w-8 h-8 mx-auto text-slate-600" />
              <p>Pilih salah satu prompt aksi Copilot di sebelah kiri untuk melihat hasil analisis otomatis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
