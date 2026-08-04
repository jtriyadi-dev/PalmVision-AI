import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Plus,
  Building2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  ShieldCheck,
  Award,
  ChevronRight,
  Eye,
  EyeOff,
  Briefcase,
  GitFork,
  CheckCircle2,
} from 'lucide-react';
import { INITIAL_EMPLOYEES, INITIAL_DEPARTMENTS } from '../mockData';
import { Employee } from '../types';

export const EmployeeManagementView: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showSensitiveData, setShowSensitiveData] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'DIRECTORY' | 'ORG_STRUCTURE'>('DIRECTORY');

  // Add Employee Form Modal State
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form Fields
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpNik, setNewEmpNik] = useState('');
  const [newEmpGender, setNewEmpGender] = useState<'Male' | 'Female'>('Male');
  const [newEmpPosition, setNewEmpPosition] = useState('Pemanen TBS');
  const [newEmpDept, setNewEmpDept] = useState('Divisi Panen & Produksi Kebun');
  const [newEmpEstate, setNewEmpEstate] = useState('Kebun Riau 01');
  const [newEmpStatus, setNewEmpStatus] = useState<'PERMANENT_SKU' | 'CONTRACT_BHL' | 'PROBATION'>('PERMANENT_SKU');
  const [newEmpPhone, setNewEmpPhone] = useState('');
  const [newEmpEmail, setNewEmpEmail] = useState('');
  const [newEmpSalary, setNewEmpSalary] = useState(4500000);
  const [newEmpBankName, setNewEmpBankName] = useState('Bank Mandiri');
  const [newEmpBankAccount, setNewEmpBankAccount] = useState('');
  const [newEmpEmergencyName, setNewEmpEmergencyName] = useState('');
  const [newEmpEmergencyPhone, setNewEmpEmergencyPhone] = useState('');

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName || !newEmpNik) return;

    const generatedId = `EMP-2026-${Math.floor(100 + Math.random() * 900)}`;
    const createdEmployee: Employee = {
      id: `emp-${Date.now()}`,
      employeeId: generatedId,
      nik: newEmpNik || '140102' + Math.floor(1000000000 + Math.random() * 9000000000),
      name: newEmpName,
      gender: newEmpGender,
      positionTitle: newEmpPosition,
      departmentId: 'dept-01',
      departmentName: newEmpDept,
      estateId: 'est-01',
      estateName: newEmpEstate,
      employmentStatus: newEmpStatus,
      joinDate: new Date().toISOString().split('T')[0],
      email: newEmpEmail || `${newEmpName.toLowerCase().replace(/\s+/g, '.')}@palmvision.co.id`,
      phone: newEmpPhone || '+62 812-7000-1122',
      basicSalary: Number(newEmpSalary),
      allowancesTotal: 500000,
      bankAccount: {
        bankName: newEmpBankName,
        accountNumber: newEmpBankAccount || '1080009988' + Math.floor(10 + Math.random() * 90),
        accountHolderName: newEmpName,
      },
      npwp: '31.452.890.1-201.000',
      bpjsKesehatan: '000188992011',
      bpjsKetenagakerjaan: '190288339100',
      maritalStatus: 'K/1 (Kawin 1 Anak)',
      education: 'SMA / SMK Sederajat',
      supervisorName: 'Ir. Hendra Wijaya (Manager Estate)',
      photoUrl: newEmpGender === 'Male'
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
        : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      emergencyContact: {
        name: newEmpEmergencyName || 'Keluarga Karyawan',
        relationship: 'Istri / Suami',
        phone: newEmpEmergencyPhone || '+62 813-8899-0011',
      },
      skills: ['Panen Egrek', 'Grading TBS', 'Safety K3'],
    };

    setEmployees((prev) => [createdEmployee, ...prev]);
    setShowAddEmployeeModal(false);
    setToastMessage(`Karyawan baru ${newEmpName} (${generatedId}) berhasil ditambahkan!`);
    setTimeout(() => setToastMessage(null), 4000);

    // Reset Form
    setNewEmpName('');
    setNewEmpNik('');
    setNewEmpPhone('');
    setNewEmpEmail('');
    setNewEmpBankAccount('');
    setNewEmpEmergencyName('');
    setNewEmpEmergencyPhone('');
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.nik.includes(searchQuery) ||
      emp.positionTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || emp.employmentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Tab Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span>Manajemen Karyawan & Struktur Organisasi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Database Terpusat Tenaga Kerja Perkebunan Kelapa Sawit (SKU, BHL, Staf PKS, & General Affair)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveSubTab('DIRECTORY')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'DIRECTORY'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Direktori Profil ({filteredEmployees.length})
            </button>
            <button
              onClick={() => setActiveSubTab('ORG_STRUCTURE')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeSubTab === 'ORG_STRUCTURE'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Struktur Organisasi
            </button>
          </div>

          <button
            onClick={() => setShowAddEmployeeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Karyawan</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white cursor-pointer text-sm font-bold">✕</button>
        </div>
      )}

      {activeSubTab === 'DIRECTORY' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari Nama, NIK, ID Karyawan, Jabatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Status:
              </span>
              {['ALL', 'PERMANENT_SKU', 'CONTRACT_BHL', 'PROBATION'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                    statusFilter === st
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {st === 'ALL' ? 'Semua Status' : st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Employee Directory Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3 relative group"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={emp.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                    alt={emp.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800 inline-block mb-1">
                      {emp.employeeId}
                    </span>
                    <h3 className="font-bold text-sm text-white truncate">{emp.name}</h3>
                    <p className="text-xs text-slate-300 font-medium truncate">{emp.positionTitle}</p>
                    <p className="text-[11px] text-slate-500 truncate">{emp.departmentName}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Estate / Unit</span>
                    <span className="text-slate-300 font-semibold">{emp.estateName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Status Kerja</span>
                    <span className="text-emerald-400 font-bold">{emp.employmentStatus.replace('_', ' ')}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEmployee(emp)}
                  className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Detail Profil Lengkap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'ORG_STRUCTURE' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GitFork className="w-5 h-5 text-emerald-400" />
                <span>Hirarki Organisasi PT Nusantara Palm Lestari</span>
              </h3>
              <p className="text-xs text-slate-400">Visualisasi Struktur Manajemen Holding, Estate Manager, & Mandor Lapangan</p>
            </div>
            <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg font-bold">5 Departemen Inti</span>
          </div>

          <div className="space-y-4">
            {INITIAL_DEPARTMENTS.map((dept) => (
              <div key={dept.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      {dept.code}
                    </span>
                    <h4 className="text-sm font-extrabold text-white mt-1">{dept.name}</h4>
                  </div>
                  <span className="text-xs text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 font-bold">
                    {dept.totalEmployees} Anggota
                  </span>
                </div>

                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                  <span>Head of Department:</span>
                  <span className="text-emerald-300 font-bold">{dept.headOfDepartment}</span>
                </div>

                {dept.subDepartments && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {dept.subDepartments.map((sub, idx) => (
                      <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-medium">
                        • {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Employee Modal Detail */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedEmployee.photoUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
                  alt={selectedEmployee.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-700"
                />
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    {selectedEmployee.employeeId}
                  </span>
                  <h3 className="text-lg font-black text-white mt-0.5">{selectedEmployee.name}</h3>
                  <p className="text-xs text-slate-300 font-medium">{selectedEmployee.positionTitle} • {selectedEmployee.estateName}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Sensitive Data Controls */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Kerahasiaan Identitas (NIK, BPJS, NPWP & Rekening)</span>
                </div>
                <button
                  onClick={() => setShowSensitiveData(!showSensitiveData)}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  {showSensitiveData ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSensitiveData ? 'Sembunyikan' : 'Tampilkan Data'}</span>
                </button>
              </div>

              {/* Grid 1: Personal Data */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-500 block">NIK KTP</span>
                  <span className="font-mono font-bold text-white">
                    {showSensitiveData ? selectedEmployee.nik : '140102**********'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">NPWP</span>
                  <span className="font-mono font-bold text-white">
                    {showSensitiveData ? selectedEmployee.npwp : '**.***.***.*-***.***'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">BPJS Kesehatan</span>
                  <span className="font-mono font-bold text-white">
                    {showSensitiveData ? selectedEmployee.bpjsKesehatan : '0001**********'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">BPJS Ketenagakerjaan</span>
                  <span className="font-mono font-bold text-white">
                    {showSensitiveData ? selectedEmployee.bpjsKetenagakerjaan : '1902**********'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Pendidikan</span>
                  <span className="font-bold text-white">{selectedEmployee.education}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status Nikah</span>
                  <span className="font-bold text-white">{selectedEmployee.maritalStatus}</span>
                </div>
              </div>

              {/* Grid 2: Employment & Supervisor */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Atasan Langsung (Supervisor)</span>
                  <span className="font-bold text-emerald-400">{selectedEmployee.supervisorName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tanggal Bergabung (Join Date)</span>
                  <span className="font-bold text-white">{selectedEmployee.joinDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Bank Transfer Gaji</span>
                  <span className="font-bold text-white">
                    {selectedEmployee.bankAccount.bankName} - {showSensitiveData ? selectedEmployee.bankAccount.accountNumber : '••••••••'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Gaji Pokok (Nominal Standard)</span>
                  <span className="font-bold text-emerald-400">
                    Rp {selectedEmployee.basicSalary.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Grid 3: Emergency Contact */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-500 font-bold block">Kontak Darurat (Emergency Contact)</span>
                <p className="text-slate-200 font-semibold">
                  {selectedEmployee.emergencyContact.name} ({selectedEmployee.emergencyContact.relationship}) — Telp: {selectedEmployee.emergencyContact.phone}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 cursor-pointer text-xs"
              >
                Tutup Detail
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Input Data Karyawan Baru */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span>Input Data Karyawan Baru (HRM System)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Lengkapi data profil, NIK KTP, status ketenagakerjaan, serta rekening payroll karyawan.
                </p>
              </div>
              <button
                onClick={() => setShowAddEmployeeModal(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-4 text-xs">
              {/* Seksi 1: Identitas Personal */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  1. Data Identitas Karyawan
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Nama Lengkap Karyawan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={newEmpName}
                      onChange={(e) => setNewEmpName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">NIK (Nomor Induk Kependudukan KTP) *</label>
                    <input
                      type="text"
                      required
                      placeholder="16 Digit NIK KTP (e.g. 1401021204900001)"
                      value={newEmpNik}
                      onChange={(e) => setNewEmpNik(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Jenis Kelamin</label>
                    <select
                      value={newEmpGender}
                      onChange={(e) => setNewEmpGender(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                    >
                      <option value="Male">Laki-Laki</option>
                      <option value="Female">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">No. HP / WhatsApp Active</label>
                    <input
                      type="text"
                      placeholder="+62 812-3456-7890"
                      value={newEmpPhone}
                      onChange={(e) => setNewEmpPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Seksi 2: Penugasan & Posisi */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  2. Jabatan & Penempatan Kerja
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Jabatan / Posisi Kerja</label>
                    <select
                      value={newEmpPosition}
                      onChange={(e) => setNewEmpPosition(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                    >
                      <option value="Pemanen TBS">Pemanen TBS (Harvester)</option>
                      <option value="Mandor Panen">Mandor Panen (Field Supervisor)</option>
                      <option value="Operator Heavy Equipment">Operator Heavy Equipment (Excavator/JCB)</option>
                      <option value="Supir Truk TBS">Supir Truk Transport TBS</option>
                      <option value="Staff Agronomi & GIS">Staff Agronomi & GIS Specialist</option>
                      <option value="Operator Pabrik PKS">Operator Mill Pabrik PKS</option>
                      <option value="Asisten Kepala Estate">Asisten Kepala Estate (Askep)</option>
                      <option value="Staff HRD & Admin">Staff HRD & General Affair</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Departemen / Divisi</label>
                    <select
                      value={newEmpDept}
                      onChange={(e) => setNewEmpDept(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                    >
                      <option value="Divisi Panen & Produksi Kebun">Divisi Panen & Produksi Kebun</option>
                      <option value="Divisi Pabrik Kelapa Sawit (PKS)">Divisi Pabrik Kelapa Sawit (PKS)</option>
                      <option value="Divisi Workshop & Teknik (EAM)">Divisi Workshop & Teknik (EAM)</option>
                      <option value="Divisi Agronomi & Proteksi Tanaman">Divisi Agronomi & Proteksi Tanaman</option>
                      <option value="Divisi HRD & General Affair">Divisi HRD & General Affair</option>
                      <option value="Divisi Finance & Logistik">Divisi Finance & Logistik</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Lokasi Kebun / Unit Kerja</label>
                    <select
                      value={newEmpEstate}
                      onChange={(e) => setNewEmpEstate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                    >
                      <option value="Kebun Riau 01">Kebun Riau 01 (Estate A)</option>
                      <option value="Kebun Kaltim 02">Kebun Kaltim 02 (Estate B)</option>
                      <option value="Kebun Sumut 04">Kebun Sumut 04 (Estate C)</option>
                      <option value="PKS Mill 01 Riau">PKS Mill 01 Riau</option>
                      <option value="Head Office Jakarta">Head Office Jakarta</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Status Ketenagakerjaan</label>
                    <select
                      value={newEmpStatus}
                      onChange={(e) => setNewEmpStatus(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                    >
                      <option value="PERMANENT_SKU">SKU Permanent (Karyawan Tetap)</option>
                      <option value="CONTRACT_BHL">Contract BHL (Karyawan Harian Lepas)</option>
                      <option value="PROBATION">Masa Percobaan (Probation 3 Bulan)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Seksi 3: Financial & Emergency */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  3. Gaji, Rekening Bank & Kontak Darurat
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Gaji Pokok Standard (Rp)</label>
                    <input
                      type="number"
                      value={newEmpSalary}
                      onChange={(e) => setNewEmpSalary(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Bank Payroll</label>
                    <select
                      value={newEmpBankName}
                      onChange={(e) => setNewEmpBankName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium cursor-pointer"
                    >
                      <option value="Bank Mandiri">Bank Mandiri</option>
                      <option value="Bank BRI">Bank BRI</option>
                      <option value="Bank BCA">Bank BCA</option>
                      <option value="Bank BNI">Bank BNI</option>
                      <option value="Bank Syariah Indonesia">Bank Syariah Indonesia (BSI)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Nomor Rekening Bank</label>
                    <input
                      type="text"
                      placeholder="Nomor Rekening"
                      value={newEmpBankAccount}
                      onChange={(e) => setNewEmpBankAccount(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Nama Kontak Darurat</label>
                    <input
                      type="text"
                      placeholder="Nama Istri/Suami/Orang Tua"
                      value={newEmpEmergencyName}
                      onChange={(e) => setNewEmpEmergencyName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">No. HP Kontak Darurat</label>
                    <input
                      type="text"
                      placeholder="+62 812-9988-7766"
                      value={newEmpEmergencyPhone}
                      onChange={(e) => setNewEmpEmergencyPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 cursor-pointer text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer text-xs shadow-lg flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Simpan Data Karyawan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
