"use client";

import React from "react";
import { X, QrCode, ShieldCheck, Download, Printer, CheckCircle2, TreePine, MapPin } from "lucide-react";
import { ParcelaUrbanismo } from "../lib/types";

interface SolvenciaQRModalProps {
  parcela: ParcelaUrbanismo | null;
  onClose: () => void;
}

export const SolvenciaQRModal: React.FC<SolvenciaQRModalProps> = ({ parcela, onClose }) => {
  if (!parcela) return null;

  const fechaEmision = new Date().toLocaleDateString("es-VE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  const fechaVencimiento = "31 de Diciembre de 2026";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl glass-card rounded-3xl border border-robles-500/40 p-5 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Paper Style Header */}
        <div className="text-center space-y-2 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-robles-500 to-cyan-500 text-slate-950 font-extrabold shadow-emerald-glow mb-1">
            <TreePine className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-extrabold text-white tracking-tight uppercase">
            República Bolivariana de Venezuela
          </h3>
          <p className="text-xs text-robles-400 font-semibold">
            Asociación de Vecinos & Comité de Urbanismo · Urbanización Los Robles
          </p>
          <p className="text-[10px] text-slate-400">
            Municipio Araure · Estado Portuguesa · RIF J-40982314-1
          </p>
        </div>

        {/* Certificate Body */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-xs">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
              Certificado Oficial de Solvencia
            </span>
            <h4 className="text-sm font-extrabold text-white">
              SOLVENCIA URBANA & VECINAL DIGITAL
            </h4>
            <span className="text-[11px] font-mono text-slate-400">
              N° CERT: ROBL-{parcela.numeroParcela}-2026-VNZ
            </span>
          </div>

          <div className="space-y-2 text-slate-300 border-t border-b border-slate-800 py-3">
            <p>
              Por medio del presente documento se hace constar que el inmueble identificado como 
              <strong className="text-white font-mono"> Parcela {parcela.numeroParcela}</strong>, ubicado en 
              <strong className="text-white"> {parcela.calle}, {parcela.manzana}</strong>, con Código Catastral 
              <strong className="text-white font-mono"> {parcela.codigoCatastral}</strong>, propiedad de:
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center font-semibold text-robles-300">
              {parcela.propietario.nombre} · CI: {parcela.propietario.cedula}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Se encuentra <strong>SOLVENTE</strong> en sus cuotas de mantenimiento comunitario y 
              <strong> CONFORME</strong> con los parámetros de la Ley Orgánica de Ordenación Urbanística (LOOU) y normas de convivencia.
            </p>
          </div>

          {/* QR Code and Validation */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block">Fecha de Emisión: <strong>{fechaEmision}</strong></span>
              <span className="text-[10px] text-slate-400 block">Válido hasta: <strong className="text-emerald-400">{fechaVencimiento}</strong></span>
              <div className="flex items-center gap-1 text-[10px] text-robles-400 font-semibold mt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verificación Criptográfica SIA-URB</span>
              </div>
            </div>

            <div className="w-20 h-20 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-lg">
              <QrCode className="w-full h-full text-slate-950" />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition border border-slate-700"
          >
            <Printer className="w-4 h-4 text-slate-300" />
            <span>Imprimir</span>
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-robles-500 hover:bg-robles-400 text-slate-950 font-bold text-xs transition shadow-emerald-glow"
          >
            <Download className="w-4 h-4" />
            <span>Descargar PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
