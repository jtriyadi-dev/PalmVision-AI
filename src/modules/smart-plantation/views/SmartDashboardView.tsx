import React from 'react';
import {
  Cpu,
  Wifi,
  WifiOff,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  Plane,
  Radio,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Sun,
  Activity,
  Layers,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { mockIotDevices, mockWeatherStations, mockDrones, mockSmartEvents, mockAiPredictions } from '../mockData';

export const SmartDashboardView: React.FC = () => {
  const onlineDevicesCount = mockIotDevices.filter(d => d.status === 'ONLINE').length;
  const offlineDevicesCount = mockIotDevices.filter(d => d.status === 'OFFLINE').length;
  const criticalAlertsCount = mockSmartEvents.filter(e => e.severity === 'CRITICAL' && !e.acknowledged).length;

  return (
    <div className="space-y-6">
      {/* Top Banner AI Plantation Insight */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-900/80 via-teal-900/60 to-slate-900 border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold tracking-wider uppercase">
                  AI Plantation Telemetry Insight
                </span>
                <span className="text-xs text-slate-400">Synced 2 minutes ago</span>
              </div>
              <h2 className="text-lg font-bold text-white mt-1">
                Real-Time Microclimate & Telemetry Active Across 5 Estates
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-3xl">
                {mockAiPredictions[0]?.recommendationText || 'Canal water level monitoring detecting elevated rainfall inflow in Peat Zone Div 02. Pre-drainage gates recommended.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end lg:self-center">
            <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span>Live Sensor Feed</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Online Devices</span>
            <Wifi className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{onlineDevicesCount}</div>
          <p className="text-[10px] text-slate-400 mt-1">92% Operational</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Offline Devices</span>
            <WifiOff className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400">{offlineDevicesCount}</div>
          <p className="text-[10px] text-rose-300/80 mt-1">Requires check</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Active Alerts</span>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400">{criticalAlertsCount}</div>
          <p className="text-[10px] text-amber-300/80 mt-1">Unacknowledged</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Avg Temperature</span>
            <Thermometer className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white">31.5 °C</div>
          <p className="text-[10px] text-slate-400 mt-1">Riau Estate AWS</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">24h Rainfall</span>
            <CloudRain className="h-4 w-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-blue-400">28.4 mm</div>
          <p className="text-[10px] text-blue-300/80 mt-1">Moderate rain</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Canal Water Level</span>
            <Droplets className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-cyan-400">185 cm</div>
          <p className="text-[10px] text-rose-400 font-semibold mt-1">Above limit (180cm)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-xs font-medium">Drones Active</span>
            <Plane className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400">
            {mockDrones.filter(d => d.status === 'READY' || d.status === 'IN_FLIGHT').length} / {mockDrones.length}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">1 In Mission</p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Real-time Weather Station Overview */}
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold text-white">Live Weather Station Network (AWS)</h3>
              </div>
              <span className="text-xs text-slate-400">Updated every 60 seconds</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockWeatherStations.map(ws => (
                <div key={ws.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{ws.stationName}</h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" /> {ws.locationEstate}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      {ws.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-800/80 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Thermometer className="h-3 w-3 text-amber-400" /> Temp
                      </div>
                      <div className="font-bold text-white text-sm">{ws.temperatureC}°C</div>
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Droplets className="h-3 w-3 text-blue-400" /> Humidity
                      </div>
                      <div className="font-bold text-white text-sm">{ws.humidityPct}%</div>
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <CloudRain className="h-3 w-3 text-cyan-400" /> Rain 24h
                      </div>
                      <div className="font-bold text-cyan-400 text-sm">{ws.rainfall24hMm} mm</div>
                    </div>
                    <div className="bg-slate-800/80 p-2 rounded-lg">
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Wind className="h-3 w-3 text-teal-400" /> Wind
                      </div>
                      <div className="font-bold text-white text-sm">{ws.windSpeedKmh} km/h</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Solar: {ws.solarRadiationWm2} W/m²</span>
                    <span>UV: {ws.uvIndex}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Environmental & Soil Readings Table */}
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-teal-400" />
                <h3 className="text-sm font-bold text-white">Latest Telemetry Stream & Field Sensors</h3>
              </div>
              <button className="text-xs text-emerald-400 hover:underline">View All Devices</button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2 px-3 font-semibold">Device</th>
                    <th className="py-2 px-3 font-semibold">Type</th>
                    <th className="py-2 px-3 font-semibold">Location</th>
                    <th className="py-2 px-3 font-semibold">Reading Value</th>
                    <th className="py-2 px-3 font-semibold">Protocol</th>
                    <th className="py-2 px-3 font-semibold">Battery</th>
                    <th className="py-2 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 text-slate-200">
                  {mockIotDevices.map(device => (
                    <tr key={device.id} className="hover:bg-slate-700/30 transition">
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-white">{device.deviceName}</div>
                        <div className="text-[10px] font-mono text-slate-400">{device.deviceId}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-700 text-slate-300 text-[10px] font-medium">
                          {device.deviceType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="text-xs">{device.estateName}</div>
                        <div className="text-[10px] text-slate-400">{device.blockCode}</div>
                      </td>
                      <td className="py-2.5 px-3 font-mono font-medium text-emerald-300">
                        {device.deviceType === 'WEATHER_STATION' ? '31.8°C / 28.4mm Rain' :
                         device.deviceType === 'WATER_SENSOR' ? '185 cm Canal' :
                         device.deviceType === 'SOIL_SENSOR' ? '22.1% Moisture / pH 4.8' :
                         device.deviceType === 'GPS_TRACKER' ? 'Working (3.2 km/h)' :
                         device.deviceType === 'DRONE' ? 'RTK GPS Locked' : '15.2% Fuel'}
                      </td>
                      <td className="py-2.5 px-3 text-[10px] font-bold text-teal-400">{device.protocol}</td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                device.batteryPercent > 50 ? 'bg-emerald-400' :
                                device.batteryPercent > 20 ? 'bg-amber-400' : 'bg-rose-500'
                              }`}
                              style={{ width: `${device.batteryPercent}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-300">{device.batteryPercent}%</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          device.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          device.status === 'MAINTENANCE' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}>
                          {device.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (1 col) */}
        <div className="space-y-6">
          {/* Drone Fleet & Mission Quick Panel */}
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-indigo-400" />
                <h3 className="text-sm font-bold text-white">Drone Fleet Readiness</h3>
              </div>
              <span className="text-xs text-indigo-400 font-medium">3 Drones</span>
            </div>

            <div className="space-y-3">
              {mockDrones.map(dr => (
                <div key={dr.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{dr.modelName}</div>
                    <div className="text-[10px] text-slate-400">Pilot: {dr.pilotName} | {dr.flightHoursTotal} hrs</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      dr.status === 'READY' ? 'bg-emerald-500/20 text-emerald-400' :
                      dr.status === 'IN_FLIGHT' ? 'bg-indigo-500/20 text-indigo-300 animate-pulse' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {dr.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">Bat: {dr.batteryPct}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Alert Center Stream */}
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Live Event & Alert Stream</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                {criticalAlertsCount} Critical
              </span>
            </div>

            <div className="space-y-3">
              {mockSmartEvents.map(evt => (
                <div key={evt.id} className={`p-3 rounded-xl border ${
                  evt.severity === 'CRITICAL' ? 'bg-rose-950/40 border-rose-800/60' : 'bg-amber-950/30 border-amber-800/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      evt.severity === 'CRITICAL' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-slate-900'
                    }`}>
                      {evt.eventType}
                    </span>
                    <span className="text-[10px] text-slate-400">{evt.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium mt-1.5">{evt.message}</p>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Source: {evt.sourceDevice}</span>
                    <button className="text-emerald-400 hover:underline">
                      {evt.acknowledged ? 'Acknowledged' : 'Acknowledge Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
