import { CompanyEntity, EstateUnit, AgronomyVariety, FfbGradingStandard, MaterialItemMaster, VendorBuyerMaster } from './types';

export const mockCompanyEntities: CompanyEntity[] = [
  {
    id: 'cmp-01',
    code: 'NPG-HOLDING',
    name: 'PT Nusantara Palm Group Tbk',
    taxId: '01.234.567.8-012.000',
    estatesCount: 12,
    millsCount: 4,
    headquartersAddress: 'Gedung Palm Tower Lt. 18, Jl. Jend. Sudirman, Jakarta Selatan',
    status: 'ACTIVE'
  },
  {
    id: 'cmp-02',
    code: 'RIAU-PALM-SUB',
    name: 'PT Riau Agro Lestari (Subsidiary)',
    taxId: '02.987.654.3-101.000',
    estatesCount: 5,
    millsCount: 2,
    headquartersAddress: 'Jl. Ahmad Yani No. 45, Pekanbaru, Riau',
    status: 'ACTIVE'
  },
  {
    id: 'cmp-03',
    code: 'SUMUT-AGRO-SUB',
    name: 'PT Sumut Sawit Mandiri',
    taxId: '03.456.789.1-202.000',
    estatesCount: 4,
    millsCount: 1,
    headquartersAddress: 'Jl. Diponegoro No. 88, Medan, Sumatera Utara',
    status: 'ACTIVE'
  }
];

export const mockEstateUnits: EstateUnit[] = [
  {
    id: 'est-01',
    companyCode: 'RIAU-PALM-SUB',
    estateCode: 'EST-RIAU-01',
    estateName: 'Kebun Riau Central',
    regionName: 'Zone Riau - Kampar',
    totalHectares: 8500.5,
    divisionsCount: 4,
    managerName: 'Ir. Hendra Wijaya',
    status: 'ACTIVE'
  },
  {
    id: 'est-02',
    companyCode: 'RIAU-PALM-SUB',
    estateCode: 'EST-RIAU-02',
    estateName: 'Kebun Tapung Hilir',
    regionName: 'Zone Riau - Kampar',
    totalHectares: 6200.0,
    divisionsCount: 3,
    managerName: 'Suryadi, S.P.',
    status: 'ACTIVE'
  },
  {
    id: 'est-03',
    companyCode: 'SUMUT-AGRO-SUB',
    estateCode: 'EST-SUMUT-01',
    estateName: 'Kebun Sei Mangkei',
    regionName: 'Zone Sumut - Simalungun',
    totalHectares: 7100.8,
    divisionsCount: 4,
    managerName: 'Budi Santoso, M.Si',
    status: 'ACTIVE'
  }
];

export const mockAgronomyVarieties: AgronomyVariety[] = [
  {
    id: 'var-01',
    varietyCode: 'VAR-SOC-01',
    varietyName: 'Tenera DxP Socfindo',
    breederName: 'PT Socfin Indonesia (Socfindo)',
    yieldPotentialTonHa: 28.5,
    avgBunchWeightKg: 18.5,
    recommendedSoil: 'Alluvial Mineral & Latosol',
    status: 'APPROVED'
  },
  {
    id: 'var-02',
    varietyCode: 'VAR-MAR-02',
    varietyName: 'Tenera DxP Marihat',
    breederName: 'PPKS Medan (Pusat Penelitian Kelapa Sawit)',
    yieldPotentialTonHa: 26.0,
    avgBunchWeightKg: 16.8,
    recommendedSoil: 'Podsolik Merah Kuning & Gambut Dangkal',
    status: 'APPROVED'
  },
  {
    id: 'var-03',
    varietyCode: 'VAR-TOP-03',
    varietyName: 'DxP Lonsum Topaz',
    breederName: 'PT PP London Sumatra Indonesia',
    yieldPotentialTonHa: 29.2,
    avgBunchWeightKg: 19.1,
    recommendedSoil: 'Alluvial Sub-Latosol & Organosol',
    status: 'APPROVED'
  },
  {
    id: 'var-04',
    varietyCode: 'VAR-DAM-04',
    varietyName: 'DxP Dami Mas',
    breederName: 'PT Smart Tbk (Sinar Mas Agronomy)',
    yieldPotentialTonHa: 27.8,
    avgBunchWeightKg: 17.5,
    recommendedSoil: 'Gambut Sedang (1-2 meter)',
    status: 'APPROVED'
  }
];

export const mockFfbGradingStandards: FfbGradingStandard[] = [
  {
    id: 'grd-01',
    gradeCode: 'GRADE_MATANG_A',
    gradeName: 'Matang Sempurna (Ripen Grade A)',
    oilContentPct: 24.5,
    ffaPctLimit: 2.2,
    penaltyBonusPercent: 5.0,
    description: 'Brondolan lepas 5 - 10 per tandan, warna oranye kemerahan, tidak busuk.'
  },
  {
    id: 'grd-02',
    gradeCode: 'GRADE_LEWAT_MATANG',
    gradeName: 'Lewat Matang (Overripe)',
    oilContentPct: 22.0,
    ffaPctLimit: 4.8,
    penaltyBonusPercent: -2.5,
    description: 'Brondolan lepas > 50%, potensi Asam Lemak Bebas (ALB/FFA) tinggi.'
  },
  {
    id: 'grd-03',
    gradeCode: 'GRADE_MENTAH',
    gradeName: 'Mentah (Unripe / Black)',
    oilContentPct: 14.0,
    ffaPctLimit: 1.5,
    penaltyBonusPercent: -15.0,
    description: 'Tidak ada brondolan lepas, warna hitam keunguan, kandungan minyak sangat rendah.'
  },
  {
    id: 'grd-04',
    gradeCode: 'GRADE_TANGKAI_PANJANG',
    gradeName: 'Tangkai Panjang (>2.5 cm)',
    oilContentPct: 23.0,
    ffaPctLimit: 2.5,
    penaltyBonusPercent: -1.0,
    description: 'Tangkai TBS belum dipotong membaji rapat, menambah bobot sampah.'
  }
];

export const mockMaterialItems: MaterialItemMaster[] = [
  {
    id: 'mat-01',
    itemCode: 'PUPUK-NPK-13-6-27',
    itemName: 'Pupuk NPK Mahkota 13-6-27-4 + TE',
    category: 'FERTILIZER',
    unitOfMeasure: 'Sak (50 Kg)',
    reorderLevel: 200,
    currentStock: 1450,
    unitPriceCostIdr: 485000
  },
  {
    id: 'mat-02',
    itemCode: 'PUPUK-UREA-46',
    itemName: 'Pupuk Urea Granul Pupuk Kaltim 46% N',
    category: 'FERTILIZER',
    unitOfMeasure: 'Sak (50 Kg)',
    reorderLevel: 150,
    currentStock: 820,
    unitPriceCostIdr: 340000
  },
  {
    id: 'mat-03',
    itemCode: 'PEST-GLYPHOSATE-480',
    itemName: 'Herbisida Glyphosate 480 SL (Roundup)',
    category: 'AGROCHEMICAL',
    unitOfMeasure: 'Jerigen (20 Liter)',
    reorderLevel: 50,
    currentStock: 180,
    unitPriceCostIdr: 1250000
  },
  {
    id: 'mat-04',
    itemCode: 'SOLAR-B35-MILL',
    itemName: 'BBM Solar Industri Biosolar B35 (Pertamina)',
    category: 'FUEL',
    unitOfMeasure: 'Liter',
    reorderLevel: 10000,
    currentStock: 48500,
    unitPriceCostIdr: 14200
  },
  {
    id: 'mat-05',
    itemCode: 'SPARE-EGR-PKS-01',
    itemName: 'Rantai Conveyor TBS PKS Heavy Duty 6 inch',
    category: 'SPAREPART',
    unitOfMeasure: 'Meter',
    reorderLevel: 20,
    currentStock: 65,
    unitPriceCostIdr: 3850000
  }
];

export const mockVendorsBuyers: VendorBuyerMaster[] = [
  {
    id: 'vnd-01',
    partnerCode: 'BUY-WILMAR-01',
    partnerName: 'PT Wilmar Nabati Indonesia',
    partnerType: 'CPO_BUYER',
    contactPerson: 'Bpk. Irwan Saputra (CPO Trader)',
    phone: '+62 811-2233-4455',
    creditTermsDays: 14,
    status: 'ACTIVE'
  },
  {
    id: 'vnd-02',
    partnerCode: 'BUY-MUSIMMAS-02',
    partnerName: 'PT Musim Mas Trading',
    partnerType: 'CPO_BUYER',
    contactPerson: 'Ibu Ratna Susanti',
    phone: '+62 812-9988-7766',
    creditTermsDays: 14,
    status: 'ACTIVE'
  },
  {
    id: 'vnd-03',
    partnerCode: 'SUP-PUPUK-KALTIM',
    partnerName: 'PT Pupuk Kalimantan Timur (PKT)',
    partnerType: 'FERTILIZER_SUPPLIER',
    contactPerson: 'Bpk. Herman Utama',
    phone: '+62 813-4455-6677',
    creditTermsDays: 30,
    status: 'ACTIVE'
  },
  {
    id: 'vnd-04',
    partnerCode: 'LGT-DUMP-TRUCK',
    partnerName: 'CV Trans Kebun Riau (Kontraktor Transportasi TBS)',
    partnerType: 'LOGISTICS_CONTRACTOR',
    contactPerson: 'Bpk. Gunawan',
    phone: '+62 852-1122-3344',
    creditTermsDays: 21,
    status: 'ACTIVE'
  }
];
