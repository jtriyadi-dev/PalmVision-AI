import React, { useState } from 'react';
import {
  Radio,
  Server,
  Activity,
  Truck,
  Gauge,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  RefreshCw,
  Terminal
} from 'lucide-react';
import { mockSensorGateways, mockTelemetryLogs } from '../mockData';

export const SensorGatewayTelemetryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GATEWAYS' | 'TELEMETRY'>('GATEWAYS');
  const [liveStream, setLiveStream] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="h-6 w-6 text-teal-400" />
            <h2 className="text-lg font-bold text-white">Sensor Gateway & Fleet Telemetry Stream</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time LoRaWAN towers, Modbus/OPC-UA edge brokers, and vehicle GPS telemetry data pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('GATEWAYS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'GATEWAYS' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Field Gateways ({mockSensorGateways.length})
          </button>
          <button
            onClick={() => setActiveTab('TELEMETRY')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'TELEMETRY' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Telemetry Logs ({mockTelemetryLogs.length})
          </button>
        </div>
      </div>

      {activeTab === 'GATEWAYS' ? (
        <div className="space-y-6">
          {/* Gateways Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockSensorGateways.map(gw => (
              <div key={gw.id} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      <Server className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{gw.gatewayName}</h3>
                      <p className="text-[10px] font-mono text-teal-400">{gw.gatewayCode}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    gw.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {gw.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                    <span className="text-slate-400">Edge IP Address:</span>
                    <span className="font-mono text-white">{gw.ipAddress}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                    <span className="text-slate-400">Protocols Supported:</span>
                    <div className="flex gap-1">
                      {gw.protocolsSupported.map(p => (
                        <span key={p} className="px-1.5 py-0.5 rounded bg-slate-700 text-teal-300 text-[9px] font-mono">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                    <span className="text-slate-400">Connected Field Devices:</span>
                    <span className="font-bold text-emerald-400">{gw.connectedDevicesCount} Nodes</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-700/60 text-slate-300">
                    <span className="text-slate-400">Data Throughput:</span>
                    <span className="font-mono text-cyan-300">{gw.throughputKbps} Kbps</span>
                  </div>
                  <div className="flex justify-between py-1 text-slate-300">
                    <span className="text-slate-400">Last Heartbeat Ping:</span>
                    <span className="text-slate-400 text-[10px]">{gw.lastHeartbeat}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button className="w-full py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5">
                    <Activity className="h-3.5 w-3.5 text-teal-400" />
                    <span>View Gateway Traffic Logs</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Supported Protocols Card */}
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
            <h3 className="text-sm font-bold text-white mb-3">Enterprise IoT Protocol Capabilities</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 text-center">
              {[
                { name: 'MQTT', status: 'Active (TLS)', color: 'border-emerald-500/40 text-emerald-400' },
                { name: 'LoRaWAN', status: 'Active (868/915)', color: 'border-emerald-500/40 text-emerald-400' },
                { name: 'NB-IoT', status: 'Active (LTE-M)', color: 'border-emerald-500/40 text-emerald-400' },
                { name: 'HTTP/REST', status: 'Active (JSON)', color: 'border-emerald-500/40 text-emerald-400' },
                { name: 'WebSocket', status: 'Streaming', color: 'border-emerald-500/40 text-emerald-400' },
                { name: 'Modbus RTU', status: 'Mill PLC Ready', color: 'border-teal-500/40 text-teal-400' },
                { name: 'OPC-UA', status: 'SCADA Bridge', color: 'border-teal-500/40 text-teal-400' },
                { name: 'Custom API', status: 'Webhook Ready', color: 'border-indigo-500/40 text-indigo-400' }
              ].map(proto => (
                <div key={proto.name} className={`p-3 rounded-xl bg-slate-900/60 border ${proto.color}`}>
                  <div className="text-xs font-bold text-white">{proto.name}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{proto.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-5 w-5 text-teal-400" />
              <h3 className="text-sm font-bold text-white">Live Asset Telemetry Terminal</h3>
            </div>

            <button
              onClick={() => setLiveStream(!liveStream)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                liveStream ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40' : 'bg-slate-700 text-slate-300'
              }`}
            >
              <Activity className={`h-3.5 w-3.5 ${liveStream ? 'animate-pulse text-emerald-400' : ''}`} />
              <span>{liveStream ? 'Live Auto-Refresh ON' : 'Paused'}</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-700 text-slate-400 bg-slate-900/50">
                  <th className="py-2.5 px-3 font-semibold">Asset Code</th>
                  <th className="py-2.5 px-3 font-semibold">Asset Category</th>
                  <th className="py-2.5 px-3 font-semibold">GPS Coordinate</th>
                  <th className="py-2.5 px-3 font-semibold">Speed</th>
                  <th className="py-2.5 px-3 font-semibold">Engine Hours</th>
                  <th className="py-2.5 px-3 font-semibold">Fuel Cons. (L/h)</th>
                  <th className="py-2.5 px-3 font-semibold">State</th>
                  <th className="py-2.5 px-3 font-semibold">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-200">
                {mockTelemetryLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-700/30 font-mono transition">
                    <td className="py-2.5 px-3 font-bold text-teal-300">{log.assetCode}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px]">
                        {log.assetType}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{log.locationGps}</td>
                    <td className="py-2.5 px-3 font-bold text-white">{log.speedKmh} km/h</td>
                    <td className="py-2.5 px-3 text-amber-300">{log.engineHoursHm} hrs</td>
                    <td className="py-2.5 px-3 text-rose-300">{log.fuelConsumptionLph} L/h</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                        {log.operationalState}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400 text-[10px]">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
