"use client";

import React from "react";
import { 
  LayoutDashboard, 
  MapPin, 
  Map, 
  AlertTriangle, 
  Scale 
} from "lucide-react";
import { TabType } from "./Sidebar";

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSimulador: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenSimulador,
}) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-2xl border-t border-slate-800/80 px-2 py-1.5 safe-area-pb shadow-2xl">
      <div className="flex items-center justify-around relative">
        {/* Tab 1: Inicio */}
        <button
          onClick={() => onSelectTab("dashboard")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all touch-target-min ${
            activeTab === "dashboard"
              ? "text-robles-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === "dashboard" ? "bg-robles-500/20 text-robles-400" : ""}`}>
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5">Inicio</span>
        </button>

        {/* Tab 2: Mapa */}
        <button
          onClick={() => onSelectTab("mapa")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all touch-target-min ${
            activeTab === "mapa"
              ? "text-robles-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === "mapa" ? "bg-robles-500/20 text-robles-400" : ""}`}>
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5">Mapa</span>
        </button>

        {/* Floating Center Button: Validar LOOU */}
        <div className="-mt-5 flex flex-col items-center">
          <button
            onClick={onOpenSimulador}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-robles-500 to-cyan-400 text-slate-950 flex items-center justify-center shadow-emerald-glow active:scale-90 transition transform hover:scale-105 border-2 border-slate-950"
            title="Validar remodelación con LOOU"
            aria-label="Validar LOOU"
          >
            <Scale className="w-5 h-5 stroke-[2.5]" />
          </button>
          <span className="text-[9px] mt-1 font-extrabold text-cyan-400 tracking-wider">LOOU</span>
        </div>

        {/* Tab 3: Catastro */}
        <button
          onClick={() => onSelectTab("catastro")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all touch-target-min ${
            activeTab === "catastro"
              ? "text-robles-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === "catastro" ? "bg-robles-500/20 text-robles-400" : ""}`}>
            <Map className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5">Catastro</span>
        </button>

        {/* Tab 4: Averías */}
        <button
          onClick={() => onSelectTab("incidencias")}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all touch-target-min ${
            activeTab === "incidencias"
              ? "text-robles-400 font-bold"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <div className={`p-1.5 rounded-xl transition-all ${activeTab === "incidencias" ? "bg-robles-500/20 text-robles-400" : ""}`}>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5">Averías</span>
        </button>
      </div>
    </div>
  );
};
