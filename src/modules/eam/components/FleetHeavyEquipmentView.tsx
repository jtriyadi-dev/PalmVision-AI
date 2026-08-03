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
}

export const FleetHeavyEquipmentView: React.FC<FleetHeavyEquipmentViewProps> = ({
  vehicles = [],
  heavyEquipment = [],
  utilizationLogs = [],
}) => {
  const [activeTab, setActiveTab] = useState<'vehicles' | 'heavy' | 'utilization'>('vehicles');

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

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'vehicles' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Armada Kendaraan ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('heavy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'heavy' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Alat Berat ({heavyEquipment.length})
          </button>
          <button
            onClick={() => setActiveTab('utilization')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'utilization' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Equipment Utilization Log
          </button>
        </div>
      </div>

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
    </div>
  );
};
