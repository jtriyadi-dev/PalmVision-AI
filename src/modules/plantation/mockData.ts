import {
  PlantPopulationMetrics,
  PlantAgeCategoryInfo,
  PlantVarietyMaster,
  NurseryRecord,
  SeedlingBatchRecord,
  LandClearingRecord,
  LandPreparationRecord,
  PlantingProgramItem,
  PlantingExecutionRecord,
  TreeCensusRecord,
  DeadPalmRecord,
  GapPlantingRecord,
  ReplantingRecord,
  BlockHistoryRecord,
  PlantTimelineEvent,
  GrowthMonitoringRecord,
  AgronomyNote,
  PlantHealthRecord,
  AiHealthFoundationRecord,
  PlantPhotoRecord,
  PlantDocumentRecord,
} from './types';

export const INITIAL_POPULATION_METRICS: PlantPopulationMetrics = {
  totalEstateHa: 12500,
  totalPlantedHa: 10850,
  totalPalmTrees: 1519000,
  productiveTreesTM: 1280000,
  immatureTreesTBM: 239000,
  replantingHa: 450,
  deadTreesCount: 1420,
  missingTreesCount: 890,
  sphDensityAverage: 140,
  gapPlantingPending: 650,
  healthScoreAverage: 91.5,
};

export const INITIAL_PLANT_AGE_CATEGORIES: PlantAgeCategoryInfo[] = [
  {
    key: 'TBM0',
    label: 'TBM-0 (Tahun Tanam)',
    rangeYears: '0 Tahun',
    count: 65000,
    percentage: 4.3,
    description: 'Tanaman Belum Menghasilkan tahun pertama pasca penanaman bibit.',
  },
  {
    key: 'TBM1_3',
    label: 'TBM 1–3 (Masa Pertumbuhan)',
    rangeYears: '1–3 Tahun',
    count: 174000,
    percentage: 11.4,
    description: 'Tanaman Muda dalam fase pembentukan tajuk dan kastrasi bunga awal.',
  },
  {
    key: 'TM_MUDA',
    label: 'TM Muda (Mulai Panen)',
    rangeYears: '4–7 Tahun',
    count: 380000,
    percentage: 25.0,
    description: 'Tanaman Menghasilkan fase awal dengan pertumbuhan BJR yang meningkat cepat.',
  },
  {
    key: 'TM_PRIMA',
    label: 'TM Prima (Puncak Produksi)',
    rangeYears: '8–15 Tahun',
    count: 620000,
    percentage: 40.8,
    description: 'Masa keemasan produksi TBS nasional dengan bobot jenjang optimal.',
  },
  {
    key: 'TM_TUA',
    label: 'TM Tua (Produksi Tinggi)',
    rangeYears: '16–20 Tahun',
    count: 210000,
    percentage: 13.8,
    description: 'Tanaman dewasa dengan ketinggian pelepah yang membutuhkan alat egrang.',
  },
  {
    key: 'TM_RENTAN',
    label: 'TM Rentan / Replanting Target',
    rangeYears: '>20 Tahun',
    count: 70000,
    percentage: 4.6,
    description: 'Tanaman tua dengan penurunan tren SPH dan persiapan program peremajaan.',
  },
];

export const INITIAL_PLANT_VARIETIES: PlantVarietyMaster[] = [
  {
    id: 'var-1',
    varietyCode: 'DM-DXP-SUP',
    name: 'Dami Mas DxP Super',
    breederName: 'PT Smart Tbk (Dami Mas Seed)',
    yieldPotentialTonHa: 32.5,
    oilExtractionRatePct: 26.2,
    harvestStartMonth: 28,
    growthHabit: 'Pertumbuhan meninggi lambat (45 cm/thn), pelepah pendek.',
    resistanceTraits: 'Tahan penyakit Ganoderma lini pertama, toleran kekeringan sedang.',
  },
  {
    id: 'var-2',
    varietyCode: 'SOC-MTG',
    name: 'Socfindo MtG (Matang)',
    breederName: 'PT Socfin Indonesia',
    yieldPotentialTonHa: 30.8,
    oilExtractionRatePct: 25.8,
    harvestStartMonth: 26,
    growthHabit: 'Pertumbuhan meninggi 50 cm/thn, tajuk kompak SPH 143.',
    resistanceTraits: 'Toleran terhadap stres air masam & tanah gambut dangkal.',
  },
  {
    id: 'var-3',
    varietyCode: 'MAR-DXP-STD',
    name: 'Marihat DxP Standard',
    breederName: 'PPKS Medan',
    yieldPotentialTonHa: 28.0,
    oilExtractionRatePct: 24.5,
    harvestStartMonth: 30,
    growthHabit: 'Pertumbuhan meninggi sedang, adaptasi luas di tanah mineral.',
    resistanceTraits: 'Daya tahan tinggi terhadap cuaca ekstrem & kondisi marjinal.',
  },
  {
    id: 'var-4',
    varietyCode: 'TOPAZ-3',
    name: 'Topaz 3 Premium',
    breederName: 'Asian Agri (PT Tunggal Yunus)',
    yieldPotentialTonHa: 31.2,
    oilExtractionRatePct: 26.0,
    harvestStartMonth: 27,
    growthHabit: 'Pelepah sedang, pembentukan tandan cepat dengan BJR rata-rata 18 kg.',
    resistanceTraits: 'Ketahanan moderat terhadap Ganoderma boninense.',
  },
];

export const INITIAL_NURSERIES: NurseryRecord[] = [
  {
    id: 'nur-1',
    nurseryCode: 'NUR-SBE-01',
    nurseryName: 'Main Nursery Sei Buatan',
    estateName: 'Sei Buatan Estate',
    afdelingName: 'Afdeling I',
    type: 'Main-Nursery',
    capacitySeeds: 150000,
    currentSeedsCount: 124500,
    establishedDate: '2025-01-10',
    picName: 'Ir. Ahmad Zulkarnain',
    status: 'Aktif',
    locationGps: { lat: 0.8123, lng: 101.4512 },
  },
  {
    id: 'nur-2',
    nurseryCode: 'NUR-RUE-02',
    nurseryName: 'Pre-Nursery Riau Utara',
    estateName: 'Riau Utara Estate',
    afdelingName: 'Afdeling III',
    type: 'Pre-Nursery',
    capacitySeeds: 50000,
    currentSeedsCount: 42000,
    establishedDate: '2025-03-01',
    picName: 'Budi Santoso, S.P.',
    status: 'Aktif',
    locationGps: { lat: 0.9531, lng: 101.3211 },
  },
];

export const INITIAL_SEEDLINGS: SeedlingBatchRecord[] = [
  {
    id: 'seed-101',
    batchCode: 'BATCH-2025-DM01',
    nurseryId: 'nur-1',
    nurseryName: 'Main Nursery Sei Buatan',
    varietyId: 'var-1',
    varietyName: 'Dami Mas DxP Super',
    supplierName: 'Dami Mas Seed Centre Riau',
    certificateNumber: 'CERT-SEED-2025-99821',
    quantityInitial: 50000,
    quantityCurrent: 48200,
    cullCount: 1800,
    sowingDate: '2025-01-15',
    ageMonths: 7,
    healthStatus: 'Excellent',
    notes: 'Kondisi pelepah berkembang sangat simetris, siap translokasi ke lahan dalam 3 bulan.',
  },
  {
    id: 'seed-102',
    batchCode: 'BATCH-2025-SOC02',
    nurseryId: 'nur-2',
    nurseryName: 'Pre-Nursery Riau Utara',
    varietyId: 'var-2',
    varietyName: 'Socfindo MtG (Matang)',
    supplierName: 'PT Socfin Indonesia Bangun Bandar',
    certificateNumber: 'CERT-SOCFIN-2025-4412',
    quantityInitial: 25000,
    quantityCurrent: 24100,
    cullCount: 900,
    sowingDate: '2025-03-05',
    ageMonths: 4,
    healthStatus: 'Good',
    notes: 'Penyiraman sistem irigasi kocor berjalan baik, pemberian pupuk NPK mikro terjadwal.',
  },
];

export const INITIAL_LAND_CLEARINGS: LandClearingRecord[] = [
  {
    id: 'lc-1',
    clearingCode: 'LC-2025-BLK-A01',
    blockCode: 'BLK-A01',
    estateName: 'Sei Buatan Estate',
    areaHa: 45.0,
    method: 'Zero Burning Chipping',
    contractorName: 'PT Karya Alat Berat Kebun',
    costIdr: 405000000,
    date: '2025-02-10',
    status: 'Selesai',
    picName: 'Hendra Gunawan',
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    lat: 0.8145,
    lng: 101.4556,
  },
];

export const INITIAL_LAND_PREPARATIONS: LandPreparationRecord[] = [
  {
    id: 'lp-1',
    prepCode: 'PREP-2025-BLK-A01',
    blockCode: 'BLK-A01',
    estateName: 'Sei Buatan Estate',
    terracingKm: 12.5,
    drainageM: 3500,
    roadM: 1800,
    ditchesM: 2200,
    soilTillageHa: 45.0,
    coverCropCoveragePct: 92.5,
    status: 'Selesai',
  },
];

export const INITIAL_PLANTING_PROGRAMS: PlantingProgramItem[] = [
  {
    id: 'prog-1',
    programCode: 'PROG-TANAM-2025-01',
    programName: 'Program Penanaman Ulang Blok A01-A05',
    companyName: 'PT Nusantara Palm Lestari',
    estateName: 'Sei Buatan Estate',
    afdelingName: 'Afdeling I',
    blockCode: 'BLK-A01',
    targetAreaHa: 45.0,
    targetTrees: 6300,
    startDate: '2025-04-01',
    endDate: '2025-05-15',
    status: 'Aktif',
    picName: 'Manager Operasional Kebun',
    progressPct: 85,
  },
];

export const INITIAL_PLANTINGS: PlantingExecutionRecord[] = [
  {
    id: 'pl-1',
    plantingCode: 'PL-2025-001',
    programId: 'prog-1',
    blockCode: 'BLK-A01',
    subBlockCode: 'SUB-A01-1',
    varietyName: 'Dami Mas DxP Super',
    quantityPlanted: 3200,
    plantingDistance: '9m x 9m Segitiga Sama Sisi',
    sphDensity: 140,
    date: '2025-04-10',
    mandorName: 'Mandor Tanam Supriadi',
    teamName: 'Regu Tanam Alfa',
    weatherCondition: 'Cerah Berawan',
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    documentUrl: 'https://example.com/berita-acara-tanam.pdf',
    lat: 0.8145,
    lng: 101.4556,
    status: 'Terverifikasi',
  },
];

export const INITIAL_TREE_CENSUS: TreeCensusRecord[] = [
  {
    id: 'cen-1',
    censusCode: 'SENSUS-2025-Q1-A01',
    censusDate: '2025-03-20',
    blockCode: 'BLK-A01',
    estateName: 'Sei Buatan Estate',
    productiveTrees: 0,
    immatureTrees: 6300,
    deadTrees: 12,
    diseasedTrees: 5,
    vacantPoints: 12,
    sphActual: 139.7,
    surveyorName: 'Regu Sensus Mandor Bambang',
    surveyorRole: 'Senior GIS & Agronomy Surveyor',
    status: 'Terverifikasi',
  },
  {
    id: 'cen-2',
    censusCode: 'SENSUS-2025-Q1-B02',
    censusDate: '2025-03-22',
    blockCode: 'BLK-B02',
    estateName: 'Sei Buatan Estate',
    productiveTrees: 7800,
    immatureTrees: 0,
    deadTrees: 18,
    diseasedTrees: 14,
    vacantPoints: 22,
    sphActual: 138.2,
    surveyorName: 'Regu Sensus Mandor Supri',
    surveyorRole: 'Field Agronomy Surveyor',
    status: 'Terverifikasi',
  },
];

export const INITIAL_DEAD_PALMS: DeadPalmRecord[] = [
  {
    id: 'dp-1',
    palmCode: 'DEAD-BLK-A01-102',
    blockCode: 'BLK-A01',
    treeNumber: 'A01-ROW12-P24',
    deathCategory: 'Petir',
    causeDetails: 'Pohon tersambar petir pada hujan lebat tanggal 12 Maret 2025, pelepah hangus terbakar.',
    reportDate: '2025-03-13',
    reportedBy: 'Mandor Supriadi',
    actionStatus: 'Jadwal Sisip',
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    lat: 0.8148,
    lng: 101.4559,
  },
];

export const INITIAL_GAP_PLANTINGS: GapPlantingRecord[] = [
  {
    id: 'gap-1',
    gapCode: 'GAP-2025-BLK-B02-01',
    blockCode: 'BLK-B02',
    treeNumber: 'B02-ROW05-P11',
    date: '2025-03-25',
    quantity: 1,
    varietyName: 'Dami Mas DxP Super',
    reason: 'Penyulaman titik mati akibat serangan kumbang Oryctes',
    picName: 'Mandor Supriadi',
    status: 'Selesai Sisip',
  },
];

export const INITIAL_REPLANTINGS: ReplantingRecord[] = [
  {
    id: 'repl-1',
    replantingCode: 'REPL-2025-EST1-01',
    programName: 'Program Peremajaan Kebun Blok C03 (28 Tahun)',
    companyName: 'PT Nusantara Palm Lestari',
    estateName: 'Sei Buatan Estate',
    blockCode: 'BLK-C03',
    areaHa: 60.0,
    treeCountOld: 8200,
    costIdr: 780000000,
    contractorName: 'PT Alat Berat Nusantara',
    newVarietyName: 'Dami Mas DxP Super',
    startDate: '2025-06-01',
    status: 'Tumbang Cipping',
  },
];

export const INITIAL_BLOCK_HISTORIES: BlockHistoryRecord[] = [
  {
    id: 'bh-1',
    blockCode: 'BLK-A01',
    eventType: 'Land Clearing',
    eventDate: '2025-02-10',
    title: 'Pembersihan Lahan Zero Burning Selesai',
    description: 'Pembersihan lahan seluas 45 Ha menggunakan metode chipping bebas bakar.',
    actorUser: 'Hendra Gunawan',
    actorRole: 'Manager Kontraktor',
    costIdr: 405000000,
  },
  {
    id: 'bh-2',
    blockCode: 'BLK-A01',
    eventType: 'Tanam',
    eventDate: '2025-04-10',
    title: 'Penanaman Perdana Bibit Dami Mas DxP Super',
    description: 'Penanaman 3,200 pokok bibit varietas Dami Mas DxP Super jarak 9m x 9m.',
    actorUser: 'Ir. Ahmad Zulkarnain',
    actorRole: 'Head Agronomis',
  },
];

export const INITIAL_TIMELINE_EVENTS: PlantTimelineEvent[] = [
  {
    id: 'time-1',
    blockCode: 'BLK-A01',
    timestamp: '2025-04-10T08:30:00Z',
    category: 'Penanaman',
    title: 'Penanaman Perdana Blok A01',
    description: 'Sebanyak 3,200 bibit unggul ditanam oleh Regu Tanam Alfa.',
    executor: 'Mandor Supriadi',
  },
  {
    id: 'time-2',
    blockCode: 'BLK-A01',
    timestamp: '2025-05-15T10:15:00Z',
    category: 'Pemupukan',
    title: 'Aplikasi Pupuk Lubang Rock Phosphate (RP)',
    description: 'Pemberian 500 gram RP per lubang tanam sebelum penimbunan tanah.',
    executor: 'Tim Pemupukan Afdeling I',
  },
];

export const INITIAL_GROWTH_RECORDS: GrowthMonitoringRecord[] = [
  {
    id: 'gm-1',
    monitoringCode: 'GROWTH-2025-A01-S01',
    blockCode: 'BLK-A01',
    treeSampleCode: 'BLK-A01-SAMPEL-01',
    observationDate: '2025-05-01',
    heightCm: 142.5,
    stemDiameterCm: 28.4,
    frondCount: 16,
    leafCondition: 'Hijau segar, pertumbuhan helai daun sempurna.',
    stemCondition: 'Sangat kokoh, tidak ada tanda kemiringan.',
    notes: 'Kinerja pertumbuhan sangat memuaskan pasca penanaman 1 bulan.',
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    surveyorName: 'Agus Purnomo (Agronomis)',
  },
];

export const INITIAL_AGRONOMY_NOTES: AgronomyNote[] = [
  {
    id: 'an-1',
    noteCode: 'NOTE-AGRO-2025-089',
    blockCode: 'BLK-A01',
    noteType: 'Voice Memo (Audio)',
    noteDate: '2025-05-10',
    content: 'Observasi drainase sisi barat Blok A01: aliran air berjalan lancar, tidak ada genangan lokal pasca hujan deras semalam.',
    authorName: 'Ir. Ahmad Zulkarnain',
    authorRole: 'Head Agronomis',
    audioDurationSec: 45,
    tags: ['Drainase', 'CurahHujan', 'KondisiLahan'],
  },
];

export const INITIAL_PLANT_HEALTH: PlantHealthRecord[] = [
  {
    id: 'ph-1',
    healthCode: 'HEALTH-BLK-A01-01',
    blockCode: 'BLK-A01',
    treeSampleCode: 'BLK-A01-SAMPEL-01',
    healthStatus: 'Excellent',
    primarySymptom: 'Tidak ada gejala penyakit',
    affectedPct: 0,
    treatmentPlan: 'Pemeliharaan rutin sesuai SOP TBM',
    assignedAgronomist: 'Agus Purnomo, S.P.',
    lastInspectionDate: '2025-05-01',
  },
];

export const INITIAL_AI_HEALTH_FOUNDATIONS: AiHealthFoundationRecord[] = [
  {
    id: 'ai-f-1',
    blockCode: 'BLK-A01',
    estateName: 'Sei Buatan Estate',
    healthScore: 94.8,
    riskScore: 5.2,
    diseasePlaceholder: {
      suspectedDisease: 'Nihil / Sehat (Indeks NDVI 0.82)',
      probabilityPct: 2.1,
      affectedAreaEstHa: 0,
    },
    nutrientPlaceholder: {
      nitrogenStatus: 'Optimal (N 2.75%)',
      potassiumStatus: 'Optimal (K 1.12%)',
      magnesiumStatus: 'Optimal (Mg 0.28%)',
      boronStatus: 'Cukup (B 18 ppm)',
    },
    waterStressPlaceholder: {
      index: 'NDWI 0.45',
      stressLevel: 'Sangat Rendah (Kelembaban Cukup)',
      recommendation: 'Jaga kebersihan parit drainase agar air tergenang tidak berlebih.',
    },
    growthPredictionPlaceholder: {
      predictedFrondGrowthPerMonth: 2.8,
      predictedStemHeightGrowthCmYear: 48.0,
      benchmarkStatus: 'Atas Rata-rata Varietas',
    },
    harvestPredictionPlaceholder: {
      nextMonthYieldEstimateTon: 0,
      tbwEstimateKg: 0,
      peakHarvestMonth: 'TBM (Mulai Panen 2027)',
    },
    aiRecommendationPlaceholder: {
      fertilizerAction: 'Lanjutkan aplikasi NPK 15-15-6-4 Dosis TBM1 bulan depan.',
      pestProtectionAction: 'Pasang Pheretrap Oryctes 1 unit/2 Ha sebagai pencegahan.',
    },
    lastAnalysedAt: '2025-05-20T06:00:00Z',
  },
];

export const INITIAL_PLANT_PHOTOS: PlantPhotoRecord[] = [
  {
    id: 'photo-1',
    photoCode: 'FOTO-BLK-A01-01',
    category: 'Kebun',
    caption: 'Panorama Blok A01 pasca penanaman bibit Dami Mas DxP Super',
    fileUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    uploadDate: '2025-04-12',
    lat: 0.8145,
    lng: 101.4556,
  },
];

export const INITIAL_PLANT_DOCUMENTS: PlantDocumentRecord[] = [
  {
    id: 'doc-1',
    docCode: 'DOC-CERT-DM01',
    category: 'Sertifikat Bibit',
    title: 'Sertifikat Kelayakan Bibit Dami Mas DxP Super',
    fileType: 'PDF',
    fileSizeMb: 3.4,
    fileUrl: 'https://example.com/sertifikat-bibit.pdf',
    uploadDate: '2025-01-20',
    uploadedBy: 'Ir. Ahmad Zulkarnain',
  },
];

export const PLANTATION_REST_API_DOCS = [
  { method: 'GET', path: '/api/v1/plantation/population/metrics', description: 'Metrik populasi kelapa sawit holding' },
  { method: 'GET', path: '/api/v1/plantation/census', description: 'Daftar data sensus pohon per blok' },
  { method: 'POST', path: '/api/v1/plantation/census', description: 'Input data sensus pohon baru' },
  { method: 'GET', path: '/api/v1/plantation/dead-palms', description: 'Daftar pohon mati & titik kosong' },
  { method: 'POST', path: '/api/v1/plantation/gap-planting', description: 'Pencatatan aktivitas penyulaman' },
  { method: 'GET', path: '/api/v1/plantation/ai-health/:blockCode', description: 'Indikator AI & prediksi kesehatan tanaman' },
];

export const PLANTATION_DB_SCHEMA_DOCS = `
-- PostgreSQL Schema Blueprint for PalmVision AI Plantation Module
CREATE TABLE plantation_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_code VARCHAR(50) UNIQUE NOT NULL,
  estate_id UUID REFERENCES estates(id),
  area_ha NUMERIC(10,2) NOT NULL,
  planting_year INT NOT NULL,
  variety_id UUID REFERENCES plant_varieties(id),
  sph_target INT DEFAULT 136,
  sph_actual NUMERIC(6,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE tree_census (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  census_code VARCHAR(50) UNIQUE NOT NULL,
  block_id UUID REFERENCES plantation_blocks(id),
  productive_trees INT DEFAULT 0,
  immature_trees INT DEFAULT 0,
  dead_trees INT DEFAULT 0,
  diseased_trees INT DEFAULT 0,
  vacant_points INT DEFAULT 0,
  surveyor_id UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;
