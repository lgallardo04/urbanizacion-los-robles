"use client";

import React, { useState } from "react";
import { TreePine, Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase/client";
import toast from "react-hot-toast";

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [prefijo, setPrefijo] = useState<"V" | "E">("V");
  const [numeroCedula, setNumeroCedula] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!numeroCedula || !password) {
      toast.error("Ingresa tu cédula y contraseña");
      return;
    }

    setIsLoading(true);
    try {
      // Build email from cedula format for Supabase Auth
      const email = `${prefijo}${numeroCedula}@robles.araure.ve`;
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        // In demo mode, bypass real auth
        toast.error("Credenciales incorrectas. Usa 'Modo Demo' para explorar.");
      } else {
        toast.success("¡Bienvenido al Sistema de Urbanismo Los Robles!");
        onLoginSuccess();
      }
    } catch {
      toast.error("Error de conexión. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemo = () => {
    setIsDemo(true);
    toast.success("Entrando en Modo Demostración...", { icon: "🏘️" });
    setTimeout(() => onLoginSuccess(), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#070d1f] px-4 py-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-robles-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl pointer-events-none" />

      {/* Logo + Title */}
      <div className="mb-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-robles-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-emerald-glow">
          <TreePine className="w-8 h-8 text-slate-950 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Los Robles</h1>
        <p className="text-sm text-slate-400 mt-1">Araure · Estado Portuguesa</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-sm glass-card rounded-2xl border border-surface-border p-6 space-y-5">
        <div className="space-y-0.5">
          <h2 className="text-base font-bold text-white">Acceso Comunitario</h2>
          <p className="text-xs text-slate-400">Sistema Integral de Urbanismo y Censo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Cedula Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Cédula de Identidad</label>
            <div className="flex gap-2">
              <select
                value={prefijo}
                onChange={(e) => setPrefijo(e.target.value as "V" | "E")}
                className="w-16 px-2 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white font-mono font-bold focus:outline-none focus:border-robles-400"
              >
                <option value="V">V-</option>
                <option value="E">E-</option>
              </select>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="14.892.304"
                value={numeroCedula}
                onChange={(e) => setNumeroCedula(e.target.value.replace(/\D/g, ""))}
                className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-robles-400 font-mono"
                maxLength={10}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 px-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-robles-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-robles-500 to-robles-400 text-slate-950 font-bold text-sm hover:opacity-95 transition active:scale-95 disabled:opacity-70 shadow-emerald-glow"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            )}
            <span>{isLoading ? "Verificando..." : "Ingresar al Sistema"}</span>
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-[10px] text-slate-500 font-medium">o continúa con</span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        {/* Demo Mode Button */}
        <button
          onClick={handleDemo}
          disabled={isDemo}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition border border-slate-700 active:scale-95 disabled:opacity-60"
        >
          {isDemo ? <Loader2 className="w-4 h-4 animate-spin" /> : <TreePine className="w-4 h-4 text-robles-400" />}
          <span>Entrar en Modo Demostración</span>
        </button>
      </div>

      {/* Footer */}
      <p className="mt-6 text-[10px] text-slate-500 text-center">
        Comité de Urbanismo Los Robles · Araure, Portuguesa
        <br />
        Sistema SIA-URB v2.0 · {new Date().getFullYear()}
      </p>
    </div>
  );
};
