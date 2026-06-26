"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { personal } from "@/lib/data";
import { HeroScene } from "@/components/three/HeroScene";
import {
  MapPin, Mail, Phone,
  Code2, Cpu, Layers, ArrowRight, ExternalLink
} from "lucide-react";

const EASE = [0.19, 1, 0.22, 1] as const;

// Inline SVG brand icons (Github + LinkedIn not in this lucide-react version)
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
function LinkedInIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const roles = personal.roles;

// ── Split text into chars for kinetic animation ──
function AnimatedWord({
  text,
  delay = 0,
  gradient = false,
  className = "",
}: {
  text: string;
  delay?: number;
  gradient?: boolean;
  className?: string;
}) {
  return (
    <span
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        ...(gradient
          ? {
            background: "linear-gradient(135deg, #7B5EFF, #00D9FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }
          : {}),
      }}
      className={className}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0, rotateX: -80 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.55,
            delay: delay + i * 0.04,
            ease: [0.19, 1, 0.22, 1],
          }}
          style={{ display: "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "loading" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  const startDownload = () => {
    if (downloadState !== "idle") return;
    setDownloadState("loading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState("done");

          // Trigger download
          const link = document.createElement("a");
          link.href = "/Aniket_Dange_Resume_1.docx";
          link.download = "Aniket_Dange_Resume.docx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const ctaRef1 = useRef<HTMLButtonElement>(null);
  const ctaRef2 = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 300);
    const iv = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    const fullText = "cat contact_info.txt";
    let index = 0;
    const interval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setShowDetails(true);
          let currentLine = 0;
          const lineInterval = setInterval(() => {
            currentLine++;
            setVisibleLines(currentLine);
            if (currentLine >= 5) {
              clearInterval(lineInterval);
            }
          }, 250);
        }, 300);
      }
    }, 70);
    return () => clearInterval(interval);
  }, [isVisible]);
  // Magnetic button logic
  const useMag = (ref: React.RefObject<HTMLButtonElement | null>) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 500, damping: 35 });
    const sy = useSpring(y, { stiffness: 500, damping: 35 });
    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
      y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const onLeave = () => { x.set(0); y.set(0); };
    return { sx, sy, onMove, onLeave };
  };

  const mag1 = useMag(ctaRef1);
  const mag2 = useMag(ctaRef2);

  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (d: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.7, delay: d, ease: EASE },
    }),
  } as const;

  // Quick info items with icons
  const infoItems = [
    { icon: <MapPin size={12} />, text: "Nagpur, MH" },
    { icon: <Code2 size={12} />, text: "MERN Stack" },
    { icon: <Cpu size={12} />, text: "AI Builder" },
    { icon: <Layers size={12} />, text: "3+ Years" },
  ];

  const contactItems = [
    { icon: <Mail size={12} />, text: "aniket.dange@email.com", href: "mailto:aniket.dange@email.com" },
    { icon: <Phone size={12} />, text: "+91 9665540016", href: "tel:+919665540016" },
    { icon: <GithubIcon size={12} />, text: "github.com/aniketdange3", href: "https://github.com/aniketdange3" },
    { icon: <LinkedInIcon size={12} />, text: "linkedin.com/in/aniket508", href: "https://www.linkedin.com/in/aniket508/" },
  ];

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        paddingTop: "80px", // account for pill nav
      }}
    >
      {/* WebGL */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <HeroScene />
      </div>

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(6,6,10,0.75) 100%)",
          zIndex: 1, pointerEvents: "none",
        }}
      />

      {/* ── Content ── */}
      <div
        className="container hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "4rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Left Column: Info & Details */}
        <div
          className="hero-left"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
          }}
        >
          {/* Availability badge */}
          {isVisible && (
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: "1.75rem" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 1rem",
                  borderRadius: "100px",
                  border: "1px solid rgba(0,245,160,0.25)",
                  background: "rgba(0,245,160,0.06)",
                  fontFamily: '"Space Mono", monospace',
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--green)",
                }}
              >
                <span
                  style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: "var(--green)",
                    boxShadow: "0 0 8px var(--green)",
                    animation: "pulse-glow 2s ease-in-out infinite",
                    display: "inline-block",
                  }}
                />
                Available for work
              </span>
            </motion.div>
          )}

          {/* ── Name — smaller, character-level animation ── */}
          {isVisible && (
            <h1
              style={{
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{ display: "block", marginBottom: "0.1em" }}>
                <AnimatedWord text="Aniket" delay={0.1} />
              </span>

              <span style={{ display: "block" }}>
                <AnimatedWord text="Dange" delay={0.55} />
              </span>
            </h1>
          )}

          {/* Divider line — draws in */}
          {isVisible && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.85, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              style={{
                width: "160px",
                height: "1px",
                background: "linear-gradient(90deg, var(--violet), var(--cyan), transparent)",
                margin: "1.5rem 0",
                transformOrigin: "left",
              }}
            />
          )}

          {/* Cycling role */}
          {isVisible && (
            <motion.div
              custom={0.9}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                height: "clamp(1.6rem, 3vw, 2.4rem)",
                overflow: "hidden",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
                  style={{
                    fontFamily: '"Space Grotesk", sans-serif',
                    fontWeight: 600,
                    fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                    color: "var(--text-secondary)",
                    letterSpacing: "-0.01em",
                    display: "block",
                  }}
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Quick info pills */}
          {isVisible && (
            <motion.div
              custom={1.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.5rem",
              }}
            >
              {infoItems.map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.07, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.3rem 0.85rem",
                    borderRadius: "100px",
                    border: "1px solid rgba(255,255,255,0.07)",
                    background: "rgba(255,255,255,0.04)",
                    fontFamily: '"Space Mono", monospace',
                    fontSize: "0.65rem",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ color: "var(--violet)", opacity: 0.8 }}>{item.icon}</span>
                  {item.text}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Tagline */}
          {isVisible && (
            <motion.p
              custom={1.25}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{
                margin: "0 0 2rem",
                fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
              }}
            >
              Results-driven Full Stack Developer with{" "}
              <span style={{ color: "var(--violet-2)", fontWeight: 600 }}>3+ years</span> building
              MERN & Next.js apps — from{" "}
              <span style={{ color: "var(--cyan)" }}>government portals</span> to{" "}
              <span style={{ color: "var(--rose)" }}>AI-powered SaaS</span>.
            </motion.p>
          )}

          {/* CTA Buttons */}
          {isVisible && (
            <motion.div
              custom={1.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}
            >
              <motion.button
                ref={ctaRef1}
                className="btn-primary"
                onMouseMove={mag1.onMove}
                onMouseLeave={mag1.onLeave}
                style={{ x: mag1.sx, y: mag1.sy, gap: "0.5rem" }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="Let's work together"
              >
                <span>Let&apos;s build together</span>
                <ArrowRight size={15} />
              </motion.button>
              <motion.button
                ref={ctaRef2}
                className="btn-ghost"
                onMouseMove={mag2.onMove}
                onMouseLeave={mag2.onLeave}
                style={{ x: mag2.sx, y: mag2.sy, gap: "0.5rem" }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                aria-label="View my work"
              >
                <span>View Projects</span>
                <ExternalLink size={13} />
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Right Column: Styled Terminal Card */}
        {isVisible && (
          <motion.div
            custom={1.4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="hero-right"
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div className="terminal-card">
              <div className="terminal_toolbar">
                <div className="butt">
                  <span className="btn red" />
                  <span className="btn yellow" />
                  <span className="btn green" />
                </div>
                <p className="user">aniketdange@admin: ~</p>
                <button className="add_tab">+</button>
              </div>
              <div className="terminal_body">
                <div className="terminal_promt">
                  <span className="terminal_user">aniketdange@admin:</span>
                  <span className="terminal_location">~</span>
                  <span className="terminal_bling">$</span>
                  <span className="terminal_text">{typedText}</span>
                  {!showDetails && <span className="terminal_cursor" />}
                </div>
                
                {showDetails && (
                  <div className="terminal_content">
                    {visibleLines >= 1 && (
                      <motion.p
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="terminal_key">email:</span>{" "}
                        <a href="mailto:the.aniket508@email.com" className="terminal_link">
                          the.aniket508@email.com
                        </a>
                      </motion.p>
                    )}
                    {visibleLines >= 2 && (
                      <motion.p
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="terminal_key">phone:</span>{" "}
                        <a href="tel:+919665540016" className="terminal_link">
                          +91 9665540016
                        </a>
                      </motion.p>
                    )}
                    {visibleLines >= 3 && (
                      <motion.p
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="terminal_key">github:</span>{" "}
                        <a
                          href="https://github.com/aniketdange3"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="terminal_link"
                        >
                          github.com/aniketdange3
                        </a>
                      </motion.p>
                    )}
                    {visibleLines >= 4 && (
                      <motion.p
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="terminal_key">linkedin:</span>{" "}
                        <a
                          href="https://www.linkedin.com/in/aniket508/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="terminal_link"
                        >
                          linkedin.com/in/aniket508
                        </a>
                      </motion.p>
                    )}
                    {visibleLines >= 5 && (
                      <motion.p
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ marginTop: "1rem" }}
                      >
                        <span className="terminal_key">resume:</span>{" "}
                        {downloadState === "idle" && (
                          <button onClick={startDownload} className="terminal_download_btn">
                            download_resume.sh
                          </button>
                        )}
                        {downloadState === "loading" && (
                          <span className="terminal_download_loading">
                            Downloading [
                            <span style={{ color: "#00D9FF" }}>
                              {"=".repeat(progress / 10)}
                              {" ".repeat(10 - progress / 10)}
                            </span>
                            ] {progress}%
                          </span>
                        )}
                        {downloadState === "done" && (
                          <span style={{ color: "#27c93f", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                            ✔ Complete
                            <button 
                              onClick={() => setDownloadState("idle")} 
                              style={{ 
                                background: "none", 
                                border: "none", 
                                color: "rgba(255,255,255,0.4)", 
                                textDecoration: "underline", 
                                fontSize: "11px", 
                                cursor: "pointer",
                                padding: 0
                              }}
                            >
                              (Reset)
                            </button>
                          </span>
                        )}
                      </motion.p>
                    )}
                  </div>
                )}

                {visibleLines >= 5 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="terminal_promt" 
                    style={{ marginTop: "1rem" }}
                  >
                    <span className="terminal_user">aniketdange@admin:</span>
                    <span className="terminal_location">~</span>
                    <span className="terminal_bling">$</span>
                    <span className="terminal_cursor" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: "0.55rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          Scroll
        </span>
        <div className="scroll-line" />
      </motion.div>
      <style>{`
        .terminal-card {
          width: 100%;
          max-width: 480px;
          height: 320px;
          background: rgba(12, 12, 18, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(16px);
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          margin: 0 auto;
        }

        .terminal_toolbar {
          display: flex;
          height: 35px;
          align-items: center;
          padding: 0 15px;
          background: rgba(30, 30, 40, 0.9);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          justify-content: space-between;
        }

        .butt {
          display: flex;
          align-items: center;
        }

        .btn {
          height: 11px;
          width: 11px;
          border-radius: 50%;
          margin-right: 6px;
        }

        .red { background: #ff5f56; }
        .yellow { background: #ffbd2e; }
        .green { background: #27c93f; }

        .add_tab {
          border: none;
          color: rgba(255, 255, 255, 0.4);
          background: transparent;
          font-size: 16px;
          cursor: pointer;
        }

        .user {
          color: rgba(255, 255, 255, 0.5);
          font-size: 11px;
          font-family: "Space Mono", monospace;
        }

        .terminal_body {
          height: calc(100% - 35px);
          padding: 15px;
          font-family: "Space Mono", monospace;
          font-size: 13px;
          line-height: 1.6;
          overflow-y: auto;
          text-align: left;
        }

        .terminal_promt {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }

        .terminal_promt span {
          margin-right: 6px;
        }

        .terminal_user {
          color: #7B5EFF;
        }
        .terminal_location {
          color: #00D9FF;
        }
        .terminal_bling {
          color: #fff;
          opacity: 0.6;
        }
        .terminal_text {
          color: #fff;
        }

        .terminal_content {
          margin-top: 8px;
          padding-left: 5px;
        }
        .terminal_content p {
          margin: 4px 0;
        }
        .terminal_key {
          color: rgba(255, 255, 255, 0.4);
        }
        .terminal_link {
          color: #00D9FF;
          text-decoration: none;
          transition: color 0.2s;
        }
        .terminal_link:hover {
          color: #7B5EFF;
          text-decoration: underline;
        }

        .terminal_download_btn {
          background: none;
          border: none;
          color: #ffbd2e;
          font-family: "Space Mono", monospace;
          font-size: 13px;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          transition: color 0.2s;
        }
        .terminal_download_btn:hover {
          color: #ffde59;
        }

        .terminal_download_loading {
          color: #ffbd2e;
        }

        .terminal_cursor {
          display: inline-block;
          width: 6px;
          height: 13px;
          background: #00D9FF;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            text-align: center !important;
            margin-top: 2rem !important;
          }
          .hero-left {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-left div {
            align-self: center !important;
          }
        }
      `}</style>
    </section>
  );
}
