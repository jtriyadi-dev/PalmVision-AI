import React, { useState } from 'react';
import {
  CheckCircle2,
  ShieldAlert,
  Zap,
  Activity,
  Play,
  RotateCw,
  Award,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { mockTestSuites } from '../mockData';
import { TestSuiteResult } from '../types';

export const QaTestingBenchmarkView: React.FC = () => {
  const [testSuites, setTestSuites] = useState<TestSuiteResult[]>(mockTestSuites);
  const [isRunningAll, setIsRunningAll] = useState(false);

  const handleRunAllTests = () => {
    setIsRunningAll(true);
    setTimeout(() => {
      setIsRunningAll(false);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              Automated QA & Security Audit Suite
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Quality Assurance, OWASP Pen-Test & Performance Benchmarks</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Automated regression testing, OWASP Top 10 vulnerability checks, and sub-2 second page load latency verification.
          </p>
        </div>

        <button
          onClick={handleRunAllTests}
          disabled={isRunningAll}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
        >
          <Play className={`h-4 w-4 ${isRunningAll ? 'animate-spin' : ''}`} />
          <span>{isRunningAll ? 'Running QA Test Runner...' : 'Execute All Test Suites'}</span>
        </button>
      </div>

      {/* Benchmark Metric Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Unit & Integration Test Pass Rate</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">100%</span>
            <span className="text-xs text-emerald-400 font-bold">42/42 Specs</span>
          </div>
          <p className="text-[11px] text-slate-400">Zero regressive failures detected.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>OWASP Security Vulnerability</span>
            <ShieldAlert className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">0 Vulns</span>
            <span className="text-xs text-cyan-300 font-bold">Grade A+</span>
          </div>
          <p className="text-[11px] text-slate-400">SQLi, XSS, CSRF & Access Control clean.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Average API Response Time</span>
            <Zap className="h-4 w-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">184 ms</span>
            <span className="text-xs text-amber-300 font-bold">&lt; 500ms Target</span>
          </div>
          <p className="text-[11px] text-slate-400">Tested across 10,000 requests/min.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Page Load & Lighthouse PWA</span>
            <Award className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">98 / 100</span>
            <span className="text-xs text-indigo-300 font-bold">PWA Ready</span>
          </div>
          <p className="text-[11px] text-slate-400">Accessibility & SEO benchmark pass.</p>
        </div>
      </div>

      {/* Test Suites List */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-white">Automated Test Suites Execution Log</h3>

        <div className="space-y-3">
          {testSuites.map(ts => (
            <div key={ts.id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono text-[10px] font-bold">
                    {ts.category}
                  </span>
                  <h4 className="text-sm font-bold text-white">{ts.testName}</h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400">{ts.durationMs} ms</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    PASSED ({ts.score}/100)
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{ts.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
