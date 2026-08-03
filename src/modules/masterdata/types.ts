export type MasterDataCategory =
  | 'hierarchy'
  | 'agronomy'
  | 'infrastructure'
  | 'agrochemical'
  | 'assets'
  | 'organization'
  | 'partners'
  | 'finance'
  | 'devices'
  | 'aiconfig';

export type MasterDataType =
  | 'company'
  | 'estate'
  | 'division'
  | 'afdeling'
  | 'block'
  | 'subblock'
  | 'soil'
  | 'topography'
  | 'variety'
  | 'land_ownership'
  | 'infrastructure'
  | 'fertilizer'
  | 'pesticide'
  | 'equipment'
  | 'vehicle'
  | 'department'
  | 'position'
  | 'vendor'
  | 'supplier'
  | 'contractor'
  | 'weather_station'
  | 'iot_device'
  | 'drone'
  | 'doc_category'
  | 'ai_config';

export interface BaseMasterItem {
  id: string;
  code: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  isDeleted?: boolean;
  notes?: string;
  customFields?: Record<string, any>;
}

export interface MasterCompanyItem extends BaseMasterItem {
  legalName: string;
  nib: string;
  npwp: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  picName: string;
  picPhone: string;
  brandColor: string;
  timezone: string;
  currency: string;
  estatesCount: number;
}

export interface MasterEstateItem extends BaseMasterItem {
  companyName: string;
  managerName: string;
  totalHectares: number;
  latitude: number;
  longitude: number;
  operationalDate: string;
  divisionsCount: number;
  afdelingsCount: number;
  blocksCount: number;
}

export interface MasterDivisionItem extends BaseMasterItem {
  estateName: string;
  supervisorName: string;
  totalHectares: number;
  afdelingsCount: number;
}

export interface MasterAfdelingItem extends BaseMasterItem {
  estateName: string;
  divisionName: string;
  mandorName: string;
  totalHectares: number;
  totalTrees: number;
  blocksCount: number;
}

export interface MasterBlockItem extends BaseMasterItem {
  estateName: string;
  divisionName: string;
  afdelingName: string;
  hectares: number;
  totalTrees: number;
  plantingYear: number;
  plantAge: number;
  soilType: string;
  topography: string;
  variety: string;
  sph: number;
  lat: number;
  lng: number;
}

export interface MasterSubBlockItem extends BaseMasterItem {
  blockCode: string;
  hectares: number;
  totalTrees: number;
  plantingYear: number;
}

export interface MasterSoilItem extends BaseMasterItem {
  soilCategory: 'Gambut' | 'Mineral' | 'Liat' | 'Berpasir' | 'Lempung' | 'Aluvial';
  description: string;
  pHRange: string;
  organicContentPct: number;
  aiFertilizerRecommendation: string;
}

export interface MasterTopographyItem extends BaseMasterItem {
  slopeCategory: 'Datar (0-3%)' | 'Bergelombang (3-8%)' | 'Berbukit (8-15%)' | 'Curam (>15%)';
  mechanizationSuitability: string;
  erosionRisk: 'Rendah' | 'Sedang' | 'Tinggi';
}

export interface MasterVarietyItem extends BaseMasterItem {
  producer: string;
  releaseYear: number;
  yieldPotentialTonsPerHa: number;
  bjrTargetKg: number;
  oilExtractionPct: number;
  description: string;
}

export interface MasterLandOwnershipItem extends BaseMasterItem {
  type: 'HGU' | 'SHM' | 'Plasma' | 'Sewa' | 'Kemitraan' | 'Adat';
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  hectares: number;
  location: string;
  holderName: string;
}

export interface MasterInfrastructureItem extends BaseMasterItem {
  category:
    | 'Jalan Utama'
    | 'Jalan Produksi'
    | 'Jembatan'
    | 'Parit/Kanal'
    | 'Pos Keamanan'
    | 'Gudang Central'
    | 'Workshop'
    | 'Perumahan Staff'
    | 'Pabrik Kelapa Sawit (PKS)'
    | 'Jembatan Timbang'
    | 'Tower Air'
    | 'Genset House';
  locationEstate: string;
  condition: 'Sangat Baik' | 'Baik' | 'Perlu Perbaikan' | 'Rusak Berat';
  gpsCoordinates: string;
  photoUrl?: string;
}

export interface MasterFertilizerItem extends BaseMasterItem {
  type: 'Anorganik Tunggal' | 'Majemuk NPK' | 'Organik' | 'Mikro Element';
  npkRatio: string;
  unit: 'Kg' | 'Ton' | 'Liter';
  supplierName: string;
  defaultPricePerUnit: number;
  dosageRecommendation: string;
}

export interface MasterPesticideItem extends BaseMasterItem {
  category: 'Insektisida' | 'Fungisida' | 'Herbisida' | 'Rodentisida';
  activeIngredient: string;
  formulation: string;
  unit: 'Liter' | 'Kg';
  targetPest: string;
  supplierName: string;
  safetyClass: 'Kelas I (Sangat Beracun)' | 'Kelas II (Beracun)' | 'Kelas III (Cukup Beracun)';
}

export interface MasterEquipmentItem extends BaseMasterItem {
  category: 'Chainsaw' | 'Sprayer Elektrik' | 'GPS Handheld' | 'Drone Thermal' | 'Pompa Air' | 'Genset Mobile' | 'Alat Panen Egrek';
  brandModel: string;
  serialNumber: string;
  purchaseDate: string;
  condition: 'Baru' | 'Bekerja Baik' | 'Perlu Servis' | 'Afkir';
  assignedTo: string;
}

export interface MasterVehicleItem extends BaseMasterItem {
  type: 'Truk Dump' | 'Tractor Farm' | 'Excavator' | 'Bulldozer' | 'Wheel Loader' | 'Motor Field Assistant' | 'Mobil Double Cabin' | 'Ambulance';
  plateNumber: string;
  chassisNumber: string;
  engineNumber: string;
  year: number;
  fuelType: 'Solar Dex' | 'Biosolar' | 'Pertalite';
  assignedEstate: string;
}

export interface MasterDepartmentItem extends BaseMasterItem {
  managerName: string;
  headCount: number;
  budgetAllocation: number;
}

export interface MasterPositionItem extends BaseMasterItem {
  departmentName: string;
  level: 'C-Level' | 'Managerial' | 'Executive' | 'Supervisor' | 'Field Mandor' | 'Operational Worker';
  basicSalaryRange: string;
}

export interface MasterPartnerItem extends BaseMasterItem {
  partnerType: 'VENDOR' | 'SUPPLIER' | 'CONTRACTOR' | 'CUSTOMER';
  nibNpwp: string;
  address: string;
  picName: string;
  picPhone: string;
  picEmail: string;
  bankName: string;
  bankAccountNumber: string;
  ratingScore: number;
}

export interface MasterWeatherStationItem extends BaseMasterItem {
  estateName: string;
  gpsCoordinates: string;
  sensorTypes: string;
  solarPanelBatteryPct: number;
  lastTelemetryPing: string;
}

export interface MasterIotDeviceItem extends BaseMasterItem {
  deviceType: 'Soil Moisture' | 'Water Level Gauge' | 'GPS Fleet Tracker' | 'Fuel Tank Meter' | 'Temp & Humidity';
  serialNumber: string;
  assignedLocation: string;
  firmwareVersion: string;
  batteryPct: number;
  pingStatus: 'ONLINE' | 'OFFLINE' | 'WARNING';
}

export interface MasterDroneDeviceItem extends BaseMasterItem {
  modelName: string;
  serialNumber: string;
  cameraType: 'RGB High-Res' | 'Multispectral NDVI' | 'Thermal Sensor';
  certifiedPilotName: string;
  flightHoursTotal: number;
}

export interface MasterDocCategoryItem extends BaseMasterItem {
  allowedFileTypes: string;
  maxSizeMb: number;
  retentionYears: number;
}

export interface MasterAiConfigItem extends BaseMasterItem {
  parameterKey: string;
  parameterValue: string;
  datatype: 'STRING' | 'NUMBER' | 'BOOLEAN' | 'JSON';
  confidenceThreshold: number;
  description: string;
}
