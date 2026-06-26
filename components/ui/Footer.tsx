"use client";

import { personal } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--border)",
        padding: "3rem 0",
        marginTop: "4rem",
      }}
      role="contentinfo"
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: "1rem",
                color: "var(--text-primary)",
                marginBottom: "0.25rem",
              }}
            >
              Aniket Ramdas Dange
            </div>
            <div className="text-label" style={{ color: "var(--text-tertiary)" }}>
              Full Stack Engineer · AI Builder · Creative Technologist
            </div>
          </div>

          {/* Center — built with */}
          <div
            className="text-label"
            style={{
              color: "var(--text-tertiary)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Built with
            <span style={{ color: "var(--violet)" }}>Next.js 15</span>
            +
            <span style={{ color: "var(--cyan)" }}>Three.js</span>
            +
            <span style={{ color: "var(--rose)" }}>GSAP</span>
          </div>

          {/* Right — copyright */}
          <div className="text-label" style={{ color: "var(--text-tertiary)" }}>
            © {year} — All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
