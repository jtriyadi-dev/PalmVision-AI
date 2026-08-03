import {
  TranslationKeyMap,
  PwaStatus,
  ApiEndpointSpec,
  TestSuiteResult,
  ProductionChecklistItem,
  CommercialEdition
} from './types';

export const mockTranslations: TranslationKeyMap[] = [
  { key: 'app.title', en: 'PalmVision AI Enterprise', id: 'PalmVision AI Enterprise', category: 'NAVIGATION' },
  { key: 'nav.dashboard', en: 'Smart Executive Dashboard', id: 'Dashboard Eksekutif Cerdas', category: 'NAVIGATION' },
  { key: 'nav.harvest', en: 'FFB Harvest Management', id: 'Manajemen Panen TBS', category: 'HARVEST' },
  { key: 'nav.finance', en: 'Plantation Finance & Accounting', id: 'Keuangan & Akuntansi Perkebunan', category: 'FINANCE' },
  { key: 'nav.ai_center', en: 'Gemini 3.6 AI Inferences', id: 'Pusat Inteligensi AI Gemini 3.6', category: 'AI' },
  { key: 'nav.smart_iot', en: 'IoT Telemetry & Digital Twin', id: 'Telemetri IoT & Digital Twin', category: 'SMART_IOT' },
  { key: 'common.save', en: 'Save Changes', id: 'Simpan Perubahan', category: 'COMMON' },
  { key: 'common.cancel', en: 'Cancel', id: 'Batal', category: 'COMMON' },
  { key: 'common.export_pdf', en: 'Export PDF Report', id: 'Ekspor Laporan PDF', category: 'COMMON' }
];

export const mockPwaStatus: PwaStatus = {
  isInstalled: true,
  serviceWorkerActive: true,
  offlineStorageUsedMb: 18.4,
  pendingSyncQueueCount: 3,
  lastSyncedTimestamp: '2 mins ago'
};

export const mockApiEndpoints: ApiEndpointSpec[] = [
  {
    id: 'api-01',
    method: 'POST',
    path: '/api/v1/auth/tenant-login',
    summary: 'Multi-Tenant Authentication & JWT Token Exchange',
    tag: 'AUTHENTICATION',
    parametersCount: 2,
    requiresAuth: false,
    exampleResponseJson: '{\n  "status": "SUCCESS",\n  "token": "eyJhbGciOiJIUzI1NiIsIn...",\n  "tenantId": "ten-001"\n}'
  },
  {
    id: 'api-02',
    method: 'GET',
    path: '/api/v1/harvest/weighbridge/transactions',
    summary: 'Retrieve Weighbridge Scale Tickets & FFB Tonnage',
    tag: 'WEIGHBRIDGE',
    parametersCount: 4,
    requiresAuth: true,
    exampleResponseJson: '[\n  {\n    "ticketNo": "WB-2026-0803-001",\n    "grossKg": 14200,\n    "netKg": 12850,\n    "gradingQuality": "GRADE_A"\n  }\n]'
  },
  {
    id: 'api-03',
    method: 'GET',
    path: '/api/v1/iot/telemetry/live-sensors',
    summary: 'Stream Realtime LoRaWAN Moisture & Weather Stream',
    tag: 'IOT_TELEMETRY',
    parametersCount: 2,
    requiresAuth: true,
    exampleResponseJson: '{\n  "gatewayId": "GW-SUMATRA-01",\n  "soilMoisturePct": 64.2,\n  "rainfallMm": 14.5\n}'
  },
  {
    id: 'api-04',
    method: 'POST',
    path: '/api/v1/ai/gemini/agronomy-advisor',
    summary: 'Execute Gemini 3.6 Agronomy & Pest Reasoning',
    tag: 'AI_CENTER',
    parametersCount: 3,
    requiresAuth: true,
    exampleResponseJson: '{\n  "diagnosis": "Ganoderma boninense suspected in Block B14",\n  "recommendedAction": "Apply Trichoderma biopesticide immediately",\n  "confidencePercent": 96.8\n}'
  }
];

export const mockTestSuites: TestSuiteResult[] = [
  {
    id: 'ts-01',
    testName: 'Unit Test: FFB Grading & Payroll Bonus Algorithm',
    category: 'UNIT',
    status: 'PASSED',
    durationMs: 142,
    score: 100,
    details: 'Verified 42 edge cases including ripeness deductions and overtime rates.'
  },
  {
    id: 'ts-02',
    testName: 'Security Audit: OWASP Top 10 Penetration Scan',
    category: 'OWASP_SECURITY',
    status: 'PASSED',
    durationMs: 840,
    score: 98,
    details: '0 SQLi, XSS, CSRF, or Broken Access Control vulnerabilities detected.'
  },
  {
    id: 'ts-03',
    testName: 'E2E Scenario: Offline Harvest Log to Online SAP Post',
    category: 'E2E',
    status: 'PASSED',
    durationMs: 1250,
    score: 100,
    details: 'Simulated 500 offline mandor log entries with automated retry queue sync.'
  },
  {
    id: 'ts-04',
    testName: 'Performance Benchmark: 10,000 Concurrent IoT MQTT Telemetry',
    category: 'PERFORMANCE_BENCHMARK',
    status: 'PASSED',
    durationMs: 450,
    score: 96,
    details: 'Sub-300ms ingestion latency maintained across 10k mock sensors.'
  }
];

export const mockProductionChecklist: ProductionChecklistItem[] = [
  {
    id: 'chk-01',
    category: 'UI_UX',
    title: 'Enterprise Design System & High-Contrast Typography',
    description: 'Verified consistent Tailwind palette, 65-75ch line width constraints, and dark/light polish.',
    isVerified: true,
    verifiedBy: 'UI/UX Lead Architect'
  },
  {
    id: 'chk-02',
    category: 'PERFORMANCE',
    title: 'Vite Code Splitting & Sub-2s Dashboard Load',
    description: 'Lazy imports applied across all 16 modules; bundle size optimized under 2.5MB.',
    isVerified: true,
    verifiedBy: 'Performance SRE Engineer'
  },
  {
    id: 'chk-03',
    category: 'SECURITY',
    title: 'Multi-Tenant RSA License Signing & Hardware Fingerprint',
    description: 'Cryptographic binding active with AES-256 GCM vault field encryption.',
    isVerified: true,
    verifiedBy: 'Cyber Security Consultant'
  },
  {
    id: 'chk-04',
    category: 'I18N_PWA',
    title: 'Bilingual Translation Matrix (ID/EN) & PWA Service Worker',
    description: 'IndexedDB offline queue active with auto-background sync.',
    isVerified: true,
    verifiedBy: 'Full Stack Engineer'
  },
  {
    id: 'chk-05',
    category: 'DATABASE_API',
    title: 'PostgreSQL Drizzle Schemas & OpenAPI 3.1 Swagger Docs',
    description: '38 tables defined with UUID primary keys and soft delete support.',
    isVerified: true,
    verifiedBy: 'Database Architect'
  },
  {
    id: 'chk-06',
    category: 'DEPLOYMENT',
    title: 'Cloud Run Container & On-Premise Docker Compose Manifests',
    description: 'Helm chart and zero-downtime deployment scripts verified.',
    isVerified: true,
    verifiedBy: 'DevOps Lead Engineer'
  }
];

export const mockCommercialEditions: CommercialEdition[] = [
  {
    id: 'ed-01',
    code: 'COMMUNITY',
    name: 'PalmVision AI Community Edition',
    maxHectares: 'Up to 500 Ha',
    maxUsers: '10 Users',
    includedModulesCount: 5,
    customBrandingAllowed: false,
    onPremiseDeploymentAllowed: false,
    monthlyPriceUsd: 0
  },
  {
    id: 'ed-02',
    code: 'PROFESSIONAL',
    name: 'PalmVision AI Estate Professional',
    maxHectares: 'Up to 5,000 Ha',
    maxUsers: '100 Users',
    includedModulesCount: 10,
    customBrandingAllowed: true,
    onPremiseDeploymentAllowed: false,
    monthlyPriceUsd: 1250
  },
  {
    id: 'ed-03',
    code: 'ENTERPRISE',
    name: 'PalmVision AI Enterprise Pro (SaaS)',
    maxHectares: 'Up to 25,000 Ha',
    maxUsers: '500 Users',
    includedModulesCount: 16,
    customBrandingAllowed: true,
    onPremiseDeploymentAllowed: true,
    monthlyPriceUsd: 4000
  },
  {
    id: 'ed-04',
    code: 'CORPORATE_HOLDING',
    name: 'PalmVision AI Global Conglomerate (Uncapped)',
    maxHectares: 'Unlimited Hectares',
    maxUsers: 'Unlimited Users',
    includedModulesCount: 16,
    customBrandingAllowed: true,
    onPremiseDeploymentAllowed: true,
    monthlyPriceUsd: 15000
  }
];
