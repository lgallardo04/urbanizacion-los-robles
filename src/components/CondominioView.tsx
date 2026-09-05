"use client";

import React, { useState } from "react";
import { 
  Building2, 
  DollarSign, 
  CreditCard, 
  FileCheck, 
  QrCode, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Download,
  Plus
} from "lucide-react";
import { ESTADISTICAS_URBANISMO_ROBLES, PARCELAS_LOS_ROBLES_DATA } from "../lib/data/mock-data";
import { ParcelaUrbanismo } from "../lib/types";
import { formatCedula, formatCurrency } from "../lib/utils/formatters";

interface CondominioViewProps {
  onOpenSolvenciaQR: (parcela: ParcelaUrbanismo) => void;
}

export const CondominioView: React.FC<CondominioViewProps> = ({ onOpenSolvenciaQR }) => {
  const stats = ESTADISTICAS_URBANISMO_ROBLES;
  const tasaBcv = 36.50; // Ejemplo tasa referencial

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 rounded-2xl border border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
            <Building2 className="w-4 h-4" />
            <span>Asociación de Vecinos (ASOVECINOS) & Junta de Condominio</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Gestión de Condominio, Cuotas & Fondo Comunal
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Control de solvencia vecinal, mantenimiento de áreas verdes, pozo profundo y emisión de solvencias digitales.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs">
            <span className="text-slate-400 block text-[10px]">Tasa Oficial BCV:</span>
            <span className="font-mono font-bold text-robles-400">{tasaBcv.toFixed(2)} Bs / USD</span>
          </div>
        </div>
      </div>

      {/* 3 Finance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-surface-border">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Fondo de Reserva Acumulado
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-robles-400 font-mono">
              ${stats.condominio.fondosReservaUsd.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">USD</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            ≈ {formatCurrency(stats.condominio.fondosReservaUsd * tasaBcv, "Bs.")} (Destinado a bomba y portón)
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-surface-border">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Tasa de Solvencia Mensual
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-400 font-mono">
              {stats.condominio.solvenciaPorcentaje}%
            </span>
            <span className="text-xs text-slate-400">al día</span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-1">
            283 de 320 parcelas solventes
          </p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-surface-border">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Cuota Mensual Aprobada
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">
              ${stats.condominio.cuotaMensualUsd}
            </span>
            <span className="text-xs text-slate-400">/ mes por parcela</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Aprobado en Asamblea General de Propietarios
          </p>
        </div>
      </div>

      {/* Condominium Status by Parcel */}
      <div className="glass-card p-6 rounded-2xl border border-surface-border space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Estado de Cuenta y Solvencias por Parcela</h3>
            <p className="text-xs text-slate-400">Descarga o valida la solvencia digital con código QR para trámites municipales</p>
          </div>
        </div>

        <div className="space-y-3">
          {PARCELAS_LOS_ROBLES_DATA.map((parcela) => {
            const isSolvente = parcela.estatusSolvencia === "SOLVENTE";

            return (
              <div
                key={parcela.id}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-robles-400 text-sm">
                    {parcela.numeroParcela}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {parcela.propietario.nombre} · {parcela.manzana}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {formatCedula(parcela.propietario.cedula)} · {parcela.calle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                      isSolvente
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                    }`}
                  >
                    {isSolvente ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                    <span>{isSolvente ? "Solvente (Sept 2026)" : "Pendiente Mes Actual"}</span>
                  </span>

                  <button
                    onClick={() => onOpenSolvenciaQR(parcela)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-robles-500/15 hover:bg-robles-500/25 text-robles-300 border border-robles-500/30 text-xs font-semibold transition"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Solvencia QR</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
