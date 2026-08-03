import React, { useState } from 'react';
import {
  FileCheck,
  UserCheck,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  Building2,
  Plus,
  Search,
  Filter,
  Check,
  X,
  FileText,
  Camera,
} from 'lucide-react';
import { AssetAssignment, AssetInspection, AssetItem } from '../types';

interface AssetAssignmentInspectionViewProps {
  assignments?: AssetAssignment[];
  inspections?: AssetInspection[];
  assets?: AssetItem[];
  onAddAssignment?: (assignment: AssetAssignment) => void;
  onAddInspection?: (inspection: AssetInspection) => void;
}

export const AssetAssignmentInspectionView: React.FC<AssetAssignmentInspectionViewProps> = ({
  assignments = [],
  inspections = [],
  assets = [],
  onAddAssignment = () => {},
  onAddInspection = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'assignments' | 'inspections'>('assignments');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showInspectModal, setShowInspectModal] = useState(false);

  // Form State for Assignment
  const [selectedAssetId, setSelectedAssetId] = useState(assets[0]?.id || '');
  const [assigneeName, setAssigneeName] = useState('');
  const [department, setDepartment] = useState('Civil & Heavy Equipment');
  const [estate, setEstate] = useState('Riau Mill & Estate');
  const [assignmentType, setAssignmentType] = useState<'Permanent' | 'Temporary'>('Permanent');
  const [notes, setNotes] = useState('');

  // Form State for Inspection
  const [inspAssetId, setInspAssetId] = useState(assets[0]?.id || '');
  const [inspectorName, setInspectorName] = useState('Hendra Setiawan (Mechanic)');
  const [inspType, setInspType] = useState<'Routine' | 'Pre-Operation' | 'Post-Operation' | 'Annual'>('Routine');
  const [overallCondition, setOverallCondition] = useState<'Excellent' | 'Good' | 'Fair' | 'Critical'>('Good');
  const [findings, setFindings] = useState('');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium');
  const [recommendation, setRecommendation] = useState('');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const targetAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];
    const newAsg: AssetAssignment = {
      id: `asg-${Date.now()}`,
      assetId: targetAsset?.id || 'ast-101',
      assetCode: targetAsset?.assetCode || 'AST-EXC-001',
      assetName: targetAsset?.assetName || 'Excavator CAT 320D2',
      assignedToType: 'Employee',
      assigneeName,
      department,
      estate,
      assignmentType,
      startDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      approvalStatus: 'Approved',
      notes,
    };

    onAddAssignment(newAsg);
    setShowAssignModal(false);
    setAssigneeName('');
    setNotes('');
  };

  const handleCreateInspection = (e: React.FormEvent) => {
    e.preventDefault();
    const targetAsset = assets.find((a) => a.id === inspAssetId) || assets[0];
    const newInsp: AssetInspection = {
      id: `insp-${Date.now()}`,
      inspectionCode: `INS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      assetId: targetAsset?.id || 'ast-101',
      assetCode: targetAsset?.assetCode || 'AST-EXC-001',
      assetName: targetAsset?.assetName || 'Excavator CAT 320D2',
      inspectorName,
      inspectionDate: new Date().toISOString().split('T')[0],
      type: inspType,
      overallCondition,
      checklist: [
        { id: 'ck-1', component: 'Kondisi Mesin & Oli', status: 'Pass', note: 'Normal' },
        { id: 'ck-2', component: 'Sistem Hidrolik & Selang', status: severity === 'High' ? 'Warning' : 'Pass' },
        { id: 'ck-3', component: 'Sistem Rem & Roda/Track', status: severity === 'Critical' ? 'Fail' : 'Pass' },
      ],
      findings,
      severity,
      recommendation,
      signedBy: inspectorName,
      status: severity === 'Critical' ? 'Action Required' : 'Approved',
    };

    onAddInspection(newInsp);
    setShowInspectModal(false);
    setFindings('');
    setRecommendation('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-emerald-400" /> Penugasan & Checklist Inspeksi Aset
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manajemen Penyerahan Aset, Riwayat Transfer, Penanggung Jawab & Routine Checklist Condition.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('assignments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'assignments' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Penugasan Aset ({assignments.length})
          </button>
          <button
            onClick={() => setActiveTab('inspections')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inspections' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Checklist Inspeksi ({inspections.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Assignments */}
      {activeTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-white">Daftar Penugasan Aset Aktif</span>
            <button
              onClick={() => setShowAssignModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" /> + Penugasan Aset Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400">{asg.assetCode}</span>
                    <h4 className="text-sm font-bold text-white mt-0.5">{asg.assetName}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {asg.assignmentType}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Penerima Tugas:</span>
                    <span className="font-bold text-white">{asg.assigneeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Departemen:</span>
                    <span className="text-slate-300">{asg.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Lokasi Kebun:</span>
                    <span className="text-teal-300 font-bold">{asg.estate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tanggal Mulai:</span>
                    <span className="font-mono text-slate-300">{asg.startDate}</span>
                  </div>
                </div>

                {asg.notes && <p className="text-[11px] text-slate-400 italic">"{asg.notes}"</p>}

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>Status Persetujuan:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> {asg.approvalStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Inspections */}
      {activeTab === 'inspections' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-white">Riwayat Inspeksi & Kondisi Fisik Unit</span>
            <button
              onClick={() => setShowInspectModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4" /> + Buat Laporan Inspeksi
            </button>
          </div>

          <div className="space-y-4">
            {inspections.map((insp) => (
              <div key={insp.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-400">{insp.inspectionCode}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                        {insp.type}
                      </span>
                      <span className="text-xs font-bold text-white">{insp.assetName} ({insp.assetCode})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Inspektur: <strong>{insp.inspectorName}</strong> • Tanggal: {insp.inspectionDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      insp.overallCondition === 'Critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      Kondisi: {insp.overallCondition}
                    </span>
                  </div>
                </div>

                {/* Checklist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {insp.checklist.map((item) => (
                    <div key={item.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">{item.component}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'Pass' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-amber-400 block">Temuan & Kerusakan:</span>
                  <p className="text-slate-300">{insp.findings}</p>
                  <span className="font-bold text-emerald-400 block pt-1">Rekomendasi Perbaikan:</span>
                  <p className="text-slate-300">{insp.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal New Assignment */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button onClick={() => setShowAssignModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-black text-white">Form Penugasan Aset Baru</h3>
            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Pilih Aset</label>
                <select
                  value={selectedAssetId}
                  onChange={(e) => setSelectedAssetId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.assetCode} - {a.assetName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Nama Penerima / Operator</label>
                <input
                  type="text"
                  required
                  value={assigneeName}
                  onChange={(e) => setAssigneeName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Catatan Penugasan</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Deskripsi tugas operasional..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white h-20"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowAssignModal(false)} className="w-full py-2 rounded-xl bg-slate-800 text-slate-300">
                  Batal
                </button>
                <button type="submit" className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                  Simpan Penugasan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal New Inspection */}
      {showInspectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button onClick={() => setShowInspectModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-base font-black text-white">Form Laporan Inspeksi Unit</h3>
            <form onSubmit={handleCreateInspection} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Pilih Aset</label>
                <select
                  value={inspAssetId}
                  onChange={(e) => setInspAssetId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.assetCode} - {a.assetName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Temuan & Hasil Pemeriksaan</label>
                <textarea
                  required
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  placeholder="Jelaskan temuan kondisi fisik unit..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white h-20"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Rekomendasi Tindakan</label>
                <input
                  type="text"
                  required
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  placeholder="Tindakan perbaikan yang disarankan..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setShowInspectModal(false)} className="w-full py-2 rounded-xl bg-slate-800 text-slate-300">
                  Batal
                </button>
                <button type="submit" className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
                  Simpan Laporan Inspeksi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
