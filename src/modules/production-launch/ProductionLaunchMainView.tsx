import React, { useState } from 'react';
import { ScrollableSubNav, TabItem } from '../../components/ScrollableSubNav';
import {
  Rocket,
  Globe,
  Wifi,
  Code2,
  CheckCircle2,
  Server,
  Award,
  Sparkles
} from 'lucide-react';
import { ProductionChecklistLaunchView } from './views/ProductionChecklistLaunchView';
import { I18nLocalizationView } from './views/I18nLocalizationView';
import { PwaOfflineSyncView } from './views/PwaOfflineSyncView';
import { ApiSwaggerDocsView } from './views/ApiSwaggerDocsView';
import { QaTestingBenchmarkView } from './views/QaTestingBenchmarkView';
import { DeploymentManifestView } from './views/DeploymentManifestView';
import { CommercialEditionsView } from './views/CommercialEditionsView';

export const ProductionLaunchMainView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'launch' | 'i18n' | 'pwa' | 'swagger' | 'qa' | 'deploy' | 'editions'
  >('launch');

  const launchTabs: TabItem[] = [
    { id: 'launch', label: 'Launch Signoff', icon: Rocket },
    { id: 'i18n', label: 'i18n Localizer', icon: Globe },
    { id: 'pwa', label: 'PWA & Offline Queue', icon: Wifi },
    { id: 'swagger', label: 'OpenAPI Swagger', icon: Code2 },
    { id: 'qa', label: 'QA & OWASP Audit', icon: CheckCircle2 },
    { id: 'deploy', label: 'Docker & K8s', icon: Server },
    { id: 'editions', label: 'Commercial Tiers', icon: Award },
  ];

  return (
    <div className="space-y-6">
      {/* Module 16 Sub-Header Navigation */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-lg">
        <ScrollableSubNav
          items={launchTabs}
          activeId={activeTab}
          onChange={(id) => setActiveTab(id as any)}
          activeColorClass="bg-emerald-600 text-white shadow-md"
        />
      </div>

      {/* Tab Render Body */}
      {activeTab === 'launch' && <ProductionChecklistLaunchView />}
      {activeTab === 'i18n' && <I18nLocalizationView />}
      {activeTab === 'pwa' && <PwaOfflineSyncView />}
      {activeTab === 'swagger' && <ApiSwaggerDocsView />}
      {activeTab === 'qa' && <QaTestingBenchmarkView />}
      {activeTab === 'deploy' && <DeploymentManifestView />}
      {activeTab === 'editions' && <CommercialEditionsView />}
    </div>
  );
};
