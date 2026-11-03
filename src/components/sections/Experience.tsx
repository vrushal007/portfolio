"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import AnimatedHeading from "@/components/layout/AnimatedHeading";

export default function Experience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".exp-card").forEach((card, i) => {
        gsap.from(card, {
          x: -60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={rootRef} sx={{ px: { xs: 3, md: 6 }, py: { xs: 10, md: 16 } }}>
      <AnimatedHeading
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 6vw, 4rem)",
          m: 0,
          mb: 8,
        }}
      >
        {profile.content.experience.heading}
      </AnimatedHeading>

      <Box sx={{ position: "relative", pl: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: "var(--line, rgba(243,237,225,0.14))",
          }}
        />
        <Box
          ref={lineRef}
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: "var(--ember)",
            transformOrigin: "top",
          }}
        />

        {profile.experience.map((exp) => (
          <Box
            key={exp.company}
            className="exp-card"
            sx={{ mb: 8, position: "relative", pl: 4 }}
          >
            <Box
              sx={{
                position: "absolute",
                left: -6,
                top: 6,
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor: "var(--ember)",
              }}
            />
            <Box
              sx={{
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ember)",
                mb: 1,
              }}
            >
              {exp.period}
            </Box>
            <Box
              sx={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              }}
            >
              {exp.role}
            </Box>
            <Box sx={{ opacity: 0.6, mb: 2 }}>
              {exp.company} — {exp.location}
            </Box>
            <Box component="ul" sx={{ m: 0, pl: 3, maxWidth: 760 }}>
              {exp.bullets.map((b, i) => (
                <Box
                  component="li"
                  key={i}
                  sx={{ mb: 1, opacity: 0.8, lineHeight: 1.6 }}
                >
                  {b}
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
