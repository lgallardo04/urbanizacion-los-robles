"use client";

import React from "react";
import { TreePine, Droplet, Zap, Calculator, Megaphone, Sparkles, Menu } from "lucide-react";
import { SemaforoServicios } from "../lib/types";

interface HeaderProps {
  semaforo: SemaforoServicios;
  onOpenSimulador: () => void;
  onOpenComunicados?: () => void;
  onOpenAsistente?: () => void;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  semaforo, 
  onOpenSimulador,
  onOpenComunicados,
  onOpenAsistente,
  onToggleMobileMenu
}) => {
  return (
    <header className="sticky top-0 z-30 w-full glass-nav px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 border-b border-surface-border">
      {/* Brand & Mobile Hamburger */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition active:scale-95 touch-target-min flex items-center justify-center"
            aria-label="Abrir menú"
          >
            <Menu className="w-4 h-4 text-robles-400" />
          </button>
        )}

        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-robles-500 to-cyan-500 text-slate-950 flex items-center justify-center shadow-emerald-glow shrink-0">
          <TreePine className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-xs sm:text-base font-bold text-white flex items-center gap-1.5 leading-tight">
            Los Robles
            <span className="text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded font-medium bg-robles-500/15 text-robles-400 border border-robles-500/30">
              Araure
            </span>
          </h1>
          <p className="text-[10px] text-slate-400 hidden sm:block">
            Urbanismo & Censo Comunal
          </p>
        </div>
      </div>

      {/* Real-time Status Badges & Quick Action */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Agua */}
        <div 
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-[11px]"
          title="Nivel de Tanque Comunal (180.000 L)"
        >
          <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="font-semibold text-cyan-300 font-mono">
            {semaforo.agua.nivelTanqueComunalPorcentaje}%
          </span>
        </div>

        {/* Luz */}
        <div 
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-900/80 border border-robles-500/30 text-[11px]"
          title="Voltaje Promedio CORPOELEC"
        >
          <Zap className="w-3.5 h-3.5 text-robles-400 shrink-0" />
          <span className="font-semibold text-robles-300 font-mono">
            {semaforo.electricidad.voltajePromedio}V
          </span>
        </div>

        {/* Cartelera button */}
        {onOpenComunicados && (
          <button
            onClick={onOpenComunicados}
            className="p-1.5 rounded-lg bg-slate-900 border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition text-xs flex items-center gap-1"
            title="Ver Cartelera Digital Comunal"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-bold">Avisos</span>
          </button>
        )}

        {/* Asistente IA Copilot button */}
        {onOpenAsistente && (
          <button
            onClick={onOpenAsistente}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-robles-500/15 border border-robles-500/30 text-robles-300 hover:bg-robles-500/25 transition text-xs font-bold"
            title="Abrir Asistente Urbanístico IA"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Copilot</span>
          </button>
        )}

        {/* Simulador button */}
        <button
          onClick={onOpenSimulador}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-robles-500 to-cyan-600 text-slate-950 font-bold text-xs hover:opacity-95 transition active:scale-95 shadow-emerald-glow"
        >
          <Calculator className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Validar LOOU</span>
        </button>
      </div>
    </header>
  );
};
