import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  UserCheck, 
  Moon, 
  Sun, 
  Globe, 
  Bell, 
  ShieldCheck, 
  Wifi, 
  WifiOff, 
  KeyRound,
  Menu,
  Sparkles,
  ChevronDown,
  Search,
  Maximize,
  Minimize
} from 'lucide-react';
import { CompanyContext, UserRole, ThemeMode, Language, LicenseInfo } from '../../types';

interface HeaderProps {
  context: CompanyContext;
  onContextChange: (newContext: CompanyContext) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  lang: Language;
  onToggleLang: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  license: LicenseInfo;
  onOpenLicenseModal: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onToggleSidebar: () => void;
  onOpenAiAssistant: () => void;
  onOpenCommandPalette?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  context,
  onContextChange,
  userRole,
  onRoleChange,
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  isOffline,
  onToggleOffline,
  license,
  onOpenLicenseModal,
  onOpenNotifications,
  unreadNotificationsCount,
  onToggleSidebar,
  onOpenAiAssistant,
  onOpenCommandPalette,
}) => {
  const [showContextDropdown, setShowContextDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.log(err));
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => console.log(err));
        setIsFullscreen(false);
      }
    }
  };

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'SUPER_ADMIN', label: 'Super Admin System' },
    { role: 'OWNER', label: 'Owner / Komisaris' },
    { role: 'DIRECTOR', label: 'Direktur Operasional' },
    { role: 'ESTATE_MANAGER', label: 'Estate Manager (EM)' },
    { role: 'ASSISTANT_MANAGER', label: 'Assistant Manager (Asst)' },
    { role: 'SUPERVISOR', label: 'Supervisor Field' },
    { role: 'MANDOR', label: 'Mandor Panen / Kebun' },
    { role: 'FINANCE', label: 'Finance & Accounting' },
    { role: 'AUDITOR', label: 'Internal Auditor' },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-emerald-900/10 dark:border-emerald-500/20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 sm:px-6 transition-colors duration-200">
      {/* Left: Hamburger & Logo Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-emerald-700 to-emerald-900 text-white shadow-md shadow-emerald-600/20 ring-1 ring-emerald-400/30">
            <span className="font-bold text-xl tracking-tight">PV</span>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight">
                PalmVision
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Smart Plantation System
            </p>
          </div>
        </div>

        {/* Context Selector Dropdown (Multi-Company/Estate) */}
        <div className="relative ml-2 sm:ml-4">
          <button
            onClick={() => setShowContextDropdown(!showContextDropdown)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
          >
            <Building2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <div className="text-left hidden md:block">
              <div className="font-semibold text-[11px] leading-none text-slate-900 dark:text-slate-100">
                {context.companyName}
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                {context.estateName} • {context.afdelingName} • {context.blockCode}
              </div>
            </div>
            <div className="text-left md:hidden text-[11px] font-semibold">
              {context.estateName}
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {/* Context Switcher Modal Dropdown */}
          {showContextDropdown && (
            <div className="absolute left-0 mt-2 w-72 sm:w-80 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 shadow-xl z-50">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 px-1">
                Konteks Operasional Kebun (Hierarchy)
              </div>
              
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Perusahaan / Holding</label>
                  <select
                    value={context.companyId}
                    onChange={(e) => onContextChange({ ...context, companyId: e.target.value, companyName: e.target.options[e.target.selectedIndex].text })}
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1.5 text-slate-800 dark:text-slate-200"
                  >
                    <option value="comp-01">PT Sawit Nusantara Jaya</option>
                    <option value="comp-02">PT Borneo Agro Lestari</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">Estate / Kebun Utama</label>
                  <select
                    value={context.estateId}
                    onChange={(e) => onContextChange({ ...context, estateId: e.target.value, estateName: e.target.options[e.target.selectedIndex].text })}
                    className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1.5 text-slate-800 dark:text-slate-200"
                  >
                    <option value="est-01">Estate Teluk Dalam</option>
                    <option value="est-02">Estate Kayu Sebatang</option>
                    <option value="est-03">Estate Rawa Bening</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Afdeling</label>
                    <select
                      value={context.afdelingId}
                      onChange={(e) => onContextChange({ ...context, afdelingId: e.target.value, afdelingName: e.target.options[e.target.selectedIndex].text })}
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1.5 text-slate-800 dark:text-slate-200"
                    >
                      <option value="afd-01">Afdeling Alpha</option>
                      <option value="afd-02">Afdeling Beta</option>
                      <option value="afd-03">Afdeling Gamma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Blok Tanam</label>
                    <select
                      value={context.blockId}
                      onChange={(e) => onContextChange({ ...context, blockId: e.target.value, blockCode: e.target.options[e.target.selectedIndex].text })}
                      className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1.5 text-slate-800 dark:text-slate-200"
                    >
                      <option value="blk-b12">Blok B12 (28.5 Ha)</option>
                      <option value="blk-b13">Blok B13 (32.0 Ha)</option>
                      <option value="blk-c01">Blok C01 (24.1 Ha)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  onClick={() => setShowContextDropdown(false)}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-md text-xs font-semibold hover:bg-emerald-700"
                >
                  Terapkan Konteks
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions, License Badge, Theme, Role & Assistant */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Global Search Command Palette (Ctrl+K) Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors"
          title="Search Global (Ctrl+K)"
        >
          <Search className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="hidden md:inline">Pencarian Global...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded border border-slate-300 dark:border-slate-600">
            Ctrl K
          </kbd>
        </button>

        {/* Floating AI Trigger Button */}
        <button
          onClick={onOpenAiAssistant}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium text-xs shadow-sm hover:from-emerald-500 hover:to-teal-500 transition-all cursor-pointer"
          title="Open PalmVision AI Assistant"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-amber-300" />
          <span className="hidden sm:inline">PalmVision AI</span>
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="hidden md:flex p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </button>

        {/* License Badge */}
        <button
          onClick={onOpenLicenseModal}
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-semibold border transition-all ${
            license.status === 'ACTIVE'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700'
          }`}
          title="Manage Product License"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          <span className="hidden xl:inline">{license.type === 'SAAS_ENTERPRISE' ? 'ENTERPRISE' : 'ON-PREMISE'}</span>
          <span className="text-[10px] opacity-75">({license.status})</span>
        </button>

        {/* Offline Mode Simulator Toggle */}
        <button
          onClick={onToggleOffline}
          className={`p-1.5 rounded-lg border text-xs font-medium transition-colors ${
            isOffline
              ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-300'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
          }`}
          title={isOffline ? 'Modus Offline Lapangan (Aktif)' : 'Modus Online Server'}
        >
          {isOffline ? (
            <WifiOff className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          ) : (
            <Wifi className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          )}
        </button>

        {/* Language Toggle */}
        <button
          onClick={onToggleLang}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold uppercase"
          title="Change Language"
        >
          {lang}
        </button>

        {/* Theme Dark/Light Toggle */}
        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </button>

        {/* Notifications Button */}
        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-900">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleDropdown(!showRoleDropdown)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs transition-colors"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white font-bold text-[10px]">
              {userRole.substring(0, 2)}
            </div>
            <span className="hidden lg:inline text-[11px] font-semibold">
              {rolesList.find(r => r.role === userRole)?.label || userRole}
            </span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showRoleDropdown && (
            <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 shadow-xl z-50 text-xs">
              <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Simulasi Switch Role (RBAC)
              </div>
              <div className="space-y-1 mt-1 max-h-60 overflow-y-auto">
                {rolesList.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => {
                      onRoleChange(r.role);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded-md flex items-center justify-between transition-colors ${
                      userRole === r.role
                        ? 'bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{r.label}</span>
                    {userRole === r.role && <UserCheck className="h-3.5 w-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
