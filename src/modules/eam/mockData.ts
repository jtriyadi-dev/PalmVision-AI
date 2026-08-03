import {
  AssetItem,
  AssetCategory,
  AssetLocation,
  AssetAssignment,
  AssetInspection,
  PreventivePlan,
  CorrectiveWorkOrder,
  MaintenanceCalendarEvent,
  WorkshopJobOrder,
  Mechanic,
  ServiceHistoryRecord,
  FleetVehicle,
  HeavyEquipment,
  EquipmentUtilizationLog,
  FuelTank,
  FuelTransaction,
  TyreRecord,
  BatteryRecord,
  SparePartUsage,
  AssetDepreciationRecord,
  AssetDisposal,
  GpsVehicleLog,
  AiPredictiveMaintenanceInsight,
} from './types';

export const INITIAL_ASSET_CATEGORIES: AssetCategory[] = [
  { id: 'cat-1', code: 'CAT-VEH', name: 'Vehicle', description: 'Kendaraan dinas, dump truck, water truck & pickup', defaultUsefulLifeYears: 8, assetCount: 42 },
  { id: 'cat-2', code: 'CAT-HEQ', name: 'Heavy Equipment', description: 'Excavator, bulldozer, wheel loader & grader', defaultUsefulLifeYears: 10, assetCount: 28 },
  { id: 'cat-3', code: 'CAT-MAC', name: 'Machine', description: 'Mesin pabrik kelapa sawit & sterilizer', defaultUsefulLifeYears: 15, assetCount: 35 },
  { id: 'cat-4', code: 'CAT-GEN', name: 'Generator', description: 'Genset utama & backup power estate', defaultUsefulLifeYears: 12, assetCount: 18 },
  { id: 'cat-5', code: 'CAT-PUM', name: 'Pump', description: 'Pompa air, pompa limbah & pompa hidrolik', defaultUsefulLifeYears: 7, assetCount: 24 },
  { id: 'cat-6', code: 'CAT-CMP', name: 'Compressor', description: 'Kompresor angin workshop & mill', defaultUsefulLifeYears: 8, assetCount: 12 },
  { id: 'cat-7', code: 'CAT-CHN', name: 'Chainsaw', description: 'Gergaji mesin potong kayu & peremajaan', defaultUsefulLifeYears: 4, assetCount: 30 },
  { id: 'cat-8', code: 'CAT-BRS', name: 'Brush Cutter', description: 'Mesin babat rumput gawangan', defaultUsefulLifeYears: 3, assetCount: 65 },
  { id: 'cat-9', code: 'CAT-SPR', name: 'Sprayer', description: 'Kepro knapsack & motorized power sprayer', defaultUsefulLifeYears: 3, assetCount: 90 },
  { id: 'cat-10', code: 'CAT-DRN', name: 'Drone', description: 'Drone survei NDVI & drone semprot pupuk', defaultUsefulLifeYears: 4, assetCount: 8 },
  { id: 'cat-11', code: 'CAT-GPS', name: 'GPS Device', description: 'GPS tracker kendaraan & alat ukur GIS', defaultUsefulLifeYears: 5, assetCount: 85 },
  { id: 'cat-12', code: 'CAT-WTH', name: 'Weather Station', description: 'Stasiun cuaca otomatis & curah hujan AWS', defaultUsefulLifeYears: 6, assetCount: 14 },
  { id: 'cat-13', code: 'CAT-ITE', name: 'IT Equipment', description: 'Server, laptop kantor & Weighbridge terminal', defaultUsefulLifeYears: 4, assetCount: 52 },
  { id: 'cat-14', code: 'CAT-OFC', name: 'Office Equipment', description: 'AC, printer & peralatan kantor estate', defaultUsefulLifeYears: 5, assetCount: 40 },
  { id: 'cat-15', code: 'CAT-BLD', name: 'Building', description: 'Kantor estate, workshop, perumahan & mill', defaultUsefulLifeYears: 25, assetCount: 22 },
  { id: 'cat-16', code: 'CAT-FUR', name: 'Furniture', description: 'Meja, kursi & lemari arsip', defaultUsefulLifeYears: 7, assetCount: 110 },
  { id: 'cat-17', code: 'CAT-ELE', name: 'Electrical Equipment', description: 'Transformator, panel listrik & UPS', defaultUsefulLifeYears: 10, assetCount: 19 },
  { id: 'cat-18', code: 'CAT-WKS', name: 'Workshop Equipment', description: 'Hydraulic lift, las, tyre changer & tools set', defaultUsefulLifeYears: 10, assetCount: 26 },
  { id: 'cat-19', code: 'CAT-OTH', name: 'Other', description: 'Peralatan pendukung lainnya', defaultUsefulLifeYears: 5, assetCount: 15 },
];

export const INITIAL_ASSET_LOCATIONS: AssetLocation[] = [
  { id: 'loc-1', company: 'PT NPL', estate: 'Riau Mill & Estate', division: 'Divisi 1', afdeling: 'Afd 01', block: 'B01', locationName: 'Central Workshop Kebun Riau', locationType: 'Workshop', gpsCoordinate: '0.5071° N, 101.4478° E', assignedAssetCount: 28 },
  { id: 'loc-2', company: 'PT NPL', estate: 'Riau Mill & Estate', division: 'Divisi 1', afdeling: 'Afd 02', block: 'B04', locationName: 'Gudang BBM Utama Riau', locationType: 'Warehouse', gpsCoordinate: '0.5112° N, 101.4510° E', assignedAssetCount: 12 },
  { id: 'loc-3', company: 'PT NPL', estate: 'Riau Mill & Estate', division: 'Divisi Mill', afdeling: 'PKS 01', block: 'M01', locationName: 'Pabrik Kelapa Sawit Riau (PKS-1)', locationType: 'Mill', gpsCoordinate: '0.5090° N, 101.4490° E', assignedAssetCount: 45 },
  { id: 'loc-4', company: 'PT NPL', estate: 'Jambi Estate', division: 'Divisi 2', afdeling: 'Afd 03', block: 'J12', locationName: 'Workshop Field Jambi', locationType: 'Workshop', gpsCoordinate: '-1.6101° S, 103.6131° E', assignedAssetCount: 18 },
  { id: 'loc-5', company: 'PT NPL', estate: 'Kalbar Estate', division: 'Divisi 3', afdeling: 'Afd 05', block: 'K08', locationName: 'Kantor Estate Kalbar', locationType: 'Office', gpsCoordinate: '-0.0263° S, 109.3425° E', assignedAssetCount: 15 },
];

export const INITIAL_ASSET_ITEMS: AssetItem[] = [
  {
    id: 'ast-101',
    assetCode: 'AST-EXC-001',
    barcode: 'BC-99018231',
    qrCode: 'QR-EXC001-NPL',
    rfidReady: true,
    rfidTag: 'RFID-9901-EXC',
    assetName: 'Excavator CAT 320D2 Heavy Duty',
    category: 'Heavy Equipment',
    brand: 'Caterpillar',
    model: '320D2',
    serialNumber: 'CAT320D2-RH9021',
    company: 'PT NPL',
    estate: 'Riau Mill & Estate',
    department: 'Civil & Fleet Dept',
    currentLocation: 'Central Workshop Kebun Riau',
    gpsCoordinate: '0.5071° N, 101.4478° E',
    purchaseDate: '2022-03-15',
    supplierName: 'PT Trakindo Utama',
    purchasePrice: 1850000000,
    usefulLifeYears: 10,
    residualValue: 250000000,
    warrantyStart: '2022-03-15',
    warrantyEnd: '2024-03-15',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1579412690850-bd41cd0af397?w=600&auto=format&fit=crop&q=80',
    manualUrl: 'https://manuals.cat.com/320d2.pdf',
    currentOperator: 'Budi Santoso',
    odometerKm: 0,
    hourMeterHours: 4280,
  },
  {
    id: 'ast-102',
    assetCode: 'AST-DT-004',
    barcode: 'BC-8812903',
    qrCode: 'QR-DT004-NPL',
    rfidReady: true,
    rfidTag: 'RFID-8812-DT',
    assetName: 'Dump Truck Mitsubishi Fuso FN527MS (6x4)',
    category: 'Vehicle',
    brand: 'Mitsubishi Fuso',
    model: 'FN527MS 220PS',
    serialNumber: 'MFT-FN527-77281',
    company: 'PT NPL',
    estate: 'Riau Mill & Estate',
    department: 'Transport TBS',
    currentLocation: 'Gudang BBM Utama Riau',
    gpsCoordinate: '0.5112° N, 101.4510° E',
    purchaseDate: '2021-08-10',
    supplierName: 'PT Dipo Star Finance / Krama Yudha',
    purchasePrice: 980000000,
    usefulLifeYears: 8,
    residualValue: 120000000,
    warrantyStart: '2021-08-10',
    warrantyEnd: '2023-08-10',
    status: 'In Maintenance',
    photoUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&auto=format&fit=crop&q=80',
    currentOperator: 'Rahmat Hidayat',
    odometerKm: 124500,
    hourMeterHours: 6120,
  },
  {
    id: 'ast-103',
    assetCode: 'AST-GEN-002',
    barcode: 'BC-7729102',
    qrCode: 'QR-GEN002-NPL',
    rfidReady: false,
    assetName: 'Genset Cummins 500 kVA Prime',
    category: 'Generator',
    brand: 'Cummins',
    model: 'C500D5e',
    serialNumber: 'CUM-500KVA-99023',
    company: 'PT NPL',
    estate: 'Riau Mill & Estate',
    department: 'Power Plant & Mill',
    currentLocation: 'Pabrik Kelapa Sawit Riau (PKS-1)',
    gpsCoordinate: '0.5090° N, 101.4490° E',
    purchaseDate: '2020-01-20',
    supplierName: 'PT Altrak 1978',
    purchasePrice: 750000000,
    usefulLifeYears: 12,
    residualValue: 80000000,
    warrantyStart: '2020-01-20',
    warrantyEnd: '2022-01-20',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    currentOperator: 'Tim Listrik PKS',
    hourMeterHours: 11200,
  },
  {
    id: 'ast-104',
    assetCode: 'AST-PU-008',
    barcode: 'BC-6638192',
    qrCode: 'QR-PU008-NPL',
    rfidReady: true,
    rfidTag: 'RFID-6638-PU',
    assetName: 'Toyota Hilux Single Cab 4x4 2.4 Diesel',
    category: 'Vehicle',
    brand: 'Toyota',
    model: 'Hilux 2.4 G 4x4',
    serialNumber: 'TOY-HLX-4x4-11827',
    company: 'PT NPL',
    estate: 'Jambi Estate',
    department: 'Field Supervision Afd 03',
    currentLocation: 'Workshop Field Jambi',
    gpsCoordinate: '-1.6101° S, 103.6131° E',
    purchaseDate: '2023-05-02',
    supplierName: 'PT Astra International Toyota',
    purchasePrice: 420000000,
    usefulLifeYears: 6,
    residualValue: 70000000,
    warrantyStart: '2023-05-02',
    warrantyEnd: '2026-05-02',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80',
    currentOperator: 'Asisten Afd 3 - Bambang S.',
    odometerKm: 48900,
  },
  {
    id: 'ast-105',
    assetCode: 'AST-DRN-001',
    barcode: 'BC-5529182',
    qrCode: 'QR-DRN001-NPL',
    rfidReady: false,
    assetName: 'DJI Agras T30 Spraying Drone',
    category: 'Drone',
    brand: 'DJI Enterprise',
    model: 'Agras T30',
    serialNumber: 'DJI-T30-88190',
    company: 'PT NPL',
    estate: 'Kalbar Estate',
    department: 'Agronomy Precision Dept',
    currentLocation: 'Kantor Estate Kalbar',
    gpsCoordinate: '-0.0263° S, 109.3425° E',
    purchaseDate: '2023-11-10',
    supplierName: 'PT Halo Robotics',
    purchasePrice: 240000000,
    usefulLifeYears: 4,
    residualValue: 30000000,
    warrantyStart: '2023-11-10',
    warrantyEnd: '2024-11-10',
    status: 'Active',
    photoUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop&q=80',
    currentOperator: 'Pilot Drone - Arya W.',
    hourMeterHours: 320,
  },
];

export const INITIAL_ASSET_ASSIGNMENTS: AssetAssignment[] = [
  { id: 'asg-1', assetId: 'ast-101', assetCode: 'AST-EXC-001', assetName: 'Excavator CAT 320D2', assignedToType: 'Employee', assigneeName: 'Budi Santoso (Operator Senior)', department: 'Civil & Heavy Equipment', estate: 'Riau Mill & Estate', assignmentType: 'Permanent', startDate: '2022-03-20', status: 'Active', approvalStatus: 'Approved', notes: 'Penugasan pembersihan parit & perbaikan jalan estate' },
  { id: 'asg-2', assetId: 'ast-102', assetCode: 'AST-DT-004', assetName: 'Dump Truck Mitsubishi Fuso', assignedToType: 'Team', assigneeName: 'Tim Angkut TBS Afd 01', department: 'Transport TBS', estate: 'Riau Mill & Estate', assignmentType: 'Permanent', startDate: '2021-08-15', status: 'Active', approvalStatus: 'Approved', notes: 'Transport TBS dari TPH ke PKS-1' },
  { id: 'asg-3', assetId: 'ast-104', assetCode: 'AST-PU-008', assetName: 'Toyota Hilux 4x4', assignedToType: 'Department', assigneeName: 'Pengawasan Lapangan Afd 3', department: 'Field Supervision', estate: 'Jambi Estate', assignmentType: 'Permanent', startDate: '2023-05-10', status: 'Active', approvalStatus: 'Approved', notes: 'Inspeksi gawangan & patroli keamanan' },
];

export const INITIAL_ASSET_INSPECTIONS: AssetInspection[] = [
  {
    id: 'insp-101',
    inspectionCode: 'INS-2026-0091',
    assetId: 'ast-101',
    assetCode: 'AST-EXC-001',
    assetName: 'Excavator CAT 320D2',
    inspectorName: 'Hendra Setiawan (Senior Mechanic)',
    inspectionDate: '2026-08-01',
    type: 'Routine',
    overallCondition: 'Good',
    checklist: [
      { id: 'ck-1', component: 'Oli Mesin & Filter', status: 'Pass', note: 'Level oli normal, penggantian 100 jam lagi' },
      { id: 'ck-2', component: 'Sistem Hidrolik & Selang', status: 'Warning', note: 'Bocoran halus pada hose boom cylinder' },
      { id: 'ck-3', component: 'Track Link & Rollers', status: 'Pass', note: 'Wear level 25%' },
      { id: 'ck-4', component: 'Bucket Teeth & Adapter', status: 'Pass', note: 'Pin bucket kencang' },
      { id: 'ck-5', component: 'Sistem Kelistrikan & Lampu Work', status: 'Pass', note: 'Semua switch & LED aktif' },
    ],
    findings: 'Ditemukan kebosoran minyak hidrolik pada fleksibel hose cylinder boom kanan. Perlu pergantian O-ring.',
    severity: 'Medium',
    recommendation: 'Jadwalkan pergantian O-ring hose boom saat PM 250 jam minggu depan.',
    signedBy: 'Hendra Setiawan',
    status: 'Approved',
  },
  {
    id: 'insp-102',
    inspectionCode: 'INS-2026-0092',
    assetId: 'ast-102',
    assetCode: 'AST-DT-004',
    assetName: 'Dump Truck Mitsubishi Fuso',
    inspectorName: 'Dedi Kurniawan (Inspector Safety)',
    inspectionDate: '2026-08-02',
    type: 'Pre-Operation',
    overallCondition: 'Critical',
    checklist: [
      { id: 'ck-10', component: 'Rem Utama & Air Brake', status: 'Fail', note: 'Kebocoran tekanan angin brake valve' },
      { id: 'ck-11', component: 'Kondisi Ban Roda Belakang', status: 'Warning', note: 'Ban gundul 80% pada roda kanan luar' },
      { id: 'ck-12', component: 'Mekanisme Dump Hidrolik', status: 'Pass', note: 'Pompa dump lancar' },
    ],
    findings: 'Brake valve bocor angin, bahaya rem blong saat muatan penuh TBS.',
    severity: 'Critical',
    recommendation: 'Stop Operasi Segera! Kirim unit ke Workshop Riau untuk penggantian Brake Valve Assembly.',
    signedBy: 'Dedi Kurniawan',
    status: 'Action Required',
  },
];

export const INITIAL_PREVENTIVE_PLANS: PreventivePlan[] = [
  {
    id: 'pm-1',
    planCode: 'PM-EXC-250H',
    planName: 'Servis Berkala 250 Engine Hour Excavator',
    assetId: 'ast-101',
    assetCode: 'AST-EXC-001',
    assetName: 'Excavator CAT 320D2',
    category: 'Heavy Equipment',
    triggerType: 'Hour Meter',
    intervalValue: 250,
    intervalUnit: 'Hours',
    lastServiceValue: 4000,
    nextServiceValue: 4250,
    responsibleTeam: 'Tim Alat Berat Workshop Riau',
    requiredParts: ['Filter Oli CAT 1R-1808', 'Filter Solar Primary 326-1644', 'Oli Engine SAE 15W-40 (25 L)'],
    estimatedCost: 3500000,
    estimatedDurationHours: 4,
    priority: 'High',
    status: 'Overdue',
  },
  {
    id: 'pm-2',
    planCode: 'PM-DT-10000KM',
    planName: 'Servis Regular 10.000 KM Dump Truck',
    assetId: 'ast-102',
    assetCode: 'AST-DT-004',
    assetName: 'Dump Truck Mitsubishi Fuso',
    category: 'Vehicle',
    triggerType: 'KM',
    intervalValue: 10000,
    intervalUnit: 'KM',
    lastServiceValue: 120000,
    nextServiceValue: 130000,
    responsibleTeam: 'Tim Armada Truck Workshop Riau',
    requiredParts: ['Filter Oli ME014833', 'Filter BBM ME056670', 'Oli Mesin Meditran SX 15W-40 (18 L)'],
    estimatedCost: 2800000,
    estimatedDurationHours: 3,
    priority: 'Medium',
    status: 'Due Soon',
  },
  {
    id: 'pm-3',
    planCode: 'PM-GEN-BULANAN',
    planName: 'PM Bulanan & Sample Oli Genset PKS',
    assetId: 'ast-103',
    assetCode: 'AST-GEN-002',
    assetName: 'Genset Cummins 500 kVA',
    category: 'Generator',
    triggerType: 'Date',
    intervalValue: 30,
    intervalUnit: 'Days',
    lastServiceValue: '2026-07-05',
    nextServiceValue: '2026-08-05',
    responsibleTeam: 'Tim Kelistrikan PKS-1',
    requiredParts: ['Test Kit Oli Cummins', 'Filter Udara Heavy Duty'],
    estimatedCost: 1500000,
    estimatedDurationHours: 2,
    priority: 'High',
    status: 'Active',
  },
];

export const INITIAL_CORRECTIVE_WOS: CorrectiveWorkOrder[] = [
  {
    id: 'cwo-1',
    woNumber: 'WO-2026-0801',
    assetId: 'ast-102',
    assetCode: 'AST-DT-004',
    assetName: 'Dump Truck Mitsubishi Fuso FN527MS',
    reportedDate: '2026-08-02 08:30',
    reportedBy: 'Dedi Kurniawan (Inspector Safety)',
    damageDescription: 'Rem angin terindikasi bocor pada Air Brake Valve utama & indikator tekanan rem drop below 5 bar.',
    rootCause: 'O-ring seal terpasang retak aus karena pasir jalan kebun & karat moisture.',
    actionTaken: 'Penggantian Repair Kit Brake Master Cylinder & Pengurasan Air Tank Reservoir.',
    assignedMechanic: 'Agus Subagyo (Mekanik Senior Rem & Chassis)',
    workshopName: 'Central Workshop Kebun Riau',
    status: 'In Progress',
    priority: 'Emergency',
    estimatedCost: 2200000,
    actualCost: 1850000,
    downtimeHours: 12,
  },
  {
    id: 'cwo-2',
    woNumber: 'WO-2026-0789',
    assetId: 'ast-101',
    assetCode: 'AST-EXC-001',
    assetName: 'Excavator CAT 320D2',
    reportedDate: '2026-07-28 14:15',
    reportedBy: 'Budi Santoso',
    damageDescription: 'Bocoran oli hidrolik pada joint fitting hose cylinder arm.',
    rootCause: 'Tekanan tinggi berulang saat memindahkan tunggul kayu tua.',
    actionTaken: 'Pressing hydraulic hose baru 3/4 inch double wire & refill oli hidrolik Tellus 68.',
    assignedMechanic: 'Surya Wijaya (Mekanik Hidrolik)',
    workshopName: 'Central Workshop Kebun Riau',
    status: 'Completed',
    priority: 'High',
    estimatedCost: 1800000,
    actualCost: 1750000,
    downtimeHours: 6,
    completionDate: '2026-07-29 10:00',
  },
];

export const INITIAL_MAINTENANCE_CALENDAR_EVENTS: MaintenanceCalendarEvent[] = [
  { id: 'cal-1', title: 'PM 250H Excavator CAT 320D2', assetCode: 'AST-EXC-001', type: 'Preventive', date: '2026-08-04', status: 'Scheduled', priority: 'High', assignedTo: 'Tim Alat Berat' },
  { id: 'cal-2', title: 'Repair Brake Valve Dump Truck', assetCode: 'AST-DT-004', type: 'Corrective', date: '2026-08-03', status: 'In Progress', priority: 'Emergency', assignedTo: 'Agus Subagyo' },
  { id: 'cal-3', title: 'PM Bulanan Genset 500kVA PKS', assetCode: 'AST-GEN-002', type: 'Preventive', date: '2026-08-05', status: 'Scheduled', priority: 'High', assignedTo: 'Tim Listrik PKS' },
  { id: 'cal-4', title: 'Inspeksi & Calibration Drone Spray T30', assetCode: 'AST-DRN-001', type: 'Inspection', date: '2026-08-07', status: 'Scheduled', priority: 'Medium', assignedTo: 'Pilot Arya' },
];

export const INITIAL_WORKSHOP_JOBS: WorkshopJobOrder[] = [
  {
    id: 'jo-1',
    jobOrderNumber: 'JO-2026-0044',
    assetId: 'ast-102',
    assetCode: 'AST-DT-004',
    assetName: 'Dump Truck Mitsubishi Fuso FN527MS',
    complaint: 'Rem angin ngempos, bocor tekanan angin, bunyi desis dibelakang kabin',
    priority: 'Emergency',
    leadMechanic: 'Agus Subagyo',
    assistantMechanics: ['Joko Raharjo', 'Eko Prasetyo'],
    scheduledDate: '2026-08-02',
    estimatedCompletion: '2026-08-03 17:00',
    status: 'In Progress',
    partsRequired: ['Brake Repair Kit Fuso ME-9901', 'Air Brake Hose High Pressure 2m'],
    laborCost: 450000,
    partsCost: 1400000,
    totalCost: 1850000,
  },
  {
    id: 'jo-2',
    jobOrderNumber: 'JO-2026-0045',
    assetId: 'ast-101',
    assetCode: 'AST-EXC-001',
    assetName: 'Excavator CAT 320D2',
    complaint: 'Overdue PM 250 jam meter + kebocoran O-ring fleksibel hose boom',
    priority: 'Urgent',
    leadMechanic: 'Surya Wijaya',
    assistantMechanics: ['Randi Kurnia'],
    scheduledDate: '2026-08-04',
    estimatedCompletion: '2026-08-04 15:00',
    status: 'Open',
    partsRequired: ['CAT Filter Kit 250H', 'O-Ring Hydraulic Kit', 'Oli Hyd Tellus ISO 68 (20L)'],
    laborCost: 600000,
    partsCost: 2900000,
    totalCost: 3500000,
  },
];

export const INITIAL_MECHANICS: Mechanic[] = [
  { id: 'mec-1', code: 'MEC-01', name: 'Agus Subagyo', specialty: 'General Mechanic', workshop: 'Central Workshop Kebun Riau', shift: 'Shift 1', activeJobs: 1, completedJobsMonth: 14, status: 'On Job' },
  { id: 'mec-2', code: 'MEC-02', name: 'Surya Wijaya', specialty: 'Hydraulics', workshop: 'Central Workshop Kebun Riau', shift: 'Shift 1', activeJobs: 0, completedJobsMonth: 18, status: 'Available' },
  { id: 'mec-3', code: 'MEC-03', name: 'Hendra Setiawan', specialty: 'Engine', workshop: 'Central Workshop Kebun Riau', shift: 'General Day', activeJobs: 0, completedJobsMonth: 21, status: 'Available' },
  { id: 'mec-4', code: 'MEC-04', name: 'Rudy Hartono', specialty: 'Electrical', workshop: 'Workshop Field Jambi', shift: 'Shift 1', activeJobs: 1, completedJobsMonth: 11, status: 'On Job' },
];

export const INITIAL_SERVICE_HISTORY: ServiceHistoryRecord[] = [
  { id: 'sh-1', assetId: 'ast-101', assetCode: 'AST-EXC-001', assetName: 'Excavator CAT 320D2', serviceDate: '2026-06-10', serviceType: 'Filter Replacement', workshopName: 'Central Workshop Kebun Riau', performedBy: 'Surya Wijaya', hourMeterHours: 4000, cost: 3200000, notes: 'Ganti filter oli, filter solar & pembersihan air cleaner' },
  { id: 'sh-2', assetId: 'ast-102', assetCode: 'AST-DT-004', assetName: 'Dump Truck Mitsubishi Fuso', serviceDate: '2026-05-18', serviceType: 'Oil Change', workshopName: 'Central Workshop Kebun Riau', performedBy: 'Agus Subagyo', odometerKm: 120000, cost: 2600000, notes: 'Ganti oli mesin 18L Meditran SX + greasing kaki-kaki' },
  { id: 'sh-3', assetId: 'ast-103', assetCode: 'AST-GEN-002', assetName: 'Genset Cummins 500 kVA', serviceDate: '2026-07-05', serviceType: 'General Inspection', workshopName: 'PKS Powerhouse', performedBy: 'Tim Listrik PKS', hourMeterHours: 11000, cost: 1200000, notes: 'Pemeriksaan radiator, tali kipas, alternator & battery charger' },
];

export const INITIAL_FLEET_VEHICLES: FleetVehicle[] = [
  { id: 'flt-1', assetId: 'ast-102', assetCode: 'AST-DT-004', plateNumber: 'BM 8812 YA', vehicleType: 'Truck 6x4', brandModel: 'Mitsubishi Fuso FN527MS', engineNumber: '6M60-T72910', chassisNumber: 'MFTFN527M-99120', driverName: 'Rahmat Hidayat', simType: 'SIM B2', stnkExpiry: '2027-08-10', kirExpiry: '2026-09-15', taxExpiry: '2026-11-01', insuranceStatus: 'Active', gpsDeviceCode: 'GPS-TRK-8812', status: 'In Workshop' },
  { id: 'flt-2', assetId: 'ast-104', assetCode: 'AST-PU-008', plateNumber: 'BH 1182 AB', vehicleType: 'Pickup 4x4', brandModel: 'Toyota Hilux 2.4 G', engineNumber: '2GD-FTV-88219', chassisNumber: 'MROEB3CD-00918', driverName: 'Bambang S.', simType: 'SIM A', stnkExpiry: '2028-05-02', kirExpiry: '2027-01-20', taxExpiry: '2027-05-02', insuranceStatus: 'Active', gpsDeviceCode: 'GPS-PKP-1182', status: 'Operational' },
];

export const INITIAL_HEAVY_EQUIPMENT: HeavyEquipment[] = [
  { id: 'heq-1', assetId: 'ast-101', assetCode: 'AST-EXC-001', equipmentCode: 'EXC-01-RIAU', equipmentType: 'Excavator', brandModel: 'Caterpillar 320D2', engineNumber: 'CAT-C7.1-9921', operatorName: 'Budi Santoso', workingHoursTotal: 4280, idleHoursTotal: 620, downtimeHoursTotal: 140, fuelConsumptionLiters: 18.5, productivityRate: '120 m³/jam parit', status: 'Active' },
];

export const INITIAL_EQUIPMENT_UTILIZATION: EquipmentUtilizationLog[] = [
  { id: 'util-1', date: '2026-08-01', equipmentCode: 'EXC-01-RIAU', equipmentName: 'Excavator CAT 320D2', operatorName: 'Budi Santoso', workingHours: 7.5, idleHours: 0.8, downtimeHours: 0, fuelUsedLiters: 138, workDoneUnit: '900 Meter Cuci Parit Primer', estateBlock: 'Block B01 Afd 01' },
  { id: 'util-2', date: '2026-08-02', equipmentCode: 'EXC-01-RIAU', equipmentName: 'Excavator CAT 320D2', operatorName: 'Budi Santoso', workingHours: 6.0, idleHours: 1.2, downtimeHours: 1.5, fuelUsedLiters: 110, workDoneUnit: '720 Meter Cuci Parit Sekunder', estateBlock: 'Block B02 Afd 01' },
];

export const INITIAL_FUEL_TANKS: FuelTank[] = [
  { id: 'ft-1', tankCode: 'TNK-SOLAR-01', tankName: 'Tangki Utama Solar B35 Kebun Riau', fuelType: 'Solar B35', capacityLiters: 32000, currentStockLiters: 18450, minStockAlertLiters: 5000, locationName: 'Gudang BBM Utama Riau', status: 'Normal' },
  { id: 'ft-2', tankCode: 'TNK-SOLAR-PKS', tankName: 'Tangki Daily Fuel PKS-1', fuelType: 'Solar B35', capacityLiters: 15000, currentStockLiters: 3200, minStockAlertLiters: 4000, locationName: 'Pabrik Kelapa Sawit Riau', status: 'Low Stock' },
];

export const INITIAL_FUEL_TRANSACTIONS: FuelTransaction[] = [
  { id: 'ftx-1', txCode: 'FTX-2026-091', txDate: '2026-08-02 07:15', tankId: 'ft-1', tankName: 'Tangki Utama Solar B35', assetId: 'ast-101', assetCode: 'AST-EXC-001', assetName: 'Excavator CAT 320D2', driverOperator: 'Budi Santoso', fuelType: 'Solar B35', quantityLiters: 120, pricePerLiter: 14500, totalCost: 1740000, hourMeterHours: 4280, dispenserOperator: 'Sutrisno (Petugas BBM)' },
  { id: 'ftx-2', txCode: 'FTX-2026-092', txDate: '2026-08-02 08:00', tankId: 'ft-1', tankName: 'Tangki Utama Solar B35', assetId: 'ast-102', assetCode: 'AST-DT-004', assetName: 'Dump Truck Mitsubishi Fuso', driverOperator: 'Rahmat Hidayat', fuelType: 'Solar B35', quantityLiters: 80, pricePerLiter: 14500, totalCost: 1160000, odometerKm: 124500, dispenserOperator: 'Sutrisno (Petugas BBM)' },
];

export const INITIAL_TYRE_RECORDS: TyreRecord[] = [
  { id: 'tyr-1', tyreCode: 'TYR-BS-1100R20-01', assetId: 'ast-102', assetCode: 'AST-DT-004', assetName: 'Dump Truck Mitsubishi Fuso', position: 'Rear Right Outer', brand: 'Bridgestone Mix Extra', serialNumber: 'BS-2024-9912', installedDate: '2025-02-10', wearLevelPercent: 82, pressurePsi: 110, status: 'Needs Replacement' },
  { id: 'tyr-2', tyreCode: 'TYR-BS-1100R20-02', assetId: 'ast-102', assetCode: 'AST-DT-004', assetName: 'Dump Truck Mitsubishi Fuso', position: 'Front Left', brand: 'Bridgestone R156', serialNumber: 'BS-2025-1102', installedDate: '2025-06-12', wearLevelPercent: 30, pressurePsi: 120, status: 'Good' },
];

export const INITIAL_BATTERY_RECORDS: BatteryRecord[] = [
  { id: 'bat-1', batteryCode: 'BAT-GS-N120-01', assetId: 'ast-101', assetCode: 'AST-EXC-001', assetName: 'Excavator CAT 320D2', brand: 'GS Astra Heavy Duty 120Ah', serialNumber: 'GS-HD-99212', voltage: '24V (Dual 12V)', installedDate: '2024-09-10', lastChargeCheck: '2026-07-20', status: 'Optimal' },
  { id: 'bat-2', batteryCode: 'BAT-YU-N100-02', assetId: 'ast-102', assetCode: 'AST-DT-004', assetName: 'Dump Truck Mitsubishi Fuso', brand: 'Yuasa Heavy Duty 100Ah', serialNumber: 'YU-100-4421', voltage: '24V (Dual 12V)', installedDate: '2023-11-15', lastChargeCheck: '2026-08-01', status: 'Low Voltage' },
];

export const INITIAL_SPARE_PART_USAGES: SparePartUsage[] = [
  { id: 'sp-1', usageCode: 'SPU-2026-081', workOrderId: 'cwo-1', assetCode: 'AST-DT-004', assetName: 'Dump Truck Mitsubishi Fuso', partCode: 'PRT-FLT-009', partName: 'Brake Repair Kit Master Cylinder Fuso', quantity: 1, unitCost: 1400000, totalCost: 1400000, warehouseSource: 'Gudang Sparepart Central Riau', usedDate: '2026-08-02' },
];

export const INITIAL_ASSET_DEPRECIATION: AssetDepreciationRecord[] = [
  { id: 'dep-1', assetId: 'ast-101', assetCode: 'AST-EXC-001', assetName: 'Excavator CAT 320D2', category: 'Heavy Equipment', purchaseCost: 1850000000, method: 'Straight Line', usefulLifeYears: 10, accumulatedDepreciation: 800000000, currentBookValue: 1050000000, annualDepreciation: 160000000 },
  { id: 'dep-2', assetId: 'ast-102', assetCode: 'AST-DT-004', assetName: 'Dump Truck Mitsubishi Fuso', category: 'Vehicle', purchaseCost: 980000000, method: 'Straight Line', usefulLifeYears: 8, accumulatedDepreciation: 612500000, currentBookValue: 367500000, annualDepreciation: 107500000 },
];

export const INITIAL_ASSET_DISPOSALS: AssetDisposal[] = [
  { id: 'dsp-1', disposalNumber: 'DSP-2025-004', assetId: 'ast-old-01', assetCode: 'AST-TRK-2015', assetName: 'Dump Truck Hino FM260TI (Tahun 2015)', method: 'Sell', disposalDate: '2025-11-15', originalCost: 820000000, bookValueAtDisposal: 50000000, saleAmount: 110000000, gainLoss: 60000000, approvedBy: 'General Manager Operational NPL', status: 'Completed' },
];

export const INITIAL_GPS_VEHICLE_LOGS: GpsVehicleLog[] = [
  { id: 'gps-1', vehicleId: 'flt-1', assetCode: 'AST-DT-004', plateNumber: 'BM 8812 YA', latitude: 0.5071, longitude: 101.4478, speedKmH: 0, heading: 'North', engineStatus: 'Stopped', lastUpdated: '2026-08-03 13:45', geofenceZone: 'Zone Central Workshop', todayKm: 42.5 },
  { id: 'gps-2', vehicleId: 'flt-2', assetCode: 'AST-PU-008', plateNumber: 'BH 1182 AB', latitude: -1.6101, longitude: 103.6131, speedKmH: 34, heading: 'East', engineStatus: 'Running', lastUpdated: '2026-08-03 13:50', geofenceZone: 'Afd 03 Block J12 Road', todayKm: 88.2 },
];

export const INITIAL_AI_PREDICTIVE_INSIGHTS: AiPredictiveMaintenanceInsight[] = [
  {
    id: 'ai-p1',
    assetId: 'ast-101',
    assetCode: 'AST-EXC-001',
    assetName: 'Excavator CAT 320D2',
    category: 'Heavy Equipment',
    failureRiskPercent: 78,
    predictedFailureComponent: 'Hydraulic Main Pump Pressure Drop & Relief Valve Wear',
    estimatedTimeToFailureDays: 14,
    recommendedAction: 'Lakukan pembersihan strainer hidrolik, ganti filter hidrolik return & periksa pressure relief valve pada pressure gauge 350 bar.',
    estimatedSavedCost: 45000000,
    urgency: 'High',
    confidenceScorePercent: 92,
  },
  {
    id: 'ai-p2',
    assetId: 'ast-102',
    assetCode: 'AST-DT-004',
    assetName: 'Dump Truck Mitsubishi Fuso',
    category: 'Vehicle',
    failureRiskPercent: 89,
    predictedFailureComponent: 'Brake System Pneumatic Leakage & Rear Wheel Bearing Wear',
    estimatedTimeToFailureDays: 2,
    recommendedAction: 'Ganti Air Brake Master Repair Kit segera sebelum unit memasuki rute tanjakan bukit terjal Afd 02.',
    estimatedSavedCost: 120000000,
    urgency: 'Critical',
    confidenceScorePercent: 96,
  },
];

// Aliases for clean component imports
export const mockAssetCategories = INITIAL_ASSET_CATEGORIES;
export const mockAssetLocations = INITIAL_ASSET_LOCATIONS;
export const mockAssets = INITIAL_ASSET_ITEMS;
export const mockFleetVehicles = INITIAL_FLEET_VEHICLES;
export const mockHeavyEquipment = INITIAL_HEAVY_EQUIPMENT;
export const mockEquipmentUtilizationLogs = INITIAL_EQUIPMENT_UTILIZATION;
export const mockPreventivePlans = INITIAL_PREVENTIVE_PLANS;
export const mockCorrectiveWorkOrders = INITIAL_CORRECTIVE_WOS;
export const mockMaintenanceCalendarEvents = INITIAL_MAINTENANCE_CALENDAR_EVENTS;
export const mockWorkshopJobOrders = INITIAL_WORKSHOP_JOBS;
export const mockMechanics = INITIAL_MECHANICS;
export const mockServiceHistoryRecords = INITIAL_SERVICE_HISTORY;
export const mockFuelTanks = INITIAL_FUEL_TANKS;
export const mockFuelTransactions = INITIAL_FUEL_TRANSACTIONS;
export const mockTyreRecords = INITIAL_TYRE_RECORDS;
export const mockBatteryRecords = INITIAL_BATTERY_RECORDS;
export const mockSparePartUsages = INITIAL_SPARE_PART_USAGES;
export const mockAssetDepreciationRecords = INITIAL_ASSET_DEPRECIATION;
export const mockAssetDisposals = INITIAL_ASSET_DISPOSALS;
export const mockGpsVehicleLogs = INITIAL_GPS_VEHICLE_LOGS;
export const mockAiPredictiveMaintenanceInsights = INITIAL_AI_PREDICTIVE_INSIGHTS;
export const mockAssetAssignments = INITIAL_ASSET_ASSIGNMENTS;
export const mockAssetInspections = INITIAL_ASSET_INSPECTIONS;

