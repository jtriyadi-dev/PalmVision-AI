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
  ShoppingCart,
  CheckCircle2
} from 'lucide-react';
import { mockVendorsBuyers } from '../mockData';
import { VendorBuyerMaster } from '../types';

export const VendorBuyerMasterView: React.FC = () => {
  const [partners, setPartners] = useState<VendorBuyerMaster[]>(mockVendorsBuyers);
  const [searchTerm, setSearchTerm] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [partnerCode, setPartnerCode] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerType, setPartnerType] = useState<'BUYER_CPO_PK' | 'SUPPLIER_AGROCHEMICAL' | 'TRANSPORTER_LOGISTICS'>('BUYER_CPO_PK');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [topDays, setTopDays] = useState(30);

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerCode || !partnerName) return;

    const created: VendorBuyerMaster = {
      id: `ptn-${Date.now()}`,
      partnerCode: partnerCode.toUpperCase(),
      partnerName,
      partnerType: partnerType === 'BUYER_CPO_PK' ? 'Buyer CPO & Palm Kernel' : partnerType === 'SUPPLIER_AGROCHEMICAL' ? 'Pemasok Pupuk & Agrokimia' : 'Kontraktor Transportasi & Logistik',
      contactPerson: contactPerson || 'Tim Procurement',
      phone: phone || '+62 811-9988-7766',
      creditTermsDays: Number(topDays),
      status: 'ACTIVE'
    };

    setPartners([created, ...partners]);
    setShowAddModal(false);
    setToastMessage(`Mitra Bisnis ${created.partnerCode} (${created.partnerName}) berhasil didaftarkan!`);
    setTimeout(() => setToastMessage(null), 4000);

    setPartnerCode('');
    setPartnerName('');
    setContactPerson('');
    setPhone('');
  };

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

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Mitra Bisnis Baru</span>
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-sky-950 border border-sky-800 text-sky-300 text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-sky-400 hover:text-white cursor-pointer text-sm font-bold">✕</button>
        </div>
      )}

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

      {/* Modal Tambah Mitra Bisnis Baru */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl max-w-lg w-full space-y-4 animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5 text-sky-400" />
                <span>Registrasi Mitra Bisnis / Buyer CPO Baru</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePartner} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Kode Mitra (Partner Code)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., VND-WLM-09"
                    value={partnerCode}
                    onChange={(e) => setPartnerCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Kategori Mitra
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  >
                    <option value="BUYER_CPO_PK">Buyer CPO & Palm Kernel</option>
                    <option value="SUPPLIER_AGROCHEMICAL">Pemasok Pupuk & Agrokimia</option>
                    <option value="TRANSPORTER_LOGISTICS">Kontraktor Transportasi & Logistik</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Nama Perusahaan / Partner
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g., PT Wilmar Nabati Indonesia"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., Bpk. Bambang Setiawan"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-300 mb-1">
                    No Telepon HP / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="E.g., +62 812-3456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1">
                  Termin Pembayaran TOP (Hari)
                </label>
                <input
                  type="number"
                  value={topDays}
                  onChange={(e) => setTopDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-mono text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs cursor-pointer shadow-lg"
                >
                  Simpan Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
