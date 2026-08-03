import React from 'react';
import { Code, Database, Server, CheckCircle2, Copy } from 'lucide-react';
import { FIELD_OPERATION_REST_API_DOCS, FIELD_OPERATION_DB_SCHEMA_DOCS } from '../mockData';

export const FieldApiDocsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Server className="h-5 w-5 text-emerald-400" />
          Field Operation Management — REST API Specifications
        </h2>
        <p className="text-xs text-slate-400">
          Spesifikasi REST API v1 untuk integrasi mobile mandor, sinkronisasi offline-queue, dan backend Cloud Run
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs font-mono text-slate-300">
            <thead className="bg-slate-950 text-emerald-400 text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-2.5">Method</th>
                <th className="px-4 py-2.5">API Endpoint Path</th>
                <th className="px-4 py-2.5 font-sans">Deskripsi Fungsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {FIELD_OPERATION_REST_API_DOCS.map((api, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50">
                  <td className="px-4 py-2 font-bold text-emerald-400">{api.method}</td>
                  <td className="px-4 py-2 text-white">{api.path}</td>
                  <td className="px-4 py-2 font-sans text-slate-400">{api.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-white space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Database className="h-5 w-5 text-emerald-400" />
          PostgreSQL Relational Schema Blueprint
        </h2>
        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
          {FIELD_OPERATION_DB_SCHEMA_DOCS}
        </pre>
      </div>
    </div>
  );
};
