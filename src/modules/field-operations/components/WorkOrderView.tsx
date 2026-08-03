import React, { useState } from 'react';
import {
  FileText,
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  Paperclip,
  ChevronDown,
  Edit,
  Trash2,
  X,
} from 'lucide-react';
import { WorkOrderRecord, WorkOrderStatus, WorkOrderPriority, FieldActivityCategory } from '../types';

interface WorkOrderViewProps {
  workOrders: WorkOrderRecord[];
  onAddWorkOrder: (wo: WorkOrderRecord) => void;
  onUpdateStatus: (id: string, status: WorkOrderStatus) => void;
}

export const WorkOrderView: React.FC<WorkOrderViewProps> = ({
  workOrders,
  onAddWorkOrder,
  onUpdateStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New WO form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FieldActivityCategory>('Pemupukan');
  const [blockCode, setBlockCode] = useState('BLK-A01');
  const [priority, setPriority] = useState<WorkOrderPriority>('Tinggi');
  const [mandorName, setMandorName] = useState('Mandor Supriadi');
  const [supervisorName, setSupervisorName] = useState('Agus Purnomo, S.P.');
  const [teamName, setTeamName] = useState('Regu Pemupukan Alfa');
  const [targetQuantity, setTargetQuantity] = useState('3.5 Ton Pupuk');
  const [estimatedHours, setEstimatedHours] = useState(6);
  const [description, setDescription] = useState('');

  const filteredWO = workOrders.filter((wo) => {
    const matchesSearch =
      wo.woNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.mandorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.blockCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || wo.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || wo.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateWO = (e: React.FormEvent) => {
    e.preventDefault();
    const newWO: WorkOrderRecord = {
      id: `wo-${Date.now()}`,
      woNumber: `WO-2025-05-${Math.floor(100 + Math.random() * 900)}`,
      title,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      category,
      companyName: 'PT Nusantara Palm Lestari',
      estateName: 'Sei Buatan Estate',
      divisionName: 'Divisi I',
      afdelingName: 'Afdeling I',
      blockCode,
      subBlockCode: `${blockCode}-1`,
      priority,
      description,
      mandorName,
      supervisorName,
      teamName,
      teamMembersCount: 10,
      estimatedHours,
      targetQuantity,
      status: 'Assigned',
      attachmentsCount: 1,
      gpsLocation: { lat: 0.8145, lng: 101.4556, locationName: `Blok ${blockCode}` },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onAddWorkOrder(newWO);
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const getStatusBadgeClass = (st: WorkOrderStatus) => {
    switch (st) {
      case 'Completed':
        return 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400';
      case 'In Progress':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400';
      case 'Assigned':
      case 'Accepted':
        return 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400';
      case 'Paused':
        return 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400';
      case 'Cancelled':
      case 'Rejected':
        return 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400';
      default:
        return 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Controls & Search Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari WO, Mandor, Blok..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-hidden"
          >
            <option value="All">Semua Status WO</option>
            <option value="Draft">Draft</option>
            <option value="Assigned">Assigned</option>
            <option value="Accepted">Accepted</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Paused">Paused</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-hidden"
          >
            <option value="All">Semua Prioritas</option>
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Tinggi">Tinggi</option>
            <option value="Darurat">Darurat</option>
          </select>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Buat Work Order Baru</span>
        </button>
      </div>

      {/* Work Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWO.map((wo) => (
          <div
            key={wo.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500/50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-extrabold">
                    {wo.woNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-[10px] font-bold">
                    {wo.category}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1.5">
                  {wo.title}
                </h3>
              </div>

              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${getStatusBadgeClass(wo.status)}`}>
                {wo.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl leading-relaxed">
              {wo.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-0.5">
                <span className="text-slate-400 text-[10px] block">Mandor & Regu</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{wo.mandorName}</span>
                <span className="text-[10px] text-slate-500 block">{wo.teamName}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 space-y-0.5">
                <span className="text-slate-400 text-[10px] block">Lokasi Blok & GPS</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{wo.estateName}</span>
                <span className="text-[10px] text-slate-500 block">{wo.blockCode} • {wo.subBlockCode}</span>
              </div>
            </div>

            {/* Target & Hours */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800 text-slate-500">
              <span>Target: <strong className="text-slate-800 dark:text-slate-200">{wo.targetQuantity}</strong></span>
              <span>Estimasi: <strong className="text-slate-800 dark:text-slate-200">{wo.estimatedHours} Jam</strong></span>
            </div>

            {/* Quick Status Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Paperclip className="h-3 w-3" /> {wo.attachmentsCount} Lampiran
              </span>

              <div className="flex items-center gap-1.5">
                {wo.status !== 'Completed' && (
                  <button
                    onClick={() => onUpdateStatus(wo.id, 'Completed')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold cursor-pointer"
                  >
                    Set Completed
                  </button>
                )}
                {wo.status === 'Assigned' && (
                  <button
                    onClick={() => onUpdateStatus(wo.id, 'In Progress')}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold cursor-pointer"
                  >
                    Start Work
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE WORK ORDER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Buat Work Order Digital Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWO} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Judul Pekerjaan WO</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Aplikasi Pemupukan NPK Susulan Blok A01"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Kategori Pekerjaan</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Pemupukan">Pemupukan</option>
                    <option value="Penyemprotan">Penyemprotan</option>
                    <option value="Pemangkasan">Pemangkasan</option>
                    <option value="Perawatan Jalan">Perawatan Jalan</option>
                    <option value="Drainase">Drainase</option>
                    <option value="Pengendalian Hama & Penyakit">Hama & Penyakit</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Tingkat Prioritas</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Rendah">Rendah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Tinggi">Tinggi</option>
                    <option value="Darurat">Darurat</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Kode Blok Kebun</label>
                  <input
                    type="text"
                    required
                    value={blockCode}
                    onChange={(e) => setBlockCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Nama Mandor Penanggungjawab</label>
                  <input
                    type="text"
                    required
                    value={mandorName}
                    onChange={(e) => setMandorName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Target Volume Output</label>
                  <input
                    type="text"
                    required
                    value={targetQuantity}
                    onChange={(e) => setTargetQuantity(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Estimasi Durasi (Jam)</label>
                  <input
                    type="number"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Deskripsi & Instruksi Kerja Lapangan</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Instruksi spesifik dosis, metode, atau standar K3..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer"
                >
                  Simpan & Assign Work Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
