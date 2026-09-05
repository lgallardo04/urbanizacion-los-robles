"use client";

import React, { useState, useEffect } from "react";
import { 
  AlertTriangle, 
  Droplet, 
  Zap, 
  Flame, 
  Truck, 
  ShieldAlert, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Filter, 
  MessageSquare, 
  MapPin, 
  User, 
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { IncidenciaServicio } from "../lib/types";
import { fetchIncidencias, createIncidencia, MOCK_INCIDENCIAS } from "../lib/data/api";
import { formatTimeAgo } from "../lib/utils/formatters";
import toast from "react-hot-toast";

export const IncidenciasView: React.FC = () => {
  const [incidencias, setIncidencias] = useState<IncidenciaServicio[]>(MOCK_INCIDENCIAS);
  const [filterTipo, setFilterTipo] = useState<string>("ALL");
  const [filterEstatus, setFilterEstatus] = useState<string>("ALL");
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [newTipo, setNewTipo] = useState<"AGUA" | "ELECTRICIDAD" | "GAS" | "ASEO" | "SEGURIDAD" | "VIALIDAD">("AGUA");
  const [newTitulo, setNewTitulo] = useState("");
  const [newDescripcion, setNewDescripcion] = useState("");
  const [newManzana, setNewManzana] = useState("Manzana C");
  const [newParcela, setNewParcela] = useState("P-042");
  const [newPrioridad, setNewPrioridad] = useState<"BAJA" | "MEDIA" | "ALTA" | "URGENTE">("MEDIA");
  const [newReportadoPor, setNewReportadoPor] = useState("Carlos Mendoza");

  useEffect(() => {
    fetchIncidencias().then(setIncidencias);
  }, []);

  const handleCrearIncidencia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitulo || !newDescripcion) {
      toast.error("Por favor completa el título y la descripción del problema");
      return;
    }

    const nueva: IncidenciaServicio = {
      id: `inc-${Date.now()}`,
      tipo: newTipo,
      titulo: newTitulo,
      descripcion: newDescripcion,
      manzana: newManzana,
      numeroParcela: newParcela,
      estatus: "PENDIENTE",
      prioridad: newPrioridad,
      reportadoPor: newReportadoPor,
      createdAt: new Date().toISOString(),
    };

    setIncidencias([nueva, ...incidencias]);
    await createIncidencia(nueva);
    setShowModal(false);
    setNewTitulo("");
    setNewDescripcion("");
    toast.success("Incidencia comunal registrada con éxito. Se notificó a la mesa técnica.");
  };

  const handleMarcarResuelto = (id: string) => {
    setIncidencias(incidencias.map(i => i.id === id ? { ...i, estatus: "RESUELTO", resueltoEn: new Date().toISOString() } : i));
    toast.success("Incidencia marcada como resuelta.");
  };

  const getServiceIcon = (tipo: string) => {
    switch (tipo) {
      case "AGUA": return <Droplet className="w-4 h-4 text-cyan-400" />;
      case "ELECTRICIDAD": return <Zap className="w-4 h-4 text-amber-400" />;
      case "GAS": return <Flame className="w-4 h-4 text-orange-400" />;
      case "ASEO": return <Truck className="w-4 h-4 text-robles-400" />;
      default: return <ShieldAlert className="w-4 h-4 text-rose-400" />;
    }
  };

  const filteredIncidencias = incidencias.filter(i => {
    const matchTipo = filterTipo === "ALL" || i.tipo === filterTipo;
    const matchEstatus = filterEstatus === "ALL" || i.estatus === filterEstatus;
    return matchTipo && matchEstatus;
  });

  return (
    <div className="space-y-4 pb-16 lg:pb-0">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-2xl glass-card border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-400">
              Mesa Técnica & Gestión Ciudadana
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {incidencias.filter(i => i.estatus !== "RESUELTO").length} Activas
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-white">
            Reportes e Incidencias de Servicios
          </h2>
          <p className="text-xs text-slate-300">
            Canalización comunal de averías en agua, CORPOELEC, gas y aseo urbano.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-robles-500 hover:bg-robles-400 text-slate-950 font-bold text-xs transition active:scale-95 shadow-emerald-glow"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>+ Reportar Incidencia</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          {[
            { id: "ALL", label: "Todos los Servicios" },
            { id: "AGUA", label: "Agua" },
            { id: "ELECTRICIDAD", label: "Electricidad" },
            { id: "GAS", label: "Gas GLP" },
            { id: "ASEO", label: "Aseo" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilterTipo(t.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                filterTipo === t.id
                  ? "bg-robles-500/20 text-robles-400 border border-robles-500/40"
                  : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px]">Estatus:</span>
          <select
            value={filterEstatus}
            onChange={(e) => setFilterEstatus(e.target.value)}
            className="py-1 px-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
          >
            <option value="ALL">Todos</option>
            <option value="PENDIENTE">Pendientes</option>
            <option value="EN_PROCESO">En Proceso</option>
            <option value="RESUELTO">Resueltos</option>
          </select>
        </div>
      </div>

      {/* List of Incidencias */}
      <div className="space-y-3">
        {filteredIncidencias.map((inc) => {
          const isResuelto = inc.estatus === "RESUELTO";
          const prioridadColors: Record<string, string> = {
            BAJA: "text-slate-400 bg-slate-800/80 border-slate-700",
            MEDIA: "text-blue-400 bg-blue-950/40 border-blue-800",
            ALTA: "text-amber-400 bg-amber-950/40 border-amber-800",
            URGENTE: "text-rose-400 bg-rose-950/40 border-rose-800 animate-pulse",
          };

          return (
            <div
              key={inc.id}
              className={`p-4 rounded-xl glass-card border transition space-y-3 ${
                isResuelto ? "border-slate-800/60 opacity-80" : "border-surface-border hover:border-robles-500/40"
              }`}
            >
              {/* Header of card */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                    {getServiceIcon(inc.tipo)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{inc.titulo}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1 font-semibold text-slate-300">
                        <MapPin className="w-3 h-3 text-robles-400" />
                        {inc.manzana} {inc.numeroParcela && `· ${inc.numeroParcela}`}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {inc.reportadoPor}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${prioridadColors[inc.prioridad]}`}>
                    {inc.prioridad}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isResuelto 
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                      : inc.estatus === "EN_PROCESO" 
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}>
                    {inc.estatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                {inc.descripcion}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-robles-400" />
                  <span>Reportado {formatTimeAgo(inc.createdAt)}</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-500">{new Date(inc.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </span>

                {!isResuelto && (
                  <button
                    onClick={() => handleMarcarResuelto(inc.id)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold transition text-xs active:scale-95"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Marcar Solucionado</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Reportar Incidencia */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="glass-card max-w-lg w-full p-4 sm:p-6 rounded-2xl border border-surface-border space-y-4 animate-in fade-in zoom-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Reportar Nueva Incidencia o Avería
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white text-xs">
                ✕
              </button>
            </div>

            <form onSubmit={handleCrearIncidencia} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Servicio Afectado</label>
                <div className="grid grid-cols-4 gap-2">
                  {(["AGUA", "ELECTRICIDAD", "GAS", "ASEO"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewTipo(t)}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                        newTipo === t ? "bg-robles-500/20 text-robles-400 border-robles-500/40" : "bg-slate-900/60 text-slate-400 border-slate-800"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Título Resumido</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Fuga de agua en acera o poste sin bombillo"
                  value={newTitulo}
                  onChange={(e) => setNewTitulo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-robles-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Manzana</label>
                  <select
                    value={newManzana}
                    onChange={(e) => setNewManzana(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-robles-400"
                  >
                    <option value="Manzana A">Manzana A</option>
                    <option value="Manzana B">Manzana B</option>
                    <option value="Manzana C">Manzana C</option>
                    <option value="Manzana D">Manzana D</option>
                    <option value="Manzana E">Manzana E</option>
                    <option value="Manzana F">Manzana F</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Prioridad</label>
                  <select
                    value={newPrioridad}
                    onChange={(e) => setNewPrioridad(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-robles-400"
                  >
                    <option value="BAJA">Baja</option>
                    <option value="MEDIA">Media</option>
                    <option value="ALTA">Alta</option>
                    <option value="URGENTE">Urgente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Descripción Detallada del Problema</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detalla qué ocurre, ubicación exacta y si requiere cuadrilla de Hidroportuguesa o Corpoelec..."
                  value={newDescripcion}
                  onChange={(e) => setNewDescripcion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-robles-400 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-robles-500 hover:bg-robles-400 text-slate-950 text-xs font-bold shadow-emerald-glow"
                >
                  Enviar Reporte
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
