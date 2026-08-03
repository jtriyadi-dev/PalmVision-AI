export interface IotDevice {
  id: string;
  deviceId: string;
  deviceName: string;
  deviceType: 'WEATHER_STATION' | 'WATER_SENSOR' | 'GPS_TRACKER' | 'FUEL_SENSOR' | 'DRONE' | 'CAMERA' | 'TELEMETRY' | 'GATEWAY' | 'SOIL_SENSOR';
  serialNumber: string;
  manufacturer: string;
  firmwareVersion: string;
  protocol: 'MQTT' | 'HTTP' | 'WEBSOCKET' | 'LORAWAN' | 'NB_IOT' | 'MODBUS' | 'OPC_UA';
  simNumber: string;
  imei: string;
  macAddress: string;
  companyName: string;
  estateName: string;
  divisionName: string;
  blockCode: string;
  gpsCoordinate: string; // Lat, Long
  installationDate: string;
  lastMaintenanceDate: string;
  batteryPercent: number;
  status: 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'DEGRADED';
  healthScore: 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL' | 'OFFLINE';
  photoUrl?: string;
}

export interface DeviceGroup {
  id: string;
  groupCode: string;
  groupName: string;
  category: string;
  totalDevices: number;
  onlineCount: number;
  description: string;
}

export interface SensorGateway {
  id: string;
  gatewayCode: string;
  gatewayName: string;
  ipAddress: string;
  protocolsSupported: string[];
  connectedDevicesCount: number;
  throughputKbps: number;
  status: 'ONLINE' | 'OFFLINE' | 'HIGH_LOAD';
  lastHeartbeat: string;
}

export interface SensorReading {
  id: string;
  deviceId: string;
  deviceName: string;
  timestamp: string;
  temperatureC?: number;
  humidityPct?: number;
  rainfallMm?: number;
  windSpeedKmh?: number;
  windDirectionDeg?: number;
  pressureHpa?: number;
  soilMoisturePct?: number;
  soilPh?: number;
  waterLevelCm?: number;
  flowRateLpm?: number;
  fuelLevelPct?: number;
  batteryPct?: number;
  voltageV?: number;
  status: 'NORMAL' | 'ALERT' | 'CRITICAL';
}

export interface TelemetryLog {
  id: string;
  assetCode: string; // Vehicle, Equipment, Generator, Drone ID
  assetType: 'VEHICLE' | 'HEAVY_EQUIPMENT' | 'GENERATOR' | 'PUMP' | 'WEATHER_STATION' | 'DRONE';
  speedKmh: number;
  engineHoursHm: number;
  fuelConsumptionLph: number;
  locationGps: string;
  timestamp: string;
  operationalState: 'WORKING' | 'IDLE' | 'MOVING' | 'MAINTENANCE';
}

export interface WeatherStationData {
  id: string;
  stationCode: string;
  stationName: string;
  locationEstate: string;
  temperatureC: number;
  humidityPct: number;
  rainfall24hMm: number;
  windSpeedKmh: number;
  windDirection: string;
  solarRadiationWm2: number;
  uvIndex: number;
  evapotranspirationMm: number;
  status: 'ONLINE' | 'OFFLINE';
  lastUpdated: string;
}

export interface DroneItem {
  id: string;
  droneCode: string;
  modelName: string;
  pilotName: string;
  batteryPct: number;
  cameraType: string;
  firmware: string;
  status: 'READY' | 'IN_FLIGHT' | 'CHARGING' | 'MAINTENANCE';
  flightHoursTotal: number;
}

export interface DroneMission {
  id: string;
  missionNo: string;
  missionName: string;
  targetBlock: string;
  missionType: 'ORTHOPHOTO' | 'NDVI_HEALTH' | 'PALM_COUNT' | 'BOUNDARY_INSPECTION' | 'CANOPY_ANALYSIS';
  plannedAltitudeMeters: number;
  flightSpeedMps: number;
  estimatedTimeMin: number;
  waypointCount: number;
  approvalStatus: 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'DRAFT';
  dateScheduled: string;
}

export interface SatelliteImageryItem {
  id: string;
  provider: 'Sentinel-2' | 'Landsat-9' | 'PlanetScope' | 'Maxar High-Res';
  acquisitionDate: string;
  cloudCoverPct: number;
  resolutionMeters: number;
  targetEstate: string;
  indexType: 'NDVI' | 'EVI' | 'NDRE' | 'RGB_TRUE_COLOR';
  thumbnailUrl: string;
  status: 'AVAILABLE' | 'PROCESSING';
}

export interface GisLayer {
  id: string;
  layerName: string;
  category: 'BOUNDARY' | 'BLOCK' | 'INFRASTRUCTURE' | 'SENSOR' | 'HEATMAP' | 'CONTOUR';
  visible: boolean;
  opacity: number; // 0 to 1
  featuresCount: number;
}

export interface DigitalTwinObject {
  id: string;
  objectCode: string;
  objectName: string;
  objectType: 'COMPANY' | 'ESTATE' | 'AFDELING' | 'BLOCK' | 'ROAD' | 'CANAL' | 'BUILDING' | 'WAREHOUSE' | 'WORKSHOP' | 'MILL' | 'WEATHER_STATION' | 'IOT_DEVICE' | 'ASSET' | 'VEHICLE';
  statusColor: 'GREEN' | 'YELLOW' | 'RED' | 'GRAY';
  metricsSummary: string;
  locationBlock: string;
  lastSync: string;
}

export interface SmartEventAlert {
  id: string;
  eventNo: string;
  eventType: 'SENSOR_OFFLINE' | 'RAIN_ALERT' | 'FLOOD_ALERT' | 'FUEL_ALERT' | 'MAINTENANCE_DUE' | 'HIGH_TEMP' | 'GEOFENCE_VIOLATION' | 'LOW_BATTERY';
  severity: 'CRITICAL' | 'WARNING' | 'INFORMATION';
  sourceDevice: string;
  locationEstate: string;
  message: string;
  timestamp: string;
  acknowledged: boolean;
  assignedTo?: string;
}

export interface SensorAiPrediction {
  id: string;
  predictionType: 'WEATHER_FORECAST' | 'FLOOD_RISK' | 'DEVICE_FAILURE' | 'ANOMALY_DETECTION' | 'WATER_IRRIGATION' | 'HARVEST_READINESS' | 'DISEASE_RISK';
  targetEntity: string;
  confidenceScorePercent: number;
  recommendationText: string;
  severityLevel: 'CRITICAL' | 'WARNING' | 'INFO';
  createdAt: string;
}
