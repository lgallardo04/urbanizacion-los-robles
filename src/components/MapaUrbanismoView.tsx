"use client";

import React, { useState } from 'react';
import { TabType } from './Sidebar';
import { 
  Map, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  MapPin, 
  ArrowRight, 
  Zap, 
  Users, 
  ShieldCheck,
  Building,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';

interface MapaUrbanismoViewProps {
  onNavigate: (tab: TabType) => void;
}

interface ManzanaData {
  id: string;
  name: string;
  status: 'CONFORME' | 'OBSERVACION' | 'INFRACCION';
  parcelas: number;
  solvency: number;
  habitantes: number;
  transformador: string;
  callePrincipal: string;
  loouConformidad: number;
}

const MANZANAS: ManzanaData[] = [
  { 
    id: 'A', 
    name: 'Manzana A', 
    status: 'CONFORME', 
    parcelas: 14, 
    solvency: 95, 
    habitantes: 56, 
    transformador: 'TX-ROB-01 (75 kVA)', 
    callePrincipal: 'Av. Los Robles Norte',
    loouConformidad: 98
  },
  { 
    id: 'B', 
    name: 'Manzana B', 
    status: 'OBSERVACION', 
    parcelas: 15, 
    solvency: 72, 
    habitantes: 62, 
    transformador: 'TX-ROB-02 (50 kVA)', 
    callePrincipal: 'Calle Los Samanes',
    loouConformidad: 82
  },
  { 
    id: 'C', 
    name: 'Manzana C', 
    status: 'INFRACCION', 
    parcelas: 12, 
    solvency: 45, 
    habitantes: 48, 
    transformador: 'TX-ROB-03 (75 kVA)', 
    callePrincipal: 'Calle Los Bucares',
    loouConformidad: 60
  },
  { 
    id: 'D', 
    name: 'Manzana D', 
    status: 'CONFORME', 
    parcelas: 14, 
    solvency: 100, 
    habitantes: 58, 
    transformador: 'TX-ROB-04 (100 kVA)', 
    callePrincipal: 'Av. Los Robles Sur',
    loouConformidad: 100
  },
  { 
    id: 'E', 
    name: 'Manzana E', 
    status: 'OBSERVACION', 
    parcelas: 12, 
    solvency: 68, 
    habitantes: 50, 
    transformador: 'TX-ROB-05 (50 kVA)', 
    callePrincipal: 'Calle Los Cedros',
    loouConformidad: 78
  },
  { 
    id: 'F', 
    name: 'Manzana F', 
    status: 'CONFORME', 
    parcelas: 14, 
    solvency: 88, 
    habitantes: 54, 
    transformador: 'TX-ROB-06 (75 kVA)', 
    callePrincipal: 'Calle Las Palmas',
    loouConformidad: 92
  },
];

export const MapaUrbanismoView: React.FC<MapaUrbanismoViewProps> = ({ onNavigate }) => {
  const [selectedManzanaId, setSelectedManzanaId] = useState<string>('A');
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const selectedManzana = MANZANAS.find((m) => m.id === selectedManzanaId) || MANZANAS[0];

  const getStatusBadge = (status: ManzanaData['status']) => {
    switch (status) {
      case 'CONFORME':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300',
          indicator: 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]',
          text: 'Conforme LOOU',
          icon: CheckCircle2,
        };
      case 'OBSERVACION':
        return {
          bg: 'bg-amber-500/10 border-amber-500/40 text-amber-300',
          indicator: 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]',
          text: 'Observación Leve',
          icon: Info,
        };
      case 'INFRACCION':
        return {
          bg: 'bg-rose-500/10 border-rose-500/40 text-rose-300',
          indicator: 'bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.5)]',
          text: 'Infracción / Deuda',
          icon: AlertTriangle,
        };
    }
  };

  const handleSelectManzana = (id: string) => {
    setSelectedManzanaId(id);
    if (window.innerWidth < 1024) {
      setIsMobileModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="glass-card border border-surface-border p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] -z-10 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -z-10 rounded-full pointer-events-none" />

        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-robles-500/20 text-robles-300 border border-robles-500/30">
              Cartografía & LOOU
            </span>
            <span className="text-[10px] text-slate-400 font-mono">6 Manzanas · 81 Parcelas</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
            <Map className="w-5 h-5 sm:w-6 sm:h-6 text-robles-400" />
            Mapa Urbanístico Interactivo
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-robles-400" />
            Urbanización Los Robles · Municipio Araure, Edo. Portuguesa
          </p>
        </div>

        {/* Global summary chips */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-surface-border shrink-0 text-center">
            <span className="text-[10px] text-slate-400 block">Solvencia Global</span>
            <span className="text-xs font-bold font-mono text-emerald-400">78.5%</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-surface-border shrink-0 text-center">
            <span className="text-[10px] text-slate-400 block">Conformes</span>
            <span className="text-xs font-bold font-mono text-white">4 / 6 Mzn</span>
          </div>
          <button
            onClick={() => onNavigate('catastro')}
            className="px-3 py-2 rounded-xl bg-robles-500/20 hover:bg-robles-500/30 text-robles-300 border border-robles-500/40 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
          >
            <span>Ver Catastro</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Responsive Grid Layout: Cards on Left, Telemetry Inspector on Right (PC) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
        {/* Left Column: Manzanas Grid (2 cols on tablet/desktop) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MANZANAS.map((m) => {
            const badge = getStatusBadge(m.status);
            const isSelected = selectedManzanaId === m.id;
            const Icon = badge.icon;

            return (
              <div
                key={m.id}
                onClick={() => handleSelectManzana(m.id)}
                className={`glass-card p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden touch-target-min ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900/90 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-[1.01]'
                    : 'border-surface-border hover:border-robles-500/40 hover:bg-slate-900/60'
                }`}
              >
                {/* SVG Hexagon Watermark */}
                <div className="absolute -right-4 -bottom-4 w-28 h-28 opacity-10 pointer-events-none text-emerald-400">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon
                      points="50 5, 95 25, 95 75, 50 95, 5 75, 5 25"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                <div className="relative z-10 space-y-3">
                  {/* Top: Manzana Title & Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-white text-xs">
                        {m.id}
                      </span>
                      <h3 className="text-base font-bold text-white">{m.name}</h3>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border flex items-center gap-1 ${badge.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.indicator}`} />
                      <span>{badge.text}</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate">
                    {m.callePrincipal}
                  </p>

                  {/* Metrics Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Solvencia de Cuotas</span>
                      <span className="font-mono font-bold text-white">{m.solvency}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          m.solvency >= 80
                            ? 'bg-emerald-500'
                            : m.solvency >= 65
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${m.solvency}%` }}
                      />
                    </div>
                  </div>

                  {/* Bottom Stats Pills */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <Building className="w-3.5 h-3.5 text-robles-400 shrink-0" />
                      <span>{m.parcelas} parcelas</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300 justify-end">
                      <Users className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{m.habitantes} hab.</span>
                    </div>
                  </div>

                  {/* Tap to inspect indicator (Mobile friendly) */}
                  <div className="lg:hidden flex items-center justify-between pt-1 text-[11px] text-robles-400 font-semibold">
                    <span>Toca para ver telemetría</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Manzana Inspector Telemetry (Desktop Sticky) */}
        <div className="hidden lg:block sticky top-[80px] space-y-4">
          <div className="glass-card border border-surface-border rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-robles-500/10 blur-[50px] pointer-events-none rounded-full" />

            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div>
                <span className="text-[10px] uppercase font-bold text-robles-400 tracking-wider">
                  Inspector Telemetría
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">{selectedManzana.name}</h3>
              </div>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold border ${getStatusBadge(selectedManzana.status).bg}`}>
                {getStatusBadge(selectedManzana.status).text}
              </span>
            </div>

            <div className="space-y-4 pt-4 text-xs">
              {/* Vía principal */}
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Ubicación y Calle</span>
                <p className="font-semibold text-white mt-0.5">{selectedManzana.callePrincipal}</p>
                <p className="text-[10px] text-slate-400">Sector Residencial Cerrado Los Robles</p>
              </div>

              {/* Indicadores de Servicio */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-bold">Subestación</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-white">{selectedManzana.transformador}</p>
                  <p className="text-[9px] text-slate-400">Voltaje nominal: 110V/220V</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span className="text-[10px] uppercase font-bold">Cumplimiento LOOU</span>
                  </div>
                  <p className="text-xs font-mono font-bold text-white">{selectedManzana.loouConformidad}%</p>
                  <p className="text-[9px] text-slate-400">Retiros & % construcción</p>
                </div>
              </div>

              {/* Solvencia Breakdown */}
              <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-400">Índice de Cobranza Mensual</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedManzana.solvency}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-robles-500 to-cyan-400 rounded-full"
                    style={{ width: `${selectedManzana.solvency}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  {Math.round((selectedManzana.parcelas * selectedManzana.solvency) / 100)} de {selectedManzana.parcelas} viviendas al día con el condominio.
                </p>
              </div>

              {/* Botón de acción directo */}
              <button
                onClick={() => onNavigate('catastro')}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-robles-500 to-cyan-500 hover:opacity-95 text-slate-950 font-bold text-xs transition active:scale-95 shadow-emerald-glow flex items-center justify-center gap-2"
              >
                <span>Explorar Parcelas de {selectedManzana.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Inspector Bottom Sheet / Modal */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileModalOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-[#0a1124] border-t sm:border border-surface-border rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl z-10 max-h-[85vh] overflow-y-auto safe-area-pb animate-fade-in space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <div>
                <span className="text-[10px] uppercase font-bold text-robles-400 tracking-wider">
                  Detalles de Manzana
                </span>
                <h3 className="text-lg font-extrabold text-white mt-0.5">{selectedManzana.name}</h3>
              </div>
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Calle Principal</span>
                <p className="font-bold text-white mt-0.5">{selectedManzana.callePrincipal}</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Parcelas</span>
                  <p className="text-base font-bold text-white font-mono">{selectedManzana.parcelas}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase block">Población</span>
                  <p className="text-base font-bold text-cyan-300 font-mono">{selectedManzana.habitantes} hab.</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Solvencia de Cuotas</span>
                  <span className="font-mono font-bold text-emerald-400">{selectedManzana.solvency}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${selectedManzana.solvency}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase block">Transformador Asignado</span>
                <p className="font-mono font-bold text-white mt-0.5">{selectedManzana.transformador}</p>
              </div>

              <button
                onClick={() => {
                  setIsMobileModalOpen(false);
                  onNavigate('catastro');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-robles-500 to-cyan-500 text-slate-950 font-extrabold text-xs transition active:scale-95 shadow-emerald-glow flex items-center justify-center gap-2"
              >
                <span>Ver Viviendas en Catastro</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="glass-card border border-surface-border p-3.5 sm:p-4 rounded-xl flex flex-wrap gap-4 sm:gap-6 items-center justify-center text-xs">
        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">Leyenda:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-slate-300 font-medium">Conforme (Solvente)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          <span className="text-slate-300 font-medium">En Observación (Deuda leve)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
          <span className="text-slate-300 font-medium">En Infracción (Deuda crítica)</span>
        </div>
      </div>
    </div>
  );
};
