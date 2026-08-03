import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const YIELD_DATA = [
  { estate: 'Teluk Dalam', tm2015: 22.4, tm2018: 24.8, target: 23.0 },
  { estate: 'Sungai Rungau', tm2015: 20.1, tm2018: 22.5, target: 22.0 },
  { estate: 'Bukit Permata', tm2015: 19.5, tm2018: 21.2, target: 21.0 },
  { estate: 'Batu Ampar', tm2015: 23.1, tm2018: 25.6, target: 24.0 },
  { estate: 'Kuala Kencana', tm2015: 21.8, tm2018: 23.9, target: 22.5 },
];

export const HarvestYieldBarChart: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={YIELD_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
          <XAxis dataKey="estate" stroke="#94a3b8" fontSize={10} tickLine={false} />
          <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit=" T/Ha" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '0.75rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            formatter={(val: any) => [`${val} Ton/Ha`, '']}
          />
          <Bar dataKey="tm2015" name="Blok TM-2015" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="tm2018" name="Blok TM-2018" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
