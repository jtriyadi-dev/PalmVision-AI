import React, { useState } from 'react';
import { ScrollableSubNav } from '../../components/ScrollableSubNav';
import {
  LayoutDashboard,
  Calendar,
  Clock,
  Users,
  Smartphone,
  Award,
  Scale,
  Truck,
  BarChart3,
  QrCode,
  Sparkles,
  Server,
  Boxes,
  Filter,
} from 'lucide-react';

import { HarvestDashboardView } from './components/HarvestDashboardView';
import { HarvestPlanningView } from './components/HarvestPlanningView';
import { HarvestTeamAssignmentView } from './components/HarvestTeamAssignmentView';
import { HarvestExecutionView } from './components/HarvestExecutionView';
import { HarvestCollectionGradingQCView } from './components/HarvestCollectionGradingQCView';
import { WeighbridgeTransportView } from './components/WeighbridgeTransportView';
import { HarvestAnalyticsLossForecastView } from './components/HarvestAnalyticsLossForecastView';
import { HarvestGalleryQRTimelineView } from './components/HarvestGalleryQRTimelineView';
import { AIHarvestIntelligenceView } from './components/AIHarvestIntelligenceView';
import { HarvestApiDocsView } from './components/HarvestApiDocsView';
import { Prompt9RoadmapView } from './components/Prompt9RoadmapView';

import {
  INITIAL_HARVEST_PLANS,
  INITIAL_HARVEST_SCHEDULES,
  INITIAL_HARVEST_TEAMS,
  INITIAL_HARVEST_ASSIGNMENTS,
  INITIAL_HARVEST_EXECUTIONS,
  INITIAL_HARVEST_COLLECTIONS,
  INITIAL_HARVEST_GRADINGS,
  INITIAL_HARVEST_QC,
  INITIAL_WEIGHBRIDGE_RECORDS,
  INITIAL_TRANSPORT_DISPATCHES,
  INITIAL_MILL_DELIVERIES,
  INITIAL_HARVEST_PRODUCTIVITY,
  INITIAL_HARVEST_LOSSES,
  INITIAL_HARVEST_FORECASTS,
  INITIAL_HARVEST_TIMELINE,
  INITIAL_HARVEST_GALLERY,
  INITIAL_QR_BARCODES,
  INITIAL_AI_HARVEST_INSIGHTS,
} from './mockData';

import {
  HarvestPlanRecord,
  HarvestTeamRecord,
  HarvestAssignmentRecord,
  HarvestExecutionRecord,
  HarvestGradingRecord,
  WeighbridgeRecord,
  TransportDispatchRecord,
} from './types';

export const HarvestMainView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>('harvest-dashboard');

  // Global State
  const [plans, setPlans] = useState<HarvestPlanRecord[]>(INITIAL_HARVEST_PLANS);
  const [teams, setTeams] = useState<HarvestTeamRecord[]>(INITIAL_HARVEST_TEAMS);
  const [assignments, setAssignments] = useState<HarvestAssignmentRecord[]>(INITIAL_HARVEST_ASSIGNMENTS);
  const [executions, setExecutions] = useState<HarvestExecutionRecord[]>(INITIAL_HARVEST_EXECUTIONS);
  const [collections, setCollections] = useState(INITIAL_HARVEST_COLLECTIONS);
  const [gradings, setGradings] = useState<HarvestGradingRecord[]>(INITIAL_HARVEST_GRADINGS);
  const [qcRecords, setQcRecords] = useState(INITIAL_HARVEST_QC);
  const [weighbridgeRecords, setWeighbridgeRecords] = useState<WeighbridgeRecord[]>(INITIAL_WEIGHBRIDGE_RECORDS);
  const [dispatches, setDispatches] = useState<TransportDispatchRecord[]>(INITIAL_TRANSPORT_DISPATCHES);
  const [deliveries, setDeliveries] = useState(INITIAL_MILL_DELIVERIES);
  const [productivities, setProductivities] = useState(INITIAL_HARVEST_PRODUCTIVITY);
  const [losses, setLosses] = useState(INITIAL_HARVEST_LOSSES);
  const [forecasts, setForecasts] = useState(INITIAL_HARVEST_FORECASTS);
  const [timeline, setTimeline] = useState(INITIAL_HARVEST_TIMELINE);
  const [gallery, setGallery] = useState(INITIAL_HARVEST_GALLERY);
  const [qrCodes, setQrCodes] = useState(INITIAL_QR_BARCODES);
  const [aiInsights, setAiInsights] = useState(INITIAL_AI_HARVEST_INSIGHTS);

  // Handlers for adding data
  const handleAddPlan = (newPlan: HarvestPlanRecord) => {
    setPlans([newPlan, ...plans]);
  };

  const handleAddTeam = (newTeam: HarvestTeamRecord) => {
    setTeams([newTeam, ...teams]);
  };

  const handleAddAssignment = (newAssignment: HarvestAssignmentRecord) => {
    setAssignments([newAssignment, ...assignments]);
  };

  const handleAddExecution = (newExec: HarvestExecutionRecord) => {
    setExecutions([newExec, ...executions]);
  };

  const handleAddGrading = (newG: HarvestGradingRecord) => {
    setGradings([newG, ...gradings]);
  };

  const handleAddWeighbridge = (newWb: WeighbridgeRecord) => {
    setWeighbridgeRecords([newWb, ...weighbridgeRecords]);
  };

  const handleAddDispatch = (newDispatch: TransportDispatchRecord) => {
    setDispatches([newDispatch, ...dispatches]);
  };

  // Submenu configuration
  const subMenus = [
    { id: 'harvest-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'harvest-planning', label: 'Planning & Schedule', icon: Calendar },
    { id: 'harvest-teams', label: 'Teams & Assignment', icon: Users },
    { id: 'harvest-execution', label: 'Execution', icon: Smartphone },
    { id: 'harvest-grading', label: 'TPH Grading & QC', icon: Award },
    { id: 'weighbridge', label: 'Weighbridge & Dispatch', icon: Scale },
    { id: 'harvest-analytics', label: 'Yield & Productivity', icon: BarChart3 },
    { id: 'qr-timeline', label: 'QR & Digital Timeline', icon: QrCode },
    { id: 'ai-harvest', label: 'AI Harvest Intelligence', icon: Sparkles },
    { id: 'api-docs', label: 'REST API & Schema', icon: Server },
    { id: 'roadmap-p9', label: 'Prompt 9 (Inventory)', icon: Boxes },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Top Main Title & Submenu Navigation Pills */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              PalmVision Enterprise Suite • Prompt 8
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Harvest Management System & Weighbridge
            </h1>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold w-fit">
            GIS & Weighbridge Connected
          </span>
        </div>

        {/* Horizontal Scroll Submenu Bar */}
        <ScrollableSubNav
          items={subMenus}
          activeId={activeSubTab}
          onChange={(id) => setActiveSubTab(id)}
          activeColorClass="bg-emerald-600 text-white shadow-xs"
        />
      </div>

      {/* Render Active Submenu Content */}
      {activeSubTab === 'harvest-dashboard' && (
        <HarvestDashboardView
          plans={plans}
          teams={teams}
          executions={executions}
          weighbridgeRecords={weighbridgeRecords}
          dispatches={dispatches}
          aiInsights={aiInsights}
          onNavigateSubTab={(id) => setActiveSubTab(id)}
        />
      )}

      {activeSubTab === 'harvest-planning' && (
        <HarvestPlanningView plans={plans} onAddPlan={handleAddPlan} />
      )}

      {activeSubTab === 'harvest-teams' && (
        <HarvestTeamAssignmentView
          teams={teams}
          assignments={assignments}
          onAddTeam={handleAddTeam}
          onAddAssignment={handleAddAssignment}
        />
      )}

      {activeSubTab === 'harvest-execution' && (
        <HarvestExecutionView executions={executions} onAddExecution={handleAddExecution} />
      )}

      {activeSubTab === 'harvest-grading' && (
        <HarvestCollectionGradingQCView
          collections={collections}
          gradings={gradings}
          qcRecords={qcRecords}
          onAddGrading={handleAddGrading}
        />
      )}

      {activeSubTab === 'weighbridge' && (
        <WeighbridgeTransportView
          weighbridgeRecords={weighbridgeRecords}
          dispatches={dispatches}
          deliveries={deliveries}
          onAddWeighbridge={handleAddWeighbridge}
          onAddDispatch={handleAddDispatch}
        />
      )}

      {activeSubTab === 'harvest-analytics' && (
        <HarvestAnalyticsLossForecastView
          productivities={productivities}
          losses={losses}
          forecasts={forecasts}
        />
      )}

      {activeSubTab === 'qr-timeline' && (
        <HarvestGalleryQRTimelineView timeline={timeline} gallery={gallery} qrCodes={qrCodes} />
      )}

      {activeSubTab === 'ai-harvest' && <AIHarvestIntelligenceView insights={aiInsights} />}

      {activeSubTab === 'api-docs' && <HarvestApiDocsView />}

      {activeSubTab === 'roadmap-p9' && <Prompt9RoadmapView />}
    </div>
  );
};
