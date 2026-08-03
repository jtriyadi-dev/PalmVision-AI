import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COST_DATA = [
  { name: 'Pupuk & Nutrisi', value: 38, color: '#059669' },
  { name: 'Upah Panen & Rawat', value: 27, color: '#3b82f6' },
  { name: 'Transport & BBM', value: 16, color: '#f59e0b' },
  { name: 'Pemeliharaan Alat', value: 11, color: '#8b5cf6' },
  { name: 'Overhead & Admin', value: 8, color: '#ec4899' },
];

export const CostRevenuePieChart: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={COST_DATA}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {COST_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '0.75rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            formatter={(val: any) => [`${val}% dari Total Biaya`, '']}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
