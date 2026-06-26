"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personal } from "@/lib/data";

const fadeUp = {
  hidden:  { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
};

type FormState = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate send
    await new Promise((r) => setTimeout(r, 1800));
    setFormState("sent");
  };

  const socialLinks = [
    { label: "GitHub", href: personal.github,   color: "#FFFFFF" },
    { label: "LinkedIn", href: personal.linkedin, color: "#0A66C2" },
    { label: "Twitter", href: personal.twitter,  color: "#1DA1F2" },
    { label: "Email",  href: `mailto:${personal.email}`, color: "#7B5EFF" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section">
      <div className="container">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Label */}
          <motion.div variants={fadeUp} style={{ marginBottom: "1rem" }}>
            <span className="text-label" style={{ color: "var(--green)" }}>
              ✦ &nbsp; 05 — Contact
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2 variants={fadeUp} className="text-display-lg font-display" style={{ marginBottom: "1rem" }}>
            Let&apos;s build
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00F5A0, #00D9FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              something great.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              color: "var(--text-secondary)",
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              maxWidth: "480px",
              lineHeight: 1.7,
              marginBottom: "4rem",
            }}
          >
            Whether you have a mission-critical product to build, an AI idea to
            validate, or just want to talk tech — I&apos;m all ears.
          </motion.p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: "3rem",
              alignItems: "start",
            }}
          >
            {/* Form */}
            <motion.div variants={fadeUp}>
              <AnimatePresence mode="wait">
                {formState === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card"
                    style={{
                      padding: "3rem",
                      borderRadius: "24px",
                      textAlign: "center",
                      borderColor: "rgba(0,245,160,0.2)",
                    }}
                  >
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✦</div>
                    <h3
                      className="text-heading font-display"
                      style={{ color: "var(--green)", marginBottom: "0.75rem" }}
                    >
                      Message received!
                    </h3>
                    <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
                      I&apos;ll get back to you within 24 hours. In the meantime, check
                      out my GitHub.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="glass-card"
                    style={{ padding: "2.5rem", borderRadius: "24px" }}
                  >
                    {[
                      { name: "name",    label: "Your name",    type: "text",  placeholder: "Aniket Dange" },
                      { name: "email",   label: "Email address", type: "email", placeholder: "you@company.com" },
                    ].map((field) => (
                      <div key={field.name} style={{ marginBottom: "1.5rem" }}>
                        <label
                          htmlFor={`contact-${field.name}`}
                          className="text-label"
                          style={{ color: "var(--text-tertiary)", display: "block", marginBottom: "0.5rem" }}
                        >
                          {field.label}
                        </label>
                        <input
                          id={`contact-${field.name}`}
                          name={field.name}
                          type={field.type}
                          value={values[field.name as keyof typeof values]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          required
                          data-cursor-hover
                          style={{
                            width: "100%",
                            padding: "0.875rem 1.25rem",
                            borderRadius: "12px",
                            border: "1px solid var(--border)",
                            background: "rgba(255,255,255,0.03)",
                            color: "var(--text-primary)",
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontSize: "0.95rem",
                            outline: "none",
                            transition: "border-color 0.3s",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "var(--violet)")}
                          onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                        />
                      </div>
                    ))}

                    <div style={{ marginBottom: "2rem" }}>
                      <label
                        htmlFor="contact-message"
                        className="text-label"
                        style={{ color: "var(--text-tertiary)", display: "block", marginBottom: "0.5rem" }}
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project..."
                        rows={5}
                        required
                        data-cursor-hover
                        style={{
                          width: "100%",
                          padding: "0.875rem 1.25rem",
                          borderRadius: "12px",
                          border: "1px solid var(--border)",
                          background: "rgba(255,255,255,0.03)",
                          color: "var(--text-primary)",
                          fontFamily: '"Space Grotesk", sans-serif',
                          fontSize: "0.95rem",
                          outline: "none",
                          resize: "vertical",
                          transition: "border-color 0.3s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--violet)")}
                        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "sending"}
                      className="btn-primary"
                      data-cursor-hover
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      {formState === "sending" ? (
                        <>
                          <span
                            style={{
                              display: "inline-block",
                              width: "14px",
                              height: "14px",
                              border: "2px solid rgba(255,255,255,0.4)",
                              borderTopColor: "white",
                              borderRadius: "50%",
                              animation: "spin-slow 0.8s linear infinite",
                            }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>Send message ✦</>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Info panel */}
            <motion.div variants={fadeUp}>
              {/* Availability badge */}
              <div
                className="glass-card"
                style={{
                  padding: "1.5rem 2rem",
                  borderRadius: "16px",
                  marginBottom: "2rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  borderColor: "rgba(0,245,160,0.15)",
                }}
              >
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "var(--green)",
                    boxShadow: "0 0 12px var(--green)",
                    animation: "pulse-glow 2s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontWeight: 600,
                      fontSize: "0.9rem",
                      color: "var(--green)",
                    }}
                  >
                    Available for new projects
                  </div>
                  <div className="text-label" style={{ color: "var(--text-tertiary)" }}>
                    Response time: &lt; 24 hours
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-hover
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1.25rem 1.75rem",
                      borderRadius: "14px",
                      border: "1px solid var(--border)",
                      background: "rgba(255,255,255,0.02)",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontFamily: '"Space Grotesk", sans-serif',
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = `${link.color}40`;
                      (e.currentTarget as HTMLAnchorElement).style.color = link.color;
                      (e.currentTarget as HTMLAnchorElement).style.background = `${link.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <span>{link.label}</span>
                    <span aria-hidden>→</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
