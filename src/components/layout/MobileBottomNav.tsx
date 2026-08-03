import React from 'react';
import { LayoutDashboard, Sparkles, Layers, ShieldCheck, Menu } from 'lucide-react';
import { Language } from '../../types';

interface MobileBottomNavProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  onOpenAiAssistant: () => void;
  onOpenSidebarModal: () => void;
  lang: Language;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeModuleId,
  onSelectModule,
  onOpenAiAssistant,
  onOpenSidebarModal,
  lang,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-2 shadow-lg">
      <button
        onClick={() => onSelectModule('dashboard')}
        className={`flex flex-col items-center gap-1 p-2 text-[10px] font-medium transition-colors ${
          activeModuleId === 'dashboard'
            ? 'text-emerald-600 dark:text-emerald-400 font-bold'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <LayoutDashboard className="h-5 w-5" />
        <span>Dashboard</span>
      </button>

      <button
        onClick={() => onSelectModule('architecture-blueprints')}
        className={`flex flex-col items-center gap-1 p-2 text-[10px] font-medium transition-colors ${
          activeModuleId === 'architecture-blueprints'
            ? 'text-emerald-600 dark:text-emerald-400 font-bold'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <Layers className="h-5 w-5" />
        <span>Blueprints</span>
      </button>

      {/* Floating Center AI Action Button */}
      <button
        onClick={onOpenAiAssistant}
        className="flex flex-col items-center justify-center -mt-5 h-12 w-12 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg ring-4 ring-white dark:ring-slate-900 active:scale-95 transition-transform"
        title="AI Assistant"
      >
        <Sparkles className="h-6 w-6 text-amber-300 animate-pulse" />
      </button>

      <button
        onClick={() => onSelectModule('license')}
        className={`flex flex-col items-center gap-1 p-2 text-[10px] font-medium transition-colors ${
          activeModuleId === 'license'
            ? 'text-emerald-600 dark:text-emerald-400 font-bold'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        <ShieldCheck className="h-5 w-5" />
        <span>License</span>
      </button>

      <button
        onClick={onOpenSidebarModal}
        className="flex flex-col items-center gap-1 p-2 text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600"
      >
        <Menu className="h-5 w-5" />
        <span>Menu</span>
      </button>
    </div>
  );
};
