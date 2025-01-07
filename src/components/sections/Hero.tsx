// src/components/sections/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import AbstractShapes from "../three/models/AbstractShapes";

export default function Hero() {
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power3.out" },
      });

      tl.from(textRef.current, {
        y: 100,
        opacity: 0,
      }).from(
        buttonRef.current,
        {
          y: 50,
          opacity: 0,
        },
        "-=0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* 3D Scene */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 1,
          zIndex: 99
        }}
      >
        <Canvas camera={{ position: [0, 0, 8] }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <spotLight position={[-10, -10, -10]} intensity={0.5} />
          <AbstractShapes />
          <OrbitControls
          // enableZoom={false}
          // enablePan={false}
          // autoRotate={true}
          // autoRotateSpeed={0.5}
          />
        </Canvas>
      </Box>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          ref={textRef}
          sx={{
            maxWidth: "600px",
            textAlign: "center",
            margin: "0 auto",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(18, 18, 18, 0.7)",
            padding: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: "linear-gradient(45deg, #00f5d4, #7209b7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Creative Developer
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "text.secondary",
              mb: 4,
            }}
          >
            Crafting Digital Experiences with Code & Creativity
          </Typography>
          <Box ref={buttonRef}>
            <Button
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #00f5d4, #7209b7)",
                px: 4,
                py: 1.5,
              }}
            >
              Explore My Work
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
