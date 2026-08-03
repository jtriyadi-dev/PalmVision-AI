import React, { useState } from 'react';
import {
  Users,
  Search,
  Plus,
  Phone,
  ShieldCheck,
  CreditCard,
  Building,
  Truck,
  ShoppingCart
} from 'lucide-react';
import { mockVendorsBuyers } from '../mockData';
import { VendorBuyerMaster } from '../types';

export const VendorBuyerMasterView: React.FC = () => {
  const [partners, setPartners] = useState<VendorBuyerMaster[]>(mockVendorsBuyers);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = partners.filter(p =>
    p.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.partnerCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border border-sky-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[10px] font-bold uppercase tracking-wider">
              Vendor & Commercial Partner Registry
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Master Buyer CPO/PK, Vendor Pupuk & Kontraktor Transportasi</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Database mitra bisnis korporat: Pembeli CPO & Palm Kernel (Musim Mas, Wilmar), Pemasok Pupuk, serta Kontraktor Angkutan TBS/CPO.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="relative w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Kode atau Nama Partner..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Total Rekanan Registered: <strong className="text-white">{filtered.length} Mitra</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(partner => (
            <div key={partner.id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-slate-900 text-sky-300 font-mono text-[10px] font-bold">
                  {partner.partnerCode}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                  {partner.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-white">{partner.partnerName}</h4>
                <p className="text-[11px] text-sky-400 font-semibold mt-0.5">{partner.partnerType}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-700">
                <div>
                  <span className="text-slate-400 text-[10px] block">Contact Person / Telepon</span>
                  <strong className="text-white text-[11px] block">{partner.contactPerson}</strong>
                  <span className="text-[10px] font-mono text-slate-400">{partner.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Termin Pembayaran TOP</span>
                  <strong className="text-emerald-400 font-mono">{partner.creditTermsDays} Hari Kerja</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
