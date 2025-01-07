"use client";

import { useEffect, useRef } from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WorkIcon from "@mui/icons-material/Work";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    period: "2021 - Present",
    description:
      "Led development of enterprise web applications using React, Node.js, and cloud technologies. Mentored junior developers and implemented CI/CD pipelines.",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Innovations Co.",
    period: "2019 - 2021",
    description:
      "Developed and maintained multiple client projects. Implemented responsive designs and RESTful APIs using modern tech stack.",
  },
  {
    title: "Junior Web Developer",
    company: "StartUp Ventures",
    period: "2017 - 2019",
    description:
      "Built and maintained client websites. Collaborated with design team to implement pixel-perfect UI components.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Fade in the entire section
    if (sectionRef.current) {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Animate progress line on scroll
    if (timelineRef.current && progressRef.current) {
      gsap.fromTo(
        progressRef.current,
        { height: 0 },
        {
          height: "100%",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      gsap.from(timelineRef.current.children, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: timelineRef.current,
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
          Experience
        </Typography>

        <Box
          ref={timelineRef}
          sx={{
            position: "relative",
            maxWidth: "800px",
            margin: "0 auto",
            "&::before": {
              content: '""',
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "5px", // Thicker line
              height: "100%",
              background: "linear-gradient(180deg, #bbb, #bbb)",
              opacity: 0.3,
            },
          }}
        >
          <Box
            ref={progressRef}
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              width: "5px",
              height: "6px",
              borderRadius: "50%",
              background: "radial-gradient(circle, #7209b7 0%, #00f5d4 100%)",
              boxShadow:
                "0 0 20px 5px rgba(114, 9, 183, 0.8), 0 0 30px 10px rgba(0, 245, 212, 0.5)",
              zIndex: 0,
              animation: "moveThumb linear 0s infinite",
              "@keyframes moveThumb": {
                // positioning can be managed by ScrollTrigger in useEffect
              },
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#ffffff",
                opacity: 0.7,
              },
              "&::before": {
                top: "-6px",
                left: "-2px",
                animation: "sparkOne 1.5s infinite ease-in-out",
              },
              "&::after": {
                bottom: "-6px",
                right: "-2px",
                animation: "sparkTwo 1.5s infinite ease-in-out",
              },
              "@keyframes sparkOne": {
                "0%": { transform: "scale(0.5)", opacity: 0 },
                "50%": { transform: "scale(1.5) translateX(-2px)", opacity: 1 },
                "100%": { transform: "scale(0.5)", opacity: 0 },
              },
              "@keyframes sparkTwo": {
                "0%": { transform: "scale(0.5)", opacity: 0 },
                "50%": { transform: "scale(1.5) translateX(2px)", opacity: 1 },
                "100%": { transform: "scale(0.5)", opacity: 0 },
              },
            }}
          />
          {experiences.map((exp, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                mb: 4,
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "#00f5d4",
                  zIndex: 99,
                },
              }}
            >
              <Paper
                sx={{
                  p: 4,
                  width: "45%",
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
                <Box sx={{ color: "#00f5d4", mb: 2 }}>
                  <WorkIcon sx={{ fontSize: 40 }} />
                </Box>
                <Typography variant="h5" sx={{ mb: 1 }}>
                  {exp.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#00f5d4", mb: 2 }}
                >
                  {exp.company}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  {exp.period}
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {exp.description}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
