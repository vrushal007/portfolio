// src/components/sections/About.tsx
"use client";

import { useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import gsap from "gsap";
import CodeIcon from "@mui/icons-material/Code";
import BrushIcon from "@mui/icons-material/Brush";
import SpeedIcon from "@mui/icons-material/Speed";

const features = [
  {
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    title: "Clean Code",
    description:
      "Writing elegant, efficient, and maintainable code is not just a practice, it's a passion.",
  },
  {
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    title: "Creative Design",
    description:
      "Combining aesthetic excellence with functional design to create memorable user experiences.",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
    title: "Performance",
    description:
      "Optimizing every aspect to ensure lightning-fast, responsive applications.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (section && cards) {
      gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(cards.children, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: cards,
          start: "top center+=200",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ minHeight: "100vh", py: 8 }}>
      <Box
        ref={sectionRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        {/* About Text */}
        <Box sx={{ textAlign: "center", maxWidth: 800, mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              background: "linear-gradient(45deg, #00f5d4, #7209b7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Me
          </Typography>
          <Typography variant="h5" sx={{ color: "text.secondary", mb: 4 }}>
            I'm a passionate full-stack developer with a love for creating
            beautiful, functional, and user-centered digital experiences.
            Combining technical expertise with creative problem-solving to build
            innovative web solutions.
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Grid container spacing={4} ref={cardsRef}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    background: "rgba(255, 255, 255, 0.05)",
                  },
                }}
              >
                <Box sx={{ color: "#00f5d4", mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}