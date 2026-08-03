import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  Activity,
  Truck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import {
  GpsVehicleLog,
  AiPredictiveMaintenanceInsight,
} from '../types';

interface GpsAndAiPredictiveViewProps {
  gpsLogs?: GpsVehicleLog[];
  aiInsights?: AiPredictiveMaintenanceInsight[];
}

export const GpsAndAiPredictiveView: React.FC<GpsAndAiPredictiveViewProps> = ({
  gpsLogs = [],
  aiInsights = [],
}) => {
  const [activeTab, setActiveTab] = useState<'gps' | 'ai-predictive'>('ai-predictive');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-400" /> GPS Telematics & AI Predictive Maintenance Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pelacakan Posisi Kendaraan Realtime GIS, Status Engine Telemetry & Analisis Prediktif Kerusakan Komponen Unit.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('ai-predictive')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ai-predictive' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            AI Predictive Health ({aiInsights.length})
          </button>
          <button
            onClick={() => setActiveTab('gps')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'gps' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            GPS Telematics Map ({gpsLogs.length})
          </button>
        </div>
      </div>

      {/* Tab 1: AI Predictive Health */}
      {activeTab === 'ai-predictive' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-800/60 text-xs text-purple-200 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-purple-400 shrink-0" />
            <p>
              Model Machine Learning menganalisis kombinasi data vibration sensor, engine hour, frekuensi beban kerja, sampel oli, dan histori pembacaan sensor hidrolik untuk memprediksi potensi kegagalan komponen sebelum breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiInsights.map((insight) => (
              <div key={insight.id} className="p-5 rounded-2xl bg-slate-900 border border-purple-900/60 space-y-4 shadow-xl">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-purple-400">{insight.assetCode}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{insight.assetName}</h3>
                    <span className="text-xs text-slate-400">{insight.category}</span>
                  </div>

                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black inline-block ${
                        insight.urgency === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      Resiko {insight.failureRiskPercent}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-1">Confidence Score: {insight.confidenceScorePercent}%</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-amber-400 block">Komponen Berisiko Rusak:</span>
                  <p className="text-white font-bold">{insight.predictedFailureComponent}</p>
                  <span className="text-slate-400 block text-[11px]">
                    Perkiraan Waktu Kerusakan: <strong className="text-rose-400">{insight.estimatedTimeToFailureDays} Hari Lagi</strong>
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/50 space-y-1 text-xs">
                  <span className="font-bold text-purple-300 block">Rekomendasi AI Engine:</span>
                  <p className="text-slate-200">{insight.recommendedAction}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-400">Potensi Penghematan Breakdown:</span>
                  <span className="font-black text-emerald-400 text-sm">
                    Rp {insight.estimatedSavedCost.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: GPS Vehicle Logs */}
      {activeTab === 'gps' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-400" /> Peta Lokasi Telematika Kendaraan Realtime
            </h3>

            {/* Simulated Interactive Map Display */}
            <div className="h-64 rounded-xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              
              <div className="relative z-10 text-center space-y-2 p-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 shadow-lg">
                  <Activity className="h-6 w-6 animate-pulse" />
                </div>
                <h4 className="text-sm font-bold text-white">GIS GPS Tracking Live Simulator Active</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Sistem menerima ping telemetri dari 85 unit GPS kendaraan & alat berat di kebun Riau, Jambi & Kalbar.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {gpsLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-emerald-400">{log.plateNumber}</span>
                      <span className="text-xs font-bold text-white">Unit Ref: {log.assetCode}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.engineStatus === 'Running' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        Engine {log.engineStatus}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-1">
                      Zona Geofence: <strong className="text-slate-200">{log.geofenceZone}</strong> • Koordinat: {log.latitude}, {log.longitude}
                    </p>
                  </div>

                  <div className="text-right self-end sm:self-center">
                    <span className="font-bold text-cyan-400 text-xs block">{log.speedKmH} KM/H • Arah {log.heading}</span>
                    <span className="text-[10px] text-slate-400">Total KM Hari Ini: {log.todayKm} KM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
