import React from 'react';
import {
  Activity,
  HeartPulse,
  Wrench,
  TrendingUp,
  BatteryCharging,
  Zap,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { mockIotDevices } from '../mockData';

export const SensorAnalyticsHealthView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <HeartPulse className="h-6 w-6 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Sensor Analytics & IoT Device Health Matrix</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Battery life cycle analytics, solar charging telemetry, signal RSSI quality & preventive IoT maintenance schedule.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            Overall Network Health: 94% EXCELLENT
          </span>
        </div>
      </div>

      {/* Device Health Score Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {[
          { label: 'EXCELLENT', count: 4, color: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30' },
          { label: 'GOOD', count: 1, color: 'border-blue-500/40 text-blue-400 bg-blue-950/30' },
          { label: 'WARNING', count: 1, color: 'border-amber-500/40 text-amber-400 bg-amber-950/30' },
          { label: 'CRITICAL', count: 0, color: 'border-rose-500/40 text-rose-400 bg-rose-950/30' },
          { label: 'OFFLINE', count: 1, color: 'border-slate-600 text-slate-400 bg-slate-900/40' }
        ].map(h => (
          <div key={h.label} className={`p-4 rounded-xl border ${h.color} space-y-1`}>
            <span className="text-[10px] font-bold text-slate-400">{h.label}</span>
            <div className="text-2xl font-bold">{h.count} Devices</div>
          </div>
        ))}
      </div>

      {/* IoT Preventive Maintenance Schedule */}
      <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Wrench className="h-4 w-4 text-amber-400" />
            Scheduled Preventive IoT Maintenance Orders
          </h3>
          <button className="px-3 py-1.5 rounded-lg bg-amber-600 text-slate-950 font-bold text-xs hover:bg-amber-500">
            + Schedule Field Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">SOIL-SENS-102 (Peat Probe B15)</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                DUE IN 2 DAYS
              </span>
            </div>
            <p className="text-xs text-slate-300">Clean solar photovoltaic panel & recalibrate moisture probe.</p>
            <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-2 border-t border-slate-800">
              <Clock className="h-3 w-3 text-amber-400" /> Scheduled: Aug 05, 2026 | Tech: Slamet
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">FUEL-GEN-002 (Mill Generator Sensor)</span>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                OVERDUE
              </span>
            </div>
            <p className="text-xs text-slate-300">Replace damaged RS485 Modbus communication cable.</p>
            <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-2 border-t border-slate-800">
              <Clock className="h-3 w-3 text-rose-400" /> Scheduled: Aug 01, 2026 | Tech: Kaderi
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
