import React, { useState } from 'react';
import {
  TrendingUp,
  FileText,
  Volume2,
  Video,
  Image as ImageIcon,
  FileCheck,
  Search,
  Plus,
  Calendar,
  User,
  CheckCircle2,
  Tag,
  Play,
  Pause,
} from 'lucide-react';
import { GrowthMonitoringRecord, AgronomyNote } from '../types';

interface GrowthAgronomyViewProps {
  growthRecords: GrowthMonitoringRecord[];
  agronomyNotes: AgronomyNote[];
  activeSubTab: string;
}

export const GrowthAgronomyView: React.FC<GrowthAgronomyViewProps> = ({
  growthRecords,
  agronomyNotes,
  activeSubTab,
}) => {
  const [subTab, setSubTab] = useState<'growth' | 'notes'>(
    activeSubTab === 'agronomy-notes' ? 'notes' : 'growth'
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const filteredGrowth = growthRecords.filter(
    (g) =>
      g.monitoringCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.treeSampleCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNotes = agronomyNotes.filter(
    (n) =>
      n.noteCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.blockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSubTab('growth')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'growth'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Growth Monitoring ({growthRecords.length})
          </button>
          <button
            onClick={() => setSubTab('notes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              subTab === 'notes'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            Catatan Agronomi ({agronomyNotes.length})
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari sampel/pohon/catatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <button
            onClick={() => alert('Form Observasi / Catatan Siap')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Catatan</span>
          </button>
        </div>
      </div>

      {/* SUB TAB 1: GROWTH MONITORING */}
      {subTab === 'growth' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGrowth.map((gm) => (
            <div
              key={gm.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                      {gm.monitoringCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold">
                      {gm.blockCode}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">
                    Sampel Pohon: {gm.treeSampleCode}
                  </h3>
                  <p className="text-xs text-slate-400">Tanggal Observasi: {gm.observationDate}</p>
                </div>

                <img
                  src={gm.photoUrl}
                  alt={gm.treeSampleCode}
                  className="w-18 h-18 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                />
              </div>

              {/* Growth Parameters */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                  <span className="text-slate-400 block text-[10px]">Tinggi Pohon</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {gm.heightCm} <span className="text-[10px] font-normal">cm</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                  <span className="text-slate-400 block text-[10px]">Diameter Batang</span>
                  <span className="font-black text-teal-600 dark:text-teal-400 text-sm">
                    {gm.stemDiameterCm} <span className="text-[10px] font-normal">cm</span>
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center">
                  <span className="text-slate-400 block text-[10px]">Jumlah Pelepah</span>
                  <span className="font-black text-indigo-600 dark:text-indigo-400 text-sm">
                    {gm.frondCount} <span className="text-[10px] font-normal">Pelepah</span>
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">Kondisi Daun:</span> {gm.leafCondition}
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <span className="font-bold text-slate-900 dark:text-white">Kondisi Batang:</span> {gm.stemCondition}
                </p>
                <p className="text-slate-500 italic mt-1">{gm.notes}</p>
              </div>

              <div className="text-[11px] text-slate-400 pt-1">Surveyor: {gm.surveyorName}</div>
            </div>
          ))}
        </div>
      )}

      {/* SUB TAB 2: AGRONOMY NOTES */}
      {subTab === 'notes' && (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-extrabold">
                    {note.noteCode}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                    Blok {note.blockCode}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                    Format: {note.noteType}
                  </span>
                </div>
                <span className="text-xs text-slate-400">{note.noteDate}</span>
              </div>

              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {note.content}
              </p>

              {/* Media Attachment Render */}
              {note.noteType === 'Voice Memo (Audio)' && (
                <div className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setPlayingAudioId(playingAudioId === note.id ? null : note.id)
                      }
                      className="p-2 rounded-full bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                    >
                      {playingAudioId === note.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                    <div>
                      <span className="font-bold text-emerald-300 block">Voice Note Agronomis</span>
                      <span className="text-[10px] text-slate-400">
                        Durasi: {note.audioDurationSec} Detik • Audioplayer Placeholder
                      </span>
                    </div>
                  </div>
                  <Volume2 className="h-5 w-5 text-emerald-400 animate-pulse" />
                </div>
              )}

              {note.mediaUrl && note.noteType === 'Foto' && (
                <img
                  src={note.mediaUrl}
                  alt={note.noteCode}
                  className="w-full h-48 rounded-xl object-cover border border-slate-200 dark:border-slate-800"
                />
              )}

              {/* Tags & Author */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <span className="text-slate-500 text-[11px]">
                  Penulis: <span className="font-bold text-slate-700 dark:text-slate-300">{note.authorName}</span> ({note.authorRole})
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
