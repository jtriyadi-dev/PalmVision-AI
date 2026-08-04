import React, { useState } from 'react';
import { ScrollableSubNav } from '../../components/ScrollableSubNav';
import {
  Users,
  LayoutDashboard,
  Briefcase,
  Clock,
  Calendar,
  CreditCard,
  GraduationCap,
  Smartphone,
  FileCheck,
  Brain,
  DollarSign,
} from 'lucide-react';

import { HrDashboardView } from './views/HrDashboardView';
import { EmployeeManagementView } from './views/EmployeeManagementView';
import { RecruitmentOnboardingView } from './views/RecruitmentOnboardingView';
import { AttendanceShiftView } from './views/AttendanceShiftView';
import { LeavePermissionView } from './views/LeavePermissionView';
import { PayrollBpjsPph21View } from './views/PayrollBpjsPph21View';
import { TrainingPerformanceView } from './views/TrainingPerformanceView';
import { EmployeeSelfServiceView } from './views/EmployeeSelfServiceView';
import { ContractsMedicalVisitorView } from './views/ContractsMedicalVisitorView';
import { AiWorkforceIntelligenceView } from './views/AiWorkforceIntelligenceView';
import { Prompt12RoadmapView } from './views/Prompt12RoadmapView';

export const HrmMainView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>('dashboard');

  const subTabs = [
    { id: 'dashboard', label: 'HR Dashboard', icon: LayoutDashboard },
    { id: 'employee', label: 'Karyawan & Org', icon: Users },
    { id: 'recruitment', label: 'Rekrutmen & Onboarding', icon: Briefcase },
    { id: 'attendance', label: 'Absensi & Shift', icon: Clock },
    { id: 'leave', label: 'Cuti & Izin', icon: Calendar },
    { id: 'payroll', label: 'Payroll & BPJS/PPh21', icon: CreditCard },
    { id: 'training', label: 'Training & KPI', icon: GraduationCap },
    { id: 'ess', label: 'ESS Mobile Portal', icon: Smartphone },
    { id: 'contracts', label: 'Kontrak, MCU & APD', icon: FileCheck },
    { id: 'ai-intelligence', label: 'AI Intelligence', icon: Brain },
    { id: 'prompt12', label: 'Roadmap Prompt 12', icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      {/* Module Navigation Subtabs */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        <ScrollableSubNav
          items={subTabs}
          activeId={activeSubTab}
          onChange={(id) => setActiveSubTab(id)}
          activeColorClass="bg-emerald-600 text-white shadow-lg"
        />
      </div>

      {/* View Switcher */}
      {activeSubTab === 'dashboard' && <HrDashboardView onNavigateSubTab={(tab) => setActiveSubTab(tab)} />}
      {activeSubTab === 'employee' && <EmployeeManagementView />}
      {activeSubTab === 'recruitment' && <RecruitmentOnboardingView />}
      {activeSubTab === 'attendance' && <AttendanceShiftView />}
      {activeSubTab === 'leave' && <LeavePermissionView />}
      {activeSubTab === 'payroll' && <PayrollBpjsPph21View />}
      {activeSubTab === 'training' && <TrainingPerformanceView />}
      {activeSubTab === 'ess' && <EmployeeSelfServiceView />}
      {activeSubTab === 'contracts' && <ContractsMedicalVisitorView />}
      {activeSubTab === 'ai-intelligence' && <AiWorkforceIntelligenceView />}
      {activeSubTab === 'prompt12' && <Prompt12RoadmapView />}
    </div>
  );
};
