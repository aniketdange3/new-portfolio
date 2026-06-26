"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
};

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section id="experience" ref={sectionRef} className="section">
      <div className="container">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <span className="text-label" style={{ color: "var(--amber)" }}>
              ✦ &nbsp; 04 — Experience
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-display-lg font-display" style={{ marginBottom: "4rem" }}>
            Temporal
            <br />
            <span style={{
              background: "linear-gradient(135deg, #FFB547, #FF5E8A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Journey
            </span>
          </motion.h2>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay: 0.4 }}
              style={{
                position: "absolute",
                left: "calc(min(200px, 25%) + 1.5rem)",
                top: 0,
                bottom: 0,
                width: "1px",
                background: "linear-gradient(180deg, var(--violet), var(--cyan), var(--rose))",
                transformOrigin: "top",
                opacity: 0.3,
              }}
            />

            {/* Entries */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {experience.map((exp, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "min(200px, 25%) 1fr",
                    gap: "3rem",
                    paddingBottom: "4rem",
                    position: "relative",
                  }}
                >
                  {/* Year column */}
                  <div style={{ textAlign: "right", paddingTop: "0.2rem" }}>
                    <div
                      className="font-mono"
                      style={{
                        fontSize: "0.8rem",
                        color: exp.color,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {exp.year}
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "calc(min(200px, 25%) + 1rem)",
                      top: "0.5rem",
                      width: "9px",
                      height: "9px",
                      borderRadius: "50%",
                      background: exp.color,
                      boxShadow: `0 0 16px ${exp.color}`,
                      zIndex: 1,
                    }}
                  />

                  {/* Content */}
                  <div style={{ paddingLeft: "1.5rem" }}>
                    <div className="glass-card" style={{ padding: "2rem", borderRadius: "20px" }}>
                      <div
                        style={{
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontWeight: 700,
                          fontSize: "1.3rem",
                          color: "var(--text-primary)",
                          marginBottom: "0.25rem",
                        }}
                      >
                        {exp.role}
                      </div>
                      <div
                        style={{
                          fontFamily: '"Space Mono", monospace',
                          fontSize: "0.75rem",
                          color: exp.color,
                          marginBottom: "1rem",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {exp.company}
                      </div>
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.95rem",
                          lineHeight: 1.7,
                          marginBottom: "1.5rem",
                        }}
                      >
                        {exp.description}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {exp.achievements.map((a, j) => (
                          <div
                            key={j}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.75rem",
                              fontSize: "0.85rem",
                              color: "var(--text-secondary)",
                            }}
                          >
                            <span style={{ color: exp.color, marginTop: "2px", flexShrink: 0 }}>✦</span>
                            {a}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
