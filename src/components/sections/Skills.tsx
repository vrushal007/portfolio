"use client";

import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/data/profile";
import AnimatedHeading from "@/components/layout/AnimatedHeading";

function MagneticTag({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const moveX = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      moveX(relX * 0.35);
      moveY(relY * 0.35);
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <Box
      ref={ref}
      data-cursor="link"
      sx={{
        display: "inline-flex",
        px: 2.5,
        py: 1.2,
        m: 0.7,
        border: "1px solid var(--line, rgba(243,237,225,0.14))",
        borderRadius: 999,
        fontSize: "0.95rem",
        cursor: "default",
        transition: "background 0.25s, color 0.25s, border-color 0.25s",
        "&:hover": {
          bgcolor: "var(--lime)",
          color: "#0d0c0a",
          borderColor: "var(--lime)",
        },
      }}
    >
      {name}
    </Box>
  );
}

export default function Skills() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.fromTo(
      ".bar-fill",
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1,
        stagger: 0.06,
        ease: "power3.out",
        transformOrigin: "left",
      }
    );
    gsap.fromTo(
      ".bar-row",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }
    );
  }, [active]);

  const allSkills = profile.skillGroups.flatMap((g) => g.skills.map((s) => s.name));

  return (
    <Box
      id="skills"
      ref={rootRef}
      sx={{
        bgcolor: "var(--paper, #f3ede1)",
        color: "#151310",
        px: { xs: 3, md: 6 },
        py: { xs: 10, md: 16 },
      }}
    >
      <AnimatedHeading
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 6vw, 4rem)",
          m: 0,
          mb: 2,
        }}
      >
        {profile.content.skills.heading}
      </AnimatedHeading>
      <Box sx={{ opacity: 0.6, maxWidth: 560, mb: 6 }}>
        {profile.content.skills.blurb}
      </Box>

      <Box sx={{ display: "flex", gap: 1.5, mb: 6, flexWrap: "wrap" }}>
        {profile.skillGroups.map((g, i) => (
          <Box
            key={g.key}
            data-cursor="link"
            onClick={() => setActive(i)}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 999,
              cursor: "pointer",
              fontWeight: 500,
              border: "1px solid #151310",
              bgcolor: active === i ? "#151310" : "transparent",
              color: active === i ? "#f3ede1" : "#151310",
              transition: "all 0.25s ease",
            }}
          >
            {g.title}
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 6 }}>
        <Box>
          <Box sx={{ mb: 2, opacity: 0.6, fontStyle: "italic" }}>
            {profile.skillGroups[active].note}
          </Box>
          {profile.skillGroups[active].skills.map((s) => (
            <Box key={s.name} className="bar-row" sx={{ mb: 2.5 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.6, fontSize: "0.95rem" }}>
                <span>{s.name}</span>
                <span>{s.level}%</span>
              </Box>
              <Box sx={{ height: 6, bgcolor: "rgba(21,19,16,0.12)", borderRadius: 4, overflow: "hidden" }}>
                <Box
                  className="bar-fill"
                  sx={{
                    height: "100%",
                    width: `${s.level}%`,
                    bgcolor: "var(--ember)",
                    borderRadius: 4,
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", flexWrap: "wrap", alignContent: "flex-start", pt: { xs: 0, md: 6 } }}>
          {allSkills.map((name) => (
            <MagneticTag key={name} name={name} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
