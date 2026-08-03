export type AssetStatus = 'Active' | 'In Maintenance' | 'Idle' | 'Damaged' | 'Disposed';
export type AssetCategoryType =
  | 'Vehicle'
  | 'Heavy Equipment'
  | 'Machine'
  | 'Generator'
  | 'Pump'
  | 'Compressor'
  | 'Chainsaw'
  | 'Brush Cutter'
  | 'Sprayer'
  | 'Drone'
  | 'GPS Device'
  | 'Weather Station'
  | 'IT Equipment'
  | 'Office Equipment'
  | 'Building'
  | 'Furniture'
  | 'Electrical Equipment'
  | 'Workshop Equipment'
  | 'Other';

export interface AssetItem {
  id: string;
  assetCode: string;
  barcode: string;
  qrCode: string;
  rfidReady: boolean;
  rfidTag?: string;
  assetName: string;
  category: AssetCategoryType;
  brand: string;
  model: string;
  serialNumber: string;
  company: string;
  estate: string;
  department: string;
  currentLocation: string;
  gpsCoordinate: string;
  purchaseDate: string;
  supplierName: string;
  purchasePrice: number;
  usefulLifeYears: number;
  residualValue: number;
  warrantyStart: string;
  warrantyEnd: string;
  status: AssetStatus;
  photoUrl?: string;
  manualUrl?: string;
  documentUrl?: string;
  currentOperator?: string;
  odometerKm?: number;
  hourMeterHours?: number;
}

export interface AssetCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  defaultUsefulLifeYears: number;
  assetCount: number;
}

export interface AssetLocation {
  id: string;
  company: string;
  estate: string;
  division: string;
  afdeling: string;
  block: string;
  locationName: string;
  locationType: 'Warehouse' | 'Workshop' | 'Office' | 'Mill' | 'Housing' | 'Field Block';
  gpsCoordinate: string;
  assignedAssetCount: number;
}

export interface AssetAssignment {
  id: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  assignedToType: 'Employee' | 'Department' | 'Team' | 'Estate';
  assigneeName: string;
  department: string;
  estate: string;
  assignmentType: 'Permanent' | 'Temporary';
  startDate: string;
  endDate?: string;
  status: 'Active' | 'Returned' | 'Transferred';
  approvalStatus: 'Approved' | 'Pending' | 'Rejected';
  notes?: string;
}

export interface InspectionChecklistItem {
  id: string;
  component: string;
  status: 'Pass' | 'Fail' | 'Warning' | 'N/A';
  note?: string;
}

export interface AssetInspection {
  id: string;
  inspectionCode: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  inspectorName: string;
  inspectionDate: string;
  type: 'Routine' | 'Pre-Operation' | 'Post-Operation' | 'Annual';
  overallCondition: 'Excellent' | 'Good' | 'Fair' | 'Critical';
  checklist: InspectionChecklistItem[];
  findings: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendation: string;
  signedBy: string;
  status: 'Approved' | 'Pending Review' | 'Action Required';
}

export interface PreventivePlan {
  id: string;
  planCode: string;
  planName: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  category: AssetCategoryType;
  triggerType: 'Date' | 'Hour Meter' | 'KM' | 'Engine Hour' | 'Cycle';
  intervalValue: number;
  intervalUnit: 'Days' | 'Hours' | 'KM' | 'Cycles';
  lastServiceValue: number | string;
  nextServiceValue: number | string;
  responsibleTeam: string;
  requiredParts: string[];
  estimatedCost: number;
  estimatedDurationHours: number;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Active' | 'Due Soon' | 'Overdue' | 'In Progress';
}

export interface CorrectiveWorkOrder {
  id: string;
  woNumber: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  reportedDate: string;
  reportedBy: string;
  damageDescription: string;
  rootCause: string;
  actionTaken: string;
  assignedMechanic: string;
  workshopName: string;
  status: 'Open' | 'Assigned' | 'In Progress' | 'Waiting Part' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  estimatedCost: number;
  actualCost: number;
  downtimeHours: number;
  completionDate?: string;
}

export interface MaintenanceCalendarEvent {
  id: string;
  title: string;
  assetCode: string;
  type: 'Preventive' | 'Corrective' | 'Inspection' | 'Overhaul';
  date: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
  assignedTo: string;
}

export interface WorkshopJobOrder {
  id: string;
  jobOrderNumber: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  complaint: string;
  priority: 'Routine' | 'Urgent' | 'Emergency';
  leadMechanic: string;
  assistantMechanics: string[];
  scheduledDate: string;
  estimatedCompletion: string;
  actualCompletion?: string;
  status: 'Open' | 'In Progress' | 'Pending Sparepart' | 'QC Inspection' | 'Completed';
  partsRequired: string[];
  laborCost: number;
  partsCost: number;
  totalCost: number;
}

export interface Mechanic {
  id: string;
  code: string;
  name: string;
  specialty: 'Engine' | 'Hydraulics' | 'Electrical' | 'Transmission' | 'General Mechanic' | 'Tyre & Chassis';
  workshop: string;
  shift: 'Shift 1' | 'Shift 2' | 'Shift 3' | 'General Day';
  activeJobs: number;
  completedJobsMonth: number;
  status: 'Available' | 'On Job' | 'On Leave';
}

export interface ServiceHistoryRecord {
  id: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  serviceDate: string;
  serviceType: 'Oil Change' | 'Filter Replacement' | 'Engine Overhaul' | 'Transmission' | 'Hydraulic Service' | 'Electrical' | 'Tyre Rotation' | 'Battery Change' | 'General Inspection';
  workshopName: string;
  performedBy: string;
  odometerKm?: number;
  hourMeterHours?: number;
  cost: number;
  notes: string;
}

export interface FleetVehicle {
  id: string;
  assetId: string;
  assetCode: string;
  plateNumber: string;
  vehicleType: 'Motorcycle' | 'Car' | 'Pickup 4x4' | 'Truck 6x4' | 'Bus' | 'Water Truck' | 'Fuel Truck' | 'Ambulance & Emergency';
  brandModel: string;
  engineNumber: string;
  chassisNumber: string;
  driverName: string;
  simType: 'SIM A' | 'SIM B1' | 'SIM B2' | 'SIM C';
  stnkExpiry: string;
  kirExpiry: string;
  taxExpiry: string;
  insuranceStatus: 'Active' | 'Expiring Soon' | 'Expired';
  gpsDeviceCode: string;
  status: 'Operational' | 'In Workshop' | 'Standby' | 'Breakdown';
}

export interface HeavyEquipment {
  id: string;
  assetId: string;
  assetCode: string;
  equipmentCode: string;
  equipmentType: 'Excavator' | 'Bulldozer' | 'Wheel Loader' | 'Motor Grader' | 'Compactor' | 'Forklift' | 'Crane' | 'Backhoe' | 'Dump Truck';
  brandModel: string;
  engineNumber: string;
  operatorName: string;
  workingHoursTotal: number;
  idleHoursTotal: number;
  downtimeHoursTotal: number;
  fuelConsumptionLiters: number;
  productivityRate: string;
  status: 'Active' | 'Breakdown' | 'Service Due' | 'Idle';
}

export interface EquipmentUtilizationLog {
  id: string;
  date: string;
  equipmentCode: string;
  equipmentName: string;
  operatorName: string;
  workingHours: number;
  idleHours: number;
  downtimeHours: number;
  fuelUsedLiters: number;
  workDoneUnit: string;
  estateBlock: string;
}

export interface FuelTank {
  id: string;
  tankCode: string;
  tankName: string;
  fuelType: 'Solar B35' | 'Solar B40' | 'Pertamina Dex' | 'Pertalite' | 'Pertamax';
  capacityLiters: number;
  currentStockLiters: number;
  minStockAlertLiters: number;
  locationName: string;
  status: 'Normal' | 'Low Stock' | 'Critical Stock';
}

export interface FuelTransaction {
  id: string;
  txCode: string;
  txDate: string;
  tankId: string;
  tankName: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  driverOperator: string;
  fuelType: string;
  quantityLiters: number;
  pricePerLiter: number;
  totalCost: number;
  odometerKm?: number;
  hourMeterHours?: number;
  gpsLocation?: string;
  dispenserOperator: string;
}

export interface TyreRecord {
  id: string;
  tyreCode: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  position: 'Front Left' | 'Front Right' | 'Rear Left Outer' | 'Rear Left Inner' | 'Rear Right Outer' | 'Rear Right Inner' | 'Spare';
  brand: string;
  serialNumber: string;
  installedDate: string;
  wearLevelPercent: number;
  pressurePsi: number;
  status: 'Good' | 'Needs Rotation' | 'Needs Replacement' | 'Scrapped';
}

export interface BatteryRecord {
  id: string;
  batteryCode: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  brand: string;
  serialNumber: string;
  voltage: string;
  installedDate: string;
  lastChargeCheck: string;
  status: 'Optimal' | 'Low Voltage' | 'Needs Replacement';
}

export interface SparePartUsage {
  id: string;
  usageCode: string;
  workOrderId: string;
  assetCode: string;
  assetName: string;
  partCode: string;
  partName: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  warehouseSource: string;
  usedDate: string;
}

export interface AssetDepreciationRecord {
  id: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  category: string;
  purchaseCost: number;
  method: 'Straight Line' | 'Declining Balance' | 'Units of Production';
  usefulLifeYears: number;
  accumulatedDepreciation: number;
  currentBookValue: number;
  annualDepreciation: number;
}

export interface AssetDisposal {
  id: string;
  disposalNumber: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  method: 'Sell' | 'Scrap' | 'Transfer' | 'Donation' | 'Write Off';
  disposalDate: string;
  originalCost: number;
  bookValueAtDisposal: number;
  saleAmount: number;
  gainLoss: number;
  approvedBy: string;
  status: 'Approved' | 'Pending Approval' | 'Completed';
}

export interface GpsVehicleLog {
  id: string;
  vehicleId: string;
  assetCode: string;
  plateNumber: string;
  latitude: number;
  longitude: number;
  speedKmH: number;
  heading: string;
  engineStatus: 'Running' | 'Idle' | 'Stopped';
  lastUpdated: string;
  geofenceZone: string;
  todayKm: number;
}

export interface AiPredictiveMaintenanceInsight {
  id: string;
  assetId: string;
  assetCode: string;
  assetName: string;
  category: string;
  failureRiskPercent: number;
  predictedFailureComponent: string;
  estimatedTimeToFailureDays: number;
  recommendedAction: string;
  estimatedSavedCost: number;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  confidenceScorePercent: number;
}
