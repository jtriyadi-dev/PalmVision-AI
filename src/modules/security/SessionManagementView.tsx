import React, { useState } from 'react';
import { Smartphone, LogOut, ShieldCheck, Globe, Monitor, Laptop, CheckCircle2 } from 'lucide-react';
import { ActiveSession } from '../../types';

export const SessionManagementView: React.FC = () => {
  const [sessions, setSessions] = useState<ActiveSession[]>([
    {
      id: 'sess-01',
      userId: 'usr-01',
      userName: 'Suhardi, S.P. (Estate Manager)',
      role: 'ESTATE_MANAGER',
      device: 'MacBook Pro 16" M3',
      ipAddress: '10.20.14.88',
      browser: 'Chrome 126.0 (Macintosh)',
      os: 'macOS Sonoma',
      location: 'Pekanbaru, Riau (Kantor Estate)',
      loginTime: '2026-08-03 07:30:12',
      lastActiveTime: '2026-08-03 08:14:22',
      isCurrent: true,
    },
    {
      id: 'sess-02',
      userId: 'usr-02',
      userName: 'Budiarto (Mandor 01)',
      role: 'MANDOR',
      device: 'Samsung Galaxy Tab Active 4',
      ipAddress: '10.20.18.102',
      browser: 'PalmVision PWA Native',
      os: 'Android 14',
      location: 'Afdeling Alpha (Pos TPH B12)',
      loginTime: '2026-08-03 06:15:00',
      lastActiveTime: '2026-08-03 08:05:10',
      isCurrent: false,
    },
    {
      id: 'sess-03',
      userId: 'usr-03',
      userName: 'Rina Herawati (Finance)',
      role: 'FINANCE',
      device: 'Dell Latitude 5430',
      ipAddress: '192.168.1.45',
      browser: 'Microsoft Edge 125',
      os: 'Windows 11 Enterprise',
      location: 'Jakarta (Holding HQ)',
      loginTime: '2026-08-02 09:00:00',
      lastActiveTime: '2026-08-02 17:30:00',
      isCurrent: false,
    },
  ]);

  const [revokedMsg, setRevokedMsg] = useState(false);

  const handleRevokeSession = (id: string) => {
    setSessions(sessions.filter((s) => s.id !== id));
    setRevokedMsg(true);
    setTimeout(() => setRevokedMsg(false), 2000);
  };

  const handleRevokeAllOtherSessions = () => {
    setSessions(sessions.filter((s) => s.isCurrent));
    setRevokedMsg(true);
    setTimeout(() => setRevokedMsg(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Monitor className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Session Management & Remote Device Control</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Monitoring Sesi Aktif Multi-Device, Remote Logout, dan IP History Access Control
            </p>
          </div>
        </div>

        <button
          onClick={handleRevokeAllOtherSessions}
          className="px-4 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <LogOut className="h-4 w-4" />
          <span>Putuskan Semua Sesi Lain (Remote Logout All)</span>
        </button>
      </div>

      {revokedMsg && (
        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Sesi berhasil diterminasi secara paksa (Remote Logged Out).
        </div>
      )}

      {/* Active Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {sessions.map((sess) => (
          <div
            key={sess.id}
            className={`p-5 rounded-2xl border shadow-sm space-y-3 relative transition-all ${
              sess.isCurrent
                ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Laptop className="h-4 w-4 text-emerald-600" /> {sess.device}
              </span>
              {sess.isCurrent ? (
                <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-extrabold text-[9px]">
                  SESI INI (CURRENT)
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-[9px] font-bold">
                  AKTIF
                </span>
              )}
            </div>

            <div className="space-y-1 text-slate-600 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-slate-100">{sess.userName}</div>
              <div className="text-[11px] font-mono text-slate-500">IP: {sess.ipAddress}</div>
              <div className="text-[11px] text-slate-500">{sess.os} • {sess.browser}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                <Globe className="h-3 w-3" /> {sess.location}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Aktif: {sess.lastActiveTime.substring(11)}</span>
              {!sess.isCurrent && (
                <button
                  onClick={() => handleRevokeSession(sess.id)}
                  className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 font-bold hover:bg-rose-200 cursor-pointer"
                >
                  Terminate Sesi
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
