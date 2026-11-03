"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee({
  items,
  reverse = false,
  speed = 40,
  outline = false,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
  outline?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const distance = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: reverse ? distance : -distance,
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => `${parseFloat(x) % distance}px`,
      },
    });
    return () => {
      tween.kill();
    };
  }, [reverse, speed]);

  const content = [...items, ...items, ...items, ...items];

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <div ref={trackRef} style={{ display: "inline-flex", width: "max-content" }}>
        {content.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 5vw, 4rem)",
              padding: "0 1.5rem",
              color: outline ? "transparent" : "var(--ink)",
              WebkitTextStroke: outline ? "1px var(--ink)" : undefined,
              opacity: outline ? 0.5 : 1,
            }}
          >
            {item}
            <span style={{ color: "var(--ember)", padding: "0 1.5rem" }}>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
