// Harvest Management System - TypeScript Definitions (Prompt 8)

export type HarvestPriority = 'High' | 'Medium' | 'Low' | 'Urgent';
export type HarvestStatus = 'Planned' | 'Scheduled' | 'In Progress' | 'Completed' | 'Delayed' | 'Cancelled';
export type TransportStatus = 'Pending Loading' | 'In Transit' | 'Arrived at Mill' | 'Weighed' | 'Unloaded' | 'Completed';
export type WeighbridgeStatus = 'First Weighing (Bruto)' | 'Second Weighing (Tara)' | 'Completed' | 'Rejected';

export interface HarvestPlanRecord {
  id: string;
  planCode: string;
  programName: string;
  companyName: string;
  estateName: string;
  divisionName: string;
  afdelingName: string;
  blockCode: string;
  subBlockCode?: string;
  harvestDate: string;
  estimatedBunches: number; // Jumlah janjang estimasi
  estimatedTonnageTon: number;
  estimatedBjrKg: number; // Berat Janjang Rata-rata (kg)
  priority: HarvestPriority;
  picName: string;
  status: HarvestStatus;
  notes?: string;
  createdAt: string;
}

export interface HarvestScheduleRecord {
  id: string;
  scheduleCode: string;
  blockCode: string;
  estateName: string;
  afdelingName: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Seasonal' | 'Rotation (7-10 Days)';
  startDate: string;
  endDate: string;
  assignedTeamName: string;
  targetTonnageTon: number;
  status: 'Active' | 'Upcoming' | 'Completed' | 'Paused';
}

export interface HarvestTeamRecord {
  id: string;
  teamCode: string;
  teamName: string;
  mandorName: string;
  supervisorName: string;
  harvestersCount: number; // Jumlah pemanen
  looseFruitPickersCount: number; // Jumlah pengutip brondolan
  helpersCount: number;
  assignedTruckNo?: string;
  equipmentSummary: string; // Eg: Dodos, Egrek, Angkong, Tojok
  status: 'Active' | 'On Duty' | 'Rest' | 'Inactive';
}

export interface HarvestAssignmentRecord {
  id: string;
  assignmentCode: string;
  teamName: string;
  mandorName: string;
  assignmentType: 'Single Block' | 'Multiple Block' | 'Area Based' | 'Target Based';
  blockCodes: string[];
  targetBunches: number;
  targetTonnageTon: number;
  dateAssigned: string;
  gpsTargetLat: number;
  gpsTargetLng: number;
  status: 'Assigned' | 'In Execution' | 'Verified';
}

export interface HarvestExecutionRecord {
  id: string;
  executionCode: string;
  date: string;
  time: string;
  companyName: string;
  estateName: string;
  divisionName: string;
  afdelingName: string;
  blockCode: string;
  subBlockCode?: string;
  teamName: string;
  harvesterName: string;
  ancakNo: string; // Nomor Ancak Panen
  bunchesCount: number; // Jumlah Janjang
  estimatedWeightKg: number;
  calculatedBjrKg: number;
  looseFruitKg: number; // Brondolan (Kg)
  qualityGrade: 'A (Mature)' | 'B (Under-ripe)' | 'C (Over-ripe)' | 'D (Empty/Rotted)';
  photoUrl?: string;
  gpsLat: number;
  gpsLng: number;
  notes?: string;
}

export interface HarvestCollectionPointRecord {
  id: string;
  collectionPointCode: string; // TPH Code (Tempat Pengumpulan Hasil)
  blockCode: string;
  totalBunchesCount: number;
  totalLooseFruitKg: number;
  pickupTime?: string;
  assignedTruckNo?: string;
  status: 'Waiting Pickup' | 'In Loading' | 'Loaded & Dispatched';
  photoUrl?: string;
  gpsLat: number;
  gpsLng: number;
}

export interface HarvestGradingRecord {
  id: string;
  gradingCode: string;
  tphCode: string;
  blockCode: string;
  graderName: string;
  date: string;
  rawPct: number; // Mentah (%)
  underRipePct: number; // Kurang Matang (%)
  ripePct: number; // Matang (%)
  overRipePct: number; // Lewat Matang (%)
  rottenPct: number; // Busuk (%)
  emptyBunchesPct: number; // Kosong (%)
  abnormalPct: number; // Abnormal (%)
  longStalkPct: number; // Tangkai Panjang (%)
  notes?: string;
  photoUrl?: string;
}

export interface HarvestQcRecord {
  id: string;
  qcCode: string;
  blockCode: string;
  inspectorName: string;
  date: string;
  fruitQualityScore: number; // 0 - 100
  leftoverBunchesCount: number; // Buah tinggal di pohon/tanah
  leftoverLooseFruitScore: number;
  frondPruningScore: number; // Pelepah rapi
  ancakQualityScore: number;
  overallScore: number; // 0 - 100
  status: 'Passed' | 'Needs Correction' | 'Rejected';
  photoUrl?: string;
  gpsLat: number;
  gpsLng: number;
}

export interface WeighbridgeRecord {
  id: string;
  weighTicketNo: string; // Nomor Slip Timbang
  date: string;
  timeIn: string;
  timeOut?: string;
  truckNo: string;
  driverName: string;
  grossWeightKg: number; // Bruto
  tareWeightKg: number; // Tara
  netWeightKg: number; // Netto
  supplierEstate: string;
  millName: string; // Nama PKS
  status: WeighbridgeStatus;
  qrCodeTicket: string;
}

export interface TransportDispatchRecord {
  id: string;
  dispatchNo: string; // Nomor DO (Delivery Order)
  truckNo: string;
  driverName: string;
  loaderTeamName: string;
  tphCollectionPoints: string[];
  destinationMill: string;
  estimatedTonnageTon: number;
  departureTime: string;
  arrivalTimeEstimate: string;
  gpsRouteStatus: 'On Schedule' | 'Delayed' | 'Arrived';
  status: TransportStatus;
}

export interface MillDeliveryRecord {
  id: string;
  deliveryCode: string;
  millName: string;
  deliveryDate: string;
  truckNo: string;
  weighTicketNo: string;
  netWeightTon: number;
  cpoExtractionRatePct: number; // Rendemen CPO (%)
  kernelExtractionRatePct: number; // Rendemen Kernel (%)
  documentStatus: 'Verified' | 'Pending Audit';
  photoUrl?: string;
}

export interface HarvestProductivityRecord {
  id: string;
  entityName: string; // Block / Harvester / Estate
  entityType: 'Block' | 'Harvester' | 'Team' | 'Estate';
  period: string; // Month / Week / Day
  tonnageProducedTon: number;
  bunchesCount: number;
  avgBjrKg: number;
  productivityPerHarvesterTon: number;
  achievementVsTargetPct: number;
}

export interface HarvestLossRecord {
  id: string;
  lossCode: string;
  blockCode: string;
  date: string;
  category: 'Buah Tinggal' | 'Brondolan Tinggal' | 'Buah Busuk' | 'Buah Rusak' | 'Transport Loss' | 'Storage Loss';
  estimatedLossKg: number;
  estimatedFinancialLossIdr: number;
  rootCause: string;
  correctiveAction: string;
}

export interface HarvestForecastRecord {
  id: string;
  forecastPeriod: '7 Days' | '30 Days' | '90 Days' | '6 Months' | '1 Year';
  estateName: string;
  predictedTonnageTon: number;
  predictedBunches: number;
  confidenceScorePct: number;
  harvestReadinessIndex: 'Optimal' | 'Early' | 'Peak' | 'Late';
}

export interface HarvestTimelineEvent {
  id: string;
  stage: 'Planning' | 'Assignment' | 'Harvest' | 'Collection' | 'Grading' | 'Transport' | 'Weighing' | 'Delivery';
  title: string;
  timestamp: string;
  actorName: string;
  blockOrEntity: string;
  details: string;
  statusBadge: string;
}

export interface HarvestGalleryItem {
  id: string;
  title: string;
  category: 'Harvest Execution' | 'TPH Collection' | 'Grading Inspection' | 'Weighbridge' | 'Transport Dispatch';
  photoUrl: string;
  date: string;
  time: string;
  blockCode: string;
  capturedBy: string;
  gpsLat: number;
  gpsLng: number;
  tags: string[];
}

export interface QrBarcodeRegistryItem {
  id: string;
  codeType: 'Harvest Ticket' | 'Collection Ticket' | 'Weighbridge Ticket' | 'Truck Dispatch' | 'Harvest Team ID' | 'Block ID';
  codeValue: string;
  qrDataUrl: string;
  associatedEntity: string;
  issuedAt: string;
  status: 'Valid' | 'Scanned & Closed' | 'Expired';
}

export interface AiHarvestInsight {
  id: string;
  title: string;
  category: 'Yield Prediction' | 'Harvest Readiness' | 'Best Harvest Time' | 'Labor Optimization' | 'Transport Routing' | 'Mill Queue Prediction';
  blockCode: string;
  confidenceScore: number; // %
  insightText: string;
  recommendedAction: string;
  severity: 'Critical' | 'Warning' | 'Info' | 'Success';
}
