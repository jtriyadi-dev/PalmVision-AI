import React, { useState } from 'react';
import {
  Code2,
  Database,
  Copy,
  Check,
  Server,
  Terminal,
} from 'lucide-react';

import { HARVEST_REST_API_DOCS, HARVEST_DB_SCHEMA_DOCS } from '../mockData';

export const HarvestApiDocsView: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(HARVEST_DB_SCHEMA_DOCS);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Server className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Harvest Management System REST API & Database Schema DDL
        </h2>
        <p className="text-xs text-slate-500">
          Dokumentasi teknis endpoint REST API dan arsitektur tabel PostgreSQL relational database
        </p>
      </div>

      {/* REST API Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-600" /> REST API Endpoints Specification
        </h3>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-4 py-3 font-bold">Method</th>
                <th className="px-4 py-3 font-bold">Endpoint Path</th>
                <th className="px-4 py-3 font-bold">Deskripsi Fungsi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {HARVEST_REST_API_DOCS.map((api, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-bold">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] ${
                        api.method === 'GET'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400 font-bold'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-bold'
                      }`}
                    >
                      {api.method}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-900 dark:text-white">
                    {api.path}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{api.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PostgreSQL Schema DDL */}
      <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <Database className="h-4 w-4" /> PostgreSQL DDL Migration Script
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy DDL'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
          {HARVEST_DB_SCHEMA_DOCS}
        </pre>
      </div>
    </div>
  );
};
