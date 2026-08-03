import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Trees, 
  Map, 
  Wheat, 
  Pickaxe, 
  Truck, 
  Fuel, 
  Wrench, 
  Boxes, 
  Warehouse, 
  Users, 
  Building2, 
  ShoppingCart, 
  Contact2, 
  Sparkles, 
  TrendingUp, 
  FileSpreadsheet, 
  Palette, 
  Layers, 
  Key, 
  Settings, 
  HelpCircle,
  Search,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../config/navigation';
import { NavigationItem, Language } from '../../types';

interface SidebarProps {
  activeModuleId: string;
  onSelectModule: (id: string) => void;
  lang: Language;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  LayoutDashboard,
  Trees,
  Map,
  Wheat,
  Pickaxe,
  Truck,
  Fuel,
  Wrench,
  Boxes,
  Warehouse,
  Users,
  Building2,
  ShoppingCart,
  Contact2,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  Palette,
  Layers,
  Key,
  Settings,
  HelpCircle,
};

export const Sidebar: React.FC<SidebarProps> = ({
  activeModuleId,
  onSelectModule,
  lang,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = NAVIGATION_ITEMS.filter((item) => {
    const label = lang === 'id' ? item.label : item.labelEn;
    return label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const categories = [
    { key: 'core', label: lang === 'id' ? 'UTAMA & PLANTASE' : 'CORE & PLANTATION' },
    { key: 'operations', label: lang === 'id' ? 'OPERASIONAL KEBUN' : 'FIELD OPERATIONS' },
    { key: 'resources', label: lang === 'id' ? 'LOGISTIK & SDM' : 'RESOURCES & HR' },
    { key: 'intelligence', label: lang === 'id' ? 'AI & ANALITIK' : 'AI & INTELLIGENCE' },
    { key: 'system', label: lang === 'id' ? 'SISTEM & BLUEPRINT' : 'SYSTEM & BLUEPRINT' },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-16 z-20 flex flex-col h-[calc(100vh-4rem)] border-r border-emerald-900/10 dark:border-emerald-500/20 bg-white dark:bg-slate-900 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Search Bar & Collapse Button */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
        {!isCollapsed && (
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder={lang === 'id' ? 'Cari modul...' : 'Search module...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-8 pr-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ml-auto"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4 custom-scrollbar">
        {categories.map((cat) => {
          const catItems = filteredItems.filter((i) => i.category === cat.key);
          if (catItems.length === 0) return null;

          return (
            <div key={cat.key} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {cat.label}
                </div>
              )}

              {catItems.map((item) => {
                const IconComponent = iconMap[item.iconName] || Layers;
                const isActive = activeModuleId === item.id;
                const itemLabel = lang === 'id' ? item.label : item.labelEn;

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectModule(item.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md shadow-emerald-700/20 font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800/80 hover:text-emerald-700 dark:hover:text-emerald-400'
                    }`}
                    title={itemLabel}
                  >
                    <IconComponent
                      className={`h-4 w-4 shrink-0 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-amber-300' : 'text-slate-400 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                      }`}
                    />

                    {!isCollapsed && (
                      <div className="flex-1 text-left truncate flex items-center justify-between">
                        <span className="truncate">{itemLabel}</span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                              isActive
                                ? 'bg-amber-400 text-emerald-950'
                                : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer License Status Card */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-2.5 rounded-xl border border-emerald-900/10 dark:border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-950/20 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>PalmVision Engine v1.0</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
              Enterprise License • On-Prem Ready
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};
