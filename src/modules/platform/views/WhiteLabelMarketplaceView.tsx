import React, { useState } from 'react';
import {
  Palette,
  Store,
  Sliders,
  Upload,
  CheckCircle2,
  Download,
  Star,
  ExternalLink,
  Code,
  Globe,
  Radio,
  Zap,
  Plus
} from 'lucide-react';
import { mockMarketplaceAddons } from '../mockData';

export const WhiteLabelMarketplaceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'WHITE_LABEL' | 'MARKETPLACE' | 'WEBHOOKS'>('WHITE_LABEL');
  const [productName, setProductName] = useState('PalmVision AI Enterprise');
  const [accentColor, setAccentColor] = useState('#10b981');
  const [customDomain, setCustomDomain] = useState('smart-estate.socfindo.co.id');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider">
              Branding & Ecosystem Extensions
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">White Label Customization & App Marketplace</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Customize corporate branding, themes, subdomains, and install 3rd-party ERP connectors or AI models.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setActiveTab('WHITE_LABEL')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'WHITE_LABEL' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            White Label Setup
          </button>
          <button
            onClick={() => setActiveTab('MARKETPLACE')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'MARKETPLACE' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Add-on Marketplace
          </button>
          <button
            onClick={() => setActiveTab('WEBHOOKS')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'WEBHOOKS' ? 'bg-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            Webhooks & API
          </button>
        </div>
      </div>

      {activeTab === 'WHITE_LABEL' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Palette className="h-4 w-4 text-purple-400" />
              Tenant White Label Customization
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Custom Product Title</label>
                <input
                  type="text"
                  value={productName}
                  onChange={e => setProductName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Custom Enterprise CNAME Domain</label>
                <input
                  type="text"
                  value={customDomain}
                  onChange={e => setCustomDomain(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-indigo-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Primary Theme Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={e => setAccentColor(e.target.value)}
                    className="h-9 w-12 bg-transparent cursor-pointer rounded"
                  />
                  <span className="font-mono text-slate-300">{accentColor}</span>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-lg mt-2 cursor-pointer">
                Save & Deploy Branding Tokens
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white">Live White Label Preview</h3>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-center">
              <div className="p-3 rounded-2xl inline-block bg-slate-900 border border-slate-800" style={{ color: accentColor }}>
                <Globe className="h-8 w-8" />
              </div>
              <h2 className="text-lg font-extrabold text-white">{productName}</h2>
              <p className="text-xs text-slate-400 font-mono">https://{customDomain}</p>
              <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500">
                Powered by PalmVision AI Core Multi-Tenant White-Label Engine
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'MARKETPLACE' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockMarketplaceAddons.map(add => (
            <div key={add.id} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold">
                  {add.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {add.rating}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{add.addonName}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">{add.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-700/80">
                <span className="font-bold text-white">
                  {add.priceUsd === 0 ? 'FREE' : `$${add.priceUsd}/mo`}
                </span>
                <button className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  add.installed
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-purple-600 hover:bg-purple-500 text-white'
                }`}>
                  {add.installed ? 'Installed' : 'Install Add-on'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'WEBHOOKS' && (
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <h3 className="text-sm font-bold text-white">Enterprise Webhook Subscription Manager</h3>
              <p className="text-xs text-slate-400">Stream real-time weighbridge, harvest & sensor events to SAP / Oracle ERP</p>
            </div>
            <button className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
              <Plus className="h-4 w-4" />
              <span>New Webhook Endpoint</span>
            </button>
          </div>

          <div className="space-y-3">
            {[
              { event: 'weighbridge.transaction.created', url: 'https://sap-gateway.socfindo.co.id/api/v1/weighbridge', status: 'ACTIVE' },
              { event: 'harvest.yield.alert', url: 'https://oracle-agri.wilmar.com/webhooks/yield', status: 'ACTIVE' }
            ].map(wh => (
              <div key={wh.event} className="p-3.5 rounded-xl bg-slate-900 border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-purple-300 font-mono">{wh.event}</div>
                  <div className="text-[11px] text-slate-400 font-mono">{wh.url}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  {wh.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
