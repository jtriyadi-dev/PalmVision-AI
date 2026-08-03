export type WorkOrderStatus =
  | 'Draft'
  | 'Assigned'
  | 'Accepted'
  | 'In Progress'
  | 'Paused'
  | 'Completed'
  | 'Cancelled'
  | 'Rejected';

export type WorkOrderPriority = 'Rendah' | 'Sedang' | 'Tinggi' | 'Darurat';

export type FieldActivityCategory =
  | 'Pemupukan'
  | 'Penyemprotan'
  | 'Pemangkasan'
  | 'Pembersihan'
  | 'Drainase'
  | 'Perawatan Jalan'
  | 'Perawatan Jembatan'
  | 'Perawatan Kanal'
  | 'Perawatan Bangunan / Infrastruktur'
  | 'Pengangkutan'
  | 'Panen Persiapan'
  | 'Pengendalian Hama & Penyakit'
  | 'Inspeksi'
  | 'Lainnya';

export type SyncStatus = 'Pending' | 'In Progress' | 'Success' | 'Failed' | 'Conflict';

export interface WorkOrderRecord {
  id: string;
  woNumber: string;
  title: string;
  date: string;
  dueDate: string;
  category: FieldActivityCategory;
  companyName: string;
  estateName: string;
  divisionName: string;
  afdelingName: string;
  blockCode: string;
  subBlockCode: string;
  priority: WorkOrderPriority;
  description: string;
  mandorName: string;
  supervisorName: string;
  teamName: string;
  teamMembersCount: number;
  estimatedHours: number;
  actualHours?: number;
  targetQuantity: string;
  achievedQuantity?: string;
  status: WorkOrderStatus;
  attachmentsCount: number;
  gpsLocation: { lat: number; lng: number; locationName: string };
  createdAt: string;
  updatedAt: string;
}

export interface TaskAssignmentItem {
  id: string;
  taskId: string;
  taskTitle: string;
  assignedType: 'Single User' | 'Multi User' | 'Team';
  assigneeName: string;
  assigneeRole: string;
  department: 'Agronomi' | 'Teknik & Infrastruktur' | 'EHS & Proteksi' | 'QA Inspection';
  deadline: string;
  isRecurring: boolean;
  recurringInterval?: string;
  reminderSent: boolean;
  gpsTarget: { lat: number; lng: number; blockCode: string };
  status: 'Belum Dimulai' | 'Sedang Dikerjakan' | 'Selesai' | 'Terlambat';
}

export interface DailyActivityRecord {
  id: string;
  activityCode: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  category: FieldActivityCategory;
  blockCode: string;
  estateName: string;
  afdelingName: string;
  mandorName: string;
  teamName: string;
  workersCount: number;
  workVolume: string;
  weatherCondition: 'Cerah' | 'Berawan' | 'Hujan Ringan' | 'Hujan Deras';
  photoUrl: string;
  lat: number;
  lng: number;
  notes: string;
  isOfflineSynced: boolean;
}

export interface FertilizerActivityRecord {
  id: string;
  recordCode: string;
  date: string;
  estateName: string;
  blockCode: string;
  subBlockCode: string;
  fertilizerType: 'NPK 15-15-6-4' | 'Urea' | 'Rock Phosphate (RP)' | 'MOP / KCl' | 'Kieserit' | 'Borate';
  quantityKg: number;
  applicationMethod: 'Tabur Piringan' | 'Tabur Pasar Pikul' | 'Kocor (TBM)' | 'Mekanisasi Spreader';
  teamName: string;
  mandorName: string;
  photoUrl: string;
  lat: number;
  lng: number;
  notes: string;
}

export interface SprayingActivityRecord {
  id: string;
  recordCode: string;
  date: string;
  estateName: string;
  blockCode: string;
  chemicalType: 'Glifosat 480 SL' | 'Paraquat' | 'Triklopir' | 'Fluroksipir' | 'Cypermethrin 100 EC';
  chemicalCategory: 'Herbisida' | 'Insektisida' | 'Fungisida';
  areaCoverageHa: number;
  solutionVolumeLiters: number;
  operatorCount: number;
  weatherCondition: string;
  mandorName: string;
  photoUrl: string;
  lat: number;
  lng: number;
}

export interface PruningActivityRecord {
  id: string;
  recordCode: string;
  date: string;
  blockCode: string;
  treesCount: number;
  pruningType: 'Pruning Pelepah Sandang Tiram' | 'Pruning Sanitasi TBM' | 'Pruning Panen (Tunas)';
  teamName: string;
  mandorName: string;
  notes: string;
}

export interface MaintenanceActivityRecord {
  id: string;
  recordCode: string;
  date: string;
  assetType: 'Jalan Utama (Main Road)' | 'Jalan Tepi (Collection Road)' | 'Drainase Utama' | 'Kanal Primer' | 'Jembatan Kayu / Beton' | 'Bangunan Gudang / Mess';
  assetName: string;
  blockCode: string;
  volumeWork: string;
  costIdr: number;
  contractorOrTeam: string;
  mandorName: string;
  status: 'Selesai' | 'Proses' | 'Terhambat Weather';
  photoUrl: string;
}

export interface PestControlRecord {
  id: string;
  recordCode: string;
  date: string;
  blockCode: string;
  pestName: 'Ulat Api (Setothosea asigna)' | 'Kumbang Tanduk (Oryctes)' | 'Tikus (Rattus tiomanicus)' | 'Ganoderma boninense';
  severityLevel: 'Ringan' | 'Sedang' | 'Berat / SPOP';
  treatmentMethod: 'Injeksi Batang' | 'Pemasangan Pheretrap' | 'Fogging / Mist Blowing' | 'Umpan Beracun';
  affectedTreesCount: number;
  mandorName: string;
  status: 'Selesai Treatment' | 'Monitoring Ulang';
}

export interface FieldChecklistItem {
  id: string;
  checklistCode: string;
  title: string;
  category: FieldActivityCategory;
  blockCode: string;
  inspectorName: string;
  inspectorRole: string;
  date: string;
  itemsChecked: { question: string; isPassed: boolean; remark: string }[];
  photoUrl?: string;
  signatureUrl?: string;
  lat: number;
  lng: number;
  status: 'Lulus Inspeksi' | 'Perlu Perbaikan' | 'Kritis';
}

export interface FieldPhotoItem {
  id: string;
  photoCode: string;
  category: string;
  title: string;
  date: string;
  time: string;
  blockCode: string;
  takenBy: string;
  userRole: string;
  photoUrl: string;
  lat: number;
  lng: number;
  tags: string[];
  aiDetectionPlaceholder?: string;
}

export interface GpsTrackingPoint {
  id: string;
  userId: string;
  userName: string;
  role: 'Mandor' | 'Supervisor' | 'Asisten Afdeling' | 'Driver Truk';
  avatarUrl: string;
  isOnline: boolean;
  batteryPct: number;
  lastUpdated: string;
  currentLocation: { lat: number; lng: number; blockCode: string; address: string };
  speedKmh: number;
  todayDistanceKm: number;
  breadcrumbTrail: { lat: number; lng: number; time: string }[];
}

export interface AttendanceFieldRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  role: string;
  estateName: string;
  afdelingName: string;
  checkInTime: string;
  checkOutTime?: string;
  checkInGps: { lat: number; lng: number; blockCode: string };
  checkOutGps?: { lat: number; lng: number; blockCode: string };
  selfiePhotoUrl: string;
  qrVerified: boolean;
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Terlambat';
  isOfflineQueued: boolean;
}

export interface OfflineSyncQueueItem {
  id: string;
  entityType: 'WorkOrder' | 'DailyActivity' | 'FertilizerRecord' | 'Checklist' | 'Attendance' | 'FieldPhoto';
  recordId: string;
  title: string;
  createdAtLocal: string;
  payloadSizeKb: number;
  syncStatus: SyncStatus;
  retryCount: number;
  errorMessage?: string;
}

export interface FieldTimelineEvent {
  id: string;
  timestamp: string;
  category: FieldActivityCategory;
  blockCode: string;
  title: string;
  description: string;
  actorName: string;
  actorRole: string;
  lat: number;
  lng: number;
}

export interface AiOperationRecommendation {
  id: string;
  title: string;
  category: 'Task Risk' | 'Workload Balance' | 'Weather Impact' | 'Safety Alert' | 'Resource Optimization';
  severity: 'Info' | 'Warning' | 'Critical';
  blockCode: string;
  recommendationText: string;
  suggestedAction: string;
  generatedAt: string;
}

export interface FieldOperationFilterState {
  searchQuery: string;
  companyId: string;
  estateId: string;
  afdelingName: string;
  blockCode: string;
  category: string;
  status: string;
  mandorId: string;
  dateFrom: string;
  dateTo: string;
}
