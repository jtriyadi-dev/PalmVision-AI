export type UserRole = 
  | 'SUPER_ADMIN'
  | 'DEVELOPER'
  | 'OWNER'
  | 'DIRECTOR'
  | 'GENERAL_MANAGER'
  | 'ESTATE_MANAGER'
  | 'ASSISTANT_MANAGER'
  | 'SUPERVISOR'
  | 'MANDOR'
  | 'OPERATOR'
  | 'FINANCE'
  | 'ACCOUNTING'
  | 'WAREHOUSE'
  | 'HRD'
  | 'PROCUREMENT'
  | 'SECURITY'
  | 'AUDITOR'
  | 'GUEST';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  phone: string;
  avatar: string;
  role: UserRole;
  department: string;
  position: string;
  estateId: string;
  estateName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  joinedDate: string;
  lastLogin: string;
  deviceFingerprint: string;
  licenseKey: string;
  twoFactorEnabled: boolean;
}

export type PermissionAction =
  | 'VIEW'
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'APPROVE'
  | 'EXPORT'
  | 'IMPORT'
  | 'PRINT'
  | 'AI_ACCESS'
  | 'ANALYTICS'
  | 'LICENSE_MANAGE'
  | 'MASTER_DATA'
  | 'SETTING';

export interface RolePermissionConfig {
  role: UserRole;
  allowedActions: Record<string, PermissionAction[]>; // moduleName -> actions
}

export interface CompanyContext {
  companyId: string;
  companyName: string;
  estateId: string;
  estateName: string;
  divisionId: string;
  divisionName: string;
  afdelingId: string;
  afdelingName: string;
  blockId: string;
  blockCode: string;
}

export interface SubBlockEntity {
  id: string;
  code: string;
  name: string;
  hectares: number;
  plantingYear: number;
  sph: number; // Stand Per Hectare
}

export interface BlockEntity {
  id: string;
  code: string;
  name: string;
  hectares: number;
  plantingYear: number;
  sph: number;
  subBlocks: SubBlockEntity[];
}

export interface AfdelingEntity {
  id: string;
  code: string;
  name: string;
  blocks: BlockEntity[];
}

export interface DivisionEntity {
  id: string;
  code: string;
  name: string;
  afdelings: AfdelingEntity[];
}

export interface EstateEntity {
  id: string;
  code: string;
  name: string;
  managerName: string;
  totalHectares: number;
  divisions: DivisionEntity[];
}

export interface CompanyEntity {
  id: string;
  name: string;
  code: string;
  nib: string;
  npwp: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  logoUrl: string;
  estates: EstateEntity[];
}

export interface WhiteLabelConfig {
  appName: string;
  companyName: string;
  logoUrl: string;
  loginLogoUrl: string;
  sidebarLogoUrl: string;
  faviconUrl: string;
  loginBgStyle: 'gradient' | 'glass' | 'plantation-photo';
  primaryColor: string;
  secondaryColor: string;
  footerText: string;
  copyright: string;
  domain: string;
  customCss?: string;
}

export interface BoundDevice {
  id: string;
  deviceName: string;
  hwid: string;
  os: string;
  browser: string;
  registeredAt: string;
  lastUsedAt: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'REVOKED';
  ipAddress: string;
  mandorName: string;
}

export interface ActiveSession {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  device: string;
  ipAddress: string;
  browser: string;
  os: string;
  location: string;
  loginTime: string;
  lastActiveTime: string;
  isCurrent: boolean;
}

export type ThemeMode = 'dark' | 'light' | 'auto';
export type AccentColor = 'emerald' | 'sapphire' | 'amber' | 'violet' | 'rose' | 'crimson';
export type FontSizeOption = 'sm' | 'md' | 'lg';

export interface ThemeSettings {
  mode: ThemeMode;
  accentColor: AccentColor;
  fontSize: FontSizeOption;
  compactMode: boolean;
  highContrast: boolean;
  glassTransparency: boolean;
  customPrimaryHex?: string;
}

export type NotificationCategory = 'system' | 'ai' | 'approval' | 'harvest' | 'inventory' | 'finance' | 'license' | 'reminder';
export type NotificationPriority = 'urgent' | 'high' | 'normal' | 'info';

export interface NotificationItemData {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  read: boolean;
  archived?: boolean;
  actionUrl?: string;
  sourceModule?: string;
}

export interface ActivityLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  avatar?: string;
  type: 'LOGIN' | 'CREATE' | 'UPDATE' | 'APPROVE' | 'DELETE' | 'AI_QUERY' | 'LICENSE' | 'EXPORT' | 'SETTINGS';
  title: string;
  description: string;
  module: string;
  estateName?: string;
}

export interface CommandSearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: 'MENU' | 'ESTATE' | 'BLOCK' | 'EMPLOYEE' | 'DOCUMENT' | 'REPORT' | 'AI_HISTORY';
  iconName: string;
  moduleId?: string;
  actionPayload?: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  category: 'DATA' | 'HARVEST' | 'EMPLOYEE' | 'SUPPLIER' | 'ASSET' | 'AI' | 'REPORT';
  iconName: string;
  shortcut?: string;
  color: string;
  targetModuleId: string;
}

export interface WeatherForecastData {
  city: string;
  estateName: string;
  tempC: number;
  condition: string;
  icon: string;
  humidityPct: number;
  rainfallMm: number;
  windSpeedKm: number;
  uvIndex: number;
  advisory: string;
  forecastDays: Array<{
    day: string;
    tempHigh: number;
    tempLow: number;
    condition: string;
    rainProbability: number;
  }>;
}

export interface ExecutiveKpiData {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  sparklineData: number[];
  target?: string | number;
  progressPct?: number;
  category: 'estate' | 'production' | 'resource' | 'finance' | 'ai';
  iconName: string;
  color: string;
}

export type Language = 'id' | 'en';

export interface NavigationItem {
  id: string;
  label: string;
  labelEn: string;
  iconName: string;
  category: 'core' | 'operations' | 'resources' | 'intelligence' | 'system';
  badge?: string;
  description: string;
  isBlueprintOnly?: boolean;
}

export interface LicenseInfo {
  licenseKey: string;
  serialNumber: string;
  customerName: string;
  type: 'SAAS_ENTERPRISE' | 'ON_PREMISE_WHITE_LABEL' | 'PLASMA_COOPERATIVE' | 'TRIAL' | 'LIFETIME';
  hwid: string;
  issuedAt: string;
  expiresAt: string;
  daysRemaining: number;
  status: 'ACTIVE' | 'WARNING' | 'EXPIRED' | 'PENDING_ACTIVATION';
  gracePeriodDays: number;
  maxEstates: number;
  maxUsers: number;
  maxDevices: number;
  boundDevicesCount: number;
  activeFeatures: string[];
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  model?: string;
  context?: Partial<CompanyContext>;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  module: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'DENIED';
  details?: string;
}

