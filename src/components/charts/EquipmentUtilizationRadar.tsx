import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const RADAR_DATA = [
  { metric: 'Dump Truck', util: 92, target: 85 },
  { metric: 'Tractor 4WD', util: 88, target: 80 },
  { metric: 'Excavator', util: 78, target: 85 },
  { metric: 'Grader Jalan', util: 65, target: 75 },
  { metric: 'Drone Survey', util: 95, target: 90 },
  { metric: 'Spreader Pupuk', util: 82, target: 80 },
];

export const EquipmentUtilizationRadar: React.FC = () => {
  return (
    <div className="w-full h-64 sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
          <PolarGrid stroke="#334155" opacity={0.3} />
          <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={10} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={9} />
          <Radar name="Utilisasi Aktif (%)" dataKey="util" stroke="#059669" fill="#059669" fillOpacity={0.4} />
          <Radar name="Target KPI (%)" dataKey="target" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderColor: '#334155',
              borderRadius: '0.75rem',
              color: '#f8fafc',
              fontSize: '12px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
