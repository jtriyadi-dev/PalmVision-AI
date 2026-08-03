import React from 'react';
import { CloudRain, Sun, Wind, Droplets, Thermometer, AlertCircle, Compass } from 'lucide-react';
import { WeatherForecastData } from '../../../types';

interface WeatherWidgetCardProps {
  weather?: WeatherForecastData;
}

const DEFAULT_WEATHER: WeatherForecastData = {
  city: 'Estate Teluk Dalam',
  estateName: 'PT Sawit Nusantara Jaya',
  tempC: 28.5,
  condition: 'Cerah Berawan dengan Potensi Hujan Sore',
  icon: 'CloudRain',
  humidityPct: 78,
  rainfallMm: 18.4,
  windSpeedKm: 12.5,
  uvIndex: 7,
  advisory: 'Kondisi ideal untuk pemupukan NPK di Divisi I & II. Tunda penyemprotan herbisida di Afdeling Alpha sore ini (potensi presipitasi 80%).',
  forecastDays: [
    { day: 'Sen', tempHigh: 31, tempLow: 24, condition: 'Hujan Ringan', rainProbability: 60 },
    { day: 'Sel', tempHigh: 30, tempLow: 23, condition: 'Hujan Sedang', rainProbability: 85 },
    { day: 'Rab', tempHigh: 32, tempLow: 24, condition: 'Cerah Berawan', rainProbability: 20 },
    { day: 'Kam', tempHigh: 33, tempLow: 25, condition: 'Cerah', rainProbability: 10 },
    { day: 'Jum', tempHigh: 29, tempLow: 23, condition: 'Hujan Lebat', rainProbability: 90 },
  ],
};

export const WeatherWidgetCard: React.FC<WeatherWidgetCardProps> = ({ weather = DEFAULT_WEATHER }) => {
  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 relative overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <CloudRain className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{weather.city}</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{weather.estateName}</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800">
          Sensor Telemetri Aktif
        </span>
      </div>

      {/* Main Temperature & Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-amber-500 shrink-0" />
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Suhu Udara</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{weather.tempC}°C</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500 shrink-0" />
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Kelembapan</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{weather.humidityPct}%</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CloudRain className="h-5 w-5 text-cyan-500 shrink-0" />
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Curah Hujan</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{weather.rainfallMm} mm</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Wind className="h-5 w-5 text-teal-500 shrink-0" />
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">Kecepatan Angin</span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white">{weather.windSpeedKm} km/h</span>
          </div>
        </div>
      </div>

      {/* AI Agricultural Weather Advisory */}
      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex items-start gap-2.5">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200">
          <span className="font-bold">Rekomendasi Lapangan (Agronomist AI):</span> {weather.advisory}
        </div>
      </div>

      {/* 5-Day Forecast Strips */}
      <div className="grid grid-cols-5 gap-1.5 pt-1">
        {weather.forecastDays.map((f, i) => (
          <div
            key={i}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center border border-slate-200/60 dark:border-slate-800"
          >
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">{f.day}</span>
            <CloudRain className="h-4 w-4 text-blue-500 mx-auto my-1" />
            <span className="text-xs font-bold text-slate-900 dark:text-white block">{f.tempHigh}°</span>
            <span className="text-[9px] font-semibold text-blue-600 dark:text-blue-400 block mt-0.5">
              {f.rainProbability}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
