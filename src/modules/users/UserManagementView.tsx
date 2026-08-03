import React, { useState } from 'react';
import { Users, UserPlus, Search, Shield, Filter, RefreshCw, Smartphone, Key, CheckCircle2, XCircle } from 'lucide-react';
import { UserProfile, UserRole } from '../../types';

export const UserManagementView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [users, setUsers] = useState<UserProfile[]>([
    {
      id: 'usr-01',
      name: 'Suhardi, S.P.',
      email: 'suhardi@snj.co.id',
      username: 'suhardi.em',
      phone: '+62 812-3456-7890',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      role: 'ESTATE_MANAGER',
      department: 'Estate Operational',
      position: 'Estate Manager',
      estateId: 'est-01',
      estateName: 'Estate Teluk Dalam',
      status: 'ACTIVE',
      joinedDate: '2023-01-15',
      lastLogin: '2026-08-03 08:14:22',
      deviceFingerprint: 'HWID-3891-SNJ-M1',
      licenseKey: 'PVAI-ENT-SNJ-2027',
      twoFactorEnabled: true,
    },
    {
      id: 'usr-02',
      name: 'Budiarto',
      email: 'budiarto@snj.co.id',
      username: 'budiarto.mandor01',
      phone: '+62 813-9876-5432',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      role: 'MANDOR',
      department: 'Harvest Field',
      position: 'Mandor Panen Afdeling Alpha',
      estateId: 'est-01',
      estateName: 'Estate Teluk Dalam',
      status: 'ACTIVE',
      joinedDate: '2024-03-10',
      lastLogin: '2026-08-03 08:05:10',
      deviceFingerprint: 'HWID-8910-TAB-ANDROID',
      licenseKey: 'PVAI-ENT-SNJ-2027',
      twoFactorEnabled: false,
    },
    {
      id: 'usr-03',
      name: 'Rina Herawati, S.E.',
      email: 'rina.finance@snj.co.id',
      username: 'rina.fin',
      phone: '+62 811-2233-4455',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      role: 'FINANCE',
      department: 'Finance & Accounting',
      position: 'Cost Controller',
      estateId: 'est-01',
      estateName: 'Estate Teluk Dalam',
      status: 'ACTIVE',
      joinedDate: '2022-09-01',
      lastLogin: '2026-08-02 17:30:00',
      deviceFingerprint: 'HWID-1022-DESK-WIN',
      licenseKey: 'PVAI-ENT-SNJ-2027',
      twoFactorEnabled: true,
    },
    {
      id: 'usr-04',
      name: 'Ahmad Ridwan',
      email: 'ahmad.asst@snj.co.id',
      username: 'ahmad.asst',
      phone: '+62 815-6677-8899',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      role: 'ASSISTANT_MANAGER',
      department: 'Agronomy',
      position: 'Asisten Afdeling Bravo',
      estateId: 'est-01',
      estateName: 'Estate Teluk Dalam',
      status: 'INACTIVE',
      joinedDate: '2025-02-18',
      lastLogin: '2026-07-28 11:12:00',
      deviceFingerprint: 'HWID-4491-MOB-IOS',
      licenseKey: 'PVAI-ENT-SNJ-2027',
      twoFactorEnabled: false,
    },
  ]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : u
      )
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title Header */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">User Management & Enterprise Directory</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Kelola Pengguna Perkebunan, Role Context, Device Fingerprint & Status 2FA
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <UserPlus className="h-4 w-4" />
          <span>Tambah Pengguna Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, username, atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 pl-9 pr-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-500">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 font-medium text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">Semua Peran (All Roles)</option>
            <option value="ESTATE_MANAGER">Estate Manager</option>
            <option value="MANDOR">Mandor</option>
            <option value="FINANCE">Finance</option>
            <option value="ASSISTANT_MANAGER">Assistant Manager</option>
          </select>
        </div>
      </div>

      {/* User Directory Table */}
      <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3">Pengguna</th>
              <th className="p-3">Otoritas Peran</th>
              <th className="p-3">Unit Kebun / Jabatan</th>
              <th className="p-3">Last Login</th>
              <th className="p-3">Device Bind & 2FA</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
            {filteredUsers.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatar}
                      alt={u.name}
                      className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono font-bold text-[10px] text-emerald-600 dark:text-emerald-400">
                    {u.role}
                  </span>
                </td>
                <td className="p-3">
                  <div>{u.position}</div>
                  <div className="text-[10px] text-slate-400">{u.estateName}</div>
                </td>
                <td className="p-3 text-slate-500 font-mono text-[11px]">
                  {u.lastLogin}
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <Smartphone className="h-3 w-3" /> {u.deviceFingerprint}
                    </span>
                    {u.twoFactorEnabled ? (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[9px] font-bold">
                        2FA ON
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-400 text-[9px]">
                        2FA OFF
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.status === 'ACTIVE'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => handleToggleStatus(u.id)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-semibold"
                  >
                    {u.status === 'ACTIVE' ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
