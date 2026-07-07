"use client";

import { useRef } from "react";
import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Projects } from "@/components/projects/Projects";
import { Experience } from "@/components/experience/Experience";
import { MoreInfo } from "@/components/moreinfo/MoreInfo";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/ui/Footer";
import { MountainParallax } from "@/components/ui/MountainParallax";

export default function Home() {
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />

        {/* Section dividers */}
        <div className="divider" />
        <About />

        <div className="divider" />

        {/* Parallax Mountain Section Wrapper */}
        <div 
          ref={parallaxContainerRef} 
          style={{ 
            position: "relative", 
            background: "var(--void)" 
          }}
        >
          {/* Sticky Background Container */}
          <div 
            style={{ 
              position: "absolute", 
              inset: 0, 
              zIndex: 0, 
              pointerEvents: "none" 
            }}
          >
            <div 
              style={{ 
                position: "sticky", 
                top: 0, 
                height: "100vh", 
                overflow: "hidden" 
              }}
            >
              <MountainParallax containerRef={parallaxContainerRef} />
            </div>
          </div>
          
          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <Skills />
            <Projects />
            <Experience />
          </div>
        </div>

        <div className="divider" />
        <MoreInfo />

        <div className="divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
