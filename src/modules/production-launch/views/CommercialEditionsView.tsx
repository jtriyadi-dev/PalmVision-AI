import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sliders,
  Sparkles,
  Check,
  Tag
} from 'lucide-react';
import { mockCommercialEditions } from '../mockData';
import { CommercialEdition } from '../types';

export const CommercialEditionsView: React.FC = () => {
  const [editions] = useState<CommercialEdition[]>(mockCommercialEditions);
  const [activeTier, setActiveTier] = useState<string>('ENTERPRISE');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              Commercial Tiers & License Feature Matrix
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">PalmVision AI v1.0 Commercial Product Tiers</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Select product tier configurations managed via cryptographic feature flags and multi-tenant license entitlement.
          </p>
        </div>
      </div>

      {/* Editions Pricing & Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {editions.map(ed => (
          <div
            key={ed.id}
            onClick={() => setActiveTier(ed.code)}
            className={`p-5 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-4 relative overflow-hidden ${
              activeTier === ed.code
                ? 'bg-gradient-to-b from-slate-800 to-emerald-950/80 border-emerald-500 shadow-2xl ring-2 ring-emerald-500/50'
                : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
            }`}
          >
            {activeTier === ed.code && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-extrabold text-[9px] uppercase px-3 py-1 rounded-bl-xl tracking-wider">
                Active License
              </div>
            )}

            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded bg-slate-900 text-emerald-300 font-mono text-[10px] font-bold">
                {ed.code}
              </span>
              <h3 className="text-sm font-extrabold text-white">{ed.name}</h3>
              <div className="pt-2 border-t border-slate-700/80">
                <span className="text-2xl font-black text-white">
                  {ed.monthlyPriceUsd === 0 ? 'Free Open' : `$${ed.monthlyPriceUsd.toLocaleString()}`}
                </span>
                <span className="text-xs text-slate-400"> / month</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Hectares: <strong>{ed.maxHectares}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>User Limit: <strong>{ed.maxUsers}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Modules: <strong>{ed.includedModulesCount} Modules</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className={`h-4 w-4 shrink-0 ${ed.customBrandingAllowed ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span>White-Label Branding: <strong>{ed.customBrandingAllowed ? 'Yes' : 'No'}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <Check className={`h-4 w-4 shrink-0 ${ed.onPremiseDeploymentAllowed ? 'text-emerald-400' : 'text-slate-600'}`} />
                <span>Air-Gapped On-Prem: <strong>{ed.onPremiseDeploymentAllowed ? 'Supported' : 'No'}</strong></span>
              </li>
            </ul>

            <button
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                activeTier === ed.code
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  : 'bg-slate-700 hover:bg-slate-600 text-white'
              }`}
            >
              {activeTier === ed.code ? 'Current Tier Selected' : 'Select Tier'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
