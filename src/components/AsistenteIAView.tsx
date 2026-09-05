"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  FileText, 
  Ruler, 
  Scale, 
  Droplet, 
  Zap, 
  CheckCircle2, 
  MessageSquare,
  Copy
} from "lucide-react";
import toast from "react-hot-toast";

interface MensajeChat {
  id: string;
  sender: 'ai' | 'user';
  texto: string;
  timestamp: string;
}

export const AsistenteIAView: React.FC = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mensajes, setMensajes] = useState<MensajeChat[]>([
    {
      id: "msg-0",
      sender: "ai",
      texto: "¡Hola! Soy el **Asistente Comunal & Urbanístico de Los Robles** (Araure, Portuguesa). Estoy capacitado en la **Ley Orgánica de Ordenación Urbanística (LOOU)**, normas sanitarias **COVENIN 4044**, ordenanzas de la **Alcaldía de Araure** y gestión de servicios públicos. ¿En qué te puedo ayudar hoy?",
      timestamp: "Ahora",
    },
  ]);

  const quickPrompts = [
    {
      titulo: "📐 Retiros Reglamentarios",
      prompt: "¿Cuáles son los retiros mínimos obligatorios para construir o remodelar en Los Robles (Zonificación R-2)?",
    },
    {
      titulo: "💧 Cálculo de Tanque COVENIN",
      prompt: "Calcula la capacidad de tanque subterráneo recomendada para una familia de 5 personas con dotación COVENIN de 250 L/hab/día.",
    },
    {
      titulo: "📢 Redactar Comunicado WhatsApp",
      prompt: "Redacta un comunicado oficial para WhatsApp sobre un mantenimiento de bomba de agua en el Pozo N°2 este jueves.",
    },
    {
      titulo: "🏛️ Trámite en Alcaldía de Araure",
      prompt: "¿Cuáles son los requisitos ante la Dirección de Control Urbano de la Alcaldía de Araure para una ampliación de vivienda?",
    },
  ];

  const handleSend = (textToSend?: string) => {
    const prompt = textToSend || inputMessage;
    if (!prompt.trim()) return;

    const userMsg: MensajeChat = {
      id: `user-${Date.now()}`,
      sender: "user",
      texto: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMensajes((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      let respuesta = "";

      if (prompt.toLowerCase().includes("retiro") || prompt.toLowerCase().includes("r-2")) {
        respuesta = `### 📐 Retiros Obligatorios según LOOU & Zonificación R-2 (Bifamiliar):
Para la **Urbanización Los Robles**, el Plan de Desarrollo Urbano Local (PDUL) de Araure establece:
- **Retiro de Frente:** Mínimo **4.00 metros** desde el lindero de la acera hasta la fachada principal.
- **Retiros Laterales:** Mínimo **2.00 metros** a cada lado (izquierdo y derecho) para garantizar ventilación e iluminación natural.
- **Retiro de Fondo:** Mínimo **3.00 metros** con respecto al lindero posterior.
- **Porcentaje de Ubicación Máximo:** **65%** del área total de la parcela.
- **Porcentaje de Construcción Máximo:** **130%** (máximo 2 plantas o 7.50 m de altura).
- **Área Permeable:** Mínimo **15%** en suelo absorbente / jardín.`;
      } else if (prompt.toLowerCase().includes("tanque") || prompt.toLowerCase().includes("agua") || prompt.toLowerCase().includes("covenin")) {
        respuesta = `### 💧 Cálculo de Dotación Sanitaria (Norma COVENIN 4044 / G.O. 4.044):
Para una vivienda con **5 habitantes** en Araure:
1. **Dotación Diaria Base:** \\(5 \\times 250\\,\\text{L/hab/día} = 1.250\\,\\text{L/día}\\).
2. **Reserva Mínima Requerida (Autonomía de 3 días / 72 horas):**
   \\[ 1.250\\,\\text{L/día} \\times 3\\,\\text{días} = \\mathbf{3.750\\,\\text{Litros}} \\]
3. **Recomendación Técnica:** Se sugiere instalar un tanque subterráneo de al menos **5.000 a 8.000 Litros** con sistema hidroneumático de 1/2 a 3/4 HP para proteger a la familia ante contingencias de la red matriz de Hidroportuguesa.`;
      } else if (prompt.toLowerCase().includes("whatsapp") || prompt.toLowerCase().includes("comunicado")) {
        respuesta = `### 📢 Plantilla de Comunicado Oficial para Difusión Comunitaria:

\`\`\`text
🌳 URBANIZACIÓN LOS ROBLES · ARAURE 🌳
COMITÉ DE SERVICIOS PÚBLICOS & ASOVECINOS

📅 FECHA: ${new Date().toLocaleDateString()}
📢 ASUNTO: MANTENIMIENTO PREVENTIVO EN POZO PROFUNDO N°2

Estimados vecinos y copropietarios:

Se les informa que este JUEVES a partir de las 08:00 AM se realizarán labores de mantenimiento preventivo y ajuste de tablero eléctrico en el motor de 15HP del Pozo N°2.

💧 PREVISIÓN DE SERVICIO:
Durante los trabajos, el suministro a las Manzanas A, B, C, D, E y F se mantendrá operativo gracias a la reserva del Tanque Comunal (180.000 Litros).

Agradecemos hacer uso racional del agua y verificar el llenado de sus tanques residenciales.

Atentamente,
Junta de Condominio & Mesa Técnica de Agua Los Robles
\`\`\``;
      } else if (prompt.toLowerCase().includes("alcaldia") || prompt.toLowerCase().includes("tramite") || prompt.toLowerCase().includes("permiso")) {
        respuesta = `### 🏛️ Requisitos para Permiso de Construcción / Remodelación (Alcaldía de Araure):
Ante la **Dirección de Control Urbano y Catastro del Municipio Araure**:
1. Copia del Documento de Propiedad debidamente registrado en el Registro Inmobiliario de Acarigua/Araure.
2. Ficha Catastral actualizada de la Urbanización Los Robles.
3. Solvencia Municipal de Impuestos Inmobiliarios y Solvencia de Condominio al día.
4. Memoria Descriptiva y Juego de Planos (Arquitectura y Estructura) firmados por Ingeniero o Arquitecto colegiado (CIV).
5. Cumplimiento estricto de los retiros LOOU ($\ge 4.0\\text{m}$ frente, $\ge 2.0\\text{m}$ lateral, $\ge 3.0\\text{m}$ fondo).
6. Planilla de Solicitud de Constancia de Variables Urbanas Fundamentales.`;
      } else {
        respuesta = `Entendido. Con respecto a **"${prompt}"**, según las directrices comunitarias de la **Urbanización Los Robles** y el marco jurídico venezolano (LOOU / LORLOCC), te recomiendo verificar que cualquier proyecto cuente con la aprobación previa de la Mesa Técnica de Urbanismo y se mantenga dentro de los parámetros de la Zonificación R-2. ¿Deseas que analicemos algún cálculo específico o redactemos un documento formal?`;
      }

      const aiMsg: MensajeChat = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        texto: respuesta,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMensajes((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Texto copiado al portapapeles");
  };

  return (
    <div className="space-y-4 pb-16 lg:pb-0">
      {/* Header */}
      <div className="p-4 sm:p-6 rounded-2xl glass-card border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-robles-400">
              Inteligencia Artificial Especializada
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-robles-500/20 text-robles-300 border border-robles-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Robles AI Copilot
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-extrabold text-white">
            Asistente Urbanístico & Comunal
          </h2>
          <p className="text-xs text-slate-300">
            Consultas legales de LOOU, cálculo de dotaciones, ordenanzas de Araure y redacción automática.
          </p>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp.prompt)}
            className="p-3 rounded-xl glass-card border border-surface-border hover:border-robles-500/40 text-left transition space-y-1 group active:scale-95"
          >
            <span className="text-xs font-bold text-white group-hover:text-robles-400 transition block">
              {qp.titulo}
            </span>
            <span className="text-[10px] text-slate-400 line-clamp-2">
              {qp.prompt}
            </span>
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="glass-card rounded-2xl border border-surface-border flex flex-col h-[520px]">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {mensajes.map((msg) => {
            const isAi = msg.sender === "ai";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAi ? "items-start" : "items-start flex-row-reverse"}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isAi
                      ? "bg-gradient-to-br from-robles-500 to-cyan-500 text-slate-950 font-bold shadow-emerald-glow"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-xs leading-relaxed ${
                    isAi
                      ? "bg-slate-900/90 text-slate-200 border border-slate-800"
                      : "bg-robles-500 text-slate-950 font-medium ml-auto"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.texto}</div>
                  <div className="flex items-center justify-between pt-1 text-[10px] opacity-70">
                    <span>{msg.timestamp}</span>
                    {isAi && (
                      <button
                        onClick={() => copyToClipboard(msg.texto)}
                        className="hover:opacity-100 flex items-center gap-1 text-slate-400 hover:text-white transition"
                        title="Copiar respuesta"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-robles-400 font-medium">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Robles AI Copilot está analizando la normativa venezolana...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/80 rounded-b-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Pregunta sobre retiros LOOU, cálculo de tanque, redacción de avisos..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-robles-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="px-4 py-2.5 rounded-xl bg-robles-500 hover:bg-robles-400 text-slate-950 font-bold text-xs transition disabled:opacity-50 active:scale-95 flex items-center gap-1.5 shadow-emerald-glow"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Consultar</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
