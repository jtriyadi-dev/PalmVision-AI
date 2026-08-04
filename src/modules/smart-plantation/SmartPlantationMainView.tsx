import React, { useState } from 'react';
import { ScrollableSubNav } from '../../components/ScrollableSubNav';
import {
  Cpu,
  Radio,
  CloudRain,
  Plane,
  Globe,
  Boxes,
  AlertTriangle,
  HeartPulse,
  Brain,
  Rocket,
  Activity,
  Filter,
  RefreshCw,
  Search,
  Wifi
} from 'lucide-react';
import { SmartDashboardView } from './views/SmartDashboardView';
import { IotDeviceManagementView } from './views/IotDeviceManagementView';
import { SensorGatewayTelemetryView } from './views/SensorGatewayTelemetryView';
import { WeatherStationMonitoringView } from './views/WeatherStationMonitoringView';
import { DroneMappingMissionView } from './views/DroneMappingMissionView';
import { SatelliteGisHeatmapView } from './views/SatelliteGisHeatmapView';
import { DigitalTwinView } from './views/DigitalTwinView';
import { EventAlertCenterView } from './views/EventAlertCenterView';
import { SensorAnalyticsHealthView } from './views/SensorAnalyticsHealthView';
import { AiSensorIntelligenceView } from './views/AiSensorIntelligenceView';
import { Prompt15RoadmapView } from './views/Prompt15RoadmapView';

export const SmartPlantationMainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Smart Dashboard', icon: Activity },
    { id: 'devices', label: 'IoT Device Registry', icon: Cpu },
    { id: 'gateways', label: 'Gateway & Telemetry', icon: Radio },
    { id: 'weather', label: 'Weather Station AWS', icon: CloudRain },
    { id: 'drone', label: 'Drone Fleet & Missions', icon: Plane },
    { id: 'gis', label: 'Satellite & Advanced GIS', icon: Globe },
    { id: 'digital-twin', label: 'Digital Twin Estate', icon: Boxes },
    { id: 'alerts', label: 'Event & Alert Center', icon: AlertTriangle },
    { id: 'analytics', label: 'Sensor Health Matrix', icon: HeartPulse },
    { id: 'ai-sensor', label: 'AI Sensor Intelligence', icon: Brain },
    { id: 'prompt15', label: 'Prompt 15 Roadmap', icon: Rocket }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Module Title Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg">
            <Radio className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                Module 14 Active
              </span>
              <span className="text-xs text-slate-400">PalmVision AI Telemetry Suite</span>
            </div>
            <h1 className="text-xl font-extrabold text-white">
              Smart Plantation IoT, Drone, Satellite & Digital Twin Platform
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3.5 py-2 rounded-xl border border-emerald-800/60">
          <Wifi className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>Realtime MQTT / LoRaWAN Pipeline Connected</span>
        </div>
      </div>

      {/* Navigation Submenu Tabs */}
      <div className="border-b border-slate-800 pb-1">
        <ScrollableSubNav
          items={navItems}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id)}
          activeColorClass="bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
        />
      </div>

      {/* Main Tab Content View Switcher */}
      <div className="min-h-[500px]">
        {activeTab === 'dashboard' && <SmartDashboardView />}
        {activeTab === 'devices' && <IotDeviceManagementView />}
        {activeTab === 'gateways' && <SensorGatewayTelemetryView />}
        {activeTab === 'weather' && <WeatherStationMonitoringView />}
        {activeTab === 'drone' && <DroneMappingMissionView />}
        {activeTab === 'gis' && <SatelliteGisHeatmapView />}
        {activeTab === 'digital-twin' && <DigitalTwinView />}
        {activeTab === 'alerts' && <EventAlertCenterView />}
        {activeTab === 'analytics' && <SensorAnalyticsHealthView />}
        {activeTab === 'ai-sensor' && <AiSensorIntelligenceView />}
        {activeTab === 'prompt15' && <Prompt15RoadmapView />}
      </div>
    </div>
  );
};
