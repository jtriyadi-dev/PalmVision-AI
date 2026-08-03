import React, { useState } from 'react';
import {
  Smartphone,
  Camera,
  MapPin,
  CheckCircle2,
  Plus,
  Scale,
  Sparkles,
  Zap,
} from 'lucide-react';

import { HarvestExecutionRecord } from '../types';

interface HarvestExecutionViewProps {
  executions: HarvestExecutionRecord[];
  onAddExecution: (execution: HarvestExecutionRecord) => void;
}

export const HarvestExecutionView: React.FC<HarvestExecutionViewProps> = ({
  executions,
  onAddExecution,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Form input state
  const [estateName, setEstateName] = useState('Nusa Indah Estate');
  const [afdelingName, setAfdelingName] = useState('Afdeling A');
  const [blockCode, setBlockCode] = useState('BLK-A12');
  const [teamName, setTeamName] = useState('Regu Panen Harimau 1');
  const [harvesterName, setHarvesterName] = useState('Sugianto (Pemanen 04)');
  const [ancakNo, setAncakNo] = useState('Ancak #10');
  const [bunchesCount, setBunchesCount] = useState(150);
  const [estimatedBjr, setEstimatedBjr] = useState(18.0);
  const [looseFruitKg, setLooseFruitKg] = useState(110);
  const [qualityGrade, setQualityGrade] = useState<'A (Mature)' | 'B (Under-ripe)' | 'C (Over-ripe)' | 'D (Empty/Rotted)'>('A (Mature)');
  const [notes, setNotes] = useState('Panen bersih, brondolan terkutip sempurna');

  const calculatedWeight = Math.round(bunchesCount * estimatedBjr);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExec: HarvestExecutionRecord = {
      id: `he-${Date.now()}`,
      executionCode: `HEX-${Math.floor(88000 + Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      companyName: 'PT Sawit Nusantara Mandiri',
      estateName,
      divisionName: 'Division 1 - Agronomi',
      afdelingName,
      blockCode,
      teamName,
      harvesterName,
      ancakNo,
      bunchesCount,
      estimatedWeightKg: calculatedWeight,
      calculatedBjrKg: estimatedBjr,
      looseFruitKg,
      qualityGrade,
      photoUrl: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80',
      gpsLat: 2.9102,
      gpsLng: 99.1234,
      notes,
    };
    onAddExecution(newExec);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Harvest Execution & Field Quick Input
          </h2>
          <p className="text-xs text-slate-500">
            Form pencatatan hasil panen harian pemanen & mandor dengan validasi GPS dan foto geo-tag
          </p>
        </div>

        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Zap className="h-4 w-4" />
          <span>{isFormOpen ? 'Tutup Quick Input' : 'Input Hasil Panen'}</span>
        </button>
      </div>

      {/* Quick Input Form Box */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-4 animate-scaleIn"
        >
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
            <h3 className="font-extrabold text-sm text-emerald-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Quick Mobile Input Panen (Mandor Field App)
            </h3>
            <span className="text-[10px] bg-emerald-900/60 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-700/50">
              GPS Tagged: 2.9102, 99.1234
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Blok & Afdeling</label>
              <input
                type="text"
                required
                value={blockCode}
                onChange={(e) => setBlockCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Pemanen & Namun</label>
              <input
                type="text"
                required
                value={harvesterName}
                onChange={(e) => setHarvesterName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Nomor Ancak Panen</label>
              <input
                type="text"
                required
                value={ancakNo}
                onChange={(e) => setAncakNo(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Jumlah Tandan (Janjang)</label>
              <input
                type="number"
                required
                value={bunchesCount}
                onChange={(e) => setBunchesCount(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-black text-sm text-emerald-400"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">BJR Standar (Kg)</label>
              <input
                type="number"
                step="0.1"
                required
                value={estimatedBjr}
                onChange={(e) => setEstimatedBjr(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-bold mb-1">Brondolan (Kg)</label>
              <input
                type="number"
                required
                value={looseFruitKg}
                onChange={(e) => setLooseFruitKg(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-bold">Kalkulasi Otomatis Berat Estimasi:</span>
            <span className="text-sm font-black text-emerald-400">
              {calculatedWeight.toLocaleString('id-ID')} Kg ({ (calculatedWeight / 1000).toFixed(2) } Ton)
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="h-4 w-4" />
              Simpan Record Execution
            </button>
          </div>
        </form>
      )}

      {/* Execution Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {executions.map((e) => (
          <div
            key={e.id}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                {e.executionCode}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{e.time}</span>
            </div>

            {e.photoUrl && (
              <div className="relative h-32 rounded-xl overflow-hidden group">
                <img src={e.photoUrl} alt="Execution" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                  <span className="text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> GPS: {e.gpsLat}, {e.gpsLng}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Blok & Ancak:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {e.blockCode} ({e.ancakNo})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pemanen:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{e.harvesterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hasil Janjang:</span>
                <span className="font-black text-slate-900 dark:text-white">{e.bunchesCount} Janjang</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimasi Berat & BJR:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {e.estimatedWeightKg.toLocaleString('id-ID')} Kg ({e.calculatedBjrKg} Kg/Janjang)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Brondolan Terkutip:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{e.looseFruitKg} Kg</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 italic bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl">
              "{e.notes}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
