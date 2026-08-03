import React, { useState } from 'react';
import {
  CreditCard,
  Receipt,
  DollarSign,
  Download,
  Send,
  Building2,
  CheckCircle,
  Clock,
  ExternalLink,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { mockSubscriptions, mockInvoices } from '../mockData';
import { Invoice } from '../types';

export const SubscriptionBillingView: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              Commercial Billing & Revenue Engine
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Enterprise Subscriptions & Invoicing Engine</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Manage recurring SaaS billing tiers, tax computations, multi-currency invoices, and payment gateways.
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg flex items-center gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          <span>Generate Tax Invoice</span>
        </button>
      </div>

      {/* Active Subscriptions Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockSubscriptions.map(sub => (
          <div key={sub.id} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                {sub.planName}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-300">
                ${sub.amountUsd.toLocaleString()} / {sub.billingCycle}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white">{sub.tenantName}</h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{sub.subscriptionCode}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-slate-700/80">
              <span>Next Billing: <strong className="text-white">{sub.nextBillingDate}</strong></span>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded font-bold text-[10px]">
                {sub.paymentStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Gateway Foundation Connectors */}
      <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <div>
            <h3 className="text-sm font-bold text-white">Payment Gateway Integrations Framework</h3>
            <p className="text-xs text-slate-400">Supported local Indonesian & global automated payment collection rails</p>
          </div>
          <span className="text-xs text-indigo-400 font-bold">5 Connectors Ready</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { name: 'Stripe Global', status: 'ACTIVE', type: 'Credit Card / USD' },
            { name: 'Xendit IDN', status: 'ACTIVE', type: 'VA / QRIS / IDR' },
            { name: 'Midtrans IDN', status: 'ACTIVE', type: 'Bank Transfer' },
            { name: 'DOKU Enterprise', status: 'READY', type: 'Direct Debit' },
            { name: 'PayPal Commerce', status: 'READY', type: 'Global Express' },
            { name: 'Bank Transfer (Manual)', status: 'ACTIVE', type: 'Swift / Local BNI' }
          ].map(gw => (
            <div key={gw.name} className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
              <div className="text-xs font-bold text-white">{gw.name}</div>
              <div className="text-[10px] text-slate-400">{gw.type}</div>
              <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                {gw.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl overflow-hidden space-y-4 p-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">Issued Invoices & Ledger</h3>
            <p className="text-xs text-slate-400">VAT / PPN 11% calculated automatically</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 text-slate-400 text-[11px] uppercase font-semibold border-b border-slate-700">
                <th className="py-3.5 px-4">Invoice No & Customer</th>
                <th className="py-3.5 px-4">Base Amount</th>
                <th className="py-3.5 px-4">Tax (11%)</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Gateway</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">PDF Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs text-slate-200">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div>{inv.invoiceNo}</div>
                    <div className="text-[10px] text-slate-400">{inv.customerName}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">${inv.amountUsd.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">${inv.taxUsd.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">${inv.totalUsd.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-mono text-indigo-300">{inv.paymentGateway}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
