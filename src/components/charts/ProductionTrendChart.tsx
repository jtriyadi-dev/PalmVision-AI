import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const DUMMY_DATA = [
  { month: 'Jan', realisai: 12400, target: 11800, aiForecast: 12100 },
  { month: 'Feb', realisai: 11900, target: 12000, aiForecast: 12000 },
  { month: 'Mar', realisai: 13800, target: 12500, aiForecast: 13500 },
  { month: 'Apr', realisai: 14200, target: 13000, aiForecast: 14000 },
  { month: 'Mei', realisai: 15600, target: 14000, aiForecast: 15200 },
  { month: 'Jun', realisai: 16800, target: 15000, aiForecast: 16500 },
  { month: 'Jul', realisai: 17200, target: 15500, aiForecast: 17000 },
  { month: 'Agu', realisai: 18100, target: 16000, aiForecast: 17800 },
];

export const ProductionTrendChart: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={DUMMY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="realisasiGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '0.75rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            formatter={(val: any) => [`${val.toLocaleString('id-ID')} Ton`, '']}
          />
          <Area
            type="monotone"
            dataKey="realisai"
            name="Realisasi TBS (Ton)"
            stroke="#059669"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#realisasiGrad)"
          />
          <Area
            type="monotone"
            dataKey="target"
            name="Target RKAP (Ton)"
            stroke="#3b82f6"
            strokeWidth={2}
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#targetGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
