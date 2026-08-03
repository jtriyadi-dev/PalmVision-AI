import React, { useState } from 'react';
import { Bell, X, AlertTriangle, CheckCircle, Info, Sparkles, Filter, Search, Trash2, Check, Archive, ShieldCheck } from 'lucide-react';
import { NotificationItemData, NotificationCategory } from '../../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onClearCount: () => void;
}

const INITIAL_NOTIFICATIONS: NotificationItemData[] = [
  {
    id: 'n1',
    title: 'Target Panen TBS Harian Tercapai',
    message: 'Blok B12 Afdeling Alpha telah menyelesaikan panen TBS sebesar 142.8 Ton (112% dari target RKAP).',
    timestamp: '10 menit yang lalu',
    category: 'harvest',
    priority: 'high',
    read: false,
    sourceModule: 'Harvesting',
  },
  {
    id: 'n2',
    title: 'Anomali Konsumsi BBM Solar (DT-08)',
    message: 'Truk Dump DT-08 terdeteksi pengisian solar 120L melebihi estimasi jarak tempuh TPH.',
    timestamp: '25 menit yang lalu',
    category: 'inventory',
    priority: 'urgent',
    read: false,
    sourceModule: 'Fuel Monitoring',
  },
  {
    id: 'n3',
    title: 'Model Gemini 2.5 AI Yield Updated',
    message: 'Model AI memperbarui proyeksi hasil panen Q3 Estate Teluk Dalam dengan tingkat akurasi 96.4%.',
    timestamp: '1 jam yang lalu',
    category: 'ai',
    priority: 'normal',
    read: false,
    sourceModule: 'AI Engine',
  },
  {
    id: 'n4',
    title: 'Persetujuan Pengajuan BKM Pemupukan',
    message: 'Estate Manager telah menyetujui BKM pemupukan NPK 8.4 Ton untuk Afdeling Beta.',
    timestamp: '3 jam yang lalu',
    category: 'approval',
    priority: 'normal',
    read: true,
    sourceModule: 'Approval Workflow',
  },
  {
    id: 'n5',
    title: 'Masa Lisensi Enterprise Grace Period',
    message: 'Lisensi Enterprise aktif normal (Sisa 515 hari). Backup otomatis basis data Firestore berhasil.',
    timestamp: '5 jam yang lalu',
    category: 'license',
    priority: 'info',
    read: true,
    sourceModule: 'License Control',
  },
];

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onClearCount,
}) => {
  const [notifications, setNotifications] = useState<NotificationItemData[]>(INITIAL_NOTIFICATIONS);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    const matchesCategory = activeCategoryFilter === 'ALL' || n.category === activeCategoryFilter;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })));
    onClearCount();
  };

  const handleClearAll = () => {
    setNotifications([]);
    onClearCount();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Notification Center Enterprise</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Notifikasi sistem, AI, approval & operasional</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Search Input & Action Buttons */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari notifikasi..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto text-[11px] pb-1 no-scrollbar">
            {[
              { id: 'ALL', label: 'Semua' },
              { id: 'harvest', label: 'Panen' },
              { id: 'ai', label: 'AI' },
              { id: 'approval', label: 'Approval' },
              { id: 'inventory', label: 'Stok & BBM' },
              { id: 'license', label: 'Lisensi' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                  activeCategoryFilter === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Bell className="h-8 w-8 text-slate-400 mx-auto" />
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tidak ada notifikasi baru</p>
            </div>
          ) : (
            filteredNotifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl border transition-all text-xs space-y-1.5 ${
                  !n.read
                    ? 'border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/30 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        n.priority === 'urgent'
                          ? 'bg-red-500 animate-ping'
                          : n.priority === 'high'
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span className="font-bold text-slate-900 dark:text-slate-100">{n.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{n.timestamp}</span>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{n.message}</p>

                <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400 border-t border-slate-100 dark:border-slate-800">
                  <span className="uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {n.sourceModule}
                  </span>
                  <span className="uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {n.priority}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={handleMarkAllRead}
            className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="h-3.5 w-3.5 text-emerald-500" /> Tandai Sudah Dibaca
          </button>
          <button
            onClick={handleClearAll}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            title="Bersihkan Semua Notifikasi"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
