import React, { useState } from 'react';
import { ScrollableSubNav, TabItem } from '../../../components/ScrollableSubNav';
import {
  Scale,
  Truck,
  Building2,
  QrCode,
  FileText,
  Clock,
  CheckCircle2,
  Plus,
  ArrowRight,
} from 'lucide-react';

import {
  WeighbridgeRecord,
  TransportDispatchRecord,
  MillDeliveryRecord,
} from '../types';
import { useEnterpriseData } from '../../../context/EnterpriseDataContext';

interface WeighbridgeTransportViewProps {
  weighbridgeRecords: WeighbridgeRecord[];
  dispatches: TransportDispatchRecord[];
  deliveries: MillDeliveryRecord[];
  onAddWeighbridge: (wb: WeighbridgeRecord) => void;
  onAddDispatch: (dispatch: TransportDispatchRecord) => void;
}

export const WeighbridgeTransportView: React.FC<WeighbridgeTransportViewProps> = ({
  weighbridgeRecords,
  dispatches,
  deliveries,
  onAddWeighbridge,
  onAddDispatch,
}) => {
  const { addLiveEvent } = useEnterpriseData();
  const [activeTab, setActiveTab] = useState<'weighbridge' | 'dispatch' | 'mill'>('weighbridge');
  const [isWbModalOpen, setIsWbModalOpen] = useState(false);

  // Form State Weighbridge
  const [truckNo, setTruckNo] = useState('BK 8492 C');
  const [driverName, setDriverName] = useState('Sujono (Driver 01)');
  const [grossWeightKg, setGrossWeightKg] = useState(25400);
  const [tareWeightKg, setTareWeightKg] = useState(8200);
  const [supplierEstate, setSupplierEstate] = useState('Nusa Indah Estate (Afdeling A)');

  const netWeightKg = Math.max(0, grossWeightKg - tareWeightKg);

  const handleWbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketNo = `WB-PKS1-20260804-00${weighbridgeRecords.length + 1}`;
    const newWb: WeighbridgeRecord = {
      id: `wb-${Date.now()}`,
      weighTicketNo: ticketNo,
      date: new Date().toISOString().split('T')[0],
      timeIn: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      timeOut: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      truckNo,
      driverName,
      grossWeightKg,
      tareWeightKg,
      netWeightKg,
      supplierEstate,
      millName: 'PKS PalmVision Central Mill',
      status: 'Completed',
      qrCodeTicket: `QR-${ticketNo}`,
    };
    onAddWeighbridge(newWb);

    addLiveEvent({
      module: 'mill',
      moduleLabel: 'POS TIMBANGAN PKS',
      title: `Tiket Timbang Selesai: ${ticketNo}`,
      detail: `Truk ${truckNo} (${driverName}) | Netto TBS: ${netWeightKg.toLocaleString('id-ID')} Kg | Asal: ${supplierEstate}`,
      severity: 'success',
      actionLink: { module: 'harvest', label: 'Buka Pos Timbangan' }
    });

    setIsWbModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Switch Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            Weighbridge Management & Transport Dispatch
          </h2>
          <p className="text-xs text-slate-500">
            Penimbangan Jembatan Timbang PKS, Surat Pengantar Tandan (SPT), Armada Truk & Rendemen Mill
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
          <div className="flex-1 min-w-0">
            <ScrollableSubNav
              items={[
                { id: 'weighbridge', label: `Jembatan Timbang (${weighbridgeRecords.length})`, icon: Scale },
                { id: 'dispatch', label: `Dispatch Truk (${dispatches.length})`, icon: Truck },
                { id: 'mill', label: `Delivery to Mill (${deliveries.length})`, icon: Building2 },
              ]}
              activeId={activeTab}
              onChange={(id) => setActiveTab(id as any)}
              activeColorClass="bg-emerald-600 text-white shadow-md"
            />
          </div>

          {activeTab === 'weighbridge' && (
            <button
              onClick={() => setIsWbModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-all flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0 ml-auto sm:ml-0"
            >
              <Plus className="h-4 w-4" />
              <span>Input Penimbangan</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Tab View */}
      {activeTab === 'weighbridge' && (
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3 font-bold">Nomor Slip Timbang</th>
                  <th className="px-4 py-3 font-bold">Truk & Supir</th>
                  <th className="px-4 py-3 font-bold">Asal Estate</th>
                  <th className="px-4 py-3 font-bold">Bruto (Kg)</th>
                  <th className="px-4 py-3 font-bold">Tara (Kg)</th>
                  <th className="px-4 py-3 font-bold">Netto TBS (Kg)</th>
                  <th className="px-4 py-3 font-bold">PKS Tujuan</th>
                  <th className="px-4 py-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {weighbridgeRecords.map((w) => (
                  <tr key={w.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white">
                      {w.weighTicketNo}
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {w.date} {w.timeIn}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-800 dark:text-slate-200">
                      {w.truckNo}
                      <span className="text-[10px] text-slate-500 block">{w.driverName}</span>
                    </td>
                    <td className="px-4 py-3.5 font-medium">{w.supplierEstate}</td>
                    <td className="px-4 py-3.5 font-bold text-slate-800 dark:text-slate-200">
                      {w.grossWeightKg.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500">
                      {w.tareWeightKg.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3.5 font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      {w.netWeightKg > 0 ? `${w.netWeightKg.toLocaleString('id-ID')} Kg` : 'Proses Tara...'}
                    </td>
                    <td className="px-4 py-3.5 font-medium text-slate-600 dark:text-slate-400">
                      {w.millName}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          w.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                        }`}
                      >
                        {w.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'dispatch' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dispatches.map((d) => (
            <div
              key={d.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    {d.dispatchNo}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Truk {d.truckNo} ({d.driverName})
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  {d.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Titik Pengambilan TPH:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {d.tphCollectionPoints.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimasi Tonase TBS:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    {d.estimatedTonnageTon} Ton
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PKS Tujuan:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{d.destinationMill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Jam Berangkat & ETA:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    {d.departureTime} ➔ {d.arrivalTimeEstimate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'mill' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliveries.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    {m.deliveryCode}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{m.millName}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[10px] font-bold">
                  {m.documentStatus}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-[10px] text-slate-500 block">Netto TBS</span>
                  <span className="font-black text-slate-900 dark:text-white text-sm">
                    {m.netWeightTon} Ton
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                    Rendemen CPO
                  </span>
                  <span className="font-black text-emerald-700 dark:text-emerald-300 text-sm">
                    {m.cpoExtractionRatePct}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold block">
                    Rendemen Kernel
                  </span>
                  <span className="font-black text-blue-700 dark:text-blue-300 text-sm">
                    {m.kernelExtractionRatePct}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Weighbridge */}
      {isWbModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 max-w-lg w-full space-y-4 shadow-xl animate-scaleIn">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Input Transaksi Jembatan Timbang PKS
            </h3>
            <form onSubmit={handleWbSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Nomor Truk</label>
                  <input
                    type="text"
                    required
                    value={truckNo}
                    onChange={(e) => setTruckNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Nama Supir</label>
                  <input
                    type="text"
                    required
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Berat Bruto (Kg)</label>
                  <input
                    type="number"
                    required
                    value={grossWeightKg}
                    onChange={(e) => setGrossWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Berat Tara (Kg)</label>
                  <input
                    type="number"
                    required
                    value={tareWeightKg}
                    onChange={(e) => setTareWeightKg(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between">
                <span className="font-bold text-emerald-800 dark:text-emerald-300">Kalkulasi Netto TBS:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                  {netWeightKg.toLocaleString('id-ID')} Kg
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsWbModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 cursor-pointer"
                >
                  Cetak Slip Timbang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
