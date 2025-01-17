import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Box } from "@mui/material";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    document.addEventListener("mousemove", (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    });
    requestAnimationFrame(function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
        // cursor.style.transform = `translate(${cursorPos.x}px, ${cursorPos.y}px)`;
      }
      requestAnimationFrame(loop);
    });
    document.querySelectorAll("[data-cursor]").forEach((item) => {
      const element = item as HTMLElement;
      element.addEventListener("mouseover", (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();

        if (element.dataset.cursor === "icons") {
          cursor.classList.add("cursor-icons");

          gsap.to(cursor, { x: rect.left, y: rect.top, duration: 0.1 });
          //   cursor.style.transform = `translate(${rect.left}px,${rect.top}px)`;
          cursor.style.setProperty("--cursorH", `${rect.height}px`);
          hover = true;
        }
        if (element.dataset.cursor === "disable") {
          cursor.classList.add("cursor-disable");
        }
      });
      element.addEventListener("mouseout", () => {
        cursor.classList.remove("cursor-disable", "cursor-icons");
        hover = false;
      });
    });
  }, []);

  return (
    <Box
      ref={cursorRef}
      sx={{
        "--size": "0px",
        position: "fixed",
        top: "calc(var(--size) / -2)",
        left: "calc(var(--size) / -2)",
        width: "var(--size)",
        height: "var(--size)",
        borderRadius: "50px",
        pointerEvents: "none",
        zIndex: 99,
        backgroundColor: "#e6c3ff",
        boxShadow: "0px 0px 30px 0px rgb(175, 131, 255)",
        mixBlendMode: "difference",
        transition:
          "top 0.3s ease-out, left 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out",
        "&.cursor-icons": {
          top: "10px",
          left: "10px",
          height: "calc(var(--cursorH) - 20px)",
          transition: "all 0.5s ease-out, height 0.5s ease-in-out",
        },
        "&.cursor-disable": {
          "--size": "0px",
        },
        "@media only screen and (min-width: 600px)": {
          "--size": "50px",
          "&.cursor-disable": {
            "--size": "0px",
          },
        },
      }}
    />
  );
};

export default Cursor;
