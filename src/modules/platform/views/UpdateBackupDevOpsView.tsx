import React, { useState } from 'react';
import {
  RefreshCw,
  HardDrive,
  Database,
  Server,
  Download,
  Upload,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Play,
  RotateCcw
} from 'lucide-react';
import { mockBackupJobs } from '../mockData';
import { BackupJob } from '../types';

export const UpdateBackupDevOpsView: React.FC = () => {
  const [backups, setBackups] = useState<BackupJob[]>(mockBackupJobs);
  const [isBackingUp, setIsBackingUp] = useState(false);

  const handleTriggerBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      const newBackup: BackupJob = {
        id: `bk-${Date.now()}`,
        jobCode: `BKP-MANUAL-FULL-${new Date().toISOString().split('T')[0]}`,
        backupType: 'FULL',
        targetStorage: 'GCP_BUCKET',
        sizeMb: 42350,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        status: 'SUCCESS',
        encryptionType: 'AES_256_GCM'
      };
      setBackups([newBackup, ...backups]);
      setIsBackingUp(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950 to-slate-900 border border-cyan-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-wider">
              Disaster Recovery & Enterprise DevOps
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Update Center, Automated Backups & Disaster Recovery</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Zero-downtime hotfix deployments, encrypted incremental snapshots, point-in-time restore & failover verification.
          </p>
        </div>

        <button
          onClick={handleTriggerBackup}
          disabled={isBackingUp}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Database className={`h-4 w-4 ${isBackingUp ? 'animate-spin' : ''}`} />
          <span>{isBackingUp ? 'Executing AES-256 Snapshot...' : 'Trigger Full Global Backup'}</span>
        </button>
      </div>

      {/* Grid: Update Release Center & Backup Registry */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Release Update Center */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Cloud Deployment & Update Release Center</h3>
            </div>
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full font-mono text-[10px] font-bold">
              v1.0.0-PROMPT15-STABLE
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Cloud Run Container Release</span>
              <span className="text-xs text-cyan-300 font-mono">Image ID: sha256:e2w566m</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              PalmVision AI Commercial Multi-Tenant Platform Release with integrated License Engine, Billing, Customer Portal, White Label & System Health Monitoring.
            </p>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <span className="text-slate-400">Deployed: 2 mins ago</span>
              <button className="text-rose-400 hover:underline font-bold text-[11px]">Canary Rollback to v0.9.8</button>
            </div>
          </div>
        </div>

        {/* Backups & Point-in-Time Restore */}
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Database Snapshots & Point-in-Time Restore</h3>
            </div>
            <span className="text-xs text-slate-400">Encrypted GCM AES-256</span>
          </div>

          <div className="space-y-3">
            {backups.map(bk => (
              <div key={bk.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white">
                  <span className="font-mono text-cyan-300">{bk.jobCode}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px]">{bk.status}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Size: {(bk.sizeMb / 1024).toFixed(1)} GB</span>
                  <span>Target: {bk.targetStorage}</span>
                  <span>{bk.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
