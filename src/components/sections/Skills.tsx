"use client";

import { useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  LinearProgress,
} from "@mui/material";
import gsap from "gsap";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  skills: Skill[];
}

interface SkillsProps {
  title: string;
  skills: {
    frontend: SkillCategory;
    backend: SkillCategory;
    tools: SkillCategory;
  };
}

export default function Skills({ data }: { data: SkillsProps }) {
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
        <Typography
          variant="h2"
          sx={{
            mb: 6,
            background: "linear-gradient(45deg, #00f5d4, #7209b7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {data.title}
        </Typography>

        <Grid container spacing={4} ref={cardsRef}>
          {Object.values(data.skills).map((category, index) => (
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
                <Box sx={{ color: "#00f5d4", mb: 2 }}>{category.icon}</Box>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {category.title}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {category.skills.map((skill, idx) => (
                    <Box key={idx}>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {skill.name}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
