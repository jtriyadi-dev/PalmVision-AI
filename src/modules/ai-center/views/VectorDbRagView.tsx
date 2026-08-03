import React from 'react';
import {
  Database,
  Layers,
  CheckCircle2,
  HardDrive,
  Cpu,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { INITIAL_VECTOR_INDEXES } from '../mockData';

export const VectorDbRagView: React.FC = () => {
  return (
    <div className="space-y-6 text-xs">
      {/* Header */}
      <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            <span>Multi-Provider Vector Database Infrastructure Layer</span>
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Abstraksi Database Vektor Enterprise: pgvector, Qdrant, Pinecone, Milvus, Weaviate & Chroma.
          </p>
        </div>

        <button
          onClick={() => alert('Simulasi Buat Vector Index Baru')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Vector Index Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {INITIAL_VECTOR_INDEXES.map((idx) => (
          <div key={idx.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 font-mono">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-cyan-400 text-sm font-sans">{idx.indexName}</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold text-[10px] border border-emerald-800">
                {idx.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">VECTOR PROVIDER</span>
                <span className="text-white font-bold">{idx.provider}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">DIMENSION</span>
                <span className="text-emerald-400 font-bold">{idx.dimension} Vectors</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">DISTANCE METRIC</span>
                <span className="text-amber-400 font-bold">{idx.metric}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">EMBEDDING ENGINE</span>
                <span className="text-cyan-400 font-bold">{idx.embeddingModel}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 text-[10px] text-slate-400 font-sans border-t border-slate-800">
              <span>Total Indexed Vectors: <strong>{idx.totalVectors.toLocaleString('id-ID')}</strong></span>
              <span>Updated: {idx.lastIndexedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
