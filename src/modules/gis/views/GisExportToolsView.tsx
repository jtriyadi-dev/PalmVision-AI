import React, { useState } from 'react';
import {
  Download,
  FileCode,
  Globe,
  Key,
  Copy,
  Check,
  Printer,
  Share2,
  Database
} from 'lucide-react';

export const GisExportToolsView: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState(false);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  const mockApiToken = "gis_live_bearer_98f4a21b3e90471c8a12bc";

  const handleCopyToken = () => {
    navigator.clipboard.writeText(mockApiToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleSimulateDownload = (formatName: string) => {
    setDownloadingFormat(formatName);
    setTimeout(() => {
      setDownloadingFormat(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold uppercase tracking-wider">
              GIS Spatial Export & API Services
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Spatial File Formats (GeoJSON, KML, SHP) & GIS API Access</h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Export estate boundaries and spatial data layers to QGIS, ArcGIS, Google Earth Pro, or integrate via GeoJSON REST endpoints.
          </p>
        </div>
      </div>

      {/* Export Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <FileCode className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">GeoJSON Spatial Format</h3>
              <p className="text-[11px] text-slate-400">Standard JSON format for QGIS & web maps</p>
            </div>
          </div>

          <button
            onClick={() => handleSimulateDownload('GeoJSON')}
            disabled={downloadingFormat === 'GeoJSON'}
            className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{downloadingFormat === 'GeoJSON' ? 'Generating GeoJSON...' : 'Download GeoJSON'}</span>
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-500/30">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Google Earth KML / KMZ</h3>
              <p className="text-[11px] text-slate-400">3D terrain viewing in Google Earth Pro</p>
            </div>
          </div>

          <button
            onClick={() => handleSimulateDownload('KML')}
            disabled={downloadingFormat === 'KML'}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            <span>{downloadingFormat === 'KML' ? 'Generating KML...' : 'Download KML / KMZ'}</span>
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Printer className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">High-Res PDF Map Report</h3>
              <p className="text-[11px] text-slate-400">Printable A0/A1 Estate Map with Legend</p>
            </div>
          </div>

          <button
            onClick={() => handleSimulateDownload('PDF')}
            disabled={downloadingFormat === 'PDF'}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Printer className="h-4 w-4" />
            <span>{downloadingFormat === 'PDF' ? 'Generating Printable PDF...' : 'Print PDF Spatial Map'}</span>
          </button>
        </div>
      </div>

      {/* GIS API Token Access */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Key className="h-4 w-4 text-teal-400" />
          <span>GIS Spatial REST API Access Token</span>
        </h3>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between font-mono text-xs">
          <span className="text-teal-300">{mockApiToken}</span>

          <button
            onClick={handleCopyToken}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            {copiedToken ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedToken ? 'Copied Token!' : 'Copy Key'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
