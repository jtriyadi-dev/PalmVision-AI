import React, { useState } from 'react';
import {
  Fuel,
  Disc,
  Battery,
  AlertTriangle,
  Plus,
  DollarSign,
  Droplet,
  Gauge,
  CheckCircle2,
  Filter,
  Search,
} from 'lucide-react';
import {
  FuelTank,
  FuelTransaction,
  TyreRecord,
  BatteryRecord,
} from '../types';

interface FuelManagementViewProps {
  tanks?: FuelTank[];
  transactions?: FuelTransaction[];
  tyreRecords?: TyreRecord[];
  batteryRecords?: BatteryRecord[];
}

export const FuelManagementView: React.FC<FuelManagementViewProps> = ({
  tanks = [],
  transactions = [],
  tyreRecords = [],
  batteryRecords = [],
}) => {
  const [activeTab, setActiveTab] = useState<'tanks' | 'transactions' | 'tyres' | 'batteries'>('tanks');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Fuel className="h-5 w-5 text-emerald-400" /> Manajemen Bahan Bakar (BBM), Ban & Aki
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitoring Tangki Induk Kebun, Dispenser BBM, Odometer/HM Unit, Rotasi Ban & Kesehatan Battery.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('tanks')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tanks' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Tangki BBM ({tanks.length})
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'transactions' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Transaksi Pengisian ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab('tyres')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tyres' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Ban ({tyreRecords.length})
          </button>
          <button
            onClick={() => setActiveTab('batteries')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'batteries' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Aki/Battery ({batteryRecords.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Fuel Tanks */}
      {activeTab === 'tanks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tanks.map((tank) => {
            const fillPercent = Math.round((tank.currentStockLiters / tank.capacityLiters) * 100);
            return (
              <div key={tank.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-400">{tank.tankCode}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{tank.tankName}</h3>
                    <span className="text-xs text-slate-400">{tank.locationName}</span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      tank.status === 'Normal' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    {tank.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-300">Stok BBM ({tank.fuelType})</span>
                    <span className="text-emerald-400 font-mono">
                      {tank.currentStockLiters.toLocaleString('id-ID')} / {tank.capacityLiters.toLocaleString('id-ID')} L ({fillPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-3 p-0.5 border border-slate-800">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        fillPercent < 25 ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${fillPercent}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Batas Minimal Alert: {tank.minStockAlertLiters.toLocaleString('id-ID')} L</span>
                  <button
                    onClick={() => alert(`Sistem otomatis mengajukan Purchase Request BBM Refill untuk ${tank.tankName}`)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] cursor-pointer"
                  >
                    Permintaan Refill Tank
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Fuel Transactions */}
      {activeTab === 'transactions' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">Riwayat Dispensing & Pengisian BBM Unit</h3>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-emerald-400">{tx.txCode}</span>
                    <span className="font-bold text-white">{tx.assetName} ({tx.assetCode})</span>
                  </div>
                  <p className="text-slate-400 mt-0.5">
                    Operator/Driver: {tx.driverOperator} • Tangki Sumber: {tx.tankName}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Tanggal: {tx.txDate} • Petugas Dispenser: {tx.dispenserOperator}
                  </p>
                </div>

                <div className="text-right self-end sm:self-center space-y-0.5">
                  <span className="text-emerald-400 font-black text-sm block">{tx.quantityLiters} Liter Solar</span>
                  <span className="text-slate-300 font-bold block">Rp {tx.totalCost.toLocaleString('id-ID')}</span>
                  {tx.odometerKm && <span className="text-[10px] text-slate-400">Odometer: {tx.odometerKm.toLocaleString('id-ID')} KM</span>}
                  {tx.hourMeterHours && <span className="text-[10px] text-slate-400">HM: {tx.hourMeterHours} Hours</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Tyres */}
      {activeTab === 'tyres' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tyreRecords.map((tyre) => (
            <div key={tyre.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400">{tyre.tyreCode}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{tyre.brand}</h4>
                  <span className="text-xs text-slate-400">Unit: {tyre.assetName} ({tyre.position})</span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    tyre.status === 'Good' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {tyre.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Wear Level Keausan</span>
                  <span className="font-bold text-rose-400 text-sm mt-0.5 block">{tyre.wearLevelPercent}%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Tekanan Angin</span>
                  <span className="font-bold text-cyan-400 text-sm mt-0.5 block">{tyre.pressurePsi} PSI</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Batteries */}
      {activeTab === 'batteries' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {batteryRecords.map((bat) => (
            <div key={bat.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono text-xs font-bold text-purple-400">{bat.batteryCode}</span>
                  <h4 className="text-sm font-bold text-white mt-0.5">{bat.brand}</h4>
                  <span className="text-xs text-slate-400">Unit: {bat.assetName}</span>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    bat.status === 'Optimal' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                  }`}
                >
                  {bat.status}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tegangan Output:</span>
                  <span className="font-bold text-white">{bat.voltage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tanggal Pasang:</span>
                  <span className="font-mono text-slate-300">{bat.installedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
