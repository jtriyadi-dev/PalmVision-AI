import React from 'react';
import { FolderTree, FileCode, CheckCircle2 } from 'lucide-react';
import { ARCHITECTURE_BLUEPRINTS } from '../../config/architectureBlueprint';

export const ProjectStructureView: React.FC = () => {
  const blueprint = ARCHITECTURE_BLUEPRINTS.find((b) => b.id === 'project-structure')!;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <FolderTree className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{blueprint.title}</h2>
            <p className="text-xs text-slate-300 mt-0.5">{blueprint.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Enterprise Clean Architecture Directory Structure
        </h3>

        <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
          <pre>{blueprint.contentMarkdown}</pre>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-4">
          {blueprint.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
