"use client";

import React, { useState } from "react";
import { X, Calculator, CheckCircle2, AlertTriangle, Scale, Droplet, Building, Info } from "lucide-react";
import { Zonificacion } from "../lib/types";
import { evaluarParametrosUrbanisticos, PARAMETROS_NORMATIVOS_VENEZUELA } from "../lib/urbanismo/calculador";

interface SimuladorNormativoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimuladorNormativoModal: React.FC<SimuladorNormativoModalProps> = ({ isOpen, onClose }) => {
  const [zonificacion, setZonificacion] = useState<Zonificacion>("R2_BIFAMILIAR");
  const [areaTerreno, setAreaTerreno] = useState<number>(250);
  const [areaConstruccion, setAreaConstruccion] = useState<number>(180);
  const [areaUbicacion, setAreaUbicacion] = useState<number>(150);
  const [plantas, setPlantas] = useState<number>(2);
  const [retiroFrente, setRetiroFrente] = useState<number>(4.0);
  const [retiroLateralIzq, setRetiroLateralIzq] = useState<number>(2.0);
  const [retiroLateralDer, setRetiroLateralDer] = useState<number>(2.0);
  const [retiroFondo, setRetiroFondo] = useState<number>(3.0);
  const [areaPermeable, setAreaPermeable] = useState<number>(45);
  const [tanqueAgua, setTanqueAgua] = useState<number>(8000);
  const [habitantes, setHabitantes] = useState<number>(4);

  if (!isOpen) return null;

  const resultado = evaluarParametrosUrbanisticos({
    areaTerrenoM2: areaTerreno,
    areaConstruccionM2: areaConstruccion,
    areaUbicacionM2: areaUbicacion,
    plantasConstruidas: plantas,
    zonificacion,
    retiroFrenteM: retiroFrente,
    retiroLateralIzqM: retiroLateralIzq,
    retiroLateralDerM: retiroLateralDer,
    retiroFondoM: retiroFondo,
    areaPermeableM2: areaPermeable,
    tanqueSubterraneoLitros: tanqueAgua,
    numeroHabitantes: habitantes,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl glass-card rounded-3xl border border-robles-500/30 p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-robles-500 to-cyan-500 text-slate-950 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Simulador de Cumplimiento Urbanístico Venezolano</h3>
              <p className="text-xs text-slate-400">Verifica planos y remodelaciones según la Ley LOOU y Normas COVENIN 4044</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          {/* Zonificación */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Zonificación:</label>
            <select
              value={zonificacion}
              onChange={(e) => setZonificacion(e.target.value as Zonificacion)}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:border-robles-400"
            >
              <option value="R1_UNIFAMILIAR">R-1 (Unifamiliar Exclusiva)</option>
              <option value="R2_BIFAMILIAR">R-2 (Los Robles - Bifamiliar)</option>
              <option value="R3_MULTIFAMILIAR">R-3 (Multifamiliar)</option>
              <option value="C1_COMERCIAL_LOCAL">C-1 (Comercial Comunal)</option>
            </select>
          </div>

          {/* Área Terreno */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Área Terreno (m²):</label>
            <input
              type="number"
              value={areaTerreno}
              onChange={(e) => setAreaTerreno(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
            />
          </div>

          {/* Área Construcción */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Área Construcción (m²):</label>
            <input
              type="number"
              value={areaConstruccion}
              onChange={(e) => setAreaConstruccion(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
            />
          </div>

          {/* Retiro Frente */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Retiro Frente (m):</label>
            <input
              type="number"
              step="0.1"
              value={retiroFrente}
              onChange={(e) => setRetiroFrente(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
            />
          </div>

          {/* Retiro Lateral Izq */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Retiro Lateral Izq (m):</label>
            <input
              type="number"
              step="0.1"
              value={retiroLateralIzq}
              onChange={(e) => setRetiroLateralIzq(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
            />
          </div>

          {/* Retiro Lateral Der */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Retiro Lateral Der (m):</label>
            <input
              type="number"
              step="0.1"
              value={retiroLateralDer}
              onChange={(e) => setRetiroLateralDer(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
            />
          </div>

          {/* Retiro Fondo */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Retiro de Fondo (m):</label>
            <input
              type="number"
              step="0.1"
              value={retiroFondo}
              onChange={(e) => setRetiroFondo(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
            />
          </div>

          {/* Tanque de Agua */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Tanque Subterráneo (L):</label>
            <input
              type="number"
              step="500"
              value={tanqueAgua}
              onChange={(e) => setTanqueAgua(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-cyan-300"
            />
          </div>

          {/* Habitantes Estimados */}
          <div>
            <label className="text-slate-300 font-semibold block mb-1">N° de Habitantes:</label>
            <input
              type="number"
              value={habitantes}
              onChange={(e) => setHabitantes(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
            />
          </div>
        </div>

        {/* Evaluation Score & Results */}
        <div className={`p-5 rounded-2xl border ${resultado.cumple ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-amber-950/30 border-amber-500/40'} space-y-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {resultado.cumple ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              )}
              <div>
                <h4 className="text-base font-bold text-white">
                  {resultado.cumple ? "¡Proyecto 100% Conforme a la LOOU!" : "Se detectaron observaciones normativas"}
                </h4>
                <p className="text-xs text-slate-300">
                  Puntaje de Conformidad: <strong className="font-mono text-robles-400">{resultado.puntajeConformidad}%</strong>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Dotación COVENIN:</span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                {resultado.dotacionAgua.autonomiaDias} días de reserva
              </span>
            </div>
          </div>

          {resultado.observaciones.length > 0 ? (
            <div className="space-y-1 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <span className="font-bold text-amber-300 block">Ajustes requeridos para aprobación:</span>
              <ul className="list-disc list-inside space-y-1 text-[11px] pl-1">
                {resultado.observaciones.map((obs, idx) => (
                  <li key={idx}>{obs}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xs text-emerald-300 pt-2 border-t border-emerald-500/20">
              Todos los retiros de frente (≥ {PARAMETROS_NORMATIVOS_VENEZUELA[zonificacion].retiroFrenteMinM} m), 
              laterales (≥ {PARAMETROS_NORMATIVOS_VENEZUELA[zonificacion].retiroLateralMinM} m), 
              fondo (≥ {PARAMETROS_NORMATIVOS_VENEZUELA[zonificacion].retiroFondoMinM} m) y dotación sanitaria son conformes.
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-robles-500 hover:bg-robles-400 text-slate-950 font-bold text-xs transition"
          >
            Entendido / Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
