export interface CompanyEntity {
  id: string;
  code: string; // e.g. "NPL-HOLDING"
  name: string; // e.g. "PT Nusantara Palm Group"
  taxId: string; // NPWP
  estatesCount: number;
  millsCount: number;
  headquartersAddress: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface EstateUnit {
  id: string;
  companyCode: string;
  estateCode: string; // e.g. "EST-RIAU-01"
  estateName: string; // e.g. "Kebun Riau Central"
  regionName: string; // e.g. "Sumatra Zone 1"
  totalHectares: number; // e.g. 8500
  divisionsCount: number;
  managerName: string;
  status: 'ACTIVE' | 'EXPANSION';
}

export interface AgronomyVariety {
  id: string;
  varietyCode: string;
  varietyName: string; // e.g. "Tenera DxP Socfindo"
  breederName: string;
  yieldPotentialTonHa: number; // e.g. 28.5
  avgBunchWeightKg: number; // e.g. 18.2
  recommendedSoil: string;
  status: 'APPROVED' | 'TRIAL';
}

export interface FfbGradingStandard {
  id: string;
  gradeCode: string; // e.g. "GRADE_A_RIPEN"
  gradeName: string; // e.g. "Matang (Unbrushed Ripen)"
  oilContentPct: number; // e.g. 23.5%
  ffaPctLimit: number; // e.g. 2.5%
  penaltyBonusPercent: number; // e.g. +5.0%
  description: string;
}

export interface MaterialItemMaster {
  id: string;
  itemCode: string; // e.g. "MAT-FPK-001"
  itemName: string; // e.g. "Pupuk NPK Mahkota 13-6-27-4"
  category: 'FERTILIZER' | 'AGROCHEMICAL' | 'SPAREPART' | 'FUEL' | 'SAFETY_EQUIPMENT';
  unitOfMeasure: string; // e.g. "Sak (50kg)" or "Liter"
  reorderLevel: number;
  currentStock: number;
  unitPriceCostIdr: number;
}

export interface VendorBuyerMaster {
  id: string;
  partnerCode: string; // e.g. "VND-SUP-012"
  partnerName: string; // e.g. "PT Wilmar Bioenergi Indonesia"
  partnerType: 'CPO_BUYER' | 'FERTILIZER_SUPPLIER' | 'EQUIPMENT_DEALER' | 'LOGISTICS_CONTRACTOR';
  contactPerson: string;
  phone: string;
  creditTermsDays: number;
  status: 'ACTIVE' | 'BLACKLISTED';
}
