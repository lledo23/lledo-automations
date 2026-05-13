"use client";

import { motion } from "framer-motion";

const colors = {
  bg: "#07080A",
  text: "#F1F1F3",
  textMuted: "#8B8D97",
  textDim: "#5A5C66",
  accent: "#6C5CE7",
  accentLight: "#A29BFE",
  green: "#00D2A0",
  glassBorder: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.06)",
};

export default function PoliticaDePrivacidad() {
  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        fontFamily: "'Outfit', system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Navbar simple */}
      <nav style={{ padding: "20px 24px", borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32, height: 32,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.green})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 14 }}>L</span>
            </div>
            <span style={{ color: colors.text, fontWeight: 700, fontSize: 16 }}>
              Lledó <span style={{ color: colors.textMuted, fontWeight: 400 }}>Automations</span>
            </span>
          </a>
          <a
            href="/"
            style={{
              color: colors.textMuted,
              textDecoration: "none",
              fontSize: 14,
              padding: "8px 16px",
              borderRadius: 8,
              border: `1px solid ${colors.glassBorder}`,
              transition: "color 0.2s",
            }}
          >
            ← Volver al inicio
          </a>
        </div>
      </nav>

      {/* Contenido */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px 100px" }}
      >
        <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.03em" }}>
          Política de Privacidad
        </h1>
        <p style={{ color: colors.textDim, fontSize: 14, marginBottom: 48 }}>
          Última actualización: mayo 2026
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          <LegalSection title="1. Responsable del tratamiento">
            <p>El responsable del tratamiento de tus datos personales es:</p>
            <ul>
              <li><strong>Nombre comercial:</strong> Lledó Automations</li>
              <li><strong>Sitio web:</strong> lledo-automations.com</li>
              <li><strong>Email de contacto:</strong> contacto@lledo-automations.com</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. Datos que recopilamos">
            <p>Podemos recopilar los siguientes datos personales cuando interactúas con nosotros:</p>
            <ul>
              <li>Nombre y apellidos</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (WhatsApp)</li>
              <li>Nombre de la empresa</li>
              <li>Datos de navegación (cookies, dirección IP, tipo de navegador)</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Finalidad del tratamiento">
            <p>Utilizamos tus datos personales para:</p>
            <ul>
              <li>Responder a tus consultas y solicitudes de contacto</li>
              <li>Gestionar la relación comercial y prestación de servicios</li>
              <li>Enviarte información sobre nuestros servicios (solo con tu consentimiento)</li>
              <li>Mejorar la experiencia de navegación en nuestra web</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Base legal del tratamiento">
            <p>El tratamiento de tus datos se basa en:</p>
            <ul>
              <li><strong>Consentimiento:</strong> cuando nos contactas voluntariamente por WhatsApp, email o formulario</li>
              <li><strong>Ejecución de un contrato:</strong> cuando contratas nuestros servicios de automatización</li>
              <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y la experiencia del usuario</li>
              <li><strong>Obligación legal:</strong> para cumplir con la normativa aplicable</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Conservación de los datos">
            <p>
              Conservaremos tus datos personales durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para cumplir con las obligaciones legales aplicables. Con carácter general:
            </p>
            <ul>
              <li>Datos de clientes: durante la relación contractual y los años legalmente requeridos</li>
              <li>Datos de contacto (consultas): hasta 12 meses desde la última comunicación</li>
              <li>Datos de navegación: máximo 24 meses</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Destinatarios de los datos">
            <p>
              No vendemos ni compartimos tus datos personales con terceros, salvo:
            </p>
            <ul>
              <li>Proveedores de servicios esenciales (hosting, email, herramientas de automatización) que actúan como encargados del tratamiento</li>
              <li>Cuando sea requerido por ley o autoridad competente</li>
            </ul>
          </LegalSection>

          <LegalSection title="7. Tus derechos">
            <p>
              De acuerdo con el RGPD, tienes derecho a:
            </p>
            <ul>
              <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti</li>
              <li><strong>Rectificación:</strong> corregir datos inexactos</li>
              <li><strong>Supresión:</strong> solicitar la eliminación de tus datos</li>
              <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos</li>
              <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado</li>
              <li><strong>Limitación:</strong> solicitar la limitación del tratamiento</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, contacta con nosotros en contacto@lledo-automations.com. Responderemos en un plazo máximo de 30 días.
            </p>
            <p>
              También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) en <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" style={{ color: colors.accentLight }}>www.aepd.es</a>.
            </p>
          </LegalSection>

          <LegalSection title="8. Cookies">
            <p>
              Este sitio web puede utilizar cookies técnicas y analíticas para mejorar la experiencia de navegación. Las cookies analíticas solo se activan con tu consentimiento. Puedes configurar tu navegador para rechazar cookies en cualquier momento.
            </p>
          </LegalSection>

          <LegalSection title="9. Seguridad">
            <p>
              Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos personales contra acceso no autorizado, pérdida o destrucción, incluyendo cifrado SSL/TLS en todas las comunicaciones.
            </p>
          </LegalSection>

          <LegalSection title="10. Modificaciones">
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página con la fecha de última actualización.
            </p>
          </LegalSection>
        </div>
      </motion.main>

      {/* Footer simple */}
      <footer style={{ padding: "32px 24px", borderTop: `1px solid ${colors.border}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 12, color: colors.textDim }}>
            © 2026 Lledó Automations. Todos los derechos reservados.
          </span>
        </div>
      </footer>
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 style={{
        fontSize: 20,
        fontWeight: 600,
        color: colors.text,
        marginBottom: 12,
        letterSpacing: "-0.02em",
      }}>
        {title}
      </h2>
      <div style={{
        fontSize: 15,
        color: colors.textMuted,
        lineHeight: 1.75,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}>
        {children}
      </div>
      <style>{`
        ul {
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        li {
          color: #8B8D97;
          font-size: 15px;
          line-height: 1.7;
        }
        strong {
          color: #F1F1F3;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}