export interface Tenant {
  id: string;
  tenantCode: string;
  tenantName: string;
  companyName: string;
  subdomain: string;
  customDomain?: string;
  isolationMode: 'SCHEMA_PER_TENANT' | 'SINGLE_DB_ISOLATED' | 'MULTI_DB';
  status: 'ACTIVE' | 'TRIAL' | 'SUSPENDED' | 'ARCHIVED';
  storageUsedGb: number;
  storageLimitGb: number;
  activeUsersCount: number;
  maxUsersLimit: number;
  createdAt: string;
}

export interface LicenseKey {
  id: string;
  licenseKey: string;
  edition: 'STARTER_ESTATE' | 'ENTERPRISE_PRO' | 'GLOBAL_CONGLOMERATE' | 'ON_PREMISE_LTS';
  tenantId: string;
  companyName: string;
  deviceLimit: number;
  userLimit: number;
  activatedDevicesCount: number;
  issueDate: string;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'PENDING_ACTIVATION';
  offlineActivationSupported: boolean;
  hardwareFingerprintRequired: boolean;
}

export interface ActivatedDevice {
  id: string;
  deviceId: string;
  deviceName: string;
  platform: 'WINDOWS' | 'MACOS' | 'LINUX' | 'ANDROID' | 'IOS' | 'WEB_BROWSER';
  fingerprintHash: string;
  ipAddress: string;
  activatedAt: string;
  lastActive: string;
  status: 'AUTHORIZED' | 'DEACTIVATED' | 'SUSPICIOUS';
}

export interface Subscription {
  id: string;
  subscriptionCode: string;
  tenantName: string;
  planName: 'STARTER_ESTATE' | 'ENTERPRISE_PRO' | 'GLOBAL_CONGLOMERATE';
  billingCycle: 'MONTHLY' | 'QUARTERLY' | 'YEARLY' | 'ENTERPRISE_CUSTOM';
  amountUsd: number;
  nextBillingDate: string;
  paymentStatus: 'PAID' | 'DUE' | 'OVERDUE';
  autoRenew: boolean;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  customerName: string;
  amountUsd: number;
  taxUsd: number;
  totalUsd: number;
  issueDate: string;
  dueDate: string;
  status: 'PAID' | 'UNPAID' | 'OVERDUE' | 'CANCELLED';
  paymentGateway: 'STRIPE' | 'XENDIT' | 'MIDTRANS' | 'BANK_TRANSFER';
}

export interface MarketplaceAddon {
  id: string;
  addonCode: string;
  addonName: string;
  category: 'AI_PROMPT' | 'CONNECTOR' | 'WIDGET' | 'REPORT' | 'THEME' | 'DRONE_MODEL';
  version: string;
  author: string;
  priceUsd: number; // 0 for free
  installed: boolean;
  rating: number;
  downloadsCount: number;
  description: string;
}

export interface BackupJob {
  id: string;
  jobCode: string;
  backupType: 'FULL' | 'INCREMENTAL' | 'TENANT_SNAPSHOT';
  targetStorage: 'S3_BUCKET' | 'GCP_BUCKET' | 'LOCAL_ON_PREM';
  sizeMb: number;
  timestamp: string;
  status: 'SUCCESS' | 'IN_PROGRESS' | 'FAILED';
  encryptionType: 'AES_256_GCM' | 'KMS_MANAGED';
}

export interface SystemHealthMetric {
  id: string;
  serviceName: string;
  status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  latencyMs: number;
  cpuLoadPct: number;
  memoryUsagePct: number;
  activeConnections: number;
}

export interface AuditTrailLog {
  id: string;
  timestamp: string;
  actorEmail: string;
  action: string;
  module: string;
  ipAddress: string;
  tenantName: string;
  severity: 'INFO' | 'WARN' | 'SECURITY_ALERT';
}
