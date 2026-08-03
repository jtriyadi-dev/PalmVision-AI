import React from 'react';
import { FileCode, CheckCircle2, Shield, Layers } from 'lucide-react';

export const CodingStandardView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <FileCode className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">11. Software Engineering & Coding Standards</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Clean Architecture, SOLID Principles, Atomic Component Design & TypeScript Type Safety
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Principles of SOLID Architecture
          </h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Setiap komponen React dan API service memiliki Single Responsibility. Data access dipisahkan melalui Service & Repository pattern untuk memudahkan pengujian otomatis (Unit Testing).
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-2">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-600" /> TypeScript Strict Type Enforcement
          </h4>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Dilarang keras menggunakan tipe `any` implisit. Semua entitas domain (Company, Estate, Block, Harvest, UserRole, License) terdefinisi secara eksplisit di `/src/types.ts`.
          </p>
        </div>
      </div>
    </div>
  );
};
