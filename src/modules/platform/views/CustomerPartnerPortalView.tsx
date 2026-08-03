import React, { useState } from 'react';
import {
  Users,
  Building,
  Key,
  CreditCard,
  Headphones,
  Handshake,
  TrendingUp,
  Download,
  PlusCircle,
  CheckCircle2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const CustomerPartnerPortalView: React.FC = () => {
  const [activePortalTab, setActivePortalTab] = useState<'CUSTOMER' | 'PARTNER'>('CUSTOMER');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider">
              Self-Service & Ecosystem
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Customer & Partner Ecosystem Portals</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Dedicated self-service consoles for plantation estate clients, distributors, resellers and implementation partners.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActivePortalTab('CUSTOMER')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePortalTab === 'CUSTOMER'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Customer Self-Service
          </button>
          <button
            onClick={() => setActivePortalTab('PARTNER')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activePortalTab === 'PARTNER'
                ? 'bg-teal-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Partner & Reseller Portal
          </button>
        </div>
      </div>

      {activePortalTab === 'CUSTOMER' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">My Enterprise License</span>
                <Key className="h-5 w-5 text-amber-400" />
              </div>
              <div className="text-sm font-bold text-white">PVAI-ENTPRO-4412-2025-SOCFINDO</div>
              <div className="text-xs text-emerald-400 font-bold">50 / 50 Devices Active</div>
              <button className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition">
                Request Additional User Seats
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Billing & Subscriptions</span>
                <CreditCard className="h-5 w-5 text-indigo-400" />
              </div>
              <div className="text-sm font-bold text-white">ENTERPRISE_PRO Yearly Plan</div>
              <div className="text-xs text-slate-300">Renews on Jan 15, 2026 ($48,000/yr)</div>
              <button className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition">
                Download PDF Invoices
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">Support & Success Tickets</span>
                <Headphones className="h-5 w-5 text-teal-400" />
              </div>
              <div className="text-sm font-bold text-white">0 Open Tickets</div>
              <div className="text-xs text-slate-400">SLA Response: Under 15 minutes</div>
              <button className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition">
                Open Priority Support Ticket
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Handshake className="h-5 w-5 text-teal-400" />
                <h3 className="text-sm font-bold text-white">Certified Implementation Partners & Resellers</h3>
              </div>
              <span className="text-xs text-teal-300 font-bold">12 Active Regional Partners</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'PT Agritech Solutions Indonesia', role: 'Master Distributor (Sumatra)', clients: 14, commissionUsd: 42000 },
                { name: 'Sarawak Palm Tech Services Sdn Bhd', role: 'Regional Reseller (Malaysia)', clients: 8, commissionUsd: 28500 }
              ].map(partner => (
                <div key={partner.name} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                  <div className="text-sm font-bold text-white">{partner.name}</div>
                  <div className="text-xs text-teal-400 font-semibold">{partner.role}</div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>Manage Clients: <strong className="text-white">{partner.clients} Estates</strong></span>
                    <span>Commission Earned: <strong className="text-emerald-400">${partner.commissionUsd.toLocaleString()}</strong></span>
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
