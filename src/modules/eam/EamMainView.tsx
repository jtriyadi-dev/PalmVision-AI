import React, { useState } from 'react';
import { ScrollableSubNav, TabItem } from '../../components/ScrollableSubNav';
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
  const [fleetVehiclesList, setFleetVehiclesList] = useState<FleetVehicle[]>(mockFleetVehicles);

  const handleAddAsset = (newAsset: AssetItem) => {
    setAssetsList((prev) => [newAsset, ...prev]);
  };

  const handleAddVehicle = (newVeh: FleetVehicle) => {
    setFleetVehiclesList((prev) => [newVeh, ...prev]);
  };

  const handleAddAssignment = (newAsg: AssetAssignment) => {
    setAssignmentsList((prev) => [newAsg, ...prev]);
  };

  const handleAddInspection = (newInsp: AssetInspection) => {
    setInspectionsList((prev) => [newInsp, ...prev]);
  };

  const eamTabs: TabItem[] = [
    { id: 'dashboard', label: 'Dashboard EAM', icon: LayoutDashboard },
    { id: 'register', label: 'Registrasi Aset', icon: Boxes },
    { id: 'assignment-inspection', label: 'Penugasan & Inspeksi', icon: UserCheck },
    { id: 'preventive-corrective', label: 'Preventive & Corrective', icon: Clock },
    { id: 'workshop', label: 'Workshop Job Order', icon: Wrench },
    { id: 'fleet', label: 'Fleet & Heavy Equipment', icon: Truck },
    { id: 'fuel', label: 'Fuel, Ban & Aki', icon: Fuel },
    { id: 'cost-depreciation', label: 'Depresiasi & Disposal', icon: DollarSign },
    { id: 'gps-ai', label: 'GPS & AI Predictive', icon: Sparkles },
    { id: 'prompt11-roadmap', label: 'Prompt 11 Roadmap (HRM)', icon: Users },
  ];

  return (
    <div className="space-y-6">
      {/* Sub-Module Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-lg">
        <ScrollableSubNav
          items={eamTabs}
          activeId={activeSubTab}
          onChange={(id) => setActiveSubTab(id)}
          activeColorClass="bg-emerald-600 text-white shadow-md"
        />
      </div>

      {/* Active Subtab Content Renderer */}
      {activeSubTab === 'dashboard' && (
        <AssetDashboardView
          assets={assetsList}
          vehicles={fleetVehiclesList}
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
          vehicles={fleetVehiclesList}
          heavyEquipment={mockHeavyEquipment}
          utilizationLogs={mockEquipmentUtilizationLogs}
          onAddVehicle={handleAddVehicle}
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
