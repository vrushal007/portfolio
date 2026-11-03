"use client";

import { useEffect, useRef } from "react";
import { Box, Grid } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import AnimatedHeading from "@/components/layout/AnimatedHeading";

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax: watermark drifts slower than the page, giving it depth behind the copy.
      gsap.to(watermarkRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.from(".about-line", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });

      document.querySelectorAll<HTMLElement>(".stat-value").forEach((el) => {
        const target = Number(el.dataset.value);
        const counter = { n: 0 };
        gsap.to(counter, {
          n: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = Math.floor(counter.n).toString();
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      ref={rootRef}
      sx={{ px: { xs: 3, md: 6 }, py: { xs: 10, md: 16 }, position: "relative", overflow: "hidden" }}
    >
      <Box
        ref={watermarkRef}
        aria-hidden
        sx={{
          position: "absolute",
          top: "-10%",
          right: { xs: "-10%", md: "0%" },
          fontFamily: "var(--font-display)",
          fontSize: "clamp(8rem, 28vw, 22rem)",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px var(--line, rgba(243,237,225,0.14))",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        VP
      </Box>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <AnimatedHeading
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            maxWidth: 1000,
            lineHeight: 1.05,
            m: 0,
          }}
        >
          {profile.content.about.headingPart1}
          <Box component="span" sx={{ color: "var(--ember)" }}>{profile.content.about.headingEmphasis1}</Box>
          {profile.content.about.headingPart2}
          <Box component="span" sx={{ color: "var(--ember)" }}>{profile.content.about.headingEmphasis2}</Box>
          {profile.content.about.headingPart3}
          <Box component="span" sx={{ color: "var(--ember)" }}>{profile.content.about.headingEmphasis3}</Box>
        </AnimatedHeading>

        <Box
          className="about-line"
          sx={{
            mt: 4,
            maxWidth: 680,
            fontSize: "1.1rem",
            lineHeight: 1.7,
            opacity: 0.75,
          }}
        >
          {profile.summary}
        </Box>

        <Grid container spacing={4} sx={{ mt: 6 }}>
          {profile.stats.map((s) => (
            <Grid item xs={6} md={3} key={s.label} className="about-line">
              <Box
                sx={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: "var(--ember)",
                  lineHeight: 1,
                }}
              >
                <span className="stat-value" data-value={s.value}>
                  0
                </span>
                {s.suffix}
              </Box>
              <Box sx={{ mt: 1, opacity: 0.6, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {s.label}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
