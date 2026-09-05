"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { Sidebar, TabType } from "../components/Sidebar";
import { BottomNav } from "../components/BottomNav";
import { DashboardView } from "../components/DashboardView";
import { CatastroView } from "../components/CatastroView";
import { CensoSaludView } from "../components/CensoSaludView";
import { GaritaAccesoView } from "../components/GaritaAccesoView";
import { IncidenciasView } from "../components/IncidenciasView";
import { ServiciosView } from "../components/ServiciosView";
import { CondominioView } from "../components/CondominioView";
import { ReportesView } from "../components/ReportesView";
import { AsistenteIAView } from "../components/AsistenteIAView";
import { NormativaView } from "../components/NormativaView";
import { MapaUrbanismoView } from "../components/MapaUrbanismoView";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { LoginView } from "../components/LoginView";
import { SimuladorNormativoModal } from "../components/SimuladorNormativoModal";
import { SolvenciaQRModal } from "../components/SolvenciaQRModal";
import { FichaParcelaModal } from "../components/FichaParcelaModal";
import { ComunicadosModal } from "../components/ComunicadosModal";
import { ParcelaUrbanismo } from "../lib/types";
import { useRealtimeSemaforo } from "../lib/hooks/useRealtimeSemaforo";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSimuladorOpen, setIsSimuladorOpen] = useState(false);
  const [isComunicadosOpen, setIsComunicadosOpen] = useState(false);
  const [selectedParcelaForSolvencia, setSelectedParcelaForSolvencia] = useState<ParcelaUrbanismo | null>(null);
  const [selectedParcelaForModal, setSelectedParcelaForModal] = useState<ParcelaUrbanismo | null>(null);

  // Live semaforo from Supabase Realtime (falls back to mock if unavailable)
  const { semaforo } = useRealtimeSemaforo();

  if (!isLoggedIn) {
    return (
      <>
        <Toaster position="top-center" toastOptions={{ style: { background: "#0f172a", color: "#fff", border: "1px solid #334155", fontSize: "13px" } }} />
        <LoginView onLoginSuccess={() => setIsLoggedIn(true)} />
      </>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#070d1f]">
      <Toaster position="top-right" toastOptions={{ style: { background: "#0f172a", color: "#fff", border: "1px solid #334155", fontSize: "13px" } }} />

      {/* Top Header */}
      <Header
        semaforo={semaforo}
        onOpenSimulador={() => setIsSimuladorOpen(true)}
        onOpenComunicados={() => setIsComunicadosOpen(true)}
        onOpenAsistente={() => setActiveTab("asistente")}
        onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left Sidebar (Desktop & Mobile Drawer) */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setIsMobileMenuOpen(false);
          }}
          onOpenSimulador={() => {
            setIsSimuladorOpen(true);
            setIsMobileMenuOpen(false);
          }}
          onOpenComunicados={() => {
            setIsComunicadosOpen(true);
            setIsMobileMenuOpen(false);
          }}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Dynamic Center View */}
        <section className="flex-1 p-3 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full pb-28 lg:pb-10">
          <ErrorBoundary>
            {activeTab === "dashboard" && (
              <DashboardView
                onNavigate={(tab) => setActiveTab(tab)}
                onSelectParcela={(parcela) => setSelectedParcelaForModal(parcela)}
                onOpenSimulador={() => setIsSimuladorOpen(true)}
              />
            )}

            {activeTab === "mapa" && (
              <MapaUrbanismoView
                onNavigate={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === "catastro" && (
              <CatastroView
                onSelectParcela={(parcela) => setSelectedParcelaForModal(parcela)}
                onOpenSolvenciaQR={(parcela) => setSelectedParcelaForSolvencia(parcela)}
                onOpenSimulador={() => setIsSimuladorOpen(true)}
              />
            )}

            {activeTab === "censo" && (
              <CensoSaludView
                onSelectParcela={(parcela) => setSelectedParcelaForModal(parcela)}
              />
            )}

            {activeTab === "garita" && <GaritaAccesoView />}

            {activeTab === "incidencias" && <IncidenciasView />}

            {activeTab === "servicios" && <ServiciosView />}

            {activeTab === "condominio" && (
              <CondominioView
                onOpenSolvenciaQR={(parcela) => setSelectedParcelaForSolvencia(parcela)}
              />
            )}

            {activeTab === "reportes" && <ReportesView />}

            {activeTab === "asistente" && <AsistenteIAView />}

            {activeTab === "normativa" && <NormativaView />}
          </ErrorBoundary>
        </section>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenSimulador={() => setIsSimuladorOpen(true)}
      />

      {/* Modals */}
      <SimuladorNormativoModal isOpen={isSimuladorOpen} onClose={() => setIsSimuladorOpen(false)} />
      <ComunicadosModal isOpen={isComunicadosOpen} onClose={() => setIsComunicadosOpen(false)} />
      <SolvenciaQRModal parcela={selectedParcelaForSolvencia} onClose={() => setSelectedParcelaForSolvencia(null)} />
      <FichaParcelaModal
        parcela={selectedParcelaForModal}
        onClose={() => setSelectedParcelaForModal(null)}
        onOpenSolvencia={(parcela) => {
          setSelectedParcelaForModal(null);
          setSelectedParcelaForSolvencia(parcela);
        }}
      />
    </main>
  );
}
