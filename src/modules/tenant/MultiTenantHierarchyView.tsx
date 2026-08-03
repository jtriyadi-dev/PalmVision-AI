import React, { useState } from 'react';
import { Layers, ChevronRight, ChevronDown, Plus, Trees, MapPin, Building2, CheckCircle2 } from 'lucide-react';
import { CompanyEntity, EstateEntity, DivisionEntity, AfdelingEntity, BlockEntity } from '../../types';

export const MultiTenantHierarchyView: React.FC = () => {
  const [hierarchyData, setHierarchyData] = useState<CompanyEntity>({
    id: 'comp-01',
    name: 'PT Sawit Nusantara Jaya',
    code: 'SNJ',
    nib: '9120308910291',
    npwp: '01.234.567.8-123.000',
    address: 'Pekanbaru, Riau',
    email: 'corp@snj.co.id',
    phone: '+62 761-889900',
    website: 'https://snj.co.id',
    logoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=120',
    estates: [
      {
        id: 'est-01',
        code: 'EST-01',
        name: 'Estate Teluk Dalam',
        managerName: 'Suhardi, S.P.',
        totalHectares: 4250,
        divisions: [
          {
            id: 'div-01',
            code: 'DIV-I',
            name: 'Divisi I (Utama)',
            afdelings: [
              {
                id: 'afd-01',
                code: 'AFD-A',
                name: 'Afdeling Alpha',
                blocks: [
                  {
                    id: 'blk-b12',
                    code: 'B12',
                    name: 'Blok B12 (TM-2018)',
                    hectares: 32.5,
                    plantingYear: 2018,
                    sph: 136,
                    subBlocks: [
                      { id: 'sb-b12a', code: 'B12-A', name: 'Sub-Blok B12-A', hectares: 16.2, plantingYear: 2018, sph: 136 },
                      { id: 'sb-b12b', code: 'B12-B', name: 'Sub-Blok B12-B', hectares: 16.3, plantingYear: 2018, sph: 136 },
                    ],
                  },
                  {
                    id: 'blk-b13',
                    code: 'B13',
                    name: 'Blok B13 (TM-2019)',
                    hectares: 28.0,
                    plantingYear: 2019,
                    sph: 136,
                    subBlocks: [],
                  },
                ],
              },
              {
                id: 'afd-02',
                code: 'AFD-B',
                name: 'Afdeling Bravo',
                blocks: [],
              },
            ],
          },
        ],
      },
      {
        id: 'est-02',
        code: 'EST-02',
        name: 'Estate Sungai Rokan',
        managerName: 'Drs. H. Mulyadi',
        totalHectares: 3800,
        divisions: [],
      },
    ],
  });

  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'comp-01': true,
    'est-01': true,
    'div-01': true,
    'afd-01': true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-amber-300">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Struktur Hirarki Multi-Tenant Perkebunan</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              5-Tier Organization Hierarchy: Company → Estate → Division → Afdeling → Block → Sub Block
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
            Hirarki Aktif: {hierarchyData.name}
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
            Data Isolated Multi-Tenant
          </span>
        </div>

        {/* Tree Root Company */}
        <div className="space-y-2">
          <div
            onClick={() => toggleNode(hierarchyData.id)}
            className="p-3 rounded-xl bg-slate-900 text-white flex items-center justify-between cursor-pointer hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {expandedNodes[hierarchyData.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <Building2 className="h-4 w-4 text-emerald-400" />
              <span>{hierarchyData.name} ({hierarchyData.code})</span>
            </div>
            <span className="text-slate-400 font-mono text-[11px]">{hierarchyData.estates.length} Estates</span>
          </div>

          {/* Estates Level */}
          {expandedNodes[hierarchyData.id] && (
            <div className="pl-6 space-y-2 border-l-2 border-slate-200 dark:border-slate-800">
              {hierarchyData.estates.map((est) => (
                <div key={est.id} className="space-y-2">
                  <div
                    onClick={() => toggleNode(est.id)}
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700/80"
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
                      {expandedNodes[est.id] ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                      <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                      <span>{est.name} ({est.code})</span>
                    </div>
                    <span className="text-slate-500 font-medium">
                      EM: {est.managerName} • {est.totalHectares} Ha
                    </span>
                  </div>

                  {/* Divisions Level */}
                  {expandedNodes[est.id] && (
                    <div className="pl-6 space-y-2 border-l-2 border-slate-200 dark:border-slate-800">
                      {est.divisions.map((div) => (
                        <div key={div.id} className="space-y-2">
                          <div
                            onClick={() => toggleNode(div.id)}
                            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between cursor-pointer"
                          >
                            <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                              {expandedNodes[div.id] ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                              <span>{div.name}</span>
                            </div>
                            <span className="text-slate-400">{div.afdelings.length} Afdeling</span>
                          </div>

                          {/* Afdelings Level */}
                          {expandedNodes[div.id] && (
                            <div className="pl-6 space-y-2 border-l-2 border-slate-200 dark:border-slate-800">
                              {div.afdelings.map((afd) => (
                                <div key={afd.id} className="space-y-1">
                                  <div
                                    onClick={() => toggleNode(afd.id)}
                                    className="p-2 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between cursor-pointer"
                                  >
                                    <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                                      {expandedNodes[afd.id] ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                                      <span>{afd.name}</span>
                                    </div>
                                    <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                                      {afd.blocks.length} Blok Tanam
                                    </span>
                                  </div>

                                  {/* Blocks Level */}
                                  {expandedNodes[afd.id] && (
                                    <div className="pl-6 space-y-1">
                                      {afd.blocks.map((blk) => (
                                        <div
                                          key={blk.id}
                                          className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px]"
                                        >
                                          <div className="flex items-center gap-2 font-mono text-slate-800 dark:text-slate-200">
                                            <Trees className="h-3.5 w-3.5 text-emerald-600" />
                                            <span>{blk.name}</span>
                                          </div>
                                          <div className="text-slate-500">
                                            {blk.hectares} Ha • SPH {blk.sph} • TT {blk.plantingYear}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
