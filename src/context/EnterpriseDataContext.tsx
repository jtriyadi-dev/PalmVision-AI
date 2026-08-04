import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LiveEvent {
  id: string;
  timestamp: string;
  module: 'harvest' | 'mill' | 'gis' | 'finance' | 'eam' | 'inventory' | 'master';
  moduleLabel: string;
  title: string;
  detail: string;
  severity: 'info' | 'success' | 'warning' | 'alert';
  actionLink?: {
    module: string;
    payload?: any;
    label: string;
  };
}

export interface LiveStats {
  totalHarvestTodayTon: number;
  millProcessingRateTonHr: number;
  avgOerPercentage: number;
  cpoPriceIdrKg: number;
  activeFleetCount: number;
  liveRevenueTodayIdr: number;
  activeAlertsCount: number;
}

interface EnterpriseDataContextType {
  activeModule: string;
  setActiveModule: (module: string) => void;
  targetPayload: any;
  navigateToModule: (moduleKey: string, payload?: any) => void;
  
  // Real-time state
  isRealtimeActive: boolean;
  setIsRealtimeActive: (active: boolean) => void;
  liveStats: LiveStats;
  liveEvents: LiveEvent[];
  addLiveEvent: (event: Omit<LiveEvent, 'id' | 'timestamp'>) => void;
  
  // Cross-module filter states
  selectedEstateId: string;
  setSelectedEstateId: (id: string) => void;
  selectedBlockCode: string;
  setSelectedBlockCode: (code: string) => void;
  
  // Quick notification toast
  latestToast: LiveEvent | null;
  dismissToast: () => void;
}

const initialStats: LiveStats = {
  totalHarvestTodayTon: 485.2,
  millProcessingRateTonHr: 58.5,
  avgOerPercentage: 23.8,
  cpoPriceIdrKg: 12450,
  activeFleetCount: 34,
  liveRevenueTodayIdr: 1425000000,
  activeAlertsCount: 3
};

const initialEvents: LiveEvent[] = [
  {
    id: 'evt-101',
    timestamp: '10:32:15',
    module: 'mill',
    moduleLabel: 'PKS TAPUNG HILIR',
    title: 'Timbangan Truk #TRK-8821 Selesai',
    detail: 'Netto TBS: 14,850 Kg | Gradasi Matang: 94.2% | Pengemudi: Gunawan',
    severity: 'success',
    actionLink: { module: 'harvest', label: 'Buka Tiket Panen' }
  },
  {
    id: 'evt-102',
    timestamp: '10:30:40',
    module: 'gis',
    moduleLabel: 'DRONE AI VISION',
    title: 'Deteksi Defisiensi Nitrogen Block B-04',
    detail: 'Analisis NDVI menunjukkan klorosis daun pada 42 pohon. Rekomendasi pemupukan Urea.',
    severity: 'warning',
    actionLink: { module: 'gis', payload: { blockCode: 'B-04' }, label: 'Lihat Peta GIS' }
  },
  {
    id: 'evt-103',
    timestamp: '10:28:10',
    module: 'finance',
    moduleLabel: 'CPO COMMERCIAL',
    title: 'Pembayaran Kontrak PT Wilmar Masuk',
    detail: 'Dana Masuk IDR 850.000.000 untuk Kontrak CPO #CTR-2026-089',
    severity: 'success',
    actionLink: { module: 'finance', label: 'Buka Keuangan' }
  },
  {
    id: 'evt-104',
    timestamp: '10:25:00',
    module: 'inventory',
    moduleLabel: 'GUDANG MATERIAL',
    title: 'Stok Pupuk NPK 13-6-27 Diberlakukan Outflow',
    detail: 'Pengeluaran 120 Sak ke Afdeling 2 untuk Rencana Pemupukan Dosis II',
    severity: 'info',
    actionLink: { module: 'inventory', label: 'Lihat Stok Inventory' }
  }
];

const EnterpriseDataContext = createContext<EnterpriseDataContextType | undefined>(undefined);

export const EnterpriseDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModuleState] = useState<string>('platform');
  const [targetPayload, setTargetPayload] = useState<any>(null);
  
  const [isRealtimeActive, setIsRealtimeActive] = useState<boolean>(true);
  const [liveStats, setLiveStats] = useState<LiveStats>(initialStats);
  const [liveEvents, setLiveEvents] = useState<LiveEvent[]>(initialEvents);
  const [latestToast, setLatestToast] = useState<LiveEvent | null>(initialEvents[0]);

  const [selectedEstateId, setSelectedEstateId] = useState<string>('est-01');
  const [selectedBlockCode, setSelectedBlockCode] = useState<string>('B-04');

  const navigateToModule = (moduleKey: string, payload?: any) => {
    setActiveModuleState(moduleKey);
    if (payload) {
      setTargetPayload(payload);
      if (payload.estateId) setSelectedEstateId(payload.estateId);
      if (payload.blockCode) setSelectedBlockCode(payload.blockCode);
    }
  };

  const addLiveEvent = (eventData: Omit<LiveEvent, 'id' | 'timestamp'>) => {
    const newEvt: LiveEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour12: false })
    };
    setLiveEvents(prev => [newEvt, ...prev.slice(0, 25)]);
    setLatestToast(newEvt);
  };

  const dismissToast = () => setLatestToast(null);

  // Real-time live data simulation pulse
  useEffect(() => {
    if (!isRealtimeActive) return;

    const sampleSimulatedEvents: Omit<LiveEvent, 'id' | 'timestamp'>[] = [
      {
        module: 'harvest',
        moduleLabel: 'PANEN AFDELING 3',
        title: 'Input TBS TPH #TPH-104 Mandor Budi',
        detail: 'Tandan Dipanen: 185 Tandan | Estimasi Tonase: 3.42 Ton (DxP Socfindo)',
        severity: 'info',
        actionLink: { module: 'harvest', label: 'Lihat Panen' }
      },
      {
        module: 'mill',
        moduleLabel: 'PKS SCALE IoT',
        title: 'Truk CPO #TRK-5510 Timbang Keluar',
        detail: 'Muatan CPO: 22,400 Kg ke Tangki Wilmar Dumai | Suhu Tangki: 52°C',
        severity: 'success',
        actionLink: { module: 'smart-plantation', label: 'Lihat Sensor PKS' }
      },
      {
        module: 'eam',
        moduleLabel: 'FLEET GPS TELEMATICS',
        title: 'Tractor Excavator #CAT-02 Servis Rutin',
        detail: 'Telemetri jam kerja capai 250 Jam. Work Order Pemeliharaan dibuat otomatis.',
        severity: 'warning',
        actionLink: { module: 'eam', label: 'Buka Manajemen Aset' }
      },
      {
        module: 'finance',
        moduleLabel: 'FINANCE REAL-TIME',
        title: 'Invoice TBS Eksternal Petani #INV-9921',
        detail: 'Pembayaran Rp 48.500.000 ke Koperasi Unit Desa Tani Makmur Selesai',
        severity: 'success',
        actionLink: { module: 'finance', label: 'Buka Keuangan' }
      },
      {
        module: 'gis',
        moduleLabel: 'SATELLITE NDVI MONITOR',
        title: 'Pembaruan Citra Satelit Block A-02',
        detail: 'Tingkat kerapatan kanopi 92.4%. Indeks Kelembaban Tanah Optimal.',
        severity: 'info',
        actionLink: { module: 'gis', payload: { blockCode: 'A-02' }, label: 'Buka Peta GIS' }
      }
    ];

    const interval = setInterval(() => {
      // Pick random simulated event
      const randomEvt = sampleSimulatedEvents[Math.floor(Math.random() * sampleSimulatedEvents.length)];
      
      // Mutate live stats slightly
      setLiveStats(prev => ({
        ...prev,
        totalHarvestTodayTon: Number((prev.totalHarvestTodayTon + (Math.random() * 2.5)).toFixed(1)),
        millProcessingRateTonHr: Number((55 + Math.random() * 8).toFixed(1)),
        liveRevenueTodayIdr: prev.liveRevenueTodayIdr + Math.round(Math.random() * 15000000),
        cpoPriceIdrKg: 12400 + Math.floor(Math.random() * 120)
      }));

      addLiveEvent(randomEvt);
    }, 6000);

    return () => clearInterval(interval);
  }, [isRealtimeActive]);

  return (
    <EnterpriseDataContext.Provider
      value={{
        activeModule,
        setActiveModule: setActiveModuleState,
        targetPayload,
        navigateToModule,
        isRealtimeActive,
        setIsRealtimeActive,
        liveStats,
        liveEvents,
        addLiveEvent,
        selectedEstateId,
        setSelectedEstateId,
        selectedBlockCode,
        setSelectedBlockCode,
        latestToast,
        dismissToast
      }}
    >
      {children}
    </EnterpriseDataContext.Provider>
  );
};

export const useEnterpriseData = () => {
  const context = useContext(EnterpriseDataContext);
  if (!context) {
    throw new Error('useEnterpriseData must be used within an EnterpriseDataProvider');
  }
  return context;
};
