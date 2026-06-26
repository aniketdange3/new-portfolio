"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`nav ${scrolled ? "scrolled" : ""}`}
        role="banner"
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          {/* Logo / wordmark */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            data-cursor-hover
            style={{
              background: "none",
              border: "none",
              cursor: "none",
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "-0.02em",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "linear-gradient(135deg, #7B5EFF, #00D9FF)",
                flexShrink: 0,
              }}
            />
            ARD
          </motion.button>

          {/* Desktop nav */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            aria-label="Main navigation"
            style={{
              display: "flex",
              gap: "0.25rem",
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                data-cursor-hover
                aria-current={activeSection === item.href.slice(1) ? "page" : undefined}
                style={{
                  position: "relative",
                  background: "none",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color:
                    activeSection === item.href.slice(1)
                      ? "var(--text-primary)"
                      : "var(--text-secondary)",
                  cursor: "none",
                  transition: "color 0.3s",
                  background:
                    activeSection === item.href.slice(1)
                      ? "rgba(255,255,255,0.07)"
                      : "transparent",
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>

          {/* CTA + hamburger */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          >
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_EMAIL ?? "aniketdange3@gmail.com"}`}
              className="btn-primary"
              style={{ textDecoration: "none", fontSize: "0.8rem", padding: "0.6rem 1.25rem" }}
              data-cursor-hover
            >
              Hire me
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="hamburger"
              data-cursor-hover
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              style={{
                background: "none",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "0.5rem 0.65rem",
                cursor: "none",
                display: "none",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span style={{ display: "block", width: "18px", height: "1.5px", background: "var(--text-primary)", transition: "transform 0.3s", transform: menuOpen ? "rotate(45deg) translate(3.5px, 3.5px)" : "none" }} />
              <span style={{ display: "block", width: "18px", height: "1.5px", background: "var(--text-primary)", transition: "opacity 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: "18px", height: "1.5px", background: "var(--text-primary)", transition: "transform 0.3s", transform: menuOpen ? "rotate(-45deg) translate(3.5px, -3.5px)" : "none" }} />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              top: "72px",
              left: 0,
              right: 0,
              zIndex: 999,
              padding: "1.5rem",
              background: "rgba(6,6,10,0.95)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "1rem 0",
                  borderBottom: "1px solid var(--border)",
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  cursor: "none",
                }}
                data-cursor-hover
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
