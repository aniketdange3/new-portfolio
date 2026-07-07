"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills, skillConnections } from "@/lib/data";

const categories = [
  { id: "all",      label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend",  label: "Backend" },
  { id: "cloud",    label: "Cloud & DevOps" },
  { id: "ai",       label: "AI & ML" },
];

const EASE = [0.19, 1, 0.22, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  const displayedSkills = showAll ? filteredSkills : filteredSkills.slice(0, 10);

  const getConnected = (id: string) =>
    skillConnections
      .filter((conn) => conn.includes(id))
      .flat()
      .filter((c) => c !== id);

  return (
    <section id="skills" ref={sectionRef} className="section">
      <div className="container">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <span className="text-label" style={{ color: "var(--cyan)" }}>
              ✦ &nbsp; 02 — Skills
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-display-lg font-display" style={{ marginBottom: "3rem" }}>
            Intelligent
            <br />
            <span className="gradient-text">Ecosystem</span>
          </motion.h2>

          {/* Category filter */}
          <motion.div
            variants={fadeUp}
            style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "3rem" }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setShowAll(false); }}
                style={{
                  padding: "0.5rem 1.2rem",
                  borderRadius: "100px",
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.72rem",
                  letterSpacing: "0.08em",
                  border: `1px solid ${activeCategory === cat.id ? "var(--cyan)" : "var(--border)"}`,
                  background: activeCategory === cat.id ? "rgba(0, 217, 255, 0.1)" : "transparent",
                  color: activeCategory === cat.id ? "var(--cyan)" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.25s",
                }}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* Skill grid */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.2rem",
            }}
          >
            {displayedSkills.map((skill) => {
              const connected = getConnected(skill.id);
              const isHighlighted =
                !hoveredSkill ||
                hoveredSkill === skill.id ||
                connected.includes(hoveredSkill);

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isHighlighted ? 1 : 0.25, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onHoverStart={() => setHoveredSkill(skill.id)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="glass-card"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "16px",
                    borderColor:
                      hoveredSkill === skill.id
                        ? skill.color
                        : "rgba(255,255,255,0.07)",
                    boxShadow:
                      hoveredSkill === skill.id
                        ? `0 0 24px ${skill.color}33`
                        : "none",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    {/* Level bar */}
                    <div
                      style={{
                        height: "3px",
                        borderRadius: "100px",
                        background: "rgba(255,255,255,0.07)",
                        marginBottom: "1rem",
                        overflow: "hidden",
                      }}
                    >
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: inView ? `${skill.level}%` : "0%" }}
                        transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                        style={{
                          height: "100%",
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                          borderRadius: "100px",
                          boxShadow: `0 0 8px ${skill.color}66`,
                        }}
                      />
                    </div>

                    <div
                      style={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        color: hoveredSkill === skill.id ? skill.color : "var(--text-primary)",
                        transition: "color 0.3s",
                        marginBottom: "0.3rem",
                      }}
                    >
                      {skill.label}
                    </div>

                    <div
                      className="text-label"
                      style={{
                        color: "var(--text-tertiary)",
                        fontSize: "0.6rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {skill.category.toUpperCase()}
                    </div>

                    {skill.desc && (
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.75rem",
                          lineHeight: 1.5,
                          marginBottom: "0",
                        }}
                      >
                        {skill.desc}
                      </p>
                    )}
                  </div>

                  {/* Connection indicator */}
                  {hoveredSkill === skill.id && connected.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                      <div className="text-label" style={{ color: "var(--text-tertiary)", marginBottom: "0.3rem" }}>
                        CONNECTS WITH
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.2rem" }}>
                        {connected.slice(0, 3).map((cId) => {
                          const cSkill = skills.find((s) => s.id === cId);
                          return cSkill ? (
                            <span
                              key={cId}
                              style={{
                                fontSize: "0.6rem",
                                padding: "0.15rem 0.4rem",
                                borderRadius: "4px",
                                background: `${cSkill.color}22`,
                                color: cSkill.color,
                                fontFamily: '"Space Mono", monospace',
                              }}
                            >
                              {cSkill.label}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Toggle Button */}
          {filteredSkills.length > 10 && (
            <motion.div
              variants={fadeUp}
              style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn-ghost"
                style={{
                  padding: "0.6rem 2rem",
                  borderRadius: "100px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
