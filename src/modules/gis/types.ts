export type SatelliteProvider = 'Sentinel-2 HD' | 'PlanetScope 3m' | 'Landsat-9' | 'Drone Orthomosaic';
export type HeatmapLayerType = 'NDVI_VEGETATION' | 'YIELD_DENSITY' | 'GANODERMA_RISK' | 'SOIL_MOISTURE' | 'ELEVATION_TOPO';

export interface EstateBlockGis {
  id: string;
  blockCode: string; // e.g. "BLK-A01"
  divisionName: string; // e.g. "Divisi 1 - Sei Buatan"
  estateName: string; // e.g. "Kebun Riau Central"
  areaHectares: number; // e.g. 24.5
  palmTreeCount: number; // e.g. 3320
  yearPlanted: number; // e.g. 2018
  palmVariety: string; // e.g. "Tenera DxP Socfindo"
  soilType: string; // e.g. "Organosol / Gambut Dangkal"
  topography: 'Datar (0-3%)' | 'Bergelombang (3-8%)' | 'Berbukit (8-15%)';
  currentNdviScore: number; // 0.0 - 1.0 (e.g. 0.82)
  harvestYieldTonHa: number; // e.g. 22.4
  ganodermaStatus: 'HEALTHY' | 'LOW_RISK' | 'MEDIUM_RISK' | 'INFECTED_HOTSPOT';
  centerCoords: [number, number]; // [lat, lng]
  polygonGeoJson: [number, number][]; // coordinates loop
}

export interface LiveGpsPin {
  id: string;
  unitCode: string; // e.g. "TRK-012"
  driverOrMandorName: string;
  unitCategory: 'TRACTOR' | 'TRUCK_DUMP' | 'EXCAVATOR' | 'MANDOR_MOTOR';
  currentLat: number;
  currentLng: number;
  speedKmH: number;
  engineStatus: 'RUNNING' | 'IDLE' | 'STOPPED';
  lastUpdated: string;
  currentGeofenceZone: string;
}

export interface GeofenceZone {
  id: string;
  zoneName: string;
  zoneType: 'MILL_PERIMETER' | 'CONSERVATION_RIVER' | 'NURSERY_PROTECTED' | 'ESTATE_BOUNDARY';
  radiusOrAreaKm: string;
  speedLimitKmH: number;
  activeRule: string;
  activeViolationsCount: number;
}

export interface DroneFlightSurvey {
  id: string;
  flightCode: string;
  flightDate: string;
  blockCode: string;
  coveredAreaHa: number;
  resolutionCmPerPixel: number;
  treesDetectedCount: number;
  missingTreesCount: number;
  orthomosaicUrl: string;
  status: 'COMPLETED' | 'PROCESSING' | 'SCHEDULED';
}
