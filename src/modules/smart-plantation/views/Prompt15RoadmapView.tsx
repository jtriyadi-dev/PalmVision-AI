import React from 'react';
import {
  Rocket,
  Shield,
  CreditCard,
  Building2,
  RefreshCw,
  Server,
  Code,
  Users,
  Layers,
  ArrowRight
} from 'lucide-react';

export const Prompt15RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 border border-amber-500/30 shadow-2xl space-y-3">
        <div className="flex items-center gap-2">
          <Rocket className="h-6 w-6 text-amber-400" />
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
            Next Milestone Roadmap
          </span>
        </div>
        <h2 className="text-xl font-bold text-white">
          Prompt 15 Preview: Commercial Multi-Tenant SaaS, License, Billing & Enterprise DevOps
        </h2>
        <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
          Prompt 15 will build the complete commercial infrastructure allowing PalmVision AI to be packaged and sold as a global SaaS product to multi-national plantation conglomerates.
        </p>
      </div>

      {/* Grid of Planned Modules in Prompt 15 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Multi-Tenant SaaS Architecture',
            desc: 'Isolated tenant schemas, custom domain mapping (e.g. app.socfin.com), and tenant data partitioning.',
            icon: Building2,
            color: 'text-amber-400'
          },
          {
            title: 'License & Subscription Billing',
            desc: 'Tiered subscription pricing (Per Hectare / Per Mill), auto-invoice generation, Stripe & local gateway integrations.',
            icon: CreditCard,
            color: 'text-emerald-400'
          },
          {
            title: 'Customer Self-Service Portal',
            desc: 'Client admin console for managing estate user seats, billings, support tickets, and API keys.',
            icon: Users,
            color: 'text-indigo-400'
          },
          {
            title: 'White Label & Custom Branding',
            desc: 'Dynamic theme customized colors, logo upload, custom email templates, and branded mobile apps.',
            icon: Layers,
            color: 'text-purple-400'
          },
          {
            title: 'App Marketplace & Extension Add-ons',
            desc: '3rd-party integration store for SAP B1, Oracle ERP, specialized drone AI models, and satellite providers.',
            icon: Code,
            color: 'text-teal-400'
          },
          {
            title: 'Enterprise DevOps & CI/CD Pipeline',
            desc: 'Automated Cloud Run container deployments, canary releases, zero-downtime update center & database backups.',
            icon: Server,
            color: 'text-cyan-400'
          }
        ].map(item => (
          <div key={item.title} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                <item.icon className={`h-5 w-5 ${item.color}`} />
              </div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
