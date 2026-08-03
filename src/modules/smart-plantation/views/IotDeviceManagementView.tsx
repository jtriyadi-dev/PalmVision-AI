import React, { useState } from 'react';
import {
  Cpu,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Wifi,
  WifiOff,
  Battery,
  MapPin,
  QrCode,
  Layers,
  Settings,
  RefreshCw,
  Edit,
  Trash2
} from 'lucide-react';
import { mockIotDevices, mockDeviceGroups } from '../mockData';
import { IotDevice } from '../types';

export const IotDeviceManagementView: React.FC = () => {
  const [devices, setDevices] = useState<IotDevice[]>(mockIotDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // New device form state
  const [newDevice, setNewDevice] = useState<Partial<IotDevice>>({
    deviceId: `SENS-${Math.floor(100 + Math.random() * 900)}`,
    deviceName: '',
    deviceType: 'WEATHER_STATION',
    serialNumber: '',
    manufacturer: '',
    firmwareVersion: 'v1.0.0',
    protocol: 'LORAWAN',
    simNumber: '',
    imei: '',
    macAddress: '',
    companyName: 'PT Nusantara Palm Abadi',
    estateName: 'Riau Central Estate',
    divisionName: 'Division 01',
    blockCode: 'BLK-A01',
    gpsCoordinate: '0.5000° N, 101.4400° E',
    installationDate: new Date().toISOString().split('T')[0],
    lastMaintenanceDate: new Date().toISOString().split('T')[0],
    batteryPercent: 100,
    status: 'ONLINE',
    healthScore: 'EXCELLENT'
  });

  const filteredDevices = devices.filter(dev => {
    const matchesSearch =
      dev.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dev.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'ALL' || dev.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRegisterDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDevice.deviceName || !newDevice.serialNumber) return;

    const created: IotDevice = {
      id: `dev-${Date.now()}`,
      deviceId: newDevice.deviceId || `DEV-${Date.now()}`,
      deviceName: newDevice.deviceName,
      deviceType: newDevice.deviceType || 'WEATHER_STATION',
      serialNumber: newDevice.serialNumber,
      manufacturer: newDevice.manufacturer || 'PalmVision Hardware',
      firmwareVersion: newDevice.firmwareVersion || 'v1.0.0',
      protocol: newDevice.protocol || 'LORAWAN',
      simNumber: newDevice.simNumber || '-',
      imei: newDevice.imei || '-',
      macAddress: newDevice.macAddress || '70:B3:D5:00:00:00',
      companyName: newDevice.companyName || 'PT Nusantara Palm Abadi',
      estateName: newDevice.estateName || 'Riau Central Estate',
      divisionName: newDevice.divisionName || 'Division 01',
      blockCode: newDevice.blockCode || 'BLK-A01',
      gpsCoordinate: newDevice.gpsCoordinate || '0.5000° N, 101.4400° E',
      installationDate: newDevice.installationDate || '2026-08-03',
      lastMaintenanceDate: newDevice.lastMaintenanceDate || '2026-08-03',
      batteryPercent: newDevice.batteryPercent || 100,
      status: 'ONLINE',
      healthScore: 'EXCELLENT'
    };

    setDevices([created, ...devices]);
    setShowRegisterModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Summary Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">IoT Device Registry & Asset Management</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage LoRaWAN, Cellular NB-IoT, Modbus, GPS, and Weather Station hardware across all plantation estates.
          </p>
        </div>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>Register New IoT Device</span>
        </button>
      </div>

      {/* Device Groups Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {mockDeviceGroups.map(group => (
          <div
            key={group.id}
            onClick={() => setSelectedGroup(group.groupCode)}
            className={`p-3.5 rounded-xl border transition cursor-pointer ${
              selectedGroup === group.groupCode
                ? 'bg-emerald-950/60 border-emerald-500 text-white shadow-md'
                : 'bg-slate-800/70 border-slate-700/70 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
              <span>{group.category}</span>
              <span className="text-emerald-400">{group.onlineCount}/{group.totalDevices}</span>
            </div>
            <div className="text-xs font-bold text-white mt-1 truncate">{group.groupName}</div>
            <div className="mt-2 text-[10px] text-slate-400 truncate">{group.description}</div>
          </div>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-800/80 p-4 rounded-xl border border-slate-700/70">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Device ID, Name, Serial Number, IMEI..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter className="h-4 w-4" />
            <span>Status:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ONLINE">Online Only</option>
              <option value="OFFLINE">Offline Only</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </div>

          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStatus('ALL');
              setSelectedGroup('ALL');
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs text-slate-300 transition flex items-center gap-1"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* IoT Device Table */}
      <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/50">
                <th className="py-3 px-4 font-semibold">Device Info</th>
                <th className="py-3 px-4 font-semibold">Type & Protocol</th>
                <th className="py-3 px-4 font-semibold">Hardware Identity</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Installation & Maint</th>
                <th className="py-3 px-4 font-semibold">Battery & Health</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-slate-200">
              {filteredDevices.map(dev => (
                <tr key={dev.id} className="hover:bg-slate-700/30 transition">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm">{dev.deviceName}</div>
                    <div className="text-[11px] font-mono text-emerald-400">{dev.deviceId}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-200">{dev.deviceType}</div>
                    <div className="text-[10px] font-bold text-teal-400">{dev.protocol} | {dev.firmwareVersion}</div>
                  </td>
                  <td className="py-3 px-4 text-[11px] font-mono text-slate-300 space-y-0.5">
                    <div>SN: {dev.serialNumber}</div>
                    <div className="text-[10px] text-slate-400">IMEI: {dev.imei}</div>
                    <div className="text-[10px] text-slate-500">MAC: {dev.macAddress}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-200">{dev.estateName}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" /> {dev.blockCode} ({dev.gpsCoordinate})
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[11px] text-slate-300">
                    <div>Installed: {dev.installationDate}</div>
                    <div className="text-[10px] text-slate-400">Last Maint: {dev.lastMaintenanceDate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Battery className={`h-4 w-4 ${dev.batteryPercent > 50 ? 'text-emerald-400' : 'text-amber-400'}`} />
                      <span className="font-bold text-slate-200">{dev.batteryPercent}%</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold mt-1 inline-block ${
                      dev.healthScore === 'EXCELLENT' ? 'bg-emerald-500/20 text-emerald-300' :
                      dev.healthScore === 'GOOD' ? 'bg-blue-500/20 text-blue-300' :
                      dev.healthScore === 'WARNING' ? 'bg-amber-500/20 text-amber-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      Health: {dev.healthScore}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      dev.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      dev.status === 'MAINTENANCE' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {dev.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Device Registration */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="h-5 w-5 text-emerald-400" />
                Register New IoT Field Device
              </h3>
              <button onClick={() => setShowRegisterModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleRegisterDevice} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Device Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Peat Soil Moisture Probe Node 5"
                    value={newDevice.deviceName}
                    onChange={e => setNewDevice({ ...newDevice, deviceName: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Device Type</label>
                  <select
                    value={newDevice.deviceType}
                    onChange={e => setNewDevice({ ...newDevice, deviceType: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="WEATHER_STATION">Weather Station</option>
                    <option value="WATER_SENSOR">Water / Canal Sensor</option>
                    <option value="GPS_TRACKER">GPS Vehicle Tracker</option>
                    <option value="SOIL_SENSOR">Soil Moisture Probe</option>
                    <option value="FUEL_SENSOR">Fuel Level Sensor</option>
                    <option value="DRONE">Drone Unit</option>
                    <option value="GATEWAY">IoT Gateway Tower</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Serial Number (SN)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SN-2026-9901A"
                    value={newDevice.serialNumber}
                    onChange={e => setNewDevice({ ...newDevice, serialNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Communication Protocol</label>
                  <select
                    value={newDevice.protocol}
                    onChange={e => setNewDevice({ ...newDevice, protocol: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="LORAWAN">LoRaWAN (868/915 MHz)</option>
                    <option value="NB_IOT">Cellular NB-IoT</option>
                    <option value="MQTT">MQTT Broker (TLS)</option>
                    <option value="HTTP">HTTPS Rest API</option>
                    <option value="WEBSOCKET">WebSocket Stream</option>
                    <option value="MODBUS">Modbus RTU/TCP</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">SIM Card Number / IMEI</label>
                  <input
                    type="text"
                    placeholder="e.g. +6281299887766"
                    value={newDevice.simNumber}
                    onChange={e => setNewDevice({ ...newDevice, simNumber: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estate & Target Block</label>
                  <input
                    type="text"
                    placeholder="e.g. Riau Central Estate - Block A12"
                    value={newDevice.blockCode}
                    onChange={e => setNewDevice({ ...newDevice, blockCode: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-700 text-slate-300 hover:bg-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 font-bold shadow-md"
                >
                  Save Device Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
