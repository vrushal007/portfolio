"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import AnimatedHeading from "@/components/layout/AnimatedHeading";

const LINE_HEIGHT = 100;

export default function Approach() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current!;
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 65%",
          end: "bottom 70%",
          scrub: 0.6,
        },
      });

      gsap.utils.toArray<HTMLElement>(".approach-step").forEach((step) => {
        gsap.from(step, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box ref={rootRef} sx={{ px: { xs: 3, md: 6 }, py: { xs: 10, md: 16 }, position: "relative" }}>
      <AnimatedHeading
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 6vw, 4rem)",
          m: 0,
          mb: 8,
        }}
      >
        {profile.content.approach.heading}
      </AnimatedHeading>

      <Box sx={{ position: "relative", maxWidth: 760 }}>
        <Box
          component="svg"
          sx={{ position: "absolute", left: 7, top: 8, width: 2, height: "calc(100% - 16px)", overflow: "visible" }}
          viewBox={`0 0 2 ${LINE_HEIGHT}`}
          preserveAspectRatio="none"
        >
          <path
            d={`M1,0 L1,${LINE_HEIGHT}`}
            stroke="var(--line, rgba(243,237,225,0.14))"
            strokeWidth={2}
            fill="none"
          />
          <path
            ref={pathRef}
            d={`M1,0 L1,${LINE_HEIGHT}`}
            stroke="var(--ember)"
            strokeWidth={2}
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </Box>

        {profile.approach.map((step) => (
          <Box key={step.step} className="approach-step" sx={{ position: "relative", pl: 5, mb: 7, "&:last-child": { mb: 0 } }}>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 16,
                height: 16,
                borderRadius: "50%",
                bgcolor: "var(--bg)",
                border: "2px solid var(--ember)",
              }}
            />
            <Box sx={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "var(--ember)", mb: 1 }}>
              {step.step}
            </Box>
            <Box sx={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 3vw, 1.9rem)", mb: 1 }}>
              {step.title}
            </Box>
            <Box sx={{ opacity: 0.7, maxWidth: 560, lineHeight: 1.6 }}>{step.body}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
