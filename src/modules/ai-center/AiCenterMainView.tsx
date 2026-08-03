import React, { useState } from 'react';
import {
  Brain,
  Activity,
  Bot,
  Sparkles,
  Zap,
  LineChart,
  Scan,
  Database,
  FileCode2,
  Workflow,
  Cpu,
  Layers,
  ShieldCheck,
  Settings,
  Radio,
  ChevronRight,
} from 'lucide-react';

import { AiDashboardView } from './views/AiDashboardView';
import { AiCommandCenterView } from './views/AiCommandCenterView';
import { AiChatAssistantView } from './views/AiChatAssistantView';
import { AiCopilotModuleView } from './views/AiCopilotModuleView';
import { AiRecommendationView } from './views/AiRecommendationView';
import { AiAnalyticsForecastingView } from './views/AiAnalyticsForecastingView';
import { AiVisionOcrDocIntelView } from './views/AiVisionOcrDocIntelView';
import { KnowledgeBaseRagView } from './views/KnowledgeBaseRagView';
import { PromptManagementView } from './views/PromptManagementView';
import { AiWorkflowAutomationView } from './views/AiWorkflowAutomationView';
import { ModelProviderManagementView } from './views/ModelProviderManagementView';
import { VectorDbRagView } from './views/VectorDbRagView';
import { AiMonitoringSecurityView } from './views/AiMonitoringSecurityView';
import { AiSettingsView } from './views/AiSettingsView';
import { Prompt14RoadmapView } from './views/Prompt14RoadmapView';

export const AiCenterMainView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<string>('dashboard');

  const subTabs = [
    { id: 'dashboard', label: 'AI Dashboard', icon: Brain },
    { id: 'command-center', label: 'AI Command Center', icon: Activity },
    { id: 'chat', label: 'AI Chat Assistant', icon: Bot },
    { id: 'copilot', label: 'AI Copilot Context', icon: Sparkles },
    { id: 'recommendation', label: 'AI Recommendations', icon: Zap },
    { id: 'analytics', label: 'Analytics & Forecast', icon: LineChart },
    { id: 'vision-ocr', label: 'AI Vision & OCR', icon: Scan },
    { id: 'rag', label: 'Knowledge Base (RAG)', icon: Database },
    { id: 'prompts', label: 'Prompt Management', icon: FileCode2 },
    { id: 'workflow', label: 'AI Workflows', icon: Workflow },
    { id: 'models', label: 'Model & Provider', icon: Cpu },
    { id: 'vector-db', label: 'Vector DB Engine', icon: Layers },
    { id: 'security', label: 'Security & Cost', icon: ShieldCheck },
    { id: 'settings', label: 'AI Settings', icon: Settings },
    { id: 'prompt14', label: 'Prompt 14 Roadmap', icon: Radio },
  ];

  const handleNavigateSubTab = (tabId: string) => {
    setActiveSubTab(tabId);
  };

  return (
    <div className="space-y-6">
      {/* Sub-navigation Header Pills */}
      <div className="bg-slate-900/90 border border-slate-800/80 backdrop-blur-md p-2 rounded-2xl shadow-xl overflow-x-auto scrollbar-none sticky top-0 z-20">
        <div className="flex items-center gap-1.5 min-w-max">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/40 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* View Content Renderer */}
      <div className="animate-fade-in">
        {activeSubTab === 'dashboard' && <AiDashboardView onNavigateSubTab={handleNavigateSubTab} />}
        {activeSubTab === 'command-center' && <AiCommandCenterView />}
        {activeSubTab === 'chat' && <AiChatAssistantView />}
        {activeSubTab === 'copilot' && <AiCopilotModuleView />}
        {activeSubTab === 'recommendation' && <AiRecommendationView />}
        {activeSubTab === 'analytics' && <AiAnalyticsForecastingView />}
        {activeSubTab === 'vision-ocr' && <AiVisionOcrDocIntelView />}
        {activeSubTab === 'rag' && <KnowledgeBaseRagView />}
        {activeSubTab === 'prompts' && <PromptManagementView />}
        {activeSubTab === 'workflow' && <AiWorkflowAutomationView />}
        {activeSubTab === 'models' && <ModelProviderManagementView />}
        {activeSubTab === 'vector-db' && <VectorDbRagView />}
        {activeSubTab === 'security' && <AiMonitoringSecurityView />}
        {activeSubTab === 'settings' && <AiSettingsView />}
        {activeSubTab === 'prompt14' && <Prompt14RoadmapView />}
      </div>
    </div>
  );
};
