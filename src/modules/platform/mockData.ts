import {
  Tenant,
  LicenseKey,
  ActivatedDevice,
  Subscription,
  Invoice,
  MarketplaceAddon,
  BackupJob,
  SystemHealthMetric,
  AuditTrailLog
} from './types';

export const mockTenants: Tenant[] = [
  {
    id: 'ten-001',
    tenantCode: 'TEN-SOCFIN',
    tenantName: 'PT Socfin Indonesia (Socfindo)',
    companyName: 'Socfin Group Plantation Division',
    subdomain: 'socfindo.palmvision.ai',
    customDomain: 'smart-estate.socfindo.co.id',
    isolationMode: 'SCHEMA_PER_TENANT',
    status: 'ACTIVE',
    storageUsedGb: 142.5,
    storageLimitGb: 1000,
    activeUsersCount: 320,
    maxUsersLimit: 500,
    createdAt: '2025-01-15'
  },
  {
    id: 'ten-002',
    tenantCode: 'TEN-WILMAR',
    tenantName: 'Wilmar International Estate Div',
    companyName: 'Wilmar Agri-Tech Enterprise',
    subdomain: 'wilmar-agri.palmvision.ai',
    customDomain: 'agri-twin.wilmar.com',
    isolationMode: 'MULTI_DB',
    status: 'ACTIVE',
    storageUsedGb: 680.0,
    storageLimitGb: 2500,
    activeUsersCount: 1250,
    maxUsersLimit: 2000,
    createdAt: '2025-02-01'
  },
  {
    id: 'ten-003',
    tenantCode: 'TEN-SAMPORNA',
    tenantName: 'Sampoerna Agro Tbk',
    companyName: 'PT Sampoerna Agro Management',
    subdomain: 'sampoerna.palmvision.ai',
    isolationMode: 'SCHEMA_PER_TENANT',
    status: 'ACTIVE',
    storageUsedGb: 88.4,
    storageLimitGb: 500,
    activeUsersCount: 180,
    maxUsersLimit: 250,
    createdAt: '2025-03-10'
  },
  {
    id: 'ten-004',
    tenantCode: 'TEN-TRIAL-GNP',
    tenantName: 'PT Gunta Samba Plantation (Trial)',
    companyName: 'Gunta Samba Group',
    subdomain: 'guntasamba.palmvision.ai',
    isolationMode: 'SINGLE_DB_ISOLATED',
    status: 'TRIAL',
    storageUsedGb: 12.1,
    storageLimitGb: 50,
    activeUsersCount: 15,
    maxUsersLimit: 20,
    createdAt: '2025-07-20'
  }
];

export const mockLicenses: LicenseKey[] = [
  {
    id: 'lic-101',
    licenseKey: 'PVAI-GLOBAL-8849-2026-X99Z-ENTERPRISE',
    edition: 'GLOBAL_CONGLOMERATE',
    tenantId: 'ten-002',
    companyName: 'Wilmar International Estate Div',
    deviceLimit: 200,
    userLimit: 2000,
    activatedDevicesCount: 142,
    issueDate: '2025-02-01',
    expiryDate: '2027-02-01',
    status: 'ACTIVE',
    offlineActivationSupported: true,
    hardwareFingerprintRequired: true
  },
  {
    id: 'lic-102',
    licenseKey: 'PVAI-ENTPRO-4412-2025-SOCFINDO',
    edition: 'ENTERPRISE_PRO',
    tenantId: 'ten-001',
    companyName: 'PT Socfin Indonesia (Socfindo)',
    deviceLimit: 50,
    userLimit: 500,
    activatedDevicesCount: 38,
    issueDate: '2025-01-15',
    expiryDate: '2026-01-15',
    status: 'ACTIVE',
    offlineActivationSupported: true,
    hardwareFingerprintRequired: true
  },
  {
    id: 'lic-103',
    licenseKey: 'PVAI-ONPREM-9001-LTS-SAMPOERNA',
    edition: 'ON_PREMISE_LTS',
    tenantId: 'ten-003',
    companyName: 'Sampoerna Agro Tbk',
    deviceLimit: 30,
    userLimit: 250,
    activatedDevicesCount: 22,
    issueDate: '2025-03-10',
    expiryDate: '2028-03-10',
    status: 'ACTIVE',
    offlineActivationSupported: true,
    hardwareFingerprintRequired: true
  }
];

export const mockDevices: ActivatedDevice[] = [
  {
    id: 'dev-001',
    deviceId: 'DEV-HW-8842-WIN',
    deviceName: 'Riau HQ Weighbridge Terminal 01',
    platform: 'WINDOWS',
    fingerprintHash: 'E9C7B21F-99A0-4C21-B8E2-55C7A39821BB',
    ipAddress: '10.14.22.105',
    activatedAt: '2025-01-16 08:30:00',
    lastActive: '2 min ago',
    status: 'AUTHORIZED'
  },
  {
    id: 'dev-002',
    deviceId: 'DEV-MBL-7711-AND',
    deviceName: 'Field Manager Rugged Tablet - Mandor Agus',
    platform: 'ANDROID',
    fingerprintHash: '44A12B00-D1C9-4F55-A912-33490012AA02',
    ipAddress: '182.168.12.88',
    activatedAt: '2025-02-10 14:15:00',
    lastActive: '5 min ago',
    status: 'AUTHORIZED'
  },
  {
    id: 'dev-003',
    deviceId: 'DEV-MAC-3301-OSX',
    deviceName: 'GIS Analysis Workstation 02',
    platform: 'MACOS',
    fingerprintHash: 'A1099CC2-55E0-11EF-8821-001122334455',
    ipAddress: '192.168.1.45',
    activatedAt: '2025-03-12 10:00:00',
    lastActive: '1 hr ago',
    status: 'AUTHORIZED'
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-001',
    subscriptionCode: 'SUB-2025-SOCFIN',
    tenantName: 'PT Socfin Indonesia (Socfindo)',
    planName: 'ENTERPRISE_PRO',
    billingCycle: 'YEARLY',
    amountUsd: 48000,
    nextBillingDate: '2026-01-15',
    paymentStatus: 'PAID',
    autoRenew: true
  },
  {
    id: 'sub-002',
    subscriptionCode: 'SUB-2025-WILMAR',
    tenantName: 'Wilmar International Estate Div',
    planName: 'GLOBAL_CONGLOMERATE',
    billingCycle: 'YEARLY',
    amountUsd: 180000,
    nextBillingDate: '2026-02-01',
    paymentStatus: 'PAID',
    autoRenew: true
  },
  {
    id: 'sub-003',
    subscriptionCode: 'SUB-2025-SAMPOERNA',
    tenantName: 'Sampoerna Agro Tbk',
    planName: 'ENTERPRISE_PRO',
    billingCycle: 'QUARTERLY',
    amountUsd: 12500,
    nextBillingDate: '2025-09-10',
    paymentStatus: 'DUE',
    autoRenew: true
  }
];

export const mockInvoices: Invoice[] = [
  {
    id: 'inv-801',
    invoiceNo: 'INV/2025/08/PV-SOCFIN-001',
    customerName: 'PT Socfin Indonesia',
    amountUsd: 48000,
    taxUsd: 5280,
    totalUsd: 53280,
    issueDate: '2025-01-15',
    dueDate: '2025-02-15',
    status: 'PAID',
    paymentGateway: 'STRIPE'
  },
  {
    id: 'inv-802',
    invoiceNo: 'INV/2025/08/PV-WILMAR-002',
    customerName: 'Wilmar Agri-Tech Enterprise',
    amountUsd: 180000,
    taxUsd: 19800,
    totalUsd: 199800,
    issueDate: '2025-02-01',
    dueDate: '2025-03-01',
    status: 'PAID',
    paymentGateway: 'XENDIT'
  },
  {
    id: 'inv-803',
    invoiceNo: 'INV/2025/08/PV-SAMPOERNA-003',
    customerName: 'PT Sampoerna Agro Tbk',
    amountUsd: 12500,
    taxUsd: 1375,
    totalUsd: 13875,
    issueDate: '2025-06-10',
    dueDate: '2025-07-10',
    status: 'UNPAID',
    paymentGateway: 'MIDTRANS'
  }
];

export const mockMarketplaceAddons: MarketplaceAddon[] = [
  {
    id: 'add-01',
    addonCode: 'ADD-SAP-CONNECTOR',
    addonName: 'SAP S/4HANA Agriculture Bi-Directional Sync',
    category: 'CONNECTOR',
    version: '2.4.0',
    author: 'PalmVision Official',
    priceUsd: 1200,
    installed: true,
    rating: 4.9,
    downloadsCount: 142,
    description: 'Enterprise ERP connector for automated GL posting of FFB harvest yields and weighbridge transactions.'
  },
  {
    id: 'add-02',
    addonCode: 'ADD-DRONE-YOLO-PALM',
    addonName: 'Ultra-High Res Palm Tree Counting & Ganoderma AI',
    category: 'DRONE_MODEL',
    version: '3.1.2',
    author: 'PalmVision AI Lab',
    priceUsd: 850,
    installed: true,
    rating: 5.0,
    downloadsCount: 389,
    description: 'Specialized computer vision model for automated 4K drone orthomosaic palm tree counting and early disease detection.'
  },
  {
    id: 'add-03',
    addonCode: 'ADD-RSPO-AUDIT-PACK',
    addonName: 'RSPO & ISPO Compliance Reporting Suite',
    category: 'REPORT',
    version: '1.8.0',
    author: 'AgriCert Global',
    priceUsd: 0,
    installed: false,
    rating: 4.8,
    downloadsCount: 612,
    description: 'Automated ESG, peatland water management, and zero-deforestation verification reports for annual audits.'
  }
];

export const mockBackupJobs: BackupJob[] = [
  {
    id: 'bk-01',
    jobCode: 'BKP-DAILY-FULL-2026-08-03',
    backupType: 'FULL',
    targetStorage: 'GCP_BUCKET',
    sizeMb: 42100,
    timestamp: '2026-08-03 03:00:00',
    status: 'SUCCESS',
    encryptionType: 'AES_256_GCM'
  },
  {
    id: 'bk-02',
    jobCode: 'BKP-INC-SOCFIN-2026-08-03-1200',
    backupType: 'TENANT_SNAPSHOT',
    targetStorage: 'S3_BUCKET',
    sizeMb: 1450,
    timestamp: '2026-08-03 12:00:00',
    status: 'SUCCESS',
    encryptionType: 'KMS_MANAGED'
  }
];

export const mockHealthMetrics: SystemHealthMetric[] = [
  {
    id: 'sys-01',
    serviceName: 'Multi-Tenant API Gateway (Cloud Run)',
    status: 'HEALTHY',
    latencyMs: 18,
    cpuLoadPct: 24,
    memoryUsagePct: 42,
    activeConnections: 1420
  },
  {
    id: 'sys-02',
    serviceName: 'PostgreSQL Database Cluster (Drizzle ORM)',
    status: 'HEALTHY',
    latencyMs: 4,
    cpuLoadPct: 18,
    memoryUsagePct: 58,
    activeConnections: 120
  },
  {
    id: 'sys-03',
    serviceName: 'MQTT / LoRaWAN Ingestion Pipeline',
    status: 'HEALTHY',
    latencyMs: 12,
    cpuLoadPct: 31,
    memoryUsagePct: 35,
    activeConnections: 8400
  },
  {
    id: 'sys-04',
    serviceName: 'Gemini 3.6 AI Inferences Pool',
    status: 'HEALTHY',
    latencyMs: 310,
    cpuLoadPct: 45,
    memoryUsagePct: 62,
    activeConnections: 35
  }
];

export const mockAuditLogs: AuditTrailLog[] = [
  {
    id: 'aud-001',
    timestamp: '2026-08-03 09:12:44',
    actorEmail: 'admin@socfindo.co.id',
    action: 'LICENSE_DEVICE_REGISTERED',
    module: 'License Engine',
    ipAddress: '182.168.12.88',
    tenantName: 'PT Socfin Indonesia',
    severity: 'INFO'
  },
  {
    id: 'aud-002',
    timestamp: '2026-08-03 08:45:10',
    actorEmail: 'devops-bot@palmvision.ai',
    action: 'TENANT_SCHEMA_MIGRATION_COMPLETED',
    module: 'Multi-Tenant Manager',
    ipAddress: '10.0.4.12',
    tenantName: 'Wilmar International',
    severity: 'INFO'
  },
  {
    id: 'aud-003',
    timestamp: '2026-08-03 07:30:18',
    actorEmail: 'security@palmvision.ai',
    action: 'UNAUTHORIZED_DEVICE_FINGERPRINT_REJECTED',
    module: 'Security Vault',
    ipAddress: '114.122.90.15',
    tenantName: 'Gunta Samba (Trial)',
    severity: 'WARN'
  }
];
