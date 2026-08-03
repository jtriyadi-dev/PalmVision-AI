import React from 'react';
import { Smartphone, Tablet, Monitor, CheckCircle2, Layers } from 'lucide-react';

export const ResponsiveStrategyView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Smartphone className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">6. Adaptive Responsive Layout Strategy</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Native Responsive Design across Mobile Android/iOS, Tablets, Laptops & Ultra-Wide Desktops
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Monitor className="h-5 w-5 text-emerald-600" /> Desktop (&gt;1280px)
          </div>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Expanded Sidebar & Hierarchy Context Bar</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Multi-column Dashboard Metrics & BI Grid</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Full Keyboard Navigation & Hover States</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Tablet className="h-5 w-5 text-emerald-600" /> Tablet (768px - 1024px)
          </div>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Collapsible Icon-only Mini Sidebar</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Touch Drawer & Slide-over Navigation</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Adaptive 2-Column Responsive Card Grid</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-3">
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
            <Smartphone className="h-5 w-5 text-emerald-600" /> Mobile Android / iOS
          </div>
          <ul className="space-y-1.5 text-slate-600 dark:text-slate-300">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Fixed Bottom Touch Navigation Bar</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Floating AI Assistant Quick Trigger</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Minimum 44px Touch Targets for Mandor</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
