import React, { useState } from 'react';
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

  return (
    <div className="space-y-6">
      {/* Module 16 Sub-Header Navigation */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-2 shadow-lg flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => setActiveTab('launch')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'launch'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Rocket className="h-4 w-4 text-emerald-300" />
            <span>Launch Signoff</span>
          </button>

          <button
            onClick={() => setActiveTab('i18n')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'i18n'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Globe className="h-4 w-4 text-teal-300" />
            <span>i18n Localizer</span>
          </button>

          <button
            onClick={() => setActiveTab('pwa')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'pwa'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Wifi className="h-4 w-4 text-indigo-300" />
            <span>PWA & Offline Queue</span>
          </button>

          <button
            onClick={() => setActiveTab('swagger')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'swagger'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Code2 className="h-4 w-4 text-sky-300" />
            <span>OpenAPI Swagger</span>
          </button>

          <button
            onClick={() => setActiveTab('qa')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'qa'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span>QA & OWASP Audit</span>
          </button>

          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'deploy'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Server className="h-4 w-4 text-indigo-300" />
            <span>Docker & K8s</span>
          </button>

          <button
            onClick={() => setActiveTab('editions')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'editions'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="h-4 w-4 text-amber-300" />
            <span>Commercial Tiers</span>
          </button>
        </div>
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
