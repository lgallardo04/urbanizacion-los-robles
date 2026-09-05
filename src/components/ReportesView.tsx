"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { FileDown, Activity, HeartPulse, TrendingUp } from "lucide-react";

const LOOU_DATA = [
  { name: "Conforme", value: 89, color: "#10b981" },
  { name: "Observada", value: 11, color: "#f59e0b" },
];

const SOLVENCIA_DATA = [
  { manzana: "A", solvencia: 88 },
  { manzana: "B", solvencia: 72 },
  { manzana: "C", solvencia: 95 },
  { manzana: "D", solvencia: 81 },
  { manzana: "E", solvencia: 90 },
  { manzana: "F", solvencia: 78 },
];

const PATOLOGIAS_DATA = [
  { mes: "Mar", hipertension: 42, diabetes: 28, asma: 15 },
  { mes: "Abr", hipertension: 44, diabetes: 29, asma: 13 },
  { mes: "May", hipertension: 43, diabetes: 31, asma: 14 },
  { mes: "Jun", hipertension: 46, diabetes: 30, asma: 16 },
  { mes: "Jul", hipertension: 48, diabetes: 33, asma: 15 },
  { mes: "Ago", hipertension: 47, diabetes: 34, asma: 17 },
];

const TOP_MEDICAMENTOS = [
  { nombre: "Losartán 50mg", cantidad: 183 },
  { nombre: "Metformina 850mg", cantidad: 142 },
  { nombre: "Atorvastatina 40mg", cantidad: 98 },
  { nombre: "Amlodipino 10mg", cantidad: 87 },
  { nombre: "Insulina Glargina", cantidad: 56 },
];

const VULNERABILIDAD = [
  { label: "Adultos Mayores", value: 68, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { label: "Embarazadas", value: 12, color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  { label: "Discapacidad", value: 23, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { label: "Atención Prioritaria", value: 43, color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
];

export const ReportesView: React.FC = () => {
  const [activeChart, setActiveChart] = useState<"loou" | "solvencia" | "salud">("loou");

  return (
    <div className="space-y-4 pb-16 lg:pb-0">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-white">Panel de Reportes Comunales</h2>
          <p className="text-xs text-slate-400">Análisis estadístico — Urbanización Los Robles · Araure 2026</p>
        </div>
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition border border-slate-700"
        >
          <FileDown className="w-4 h-4 text-robles-400" />
          <span>Exportar Reporte</span>
        </button>
      </div>

      {/* Chart Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "loou" as const, label: "Cumplimiento LOOU", icon: Activity },
          { key: "solvencia" as const, label: "Solvencia por Manzana", icon: TrendingUp },
          { key: "salud" as const, label: "Tendencias de Salud", icon: HeartPulse },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveChart(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeChart === key
                ? "bg-robles-500/20 text-robles-400 border border-robles-500/40"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Chart Card */}
      <div className="glass-card p-4 sm:p-6 rounded-2xl border border-surface-border">
        {activeChart === "loou" && (
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Cumplimiento Normativa LOOU (R-2)</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-full sm:w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={LOOU_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                      {LOOU_DATA.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", fontSize: "12px" }}
                      formatter={(value: any) => [`${value}%`]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-3">
                {LOOU_DATA.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                      <span className="text-sm font-semibold text-white">{item.name}</span>
                    </div>
                    <span className="text-lg font-extrabold font-mono" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                ))}
                <p className="text-[11px] text-slate-400 pt-1">* Zonificación R-2 · Parámetros LOOU + Ordenanza Municipal Araure</p>
              </div>
            </div>
          </div>
        )}

        {activeChart === "solvencia" && (
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Solvencia de Condominio por Manzana — 2026</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SOLVENCIA_DATA} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="manzana" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} unit="%" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", fontSize: "12px" }}
                    formatter={(v: any) => [`${v}%`, "Solvencia"]}
                  />
                  <Bar dataKey="solvencia" radius={[6, 6, 0, 0]}>
                    {SOLVENCIA_DATA.map((entry, idx) => (
                      <Cell key={idx} fill={entry.solvencia >= 85 ? "#10b981" : entry.solvencia >= 70 ? "#f59e0b" : "#ef4444"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeChart === "salud" && (
          <div>
            <h3 className="text-sm font-bold text-white mb-4">Tendencia de Patologías Crónicas (Últimos 6 Meses)</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PATOLOGIAS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="mes" tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: "12px", fontSize: "12px" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", color: "#94a3b8" }} />
                  <Line type="monotone" dataKey="hipertension" stroke="#ef4444" strokeWidth={2} dot={false} name="Hipertensión" />
                  <Line type="monotone" dataKey="diabetes" stroke="#f59e0b" strokeWidth={2} dot={false} name="Diabetes T2" />
                  <Line type="monotone" dataKey="asma" stroke="#06b6d4" strokeWidth={2} dot={false} name="Asma" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Bottom: Medicamentos + Vulnerabilidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Top Medicamentos */}
        <div className="glass-card p-4 rounded-2xl border border-surface-border space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            Top 5 Medicamentos Requeridos
          </h3>
          <div className="space-y-2">
            {TOP_MEDICAMENTOS.map((med, idx) => {
              const maxVal = TOP_MEDICAMENTOS[0].cantidad;
              const pct = Math.round((med.cantidad / maxVal) * 100);
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-200 font-medium">{med.nombre}</span>
                    <span className="font-mono font-bold text-robles-400">{med.cantidad} unidades</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-robles-500 to-cyan-500 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vulnerabilidad Comunal */}
        <div className="glass-card p-4 rounded-2xl border border-surface-border space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            Vulnerabilidad Comunal
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {VULNERABILIDAD.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center ${item.color}`}
              >
                <p className="text-2xl font-extrabold font-mono">{item.value}</p>
                <p className="text-[10px] font-semibold mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-400">
            Datos del último censo comunal · Agosto 2026
          </p>
        </div>
      </div>
    </div>
  );
};
