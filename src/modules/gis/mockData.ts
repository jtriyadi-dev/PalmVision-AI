import { EstateBlockGis, LiveGpsPin, GeofenceZone, DroneFlightSurvey } from './types';

export const mockEstateBlocks: EstateBlockGis[] = [
  {
    id: 'blk-01',
    blockCode: 'BLK-A01',
    divisionName: 'Divisi 1 - Sei Buatan',
    estateName: 'Kebun Riau Central',
    areaHectares: 28.5,
    palmTreeCount: 3870,
    yearPlanted: 2017,
    palmVariety: 'Tenera DxP Socfindo',
    soilType: 'Alluvial Mineral Sub-Latosol',
    topography: 'Datar (0-3%)',
    currentNdviScore: 0.84,
    harvestYieldTonHa: 24.8,
    ganodermaStatus: 'HEALTHY',
    centerCoords: [0.5071, 101.4478],
    polygonGeoJson: [
      [0.5100, 101.4450],
      [0.5100, 101.4500],
      [0.5050, 101.4500],
      [0.5050, 101.4450]
    ]
  },
  {
    id: 'blk-02',
    blockCode: 'BLK-A02',
    divisionName: 'Divisi 1 - Sei Buatan',
    estateName: 'Kebun Riau Central',
    areaHectares: 31.0,
    palmTreeCount: 4210,
    yearPlanted: 2018,
    palmVariety: 'Tenera DxP Marihat',
    soilType: 'Gambut Dangkal (&lt;1m)',
    topography: 'Datar (0-3%)',
    currentNdviScore: 0.76,
    harvestYieldTonHa: 22.1,
    ganodermaStatus: 'LOW_RISK',
    centerCoords: [0.5121, 101.4528],
    polygonGeoJson: [
      [0.5150, 101.4500],
      [0.5150, 101.4550],
      [0.5100, 101.4550],
      [0.5100, 101.4500]
    ]
  },
  {
    id: 'blk-03',
    blockCode: 'BLK-B05',
    divisionName: 'Divisi 2 - Tapung Hilir',
    estateName: 'Kebun Riau Central',
    areaHectares: 25.2,
    palmTreeCount: 3400,
    yearPlanted: 2015,
    palmVariety: 'DxP Lonsum Topaz',
    soilType: 'Podsolik Merah Kuning',
    topography: 'Bergelombang (3-8%)',
    currentNdviScore: 0.62,
    harvestYieldTonHa: 18.5,
    ganodermaStatus: 'INFECTED_HOTSPOT',
    centerCoords: [0.4981, 101.4388],
    polygonGeoJson: [
      [0.5010, 101.4360],
      [0.5010, 101.4410],
      [0.4960, 101.4410],
      [0.4960, 101.4360]
    ]
  },
  {
    id: 'blk-04',
    blockCode: 'BLK-C12',
    divisionName: 'Divisi 3 - Libo Jaya',
    estateName: 'Kebun Riau Central',
    areaHectares: 35.0,
    palmTreeCount: 4760,
    yearPlanted: 2020,
    palmVariety: 'Tenera DxP Socfindo',
    soilType: 'Alluvial Mineral',
    topography: 'Berbukit (8-15%)',
    currentNdviScore: 0.88,
    harvestYieldTonHa: 26.2,
    ganodermaStatus: 'HEALTHY',
    centerCoords: [0.5210, 101.4610],
    polygonGeoJson: [
      [0.5240, 101.4580],
      [0.5240, 101.4640],
      [0.5180, 101.4640],
      [0.5180, 101.4580]
    ]
  },
  {
    id: 'blk-05',
    blockCode: 'BLK-D08',
    divisionName: 'Divisi 3 - Libo Jaya',
    estateName: 'Kebun Riau Central',
    areaHectares: 22.8,
    palmTreeCount: 3100,
    yearPlanted: 2016,
    palmVariety: 'DxP Dami Mas',
    soilType: 'Gambut Sedang (1-2m)',
    topography: 'Datar (0-3%)',
    currentNdviScore: 0.71,
    harvestYieldTonHa: 20.4,
    ganodermaStatus: 'MEDIUM_RISK',
    centerCoords: [0.4890, 101.4250],
    polygonGeoJson: [
      [0.4920, 101.4220],
      [0.4920, 101.4280],
      [0.4860, 101.4280],
      [0.4860, 101.4220]
    ]
  }
];

export const mockLiveGpsPins: LiveGpsPin[] = [
  {
    id: 'gps-01',
    unitCode: 'TRK-TBS-01',
    driverOrMandorName: 'Bambang Supriyadi (Driver Truk TBS)',
    unitCategory: 'TRUCK_DUMP',
    currentLat: 0.5085,
    currentLng: 101.4485,
    speedKmH: 22.4,
    engineStatus: 'RUNNING',
    lastUpdated: 'Sekarang',
    currentGeofenceZone: 'Jalan Utama Divisi 1'
  },
  {
    id: 'gps-02',
    unitCode: 'TRC-MAS-04',
    driverOrMandorName: 'Ahmad Ridwan (Operator Traktor Langsir)',
    unitCategory: 'TRACTOR',
    currentLat: 0.4988,
    currentLng: 101.4392,
    speedKmH: 8.5,
    engineStatus: 'RUNNING',
    lastUpdated: '1 mnt lalu',
    currentGeofenceZone: 'Blok B05 Hotspot'
  },
  {
    id: 'gps-03',
    unitCode: 'MND-MTR-02',
    driverOrMandorName: 'Mandor Budi Setiawan (Mandor Panen)',
    unitCategory: 'MANDOR_MOTOR',
    currentLat: 0.5215,
    currentLng: 101.4615,
    speedKmH: 15.0,
    engineStatus: 'RUNNING',
    lastUpdated: 'Sekarang',
    currentGeofenceZone: 'Blok C12 Libo Jaya'
  },
  {
    id: 'gps-04',
    unitCode: 'EXC-KOM-02',
    driverOrMandorName: 'Dedi Kurniawan (Operator Excavator Parit)',
    unitCategory: 'EXCAVATOR',
    currentLat: 0.4892,
    currentLng: 101.4252,
    speedKmH: 0.0,
    engineStatus: 'IDLE',
    lastUpdated: '3 mnt lalu',
    currentGeofenceZone: 'Zona Konservasi Sempadan Sungai'
  }
];

export const mockGeofenceZones: GeofenceZone[] = [
  {
    id: 'geo-01',
    zoneName: 'Perimeter Pabrik Kelapa Sawit (PKS) Riau',
    zoneType: 'MILL_PERIMETER',
    radiusOrAreaKm: 'Radius 1.5 km',
    speedLimitKmH: 20,
    activeRule: 'Verifikasi Otomatis Timbangan TBS & Batas Jam Keluar-Masuk Unit',
    activeViolationsCount: 0
  },
  {
    id: 'geo-02',
    zoneName: 'Batas Konservasi Sempadan Sungai Tapung (HCV)',
    zoneType: 'CONSERVATION_RIVER',
    radiusOrAreaKm: 'Buffer 50m Kiri-Kanan Sungai',
    speedLimitKmH: 10,
    activeRule: 'Dilarang Melakukan Aplikasi Pupuk Kimia / Semprot Pestisida',
    activeViolationsCount: 1
  },
  {
    id: 'geo-03',
    zoneName: 'Pembibitan Utama (Main Nursery) Tenera DxP',
    zoneType: 'NURSERY_PROTECTED',
    radiusOrAreaKm: 'Area 12.5 Ha',
    speedLimitKmH: 15,
    activeRule: 'Akses Terbatas Khusus Petugas Sertifikasi Bibit & Sprinkler IoT',
    activeViolationsCount: 0
  }
];

export const mockDroneSurveys: DroneFlightSurvey[] = [
  {
    id: 'drn-01',
    flightCode: 'FLT-DRN-20260801',
    flightDate: '01 Agu 2026',
    blockCode: 'BLK-A01',
    coveredAreaHa: 28.5,
    resolutionCmPerPixel: 2.1,
    treesDetectedCount: 3864,
    missingTreesCount: 6,
    orthomosaicUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&q=80',
    status: 'COMPLETED'
  },
  {
    id: 'drn-02',
    flightCode: 'FLT-DRN-20260802',
    flightDate: '02 Agu 2026',
    blockCode: 'BLK-B05',
    coveredAreaHa: 25.2,
    resolutionCmPerPixel: 1.8,
    treesDetectedCount: 3280,
    missingTreesCount: 120,
    orthomosaicUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
    status: 'COMPLETED'
  },
  {
    id: 'drn-03',
    flightCode: 'FLT-DRN-20260803',
    flightDate: '03 Agu 2026',
    blockCode: 'BLK-C12',
    coveredAreaHa: 35.0,
    resolutionCmPerPixel: 2.5,
    treesDetectedCount: 4750,
    missingTreesCount: 10,
    orthomosaicUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
    status: 'PROCESSING'
  }
];
