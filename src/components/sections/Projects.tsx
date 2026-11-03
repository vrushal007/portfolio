"use client";

import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import AnimatedHeading from "@/components/layout/AnimatedHeading";
import TiltCard from "@/components/layout/TiltCard";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function Projects() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: wrapRef.current, start: "top 75%" },
      });

      // Parallax: each card drifts vertically at its own depth as the page scrolls past.
      gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
        gsap.to(card, {
          yPercent: i % 2 === 0 ? -10 : 10,
          ease: "none",
          scrollTrigger: {
            trigger: wrapRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const track = trackRef.current!;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll > 0) {
        Draggable.create(track, {
          type: "x",
          inertia: true,
          bounds: { minX: -maxScroll, maxX: 0 },
          edgeResistance: 0.75,
          cursor: "grab",
          activeCursor: "grabbing",
        });
      }
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box id="projects" ref={wrapRef} sx={{ position: "relative", overflow: "hidden" }}>
      <Box sx={{ px: { xs: 3, md: 6 }, pt: { xs: 10, md: 14 }, pb: { xs: 2, md: 3 } }}>
        <AnimatedHeading
          sx={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            m: 0,
          }}
        >
          {profile.content.projects.heading}
        </AnimatedHeading>
        <Box sx={{ opacity: 0.55, mt: 1 }}>{profile.content.projects.hint}</Box>
      </Box>

      <Box
        ref={trackRef}
        sx={{
          display: "flex",
          gap: 4,
          px: { xs: 3, md: 6 },
          pb: { xs: 10, md: 14 },
          width: "max-content",
          touchAction: "pan-y",
        }}
      >
        {profile.projects.map((p) => (
          <Box
            key={p.title}
            className="project-card"
            sx={{ width: { xs: "82vw", md: 440 }, flexShrink: 0, perspective: 1200 }}
          >
            <TiltCard
              data-cursor="link"
              sx={{
                border: "1px solid var(--line, rgba(243,237,225,0.14))",
                borderRadius: 3,
                p: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 360,
                height: "100%",
                transition: "border-color 0.3s",
                "&:hover": { borderColor: "var(--ember)" },
              }}
            >
              <Box>
                <Box sx={{ fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ember)", mb: 2 }}>
                  {p.tag}
                </Box>
                <Box sx={{ fontFamily: "var(--font-display)", fontSize: "2.1rem", mb: 2 }}>
                  {p.title}
                </Box>
                <Box sx={{ opacity: 0.75, lineHeight: 1.6 }}>{p.description}</Box>
              </Box>

              <Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                  {p.tech.map((t) => (
                    <Box
                      key={t}
                      sx={{
                        fontSize: "0.8rem",
                        px: 1.5,
                        py: 0.5,
                        border: "1px solid var(--line, rgba(243,237,225,0.14))",
                        borderRadius: 999,
                        opacity: 0.7,
                      }}
                    >
                      {t}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 3, fontSize: "0.9rem" }}>
                  <Box component="a" href={p.github} target="_blank" sx={{ textDecoration: "underline", textUnderlineOffset: 4 }}>
                    GitHub ↗
                  </Box>
                  <Box component="a" href={p.live} target="_blank" sx={{ textDecoration: "underline", textUnderlineOffset: 4, color: "var(--ember)" }}>
                    Live ↗
                  </Box>
                </Box>
              </Box>
            </TiltCard>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
