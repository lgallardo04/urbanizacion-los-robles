"use client";

import React from "react";
import { BookOpenCheck, Scale, ShieldCheck, CheckCircle2, FileText, Info, Award } from "lucide-react";
import { PARAMETROS_NORMATIVOS_VENEZUELA } from "../lib/urbanismo/calculador";

export const NormativaView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="glass-card p-6 rounded-2xl border border-surface-border">
        <div className="flex items-center gap-2 text-robles-400 font-semibold text-xs mb-1">
          <Scale className="w-4 h-4" />
          <span>Marco Jurídico y Normativo de Urbanismo en Venezuela</span>
        </div>
        <h2 className="text-xl lg:text-2xl font-extrabold text-white">
          Parámetros Legales del Urbanismo Venezolano
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Compendio de regulaciones aplicables a la Urbanización Los Robles (Municipio Araure, Estado Portuguesa).
        </p>
      </div>

      {/* Main Laws Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-surface-border space-y-2.5">
          <div className="flex items-center gap-2 text-robles-400 font-bold text-sm">
            <BookOpenCheck className="w-4 h-4" />
            <span>LOOU (Gaceta N° 33.868)</span>
          </div>
          <h4 className="text-sm font-bold text-white">Ley Orgánica de Ordenación Urbanística</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Regula el uso del suelo, densidades residenciales, áreas verdes mínimas, vialidad y la obligación de respetar retiros de frente, lateral y fondo para ventilación, asoleamiento y seguridad contra incendios.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-surface-border space-y-2.5">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Norma COVENIN / G.O. 4.044</span>
          </div>
          <h4 className="text-sm font-bold text-white">Normas Sanitarias para Edificaciones</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Establece la dotación de agua potable requerida (200 a 300 L/hab/día), capacidad de tanques de reserva subterráneos con autonomía mínima de 48 a 72 horas, y sistemas hidroneumáticos.
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-surface-border space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>LORLOCC & Propiedad Horizontal</span>
          </div>
          <h4 className="text-sm font-bold text-white">Ley de Consejos Comunales & Vecinos</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Establece el censo demográfico obligatorio, las asambleas de propietarios, la aprobación de fondos de mantenimiento comunal y la convivencia vecinal.
          </p>
        </div>
      </div>

      {/* Comparison Table by Zoning */}
      <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-robles-400" />
          <span>Tabla Comparativa de Parámetros Urbanísticos por Zonificación</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/60">
                <th className="p-3 font-semibold">Zonificación</th>
                <th className="p-3 font-semibold">Retiro Frente</th>
                <th className="p-3 font-semibold">Retiro Lateral</th>
                <th className="p-3 font-semibold">Retiro Fondo</th>
                <th className="p-3 font-semibold">% Ubicación Máx.</th>
                <th className="p-3 font-semibold">% Const. Máx.</th>
                <th className="p-3 font-semibold">Dotación Agua</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {Object.entries(PARAMETROS_NORMATIVOS_VENEZUELA).map(([key, item]) => {
                const isR2 = key === "R2_BIFAMILIAR";
                return (
                  <tr key={key} className={isR2 ? "bg-robles-500/10 font-medium" : "hover:bg-slate-900/40"}>
                    <td className="p-3">
                      <div className="flex items-center gap-1.5">
                        {isR2 && <span className="w-1.5 h-1.5 rounded-full bg-robles-400" />}
                        <span className={isR2 ? "text-robles-400 font-bold" : "text-white"}>{item.nombre}</span>
                      </div>
                    </td>
                    <td className="p-3 font-mono">≥ {item.retiroFrenteMinM} m</td>
                    <td className="p-3 font-mono">≥ {item.retiroLateralMinM} m</td>
                    <td className="p-3 font-mono">≥ {item.retiroFondoMinM} m</td>
                    <td className="p-3 font-mono">≤ {item.porcentajeUbicacionMax}%</td>
                    <td className="p-3 font-mono">≤ {item.porcentajeConstruccionMax}%</td>
                    <td className="p-3 font-mono">{item.dotacionLitrosPorHabitanteDia} L/hab/día</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-400">
          * La <strong>Urbanización Los Robles</strong> está catalogada como <strong>Zonificación R-2 (Residencial Bifamiliar)</strong> según el Plan de Desarrollo Urbano Local (PDUL) de Araure.
        </p>
      </div>
    </div>
  );
};
