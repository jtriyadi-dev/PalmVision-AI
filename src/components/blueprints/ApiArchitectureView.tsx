import React, { useState } from 'react';
import { Code2, Send, CheckCircle2, Server, Globe } from 'lucide-react';

export const ApiArchitectureView: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('/api/v1/health');
  const [responseOutput, setResponseOutput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const endpoints = [
    { method: 'GET', path: '/api/v1/health', label: 'Health Status' },
    { method: 'GET', path: '/api/v1/organization/hierarchy', label: 'Plantation Hierarchy' },
    { method: 'POST', path: '/api/v1/license/verify', label: 'Verify License Key' },
    { method: 'POST', path: '/api/v1/ai/chat', label: 'AI Gemini Assistant Proxy' },
  ];

  const handleTestApi = async () => {
    setIsLoading(true);
    setResponseOutput(null);

    try {
      let options: RequestInit = { method: selectedEndpoint.startsWith('POST') ? 'POST' : 'GET' };
      if (selectedEndpoint === '/api/v1/license/verify') {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify({ licenseKey: 'PVAI-ENT-SNJ-2027', hwid: 'HWID-001' });
      } else if (selectedEndpoint === '/api/v1/ai/chat') {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify({ message: 'Cek status panen hari ini', context: { estateName: 'Teluk Dalam' } });
      }

      const res = await fetch(selectedEndpoint, options);
      const data = await res.json();
      setResponseOutput(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseOutput(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Code2 className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">10. REST API Architecture Specification</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              RESTful Standard Response Envelopes, Pagination, OpenAPI Spec & Live Endpoint Test Bench
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Live Endpoint Simulator Bench (/api/v1/)
        </h3>

        <div className="flex flex-wrap gap-2">
          {endpoints.map((ep) => (
            <button
              key={ep.path}
              onClick={() => setSelectedEndpoint(ep.path)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                selectedEndpoint === ep.path
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span className="px-1.5 py-0.5 rounded bg-slate-950 text-amber-300 text-[9px]">
                {ep.method}
              </span>
              <span>{ep.path}</span>
            </button>
          ))}
        </div>

        <div className="pt-2 flex justify-between items-center">
          <span className="text-xs font-mono text-slate-500">
            Selected: <strong className="text-slate-900 dark:text-slate-100">{selectedEndpoint}</strong>
          </span>
          <button
            onClick={handleTestApi}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isLoading ? 'Mengirim Request...' : 'Kirim REST Request'}</span>
          </button>
        </div>

        {responseOutput && (
          <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-72 border border-slate-800">
            <pre>{responseOutput}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
