import React from 'react';
import {
  Boxes,
  Package,
  Wrench,
  ShoppingCart,
  Truck,
  QrCode,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';

export const Prompt9RoadmapView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border border-emerald-800/60 text-white space-y-4 shadow-xl">
        <div className="flex items-center gap-3 border-b border-emerald-800/50 pb-4">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Boxes className="h-6 w-6" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Roadmap Pengembangan Modul Selanjutnya
            </span>
            <h2 className="text-xl font-black text-white">
              Prompt 9 — Inventory, Warehouse & Procurement Management
            </h2>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
          Modul berikutnya akan menghubungkan hasil panen dan operasional lapangan dengan manajemen persediaan gudang
          kebun (Pupuk, Pestisida, Suku Cadang Alat Berat, Tools), sistem pengadaan barang (Procurement, PO, Supplier),
          kontrol stok minimum otomatis, QR/Barcode Inventory, serta AI Inventory Intelligence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Package className="h-4 w-4" /> Stok Agrokimia & Pupuk
            </div>
            <p className="text-slate-400 text-[11px]">
              Tracking Urea, NPK, KCL, Herbisida per Gudang Estate & Afdeling
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="font-bold text-blue-400 flex items-center gap-1.5">
              <Wrench className="h-4 w-4" /> Spareparts & Alat Panen
            </div>
            <p className="text-slate-400 text-[11px]">
              Manajemen Egrek, Dodos, Angkong, Ban Truk & Filter Traktor
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <ShoppingCart className="h-4 w-4" /> Pengadaan & Purchase Order
            </div>
            <p className="text-slate-400 text-[11px]">
              Permintaan Barang (PR), PO, Penerimaan Barang (GRN) & Vendor
            </p>
          </div>
        </div>
      </div>

      {/* Feature Plan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <QrCode className="h-4 w-4 text-emerald-600" /> Barcode & QR Code Inventory Scanning
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Scanning fisik barang masuk dan pengeluaran barang dari gudang utama ke afdeling menggunakan QR barcode scanner.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" /> AI Inventory Intelligence & Safety Stock
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Prediksi tanggal reorder otomatis berbasis laju konsumsi pemupukan & siklus perawatan mesin pabrik PKS.
          </p>
        </div>
      </div>
    </div>
  );
};
