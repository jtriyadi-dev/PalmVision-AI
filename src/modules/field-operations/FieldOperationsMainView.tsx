import React, { useState } from 'react';
import {
  Activity,
  FileText,
  Users,
  Smartphone,
  ShieldCheck,
  CheckSquare,
  Droplets,
  TreeDeciduous,
  Truck,
  Wrench,
  ShieldAlert,
  Compass,
  Camera,
  Database,
  Clock,
  Sparkles,
  Server,
  Layers,
  ChevronRight,
  Filter,
} from 'lucide-react';

import {
  INITIAL_WORK_ORDERS,
  INITIAL_TASKS,
  INITIAL_DAILY_ACTIVITIES,
  INITIAL_FERTILIZER_ACTIVITIES,
  INITIAL_SPRAYING_ACTIVITIES,
  INITIAL_PRUNING_ACTIVITIES,
  INITIAL_MAINTENANCE_ACTIVITIES,
  INITIAL_PEST_CONTROLS,
  INITIAL_FIELD_CHECKLISTS,
  INITIAL_FIELD_PHOTOS,
  INITIAL_GPS_TRACKS,
  INITIAL_FIELD_ATTENDANCE,
  INITIAL_OFFLINE_SYNC_QUEUE,
  INITIAL_FIELD_TIMELINE,
  INITIAL_AI_OPERATION_RECOMMENDATIONS,
} from './mockData';

import {
  WorkOrderRecord,
  TaskAssignmentItem,
  DailyActivityRecord,
  FertilizerActivityRecord,
  SprayingActivityRecord,
  PruningActivityRecord,
  MaintenanceActivityRecord,
  PestControlRecord,
  FieldChecklistItem,
  FieldPhotoItem,
  GpsTrackingPoint,
  AttendanceFieldRecord,
  OfflineSyncQueueItem,
  FieldTimelineEvent,
  AiOperationRecommendation,
  WorkOrderStatus,
} from './types';

import { FieldDashboardView } from './components/FieldDashboardView';
import { WorkOrderView } from './components/WorkOrderView';
import { TaskAssignmentView } from './components/TaskAssignmentView';
import { MandorMobileView } from './components/MandorMobileView';
import { SupervisorDashboardView } from './components/SupervisorDashboardView';
import { DailyActivityView } from './components/DailyActivityView';
import { ActivitiesManagementView } from './components/ActivitiesManagementView';
import { FieldChecklistView } from './components/FieldChecklistView';
import { FieldPhotoGalleryView } from './components/FieldPhotoGalleryView';
import { GpsTrackingView } from './components/GpsTrackingView';
import { FieldAttendanceView } from './components/FieldAttendanceView';
import { OfflineSyncCenterView } from './components/OfflineSyncCenterView';
import { FieldTimelineView } from './components/FieldTimelineView';
import { AIOperationAssistantView } from './components/AIOperationAssistantView';
import { FieldApiDocsView } from './components/FieldApiDocsView';
import { Prompt8RoadmapView } from './components/Prompt8RoadmapView';

export const FieldOperationsMainView: React.FC = () => {
  const [subTab, setSubTab] = useState<string>('field-dashboard');

  // Local state for all records
  const [workOrders, setWorkOrders] = useState<WorkOrderRecord[]>(INITIAL_WORK_ORDERS);
  const [tasks, setTasks] = useState<TaskAssignmentItem[]>(INITIAL_TASKS);
  const [dailyActivities, setDailyActivities] = useState<DailyActivityRecord[]>(INITIAL_DAILY_ACTIVITIES);
  const [fertilizers, setFertilizers] = useState<FertilizerActivityRecord[]>(INITIAL_FERTILIZER_ACTIVITIES);
  const [sprayings, setSprayings] = useState<SprayingActivityRecord[]>(INITIAL_SPRAYING_ACTIVITIES);
  const [prunings, setPrunings] = useState<PruningActivityRecord[]>(INITIAL_PRUNING_ACTIVITIES);
  const [maintenances, setMaintenances] = useState<MaintenanceActivityRecord[]>(INITIAL_MAINTENANCE_ACTIVITIES);
  const [pestControls, setPestControls] = useState<PestControlRecord[]>(INITIAL_PEST_CONTROLS);
  const [checklists, setChecklists] = useState<FieldChecklistItem[]>(INITIAL_FIELD_CHECKLISTS);
  const [photos, setPhotos] = useState<FieldPhotoItem[]>(INITIAL_FIELD_PHOTOS);
  const [gpsTracks, setGpsTracks] = useState<GpsTrackingPoint[]>(INITIAL_GPS_TRACKS);
  const [attendances, setAttendances] = useState<AttendanceFieldRecord[]>(INITIAL_FIELD_ATTENDANCE);
  const [syncQueue, setSyncQueue] = useState<OfflineSyncQueueItem[]>(INITIAL_OFFLINE_SYNC_QUEUE);
  const [timelineEvents, setTimelineEvents] = useState<FieldTimelineEvent[]>(INITIAL_FIELD_TIMELINE);
  const [aiRecommendations, setAiRecommendations] = useState<AiOperationRecommendation[]>(INITIAL_AI_OPERATION_RECOMMENDATIONS);

  // Callbacks
  const handleAddWorkOrder = (wo: WorkOrderRecord) => {
    setWorkOrders([wo, ...workOrders]);
  };

  const handleUpdateWOStatus = (id: string, newStatus: WorkOrderStatus) => {
    setWorkOrders(
      workOrders.map((w) => (w.id === id ? { ...w, status: newStatus, updatedAt: new Date().toISOString() } : w))
    );
  };

  const handleAddDailyActivity = (act: DailyActivityRecord) => {
    setDailyActivities([act, ...dailyActivities]);
  };

  const handleTriggerSync = () => {
    setSyncQueue(
      syncQueue.map((s) => ({ ...s, syncStatus: 'Success', errorMessage: undefined }))
    );
  };

  const subMenus = [
    { id: 'field-dashboard', label: 'Field Dashboard', icon: Activity },
    { id: 'work-order', label: 'Work Order', icon: FileText },
    { id: 'task-assignment', label: 'Task Assignment', icon: Users },
    { id: 'mandor-mobile', label: 'Mandor Mobile', icon: Smartphone, highlight: true },
    { id: 'supervisor-dashboard', label: 'Supervisor Dashboard', icon: ShieldCheck },
    { id: 'daily-activity', label: 'Daily Activity', icon: Activity },
    { id: 'fertilizer-activity', label: 'Fertilizer Activity', icon: Droplets },
    { id: 'spraying-activity', label: 'Spraying Activity', icon: Droplets },
    { id: 'pruning-activity', label: 'Pruning Activity', icon: TreeDeciduous },
    { id: 'road-maintenance', label: 'Road & Infra Maintenance', icon: Truck },
    { id: 'pest-control-activity', label: 'Pest Control', icon: ShieldAlert },
    { id: 'field-checklist', label: 'Field Checklist', icon: CheckSquare },
    { id: 'field-photos', label: 'Field Photos', icon: Camera },
    { id: 'gps-tracking', label: 'GPS Tracking', icon: Compass },
    { id: 'attendance-field', label: 'Attendance Field', icon: Users },
    { id: 'offline-sync', label: 'Offline Sync Center', icon: Database },
    { id: 'field-timeline', label: 'Field Timeline', icon: Clock },
    { id: 'ai-assistant', label: 'AI Operation Assistant', icon: Sparkles },
    { id: 'api-docs', label: 'REST API & Schema Docs', icon: Server },
    { id: 'prompt8-roadmap', label: 'Prompt 8 Roadmap (Harvest)', icon: ChevronRight },
  ];

  return (
    <div className="space-y-6">
      {/* Module Title Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-extrabold text-[10px] tracking-wider uppercase">
                Module 07 • Field Operation Management
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-bold text-[10px]">
                Offline First & Mobile Mandor
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
              Field Operation & Digital Mandor Work Order
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pusat kendali aktivitas operasional harian perkebunan kelapa sawit: Work Order, Supervisi, GPS Tracking, & Offline Queue.
            </p>
          </div>
        </div>

        {/* Submenu Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-2 scrollbar-none border-t border-slate-100 dark:border-slate-800">
          {subMenus.map((menu) => {
            const Icon = menu.icon;
            const isActive = subTab === menu.id;
            return (
              <button
                key={menu.id}
                onClick={() => setSubTab(menu.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : menu.highlight
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{menu.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUBTAB VIEWS RENDER */}
      {subTab === 'field-dashboard' && (
        <FieldDashboardView
          workOrders={workOrders}
          tasks={tasks}
          dailyActivities={dailyActivities}
          gpsTracks={gpsTracks}
          aiRecommendations={aiRecommendations}
          onNavigateSubTab={(st) => setSubTab(st)}
        />
      )}

      {subTab === 'work-order' && (
        <WorkOrderView
          workOrders={workOrders}
          onAddWorkOrder={handleAddWorkOrder}
          onUpdateStatus={handleUpdateWOStatus}
        />
      )}

      {subTab === 'task-assignment' && (
        <TaskAssignmentView
          tasks={tasks}
          onAddTask={(t) => setTasks([t, ...tasks])}
        />
      )}

      {subTab === 'mandor-mobile' && (
        <MandorMobileView
          workOrders={workOrders}
          attendanceRecords={attendances}
          dailyActivities={dailyActivities}
          onAddActivity={handleAddDailyActivity}
        />
      )}

      {subTab === 'supervisor-dashboard' && (
        <SupervisorDashboardView
          gpsTracks={gpsTracks}
          workOrders={workOrders}
          attendanceRecords={attendances}
        />
      )}

      {subTab === 'daily-activity' && (
        <DailyActivityView
          activities={dailyActivities}
          onAddActivity={handleAddDailyActivity}
        />
      )}

      {(subTab === 'fertilizer-activity' ||
        subTab === 'spraying-activity' ||
        subTab === 'pruning-activity' ||
        subTab === 'road-maintenance' ||
        subTab === 'pest-control-activity') && (
        <ActivitiesManagementView
          fertilizers={fertilizers}
          sprayings={sprayings}
          prunings={prunings}
          maintenances={maintenances}
          pestControls={pestControls}
          activeSubTab={subTab}
        />
      )}

      {subTab === 'field-checklist' && (
        <FieldChecklistView
          checklists={checklists}
          onAddChecklist={(c) => setChecklists([c, ...checklists])}
        />
      )}

      {subTab === 'field-photos' && (
        <FieldPhotoGalleryView photos={photos} />
      )}

      {subTab === 'gps-tracking' && (
        <GpsTrackingView gpsTracks={gpsTracks} />
      )}

      {subTab === 'attendance-field' && (
        <FieldAttendanceView
          attendances={attendances}
          onAddAttendance={(att) => setAttendances([att, ...attendances])}
        />
      )}

      {subTab === 'offline-sync' && (
        <OfflineSyncCenterView
          queueItems={syncQueue}
          onTriggerSync={handleTriggerSync}
        />
      )}

      {subTab === 'field-timeline' && (
        <FieldTimelineView timelineEvents={timelineEvents} />
      )}

      {subTab === 'ai-assistant' && (
        <AIOperationAssistantView aiRecommendations={aiRecommendations} />
      )}

      {subTab === 'api-docs' && <FieldApiDocsView />}

      {subTab === 'prompt8-roadmap' && <Prompt8RoadmapView />}
    </div>
  );
};
