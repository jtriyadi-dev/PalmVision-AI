import React, { useState } from 'react';
import {
  Truck,
  HardHat,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Clock,
  User,
  Calendar,
  Fuel,
  CheckCircle2,
  Filter,
  Search,
  Plus,
} from 'lucide-react';
import {
  FleetVehicle,
  HeavyEquipment,
  EquipmentUtilizationLog,
} from '../types';

interface FleetHeavyEquipmentViewProps {
  vehicles?: FleetVehicle[];
  heavyEquipment?: HeavyEquipment[];
  utilizationLogs?: EquipmentUtilizationLog[];
  onAddVehicle?: (newVehicle: FleetVehicle) => void;
}

export const FleetHeavyEquipmentView: React.FC<FleetHeavyEquipmentViewProps> = ({
  vehicles = [],
  heavyEquipment = [],
  utilizationLogs = [],
  onAddVehicle = () => {},
}) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'heavy' | 'utilization'>('vehicles');

  // Modal State for Input Data Kendaraan
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields State
  const [plateNumber, setPlateNumber] = useState('');
  const [brandModel, setBrandModel] = useState('Mitsubishi Fuso Canter 136 PS');
  const [vehicleType, setVehicleType] = useState<FleetVehicle['vehicleType']>('Truck 6x4');
  const [driverName, setDriverName] = useState('');
  const [simType, setSimType] = useState<FleetVehicle['simType']>('SIM B2');
  const [stnkExpiry, setStnkExpiry] = useState('2027-12-31');
  const [kirExpiry, setKirExpiry] = useState('2026-11-30');
  const [insuranceStatus, setInsuranceStatus] = useState<FleetVehicle['insuranceStatus']>('Active');
  const [gpsDeviceCode, setGpsDeviceCode] = useState('');
  const [status, setStatus] = useState<FleetVehicle['status']>('Operational');
  const [engineNumber, setEngineNumber] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumber || !brandModel) return;

    const newCode = `AST-VEH-${Math.floor(100 + Math.random() * 900)}`;
    const newVeh: FleetVehicle = {
      id: `veh-${Date.now()}`,
      assetId: `ast-${Date.now()}`,
      assetCode: newCode,
      plateNumber: plateNumber.toUpperCase(),
      vehicleType,
      brandModel,
      engineNumber: engineNumber || `4D34-T${Math.floor(10000 + Math.random() * 90000)}`,
      chassisNumber: chassisNumber || `MHMFE74P${Math.floor(100000 + Math.random() * 900000)}`,
      driverName: driverName || 'Driver Belum Ditunjuk',
      simType,
      stnkExpiry: stnkExpiry || '2027-12-31',
      kirExpiry: kirExpiry || '2026-12-31',
      taxExpiry: '2027-06-30',
      insuranceStatus,
      gpsDeviceCode: gpsDeviceCode ? gpsDeviceCode.toUpperCase() : `GPS-TRK-${Math.floor(1000 + Math.random() * 9000)}`,
      status,
    };

    onAddVehicle(newVeh);
    setShowAddVehicleModal(false);
    setToastMessage(`Kendaraan Baru ${plateNumber.toUpperCase()} (${brandModel}) berhasil diinput ke armada fleet!`);
    setTimeout(() => setToastMessage(null), 4000);

    // Reset Form
    setPlateNumber('');
    setDriverName('');
    setEngineNumber('');
    setChassisNumber('');
    setGpsDeviceCode('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Truck className="h-5 w-5 text-blue-400" /> Fleet & Heavy Equipment Operations
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manajemen Armada Kendaraan Operasional Kebun & Alat Berat: Legalitas STNK/KIR, Jam Kerja Engine & Produktivitas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'vehicles' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Armada Kendaraan ({vehicles.length})
            </button>
            <button
              onClick={() => setActiveTab('heavy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'heavy' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Alat Berat ({heavyEquipment.length})
            </button>
            <button
              onClick={() => setActiveTab('utilization')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'utilization' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Utilization Log
            </button>
          </div>

          <button
            onClick={() => setShowAddVehicleModal(true)}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Input Data Kendaraan</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-blue-950 border border-blue-800 text-blue-300 text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-blue-400 hover:text-white cursor-pointer font-bold">✕</button>
        </div>
      )}

      {/* Tab 1: Vehicles */}
      {activeTab === 'vehicles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((v) => (
            <div key={v.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-base font-black text-emerald-400">{v.plateNumber}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{v.brandModel}</h3>
                  <span className="text-xs text-slate-400">{v.vehicleType}</span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    v.status === 'Operational' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {v.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold">Driver Assigned:</span>
                  <p className="font-bold text-white">{v.driverName}</p>
                  <span className="text-[10px] text-emerald-400">{v.simType}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-bold">GPS Tracker:</span>
                  <p className="font-mono text-xs font-bold text-cyan-400">{v.gpsDeviceCode}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Masa STNK:</span>
                  <span className="font-mono text-slate-200">{v.stnkExpiry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Masa Uji KIR:</span>
                  <span className="font-mono text-slate-200">{v.kirExpiry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status Asuransi:</span>
                  <span className="font-bold text-emerald-400">{v.insuranceStatus}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Heavy Equipment */}
      {activeTab === 'heavy' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {heavyEquipment.map((he) => (
            <div key={he.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-400">{he.equipmentCode}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{he.brandModel}</h3>
                  <span className="text-xs text-slate-400">{he.equipmentType}</span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    he.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                  }`}
                >
                  {he.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block">Engine Hour</span>
                  <span className="font-mono font-black text-emerald-400 text-sm mt-0.5 block">{he.workingHoursTotal} H</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block">Idle Hour</span>
                  <span className="font-mono font-black text-amber-400 text-sm mt-0.5 block">{he.idleHoursTotal} H</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold block">Cons. BBM Rate</span>
                  <span className="font-mono font-black text-cyan-400 text-sm mt-0.5 block">{he.fuelConsumptionLiters} L/H</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
                <span className="text-slate-400">Operator Utama: <strong className="text-white">{he.operatorName}</strong></span>
                <span className="font-bold text-emerald-400">{he.productivityRate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Equipment Utilization */}
      {activeTab === 'utilization' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Log Produktivitas & Jam Kerja Alat Berat</h3>
          <div className="space-y-3">
            {utilizationLogs.map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{log.equipmentCode}</span>
                    <span className="font-bold text-white">{log.equipmentName}</span>
                    <span className="text-slate-400">• Operator: {log.operatorName}</span>
                  </div>
                  <p className="text-slate-300 font-bold mt-1">Hasil Kerja: {log.workDoneUnit} ({log.estateBlock})</p>
                </div>

                <div className="text-right self-end sm:self-center space-y-0.5">
                  <span className="text-emerald-400 font-bold block">{log.workingHours} Jam Kerja • {log.fuelUsedLiters} L Fuel</span>
                  <span className="text-[10px] text-slate-400">Tanggal: {log.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal Input Data Kendaraan Baru */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-blue-400" />
                  <span>Input Data Kendaraan Baru (Fleet & Transport)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Registrasi unit kendaraan operasional kebun, legalitas STNK & KIR, pengemudi, serta GPS tracker.
                </p>
              </div>
              <button
                onClick={() => setShowAddVehicleModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-4 text-xs">
              {/* Grid 1: Identitas Kendaraan */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  1. Identitas & Spesifikasi Kendaraan
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Nomor Polisi (Plat Nomor) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: BM 8492 TE"
                      value={plateNumber}
                      onChange={(e) => setPlateNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-mono font-bold uppercase"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Merek & Model Tipe *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Mitsubishi Fuso Canter 136 PS"
                      value={brandModel}
                      onChange={(e) => setBrandModel(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Jenis Kendaraan</label>
                    <select
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                    >
                      <option value="Truck 6x4">Truk Transport TBS (Truck 6x4 / 4x2)</option>
                      <option value="Fuel Truck">Truk Tangki BBM / CPO (Fuel Truck)</option>
                      <option value="Water Truck">Truk Penyiram Jalan / Air (Water Truck)</option>
                      <option value="Pickup 4x4">Pickup Double/Single Cab 4x4 Operasional</option>
                      <option value="Bus">Bus Jemputan Karyawan & Anak Sekolah</option>
                      <option value="Car">Mobil Dinas Staff / Manager</option>
                      <option value="Ambulance & Emergency">Ambulans Kebun & Emergency</option>
                      <option value="Motorcycle">Sepeda Motor Patroli Mandor</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Status Operasional</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                    >
                      <option value="Operational">Operational (Aktif Beroperasi)</option>
                      <option value="Standby">Standby (Cadangan / Siap Tugas)</option>
                      <option value="In Workshop">In Workshop (Servis / Perbaikan)</option>
                      <option value="Breakdown">Breakdown (Rusak Berat)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Nomor Mesin</label>
                    <input
                      type="text"
                      placeholder="e.g. 4D34-T98821"
                      value={engineNumber}
                      onChange={(e) => setEngineNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Nomor Rangka (Chassis)</label>
                    <input
                      type="text"
                      placeholder="e.g. MHMFE74P900122"
                      value={chassisNumber}
                      onChange={(e) => setChassisNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Grid 2: Driver & Legalitas */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  2. Driver Assigned & Legalitas Surat
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Pengemudi / Driver Utama</label>
                    <input
                      type="text"
                      placeholder="Contoh: Supriadi (Driver Senior)"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Golongan SIM Driver</label>
                    <select
                      value={simType}
                      onChange={(e) => setSimType(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                    >
                      <option value="SIM B2">SIM B2 Umum (Truk Gandeng/Alat)</option>
                      <option value="SIM B1">SIM B1 Umum (Truk / Bus)</option>
                      <option value="SIM A">SIM A (Mobil / Pickup 4x4)</option>
                      <option value="SIM C">SIM C (Sepeda Motor)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Masa Berlaku STNK</label>
                    <input
                      type="date"
                      value={stnkExpiry}
                      onChange={(e) => setStnkExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Masa Uji KIR Kendaraan</label>
                    <input
                      type="date"
                      value={kirExpiry}
                      onChange={(e) => setKirExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Status Asuransi TLA/AllRisk</label>
                    <select
                      value={insuranceStatus}
                      onChange={(e) => setInsuranceStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-medium cursor-pointer"
                    >
                      <option value="Active">Aktif All-Risk / TLA</option>
                      <option value="Expiring Soon">Segera Perpanjang (Expiring)</option>
                      <option value="Expired">Kadaluarsa (Expired)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-1">
                  <label className="text-slate-400 font-bold block mb-1">Kode / ID GPS Tracker IoT</label>
                  <input
                    type="text"
                    placeholder="Contoh: GPS-TRK-9921-R1"
                    value={gpsDeviceCode}
                    onChange={(e) => setGpsDeviceCode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 cursor-pointer text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer text-xs shadow-lg flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Simpan Data Kendaraan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
