"use client";

import React from "react";
import { 
  X, 
  Building, 
  Ruler, 
  Droplet, 
  Zap, 
  Flame, 
  Users, 
  Car, 
  Dog, 
  CheckCircle2, 
  AlertTriangle,
  QrCode,
  ShieldCheck,
  FileCheck
} from "lucide-react";
import { ParcelaUrbanismo } from "../lib/types";
import { evaluarParametrosUrbanisticos } from "../lib/urbanismo/calculador";
import { formatCedula, formatPhoneVE } from "../lib/utils/formatters";

interface FichaParcelaModalProps {
  parcela: ParcelaUrbanismo | null;
  onClose: () => void;
  onOpenSolvencia: (parcela: ParcelaUrbanismo) => void;
}

export const FichaParcelaModal: React.FC<FichaParcelaModalProps> = ({ 
  parcela, 
  onClose,
  onOpenSolvencia 
}) => {
  if (!parcela) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl glass-card rounded-3xl border border-robles-500/40 p-6 sm:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-robles-500 to-cyan-500 text-slate-950 flex items-center justify-center font-extrabold font-mono text-lg shadow-emerald-glow">
              {parcela.numeroParcela}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  Ficha Catastral & Urbanística · {parcela.numeroParcela}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-robles-500/20 text-robles-400 border border-robles-500/30">
                  {parcela.manzana}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                {parcela.codigoCatastral} · {parcela.calle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Legal & Property Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Propietario Legal:</span>
            <p className="text-sm font-bold text-white mt-0.5">{parcela.propietario.nombre}</p>
            <p className="text-slate-400 font-mono mt-0.5">{formatCedula(parcela.propietario.cedula)}</p>
            <p className="text-slate-400 mt-0.5">{formatPhoneVE(parcela.propietario.telefono)}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Zonificación & Uso:</span>
            <p className="text-sm font-bold text-robles-400 mt-0.5">{parcela.zonificacion}</p>
            <p className="text-slate-300 mt-0.5">{parcela.tipoInmueble.replace('_', ' ')}</p>
            <p className="text-slate-400 mt-0.5">{parcela.plantasConstruidas} Plantas Construidas</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <span className="text-slate-500 block text-[10px] uppercase">Dimensiones del Inmueble:</span>
            <p className="text-sm font-bold text-white mt-0.5 font-mono">Terreno: {parcela.areaTerrenoM2} m²</p>
            <p className="text-slate-300 font-mono mt-0.5">Construcción: {parcela.areaConstruccionM2} m²</p>
            <p className="text-cyan-400 font-mono mt-0.5">Verde Permeable: {parcela.areaPermeableM2} m²</p>
          </div>
        </div>

        {/* Section 2: LOOU Compliance Checklist */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Ruler className="w-4 h-4 text-robles-400" />
              <span>Verificación de Retiros y Densidad LOOU</span>
            </h4>
            <span className="text-xs font-mono font-bold text-robles-400">
              Puntaje: {evalResult.puntajeConformidad}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className={`p-3 rounded-xl border ${evalResult.retiros.frente.cumple ? 'bg-slate-900 border-slate-800' : 'bg-rose-950/40 border-rose-500/40'}`}>
              <span className="text-slate-400 text-[10px] block">Retiro Frente:</span>
              <span className="font-bold font-mono text-white text-sm">{parcela.retiros.frenteM} m</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Mín: {evalResult.retiros.frente.minimo} m</span>
            </div>

            <div className={`p-3 rounded-xl border ${evalResult.retiros.lateralIzq.cumple ? 'bg-slate-900 border-slate-800' : 'bg-rose-950/40 border-rose-500/40'}`}>
              <span className="text-slate-400 text-[10px] block">Retiro Lateral Izq:</span>
              <span className="font-bold font-mono text-white text-sm">{parcela.retiros.lateralIzqM} m</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Mín: {evalResult.retiros.lateralIzq.minimo} m</span>
            </div>

            <div className={`p-3 rounded-xl border ${evalResult.retiros.lateralDer.cumple ? 'bg-slate-900 border-slate-800' : 'bg-rose-950/40 border-rose-500/40'}`}>
              <span className="text-slate-400 text-[10px] block">Retiro Lateral Der:</span>
              <span className="font-bold font-mono text-white text-sm">{parcela.retiros.lateralDerM} m</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Mín: {evalResult.retiros.lateralDer.minimo} m</span>
            </div>

            <div className={`p-3 rounded-xl border ${evalResult.retiros.fondo.cumple ? 'bg-slate-900 border-slate-800' : 'bg-rose-950/40 border-rose-500/40'}`}>
              <span className="text-slate-400 text-[10px] block">Retiro Fondo:</span>
              <span className="font-bold font-mono text-white text-sm">{parcela.retiros.fondoM} m</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Mín: {evalResult.retiros.fondo.minimo} m</span>
            </div>
          </div>
        </div>

        {/* Section 3: Servicios & COVENIN Water */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Droplet className="w-4 h-4 text-cyan-400" />
            <span>Servicios Sanitarios & Redes Eléctricas</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Tanque Subterráneo COVENIN:</span>
              <span className="font-bold font-mono text-cyan-300 text-sm">{parcela.servicios.tanqueSubterraneoLitros.toLocaleString()} L</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{parcela.servicios.hidroneumatico ? 'Con Hidroneumático' : 'Gravedad'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Acometida Eléctrica:</span>
              <span className="font-bold font-mono text-robles-400 text-sm">{parcela.servicios.tensionElectrica}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Breaker {parcela.servicios.capacidadBreakerAmp}A · {parcela.servicios.protectorVoltaje ? 'Con Protector' : 'Sin Protector'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 text-[10px] block">Gas & Telecomunicaciones:</span>
              <span className="font-bold text-white text-xs">{parcela.servicios.gasTipo}</span>
              <span className="text-[10px] text-cyan-400 block mt-0.5">{parcela.servicios.internetProveedor}</span>
            </div>
          </div>
        </div>

        {/* Section 4: Family Census in this parcel */}
        {parcela.familia && (
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>Grupo Familiar Censado ({parcela.familia.apellidoFamilia})</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {parcela.familia.miembros.map((m) => (
                <div key={m.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white block">{m.nombres} {m.apellidos}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{m.cedula} · {m.edad} años</span>
                  </div>
                  {m.patologias.length > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {m.patologias[0]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => onOpenSolvencia(parcela)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-robles-500 hover:bg-robles-400 text-slate-950 font-bold text-xs transition shadow-emerald-glow"
          >
            <QrCode className="w-4 h-4 stroke-[2.5]" />
            <span>Emitir Solvencia Digital QR</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
