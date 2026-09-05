"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  QrCode, 
  Calculator, 
  Building,
  Ruler
} from "lucide-react";
import { PARCELAS_LOS_ROBLES_DATA } from "../lib/data/mock-data";
import { ParcelaUrbanismo } from "../lib/types";
import { evaluarParametrosUrbanisticos } from "../lib/urbanismo/calculador";

import { exportarCatastroCSV } from "../lib/data/export-csv";
import { Download } from "lucide-react";
import { formatCedula, formatPhoneVE } from "../lib/utils/formatters";

interface CatastroViewProps {
  onSelectParcela: (parcela: ParcelaUrbanismo) => void;
  onOpenSolvenciaQR: (parcela: ParcelaUrbanismo) => void;
  onOpenSimulador: () => void;
}

export const CatastroView: React.FC<CatastroViewProps> = ({
  onSelectParcela,
  onOpenSolvenciaQR,
  onOpenSimulador
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedManzana, setSelectedManzana] = useState<string>("ALL");

  const filteredParcelas = PARCELAS_LOS_ROBLES_DATA.filter((p) => {
    const matchText = 
      p.numeroParcela.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.propietario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.propietario.cedula.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.calle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchManzana = selectedManzana === "ALL" || p.manzana === selectedManzana;

    return matchText && matchManzana;
  });

  return (
    <div className="space-y-4 pb-16 lg:pb-0">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">
            Catastro & Parámetros LOOU
          </h2>
          <p className="text-xs text-slate-400">
            Zonificación R-2, retiros reglamentarios y solvencias de la urbanización.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => exportarCatastroCSV(filteredParcelas)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700 active:scale-95"
            title="Exportar base catastral a Excel/CSV"
          >
            <Download className="w-3.5 h-3.5 text-robles-400" />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={onOpenSimulador}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-robles-500 to-cyan-500 text-slate-950 font-bold text-xs hover:opacity-95 transition active:scale-95"
          >
            <Calculator className="w-4 h-4 stroke-[2.5]" />
            <span>Validar Proyecto / Planos</span>
          </button>
        </div>
      </div>

      {/* Simple Search & Manzana Filter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar parcela, propietario o cédula..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-robles-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedManzana}
            onChange={(e) => setSelectedManzana(e.target.value)}
            className="w-full py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white focus:outline-none focus:border-robles-400"
          >
            <option value="ALL">Todas las Manzanas (A - F)</option>
            <option value="Manzana A">Manzana A</option>
            <option value="Manzana B">Manzana B</option>
            <option value="Manzana C">Manzana C</option>
            <option value="Manzana D">Manzana D</option>
            <option value="Manzana E">Manzana E</option>
            <option value="Manzana F">Manzana F</option>
          </select>
        </div>
      </div>

      {/* Parcel Cards List */}
      <div className="space-y-3">
        {filteredParcelas.map((parcela) => {
          const evalResult = evaluarParametrosUrbanisticos({
            areaTerrenoM2: parcela.areaTerrenoM2,
            areaConstruccionM2: parcela.areaConstruccionM2,
            porcentajeUbicacion: parcela.porcentajeUbicacion,
            plantasConstruidas: parcela.plantasConstruidas,
            zonificacion: parcela.zonificacion,
            retiroFrenteM: parcela.retiros.frenteM,
            retiroLateralIzqM: parcela.retiros.lateralIzqM,
            retiroLateralDerM: parcela.retiros.lateralDerM,
            retiroFondoM: parcela.retiros.fondoM,
            areaPermeableM2: parcela.areaPermeableM2,
            tanqueSubterraneoLitros: parcela.servicios.tanqueSubterraneoLitros,
            numeroHabitantes: parcela.familia?.miembros.length || 4,
          });

          const isConforme = evalResult.cumple;

          return (
            <div
              key={parcela.id}
              className="p-4 rounded-xl glass-card border border-surface-border space-y-3"
            >
              {/* Top info */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-extrabold text-white font-mono bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-700">
                      {parcela.numeroParcela}
                    </span>
                    <span className="text-xs font-semibold text-slate-200">{parcela.manzana} · {parcela.calle}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {parcela.propietario.nombre} · <span className="font-mono">{formatCedula(parcela.propietario.cedula)}</span>
                  </p>
                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0 ${
                    isConforme ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
                  }`}
                >
                  {isConforme ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  <span>{isConforme ? "Conforme LOOU" : "Observada"}</span>
                </span>
              </div>

              {/* Parameters Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">Retiro Frente:</span>
                  <span className="font-mono font-bold text-white">{parcela.retiros.frenteM} m</span>
                  <span className="text-[9px] text-slate-500 block">Exigido: ≥ 4.0m</span>
                </div>

                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">Retiro Fondo:</span>
                  <span className="font-mono font-bold text-white">{parcela.retiros.fondoM} m</span>
                  <span className="text-[9px] text-slate-500 block">Exigido: ≥ 3.0m</span>
                </div>

                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">Ubicación / Const:</span>
                  <span className="font-mono font-bold text-white">{parcela.porcentajeUbicacion}% / {parcela.porcentajeConstruccion}%</span>
                  <span className="text-[9px] text-slate-500 block">{parcela.areaTerrenoM2} m²</span>
                </div>

                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="text-slate-400 block text-[9px]">Tanque COVENIN:</span>
                  <span className="font-mono font-bold text-cyan-300">{parcela.servicios.tanqueSubterraneoLitros} L</span>
                  <span className="text-[9px] text-slate-500 block">{evalResult.dotacionAgua.autonomiaDias} días</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800">
                <button
                  onClick={() => onOpenSolvenciaQR(parcela)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
                >
                  <QrCode className="w-3.5 h-3.5 text-robles-400" />
                  <span>Solvencia QR</span>
                </button>

                <button
                  onClick={() => onSelectParcela(parcela)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-robles-500 hover:bg-robles-400 text-slate-950 font-bold text-xs transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ver Ficha</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
