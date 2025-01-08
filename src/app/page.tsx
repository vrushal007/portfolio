"use client";

import { useRef } from "react";
import { Box } from "@mui/material";
import Navigation from "@/components/layout/Navigation";

// Import all sections
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import GalaxyBackground from "@/components/layout/GalaxyBackround";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Box>
      <Navigation />
      {/* <Background /> */}
      <GalaxyBackground />
      <Box id="hero" className="section">
        <Hero />
      </Box>
      <Box id="about" className="section">
        <About />
      </Box>
      <Box id="skills" className="section">
        <Skills />
      </Box>
      <Box id="experience" className="section">
        <Experience />
      </Box>
      <Box id="projects" className="section">
        <Projects />
      </Box>
      <Box id="contact" className="section">
        <Contact />
      </Box>
      <Footer />
    </Box>
  );
}
