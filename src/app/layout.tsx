import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#070d1f",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Urbanización Los Robles | Sistema Integral de Urbanismo, Censo & Servicios",
  description: "Plataforma digital para la gestión de urbanismo, censo comunal residencial, salud inteligente y control de servicios públicos en Araure, Venezuela.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon-192.png",
    apple: "/icon-192.png",
  },
  openGraph: {
    title: "Urbanización Los Robles | Sistema Integral de Urbanismo & Servicios",
    description: "Plataforma comunal residencial y catastro normativo LOOU en Araure, Edo. Portuguesa.",
    locale: "es_VE",
    type: "website",
    siteName: "Urbanización Los Robles",
  },
  twitter: {
    card: "summary",
    title: "Urbanización Los Robles",
    description: "Sistema Integral de Urbanismo, Censo & Servicios Comunales",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#070d1f] text-[#dee5f8] antialiased selection:bg-robles-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
