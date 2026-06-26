"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Layers, FolderKanban, Briefcase, Mail,
  Phone, MapPin, Menu, X,
} from "lucide-react";

// Inline SVG brand icons — not available in this lucide-react version
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const navItems = [
  { label: "About", href: "#about", icon: <Layers size={14} /> },
  { label: "Skills", href: "#skills", icon: <Code2 size={14} /> },
  { label: "Projects", href: "#projects", icon: <FolderKanban size={14} /> },
  { label: "Experience", href: "#experience", icon: <Briefcase size={14} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={14} /> },
];

// ── ARD Logo SVG ─────────────────────────────────────────────────────
function ARDLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AD Logo"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7B5EFF" />
          <stop offset="100%" stopColor="#00D9FF" />
        </linearGradient>
      </defs>
      {/* Hexagon background */}
      <path
        d="M18 2 L32 10 L32 26 L18 34 L4 26 L4 10 Z"
        fill="url(#logoGrad)"
        opacity="0.15"
      />
      <path
        d="M18 2 L32 10 L32 26 L18 34 L4 26 L4 10 Z"
        stroke="url(#logoGrad)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* A letterform */}
      <text
        x="18"
        y="23"
        textAnchor="middle"
        fontFamily="'Space Grotesk', sans-serif"
        fontWeight="700"
        fontSize="13"
        fill="url(#logoGrad)"
        letterSpacing="-0.5"
      >
        AD
      </text>
    </svg>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <motion.header
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        style={{
          position: "fixed",
          top: "1.25rem",
          left: "20rem",
          transform: "translateX(-50%)",
          zIndex: 1000,
          width: "calc(100% - 3rem)",
          maxWidth: "900px",
        }}
        role="banner"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "58px",
            padding: "0 1.25rem",
            borderRadius: "100px",
            background: scrolled
              ? "rgba(255,255,255,0.06)"
              : "rgba(255,255,255,0.04)",
            backdropFilter: "blur(32px) saturate(180%)",
            WebkitBackdropFilter: "blur(32px) saturate(180%)",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.14)"
              : "1px solid rgba(255,255,255,0.07)",
            boxShadow: scrolled
              ? "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)"
              : "0 4px 24px rgba(0,0,0,0.2)",
            transition: "background 0.4s, border-color 0.4s, box-shadow 0.4s",
          }}
        >
          {/* ── Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            data-cursor-hover
            style={{
              background: "none",
              border: "none",
              cursor: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              flexShrink: 0,
            }}
          >
            <ARDLogo size={34} />
            <div style={{ lineHeight: 1 }}>
              <div
                style={{
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.6))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
              </div>

            </div>
          </button>

          {/* ── Desktop nav links ── */}
          <nav
            aria-label="Main navigation"
            className="pill-nav"
            style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <button
                  key={item.label}
                  onClick={() => go(item.href)}
                  data-cursor-hover
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-item-btn ${isActive ? "active" : ""}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.45rem 0.85rem",
                    borderRadius: "100px",
                    border: "none",
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontSize: "0.8rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                    background: isActive ? "rgba(123,94,255,0.2)" : "transparent",
                    cursor: "none",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                  <span className="nav-item-text">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ── Right CTAs ── */}
          <div
            className="pill-cta"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}
          >
            {/* Hire me — filled */}
            <a
              href="mailto:aniket.dange@email.com"
              data-cursor-hover
              className="btn-primary"
              style={{
                textDecoration: "none",
                fontSize: "0.8rem",
                padding: "0.5rem 1.25rem",
                borderRadius: "100px",
                whiteSpace: "nowrap",
              }}
            >
              Hire me
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger-pill"
              data-cursor-hover
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                cursor: "none",
                color: "white",
                flexShrink: 0,
              }}
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed",
              top: "calc(1.25rem + 68px)",
              left: "1.5rem",
              right: "1.5rem",
              zIndex: 999,
              borderRadius: "20px",
              background: "rgba(12,12,20,0.96)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
              overflow: "hidden",
              padding: "0.5rem",
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                onClick={() => go(item.href)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  width: "100%",
                  textAlign: "left",
                  background: activeSection === item.href.slice(1) ? "rgba(123,94,255,0.12)" : "transparent",
                  border: "none",
                  borderRadius: "12px",
                  padding: "0.85rem 1.25rem",
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color: activeSection === item.href.slice(1) ? "var(--violet)" : "rgba(255,255,255,0.7)",
                  cursor: "none",
                }}
                data-cursor-hover
              >
                {item.icon}
                {item.label}
              </motion.button>
            ))}

            {/* Quick links in mobile */}
            <div
              style={{
                margin: "0.5rem 0.25rem 0",
                paddingTop: "0.75rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <a
                href="mailto:aniket.dange@email.com"
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.5rem 0.75rem", borderRadius: "8px",
                  background: "rgba(123,94,255,0.1)", border: "1px solid rgba(123,94,255,0.2)",
                  color: "var(--violet)", fontSize: "0.78rem", fontFamily: '"Space Grotesk", sans-serif',
                  textDecoration: "none", cursor: "none",
                }}
                data-cursor-hover
              >
                <Mail size={12} /> Email
              </a>
              <a
                href="https://www.linkedin.com/in/aniket508/"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.5rem 0.75rem", borderRadius: "8px",
                  background: "rgba(10,102,194,0.1)", border: "1px solid rgba(10,102,194,0.2)",
                  color: "#0A66C2", fontSize: "0.78rem", fontFamily: '"Space Grotesk", sans-serif',
                  textDecoration: "none", cursor: "none",
                }}
                data-cursor-hover
              >
                <LinkedInIcon size={12} /> LinkedIn
              </a>
              <a
                href="https://github.com/aniketdange3"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  padding: "0.5rem 0.75rem", borderRadius: "8px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", fontFamily: '"Space Grotesk", sans-serif',
                  textDecoration: "none", cursor: "none",
                }}
                data-cursor-hover
              >
                <GithubIcon size={12} /> GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-item-text {
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          display: inline-block;
          white-space: nowrap;
          transition: max-width 0.3s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.2s, margin 0.3s;
        }
        .nav-item-btn:hover .nav-item-text,
        .nav-item-btn.active .nav-item-text {
          max-width: 100px;
          opacity: 1;
          margin-left: 0.35rem;
        }
        @media (max-width: 860px) {
          .pill-nav { display: none !important; }
          .cta-label { display: none !important; }
          .hamburger-pill { display: flex !important; }
        }
        @media (max-width: 600px) {
          .pill-cta a:not(.btn-primary):not([href^="mailto"]) { display: none; }
        }
      `}</style>
    </>
  );
}
