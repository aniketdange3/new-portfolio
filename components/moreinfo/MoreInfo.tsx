"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education, certifications, achievements } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
};

export function MoreInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section id="moreinfo" ref={sectionRef} className="section">
      <div className="container">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* ─── Achievements ──────────────────────────────── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <span className="text-label" style={{ color: "var(--amber)" }}>
              ✦ &nbsp; 05 — Achievements
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            className="text-display-lg font-display"
            style={{ marginBottom: "3rem" }}
          >
            Numbers that
            <br />
            <span style={{
              background: "linear-gradient(135deg, #FFB547, #FF5E8A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              speak.
            </span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5px",
              background: "var(--border)",
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "6rem",
            }}
          >
            {achievements.map((a, i) => (
              <div
                key={i}
                className="glass-card"
                style={{ padding: "2rem" }}
              >
                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: a.color,
                    marginBottom: "0.5rem",
                  }}
                >
                  {a.stat}
                </div>
                <div
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "var(--text-primary)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {a.label}
                </div>
                <div
                  className="text-label"
                  style={{ color: "var(--text-tertiary)", fontSize: "0.62rem", lineHeight: 1.5 }}
                >
                  {a.desc}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ─── Education ─────────────────────────────────── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <span className="text-label" style={{ color: "var(--cyan)" }}>
              ✦ &nbsp; 06 — Education
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-display-lg font-display"
            style={{ marginBottom: "3rem" }}
          >
            Academic
            <br />
            <span className="gradient-text">Foundation</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
              gap: "1.5rem",
              marginBottom: "6rem",
            }}
          >
            {education.map((edu, i) => (
              <div
                key={i}
                className="glass-card"
                style={{
                  padding: "2rem",
                  borderRadius: "20px",
                  borderTop: `3px solid ${edu.color}`,
                }}
              >
                <div
                  className="text-label"
                  style={{ color: edu.color, marginBottom: "1rem" }}
                >
                  {edu.year}
                </div>
                <div
                  className="font-display"
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.3,
                    marginBottom: "0.5rem",
                  }}
                >
                  {edu.degree}
                </div>
                <div
                  style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {edu.institution}
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.3rem 0.8rem",
                    borderRadius: "100px",
                    background: `${edu.color}18`,
                    border: `1px solid ${edu.color}40`,
                    fontFamily: '"Space Mono", monospace',
                    fontSize: "0.7rem",
                    color: edu.color,
                    letterSpacing: "0.05em",
                  }}
                >
                  {edu.grade}
                </div>
              </div>
            ))}
          </motion.div>

          {/* ─── Certifications ─────────────────────────────── */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <span className="text-label" style={{ color: "var(--rose)" }}>
              ✦ &nbsp; 07 — Certifications
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="text-display-lg font-display"
            style={{ marginBottom: "3rem" }}
          >
            Credentials &amp;
            <br />
            <span className="gradient-text-warm">Licenses</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="glass-card"
                style={{
                  padding: "1.25rem 2rem",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: cert.color === "#0A0A23" ? "var(--violet)" : cert.color,
                      boxShadow: `0 0 10px ${cert.color === "#0A0A23" ? "var(--violet)" : cert.color}`,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {cert.title}
                    </div>
                    <div
                      className="text-label"
                      style={{ color: "var(--text-tertiary)", marginTop: "0.15rem" }}
                    >
                      {cert.issuer}
                    </div>
                  </div>
                </div>
                <div
                  className="text-label"
                  style={{ color: cert.color === "#0A0A23" ? "var(--violet)" : cert.color }}
                >
                  {cert.date}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
