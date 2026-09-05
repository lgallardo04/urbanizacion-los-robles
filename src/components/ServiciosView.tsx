"use client";

import React from "react";
import { 
  Droplet, 
  Zap, 
  Flame, 
  Truck, 
  ShieldCheck, 
  Radio, 
  Activity, 
  Wrench, 
  CheckCircle2, 
  AlertCircle,
  Gauge,
  Layers
} from "lucide-react";
import { SEMAFORO_SERVICIOS_LOS_ROBLES } from "../lib/data/mock-data";

export const ServiciosView: React.FC = () => {
  const semaforo = SEMAFORO_SERVICIOS_LOS_ROBLES;

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="glass-card p-6 rounded-2xl border border-surface-border">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
          <Activity className="w-4 h-4" />
          <span>Infraestructura & Redes de Servicios</span>
        </div>
        <h2 className="text-xl lg:text-2xl font-extrabold text-white">
          Monitoreo de Servicios Públicos e Infraestructura Comunal
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Control del sistema hidroneumático comunal, pozo profundo, banco de transformadores CORPOELEC y rutas de recolección.
        </p>
      </div>

      {/* Main Grid: Deep dive into each service */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agua Potable Comunal */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Red de Agua Potable & Pozo Comunal</h3>
                <p className="text-xs text-slate-400">Hidroportuguesa + Pozo N° 2 (15 HP)</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              OPERATIVO 24/7
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Nivel de Almacenamiento Comunal:</span>
                <span className="font-bold text-cyan-400 font-mono">
                  {semaforo.agua.nivelTanqueComunalPorcentaje}% ({(semaforo.agua.capacidadTanqueComunalLitros * 0.82).toLocaleString()} / {semaforo.agua.capacidadTanqueComunalLitros.toLocaleString()} L)
                </span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${semaforo.agua.nivelTanqueComunalPorcentaje}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Presión en Matriz:</span>
                <span className="text-sm font-bold font-mono text-white">{semaforo.agua.presionRedPsi} PSI</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Autonomía estimada:</span>
                <span className="text-sm font-bold font-mono text-cyan-300">4.5 Días</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-robles-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Norma Sanitaria COVENIN 4044 Cumplida:</span>
              </div>
              <p className="text-[11px] text-slate-400">
                El urbanismo cuenta con dotación garantizada de 250 L/hab/día gracias al sistema dual de bombeo y tanque pulmón.
              </p>
            </div>
          </div>
        </div>

        {/* Electricidad & Alumbrado CORPOELEC */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Red Eléctrica & Banco de Transformadores</h3>
                <p className="text-xs text-slate-400">CORPOELEC Troncal 13.8 kV / Circuito San José</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              VOLTAJE ESTABLE
            </span>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Voltaje Fase:</span>
                <span className="text-sm font-bold font-mono text-robles-400">{semaforo.electricidad.voltajePromedio} V</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Bancos TX:</span>
                <span className="text-sm font-bold font-mono text-white">6 / 6 Activos</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Frecuencia:</span>
                <span className="text-sm font-bold font-mono text-white">{semaforo.electricidad.frecuenciaHz} Hz</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-200 block">Distribución de Transformadores por Manzana:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                  <span>TX-01 (Manzana A-B):</span>
                  <span className="text-robles-400 font-mono font-semibold">75 kVA (62%)</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                  <span>TX-02 (Manzana C-D):</span>
                  <span className="text-robles-400 font-mono font-semibold">75 kVA (68%)</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                  <span>TX-03 (Manzana E-F):</span>
                  <span className="text-robles-400 font-mono font-semibold">75 kVA (59%)</span>
                </div>
                <div className="flex items-center justify-between p-1.5 rounded bg-slate-800/60">
                  <span>TX-04 (Bomba Pozo):</span>
                  <span className="text-cyan-400 font-mono font-semibold">50 kVA (45%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gas Comunal */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Gas Comunal (GLP)</h3>
                <p className="text-xs text-slate-400">PDVSA Gas Comunal · Cilindros 10kg, 18kg y 43kg</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
              PROGRAMADO
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Próxima Jornada de Distribución:</span>
              <span className="font-bold text-white font-mono">{semaforo.gas.proximaJornada}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Cilindros Solicitados en Censo:</span>
              <span className="font-bold text-orange-400 font-mono">{semaforo.gas.cilindrosPendientes} bombonas</span>
            </div>
          </div>
        </div>

        {/* Seguridad & Portón Automatizado */}
        <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Seguridad Perimetral & Control de Acceso</h3>
                <p className="text-xs text-slate-400">Portón Eléctrico RFID + Circuito Cerrado CCTV</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              ACTIVO
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Portón Vehicular:</span>
              <span className="font-bold text-white">Operativo Automático</span>
              <span className="text-[10px] text-robles-400 block mt-0.5">380 Tags RFID asignados</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Cámaras CCTV:</span>
              <span className="font-bold text-white">16 / 16 en línea</span>
              <span className="text-[10px] text-cyan-400 block mt-0.5">Grabación 30 días NVR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
