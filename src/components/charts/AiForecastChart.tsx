import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const AI_FORECAST_DATA = [
  { week: 'W1 Aug', tbsHistorical: 3420, aiForecast: 3450, lowerBand: 3350, upperBand: 3550 },
  { week: 'W2 Aug', tbsHistorical: 3510, aiForecast: 3580, lowerBand: 3480, upperBand: 3680 },
  { week: 'W3 Aug', tbsHistorical: 3680, aiForecast: 3720, lowerBand: 3600, upperBand: 3840 },
  { week: 'W4 Aug', tbsHistorical: null, aiForecast: 3910, lowerBand: 3790, upperBand: 4030 },
  { week: 'W1 Sep', tbsHistorical: null, aiForecast: 4120, lowerBand: 3980, upperBand: 4260 },
  { week: 'W2 Sep', tbsHistorical: null, aiForecast: 4250, lowerBand: 4100, upperBand: 4400 },
];

export const AiForecastChart: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={AI_FORECAST_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
          <XAxis dataKey="week" stroke="#94a3b8" fontSize={10} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit=" T" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '0.75rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            formatter={(val: any) => [val ? `${val} Ton` : 'Belum Ada', '']}
          />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="tbsHistorical" name="Realisasi Historis" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Line type="monotone" dataKey="aiForecast" name="Proyeksi AI Gemini 2.5" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
          <Line type="monotone" dataKey="upperBand" name="Batas Atas AI (Confidence 95%)" stroke="#8b5cf6" strokeDasharray="3 3" strokeWidth={1.5} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
