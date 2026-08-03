import React, { useState } from 'react';
import {
  Code2,
  FileCode,
  Terminal,
  Play,
  Copy,
  Check,
  Lock,
  ExternalLink,
  Layers,
  Search
} from 'lucide-react';
import { mockApiEndpoints } from '../mockData';
import { ApiEndpointSpec } from '../types';

export const ApiSwaggerDocsView: React.FC = () => {
  const [endpoints] = useState<ApiEndpointSpec[]>(mockApiEndpoints);
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpointSpec>(mockApiEndpoints[0]);
  const [copied, setCopied] = useState(false);
  const [testResultJson, setTestResultJson] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCopySpec = () => {
    navigator.clipboard.writeText(selectedEndpoint.exampleResponseJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestApiCall = () => {
    setIsExecuting(true);
    setTestResultJson(null);
    setTimeout(() => {
      setIsExecuting(false);
      setTestResultJson(selectedEndpoint.exampleResponseJson);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider">
              OpenAPI 3.1 & REST Specification
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Interactive API Explorer & SDK Code Generator</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Complete OpenAPI 3.1 REST API specification for integrating third-party ERPs (SAP, Oracle, Odoo), IoT Gateways, and Mobile Apps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-sky-300 border border-slate-700 text-xs font-mono font-bold">
            v1.0.0-release
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Endpoints List Sidebar */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">API Endpoints Catalog</h3>

          <div className="space-y-2">
            {endpoints.map(ep => (
              <div
                key={ep.id}
                onClick={() => {
                  setSelectedEndpoint(ep);
                  setTestResultJson(null);
                }}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  selectedEndpoint.id === ep.id
                    ? 'bg-sky-950/80 border-sky-500 text-white shadow-lg'
                    : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        ep.method === 'GET'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      }`}
                    >
                      {ep.method}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-200">{ep.path}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">{ep.summary}</p>
                </div>

                {ep.requiresAuth && (
                  <Lock className="h-3.5 w-3.5 text-amber-400 shrink-0" title="Requires Bearer JWT" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive API Playground */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">{selectedEndpoint.tag}</span>
              <h3 className="text-sm font-bold text-white">{selectedEndpoint.summary}</h3>
            </div>

            <button
              onClick={handleTestApiCall}
              disabled={isExecuting}
              className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className={`h-3.5 w-3.5 ${isExecuting ? 'animate-spin' : ''}`} />
              <span>{isExecuting ? 'Executing...' : 'Execute Request'}</span>
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400">Endpoint Path & Authentication</span>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-sky-300 font-bold">{selectedEndpoint.method}</span>
              <span className="text-slate-200">{selectedEndpoint.path}</span>
              <span className="text-slate-400 text-[10px]">Bearer Token: Active</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Response JSON Payload Schema</span>
              <button
                onClick={handleCopySpec}
                className="text-[11px] text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
              {testResultJson || selectedEndpoint.exampleResponseJson}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
