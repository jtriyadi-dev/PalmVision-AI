import React, { useState } from 'react';
import {
  Smartphone,
  Wifi,
  WifiOff,
  CheckCircle2,
  Camera,
  MapPin,
  Clock,
  Plus,
  Send,
  RefreshCw,
  User,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { WorkOrderRecord, AttendanceFieldRecord, DailyActivityRecord } from '../types';

interface MandorMobileViewProps {
  workOrders: WorkOrderRecord[];
  attendanceRecords: AttendanceFieldRecord[];
  dailyActivities: DailyActivityRecord[];
  onAddActivity: (act: DailyActivityRecord) => void;
}

export const MandorMobileView: React.FC<MandorMobileViewProps> = ({
  workOrders,
  attendanceRecords,
  dailyActivities,
  onAddActivity,
}) => {
  const [isOnline, setIsOnline] = useState<boolean>(false); // Simulate offline mode
  const [activeMobileTab, setActiveMobileTab] = useState<'tasks' | 'checkin' | 'new-act' | 'sync'>('tasks');
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(true);

  // Form state for new activity entry
  const [selectedWO, setSelectedWO] = useState<string>(workOrders[0]?.id || '');
  const [category, setCategory] = useState<string>('Pemupukan');
  const [blockCode, setBlockCode] = useState<string>('BLK-A01');
  const [workersCount, setWorkersCount] = useState<number>(12);
  const [workVolume, setWorkVolume] = useState<string>('3.5 Ton NPK');
  const [notes, setNotes] = useState<string>('Pemupukan piringan rata radius 1.5m');

  const handleSimulateAddActivity = () => {
    const newRecord: DailyActivityRecord = {
      id: `act-offline-${Date.now()}`,
      activityCode: `ACT-OFFLINE-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      timeStart: '08:00',
      timeEnd: '12:00',
      category: category as any,
      blockCode,
      estateName: 'Sei Buatan Estate',
      afdelingName: 'Afdeling I',
      mandorName: 'Mandor Supriadi (Mobile)',
      teamName: 'Regu Lapangan Alfa',
      workersCount,
      workVolume,
      weatherCondition: 'Cerah',
      photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      lat: 0.8145,
      lng: 101.4556,
      notes,
      isOfflineSynced: isOnline,
    };

    onAddActivity(newRecord);
    alert(`Aktivitas berhasil disimpan di HP (${isOnline ? 'Direct Online' : 'Offline Queue IDB'})`);
    setActiveMobileTab('tasks');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold">
            <Smartphone className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Mandor Mobile Interface Simulator
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                Responsive One-Hand Mode
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Desain teroptimasi untuk perangkat HP Android/iOS di lokasi kebun tanpa sinyal internet.
            </p>
          </div>
        </div>

        {/* Network Toggle Simulator */}
        <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-xl border border-slate-700">
          <span className="text-xs font-bold text-slate-300">Status Jaringan:</span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              isOnline
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-600 text-white animate-pulse'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4" />
                <span>ONLINE (4G Active)</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4" />
                <span>OFFLINE (No Signal)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Smartphone Mockup Container */}
      <div className="max-w-md mx-auto bg-slate-950 rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-hidden relative">
        {/* Phone Notch / Status Bar */}
        <div className="bg-slate-900 text-slate-300 px-6 py-2 flex items-center justify-between text-[11px] font-mono border-b border-slate-800">
          <span>09:41 AM</span>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Wifi className="h-3 w-3" /> 4G
              </span>
            ) : (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <WifiOff className="h-3 w-3" /> OFFLINE
              </span>
            )}
            <span>88% 🔋</span>
          </div>
        </div>

        {/* App Header Inside Phone */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-emerald-200 font-extrabold uppercase tracking-wider block">
              Mandor App • Sei Buatan Estate
            </span>
            <h3 className="font-extrabold text-sm text-white">Supriadi (Mandor Tanam)</h3>
          </div>
          <span className="px-2 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 text-[10px] font-extrabold border border-emerald-600/50">
            {isCheckedIn ? 'Status: HADIR' : 'Belum Check-In'}
          </span>
        </div>

        {/* Offline Banner Inside Phone */}
        {!isOnline && (
          <div className="bg-amber-500 text-slate-950 px-4 py-2 text-[11px] font-extrabold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <WifiOff className="h-3.5 w-3.5" />
              Mode Offline Aktif — Data tersimpan lokal
            </span>
            <span className="underline cursor-pointer">Queue: 2</span>
          </div>
        )}

        {/* Phone Body / Scrollable Screen */}
        <div className="p-4 space-y-4 min-h-[420px] max-h-[500px] overflow-y-auto bg-slate-900 text-slate-100">
          {/* TAB 1: TODAY'S TASKS */}
          {activeMobileTab === 'tasks' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>Work Order Hari Ini ({workOrders.length})</span>
                <span className="text-emerald-400 text-[10px]">Tap untuk update</span>
              </div>

              {workOrders.map((wo) => (
                <div
                  key={wo.id}
                  className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 hover:border-emerald-500 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-400 font-bold">{wo.woNumber}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {wo.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-xs leading-tight">{wo.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-emerald-400" />
                      {wo.blockCode}
                    </span>
                    <span>Target: {wo.targetQuantity}</span>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setActiveMobileTab('new-act')}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Plus className="h-4 w-4" />
                <span>Input Laporan Aktivitas Baru</span>
              </button>
            </div>
          )}

          {/* TAB 2: CHECK-IN / ABSENSI */}
          {activeMobileTab === 'checkin' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-3 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-500 mx-auto flex items-center justify-center text-emerald-400 font-bold text-xl">
                  📸
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Selfie & GPS Check-In</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Kebun Sei Buatan • Blok A01 (GPS: 0.8145, 101.4556)
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono font-bold flex items-center justify-center gap-1">
                  <ShieldCheck className="h-4 w-4" />
                  <span>QR Code Terverifikasi Lapangan</span>
                </div>

                <button
                  onClick={() => {
                    setIsCheckedIn(!isCheckedIn);
                    alert(`Status Absensi diubah: ${!isCheckedIn ? 'HADIR' : 'CHECK-OUT'}`);
                  }}
                  className={`w-full py-3 rounded-xl font-extrabold text-xs shadow-md transition-all cursor-pointer ${
                    isCheckedIn
                      ? 'bg-red-600 hover:bg-red-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isCheckedIn ? 'Quick Check-Out Lapangan' : 'Quick Check-In Lapangan'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: NEW ACTIVITY ENTRY */}
          {activeMobileTab === 'new-act' && (
            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-white text-xs border-b border-slate-800 pb-2">
                Input Laporan Aktivitas (Offline Ready)
              </h4>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold">Kategori Pekerjaan</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-hidden"
                >
                  <option value="Pemupukan">Pemupukan</option>
                  <option value="Penyemprotan">Penyemprotan</option>
                  <option value="Pemangkasan">Pemangkasan</option>
                  <option value="Perawatan Jalan">Perawatan Jalan</option>
                  <option value="Drainase">Drainase</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold">Blok Lokasi</label>
                  <input
                    type="text"
                    value={blockCode}
                    onChange={(e) => setBlockCode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-bold">Jumlah Pekerja</label>
                  <input
                    type="number"
                    value={workersCount}
                    onChange={(e) => setWorkersCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold">Hasil Volume Pekerjaan</label>
                <input
                  type="text"
                  value={workVolume}
                  onChange={(e) => setWorkVolume(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold">Catatan Lapangan</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-800 border border-dashed border-slate-600 text-center space-y-1">
                <Camera className="h-5 w-5 text-emerald-400 mx-auto" />
                <span className="text-[10px] font-bold text-slate-300 block">Foto Bukti (Geo-Tagged Active)</span>
                <span className="text-[9px] text-slate-500">Kamera HP • Lat: 0.8145, Lng: 101.4556</span>
              </div>

              <button
                onClick={handleSimulateAddActivity}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Simpan Laporan {isOnline ? '(Online)' : '(Offline IDB)'}</span>
              </button>
            </div>
          )}

          {/* TAB 4: OFFLINE SYNC */}
          {activeMobileTab === 'sync' && (
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Queue Antrian Sinkronisasi</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    2 Item Pending
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Data yang diinput saat offline tersimpan aman di database lokal HP Anda.
                </p>
              </div>

              <button
                onClick={() => alert('Sinkronisasi data offline ke server berhasil diselesaikan.')}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Jalankan Manual Sync Now</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation for Mobile UI */}
        <div className="bg-slate-900 border-t border-slate-800 p-2 grid grid-cols-4 gap-1 text-center text-[10px] font-bold text-slate-400">
          <button
            onClick={() => setActiveMobileTab('tasks')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeMobileTab === 'tasks' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Tugas WO</span>
          </button>

          <button
            onClick={() => setActiveMobileTab('checkin')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeMobileTab === 'checkin' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Absensi</span>
          </button>

          <button
            onClick={() => setActiveMobileTab('new-act')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeMobileTab === 'new-act' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'
            }`}
          >
            <Plus className="h-4 w-4" />
            <span>Input</span>
          </button>

          <button
            onClick={() => setActiveMobileTab('sync')}
            className={`p-2 rounded-xl flex flex-col items-center gap-1 cursor-pointer transition-colors ${
              activeMobileTab === 'sync' ? 'bg-emerald-600 text-white' : 'hover:bg-slate-800'
            }`}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Sync</span>
          </button>
        </div>
      </div>
    </div>
  );
};
