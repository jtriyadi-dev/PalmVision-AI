import {
  IotDevice,
  DeviceGroup,
  SensorGateway,
  SensorReading,
  TelemetryLog,
  WeatherStationData,
  DroneItem,
  DroneMission,
  SatelliteImageryItem,
  GisLayer,
  DigitalTwinObject,
  SmartEventAlert,
  SensorAiPrediction
} from './types';

export const mockIotDevices: IotDevice[] = [
  {
    id: 'dev-1',
    deviceId: 'AWS-ED-001',
    deviceName: 'Weather Station Estate Alpha',
    deviceType: 'WEATHER_STATION',
    serialNumber: 'AWS-2025-9981',
    manufacturer: 'Vaisala IoT Systems',
    firmwareVersion: 'v3.4.1-lora',
    protocol: 'LORAWAN',
    simNumber: '+6281299001122',
    imei: '864213059102381',
    macAddress: '70:B3:D5:7E:D0:01',
    companyName: 'PT Nusantara Palm Abadi',
    estateName: 'Riau Central Estate',
    divisionName: 'Division 01 - North',
    blockCode: 'BLK-A12',
    gpsCoordinate: '0.5071° N, 101.4478° E',
    installationDate: '2024-03-15',
    lastMaintenanceDate: '2026-06-10',
    batteryPercent: 94,
    status: 'ONLINE',
    healthScore: 'EXCELLENT',
  },
  {
    id: 'dev-2',
    deviceId: 'WTR-RIV-004',
    deviceName: 'Main River Canal Level Gauge',
    deviceType: 'WATER_SENSOR',
    serialNumber: 'WTR-ULTR-7721',
    manufacturer: 'Ott Hydromet',
    firmwareVersion: 'v2.1.0',
    protocol: 'NB_IOT',
    simNumber: '+6281299003344',
    imei: '864213059108892',
    macAddress: '70:B3:D5:7E:D0:04',
    companyName: 'PT Nusantara Palm Abadi',
    estateName: 'Riau Central Estate',
    divisionName: 'Division 02 - Canal Zone',
    blockCode: 'BLK-C04',
    gpsCoordinate: '0.5120° N, 101.4510° E',
    installationDate: '2024-08-20',
    lastMaintenanceDate: '2026-07-02',
    batteryPercent: 88,
    status: 'ONLINE',
    healthScore: 'GOOD',
  },
  {
    id: 'dev-3',
    deviceId: 'GPS-CAT-088',
    deviceName: 'Caterpillar D6 Dozer GPS Telemetry',
    deviceType: 'GPS_TRACKER',
    serialNumber: 'TRK-CAT-9901',
    manufacturer: 'Trimble Mining & Ag',
    firmwareVersion: 'v4.0.2',
    protocol: 'HTTP',
    simNumber: '+6281299005566',
    imei: '864213059109911',
    macAddress: '70:B3:D5:7E:D0:08',
    companyName: 'PT Nusantara Palm Abadi',
    estateName: 'Riau Central Estate',
    divisionName: 'Heavy Workshop',
    blockCode: 'WKSHP-01',
    gpsCoordinate: '0.5042° N, 101.4421° E',
    installationDate: '2025-01-10',
    lastMaintenanceDate: '2026-05-18',
    batteryPercent: 100,
    status: 'ONLINE',
    healthScore: 'EXCELLENT',
  },
  {
    id: 'dev-4',
    deviceId: 'SOIL-SENS-102',
    deviceName: 'Peat Moisture & pH Node B15',
    deviceType: 'SOIL_SENSOR',
    serialNumber: 'SOIL-PRO-3312',
    manufacturer: 'Decagon Meters',
    firmwareVersion: 'v1.8.0',
    protocol: 'LORAWAN',
    simNumber: 'N/A (LoRa Gateway)',
    imei: 'N/A',
    macAddress: '70:B3:D5:7E:D0:12',
    companyName: 'PT Nusantara Palm Abadi',
    estateName: 'Riau Central Estate',
    divisionName: 'Division 03 - Peat Block',
    blockCode: 'BLK-B15',
    gpsCoordinate: '0.4988° N, 101.4390° E',
    installationDate: '2024-11-05',
    lastMaintenanceDate: '2026-04-12',
    batteryPercent: 22,
    status: 'ONLINE',
    healthScore: 'WARNING',
  },
  {
    id: 'dev-5',
    deviceId: 'DRONE-MAT-300',
    deviceName: 'DJI Matrice 300 RTK - Alpha',
    deviceType: 'DRONE',
    serialNumber: 'DJI-M300-8812',
    manufacturer: 'DJI Agriculture',
    firmwareVersion: 'v06.01.01',
    protocol: 'WEBSOCKET',
    simNumber: '+6281299007788',
    imei: '864213059107722',
    macAddress: '70:B3:D5:7E:D0:20',
    companyName: 'PT Nusantara Palm Abadi',
    estateName: 'Riau Central Estate',
    divisionName: 'GIS & Survey HQ',
    blockCode: 'HQ-SURVEY',
    gpsCoordinate: '0.5090° N, 101.4450° E',
    installationDate: '2025-02-01',
    lastMaintenanceDate: '2026-07-20',
    batteryPercent: 96,
    status: 'ONLINE',
    healthScore: 'EXCELLENT',
  },
  {
    id: 'dev-6',
    deviceId: 'FUEL-GEN-002',
    deviceName: 'Mill Generator Fuel Level Sensor',
    deviceType: 'FUEL_SENSOR',
    serialNumber: 'FL-SENS-4001',
    manufacturer: 'Omnicomm IoT',
    firmwareVersion: 'v2.4.0',
    protocol: 'MODBUS',
    simNumber: '+6281299009900',
    imei: '864213059101133',
    macAddress: '70:B3:D5:7E:D0:30',
    companyName: 'PT Nusantara Palm Abadi',
    estateName: 'Riau Central Estate',
    divisionName: 'Palm Oil Mill 01',
    blockCode: 'MILL-MAIN',
    gpsCoordinate: '0.5011° N, 101.4400° E',
    installationDate: '2023-09-12',
    lastMaintenanceDate: '2026-03-30',
    batteryPercent: 0, // Powered by mains
    status: 'OFFLINE',
    healthScore: 'OFFLINE',
  }
];

export const mockDeviceGroups: DeviceGroup[] = [
  { id: 'grp-1', groupCode: 'GRP-WEATHER', groupName: 'Weather Stations & AWS Nodes', category: 'Environmental', totalDevices: 6, onlineCount: 6, description: 'Automated weather, rainfall & climate monitoring nodes across estates.' },
  { id: 'grp-2', groupCode: 'GRP-WATER', groupName: 'Water & Canal Level Telemetry', category: 'Hydrology', totalDevices: 12, onlineCount: 11, description: 'Peatland water table depth, river level & drainage gate monitors.' },
  { id: 'grp-3', groupCode: 'GRP-FLEET', groupName: 'Heavy Equipment & Truck GPS', category: 'Logistics', totalDevices: 28, onlineCount: 26, description: 'Real-time GPS, fuel consumption & hour meters for tractors & trucks.' },
  { id: 'grp-4', groupCode: 'GRP-SOIL', groupName: 'Soil Moisture & NPK Probes', category: 'Agronomy', totalDevices: 18, onlineCount: 15, description: 'Multi-depth moisture sensors and pH sensors in high-yield blocks.' },
  { id: 'grp-5', groupCode: 'GRP-DRONE', groupName: 'Survey Drones & RTK Stations', category: 'Mapping', totalDevices: 4, onlineCount: 4, description: 'Autonomous mapping drones and RTK base station setup.' },
  { id: 'grp-6', groupCode: 'GRP-GATEWAY', groupName: 'LoRaWAN & Cellular Gateways', category: 'Network', totalDevices: 8, onlineCount: 8, description: 'Field edge gateways converting LoRa/Modbus to MQTT cloud broker.' }
];

export const mockSensorGateways: SensorGateway[] = [
  { id: 'gw-1', gatewayCode: 'GW-RIAU-NORTH', gatewayName: 'North Estate LoRaWAN Tower 1', ipAddress: '10.24.12.10', protocolsSupported: ['LoRaWAN', 'MQTT', 'HTTP'], connectedDevicesCount: 34, throughputKbps: 128, status: 'ONLINE', lastHeartbeat: '2026-08-03 09:25:00' },
  { id: 'gw-2', gatewayCode: 'GW-RIAU-MILL', gatewayName: 'Palm Oil Mill Modbus/OPC Gateway', ipAddress: '10.24.18.50', protocolsSupported: ['Modbus-RTU', 'OPC-UA', 'WebSocket'], connectedDevicesCount: 18, throughputKbps: 512, status: 'ONLINE', lastHeartbeat: '2026-08-03 09:26:12' },
  { id: 'gw-3', gatewayCode: 'GW-SOUTH-NBIOT', gatewayName: 'South Division NB-IoT Relay Node', ipAddress: '10.24.30.88', protocolsSupported: ['NB-IoT', 'HTTPS'], connectedDevicesCount: 12, throughputKbps: 64, status: 'HIGH_LOAD', lastHeartbeat: '2026-08-03 09:24:45' },
];

export const mockSensorReadings: SensorReading[] = [
  { id: 'sr-1', deviceId: 'AWS-ED-001', deviceName: 'Weather Station Alpha', timestamp: '2026-08-03 09:20:00', temperatureC: 31.8, humidityPct: 82, rainfallMm: 12.5, windSpeedKmh: 14.2, windDirectionDeg: 180, pressureHpa: 1011.2, soilMoisturePct: 44.5, batteryPct: 94, status: 'NORMAL' },
  { id: 'sr-2', deviceId: 'WTR-RIV-004', deviceName: 'Main River Canal Level Gauge', timestamp: '2026-08-03 09:22:00', waterLevelCm: 185.0, flowRateLpm: 3400, batteryPct: 88, status: 'NORMAL' },
  { id: 'sr-3', deviceId: 'SOIL-SENS-102', deviceName: 'Peat Moisture B15', timestamp: '2026-08-03 09:18:00', soilMoisturePct: 22.1, soilPh: 4.8, temperatureC: 28.5, batteryPct: 22, status: 'ALERT' },
  { id: 'sr-4', deviceId: 'FUEL-GEN-002', deviceName: 'Mill Generator Fuel Sensor', timestamp: '2026-08-03 08:30:00', fuelLevelPct: 15.2, voltageV: 11.8, status: 'CRITICAL' },
];

export const mockTelemetryLogs: TelemetryLog[] = [
  { id: 'tl-1', assetCode: 'TTR-014', assetType: 'VEHICLE', speedKmh: 18.5, engineHoursHm: 3420.5, fuelConsumptionLph: 6.2, locationGps: '0.5081° N, 101.4430° E', timestamp: '2026-08-03 09:25:10', operationalState: 'WORKING' },
  { id: 'tl-2', assetCode: 'CAT-D6-088', assetType: 'HEAVY_EQUIPMENT', speedKmh: 3.2, engineHoursHm: 8910.0, fuelConsumptionLph: 18.4, locationGps: '0.4990° N, 101.4385° E', timestamp: '2026-08-03 09:24:55', operationalState: 'WORKING' },
  { id: 'tl-3', assetCode: 'GEN-MILL-02', assetType: 'GENERATOR', speedKmh: 0, engineHoursHm: 12400.2, fuelConsumptionLph: 24.0, locationGps: '0.5011° N, 101.4400° E', timestamp: '2026-08-03 09:20:00', operationalState: 'WORKING' },
  { id: 'tl-4', assetCode: 'DRONE-MAT-300', assetType: 'DRONE', speedKmh: 42.0, engineHoursHm: 145.8, fuelConsumptionLph: 0, locationGps: '0.5100° N, 101.4480° E', timestamp: '2026-08-03 09:26:00', operationalState: 'MOVING' },
];

export const mockWeatherStations: WeatherStationData[] = [
  { id: 'ws-1', stationCode: 'AWS-01', stationName: 'Riau Central Main AWS', locationEstate: 'Riau Central Estate', temperatureC: 31.5, humidityPct: 80, rainfall24hMm: 28.4, windSpeedKmh: 12.8, windDirection: 'South-East', solarRadiationWm2: 840, uvIndex: 8.2, evapotranspirationMm: 4.8, status: 'ONLINE', lastUpdated: '10 mins ago' },
  { id: 'ws-2', stationCode: 'AWS-02', stationName: 'Kalimantan North AWS', locationEstate: 'Kalimantan North Estate', temperatureC: 29.2, humidityPct: 88, rainfall24hMm: 64.2, windSpeedKmh: 18.1, windDirection: 'West', solarRadiationWm2: 620, uvIndex: 5.8, evapotranspirationMm: 3.2, status: 'ONLINE', lastUpdated: '5 mins ago' },
  { id: 'ws-3', stationCode: 'AWS-03', stationName: 'Sumatra South Hill AWS', locationEstate: 'Sumatra South Estate', temperatureC: 33.1, humidityPct: 74, rainfall24hMm: 0.0, windSpeedKmh: 8.5, windDirection: 'North-East', solarRadiationWm2: 950, uvIndex: 10.1, evapotranspirationMm: 5.9, status: 'ONLINE', lastUpdated: '2 mins ago' },
];

export const mockDrones: DroneItem[] = [
  { id: 'dr-1', droneCode: 'DRN-ALPHA-01', modelName: 'DJI Matrice 300 RTK + Zenmuse P1', pilotName: 'Budi Santoso', batteryPct: 96, cameraType: '45MP Full Frame RGB + Multispectral', firmware: 'v06.01.01', status: 'READY', flightHoursTotal: 188.5 },
  { id: 'dr-2', droneCode: 'DRN-BETA-02', modelName: 'DJI Mavic 3 Enterprise Multispectral', pilotName: 'Rian Hidayat', batteryPct: 42, cameraType: 'RGB + Green/Red/RedEdge/NIR', firmware: 'v01.00.08', status: 'CHARGING', flightHoursTotal: 92.0 },
  { id: 'dr-3', droneCode: 'DRN-GAMMA-03', modelName: 'WingtraOne GEN II VTOL Fixed Wing', pilotName: 'Eko Prasetyo', batteryPct: 100, cameraType: 'Sony RX1R II 42MP', firmware: 'v2.8.4', status: 'IN_FLIGHT', flightHoursTotal: 310.2 },
];

export const mockDroneMissions: DroneMission[] = [
  { id: 'dm-1', missionNo: 'MSN-2026-081', missionName: 'Block A10-A15 Crown Canopy & NDVI Survey', targetBlock: 'Division 01 (BLK A10-A15)', missionType: 'NDVI_HEALTH', plannedAltitudeMeters: 120, flightSpeedMps: 10.5, estimatedTimeMin: 35, waypointCount: 48, approvalStatus: 'COMPLETED', dateScheduled: '2026-08-02' },
  { id: 'dm-2', missionNo: 'MSN-2026-082', missionName: 'Peatland Canal Boundary & Flood Check', targetBlock: 'Division 02 Peat Zone', missionType: 'BOUNDARY_INSPECTION', plannedAltitudeMeters: 150, flightSpeedMps: 12.0, estimatedTimeMin: 45, waypointCount: 64, approvalStatus: 'IN_PROGRESS', dateScheduled: '2026-08-03' },
  { id: 'dm-3', missionNo: 'MSN-2026-083', missionName: 'AI Automated Tree Count & Replanting Plan', targetBlock: 'Immature Block B05', missionType: 'PALM_COUNT', plannedAltitudeMeters: 80, flightSpeedMps: 8.0, estimatedTimeMin: 28, waypointCount: 32, approvalStatus: 'APPROVED', dateScheduled: '2026-08-04' },
];

export const mockSatelliteImagery: SatelliteImageryItem[] = [
  { id: 'sat-1', provider: 'Sentinel-2', acquisitionDate: '2026-08-01', cloudCoverPct: 4.2, resolutionMeters: 10, targetEstate: 'Riau Central Estate', indexType: 'NDVI', thumbnailUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80', status: 'AVAILABLE' },
  { id: 'sat-2', provider: 'PlanetScope', acquisitionDate: '2026-08-02', cloudCoverPct: 1.8, resolutionMeters: 3, targetEstate: 'Riau Central Estate', indexType: 'RGB_TRUE_COLOR', thumbnailUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80', status: 'AVAILABLE' },
  { id: 'sat-3', provider: 'Landsat-9', acquisitionDate: '2026-07-28', cloudCoverPct: 8.5, resolutionMeters: 30, targetEstate: 'Kalimantan Estate', indexType: 'EVI', thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80', status: 'AVAILABLE' },
];

export const mockGisLayers: GisLayer[] = [
  { id: 'lyr-1', layerName: 'Estate & Division Boundaries', category: 'BOUNDARY', visible: true, opacity: 0.9, featuresCount: 14 },
  { id: 'lyr-2', layerName: 'Block Grid & Palm Plantings', category: 'BLOCK', visible: true, opacity: 0.8, featuresCount: 320 },
  { id: 'lyr-3', layerName: 'Road Network & Bridges', category: 'INFRASTRUCTURE', visible: true, opacity: 0.7, featuresCount: 85 },
  { id: 'lyr-4', layerName: 'Drainage Canals & Water Gates', category: 'INFRASTRUCTURE', visible: true, opacity: 0.7, featuresCount: 62 },
  { id: 'lyr-5', layerName: 'IoT Sensor Locations (Realtime)', category: 'SENSOR', visible: true, opacity: 1.0, featuresCount: 42 },
  { id: 'lyr-6', layerName: 'Harvest Yield Density Heatmap', category: 'HEATMAP', visible: false, opacity: 0.6, featuresCount: 1 },
  { id: 'lyr-7', layerName: '2m Topographic Elevation Contour', category: 'CONTOUR', visible: false, opacity: 0.5, featuresCount: 180 },
];

export const mockDigitalTwinObjects: DigitalTwinObject[] = [
  { id: 'dt-1', objectCode: 'COMP-01', objectName: 'PT Nusantara Palm Abadi (Holding)', objectType: 'COMPANY', statusColor: 'GREEN', metricsSummary: '5 Estates Active | 42,500 Ha | 1.2M Palms', locationBlock: 'Sumatra & Kaltim', lastSync: '1 min ago' },
  { id: 'dt-2', objectCode: 'EST-RIAU-01', objectName: 'Riau Central Estate', objectType: 'ESTATE', statusColor: 'GREEN', metricsSummary: '12,400 Ha | Yield 24.2 Ton/Ha | 3 AWS Active', locationBlock: 'Riau Zone', lastSync: 'Realtime' },
  { id: 'dt-3', objectCode: 'AF-01', objectName: 'Afdeling I - North Peatland', objectType: 'AFDELING', statusColor: 'YELLOW', metricsSummary: '1,200 Ha | Water Table: -45cm (Alert)', locationBlock: 'BLK A01 - A20', lastSync: '3 mins ago' },
  { id: 'dt-4', objectCode: 'BLK-A12', objectName: 'Block A12 (Tanam 2018)', objectType: 'BLOCK', statusColor: 'GREEN', metricsSummary: '32 Ha | 4,280 Palms | Harvest Today: 18.5 Ton', locationBlock: 'BLK-A12', lastSync: 'Realtime' },
  { id: 'dt-5', objectCode: 'MILL-01', objectName: 'Palm Oil Mill #1 (60 TPH)', objectType: 'MILL', statusColor: 'GREEN', metricsSummary: 'OER: 22.8% | KER: 5.1% | Gen #2 Online', locationBlock: 'Central Mill Yard', lastSync: 'Realtime' },
  { id: 'dt-6', objectCode: 'CANAL-MAIN-02', objectName: 'Primary Drainage Canal Line 2', objectType: 'CANAL', statusColor: 'RED', metricsSummary: 'Water Level 185cm (Flood Risk Threshold > 180cm)', locationBlock: 'Peat Division 2', lastSync: '2 mins ago' },
];

export const mockSmartEvents: SmartEventAlert[] = [
  { id: 'evt-1', eventNo: 'EVT-9901', eventType: 'FLOOD_ALERT', severity: 'CRITICAL', sourceDevice: 'WTR-RIV-004', locationEstate: 'Riau Central Estate (Div 02)', message: 'Canal water level exceeded critical threshold (185cm > 180cm). Immediate spillway gate opening recommended.', timestamp: '2026-08-03 09:15:22', acknowledged: false },
  { id: 'evt-2', eventNo: 'EVT-9898', eventType: 'LOW_BATTERY', severity: 'WARNING', sourceDevice: 'SOIL-SENS-102', locationEstate: 'Riau Central Estate (BLK B15)', message: 'Sensor solar battery drop to 22%. Maintenance team dispatch required for panel cleaning.', timestamp: '2026-08-03 08:40:10', acknowledged: true, assignedTo: 'Teknisi Slamet' },
  { id: 'evt-3', eventNo: 'EVT-9892', eventType: 'SENSOR_OFFLINE', severity: 'WARNING', sourceDevice: 'FUEL-GEN-002', locationEstate: 'Palm Oil Mill 01', message: 'No heartbeat ping received for > 45 minutes from Generator Fuel Sensor.', timestamp: '2026-08-03 08:00:00', acknowledged: true, assignedTo: 'Kaderi (Mill Mechanic)' },
];

export const mockAiPredictions: SensorAiPrediction[] = [
  { id: 'ai-1', predictionType: 'FLOOD_RISK', targetEntity: 'Div 02 Peatland Canal Zone', confidenceScorePercent: 94, recommendationText: 'Pre-drain Canal Spillway Gate #3 by 20cm before incoming 45mm rain expected at 14:00 WIB.', severityLevel: 'CRITICAL', createdAt: '2026-08-03 08:30:00' },
  { id: 'ai-2', predictionType: 'HARVEST_READINESS', targetEntity: 'Block A12 (32 Ha)', confidenceScorePercent: 88, recommendationText: 'Optimal ripeness window reached. AI vision satellite shows 92% loose fruit dropping rate. Schedule harvest team tomorrow.', severityLevel: 'INFO', createdAt: '2026-08-03 07:15:00' },
  { id: 'ai-3', predictionType: 'DEVICE_FAILURE', targetEntity: 'Caterpillar D6 Dozer (CAT-D6-088)', confidenceScorePercent: 81, recommendationText: 'Telemetry analysis detects high oil temperature anomaly. Recommend replacing hydraulic filter in 15 operating hours.', severityLevel: 'WARNING', createdAt: '2026-08-03 06:00:00' },
];
