import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lledó Automations | Automatización e IA para tu negocio",
  description:
    "Diseñamos sistemas de IA y automatización que eliminan tareas repetitivas, capturan más leads y escalan tu negocio.",
  openGraph: {
    title: "Lledó Automations | Automatización e IA para tu negocio",
    description: "Menos tareas. Más crecimiento.",
    url: "https://lledoautomations.com",
    siteName: "Lledó Automations",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${outfit.className} antialiased`}
        style={{ background: "#07080A", color: "#F1F1F3" }}
      >
        {children}
      </body>
    </html>
  );
}