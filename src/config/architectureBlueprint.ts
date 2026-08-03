export interface BlueprintSection {
  id: string;
  title: string;
  titleEn: string;
  subtitle: string;
  iconName: string;
  contentMarkdown: string;
  highlights: string[];
  specs?: Record<string, string>;
}

export const ARCHITECTURE_BLUEPRINTS: BlueprintSection[] = [
  {
    id: 'system-arch',
    title: '1. Arsitektur Aplikasi Enterprise',
    titleEn: '1. Enterprise Application Architecture',
    subtitle: 'Modular Monolith with Server-Side Gemini Proxy & Edge Field Sync',
    iconName: 'Server',
    highlights: [
      'Full-Stack Node.js Express Backend + React 19 SPA Frontend',
      'Server-Side API Proxy for AI Secrets & External Gateway Integration',
      'PWA & Offline First Local DB Engine (IndexedDB/RxDB) for Field Mandors',
      'Event-Driven Micro-Broker for Asynchronous Task Processing',
      'Containerized Deployment Ready (Docker / Kubernetes / Cloud Run)'
    ],
    specs: {
      'Frontend Framework': 'React 19 + TypeScript + Vite + Tailwind CSS v4',
      'Backend Runtime': 'Node.js Express + ESBuild (Bundled CJS / TSX)',
      'AI Integration': 'Google GenAI SDK (@google/genai) on Server Side',
      'State Management': 'React Context + Custom Reactive Hooks + Query Caching',
      'Offline Storage': 'IndexedDB with Service Worker Background Sync'
    },
    contentMarkdown: `
### Arsitektur Aplikasi PalmVision AI Enterprise

PalmVision AI menggunakan pendekatan **Modular Monolith Enterprise Architecture** yang dirancang untuk mendukung skalabilitas tinggi hingga puluhan perkebunan (estate), ribuan hektar, dan jutaan data transaksi harian panen, pemupukan, serta logistik.

#### Komponen Utama Arsitektur:
1. **Client Presentation Layer (React 19 SPA + PWA)**:
   - UI adaptif yang dirancang native responsive (Desktop, Tablet, Mobile Android/iOS).
   - Dilengkapi **PWA Service Worker** untuk penyimpanan offline data panen di lokasi perkebunan tanpa sinyal seluler.
   - Design System kustom dengan tema **Emerald Green, Forest Green, Gold, dan Charcoal Dark**.

2. **Server API Layer (Node.js Express Engine)**:
   - Menangani semua endpoint bisnis REST API v1.
   - Mengisolasi kunci rahasia API (seperti \`GEMINI_API_KEY\`) di sisi server agar aman dari paparan browser.
   - Mendukung **JWT Authentication**, **Rate Limiting**, dan **Request Validation**.

3. **AI Intelligence Engine (Gemini 3.6 Flash Server Proxy)**:
   - Layanan terpusat untuk pemrosesan teks, analisis regresi panen, deteksi penyakit daun sawit, dan ekstraksi OCR nota timbang/SPB.
   - Terintegrasi langsung dengan SDK \`@google/genai\` di sisi server.

4. **Offline Sync & Edge Gateway**:
   - Memungkinkan Mandor dan Supervisor di lapangan mencatat BKM (Buku Kegiatan Mandor) secara offline.
   - Ketika koneksi terhubung, data disinkronkan secara teratur (Background Sync API).
`
  },
  {
    id: 'project-structure',
    title: '2. Struktur Folder Proyek',
    titleEn: '2. Project Directory Structure',
    subtitle: 'Feature-Based & Clean Architecture Layering',
    iconName: 'FolderTree',
    highlights: [
      'Pemisahan strict antara UI Layer, Business Logic Layer, dan Data Access Layer',
      'Sistem Folder Berbasis Fitur (Feature-Based Directory)',
      'Modul terpisah untuk AI, License, Security, dan Storage Blueprint',
      'Konsistensi penamaan TypeScript Types & Interface'
    ],
    specs: {
      'Architecture Pattern': 'Clean Architecture + Feature-Based Modules',
      'Code Style': 'TypeScript Strict Mode, ES Modules, Modular Exports',
      'Component Design': 'Atomic Component Separation (Atoms, Molecules, Organisms)',
      'API Client': 'Centralized Fetch Wrapper with Interceptors & Error Boundaries'
    },
    contentMarkdown: `
\`\`\`
palmvision-ai/
├── .env.example                # Deklarasi Environment Variables
├── index.html                  # HTML Entrypoint dengan PWA Manifest
├── metadata.json               # App Metadata & Major Capabilities
├── package.json                # Dependencies & Node Scripts
├── server.ts                   # Express Backend Entrypoint & Vite Dev Integration
├── tsconfig.json               # Konfigurasi TypeScript Compiler
├── vite.config.ts              # Konfigurasi Build Vite & Tailwind CSS
└── src/
    ├── main.tsx                # Client Entrypoint (React DOM)
    ├── App.tsx                 # Root Component dengan Theme & State Provider
    ├── index.css               # Global Styling & Tailwind Imports
    ├── types.ts                # Master Type Declarations
    ├── config/                 # Konfigurasi Navigasi & Blueprints
    │   ├── navigation.ts       # 21 Navigation Items & Badges
    │   └── architectureBlueprint.ts # Blueprint Architectural Specs
    ├── components/             # Reusable UI & Blueprint Views
    │   ├── layout/             # Header, Sidebar, BottomNav, Shell
    │   ├── common/             # Design System Kit, AI Assistant, Modals
    │   ├── blueprints/         # Interactive Blueprint Explorer Views
    │   └── dashboard/          # Executive Foundation Wireframe Dashboard
    ├── modules/                # Business Domain Modules (Prompt 2 Ready)
    │   ├── plantation/         # Hierarchy Companies, Estates, Blocks
    │   ├── harvest/            # Panen TBS, BJR, Penalty System
    │   ├── field/              # Kegiatan Kebun, Pemupukan, Tunas
    │   ├── inventory/          # Stok Pupuk, Pestisida, Alat
    │   ├── finance/            # Cost/Ha, Budgeting, ALB Control
    │   ├── hr/                 # Mandor Attendance, BKM Pay
    │   ├── gis/                # Maps, Block Polygons, Satellite
    │   └── license/            # Product Key & HWID Activation
    ├── services/               # API Clients & Server Communication
    │   ├── aiService.ts        # Gemini AI Proxy Client
    │   ├── licenseService.ts   # License Validator & Serial Generator
    │   └── orgService.ts       # Plantation Hierarchy Data Provider
    ├── hooks/                  # Custom React Hooks (Theme, Context, Sync)
    └── utils/                  # Helper Functions, Formatting & Calculations
\`\`\`
`
  },
  {
    id: 'database-blueprint',
    title: '3. Blueprint Database Enterprise',
    titleEn: '3. Enterprise Database Architecture Blueprint',
    subtitle: 'Modular Schema Blueprint for Master, Transactions, Logs & Analytics',
    iconName: 'Database',
    highlights: [
      'Modular Schema: Master, Transaction, Analytics, AI, Security, Audit & License',
      'Dukungan Relasi Multi-Company hingga Sub-Blok (1:N Hierarchy)',
      'Relational Firestore / PostgreSQL Schema Ready',
      'Time-Series Indexing untuk Data Curah Hujan, Timbangan TBS, dan Pemakaian Solar'
    ],
    specs: {
      'Database Types': 'Relational (Cloud SQL / PostgreSQL) & Firestore Document Store',
      'Partition Strategy': 'Partitioning by Estate ID & Operational Year/Month',
      'Indexing': 'Composite Indexes on (company_id, estate_id, block_id, harvest_date)',
      'Audit Trail': 'Automatic row-level versioning & soft deletion'
    },
    contentMarkdown: `
### Blueprint Skema Database Enterprise PalmVision AI

Skema database dirancang modular dengan pemisahan wilayah tanggung jawab (Separation of Concerns) untuk memastikan kestabilan dan kemudahan pemeliharaan data.

#### Grouping Tabel & Koleksi:

1. **Master Domain (\`master_\`)**:
   - \`master_companies\`: Profil Holding / Perusahaan
   - \`master_estates\`: Daftar Kebun / Estate (Nama, Hektar, Manager)
   - \`master_divisions\`: Divisi Kebun
   - \`master_afdelings\`: Afdeling Kebun
   - \`master_blocks\`: Blok Tanam (Kode, Hektar, Tahun Tanam, SPH, Varieties)
   - \`master_employees\`: Karyawan, Mandor, Pemanen, Driver, Operator Heavy Equipment
   - \`master_items\`: Bahan Pupuk, Agrokimia, Sparepart, Alat Panen

2. **Transaction Domain (\`tx_\`)**:
   - \`tx_harvest_header\` & \`tx_harvest_detail\`: Catatan Hasil Panen TBS (Janjang, Kg, Matang, Mentah, Lewat Matang, Gagang Panjang)
   - \`tx_spb_delivery\`: Surat Pengantar Buah ke Pabrik Kelapa Sawit (PKS)
   - \`tx_weighbridge\`: Nota Timbangan TBS PKS (Gross, Tare, Netto, Refraksi)
   - \`tx_field_activities\`: Kegiatan Tunas, Pemupukan, Pemeliharaan Jalan, Semprot
   - \`tx_fuel_distribution\`: Catatan Pengisian BBM Solar Truk & Alat Berat
   - \`tx_bkm_attendance\`: Buku Kegiatan Mandor & Presensi Harian

3. **AI & Analytics Domain (\`ai_\`)**:
   - \`ai_yield_forecasts\`: Prediksi Tonase Hasil Panen per Blok (3 bulan / 6 bulan)
   - \`ai_disease_detections\`: Log Hasil Analisis Visual Penyakit Daun / Ganoderma
   - \`ai_anomaly_alerts\`: Terdeteksinya Anomali Pemakaian Solar / BJR Panen Drop

4. **License & Security Domain (\`sys_\`)**:
   - \`sys_licenses\`: License Key, Hardware Binding Hash, Expiry Date, Tier
   - \`sys_audit_logs\`: Log Akses & Perubahan Data Kritis
   - \`sys_user_roles\`: Hak Akses RBAC & Matrix Permission
`
  },
  {
    id: 'navigation-structure',
    title: '4. Struktur Navigasi Aplikasi',
    titleEn: '4. Application Navigation Hierarchy',
    subtitle: 'Comprehensive 21-Module Enterprise Menu Hierarchy',
    iconName: 'Compass',
    highlights: [
      '21 Modul Utama mencakup Seluruh Rantai Operasional Perkebunan',
      'Pengelompokan Kategoris: Core, Operations, Resources, Intelligence, System',
      'Indikator Badges & Counter Notifikasi Real-time',
      'Akses Terkontrol berdasarkan Role User (RBAC Integration)'
    ],
    specs: {
      'Total Modules': '21 Dedicated Functional Areas',
      'Top Navigation': 'Context Switcher (Company -> Estate -> Division -> Afdeling -> Block)',
      'Sidebar Design': 'Expandable Categories, Search Filter, Collapse Mode for Tablets',
      'Mobile Bar': 'Quick Action Bottom Navigation with Floating Assistant Trigger'
    },
    contentMarkdown: `
 Navigasi PalmVision AI dibagi secara terstruktur:

- **Core**: Dashboard Enterprise, Plantation Hierarchy, GIS & Spatial Mapping.
- **Operations**: Harvest (Panen TBS), Field Activity (Kegiatan Kebun), Transport & Delivery (SPB), Fuel & BBM Control, Workshop & Bengkel.
- **Resources**: Inventory & Stock, Warehouse Gudang, HR & Ketenagakerjaan, Asset Management, Procurement & PR/PO, Supplier & Vendor.
- **Intelligence**: AI Center & Assistant, Analytics & Yield BI, Executive Reports.
- **System**: Design System Kit, Arsitektur & Blueprint, License & Activation, Settings & Security, Help & Docs.
`
  },
  {
    id: 'design-system',
    title: '5. Design System Enterprise',
    titleEn: '5. Enterprise Design System Specification',
    subtitle: 'Modern Luxury Aesthetic with Emerald Green, Gold & Charcoal Dark Mode',
    iconName: 'Palette',
    highlights: [
      'Palette Warna Domain Sawit: Emerald Green (#059669), Dark Forest (#064E3B), Gold (#D97706)',
      'Dual Mode Sempurna: Clean Light Gray (#F9FAFB) & Charcoal Dark (#111827)',
      'Typographic Harmony: Plus Jakarta Sans / Inter dengan Mathematical Step Scale 1.25',
      'Perhitungan Nested Radius: Inner Radius = Outer Radius - Padding',
      'Anti-Slop Design Guidelines: Bebas dari Templat Generic SaaS'
    ],
    specs: {
      'Primary Color': 'Emerald Green (#059669 / #10B981)',
      'Secondary Color': 'Dark Forest Green (#064E3B / #022C22)',
      'Accent Color': 'Gold Accent (#D97706 / #F59E0B)',
      'Background Dark': 'Charcoal Slate (#0B0F17 & #111827)',
      'Typography': 'Plus Jakarta Sans & Inter'
    },
    contentMarkdown: `
Design system dirancang untuk memberikan kenyamanan penggunaan tingkat tinggi bagi Manajer Kebun maupun Direksi, baik di kantor ber-AC maupun saat dipantau di lapangan dengan sinar matahari kuat.
`
  },
  {
    id: 'responsive-strategy',
    title: '6. Responsive Layout Strategy',
    titleEn: '6. Responsive & Mobile Adaptive Layout Strategy',
    subtitle: 'Seamless Experience Across Desktop, Laptop, Tablet, and Mobile Android/iOS',
    iconName: 'Smartphone',
    highlights: [
      'Desktop (>1280px): Sidebar Expand dengan Context Bar Lengkap',
      'Tablet (768px - 1024px): Collapsible Icon Sidebar dengan Touch Drawer',
      'Mobile (<768px): Bottom Navigation, Floating Speed Dial & Touch Gestures',
      'Touch Target Minimum 44px untuk Penggunaan di Lapangan'
    ],
    specs: {
      'Desktop Layout': 'Expanded Sidebar + Sticky Topbar + Dynamic Content Grid',
      'Tablet Layout': 'Collapsed Mini Sidebar + Slide-over Drawer Menu',
      'Mobile Layout': 'Fixed Bottom Navigation + Header Context Selector + Floating AI Button',
      'Data Tables': 'Responsive Stack Cards on Mobile & Horizontal Scroll with Sticky Headers on Desktop'
    },
    contentMarkdown: `
Seluruh modul dirancang menggunakan pola **Adaptive Responsive Design** sehingga tidak ada fitur yang terpotong atau hilang ketika diakses oleh Mandor di smartphone Android saat berada di kebun.
`
  },
  {
    id: 'ai-architecture',
    title: '7. AI Architecture Blueprint',
    titleEn: '7. Modular AI Architecture Blueprint',
    subtitle: 'Server-Side Gemini 3.6 Engine for Yield Prediction, Anomaly Detection & Vision',
    iconName: 'BrainCircuit',
    highlights: [
      'Pemrosesan AI terisolasi di Server-Side Express Proxy (/api/v1/ai/)',
      'Model Utama: Gemini 3.6 Flash untuk Respons Cepat & Analisis Agronomi',
      'Sub-Layanan AI: AI Chat, AI Yield Forecast, AI Disease Detection, AI Financial Anomaly, AI OCR SPB',
      'Mendukung Cache Hasil AI untuk Efisiensi & Respons Instan'
    ],
    specs: {
      'Core LLM': 'Gemini 3.6 Flash via @google/genai SDK',
      'Response Time': '< 1.2 detik untuk Query Teks, < 2.5 detik untuk Analysis Complex',
      'Vision Capability': 'Pemeriksaan Kesehatan Pelepah & Buah Matang/Mentah dari Foto HP',
      'Security': 'API Keys aman di Environment Variables Server'
    },
    contentMarkdown: `
Arsitektur AI PalmVision AI dirancang modular di mana setiap komponen bisnis dapat memanfaatkan layanan AI melalui API terpusat.
`
  },
  {
    id: 'license-architecture',
    title: '8. Arsitektur Manajemen Lisensi',
    titleEn: '8. Commercial License Architecture Blueprint',
    subtitle: 'Enterprise Serial Key Verification, HWID Binding & Offline Grace Period',
    iconName: 'ShieldCheck',
    highlights: [
      'Aktivasi Produk via Serial Key & Format Kunci Terenkripsi (PVAI-ENT-XXXX)',
      'Hardware Binding Fingerprint (HWID) untuk Mencegah Penggandaan Ilegal',
      'Offline Grace Period 14 Hari Tanpa Koneksi Server Aktivasi',
      'Sistem White-Label & Multi-Tier (SaaS vs On-Premise Enterprise)'
    ],
    specs: {
      'Key Structure': 'PVAI-[TIER]-[CUSTOMER_HASH]-[EXPIRE_TIMESTAMP]-[SIGNATURE]',
      'HWID Parameters': 'CPU Serial + MAC Address Hash + Disk UUID',
      'Grace Period': '14 Hari Mode Offline dengan Notifikasi Progresif',
      'Renewal Workflow': 'Digital Key Renewal via Admin Activation Portal'
    },
    contentMarkdown: `
Arsitektur Lisensi memastikan PalmVision AI dapat dijual sebagai produk komersial bernilai tinggi bagi Holding Perkebunan maupun Kebun Plasma dengan garansi keamanan lisensi.
`
  },
  {
    id: 'security-architecture',
    title: '9. Security Architecture & Audit Trail',
    titleEn: '9. Enterprise Security Architecture',
    subtitle: 'JWT Authentication, RBAC Permissions, CSRF/XSS Shields & Audit Logging',
    iconName: 'Lock',
    highlights: [
      'JWT Authentication dengan Access Token (15m) & Refresh Token (7d)',
      'Role-Based Access Control (RBAC) dengan 17 Permukiman Role Hirarki',
      'Audit Trail Lengkap mencakup IP Address, User Agent, dan Delta Perubahan Data',
      'Proteksi CSRF, XSS, Rate Limiting & Enkripsi AES-256 Data At Rest'
    ],
    specs: {
      'Token Mechanism': 'Dual JWT Access & Refresh Token in HTTP-Only Cookies',
      'RBAC Matrix': '17 Predefined Roles with Granular Permission Flags',
      'Rate Limiting': '100 requests / minute per IP on Public Endpoints',
      'Audit Logging': 'Immutable Audit Logs for all Insert/Update/Delete operations'
    },
    contentMarkdown: `
Sistem Keamanan tingkat enterprise untuk menjaga data produksi, keuangan, dan aset perkebunan dari akses tidak sah.
`
  },
  {
    id: 'api-architecture',
    title: '10. API Architecture Standard',
    titleEn: '10. RESTful API Architecture Specification',
    subtitle: 'Standardized Response Envelope, Pagination, Versioning & Validation',
    iconName: 'Code2',
    highlights: [
      'API Versioning Terstruktur (/api/v1/)',
      'Standardized JSON Envelope (status, data, message, meta, errors)',
      'Mendukung Cursor-Based & Offset-Based Pagination',
      'Validasi Schema Input Otomatis & Error Handler Terpusat'
    ],
    specs: {
      'Protocol': 'RESTful HTTP/2 JSON',
      'Base Path': '/api/v1/',
      'Error Format': 'RFC 7807 Problem Details Standard',
      'Documentation': 'OpenAPI 3.0 / Swagger Spec Ready'
    },
    contentMarkdown: `
Seluruh komunikasi antara Frontend, Mobile Client, dan Backend menggunakan standar REST API v1.
`
  },
  {
    id: 'coding-standard',
    title: '11. Standard Koding & Clean Architecture',
    titleEn: '11. Software Engineering & Coding Standard',
    subtitle: 'SOLID Principles, Atomic Design, Type Safety & Maintainability',
    iconName: 'FileCode',
    highlights: [
      'Prinsip SOLID (Single Responsibility, Open-Closed, Liskov, Interface Segregation, Dependency Inversion)',
      'TypeScript Strict Mode tanpa penggunaan `any` sembarangan',
      'Atomic Design Component Pattern (Atoms -> Molecules -> Organisms)',
      'Pola Custom Hooks untuk Memisahkan UI dan Logika Bisnis'
    ],
    specs: {
      'Language': 'TypeScript 5.8 Strict Mode',
      'Component Pattern': 'Functional Components with React Hooks',
      'Testing Ready': 'Jest / Vitest + React Testing Library Ready',
      'Code Formatting': 'ESLint + Prettier Rules Compliance'
    },
    contentMarkdown: `
Aturan koding yang ketat untuk memastikan codebase tetap bersih, efisien, dan mudah dikembangkan oleh tim developer besar.
`
  },
  {
    id: 'roadmap-prompt2',
    title: '12. Roadmap Implementasi Prompt 2',
    titleEn: '12. Prompt 2 Implementation Roadmap',
    subtitle: 'Phased Rollout Plan for Full Operational Plantation Modules',
    iconName: 'Milestone',
    highlights: [
      'Fase 1: Modul Operasional Utama (Panen TBS, BJR, SPB & Kegiatan Kebun)',
      'Fase 2: Logistik & Sumber Daya (Inventory, Warehouse, BBM Fuel, Heavy Fleet)',
      'Fase 3: SDM & Keuangan (Mandor BKM, Payroll, Cost/Ha & Executive Analytics)',
      'Fase 4: Spatial GIS & AI Integration Full Suite'
    ],
    specs: {
      'Current State': 'Prompt 1 Complete (Foundations, Architecture & UI Shell)',
      'Next Step': 'Prompt 2 (Full Business Modules Implementation)',
      'Delivery Target': 'Production-Ready Palm Oil ERP System'
    },
    contentMarkdown: `
Roadmap terencana untuk pengembangan modul-modul bisnis operasional perkebunan sawit pada tahap selanjutnya.
`
  }
];
