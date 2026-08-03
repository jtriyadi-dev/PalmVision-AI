import React, { useState } from 'react';
import {
  Scan,
  Eye,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Camera,
  Layers,
  Search,
} from 'lucide-react';
import { INITIAL_VISION_OCR_LOGS } from '../mockData';

export const AiVisionOcrDocIntelView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'VISION' | 'OCR'>('VISION');
  const [analyzing, setAnalyzing] = useState(false);
  const [sampleResult, setSampleResult] = useState<string | null>(null);

  const handleSimulateScan = (type: string) => {
    setAnalyzing(true);
    setSampleResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      if (type === 'FRUIT') {
        setSampleResult(
          'Hasil Deteksi AI Computer Vision TBS (YOLOv8-Palm):\n- Total Janjang Terhitung: 92 Janjang\n- Matang Sempurna (Ripe): 82 Janjang (89.1%)\n- Biji Mentah (Unripe): 6 Janjang (6.5%)\n- Membusuk (Overripe): 4 Janjang (4.3%)\n- Estimasi Berat Netto: ~1,840 kg'
        );
      } else if (type === 'GANODERMA') {
        setSampleResult(
          'Hasil Analisis Penyakit Kelapa Sawit (ResNet50-Plant):\n- Gejala: Busuk Pangkal Batang (Ganoderma Boninense)\n- Tingkat Keparahan: Stadium 2 (Awal Infeksi Batang)\n- Rekomendasi Agronomi: Lakukan pembumbunan tanah & aplikasi Trichoderma SP di sekitar piringan pohon.'
        );
      } else {
        setSampleResult(
          'Hasil AI OCR Extraksi Nota Timbangan PKS (PaddleOCR-ID):\n- No Tiket: TMB-202608-099\n- Tanggal/Jam: 03-08-2026 08:34 WIB\n- No Polisi Truck: BM 8912 TU (Dump Truck ISUZU)\n- Berat Bruto: 24,150 kg | Tarra: 9,800 kg | Netto: 14,350 kg\n- Supplier: Afdeling 2 Kebun Sei Riau'
        );
      }
    }, 800);
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Scan className="w-5 h-5 text-emerald-400" />
            <span>AI Computer Vision, OCR & Document Intelligence Engine</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Pengenalan Otomatis Foto Janjang TBS, Deteksi Jamur Ganoderma, & Extraksi Data Nota Timbangan PKS / Invoice.
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('VISION')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'VISION' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI Computer Vision
          </button>
          <button
            onClick={() => setActiveTab('OCR')}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'OCR' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            AI OCR & Doc Intel
          </button>
        </div>
      </div>

      {/* Interactive Scanner Playground */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upload & Controls */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>{activeTab === 'VISION' ? 'Upload Foto TBS / Pohon' : 'Upload Dokumen Nota / Invoice'}</span>
          </h3>

          <div className="border-2 border-dashed border-slate-800 rounded-2xl p-6 text-center space-y-3 bg-slate-950/50 hover:border-emerald-700 transition-colors">
            <Upload className="w-8 h-8 text-slate-500 mx-auto" />
            <div className="space-y-1">
              <p className="font-bold text-slate-300">Drag & Drop foto atau klik untuk memilih file</p>
              <p className="text-[10px] text-slate-500">Mendukung Format JPG, PNG, PDF, TIFF hingga 25MB</p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-2">
              {activeTab === 'VISION' ? (
                <>
                  <button
                    onClick={() => handleSimulateScan('FRUIT')}
                    disabled={analyzing}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                  >
                    Simulasi Hitung Janjang TBS
                  </button>
                  <button
                    onClick={() => handleSimulateScan('GANODERMA')}
                    disabled={analyzing}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold cursor-pointer"
                  >
                    Simulasi Deteksi Ganoderma
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleSimulateScan('OCR_TICKET')}
                  disabled={analyzing}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  Simulasi Extraksi Nota Timbangan PKS
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Scan Results Output */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-emerald-400 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Hasil Analisis AI Intelligence</span>
            </span>
            {analyzing && <span className="text-amber-400 animate-pulse text-[10px]">Memproses AI Vision...</span>}
          </div>

          {sampleResult ? (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed whitespace-pre-line text-xs font-sans">
              {sampleResult}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Scan className="w-8 h-8 mx-auto text-slate-600" />
              <p>Pilih salah satu tombol simulasi scan di sebelah kiri untuk melihat hasil ekstraksi data AI.</p>
            </div>
          )}
        </div>
      </div>

      {/* Processed Log Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-400" />
          <span>Riwayat Pemrosesan AI Vision & OCR Log</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2.5 px-3">LOG NO</th>
                <th className="py-2.5 px-3">TIPE DETEKSI</th>
                <th className="py-2.5 px-3">NAMA FILE</th>
                <th className="py-2.5 px-3">HASIL EKSTRAKSI</th>
                <th className="py-2.5 px-3">CONFIDENCE</th>
                <th className="py-2.5 px-3">PROCESSED AT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {INITIAL_VISION_OCR_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-950/50">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">{log.logNo}</td>
                  <td className="py-2.5 px-3">{log.type}</td>
                  <td className="py-2.5 px-3 text-slate-400">{log.sourceFile}</td>
                  <td className="py-2.5 px-3 max-w-xs truncate font-sans">{log.detectedResult}</td>
                  <td className="py-2.5 px-3 font-bold text-cyan-400">{log.confidenceScorePercent}%</td>
                  <td className="py-2.5 px-3 text-slate-400">{log.processedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
