export type NurseryType = 'Pre-Nursery' | 'Main-Nursery';
export type NurseryStatus = 'Aktif' | 'Persiapan' | 'Selesai' | 'Non-Aktif';

export type DeathCategory =
  | 'Penyakit (Ganoderma/Curvularia)'
  | 'Petir'
  | 'Angin Kencang'
  | 'Banjir / Tergenang'
  | 'Kekeringan'
  | 'Usia Tua'
  | 'Hama (Oryctes/Babi/Gajah)'
  | 'Lainnya';

export interface PlantPopulationMetrics {
  totalEstateHa: number;
  totalPlantedHa: number;
  totalPalmTrees: number;
  productiveTreesTM: number;
  immatureTreesTBM: number;
  replantingHa: number;
  deadTreesCount: number;
  missingTreesCount: number;
  sphDensityAverage: number;
  gapPlantingPending: number;
  healthScoreAverage: number;
}

export interface PlantAgeCategoryInfo {
  key: string;
  label: string;
  rangeYears: string;
  count: number;
  percentage: number;
  description: string;
}

export interface PlantVarietyMaster {
  id: string;
  varietyCode: string;
  name: string;
  breederName: string;
  yieldPotentialTonHa: number;
  oilExtractionRatePct: number;
  harvestStartMonth: number;
  growthHabit: string;
  resistanceTraits: string;
}

export interface NurseryRecord {
  id: string;
  nurseryCode: string;
  nurseryName: string;
  estateName: string;
  afdelingName: string;
  type: NurseryType;
  capacitySeeds: number;
  currentSeedsCount: number;
  establishedDate: string;
  picName: string;
  status: NurseryStatus;
  locationGps: { lat: number; lng: number };
}

export interface SeedlingBatchRecord {
  id: string;
  batchCode: string;
  nurseryId: string;
  nurseryName: string;
  varietyId: string;
  varietyName: string;
  supplierName: string;
  certificateNumber: string;
  quantityInitial: number;
  quantityCurrent: number;
  cullCount: number;
  sowingDate: string;
  ageMonths: number;
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  notes: string;
}

export interface LandClearingRecord {
  id: string;
  clearingCode: string;
  blockCode: string;
  estateName: string;
  areaHa: number;
  method: 'Zero Burning Chipping' | 'Mechanical Raking' | 'Manual Clearing';
  contractorName: string;
  costIdr: number;
  date: string;
  status: 'Selesai' | 'Dalam Proses' | 'Direncanakan';
  picName: string;
  photoUrl: string;
  lat: number;
  lng: number;
}

export interface LandPreparationRecord {
  id: string;
  prepCode: string;
  blockCode: string;
  estateName: string;
  terracingKm: number;
  drainageM: number;
  roadM: number;
  ditchesM: number;
  soilTillageHa: number;
  coverCropCoveragePct: number;
  status: 'Selesai' | 'Dalam Proses';
}

export interface PlantingProgramItem {
  id: string;
  programCode: string;
  programName: string;
  companyName: string;
  estateName: string;
  afdelingName: string;
  blockCode: string;
  targetAreaHa: number;
  targetTrees: number;
  startDate: string;
  endDate: string;
  status: 'Aktif' | 'Direncanakan' | 'Selesai';
  picName: string;
  progressPct: number;
}

export interface PlantingExecutionRecord {
  id: string;
  plantingCode: string;
  programId: string;
  blockCode: string;
  subBlockCode: string;
  varietyName: string;
  quantityPlanted: number;
  plantingDistance: string;
  sphDensity: number;
  date: string;
  mandorName: string;
  teamName: string;
  weatherCondition: string;
  photoUrl: string;
  documentUrl: string;
  lat: number;
  lng: number;
  status: 'Terverifikasi' | 'Menunggu Verifikasi';
}

export interface TreeCensusRecord {
  id: string;
  censusCode: string;
  censusDate: string;
  blockCode: string;
  estateName: string;
  productiveTrees: number;
  immatureTrees: number;
  deadTrees: number;
  diseasedTrees: number;
  vacantPoints: number;
  sphActual: number;
  surveyorName: string;
  surveyorRole: string;
  status: 'Terverifikasi' | 'Draft';
}

export interface DeadPalmRecord {
  id: string;
  palmCode: string;
  blockCode: string;
  treeNumber: string;
  deathCategory: DeathCategory;
  causeDetails: string;
  reportDate: string;
  reportedBy: string;
  actionStatus: 'Dilaporkan' | 'Terverifikasi' | 'Jadwal Sisip' | 'Selesai Sisip';
  photoUrl: string;
  lat: number;
  lng: number;
}

export interface GapPlantingRecord {
  id: string;
  gapCode: string;
  blockCode: string;
  treeNumber: string;
  date: string;
  quantity: number;
  varietyName: string;
  reason: string;
  picName: string;
  status: 'Selesai Sisip' | 'Proses';
}

export interface ReplantingRecord {
  id: string;
  replantingCode: string;
  programName: string;
  companyName: string;
  estateName: string;
  blockCode: string;
  areaHa: number;
  treeCountOld: number;
  costIdr: number;
  contractorName: string;
  newVarietyName: string;
  startDate: string;
  status: 'Tumbang Cipping' | 'Persiapan Lahan' | 'Penanaman' | 'Selesai';
}

export interface BlockHistoryRecord {
  id: string;
  blockCode: string;
  eventType: 'Land Clearing' | 'Land Prep' | 'Tanam' | 'Pemupukan' | 'Sensus' | 'Penyakit' | 'Replanting';
  eventDate: string;
  title: string;
  description: string;
  actorUser: string;
  actorRole: string;
  costIdr?: number;
}

export interface PlantTimelineEvent {
  id: string;
  blockCode: string;
  timestamp: string;
  category: string;
  title: string;
  description: string;
  executor: string;
}

export interface GrowthMonitoringRecord {
  id: string;
  monitoringCode: string;
  blockCode: string;
  treeSampleCode: string;
  observationDate: string;
  heightCm: number;
  stemDiameterCm: number;
  frondCount: number;
  leafCondition: string;
  stemCondition: string;
  notes: string;
  photoUrl: string;
  surveyorName: string;
}

export interface AgronomyNote {
  id: string;
  noteCode: string;
  blockCode: string;
  noteType: 'Teks' | 'Foto' | 'Video' | 'Voice Memo (Audio)' | 'Dokumen';
  noteDate: string;
  content: string;
  authorName: string;
  authorRole: string;
  mediaUrl?: string;
  audioDurationSec?: number;
  tags: string[];
}

export interface PlantHealthRecord {
  id: string;
  healthCode: string;
  blockCode: string;
  treeSampleCode: string;
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
  primarySymptom: string;
  affectedPct: number;
  treatmentPlan: string;
  assignedAgronomist: string;
  lastInspectionDate: string;
}

export interface AiHealthFoundationRecord {
  id: string;
  blockCode: string;
  estateName: string;
  healthScore: number;
  riskScore: number;
  diseasePlaceholder: {
    suspectedDisease: string;
    probabilityPct: number;
    affectedAreaEstHa: number;
  };
  nutrientPlaceholder: {
    nitrogenStatus: string;
    potassiumStatus: string;
    magnesiumStatus: string;
    boronStatus: string;
  };
  waterStressPlaceholder: {
    index: string;
    stressLevel: string;
    recommendation: string;
  };
  growthPredictionPlaceholder: {
    predictedFrondGrowthPerMonth: number;
    predictedStemHeightGrowthCmYear: number;
    benchmarkStatus: string;
  };
  harvestPredictionPlaceholder: {
    nextMonthYieldEstimateTon: number;
    tbwEstimateKg: number;
    peakHarvestMonth: string;
  };
  aiRecommendationPlaceholder: {
    fertilizerAction: string;
    pestProtectionAction: string;
  };
  lastAnalysedAt: string;
}

export interface PlantPhotoRecord {
  id: string;
  photoCode: string;
  category: 'Kebun' | 'Akar' | 'Batang' | 'Pelepah' | 'Buah TBS' | 'Hama & Penyakit';
  caption: string;
  fileUrl: string;
  uploadDate: string;
  lat: number;
  lng: number;
}

export interface PlantDocumentRecord {
  id: string;
  docCode: string;
  category: 'Berita Acara' | 'Sertifikat Bibit' | 'Laporan Sensus' | 'Analisis Daun' | 'Peta GIS';
  title: string;
  fileType: 'PDF' | 'Excel' | 'Word' | 'ZIP';
  fileSizeMb: number;
  fileUrl: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface PlantationFilterState {
  searchQuery: string;
  companyId: string;
  estateId: string;
  afdelingName: string;
  blockCode: string;
  varietyId: string;
  year: string;
  ageCategory: string;
  healthStatus: string;
  dateFrom: string;
  dateTo: string;
}
