import React, { useState } from 'react';
import { Camera, Search, Filter, MapPin, Calendar, Tag, Sparkles } from 'lucide-react';
import { FieldPhotoItem } from '../types';

interface FieldPhotoGalleryViewProps {
  photos: FieldPhotoItem[];
}

export const FieldPhotoGalleryView: React.FC<FieldPhotoGalleryViewProps> = ({ photos }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPhotos = photos.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.takenBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.blockCode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari foto / pengambil / blok..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-hidden"
          >
            <option value="All">Semua Kategori Galeri</option>
            <option value="Pemupukan">Pemupukan</option>
            <option value="Penyemprotan">Penyemprotan</option>
            <option value="Pemangkasan">Pemangkasan</option>
            <option value="Inspeksi">Inspeksi</option>
          </select>
        </div>

        <button
          onClick={() => alert('Ambil & Upload Foto Lapangan')}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          <Camera className="h-4 w-4" />
          <span>Upload Foto Geo-Tagged</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden space-y-3 hover:shadow-md transition-all group"
          >
            <div className="relative h-48 overflow-hidden bg-slate-900">
              <img
                src={photo.photoUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-emerald-400 font-extrabold text-[10px]">
                {photo.category}
              </span>
              <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-slate-900/90 text-white font-mono text-[10px]">
                {photo.date} {photo.time}
              </span>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                {photo.title}
              </h4>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-bold text-emerald-600">
                  <MapPin className="h-3.5 w-3.5" />
                  {photo.blockCode}
                </span>
                <span>Diambil oleh: {photo.takenBy}</span>
              </div>

              {photo.aiDetectionPlaceholder && (
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-[11px] text-emerald-700 dark:text-emerald-300 font-medium flex items-start gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{photo.aiDetectionPlaceholder}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-1 pt-1">
                {photo.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
