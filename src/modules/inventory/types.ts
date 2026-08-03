// Inventory, Warehouse & Procurement Management Types (Prompt 9)

export type ItemCategory =
  | 'Pupuk'
  | 'Pestisida'
  | 'Herbisida'
  | 'Bibit'
  | 'Alat Panen'
  | 'Alat Kerja'
  | 'Suku Cadang'
  | 'Oli & Pelumas'
  | 'BBM (Solar)'
  | 'APD'
  | 'ATK'
  | 'Elektronik'
  | 'Material Bangunan'
  | 'Bahan Kimia'
  | 'Lainnya';

export type StockStatus = 'Normal' | 'Warning' | 'Critical' | 'Out of Stock';

export type WarehouseType = 'Gudang Utama Estate' | 'Gudang Afdeling' | 'Gudang Chemical' | 'Gudang Workshop' | 'Gudang Bibitan';

export interface WarehouseRecord {
  id: string;
  code: string;
  name: string;
  companyId: string;
  companyName: string;
  estateId: string;
  estateName: string;
  type: WarehouseType;
  address: string;
  picName: string;
  picPhone: string;
  areaSqm: number;
  capacityTon: number;
  usedCapacityTon: number;
  latitude: number;
  longitude: number;
  status: 'Active' | 'Maintenance' | 'Full';
  photoUrl?: string;
  totalZones: number;
  totalRacks: number;
}

export interface WarehouseZoneRecord {
  id: string;
  code: string;
  name: string;
  warehouseId: string;
  warehouseName: string;
  categoryAllowed: ItemCategory[];
  capacityUnit: number;
  usedUnit: number;
  status: 'Active' | 'Full' | 'Restricted';
}

export interface WarehouseRackRecord {
  id: string;
  code: string;
  zoneId: string;
  zoneName: string;
  warehouseName: string;
  rowNumber: number;
  columnNumber: number;
  levelNumber: number;
  maxCapacityKg: number;
  currentWeightKg: number;
  status: 'Available' | 'Full' | 'Maintenance';
}

export interface InventoryItemRecord {
  id: string;
  itemCode: string;
  barcode: string;
  qrCode: string;
  name: string;
  category: ItemCategory;
  brand: string;
  specification: string;
  unit: string;
  primarySupplierName: string;
  buyPrice: number;
  standardPrice: number;
  minStock: number;
  maxStock: number;
  safetyStock: number;
  leadTimeDays: number;
  defaultWarehouseName: string;
  defaultRackCode: string;
  status: 'Active' | 'Discontinued' | 'Quarantine';
  photoUrl: string;
  lastRestockedDate: string;
}

export interface InventoryStockRecord {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  category: ItemCategory;
  unit: string;
  warehouseName: string;
  rackCode: string;
  available: number;
  reserved: number;
  allocated: number;
  inTransit: number;
  damaged: number;
  expired: number;
  onOrder: number;
  minStock: number;
  maxStock: number;
  stockStatus: StockStatus;
  unitValue: number;
  totalValue: number;
}

export type MovementType =
  | 'Goods Receipt'
  | 'Goods Issue'
  | 'Stock Transfer'
  | 'Adjustment'
  | 'Return'
  | 'Pemakaian Lapangan'
  | 'Penghapusan';

export interface InventoryMovementRecord {
  id: string;
  movementNumber: string;
  timestamp: string;
  movementType: MovementType;
  itemId: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  sourceLocation: string;
  destinationLocation: string;
  referenceNumber: string; // PO#, WO#, GR#, etc.
  actorName: string;
  notes: string;
}

export interface GoodsReceiptRecord {
  id: string;
  grNumber: string;
  poNumber: string;
  supplierName: string;
  date: string;
  warehouseName: string;
  officerName: string;
  itemCount: number;
  totalQuantity: number;
  conditionStatus: 'Pass QC' | 'Partial Damaged' | 'Rejected';
  notes: string;
  status: 'Completed' | 'Pending Review' | 'Cancelled';
}

export interface GoodsIssueRecord {
  id: string;
  giNumber: string;
  date: string;
  warehouseName: string;
  destinationWorkOrder: string;
  fieldActivity: string; // Pemupukan Blok A12, Perawatan Mesin, etc.
  requestorName: string;
  approverName: string;
  itemName: string;
  quantity: number;
  unit: string;
  status: 'Issued' | 'Pending Approval' | 'Draft';
}

export type TransferStatus = 'Draft' | 'Approved' | 'In Transit' | 'Completed' | 'Rejected';

export interface StockTransferRecord {
  id: string;
  transferNumber: string;
  date: string;
  sourceWarehouse: string;
  destinationWarehouse: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  status: TransferStatus;
  requestedBy: string;
  approvedBy: string;
}

export interface StockAdjustmentRecord {
  id: string;
  adjustmentNumber: string;
  date: string;
  warehouseName: string;
  itemName: string;
  reason: 'Rusak' | 'Hilang' | 'Expired' | 'Selisih Opname' | 'Koreksi Data';
  type: 'Addition' | 'Deduction';
  quantity: number;
  unit: string;
  conductedBy: string;
  approvedBy: string;
}

export interface StockOpnameRecord {
  id: string;
  opnameNumber: string;
  date: string;
  warehouseName: string;
  zoneCode: string;
  totalItemsScanned: number;
  matchedCount: number;
  discrepancyCount: number;
  conductedBy: string;
  status: 'In Progress' | 'Submitted for Approval' | 'Approved & Synced';
}

export type PRPriority = 'Normal' | 'High' | 'Urgent';
export type PRStatus = 'Draft' | 'Submitted' | 'Reviewed' | 'Approved' | 'Rejected' | 'Cancelled';

export interface PurchaseRequestRecord {
  id: string;
  prNumber: string;
  date: string;
  requestorName: string;
  department: string;
  workOrderRef?: string;
  priority: PRPriority;
  itemName: string;
  category: ItemCategory;
  requestedQuantity: number;
  unit: string;
  estimatedTotalCost: number;
  justification: string;
  status: PRStatus;
  currentApproverLevel: string;
}

export type POStatus = 'Draft' | 'Issued' | 'Partial Received' | 'Completed' | 'Cancelled';

export interface PurchaseOrderRecord {
  id: string;
  poNumber: string;
  prReference: string;
  supplierName: string;
  poDate: string;
  expectedDeliveryDate: string;
  itemName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discountPercentage: number;
  vatPercentage: number; // PPN 11%
  totalAmount: number;
  status: POStatus;
}

export interface PurchaseInvoiceRecord {
  id: string;
  invoiceNumber: string;
  supplierName: string;
  invoiceDate: string;
  poNumber: string;
  grNumber: string;
  amountTotal: number;
  dueDate: string;
  paymentStatus: 'Paid' | 'Unpaid' | 'Overdue' | 'Partial';
}

export interface SupplierPerformanceRecord {
  id: string;
  supplierName: string;
  categoryProvided: ItemCategory;
  onTimeDeliveryRate: number; // e.g. 96.5%
  qualityPassRate: number; // e.g. 98%
  competitivePriceScore: number; // 1-100
  responsivenessScore: number; // 1-100
  totalOrdersFulfilled: number;
  totalComplaints: number;
  kpiScore: number; // overall out of 100
  rankingGrade: 'A+ (Preferred)' | 'A (Reliable)' | 'B (Acceptable)' | 'C (Under Review)';
}

export interface InventoryForecastRecord {
  id: string;
  itemCode: string;
  itemName: string;
  category: ItemCategory;
  currentStock: number;
  unit: string;
  forecastPeriod: '7 Hari' | '30 Hari' | '90 Hari' | '6 Bulan' | '1 Tahun';
  predictedConsumption: number;
  recommendedOrderQuantity: number;
  suggestedOrderDate: string;
  confidenceScore: number;
}

export interface AiInventoryInsight {
  id: string;
  title: string;
  category: 'Safety Stock' | 'Reorder Alert' | 'Dead Stock Detection' | 'Cost Optimization' | 'Supplier Recommendation';
  itemOrWarehouse: string;
  insightText: string;
  recommendedAction: string;
  impactEstimate: string;
  confidenceScore: number;
}

export interface InventoryRestApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
}
