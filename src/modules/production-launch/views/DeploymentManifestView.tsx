import React, { useState } from 'react';
import {
  Server,
  Terminal,
  Copy,
  Check,
  Download,
  Box,
  Layers,
  Cpu,
  ShieldCheck,
  Play
} from 'lucide-react';

export const DeploymentManifestView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'docker' | 'k8s' | 'installer'>('docker');
  const [copied, setCopied] = useState(false);

  const dockerComposeCode = `version: '3.8'

services:
  palmvision-app:
    image: palmvision/enterprise-app:v1.0.0
    container_name: palmvision_core
    restart: always
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - DATABASE_URL=postgresql://palm_admin:Secr3tP@ss!@postgres:5432/palmvision_prod
      - GEMINI_API_KEY=\${GEMINI_API_KEY}
      - JWT_SECRET=\${JWT_SECRET}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15-alpine
    container_name: palmvision_db
    restart: always
    environment:
      POSTGRES_USER: palm_admin
      POSTGRES_PASSWORD: Secr3tP@ss!
      POSTGRES_DB: palmvision_prod
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    container_name: palmvision_cache
    restart: always

volumes:
  postgres_data:`;

  const k8sManifestCode = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: palmvision-enterprise-deployment
  namespace: palmvision-prod
spec:
  replicas: 3
  selector:
    matchLabels:
      app: palmvision-core
  template:
    metadata:
      labels:
        app: palmvision-core
    spec:
      containers:
      - name: palmvision-app
        image: palmvision/enterprise-app:v1.0.0
        ports:
        - containerPort: 3000
        envFrom:
        - secretRef:
            name: palmvision-secrets
---
apiVersion: v1
kind: Service
metadata:
  name: palmvision-service
  namespace: palmvision-prod
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: palmvision-core`;

  const currentCode = activeTab === 'docker' ? dockerComposeCode : k8sManifestCode;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
              Deployment & On-Premise Installer
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Docker Compose, Kubernetes Helm & Air-Gapped Installer Wizard</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Production deployment manifests for Cloud Run, On-Premise Estate Servers, and Air-Gapped Kubernetes clusters.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('docker')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'docker' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Docker Compose
          </button>
          <button
            onClick={() => setActiveTab('k8s')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'k8s' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kubernetes YAML
          </button>
        </div>
      </div>

      {/* Manifest Viewer */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 font-mono text-xs text-indigo-400">
            <Terminal className="h-4 w-4" />
            <span>{activeTab === 'docker' ? 'docker-compose.yml' : 'deployment-k8s.yaml'}</span>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied Manifest!' : 'Copy File'}</span>
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
          {currentCode}
        </pre>
      </div>
    </div>
  );
};
