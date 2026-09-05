"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles,
  Calculator 
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
  const tabs = [
    { id: "dashboard" as TabType, label: "Inicio", icon: LayoutDashboard },
    { id: "catastro" as TabType, label: "Catastro", icon: Map },
    { id: "censo" as TabType, label: "Censo", icon: Users },
    { id: "garita" as TabType, label: "Garita", icon: ShieldCheck },
    { id: "incidencias" as TabType, label: "Averías", icon: AlertTriangle },
    { id: "asistente" as TabType, label: "Copilot IA", icon: Sparkles },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/80 px-1 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-xl transition-all ${
                isActive
                  ? "text-robles-400 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <div
                className={`p-1 rounded-lg transition-all ${
                  isActive ? "bg-robles-500/20 text-robles-400" : ""
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[9px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}

        {/* Quick Simulator Floating Mobile Button */}
        <button
          onClick={onOpenSimulador}
          className="flex flex-col items-center justify-center py-1 px-1.5 text-cyan-400 hover:text-cyan-300"
          title="Simulador LOOU"
        >
          <div className="p-1 rounded-lg bg-cyan-500/20">
            <Calculator className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-[9px] mt-0.5 font-medium">LOOU</span>
        </button>
      </div>
    </div>
  );
};
