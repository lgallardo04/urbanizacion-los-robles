"use client";

import React, { useState } from "react";
import { 
  Users, 
  HeartPulse, 
  Car, 
  Dog, 
  Pill, 
  Plus, 
  Search, 
  FileSpreadsheet, 
  ShieldAlert, 
  Calendar, 
  Phone, 
  UserCheck,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { PARCELAS_LOS_ROBLES_DATA, ESTADISTICAS_URBANISMO_ROBLES } from "../lib/data/mock-data";
import { ParcelaUrbanismo } from "../lib/types";
import { exportarCensoCSV } from "../lib/data/export-csv";
import { formatCedula } from "../lib/utils/formatters";

interface CensoSaludViewProps {
  onSelectParcela: (parcela: ParcelaUrbanismo) => void;
}

export const CensoSaludView: React.FC<CensoSaludViewProps> = ({ onSelectParcela }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSalud, setFilterSalud] = useState<string>("ALL");

  const stats = ESTADISTICAS_URBANISMO_ROBLES;

  const parcelasConFamilias = PARCELAS_LOS_ROBLES_DATA.filter((p) => p.familia !== undefined);

  const filtered = parcelasConFamilias.filter((p) => {
    const fam = p.familia!;
    const matchText = 
      fam.apellidoFamilia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.numeroParcela.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fam.miembros.some(m => 
        m.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.cedula.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (filterSalud === "CRONICOS") {
      return matchText && fam.miembros.some(m => m.patologias.length > 0);
    }
    if (filterSalud === "ADULTOS_MAYORES") {
      return matchText && fam.miembros.some(m => m.adultoMayor);
    }
    if (filterSalud === "EMBARAZADAS") {
      return matchText && fam.miembros.some(m => m.embarazada);
    }
    if (filterSalud === "DISCAPACIDAD") {
      return matchText && fam.miembros.some(m => m.discapacidad);
    }

    return matchText;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="glass-card p-6 rounded-2xl border border-surface-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>Padrón Demográfico & Salud Comunitaria</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-extrabold text-white">
            Censo Residencial, Salud Inteligente & Convivencia
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Registro de grupos familiares, patologías crónicas, necesidades de medicamentos, vehículos (Tags RFID) y mascotas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportarCensoCSV(PARCELAS_LOS_ROBLES_DATA)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition border border-slate-700 active:scale-95"
            title="Descargar censo en formato CSV compatible con Excel"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Exportar Data SIA-CENSO</span>
          </button>
        </div>
      </div>

      {/* 4 Health Intelligence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Hipertensión Arterial</span>
            <HeartPulse className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono mt-2">{stats.saludComunitaria.totalCasosHipertension} casos</p>
          <p className="text-[11px] text-blue-400 mt-1">11.1% de la población adulta</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Diabetes Mellitus</span>
            <Pill className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono mt-2">{stats.saludComunitaria.totalCasosDiabetes} casos</p>
          <p className="text-[11px] text-amber-400 mt-1">Control glucémico mensual</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Adultos Mayores (60+)</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono mt-2">{stats.distribucionEdad.adultosMayores60Mas} hab</p>
          <p className="text-[11px] text-purple-400 mt-1">Prioridad en cortes de luz/agua</p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-surface-border">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Gestantes & Lactantes</span>
            <HeartPulse className="w-4 h-4 text-rose-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-mono mt-2">{stats.saludComunitaria.embarazadas} censadas</p>
          <p className="text-[11px] text-rose-400 mt-1">Control prenatal activo</p>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 rounded-2xl border border-surface-border space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por apellido de familia, habitante o cédula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-robles-400"
            />
          </div>

          <select
            value={filterSalud}
            onChange={(e) => setFilterSalud(e.target.value)}
            className="py-2.5 px-3 rounded-xl bg-slate-900/90 border border-slate-700/70 text-xs text-white focus:outline-none focus:border-robles-400"
          >
            <option value="ALL">Todos los Registros Familiares</option>
            <option value="CRONICOS">Con Patologías Crónicas</option>
            <option value="ADULTOS_MAYORES">Con Adultos Mayores</option>
            <option value="EMBARAZADAS">Con Embarazadas</option>
            <option value="DISCAPACIDAD">Con Personas con Discapacidad</option>
          </select>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: "ALL", label: "Todos los Hogares" },
            { id: "CRONICOS", label: "Patologías Crónicas" },
            { id: "ADULTOS_MAYORES", label: "Adultos Mayores (60+)" },
            { id: "EMBARAZADAS", label: "Gestantes / Lactantes" },
            { id: "DISCAPACIDAD", label: "Discapacidad" },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setFilterSalud(chip.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition active:scale-95 ${
                filterSalud === chip.id
                  ? "bg-rose-500 text-white font-bold shadow-sm shadow-rose-500/20"
                  : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Family Census Cards List */}
      <div className="space-y-4">
        {filtered.map((parcela) => {
          const fam = parcela.familia!;
          const tieneVulnerabilidad = fam.miembros.some(m => m.adultoMayor || m.embarazada || m.discapacidad || m.patologias.length > 0);

          return (
            <div
              key={fam.id}
              className="glass-card p-5 lg:p-6 rounded-2xl border border-surface-border space-y-4 hover:border-robles-500/30 transition"
            >
              {/* Card Top */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-extrabold text-white font-mono bg-robles-500/20 text-robles-400 px-2.5 py-1 rounded-lg border border-robles-500/30">
                      {parcela.numeroParcela}
                    </span>
                    <h3 className="text-base font-bold text-white">
                      {fam.apellidoFamilia}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">({fam.codigoFamilia})</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {parcela.calle} · {parcela.manzana} · Censado el {fam.fechaCenso} por {fam.censador}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    {fam.miembros.length} Miembros
                  </span>
                  {tieneVulnerabilidad && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <HeartPulse className="w-3 h-3" />
                      <span>Atención Prioritaria</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Members Table / List */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Miembros del Hogar & Estado de Salud:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fam.miembros.map((miembro) => (
                    <div
                      key={miembro.id}
                      className="p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">
                          {miembro.nombres} {miembro.apellidos}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-800 text-slate-300">
                          {formatCedula(miembro.cedula)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <span>{miembro.edad} años</span>
                        <span>·</span>
                        <span className="capitalize">{miembro.parentesco.replace('_', ' ')}</span>
                        {miembro.profesion && (
                          <>
                            <span>·</span>
                            <span className="text-slate-300 truncate max-w-[150px]">{miembro.profesion}</span>
                          </>
                        )}
                      </div>

                      {/* Patologías & Medicamentos */}
                      {miembro.patologias.length > 0 && (
                        <div className="pt-1.5 border-t border-slate-800/80 text-[11px] space-y-1">
                          <div className="flex items-center gap-1.5 text-rose-300 font-medium">
                            <HeartPulse className="w-3 h-3 shrink-0" />
                            <span>{miembro.patologias.join(", ")}</span>
                          </div>
                          {miembro.medicamentos.length > 0 && (
                            <div className="flex items-center gap-1.5 text-amber-300">
                              <Pill className="w-3 h-3 shrink-0" />
                              <span>Med: {miembro.medicamentos.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Vehicles & Pets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                {/* Vehicles */}
                <div className="flex items-center gap-2 text-slate-300">
                  <Car className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px]">Vehículos Registrados:</span>
                    {fam.vehiculos.length > 0 ? (
                      <span className="text-[11px]">
                        {fam.vehiculos.map(v => `${v.marca} ${v.modelo} [${v.placa} - ${v.tagRfid}]`).join(", ")}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Ninguno</span>
                    )}
                  </div>
                </div>

                {/* Pets */}
                <div className="flex items-center gap-2 text-slate-300">
                  <Dog className="w-4 h-4 text-robles-400 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-400 block text-[10px]">Mascotas Censadas:</span>
                    {fam.mascotas.length > 0 ? (
                      <span className="text-[11px]">
                        {fam.mascotas.map(m => `${m.nombre} (${m.especie === 'CANINO' ? 'Perro' : 'Gato'} - Vacunado: ${m.vacunadoAntirrabica ? 'Sí' : 'No'})`).join(", ")}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-[11px]">Sin mascotas</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
