export type LocaleLanguage = 'id' | 'en';

export interface TranslationKeyMap {
  key: string;
  en: string;
  id: string;
  category: 'NAVIGATION' | 'COMMON' | 'HARVEST' | 'FINANCE' | 'AI' | 'SMART_IOT';
}

export interface PwaStatus {
  isInstalled: boolean;
  serviceWorkerActive: boolean;
  offlineStorageUsedMb: number;
  pendingSyncQueueCount: number;
  lastSyncedTimestamp: string;
}

export interface ApiEndpointSpec {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  summary: string;
  tag: 'AUTHENTICATION' | 'TENANT' | 'HARVEST' | 'WEIGHBRIDGE' | 'IOT_TELEMETRY' | 'AI_CENTER';
  parametersCount: number;
  requiresAuth: boolean;
  exampleResponseJson: string;
}

export interface TestSuiteResult {
  id: string;
  testName: string;
  category: 'UNIT' | 'INTEGRATION' | 'E2E' | 'OWASP_SECURITY' | 'PERFORMANCE_BENCHMARK';
  status: 'PASSED' | 'FAILED' | 'SKIPPED';
  durationMs: number;
  score: number; // e.g. 98/100
  details: string;
}

export interface ProductionChecklistItem {
  id: string;
  category: 'UI_UX' | 'PERFORMANCE' | 'SECURITY' | 'I18N_PWA' | 'DATABASE_API' | 'DEPLOYMENT';
  title: string;
  description: string;
  isVerified: boolean;
  verifiedBy: string;
}

export interface CommercialEdition {
  id: string;
  code: 'COMMUNITY' | 'PROFESSIONAL' | 'ENTERPRISE' | 'CORPORATE_HOLDING' | 'GOVERNMENT_ISPO';
  name: string;
  maxHectares: string;
  maxUsers: string;
  includedModulesCount: number;
  customBrandingAllowed: boolean;
  onPremiseDeploymentAllowed: boolean;
  monthlyPriceUsd: number;
}
