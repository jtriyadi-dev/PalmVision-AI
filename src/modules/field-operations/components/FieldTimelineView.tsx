import React, { useState } from 'react';
import { Clock, MapPin, Search, Filter, Calendar, User, Activity } from 'lucide-react';
import { FieldTimelineEvent } from '../types';

interface FieldTimelineViewProps {
  timelineEvents: FieldTimelineEvent[];
}

export const FieldTimelineView: React.FC<FieldTimelineViewProps> = ({ timelineEvents }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = timelineEvents.filter(
    (e) =>
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.blockCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari timeline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-bold">Total {timelineEvents.length} Event Terdaftar</span>
      </div>

      {/* Vertical Timeline View */}
      <div className="relative border-l-2 border-emerald-500/30 ml-4 pl-6 space-y-6">
        {filteredEvents.map((evt) => (
          <div key={evt.id} className="relative group">
            {/* Dot marker */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white dark:border-slate-900 shadow-md" />

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                  {evt.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(evt.timestamp).toLocaleString('id-ID')}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {evt.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {evt.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  {evt.actorName} ({evt.actorRole})
                </span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                  <MapPin className="h-3.5 w-3.5" />
                  {evt.blockCode}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
