"use client";

import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  Car, 
  UserPlus, 
  QrCode, 
  Radio, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Search, 
  Plus, 
  Sparkles, 
  Lock, 
  Unlock, 
  AlertTriangle 
} from "lucide-react";
import { RegistroAcceso } from "../lib/types";
import { fetchAccesos, createAcceso, marcarSalidaAcceso, MOCK_ACCESOS } from "../lib/data/api";
import { formatCedula, formatTimeAgo } from "../lib/utils/formatters";
import toast from "react-hot-toast";

export const GaritaAccesoView: React.FC = () => {
  const [accesos, setAccesos] = useState<RegistroAcceso[]>(MOCK_ACCESOS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTipo, setFilterTipo] = useState<string>("ALL");
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isOpeningGate, setIsOpeningGate] = useState(false);
  const [showNewVisitModal, setShowNewVisitModal] = useState(false);

  // Form states for new entry
  const [newPlaca, setNewPlaca] = useState("");
  const [newTipo, setNewTipo] = useState<"VISITANTE" | "DELIVERY" | "SERVICIO" | "RESIDENTE">("VISITANTE");
  const [newNombre, setNewNombre] = useState("");
  const [newCedula, setNewCedula] = useState("");
  const [newParcela, setNewParcela] = useState("P-042 (Manzana C)");

  // Load accesos on mount
  useEffect(() => {
    fetchAccesos().then(setAccesos);
  }, []);

  const handleOpenGate = () => {
    setIsOpeningGate(true);
    toast.loading("Enviando comando de apertura al portón motorizado...", { id: "gate" });
    setTimeout(() => {
      setIsOpeningGate(false);
      setIsGateOpen(true);
      toast.success("¡Portón Principal Abierto! Cerrará automáticamente en 10s.", { id: "gate" });
      setTimeout(() => {
        setIsGateOpen(false);
        toast("Portón cerrado y asegurado con electroimán.", { icon: "🔒" });
      }, 10000);
    }, 1200);
  };

  const handleSimularRFID = () => {
    toast.loading("Simulando lectura de antena RFID vehicular (900MHz)...", { id: "rfid" });
    setTimeout(() => {
      const nuevo: RegistroAcceso = {
        id: `acc-${Date.now()}`,
        placa: "AB123CD",
        tipo: "RESIDENTE",
        tagRfid: "RFID-ROBLES-042A",
        nombreConductor: "Carlos Eduardo Mendoza (Residente)",
        cedulaConductor: "V-14.892.304",
        parcelaDestino: "P-042 (Manzana C)",
        fechaIngreso: new Date().toISOString(),
        estatus: "DENTRO",
      };
      setAccesos([nuevo, ...accesos]);
      createAcceso(nuevo);
      handleOpenGate();
      toast.success("✅ Tag RFID Válido [RFID-ROBLES-042A] - Parcela P-042 Solvente", { id: "rfid" });
    }, 1000);
  };

  const handleRegistrarVisitante = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaca || !newNombre) {
      toast.error("Por favor completa placa y nombre del conductor");
      return;
    }

    const nuevo: RegistroAcceso = {
      id: `acc-${Date.now()}`,
      placa: newPlaca.toUpperCase(),
      tipo: newTipo,
      tagRfid: null,
      nombreConductor: newNombre,
      cedulaConductor: newCedula ? `V-${newCedula}` : null,
      parcelaDestino: newParcela,
      fechaIngreso: new Date().toISOString(),
      estatus: "DENTRO",
    };

    setAccesos([nuevo, ...accesos]);
    createAcceso(nuevo);
    setShowNewVisitModal(false);
    setNewPlaca("");
    setNewNombre("");
    setNewCedula("");
    toast.success(`Visitante ${nuevo.nombreConductor} autorizado hacia ${nuevo.parcelaDestino}`);
    handleOpenGate();
  };

  const handleMarcarSalida = async (id: string, placa: string) => {
    setAccesos(accesos.map(a => a.id === id ? { ...a, estatus: "SALIO", fechaSalida: new Date().toISOString() } : a));
    await marcarSalidaAcceso(id);
    toast.success(`Salida registrada para vehículo ${placa}`);
  };

  const filteredAccesos = accesos.filter(a => {
    const matchText = 
      a.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.nombreConductor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.parcelaDestino.toLowerCase().includes(searchTerm.toLowerCase());
    const matchTipo = filterTipo === "ALL" || a.tipo === filterTipo;
    return matchText && matchTipo;
  });

  return (
    <div className="space-y-4 pb-16 lg:pb-0">
      {/* Header Banner */}
      <div className="p-4 sm:p-6 rounded-2xl glass-card border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400">
              Seguridad Perimetral & Garita
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Garita Activa 24/7
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-white">
            Control de Acceso Vehicular & Visitas
          </h2>
          <p className="text-xs text-slate-300">
            Lector de tags RFID, registro de delivery, visitantes autorizados y apertura remota.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <button
            onClick={handleSimularRFID}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 font-bold text-xs transition active:scale-95"
          >
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Simular Tag RFID</span>
          </button>

          <button
            onClick={() => setShowNewVisitModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700 active:scale-95"
          >
            <UserPlus className="w-4 h-4 text-robles-400" />
            <span>+ Registrar Visita</span>
          </button>

          <button
            onClick={handleOpenGate}
            disabled={isOpeningGate}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs transition active:scale-95 shadow-emerald-glow ${
              isGateOpen 
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400" 
                : "bg-robles-500 text-slate-950 hover:bg-robles-400"
            }`}
          >
            {isGateOpen ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>{isGateOpen ? "PORTÓN ABIERTO" : "Abrir Portón Remoto"}</span>
          </button>
        </div>
      </div>

      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="glass-card p-3.5 rounded-xl border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Vehículos Dentro</span>
            <Car className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-mono font-extrabold text-white">
            {accesos.filter(a => a.estatus === "DENTRO").length}
          </p>
          <span className="text-[10px] text-slate-400">Capacidad interna: 320 puestos</span>
        </div>

        <div className="glass-card p-3.5 rounded-xl border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Antena RFID Principal</span>
            <Radio className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-xl font-mono font-extrabold text-cyan-300">
            OPERATIVA
          </p>
          <span className="text-[10px] text-slate-400">Frecuencia UHF 902-928 MHz</span>
        </div>

        <div className="glass-card p-3.5 rounded-xl border border-surface-border space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Cámaras LPR de Placas</span>
            <ShieldCheck className="w-4 h-4 text-robles-400" />
          </div>
          <p className="text-xl font-mono font-extrabold text-robles-300">
            2/2 ACTIVAS
          </p>
          <span className="text-[10px] text-slate-400">Entrada y salida perimetral</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por placa, conductor o parcela..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-robles-400 font-mono"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "ALL", label: "Todos" },
            { id: "RESIDENTE", label: "Residentes" },
            { id: "VISITANTE", label: "Visitantes" },
            { id: "DELIVERY", label: "Delivery" },
            { id: "SERVICIO", label: "Servicios" },
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
      </div>

      {/* Access Logs List */}
      <div className="space-y-2.5">
        {filteredAccesos.map((acc) => {
          const isDentro = acc.estatus === "DENTRO";
          const tipoBadges: Record<string, string> = {
            RESIDENTE: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
            VISITANTE: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            DELIVERY: "bg-amber-500/20 text-amber-300 border-amber-500/30",
            SERVICIO: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          };

          return (
            <div
              key={acc.id}
              className="p-3.5 sm:p-4 rounded-xl glass-card border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              {/* Left Info */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0">
                  <Car className={`w-5 h-5 ${isDentro ? "text-robles-400" : "text-slate-500"}`} />
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-mono font-extrabold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {acc.placa}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${tipoBadges[acc.tipo] || "bg-slate-800 text-slate-300"}`}>
                      {acc.tipo}
                    </span>
                    {acc.tagRfid && (
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/40 px-1.5 py-0.5 rounded border border-cyan-800">
                        {acc.tagRfid}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    {acc.nombreConductor} {acc.cedulaConductor && <span className="text-slate-400 font-mono">({formatCedula(acc.cedulaConductor)})</span>}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Destino: <strong className="text-white">{acc.parcelaDestino}</strong>
                  </p>
                </div>
              </div>

              {/* Right Timestamps & Action */}
              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <div className="text-left sm:text-right text-[10px] text-slate-400 font-mono space-y-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    Ingreso: {formatTimeAgo(acc.fechaIngreso)} ({new Date(acc.fechaIngreso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                  </span>
                  {acc.fechaSalida && (
                    <span className="flex items-center gap-1 text-slate-500">
                      <LogOut className="w-3 h-3" />
                      Salida: {new Date(acc.fechaSalida).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>

                {isDentro ? (
                  <button
                    onClick={() => handleMarcarSalida(acc.id, acc.placa)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 hover:border-rose-500/30 text-xs font-semibold text-slate-200 transition border border-slate-700 active:scale-95"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Registrar Salida</span>
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                    Fuera del Urbanismo
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Registro de Nueva Visita */}
      {showNewVisitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 rounded-2xl border border-surface-border space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-robles-400" />
                Registrar Ingreso / Pase de Visita
              </h3>
              <button
                onClick={() => setShowNewVisitModal(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegistrarVisitante} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Tipo de Ingreso</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["VISITANTE", "DELIVERY", "SERVICIO"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setNewTipo(t)}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                        newTipo === t
                          ? "bg-robles-500/20 text-robles-400 border-robles-500/40"
                          : "bg-slate-900/60 text-slate-400 border-slate-800"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Placa Vehículo</label>
                  <input
                    type="text"
                    required
                    placeholder="AB123CD"
                    value={newPlaca}
                    onChange={(e) => setNewPlaca(e.target.value.toUpperCase())}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white uppercase font-mono focus:border-robles-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-medium block mb-1">Cédula Conductor</label>
                  <input
                    type="text"
                    placeholder="14.892.304"
                    value={newCedula}
                    onChange={(e) => setNewCedula(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:border-robles-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Roberto Escalona"
                  value={newNombre}
                  onChange={(e) => setNewNombre(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-robles-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">Parcela de Destino</label>
                <select
                  value={newParcela}
                  onChange={(e) => setNewParcela(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:border-robles-400"
                >
                  <option value="P-042 (Manzana C)">P-042 (Manzana C - Familia Mendoza)</option>
                  <option value="P-007 (Manzana A)">P-007 (Manzana A - Familia Torrealba)</option>
                  <option value="P-019 (Manzana B)">P-019 (Manzana B - Familia Pérez)</option>
                  <option value="P-055 (Manzana D)">P-055 (Manzana D - Familia García)</option>
                  <option value="P-068 (Manzana E)">P-068 (Manzana E - Familia Gómez)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewVisitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-robles-500 hover:bg-robles-400 text-slate-950 text-xs font-bold shadow-emerald-glow"
                >
                  Autorizar & Abrir Portón
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
