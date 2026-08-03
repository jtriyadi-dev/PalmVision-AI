import React, { useState } from 'react';
import {
  Building2,
  TreePine,
  Factory,
  Search,
  Plus,
  Edit2,
  CheckCircle2,
  MapPin,
  Users,
  ShieldCheck,
  ChevronRight,
  Landmark
} from 'lucide-react';
import { mockCompanyEntities, mockEstateUnits } from '../mockData';
import { CompanyEntity, EstateUnit } from '../types';

export const CompanyOrgHierarchyView: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyEntity[]>(mockCompanyEntities);
  const [estates, setEstates] = useState<EstateUnit[]>(mockEstateUnits);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<CompanyEntity | null>(mockCompanyEntities[0]);
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);

  // Form states for new company
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newTaxId, setNewTaxId] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newName) return;

    const created: CompanyEntity = {
      id: `cmp-${Date.now()}`,
      code: newCode.toUpperCase(),
      name: newName,
      taxId: newTaxId || '00.000.000.0-000.000',
      estatesCount: 0,
      millsCount: 0,
      headquartersAddress: newAddress || 'Kantor Pusat Kebun Baru',
      status: 'ACTIVE'
    };

    setCompanies([created, ...companies]);
    setSelectedCompany(created);
    setShowAddCompanyModal(false);
    setNewCode('');
    setNewName('');
    setNewTaxId('');
    setNewAddress('');
  };

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
              Master Data • Enterprise Structure
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Struktur Organisasi Holding & Master Kebun / PKS</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Pengelolaan entitas legal holding perkebunan, anak perusahaan (subsidiary), unit kebun (estate), afdeling/divisi, dan PKS.
          </p>
        </div>

        <button
          onClick={() => setShowAddCompanyModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Entitas Perusahaan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Companies Master List (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Landmark className="h-4 w-4 text-indigo-400" />
              Entitas Perusahaan (Holding & Subsidiaries)
            </h3>
            <span className="text-xs text-indigo-300 font-mono font-bold">{companies.length} Entitas</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari Kode atau Nama Perusahaan..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-3">
            {filteredCompanies.map(cmp => {
              const isSelected = selectedCompany?.id === cmp.id;
              return (
                <div
                  key={cmp.id}
                  onClick={() => setSelectedCompany(cmp)}
                  className={`p-4 rounded-xl border transition cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500 text-white shadow-lg'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-slate-900 text-indigo-300 font-mono text-[10px] font-bold">
                      {cmp.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold">
                      {cmp.status}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">{cmp.name}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">NPWP: {cmp.taxId}</p>

                  <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <TreePine className="h-3.5 w-3.5 text-teal-400" />
                      <strong>{cmp.estatesCount} Kebun</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Factory className="h-3.5 w-3.5 text-amber-400" />
                      <strong>{cmp.millsCount} PKS</strong>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Company Hierarchy & Estates (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedCompany && (
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">{selectedCompany.code}</span>
                  <h3 className="text-lg font-extrabold text-white">{selectedCompany.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{selectedCompany.headquartersAddress}</p>
                </div>

                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Building2 className="h-6 w-6" />
                </div>
              </div>

              {/* Company Estate Units List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                  <span>Unit Kebun Terdaftar (Estates Master)</span>
                  <span className="text-teal-400 font-mono">{estates.length} Unit</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {estates.map(est => (
                    <div key={est.id} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-slate-900 text-teal-300 font-mono text-[10px] font-bold">
                          {est.estateCode}
                        </span>
                        <span className="text-[10px] text-slate-400">{est.regionName}</span>
                      </div>

                      <h5 className="text-sm font-bold text-white">{est.estateName}</h5>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-700">
                        <div>
                          <span className="text-slate-400 text-[10px] block">Luas Areal</span>
                          <strong className="text-teal-300 font-mono">{est.totalHectares.toLocaleString()} Ha</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[10px] block">Manager Kebun</span>
                          <strong className="text-white">{est.managerName}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Add Entity */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-400" />
              <span>Tambah Entitas Perusahaan Baru</span>
            </h3>

            <form onSubmit={handleAddCompany} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Kode Entitas (e.g. BALI-AGRO-SUB)</label>
                <input
                  type="text"
                  required
                  placeholder="KODE-PERUSAHAAN"
                  value={newCode}
                  onChange={e => setNewCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Nama Perusahaan / Anak Usaha</label>
                <input
                  type="text"
                  required
                  placeholder="PT Perkebunan Sawit..."
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Nomor Pokok Wajib Pajak (NPWP)</label>
                <input
                  type="text"
                  placeholder="01.234.567.8-012.000"
                  value={newTaxId}
                  onChange={e => setNewTaxId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1 font-semibold">Alamat Kantor Pusat</label>
                <textarea
                  rows={2}
                  placeholder="Alamat lengkap..."
                  value={newAddress}
                  onChange={e => setNewAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddCompanyModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer"
                >
                  Simpan Entitas Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
