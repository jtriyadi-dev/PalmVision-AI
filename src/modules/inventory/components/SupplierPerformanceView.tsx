import React from 'react';
import {
  Award,
  ShieldCheck,
  TrendingUp,
  Clock,
  Star,
  CheckCircle2,
  AlertTriangle,
  Building,
  BarChart3,
} from 'lucide-react';

import { SupplierPerformanceRecord } from '../types';

interface SupplierPerformanceViewProps {
  suppliers: SupplierPerformanceRecord[];
}

export const SupplierPerformanceView: React.FC<SupplierPerformanceViewProps> = ({ suppliers = [] }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Supplier Performance Scorecard & Vendor Evaluation Matrix
        </h2>
        <p className="text-xs text-slate-500">
          Evaluasi kinerja vendor supplier berdasarkan On-Time Delivery (OTD), Quality Pass %, Skor Harga, & Tingkat Komplain
        </p>
      </div>

      {/* Supplier Scorecards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Kategori: {sup.categoryProvided}
                </span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white mt-0.5">
                  {sup.supplierName}
                </h3>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-xs">
                {sup.rankingGrade}
              </span>
            </div>

            {/* Overall KPI Gauge score */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Skor KPI Komposist</span>
                <div className="text-2xl font-black text-slate-900 dark:text-white">{sup.kpiScore} / 100</div>
              </div>

              <div className="text-right text-xs">
                <span className="text-slate-500 block">{sup.totalOrdersFulfilled} PO Terpenuhi</span>
                <span className="text-slate-400 font-bold">{sup.totalComplaints} Komplain Logged</span>
              </div>
            </div>

            {/* Detailed Metric Bars */}
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-600 dark:text-slate-400">On-Time Delivery Rate (OTD):</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{sup.onTimeDeliveryRate}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${sup.onTimeDeliveryRate}%` }} />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-600 dark:text-slate-400">Quality Pass Rate (% Lolos QC):</span>
                  <span className="text-blue-600 dark:text-blue-400">{sup.qualityPassRate}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: `${sup.qualityPassRate}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Daya Saing Harga:</span>
                  <span className="text-emerald-600">{sup.competitivePriceScore}/100</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Respon Sales:</span>
                  <span className="text-emerald-600">{sup.responsivenessScore}/100</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
