import React, { useState } from 'react';
import {
  Wrench,
  Boxes,
  UserCheck,
  Clock,
  Truck,
  Fuel,
  DollarSign,
  Sparkles,
  Users,
  LayoutDashboard,
  ShieldAlert,
} from 'lucide-react';

import { AssetDashboardView } from './components/AssetDashboardView';
import { AssetRegisterView } from './components/AssetRegisterView';
import { AssetAssignmentInspectionView } from './components/AssetAssignmentInspectionView';
import { PreventiveCorrectiveView } from './components/PreventiveCorrectiveView';
import { WorkshopManagementView } from './components/WorkshopManagementView';
import { FleetHeavyEquipmentView } from './components/FleetHeavyEquipmentView';
import { FuelManagementView } from './components/FuelManagementView';
import { CostDepreciationDisposalView } from './components/CostDepreciationDisposalView';
import { GpsAndAiPredictiveView } from './components/GpsAndAiPredictiveView';
import { Prompt11RoadmapView } from './components/Prompt11RoadmapView';

import {
  mockAssetCategories,
  mockAssetLocations,
  mockAssets,
  mockFleetVehicles,
  mockHeavyEquipment,
  mockEquipmentUtilizationLogs,
  mockPreventivePlans,
  mockCorrectiveWorkOrders,
  mockMaintenanceCalendarEvents,
  mockWorkshopJobOrders,
  mockMechanics,
  mockServiceHistoryRecords,
  mockFuelTanks,
  mockFuelTransactions,
  mockTyreRecords,
  mockBatteryRecords,
  mockSparePartUsages,
  mockAssetDepreciationRecords,
  mockAssetDisposals,
  mockGpsVehicleLogs,
  mockAiPredictiveMaintenanceInsights,
  mockAssetAssignments,
  mockAssetInspections,
} from './mockData';

import {
  AssetItem,
  WorkshopJobOrder,
  PreventivePlan,
  CorrectiveWorkOrder,
  AssetAssignment,
  AssetInspection,
} from './types';

export const EamMainView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>('dashboard');

  // Dynamic Data States
  const [assetsList, setAssetsList] = useState<AssetItem[]>(mockAssets);
  const [jobOrdersList, setJobOrdersList] = useState<WorkshopJobOrder[]>(mockWorkshopJobOrders);
  const [preventiveList, setPreventiveList] = useState<PreventivePlan[]>(mockPreventivePlans);
  const [correctiveList, setCorrectiveList] = useState<CorrectiveWorkOrder[]>(mockCorrectiveWorkOrders);
  const [assignmentsList, setAssignmentsList] = useState<AssetAssignment[]>(mockAssetAssignments);
  const [inspectionsList, setInspectionsList] = useState<AssetInspection[]>(mockAssetInspections);

  const handleAddAsset = (newAsset: AssetItem) => {
    setAssetsList((prev) => [newAsset, ...prev]);
  };

  const handleAddAssignment = (newAsg: AssetAssignment) => {
    setAssignmentsList((prev) => [newAsg, ...prev]);
  };

  const handleAddInspection = (newInsp: AssetInspection) => {
    setInspectionsList((prev) => [newInsp, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Module Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 overflow-x-auto scrollbar-none flex items-center gap-1 shadow-lg">
        <button
          onClick={() => setActiveSubTab('dashboard')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'dashboard'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" /> Dashboard EAM
        </button>

        <button
          onClick={() => setActiveSubTab('register')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'register'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Boxes className="h-4 w-4" /> Registrasi Aset
        </button>

        <button
          onClick={() => setActiveSubTab('assignment-inspection')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'assignment-inspection'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <UserCheck className="h-4 w-4" /> Penugasan & Inspeksi
        </button>

        <button
          onClick={() => setActiveSubTab('preventive-corrective')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'preventive-corrective'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Clock className="h-4 w-4" /> Preventive & Corrective
        </button>

        <button
          onClick={() => setActiveSubTab('workshop')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'workshop'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Wrench className="h-4 w-4 text-purple-400" /> Workshop Job Order
        </button>

        <button
          onClick={() => setActiveSubTab('fleet')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'fleet'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Truck className="h-4 w-4 text-blue-400" /> Fleet & Heavy Equipment
        </button>

        <button
          onClick={() => setActiveSubTab('fuel')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'fuel'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Fuel className="h-4 w-4 text-emerald-400" /> Fuel, Ban & Aki
        </button>

        <button
          onClick={() => setActiveSubTab('cost-depreciation')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'cost-depreciation'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <DollarSign className="h-4 w-4 text-amber-400" /> Depresiasi & Disposal
        </button>

        <button
          onClick={() => setActiveSubTab('gps-ai')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'gps-ai'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sparkles className="h-4 w-4 text-purple-300" /> GPS & AI Predictive
        </button>

        <button
          onClick={() => setActiveSubTab('prompt11-roadmap')}
          className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 shrink-0 transition-all cursor-pointer ${
            activeSubTab === 'prompt11-roadmap'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-indigo-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Users className="h-4 w-4" /> Prompt 11 Roadmap (HRM)
        </button>
      </div>

      {/* Active Subtab Content Renderer */}
      {activeSubTab === 'dashboard' && (
        <AssetDashboardView
          assets={assetsList}
          vehicles={mockFleetVehicles}
          heavyEquipment={mockHeavyEquipment}
          workshopJobs={jobOrdersList}
          preventivePlans={preventiveList}
          correctiveWos={correctiveList}
          fuelTransactions={mockFuelTransactions}
          aiInsights={mockAiPredictiveMaintenanceInsights}
          onNavigateSubTab={(tabId) => setActiveSubTab(tabId)}
        />
      )}

      {activeSubTab === 'register' && (
        <AssetRegisterView
          assets={assetsList}
          categories={mockAssetCategories}
          locations={mockAssetLocations}
          onAddAsset={handleAddAsset}
        />
      )}

      {activeSubTab === 'assignment-inspection' && (
        <AssetAssignmentInspectionView
          assignments={assignmentsList}
          inspections={inspectionsList}
          assets={assetsList}
          onAddAssignment={handleAddAssignment}
          onAddInspection={handleAddInspection}
        />
      )}

      {activeSubTab === 'preventive-corrective' && (
        <PreventiveCorrectiveView
          preventivePlans={preventiveList}
          correctiveWos={correctiveList}
          calendarEvents={mockMaintenanceCalendarEvents}
          assets={assetsList}
        />
      )}

      {activeSubTab === 'workshop' && (
        <WorkshopManagementView
          workshopJobs={jobOrdersList}
          mechanics={mockMechanics}
          serviceHistory={mockServiceHistoryRecords}
          assets={assetsList}
        />
      )}

      {activeSubTab === 'fleet' && (
        <FleetHeavyEquipmentView
          vehicles={mockFleetVehicles}
          heavyEquipment={mockHeavyEquipment}
          utilizationLogs={mockEquipmentUtilizationLogs}
        />
      )}

      {activeSubTab === 'fuel' && (
        <FuelManagementView
          tanks={mockFuelTanks}
          transactions={mockFuelTransactions}
          tyreRecords={mockTyreRecords}
          batteryRecords={mockBatteryRecords}
        />
      )}

      {activeSubTab === 'cost-depreciation' && (
        <CostDepreciationDisposalView
          sparePartUsages={mockSparePartUsages}
          depreciationRecords={mockAssetDepreciationRecords}
          disposals={mockAssetDisposals}
        />
      )}

      {activeSubTab === 'gps-ai' && (
        <GpsAndAiPredictiveView
          gpsLogs={mockGpsVehicleLogs}
          aiInsights={mockAiPredictiveMaintenanceInsights}
        />
      )}

      {activeSubTab === 'prompt11-roadmap' && <Prompt11RoadmapView />}
    </div>
  );
};
