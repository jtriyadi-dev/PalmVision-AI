import React, { useState } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  UserCheck,
  ShieldAlert,
  Search,
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { mockSmartEvents } from '../mockData';
import { SmartEventAlert } from '../types';

export const EventAlertCenterView: React.FC = () => {
  const [events, setEvents] = useState<SmartEventAlert[]>(mockSmartEvents);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');

  const filteredEvents = severityFilter === 'ALL'
    ? events
    : events.filter(e => e.severity === severityFilter);

  const handleAcknowledge = (id: string) => {
    setEvents(events.map(e => e.id === id ? { ...e, acknowledged: true, assignedTo: 'Field Supervisor Slamet' } : e));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-rose-400" />
            <h2 className="text-lg font-bold text-white">Event Processing & Alert Escalation Center</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Automated sensor threshold triggers, flood alerts, geofence breaches, and maintenance dispatching.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'CRITICAL', 'WARNING', 'INFORMATION'].map(s => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                severityFilter === s
                  ? s === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-slate-600 text-white'
                  : 'bg-slate-900 text-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Events Stream Table */}
      <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/50">
                <th className="py-3 px-4 font-semibold">Event No</th>
                <th className="py-3 px-4 font-semibold">Severity</th>
                <th className="py-3 px-4 font-semibold">Event Category</th>
                <th className="py-3 px-4 font-semibold">Source Device & Location</th>
                <th className="py-3 px-4 font-semibold">Alert Message</th>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold">Assigned Technician</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-slate-200">
              {filteredEvents.map(evt => (
                <tr key={evt.id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-300">{evt.eventNo}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      evt.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' :
                      evt.severity === 'WARNING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {evt.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-white">{evt.eventType}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-teal-300">{evt.sourceDevice}</div>
                    <div className="text-[10px] text-slate-400">{evt.locationEstate}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-medium max-w-xs">{evt.message}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[10px]">{evt.timestamp}</td>
                  <td className="py-3 px-4 text-slate-300">
                    {evt.assignedTo ? (
                      <span className="flex items-center gap-1 text-emerald-300">
                        <UserCheck className="h-3.5 w-3.5 text-emerald-400" /> {evt.assignedTo}
                      </span>
                    ) : (
                      <span className="text-amber-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {evt.acknowledged ? (
                      <span className="text-emerald-400 text-[10px] font-bold flex items-center justify-end gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Acknowledged
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAcknowledge(evt.id)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition"
                      >
                        Acknowledge
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
