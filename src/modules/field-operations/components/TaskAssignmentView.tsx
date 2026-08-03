import React, { useState } from 'react';
import { Users, Clock, Calendar, Search, Plus, Filter, AlertCircle, RefreshCw, MapPin } from 'lucide-react';
import { TaskAssignmentItem } from '../types';

interface TaskAssignmentViewProps {
  tasks: TaskAssignmentItem[];
  onAddTask: (task: TaskAssignmentItem) => void;
}

export const TaskAssignmentView: React.FC<TaskAssignmentViewProps> = ({
  tasks,
  onAddTask,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.assigneeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.taskId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = departmentFilter === 'All' || t.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search & Action bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari tugas / penerima / ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-hidden"
          >
            <option value="All">Semua Departemen</option>
            <option value="Agronomi">Agronomi</option>
            <option value="Teknik & Infrastruktur">Teknik & Infrastruktur</option>
            <option value="EHS & Proteksi">EHS & Proteksi</option>
            <option value="QA Inspection">QA Inspection</option>
          </select>
        </div>

        <button
          onClick={() => alert('Form Tambah Penugasan Tim')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Penugasan Tim</span>
        </button>
      </div>

      {/* Task Assignment Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
        <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="px-4 py-3 font-bold">ID Task / Judul Penugasan</th>
              <th className="px-4 py-3 font-bold">Tipe & Penerima</th>
              <th className="px-4 py-3 font-bold">Departemen</th>
              <th className="px-4 py-3 font-bold">Batas Waktu (Deadline)</th>
              <th className="px-4 py-3 font-bold">Pengulangan (Recurring)</th>
              <th className="px-4 py-3 font-bold">Target GPS</th>
              <th className="px-4 py-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredTasks.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                  <div>{t.taskTitle}</div>
                  <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">{t.taskId}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold block w-max">
                    {t.assignedType}
                  </span>
                  <div className="font-bold text-slate-800 dark:text-slate-200 mt-1">{t.assigneeName}</div>
                  <span className="text-[10px] text-slate-400">{t.assigneeRole}</span>
                </td>
                <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                  {t.department}
                </td>
                <td className="px-4 py-3.5 font-medium text-slate-600 dark:text-slate-400">
                  {new Date(t.deadline).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                </td>
                <td className="px-4 py-3.5">
                  {t.isRecurring ? (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold flex items-center gap-1 w-max">
                      <RefreshCw className="h-3 w-3" /> {t.recurringInterval || 'Rutih'}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[10px]">Satu Kali Execution</span>
                  )}
                </td>
                <td className="px-4 py-3.5">
                  <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200 font-bold">
                    <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                    {t.gpsTarget.blockCode}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      t.status === 'Selesai'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                        : t.status === 'Sedang Dikerjakan'
                        ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
