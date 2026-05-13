import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
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

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WXVXVLDN9W"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-WXVXVLDN9W');
          `}
        </Script>
      </body>
    </html>
  );
}