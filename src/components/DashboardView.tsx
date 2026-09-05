"use client";

import React from "react";
import { 
  Users, 
  Home, 
  Droplet, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Scale,
  Activity,
  HeartPulse,
  MapPin
} from "lucide-react";
import { ESTADISTICAS_URBANISMO_ROBLES, PARCELAS_LOS_ROBLES_DATA, SEMAFORO_SERVICIOS_LOS_ROBLES } from "../lib/data/mock-data";
import { TabType } from "./Sidebar";
import { ParcelaUrbanismo } from "../lib/types";

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
  onSelectParcela: (parcela: ParcelaUrbanismo) => void;
  onOpenSimulador: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
  onNavigate, 
  onSelectParcela,
  onOpenSimulador 
}) => {
  const stats = ESTADISTICAS_URBANISMO_ROBLES;
  const semaforo = SEMAFORO_SERVICIOS_LOS_ROBLES;

  return (
    <div className="space-y-4 sm:space-y-6 pb-16 lg:pb-0">
      {/* Welcome Banner */}
      <div className="p-4 sm:p-6 rounded-2xl glass-card border border-robles-500/30 bg-gradient-to-r from-slate-900 via-surface-card to-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-robles-400">
            Resumen General de la Comunidad
          </span>
          <h2 className="text-lg sm:text-2xl font-extrabold text-white">
            Urbanización Los Robles
          </h2>
          <p className="text-xs text-slate-300">
            Control de parcelas, normas LOOU y censo comunal en tiempo real.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <button
            onClick={() => onNavigate('mapa')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 text-emerald-300 font-bold text-xs hover:bg-slate-700 transition border border-emerald-500/30 active:scale-95 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mapa Manzanas</span>
          </button>

          <button
            onClick={() => onNavigate('catastro')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-robles-500 text-slate-950 font-bold text-xs hover:bg-robles-400 transition active:scale-95 shadow-emerald-glow"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Parcelas</span>
          </button>

          <button
            onClick={() => onNavigate('garita')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 text-cyan-300 font-bold text-xs hover:bg-slate-700 transition border border-cyan-500/30 active:scale-95"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Garita RFID</span>
          </button>

          <button
            onClick={() => onNavigate('incidencias')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 text-amber-300 font-bold text-xs hover:bg-slate-700 transition border border-amber-500/30 active:scale-95"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Averías</span>
          </button>

          <button
            onClick={onOpenSimulador}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 transition border border-slate-700 active:scale-95"
          >
            <Scale className="w-3.5 h-3.5 text-robles-400" />
            <span>Validar LOOU</span>
          </button>
        </div>
      </div>

      {/* 4 KPIs: 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Habitantes */}
        <div 
          onClick={() => onNavigate('censo')}
          className="glass-card p-3.5 sm:p-4 rounded-xl border border-surface-border cursor-pointer hover:border-robles-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Población</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1.5">
            {stats.poblacionTotalHabitantes}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">{stats.totalFamilias} Familias (91%)</p>
        </div>

        {/* Conformidad LOOU */}
        <div 
          onClick={() => onNavigate('catastro')}
          className="glass-card p-3.5 sm:p-4 rounded-xl border border-surface-border cursor-pointer hover:border-robles-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Conforme LOOU</span>
            <CheckCircle2 className="w-4 h-4 text-robles-400" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-robles-400 font-mono mt-1.5">
            {stats.conformidadUrbanistica.porcentajeConformidad}%
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">{stats.conformidadUrbanistica.conformesTotal} de 320 parcelas</p>
        </div>

        {/* Agua Tanque Comunal */}
        <div 
          onClick={() => onNavigate('servicios')}
          className="glass-card p-3.5 sm:p-4 rounded-xl border border-surface-border cursor-pointer hover:border-robles-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Tanque Comunal</span>
            <Droplet className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono mt-1.5">
            {semaforo.agua.nivelTanqueComunalPorcentaje}%
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Pozo N°2 (180.000 L)</p>
        </div>

        {/* Solvencia Condominio */}
        <div 
          onClick={() => onNavigate('condominio')}
          className="glass-card p-3.5 sm:p-4 rounded-xl border border-surface-border cursor-pointer hover:border-robles-500/40 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-xs text-slate-400 uppercase font-semibold">Solvencia</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-1.5">
            {stats.condominio.solvenciaPorcentaje}%
          </p>
          <p className="text-[10px] text-robles-400 font-mono mt-0.5">Fondo: ${stats.condominio.fondosReservaUsd}</p>
        </div>
      </div>

      {/* Semáforo de Servicios en Tiempo Real */}
      <div className="glass-card p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">Estado de Servicios Públicos</h3>
          </div>
          <button
            onClick={() => onNavigate('servicios')}
            className="text-xs text-robles-400 hover:text-robles-300 font-semibold flex items-center gap-1"
          >
            <span>Ver todo</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Agua */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white flex items-center gap-1">
                <Droplet className="w-3 h-3 text-cyan-400" /> Agua
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">24/7 · {semaforo.agua.presionRedPsi} PSI</p>
          </div>

          {/* Luz */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> CORPOELEC
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">{semaforo.electricidad.voltajePromedio}V · 6 TX OK</p>
          </div>

          {/* Gas */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" /> Gas GLP
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-400" />
            </div>
            <p className="text-[10px] text-slate-400 truncate">18 Septiembre</p>
          </div>

          {/* Aseo */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white flex items-center gap-1">
                <Truck className="w-3 h-3 text-robles-400" /> Aseo
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <p className="text-[10px] text-slate-400 truncate">Mar / Vie (07:00 AM)</p>
          </div>
        </div>
      </div>

      {/* Parcelas Recientes */}
      <div className="glass-card p-4 sm:p-5 rounded-2xl border border-surface-border space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-white">Parcelas & Fichas Urbanísticas</h3>
          <button
            onClick={() => onNavigate('catastro')}
            className="text-xs text-robles-400 hover:text-robles-300 font-semibold flex items-center gap-1"
          >
            <span>Ver Catastro</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PARCELAS_LOS_ROBLES_DATA.slice(0, 4).map((parcela) => {
            const isConforme = parcela.estatusNormativo === 'CONFORME_TOTAL';
            return (
              <div
                key={parcela.id}
                onClick={() => onSelectParcela(parcela)}
                className="p-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-robles-500/40 transition cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white font-mono">
                    {parcela.numeroParcela} · {parcela.manzana}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                      isConforme ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {isConforme ? "Conforme" : "Observada"}
                  </span>
                </div>
                <p className="text-xs text-slate-300 truncate font-medium">{parcela.propietario.nombre}</p>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-800">
                  <span>Frente: {parcela.retiros.frenteM}m</span>
                  <span>Tanque: {parcela.servicios.tanqueSubterraneoLitros}L</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
