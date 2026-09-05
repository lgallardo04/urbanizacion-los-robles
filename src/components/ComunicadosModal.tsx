"use client";

import React, { useState, useEffect } from "react";
import { 
  Megaphone, 
  Droplet, 
  Zap, 
  Users, 
  Calendar, 
  Clock, 
  ShieldAlert, 
  X, 
  Share2 
} from "lucide-react";
import { ComunicadoComunal } from "../lib/types";
import { fetchComunicados, MOCK_COMUNICADOS } from "../lib/data/api";
import toast from "react-hot-toast";

interface ComunicadosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComunicadosModal: React.FC<ComunicadosModalProps> = ({ isOpen, onClose }) => {
  const [comunicados, setComunicados] = useState<ComunicadoComunal[]>(MOCK_COMUNICADOS);

  useEffect(() => {
    if (isOpen) {
      fetchComunicados().then(setComunicados);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleShare = (c: ComunicadoComunal) => {
    const text = `📢 *URB. LOS ROBLES · ARAURE*\n*${c.titulo}*\n\n${c.contenido}\n\n_Emisor: ${c.emisor}_`;
    navigator.clipboard.writeText(text);
    toast.success("Comunicado copiado para WhatsApp / Telegram");
  };

  const getBadgeCategory = (cat: string) => {
    switch (cat) {
      case "AGUA": return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case "ELECTRICIDAD": return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      case "ASAMBLEA": return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      default: return "bg-robles-500/20 text-robles-300 border-robles-500/30";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="glass-card max-w-2xl w-full rounded-2xl border border-surface-border overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in duration-150">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-robles-500/20 border border-robles-500/30 text-robles-400 flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cartelera Digital Comunal</h3>
              <p className="text-xs text-slate-400">Avisos oficiales y convocatorias de asambleas</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {comunicados.map((c) => (
            <div
              key={c.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 hover:border-slate-700 transition"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getBadgeCategory(c.categoria)}`}>
                    {c.categoria}
                  </span>
                  <h4 className="text-sm font-bold text-white">{c.titulo}</h4>
                </div>

                <button
                  onClick={() => handleShare(c)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-robles-500/20 text-slate-400 hover:text-robles-300 transition text-xs flex items-center gap-1 shrink-0"
                  title="Copiar para WhatsApp"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline">Compartir</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {c.contenido}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono">
                <span>Emisor: <strong className="text-slate-200">{c.emisor}</strong></span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(c.fechaPublicacion).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-robles-500 text-slate-950 font-bold text-xs hover:bg-robles-400 transition"
          >
            Cerrar Cartelera
          </button>
        </div>
      </div>
    </div>
  );
};
