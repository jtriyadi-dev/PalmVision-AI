import React, { useState } from 'react';
import {
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  Layers,
  BarChart2,
  TrendingUp,
  AlertTriangle,
  Radio,
  MapPin,
  Calendar
} from 'lucide-react';
import { mockWeatherStations, mockSensorReadings } from '../mockData';

export const WeatherStationMonitoringView: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState(mockWeatherStations[0]);
  const [timeframe, setTimeframe] = useState<'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY'>('DAILY');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CloudRain className="h-6 w-6 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Weather Station (AWS) & Hydrology Monitoring</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time automated weather stations, evapotranspiration, rainfall gauges, peatland soil moisture & canal levels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {['HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY'].map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                timeframe === t ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Selected Station Detailed Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">{selectedStation.stationCode}</span>
                <h3 className="text-base font-bold text-white">{selectedStation.stationName}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" /> {selectedStation.locationEstate}
                </p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  {selectedStation.status}
                </span>
                <p className="text-[10px] text-slate-400 mt-1">Updated {selectedStation.lastUpdated}</p>
              </div>
            </div>

            {/* Climate Key Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Air Temp</span>
                  <Thermometer className="h-4 w-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white">{selectedStation.temperatureC} °C</div>
                <p className="text-[10px] text-slate-400 mt-1">High 34.2 °C | Low 24.1 °C</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Humidity</span>
                  <Droplets className="h-4 w-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-blue-400">{selectedStation.humidityPct} %</div>
                <p className="text-[10px] text-slate-400 mt-1">Dew Point: 26.5 °C</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">24h Rainfall</span>
                  <CloudRain className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-cyan-400">{selectedStation.rainfall24hMm} mm</div>
                <p className="text-[10px] text-slate-400 mt-1">Intensity: Moderate</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/60">
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-xs">Wind Speed</span>
                  <Wind className="h-4 w-4 text-teal-400" />
                </div>
                <div className="text-2xl font-bold text-white">{selectedStation.windSpeedKmh} km/h</div>
                <p className="text-[10px] text-teal-300 mt-1">{selectedStation.windDirection}</p>
              </div>
            </div>

            {/* Evapotranspiration & Solar Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <span className="text-[11px] text-slate-400 block">Solar Radiation</span>
                <span className="text-base font-bold text-amber-300">{selectedStation.solarRadiationWm2} W/m²</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <span className="text-[11px] text-slate-400 block">UV Index</span>
                <span className="text-base font-bold text-amber-400">{selectedStation.uvIndex} (High)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-700/50">
                <span className="text-[11px] text-slate-400 block">Evapotranspiration (ET0)</span>
                <span className="text-base font-bold text-cyan-300">{selectedStation.evapotranspirationMm} mm/day</span>
              </div>
            </div>

            {/* Simulated 24-Hour Rainfall Chart Visualization */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/70 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <h4 className="font-bold text-white flex items-center gap-1.5">
                  <BarChart2 className="h-4 w-4 text-cyan-400" />
                  24-Hour Rainfall Distribution (mm)
                </h4>
                <span className="text-slate-400 text-[10px]">Accumulated: {selectedStation.rainfall24hMm} mm</span>
              </div>

              <div className="h-28 flex items-end justify-between gap-1.5 pt-4 px-2 border-b border-slate-700">
                {[2, 0, 0, 0, 1, 0, 0, 3, 12, 8, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((mm, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div
                      className={`w-full rounded-t transition-all ${
                        mm > 10 ? 'bg-cyan-400' : mm > 0 ? 'bg-cyan-600' : 'bg-slate-700/40'
                      }`}
                      style={{ height: `${Math.max(4, mm * 6)}px` }}
                    />
                    <span className="text-[8px] text-slate-500 font-mono hidden md:block">{idx}:00</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hydrology & Soil Moisture Section */}
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Droplets className="h-5 w-5 text-cyan-400" />
              Peatland Hydrology & Canal Water Table Gauges
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-rose-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Main River Canal Gate #04</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                    FLOOD ALERT
                  </span>
                </div>
                <div className="text-3xl font-bold text-rose-400">185 cm</div>
                <p className="text-xs text-slate-300">Target Level: 140 - 160 cm | Max Safe Limit: 180 cm</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-800/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Block B15 Peat Moisture Probe</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    LOW MOISTURE
                  </span>
                </div>
                <div className="text-3xl font-bold text-amber-400">22.1 %</div>
                <p className="text-xs text-slate-300">Soil pH: 4.8 | Moisture threshold for fire risk: &lt;20%</p>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '30%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Station List */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white">Active AWS Station List</h3>

            <div className="space-y-3">
              {mockWeatherStations.map(st => (
                <div
                  key={st.id}
                  onClick={() => setSelectedStation(st)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    selectedStation.id === st.id
                      ? 'bg-blue-950/60 border-blue-500 text-white'
                      : 'bg-slate-900/60 border-slate-700/60 hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{st.stationName}</span>
                    <span className="text-[10px] font-mono text-blue-400">{st.stationCode}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">{st.locationEstate}</div>
                  <div className="mt-3 grid grid-cols-3 gap-1 text-[10px] font-semibold text-center">
                    <div className="bg-slate-800/80 p-1.5 rounded text-amber-300">{st.temperatureC}°C</div>
                    <div className="bg-slate-800/80 p-1.5 rounded text-blue-300">{st.humidityPct}%</div>
                    <div className="bg-slate-800/80 p-1.5 rounded text-cyan-300">{st.rainfall24hMm}mm</div>
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
