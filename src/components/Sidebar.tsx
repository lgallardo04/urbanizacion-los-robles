"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Map, 
  Users, 
  Droplet, 
  Building2, 
  BookOpenCheck,
  Scale,
  BarChart2,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Megaphone,
  MapPin,
  X
} from "lucide-react";

export type TabType = 
  | 'dashboard' 
  | 'mapa'
  | 'catastro' 
  | 'censo' 
  | 'garita' 
  | 'incidencias' 
  | 'servicios' 
  | 'condominio' 
  | 'reportes' 
  | 'asistente' 
  | 'normativa';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenSimulador: () => void;
  onOpenComunicados: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onSelectTab,
  onOpenSimulador,
  onOpenComunicados,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const menuItems = [
    { id: 'dashboard' as TabType, label: 'Inicio', icon: LayoutDashboard },
    { id: 'mapa' as TabType, label: 'Mapa Urbanístico', icon: MapPin, badge: '6 Mzn' },
    { id: 'catastro' as TabType, label: 'Catastro & LOOU', icon: Map, badge: '350' },
    { id: 'censo' as TabType, label: 'Censo & Salud', icon: Users, badge: '1.280' },
    { id: 'garita' as TabType, label: 'Garita & Accesos', icon: ShieldCheck, badge: 'RFID' },
    { id: 'incidencias' as TabType, label: 'Incidencias & Fallas', icon: AlertTriangle, badge: 'En Vivo' },
    { id: 'servicios' as TabType, label: 'Servicios Públicos', icon: Droplet },
    { id: 'condominio' as TabType, label: 'Condominio & Solvencias', icon: Building2 },
    { id: 'reportes' as TabType, label: 'Reportes Comunales', icon: BarChart2 },
    { id: 'asistente' as TabType, label: 'Robles AI Copilot', icon: Sparkles, badge: 'IA' },
    { id: 'normativa' as TabType, label: 'Normativa Legal', icon: BookOpenCheck },
  ];

  const renderNavContent = (isMobile = false) => (
    <>
      <div className="space-y-4">
        {isMobile && (
          <div className="flex items-center justify-between pb-3 border-b border-surface-border">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-white leading-tight">Urb. Los Robles</h2>
                <p className="text-[10px] text-slate-400">Araure · Portuguesa</p>
              </div>
            </div>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (isMobile && onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all touch-target-min ${
                  isActive
                    ? "bg-robles-500/20 text-robles-400 border border-robles-500/30 shadow-emerald-glow"
                    : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-robles-400" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono shrink-0 ${
                      isActive
                        ? "bg-robles-500/30 text-robles-300"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Simulator CTA */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <button
            onClick={() => {
              onOpenComunicados();
              if (isMobile && onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-bold transition touch-target-min"
          >
            <Megaphone className="w-3.5 h-3.5 text-amber-400" />
            <span>Cartelera Digital</span>
          </button>

          <button
            onClick={() => {
              onOpenSimulador();
              if (isMobile && onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-robles-500 to-cyan-500 text-slate-950 font-extrabold text-xs transition active:scale-95 shadow-emerald-glow touch-target-min"
          >
            <Scale className="w-4 h-4 stroke-[2.5]" />
            <span>Validar Remodelación</span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
        <p className="font-semibold text-slate-300">Urb. Los Robles</p>
        <p className="text-[10px] text-slate-500">Araure · Edo. Portuguesa · Venezuela</p>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Drawer (Visible when isOpenMobile is true) */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={onCloseMobile}
          />
          {/* Drawer content */}
          <div className="relative w-72 max-w-[85vw] bg-[#070d1f] border-r border-surface-border p-4 flex flex-col justify-between h-full shadow-2xl z-10 overflow-y-auto safe-area-pb">
            {renderNavContent(true)}
          </div>
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex w-64 glass-card min-h-[calc(100vh-60px)] p-3.5 flex-col justify-between border-r border-surface-border shrink-0 sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
        {renderNavContent(false)}
      </aside>
    </>
  );
};
