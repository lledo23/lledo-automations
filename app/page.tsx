"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── DESIGN TOKENS ───
const colors = {
  bg: "#07080A",
  bgCard: "rgba(255,255,255,0.03)",
  bgCardHover: "rgba(255,255,255,0.06)",
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.08)",
  text: "#F1F1F3",
  textMuted: "#8B8D97",
  textDim: "#5A5C66",
  accent: "#6C5CE7",
  accentLight: "#A29BFE",
  accentGlow: "rgba(108,92,231,0.3)",
  green: "#00D2A0",
  greenGlow: "rgba(0,210,160,0.2)",
  border: "rgba(255,255,255,0.06)",
};

const WA_LINK = "https://wa.me/34687136475?text=Hola%2C%20me%20interesa%20automatizar%20mi%20negocio.%20%C2%BFPodemos%20hablar%3F";
const WA_LINK_CTA = "https://wa.me/34687136475?text=Hola%2C%20quiero%20reservar%20una%20llamada%20para%20hablar%20sobre%20automatizaci%C3%B3n.";
const WA_LINK_SERVICIOS = "https://wa.me/34687136475?text=Hola%2C%20quiero%20automatizar%20mi%20negocio.%20%C2%BFQu%C3%A9%20servicios%20ofrec%C3%A9is%3F";

// ─── REUSABLE COMPONENTS ───
function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={{ padding: "100px 0" }}
    >
      {children}
    </motion.section>
  );
}

function Container({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", ...style }}>
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 16px",
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 500,
        color: colors.accentLight,
        background: "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(162,155,254,0.08))",
        border: "1px solid rgba(108,92,231,0.2)",
        letterSpacing: 0.3,
      }}
    >
      {children}
    </span>
  );
}

function SectionTitle({ badge, title, subtitle }: { badge?: string; title: string; subtitle?: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 64, maxWidth: 700, margin: "0 auto 64px" }}>
      {badge && (
        <div style={{ marginBottom: 20 }}>
          <Badge>{badge}</Badge>
        </div>
      )}
      <h2
        style={{
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          marginBottom: 16,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: colors.textMuted, lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function GlassCard({ children, style, hover = true }: { children: React.ReactNode; style?: React.CSSProperties; hover?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        background: hovered && hover ? colors.bgCardHover : colors.bgCard,
        borderColor: hovered && hover ? "rgba(108,92,231,0.15)" : colors.glassBorder,
      }}
      transition={{ duration: 0.3 }}
      style={{
        borderRadius: 16,
        border: `1px solid ${colors.glassBorder}`,
        backdropFilter: "blur(20px)",
        padding: 32,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

function Button({ children, variant = "primary", style, onClick }: { children: React.ReactNode; variant?: string; style?: React.CSSProperties; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        padding: isPrimary ? "14px 32px" : "14px 28px",
        borderRadius: 12,
        border: isPrimary ? "none" : `1px solid ${colors.glassBorder}`,
        background: isPrimary
          ? hovered
            ? "linear-gradient(135deg, #7C6CF0, #6C5CE7)"
            : "linear-gradient(135deg, #6C5CE7, #5A4BD1)"
          : hovered
          ? "rgba(255,255,255,0.06)"
          : "transparent",
        color: isPrimary ? "#fff" : colors.text,
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        boxShadow: isPrimary ? `0 0 30px ${colors.accentGlow}` : "none",
        transition: "box-shadow 0.3s",
        letterSpacing: 0.2,
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

// ─── ICONS ───
function Icon({ name, size = 24, color = colors.accentLight }: { name: string; size?: number; color?: string }) {
  const icons: Record<string, React.ReactNode> = {
    bot: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <circle cx="8" cy="16" r="1" fill={color} />
        <circle cx="16" cy="16" r="1" fill={color} />
      </svg>
    ),
    zap: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    mail: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 6L2 7" />
      </svg>
    ),
    phone: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
      </svg>
    ),
    link: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
      </svg>
    ),
    cpu: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="15" x2="23" y2="15" />
        <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="15" x2="4" y2="15" />
      </svg>
    ),
    workflow: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="15" y="3" width="6" height="6" rx="1" />
        <rect x="9" y="15" width="6" height="6" rx="1" />
        <path d="M6 9v3a1 1 0 001 1h4" /><path d="M18 9v3a1 1 0 01-1 1h-4" />
      </svg>
    ),
    brain: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a6 6 0 016 6c0 2-1 3-2 4s-1 2-1 4h-6c0-2 0-3-1-4s-2-2-2-4a6 6 0 016-6z" />
        <path d="M9 16h6" /><path d="M10 20h4" /><path d="M10 18h4" />
      </svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    clock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
    trending: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    arrow: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    star: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    home: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    cart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
    heart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    coffee: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 010 8h-1" /><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    globe: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    scale: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 3L3 21" /><path d="M21 3h-6" /><path d="M21 3v6" /><path d="M3 21h6" /><path d="M3 21v-6" />
      </svg>
    ),
  };
  return <>{icons[name] || null}</>;
}

// ─── ANIMATED GRID BACKGROUND ───
function GridBackground() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(108,92,231,0.08), transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 50%, rgba(0,210,160,0.04), transparent),
          ${colors.bg}
        `,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

// ─── FLOATING ORB ───
function Orb({ color, size, top, left, delay = 0 }: { color: string; size: number; top: string; left: string; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.05, 1] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{
        position: "absolute",
        width: size, height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        top, left,
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

// ─── NAVBAR ───
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Casos", href: "#casos" },
    { label: "Sobre mí", href: "#sobre" },
  ];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: "0 24px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "12px auto 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          borderRadius: 16,
          background: scrolled ? "rgba(7,8,10,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.4)" : "none",
          border: scrolled ? `1px solid ${colors.glassBorder}` : "1px solid transparent",
          transition: "all 0.35s ease",
        }}
      >
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="Lled\u00f3 Automations" style={{ height: 90, objectFit: "contain" }} />
          <span style={{ color: colors.text, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }}>
            Lledó <span style={{ color: colors.textMuted, fontWeight: 400 }}>Automations</span>
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="nav-desktop">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                color: colors.textMuted,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.text)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.textMuted)}
            >
              {l.label}
            </a>
          ))}
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <Button style={{ padding: "10px 22px", fontSize: 14 }}>
              Reserva una llamada
            </Button>
          </a>
        </div>

        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: colors.text,
            cursor: "pointer",
            padding: 8,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="nav-mobile-menu"
            style={{
              maxWidth: 1200,
              margin: "8px auto 0",
              padding: 24,
              borderRadius: 16,
              background: "rgba(7,8,10,0.95)",
              backdropFilter: "blur(20px)",
              border: `1px solid ${colors.glassBorder}`,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{ color: colors.textMuted, textDecoration: "none", fontSize: 16, fontWeight: 500, padding: "8px 0" }}
              >
                {l.label}
              </a>
            ))}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <Button style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                Reserva una llamada
              </Button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ───
function Hero() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
      <Orb color="rgba(108,92,231,0.25)" size={500} top="-10%" left="60%" delay={0} />
      <Orb color="rgba(0,210,160,0.15)" size={400} top="50%" left="-10%" delay={2} />
      <Container style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <Badge>✦ Automatización inteligente con IA</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: "clamp(36px, 7vw, 76px)",
            fontWeight: 800,
            color: colors.text,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginTop: 28,
            marginBottom: 24,
          }}
        >
          Menos tareas.
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.accentLight}, ${colors.green})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Más crecimiento.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: "clamp(16px, 2.2vw, 20px)",
            color: colors.textMuted,
            maxWidth: 580,
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          Diseñamos sistemas de IA y automatización que eliminan tareas repetitivas, capturan más leads y escalan tu negocio — sin contratar más equipo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
        >
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <Button>
              Reserva una llamada gratuita <Icon name="arrow" size={16} color="#fff" />
            </Button>
          </a>
          <a href="#servicios" style={{ textDecoration: "none" }}>
            <Button variant="secondary">
              Ver servicios
            </Button>
          </a>
        </motion.div>

        {/* Hero Visual - Animated Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          style={{ marginTop: 80, position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              inset: -2,
              borderRadius: 24,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.green}, ${colors.accent})`,
              opacity: 0.15,
              filter: "blur(1px)",
            }}
          />
          <div
            style={{
              position: "relative",
              borderRadius: 20,
              border: `1px solid ${colors.glassBorder}`,
              background: "rgba(12,13,16,0.8)",
              backdropFilter: "blur(20px)",
              padding: "24px 32px 32px",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {[
                { label: "Leads capturados", value: "2,847", change: "+34%", color: colors.green },
                { label: "Tareas automatizadas", value: "12,493", change: "+89%", color: colors.accentLight },
                { label: "Horas ahorradas", value: "1,240h", change: "+67%", color: "#F5A623" },
                { label: "Ratio conversión", value: "18.4%", change: "+12%", color: "#E74C8B" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.15 }}
                  style={{
                    padding: 20,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.03)",
                    border: `1px solid ${colors.glassBorder}`,
                  }}
                >
                  <div style={{ fontSize: 12, color: colors.textMuted, marginBottom: 8 }}>{stat.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: colors.text, letterSpacing: "-0.02em" }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: stat.color, marginTop: 4, fontWeight: 600 }}>{stat.change}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// ─── PROBLEMS ───
function Problems() {
  const problems = [
    { icon: "clock", title: "Tareas repetitivas", desc: "Tu equipo pierde horas en procesos que deberían estar automatizados." },
    { icon: "users", title: "Leads sin seguimiento", desc: "Potenciales clientes se pierden porque nadie responde a tiempo." },
    { icon: "phone", title: "Atención al cliente lenta", desc: "Tus clientes esperan respuestas que podrían ser instantáneas." },
    { icon: "workflow", title: "Procesos manuales", desc: "Copias datos entre herramientas y pierdes eficiencia cada día." },
  ];

  return (
    <Section id="problemas">
      <Container>
        <SectionTitle
          badge="El problema"
          title="Tu negocio no necesita más horas. Necesita sistemas."
          subtitle="Estas situaciones te suenan, ¿verdad? Son los síntomas de una empresa que aún no ha automatizado."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard style={{ height: "100%" }}>
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: "rgba(231,76,76,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon name={p.icon} color="#E74C4C" />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 650, color: colors.text, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.6 }}>{p.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── SERVICES ───
function Services() {
  const services = [
    { icon: "brain", title: "Automatizaciones con IA", desc: "Flujos inteligentes que aprenden y se adaptan a tu negocio.", benefit: "Decisiones automáticas" },
    { icon: "bot", title: "Chatbots inteligentes", desc: "Asistentes 24/7 que resuelven dudas, cualifican leads y cierran ventas.", benefit: "Atención sin límites" },
    { icon: "phone", title: "Automatización WhatsApp", desc: "Respuestas automáticas, seguimientos y campañas en el canal #1.", benefit: "+80% apertura" },
    { icon: "users", title: "Automatización de leads", desc: "Captura, cualifica y distribuye leads sin intervención manual.", benefit: "0 leads perdidos" },
    { icon: "link", title: "Integraciones API", desc: "Conecta tus herramientas y elimina la copia manual de datos.", benefit: "Todo conectado" },
    { icon: "workflow", title: "n8n / Make / Zapier", desc: "Flujos complejos orquestados con las mejores plataformas del mercado.", benefit: "Sin código" },
    { icon: "mail", title: "Automatización de emails", desc: "Secuencias personalizadas que nutren y convierten automáticamente.", benefit: "Ventas en piloto" },
    { icon: "cpu", title: "Agentes IA", desc: "Sistemas autónomos que ejecutan tareas complejas por ti.", benefit: "Tu equipo IA" },
  ];

  return (
    <Section id="servicios">
      <Container>
        <SectionTitle
          badge="Servicios"
          title="Soluciones que trabajan mientras tú duermes"
          subtitle="Cada servicio se diseña a medida para tu negocio. Sin plantillas. Sin límites."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16 }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <GlassCard style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    width: 44, height: 44,
                    borderRadius: 12,
                    background: "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(0,210,160,0.08))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: 16,
                  }}
                >
                  <Icon name={s.icon} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 650, color: colors.text, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.6, flex: 1 }}>{s.desc}</p>
                <div
                  style={{
                    marginTop: 16,
                    padding: "8px 14px",
                    borderRadius: 8,
                    background: "rgba(0,210,160,0.06)",
                    border: "1px solid rgba(0,210,160,0.12)",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    alignSelf: "flex-start",
                  }}
                >
                  <Icon name="check" size={14} color={colors.green} />
                  <span style={{ fontSize: 12, color: colors.green, fontWeight: 600 }}>{s.benefit}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── PROCESS ───
function Process() {
  const steps = [
    { num: "01", title: "Análisis", desc: "Entendemos tu negocio, tus procesos y dónde se pierde tiempo y dinero.", color: colors.accent },
    { num: "02", title: "Diseño", desc: "Mapeamos los flujos y diseñamos la arquitectura de automatización perfecta.", color: colors.accentLight },
    { num: "03", title: "Automatización", desc: "Construimos e implementamos cada sistema con precisión quirúrgica.", color: colors.green },
    { num: "04", title: "Optimización", desc: "Medimos, ajustamos y escalamos para maximizar el ROI continuamente.", color: "#F5A623" },
  ];

  return (
    <Section id="proceso">
      <Container>
        <SectionTitle
          badge="Cómo trabajo"
          title="De la idea al sistema en semanas, no meses"
          subtitle="Un proceso probado que transforma tu negocio sin fricciones."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GlassCard style={{ textAlign: "center", padding: "40px 28px" }}>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: s.color,
                    opacity: 0.15,
                    lineHeight: 1,
                    marginBottom: 12,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.num}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.65 }}>{s.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── USE CASES ───
function UseCases() {
  const cases = [
    { icon: "home", title: "Inmobiliarias", desc: "Captura leads de portales, responde en segundos y agenda visitas automáticamente.", result: "3x más visitas agendadas" },
    { icon: "cart", title: "Ecommerce", desc: "Recupera carritos abandonados, automatiza soporte post-venta y personaliza ofertas.", result: "40% más recuperación" },
    { icon: "heart", title: "Clínicas", desc: "Gestión automática de citas, recordatorios y seguimiento de pacientes por WhatsApp.", result: "90% menos no-shows" },
    { icon: "trending", title: "Agencias", desc: "Automatiza reporting, distribución de leads y comunicación con clientes.", result: "15h/semana ahorradas" },
    { icon: "coffee", title: "Restaurantes", desc: "Reservas automáticas, menú digital con IA y atención en WhatsApp.", result: "Atención 24/7" },
  ];

  return (
    <Section id="casos">
      <Container>
        <SectionTitle
          badge="Casos de uso"
          title="Automatización que funciona en cualquier sector"
          subtitle="Resultados reales para negocios reales."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {cases.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 48, height: 48,
                    minWidth: 48,
                    borderRadius: 14,
                    background: "linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,210,160,0.1))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon name={c.icon} />
                </div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 650, color: colors.text, marginBottom: 6 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: colors.textMuted, lineHeight: 1.6, marginBottom: 12 }}>{c.desc}</p>
                  <span style={{ fontSize: 13, color: colors.green, fontWeight: 600 }}>→ {c.result}</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── BENEFITS ───
function Benefits() {
  const benefits = [
    { icon: "clock", title: "Ahorra tiempo", desc: "Elimina horas de trabajo manual cada semana.", stat: "40h/mes" },
    { icon: "trending", title: "Más ventas", desc: "Convierte más leads con seguimiento automático.", stat: "+35%" },
    { icon: "shield", title: "Reduce costes", desc: "Haz más con menos sin sacrificar calidad.", stat: "-60%" },
    { icon: "bot", title: "Atención 24/7", desc: "Tus clientes reciben respuesta siempre.", stat: "∞" },
    { icon: "scale", title: "Escala sin límites", desc: "Crece sin contratar proporcionalmente.", stat: "10x" },
    { icon: "zap", title: "Menos errores", desc: "Procesos consistentes y sin fallos humanos.", stat: "99.9%" },
  ];

  return (
    <Section id="beneficios">
      <Container>
        <SectionTitle
          badge="Beneficios"
          title="Resultados que se miden en euros y horas"
          subtitle="No vendemos tecnología. Vendemos tiempo, ventas y tranquilidad."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GlassCard style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div
                  style={{
                    width: 56, height: 56,
                    minWidth: 56,
                    borderRadius: 16,
                    background: "linear-gradient(135deg, rgba(108,92,231,0.1), rgba(0,210,160,0.06))",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <Icon name={b.icon} size={26} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 650, color: colors.text, marginBottom: 4 }}>{b.title}</h3>
                  <p style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.5 }}>{b.desc}</p>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, color: colors.accentLight, letterSpacing: "-0.03em", minWidth: 60, textAlign: "right" }}>
                  {b.stat}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── ABOUT ───
function About() {
  return (
    <Section id="sobre">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="about-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                maxWidth: 400,
                borderRadius: 24,
                background: "linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,210,160,0.1))",
                border: `1px solid ${colors.glassBorder}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Orb color="rgba(108,92,231,0.3)" size={200} top="10%" left="10%" />
              <Orb color="rgba(0,210,160,0.2)" size={150} top="60%" left="60%" delay={3} />
              <img src="/logo.png" alt="Lled\u00f3 Automations" style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 415, objectFit: "contain" }} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Badge>Sobre mí</Badge>
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 38px)",
                fontWeight: 700,
                color: colors.text,
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              Construyo los sistemas que hacen crecer tu negocio.
            </h2>
            <p style={{ fontSize: 16, color: colors.textMuted, lineHeight: 1.75, marginBottom: 16 }}>
              Soy especialista en automatización e inteligencia artificial aplicada a negocios. Trabajo con empresas que quieren dejar de perder tiempo en tareas manuales y empezar a escalar de verdad.
            </p>
            <p style={{ fontSize: 16, color: colors.textMuted, lineHeight: 1.75, marginBottom: 28 }}>
              Mi enfoque es simple: entender tu negocio, encontrar los cuellos de botella y diseñar sistemas inteligentes que resuelvan problemas reales. Sin humo. Sin tecnicismos innecesarios. Solo resultados.
            </p>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {[
                { num: "50+", label: "Proyectos" },
                { num: "200+", label: "Automatizaciones" },
                { num: "98%", label: "Satisfacción" },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: colors.accentLight, letterSpacing: "-0.03em" }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

// ─── TESTIMONIALS ───
function Testimonials() {
  const testimonials = [
    {
      name: "Laura García",
      role: "CEO, InmoTop",
      text: "Desde que implementamos las automatizaciones, nuestros agentes agendan 3 veces más visitas sin esfuerzo extra. Ha sido un antes y un después.",
      stars: 5,
    },
    {
      name: "Carlos Ruiz",
      role: "Founder, TechShop",
      text: "Recuperamos un 40% de carritos abandonados con los flujos automáticos. El ROI fue visible desde la primera semana.",
      stars: 5,
    },
    {
      name: "Ana Martínez",
      role: "Directora, Clínica Salud+",
      text: "Los recordatorios por WhatsApp redujeron nuestras cancelaciones un 90%. Ahora todo funciona en piloto automático.",
      stars: 5,
    },
  ];

  return (
    <Section id="testimonios">
      <Container>
        <SectionTitle
          badge="Testimonios"
          title="Lo que dicen quienes ya automatizaron"
          subtitle="Resultados reales de clientes que confiaron en el proceso."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <GlassCard
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  background: i === 1
                    ? "linear-gradient(135deg, rgba(108,92,231,0.06), rgba(0,210,160,0.04))"
                    : colors.bgCard,
                }}
              >
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Icon key={j} name="star" size={16} color="#F5A623" />
                  ))}
                </div>
                <p style={{ fontSize: 15, color: colors.text, lineHeight: 1.7, flex: 1, fontStyle: "italic", opacity: 0.9 }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40, height: 40,
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.green})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontWeight: 700, fontSize: 14, color: "#fff",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.text }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: colors.textMuted }}>{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ─── FINAL CTA ───
function FinalCTA() {
  return (
    <Section id="contacto">
      <Container>
        <div
          style={{
            position: "relative",
            borderRadius: 28,
            overflow: "hidden",
            padding: "80px 40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(108,92,231,0.12), rgba(0,210,160,0.06), rgba(108,92,231,0.08))",
              border: `1px solid ${colors.glassBorder}`,
              borderRadius: 28,
            }}
          />
          <Orb color="rgba(108,92,231,0.25)" size={400} top="-20%" left="60%" delay={0} />
          <Orb color="rgba(0,210,160,0.2)" size={300} top="60%" left="-5%" delay={3} />

          <div style={{ position: "relative", zIndex: 2 }}>
            <Badge>¿Listo para automatizar?</Badge>
            <h2
              style={{
                fontSize: "clamp(28px, 5vw, 52px)",
                fontWeight: 800,
                color: colors.text,
                lineHeight: 1.1,
                letterSpacing: "-0.04em",
                marginTop: 24,
                marginBottom: 20,
              }}
            >
              Transforma tu negocio{" "}
              <span
                style={{
                  background: `linear-gradient(135deg, ${colors.accentLight}, ${colors.green})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                hoy.
              </span>
            </h2>
            <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: colors.textMuted, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
              Reserva una llamada gratuita de 30 minutos. Analizaremos tu negocio y te mostraré exactamente cómo la automatización puede multiplicar tus resultados.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={WA_LINK_CTA} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <Button>
                  Reserva una llamada <Icon name="arrow" size={16} color="#fff" />
                </Button>
              </a>
              <a href={WA_LINK_SERVICIOS} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <Button variant="secondary">
                  Automatiza tu negocio
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer style={{ padding: "60px 0 40px", borderTop: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)", position: "relative", zIndex: 10 }}>
      <Container>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/logo.png" alt="Lled\u00f3 Automations" style={{ height: 90, objectFit: "contain" }} />
            <span style={{ color: colors.text, fontSize: 15, fontWeight: 600 }}>
              {"Lled\u00f3 Automations"}
            </span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
            {["Servicios", "Proceso", "Casos", "Contacto"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                style={{ color: colors.textMuted, textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.text)}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.textMuted)}
              >
                {l}
              </a>
            ))}
            <a
              href="/politica-de-privacidad"
              style={{ color: colors.textMuted, textDecoration: "none", fontSize: 13, transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = colors.text)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = colors.textMuted)}
            >
              {"Pol\u00edtica de privacidad"}
            </a>
          </div>
          <span style={{ fontSize: 12, color: colors.textDim }}>
            {"\u00a9 2026 Lled\u00f3 Automations. Todos los derechos reservados."}
          </span>
        </div>
      </Container>
    </footer>
  );
}

// ─── WHATSAPP FLOATING BUTTON ───
function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: hovered
          ? "0 8px 32px rgba(37,211,102,0.5)"
          : "0 4px 20px rgba(37,211,102,0.3)",
        zIndex: 999,
        cursor: "pointer",
        textDecoration: "none",
        transition: "box-shadow 0.3s",
      }}
      aria-label="Contactar por WhatsApp"
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </motion.a>
  );
}

// ─── MAIN APP ───
export default function LledoAutomations() {
  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        fontFamily: "'Outfit', 'Satoshi', 'General Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(108,92,231,0.3); color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.14); }

        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-grid > div:first-child { order: 2; }
          .about-grid > div:first-child > div { max-width: 100% !important; aspect-ratio: auto !important; height: 280px !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <GridBackground />
      <Navbar />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Problems />
        <Services />
        <Process />
        <UseCases />
        <Benefits />
        <About />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}