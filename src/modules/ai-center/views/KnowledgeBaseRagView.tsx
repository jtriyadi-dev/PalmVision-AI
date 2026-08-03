import React, { useState } from 'react';
import {
  Database,
  FileText,
  Search,
  BookOpen,
  Layers,
  Settings,
  CheckCircle2,
  Clock,
  Plus,
  Sliders,
  Sparkles,
  Download,
} from 'lucide-react';
import { INITIAL_KNOWLEDGE_DOCUMENTS, INITIAL_VECTOR_INDEXES } from '../mockData';
import { KnowledgeDocument } from '../types';

export const KnowledgeBaseRagView: React.FC = () => {
  const [docs, setDocs] = useState<KnowledgeDocument[]>(INITIAL_KNOWLEDGE_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [ragChunkSize, setRagChunkSize] = useState(512);
  const [ragChunkOverlap, setRagChunkOverlap] = useState(64);
  const [selectedEmbedding, setSelectedEmbedding] = useState('Gemini Embedding 2 (768d)');

  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleTestSemanticSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setSearchResult(
      `Hasil Semantic RAG Search untuk "${searchQuery}":\n\n1. Dokumen: SOP Standar Pemupukan NPK (KDOC-SOP-AGRO-001) [Similarity: 0.94]\n   Chunk #42: "Aplikasi NPK 13-6-27 dilakukan sebanyak 2.5 kg/pohon per siklus. Penyebaran di sekeliling piringan sejauh 1.5 - 2.0 meter..."\n\n2. Dokumen: RSPO Criteria 2026 Manual (KDOC-RSPO-MANUAL-2026) [Similarity: 0.81]\n   Chunk #118: "Penggunaan bahan kimia berbahaya kelas 1A/1B dilarang pada areal dekat riparian zone..."`
    );
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <span>Knowledge Base & RAG (Retrieval-Augmented Generation) Platform</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Manajemen Dokumen SOP Perkebunan, Regulasi RSPO, Chunking Strategy, Embedding Models & Vector Indexing.
          </p>
        </div>

        <button
          onClick={() => alert('Simulasi Modal Upload Dokumen Knowledge Baru')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Dokumen SOP</span>
        </button>
      </div>

      {/* RAG Configuration & Vector Index Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* RAG Chunking Settings */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Konfigurasi Chunking RAG</span>
          </h3>

          <div className="space-y-3 font-mono">
            <div>
              <label className="text-slate-400 text-[10px] block mb-1">CHUNK SIZE (TOKENS): {ragChunkSize}</label>
              <input
                type="range"
                min={128}
                max={2048}
                step={64}
                value={ragChunkSize}
                onChange={(e) => setRagChunkSize(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-slate-400 text-[10px] block mb-1">CHUNK OVERLAP: {ragChunkOverlap} TOKENS</label>
              <input
                type="range"
                min={16}
                max={256}
                step={16}
                value={ragChunkOverlap}
                onChange={(e) => setRagChunkOverlap(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-slate-400 text-[10px] block mb-1">EMBEDDING MODEL</label>
              <select
                value={selectedEmbedding}
                onChange={(e) => setSelectedEmbedding(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-400 font-bold"
              >
                <option value="Gemini Embedding 2 (768d)">Google Gemini Embedding 2 (768d)</option>
                <option value="Text-Embedding-3-Large (1536d)">OpenAI Text-Embedding-3 (1536d)</option>
                <option value="BGE-Large-ID (1024d)">BGE Large Bahasa Indonesia (1024d)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Vector Indexes */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Vector Database Index Status (pgvector / Qdrant)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INITIAL_VECTOR_INDEXES.map((idx) => (
              <div key={idx.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-cyan-400">{idx.provider}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                    {idx.status}
                  </span>
                </div>
                <p className="font-bold text-white text-xs font-sans">{idx.indexName}</p>
                <div className="text-slate-400 text-[10px] space-y-0.5">
                  <p>Dimension: {idx.dimension} | Metric: {idx.metric}</p>
                  <p>Total Vectors: <strong>{idx.totalVectors.toLocaleString('id-ID')}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Semantic Search Tester */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <Search className="w-4 h-4 text-amber-400" />
          <span>Uji Hybrid Vector Semantic Search</span>
        </h3>

        <form onSubmit={handleTestSemanticSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Ketik pertanyaan untuk mencari chunk dokumen terindeks (misal: 'Dosis pemupukan NPKTM2')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
          >
            Cari Vector RAG
          </button>
        </form>

        {searchResult && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-200 text-xs whitespace-pre-line leading-relaxed">
            {searchResult}
          </div>
        )}
      </div>

      {/* Documents Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <h3 className="font-extrabold text-white text-sm flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Daftar Dokumen Knowledge Enterprise</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="py-2.5 px-3">KODE DOKUMEN</th>
                <th className="py-2.5 px-3">JUDUL DOKUMEN</th>
                <th className="py-2.5 px-3">KATEGORI</th>
                <th className="py-2.5 px-3">FORMAT</th>
                <th className="py-2.5 px-3">CHUNKS</th>
                <th className="py-2.5 px-3">VECTOR STATUS</th>
                <th className="py-2.5 px-3">STATUS APPROVAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-950/50">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">{doc.docCode}</td>
                  <td className="py-2.5 px-3 font-bold font-sans text-white">{doc.title}</td>
                  <td className="py-2.5 px-3">{doc.category}</td>
                  <td className="py-2.5 px-3">{doc.fileType} ({doc.fileSizeMb}MB)</td>
                  <td className="py-2.5 px-3">{doc.totalChunks} Chunks</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-400 font-bold border border-cyan-800">
                      INDEXED ✓
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                      {doc.approvalStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
