import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Database, Tag, CheckCircle2, AlertCircle } from 'lucide-react';

interface MasterDataEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit: any | null;
  entityName: string;
  onSaveSuccess: (savedItem: any) => void;
}

export const MasterDataEditModal: React.FC<MasterDataEditModalProps> = ({
  isOpen,
  onClose,
  itemToEdit,
  entityName,
  onSaveSuccess,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const isEditMode = !!itemToEdit;

  useEffect(() => {
    if (itemToEdit) {
      setFormData({ ...itemToEdit });
    } else {
      setFormData({
        code: `${entityName.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
        name: '',
        status: 'ACTIVE',
        notes: '',
      });
    }
  }, [itemToEdit, entityName, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalItem = {
      ...formData,
      id: itemToEdit?.id || `id-${Date.now()}`,
      updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      createdAt: itemToEdit?.createdAt || new Date().toISOString().slice(0, 16).replace('T', ' '),
      createdBy: itemToEdit?.createdBy || 'System User',
      updatedBy: 'Current User',
    };
    onSaveSuccess(finalItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              {isEditMode ? <Database className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {isEditMode ? `Edit Data Master ${entityName}` : `Tambah Master Baru: ${entityName}`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Isi formulir berikut dengan akurat untuk menjamin validitas Single Source of Truth.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 flex-1 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Kode Unik ({entityName} Code) *
              </label>
              <input
                type="text"
                required
                value={formData.code || ''}
                onChange={(e) => handleInputChange('code', e.target.value)}
                placeholder="Contoh: CODE-01"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:outline-hidden focus:border-emerald-500 font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nama Entitas Master *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={`Nama ${entityName}...`}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:border-emerald-500 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Status Operasional
              </label>
              <select
                value={formData.status || 'ACTIVE'}
                onChange={(e) => handleInputChange('status', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden font-bold"
              >
                <option value="ACTIVE">ACTIVE (Aktif)</option>
                <option value="INACTIVE">INACTIVE (Non-Aktif)</option>
                <option value="MAINTENANCE">MAINTENANCE (Pemeliharaan)</option>
                <option value="ARCHIVED">ARCHIVED (Diarsipkan)</option>
              </select>
            </div>

            {formData.hectares !== undefined && (
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Luas Area (Hektar)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.hectares || 0}
                  onChange={(e) => handleInputChange('hectares', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden font-mono"
                />
              </div>
            )}
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Catatan & Keterangan Tambahan
            </label>
            <textarea
              rows={3}
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Tambahkan deskripsi atau spesifikasi teknis..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-hidden"
            />
          </div>

          {/* Footer Submit Buttons inside form */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
            >
              <Save className="h-4 w-4" /> Simpan Data Master
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
