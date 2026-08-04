import React, { useState } from 'react';
import { ScrollableSubNav } from '../../components/ScrollableSubNav';
import {
  LayoutDashboard,
  FileSpreadsheet,
  Wallet,
  Building2,
  PieChart,
  FileText,
  BarChart3,
  Brain,
  Sparkles,
} from 'lucide-react';

import { FinanceDashboardView } from './views/FinanceDashboardView';
import { CoaGeneralLedgerView } from './views/CoaGeneralLedgerView';
import { CashBankManagementView } from './views/CashBankManagementView';
import { ApArInvoicingView } from './views/ApArInvoicingView';
import { BudgetCostCenterView } from './views/BudgetCostCenterView';
import { FinancialStatementsView } from './views/FinancialStatementsView';
import { BusinessIntelligenceView } from './views/BusinessIntelligenceView';
import { AiFinancialIntelligenceView } from './views/AiFinancialIntelligenceView';
import { Prompt13RoadmapView } from './views/Prompt13RoadmapView';

export const FinanceMainView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>('dashboard');

  const subTabs = [
    { id: 'dashboard', label: 'Finance Dashboard', icon: LayoutDashboard },
    { id: 'coa', label: 'COA & General Ledger', icon: FileSpreadsheet },
    { id: 'cash-bank', label: 'Kas & Rekening Bank', icon: Wallet },
    { id: 'ap-ar', label: 'Hutang AP & Piutang AR', icon: Building2 },
    { id: 'budget', label: 'Budget & Cost Center', icon: PieChart },
    { id: 'reports', label: 'Laporan P&L & Neraca', icon: FileText },
    { id: 'bi', label: 'Business Intelligence', icon: BarChart3 },
    { id: 'ai-finance', label: 'AI Financial Intelligence', icon: Brain },
    { id: 'prompt13', label: 'Roadmap Prompt 13', icon: Sparkles },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Subtabs */}
      <div className="bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        <ScrollableSubNav
          items={subTabs}
          activeId={activeSubTab}
          onChange={(id) => setActiveSubTab(id)}
          activeColorClass="bg-emerald-600 text-white shadow-lg"
        />
      </div>

      {/* Subtab View Router */}
      {activeSubTab === 'dashboard' && <FinanceDashboardView onNavigateSubTab={(t) => setActiveSubTab(t)} />}
      {activeSubTab === 'coa' && <CoaGeneralLedgerView />}
      {activeSubTab === 'cash-bank' && <CashBankManagementView />}
      {activeSubTab === 'ap-ar' && <ApArInvoicingView />}
      {activeSubTab === 'budget' && <BudgetCostCenterView />}
      {activeSubTab === 'reports' && <FinancialStatementsView />}
      {activeSubTab === 'bi' && <BusinessIntelligenceView />}
      {activeSubTab === 'ai-finance' && <AiFinancialIntelligenceView />}
      {activeSubTab === 'prompt13' && <Prompt13RoadmapView />}
    </div>
  );
};
