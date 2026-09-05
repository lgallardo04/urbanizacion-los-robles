import React, { useState } from 'react';
import { TabType } from './Sidebar';
import { Map, AlertTriangle, CheckCircle, Info, MapPin } from 'lucide-react';
import { PARCELAS_LOS_ROBLES_DATA, ESTADISTICAS_URBANISMO_ROBLES } from '../lib/data/mock-data';

interface MapaUrbanismoViewProps {
  onNavigate: (tab: TabType) => void;
}

const MANZANAS = [
  { id: 'A', name: 'Manzana A', status: 'CONFORME', parcelas: 12, solvency: 95 },
  { id: 'B', name: 'Manzana B', status: 'OBSERVACION', parcelas: 15, solvency: 70 },
  { id: 'C', name: 'Manzana C', status: 'INFRACCION', parcelas: 10, solvency: 40 },
  { id: 'D', name: 'Manzana D', status: 'CONFORME', parcelas: 14, solvency: 100 },
  { id: 'E', name: 'Manzana E', status: 'OBSERVACION', parcelas: 12, solvency: 65 },
  { id: 'F', name: 'Manzana F', status: 'CONFORME', parcelas: 18, solvency: 85 },
];

export const MapaUrbanismoView: React.FC<MapaUrbanismoViewProps> = ({ onNavigate }) => {
  const [selectedManzana, setSelectedManzana] = useState<string | null>(null);

  const getStatusColors = (status: string) => {
    switch (status) {
      case 'CONFORME':
        return 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400';
      case 'OBSERVACION':
        return 'bg-amber-500/10 border-amber-500/50 text-amber-400';
      case 'INFRACCION':
        return 'bg-rose-500/10 border-rose-500/50 text-rose-400';
      default:
        return 'bg-slate-500/10 border-slate-500/50 text-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFORME':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'OBSERVACION':
        return <Info className="w-5 h-5 text-amber-400" />;
      case 'INFRACCION':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      default:
        return <Map className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in pb-8">
      {/* Header */}
      <div className="glass-card border-surface-border p-6 rounded-2xl flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] -z-10 rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[80px] -z-10 rounded-full pointer-events-none" />
        
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Map className="w-7 h-7 text-emerald-400" />
            Mapa Urbanístico Interactivo
          </h1>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Urbanización Los Robles, Araure - Estado Portuguesa
          </p>
        </div>
      </div>

      {/* Grid de Manzanas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MANZANAS.map((manzana) => {
          const colors = getStatusColors(manzana.status);
          const isSelected = selectedManzana === manzana.id;

          return (
            <div
              key={manzana.id}
              onClick={() => setSelectedManzana(isSelected ? null : manzana.id)}
              className={`glass-card rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden relative ${
                isSelected ? 'border-cyan-500 scale-[1.02] shadow-[0_0_20px_rgba(6,182,212,0.2)]' : colors
              }`}
            >
              {/* SVG Hexagon Shape for the map look */}
              <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full p-4">
                  <polygon points="50 5, 95 25, 95 75, 50 95, 5 75, 5 25" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>

              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{manzana.name}</h3>
                  {getStatusIcon(manzana.status)}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg">
                    <span className="text-slate-400 text-sm">Parcelas Totales</span>
                    <span className="text-white font-semibold">{manzana.parcelas}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-slate-900/50 p-3 rounded-lg">
                    <span className="text-slate-400 text-sm">Solvencia</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${manzana.solvency >= 80 ? 'bg-emerald-500' : manzana.solvency >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${manzana.solvency}%` }}
                        />
                      </div>
                      <span className="text-white font-semibold">{manzana.solvency}%</span>
                    </div>
                  </div>
                </div>

                {/* Detalles expandidos al hacer clic */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-slate-700/50 animate-fade-in">
                    <p className="text-sm text-slate-300 mb-3">
                      Estado general: <strong className={colors.split(' ')[2]}>{manzana.status}</strong>
                    </p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('catastro');
                      }}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors border border-slate-600"
                    >
                      Ver Detalles de Parcelas
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="glass-card border-surface-border p-4 rounded-xl flex flex-wrap gap-6 items-center justify-center mt-4">
        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Leyenda:</span>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          <span className="text-sm text-slate-300">Conforme (Solvente)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
          <span className="text-sm text-slate-300">En Observación (Deuda leve)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
          <span className="text-sm text-slate-300">En Infracción (Deuda crítica)</span>
        </div>
      </div>
    </div>
  );
};
