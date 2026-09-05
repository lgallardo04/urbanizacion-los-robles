"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertOctagon, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an unhandled error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center p-6 w-full">
          <div className="glass-card border border-rose-500/30 bg-slate-950/80 rounded-2xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-2xl">
            {/* Background Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-500/20 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-500/15 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 shadow-lg shadow-rose-500/10">
                <AlertOctagon className="w-8 h-8" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                {this.props.fallbackTitle || "Ocurrió un error inesperado"}
              </h2>

              <p className="text-sm text-slate-400 mb-6 max-w-md">
                {this.state.error?.message ||
                  "La sección actual encontró una anomalía en la renderización. Los datos no se han perdido."}
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
                <button
                  onClick={this.handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-robles-500/20 hover:bg-robles-500/30 text-robles-300 border border-robles-500/40 text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reintentar Vista</span>
                </button>

                <button
                  onClick={this.handleReload}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Recargar Página</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
