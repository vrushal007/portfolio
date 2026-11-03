"use client";

import { Box, TextField, Snackbar, Alert } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LoadingButton } from "@mui/lab";
import { profile } from "@/data/profile";
import AnimatedHeading from "@/components/layout/AnimatedHeading";

export default function Contact() {
  const rootRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-el", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const handleSnackbarOpen = (msg: string, sev: "success" | "error") => {
    setMessage(msg);
    setSeverity(sev);
    setOpenSnackbar(true);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          message: messageRef.current?.value,
        }),
      });
      const data = await res.json();
      handleSnackbarOpen(
        res.ok ? data.message : "Failed to send message",
        res.ok ? "success" : "error"
      );
      if (res.ok) {
        nameRef.current!.value = "";
        emailRef.current!.value = "";
        messageRef.current!.value = "";
      }
    } catch {
      handleSnackbarOpen("Failed to send message", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "var(--line, rgba(243,237,225,0.14))" },
      "&:hover fieldset": { borderColor: "var(--lime)" },
      "&.Mui-focused fieldset": { borderColor: "var(--ember)" },
    },
    "& .MuiInputLabel-root": { color: "rgba(243,237,225,0.6)" },
    "& .MuiOutlinedInput-input": { color: "var(--ink)" },
  };

  return (
    <Box id="contact" ref={rootRef} sx={{ px: { xs: 3, md: 6 }, py: { xs: 12, md: 18 } }}>
      <AnimatedHeading
        sx={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.4rem, 9vw, 6.5rem)",
          lineHeight: 0.95,
          m: 0,
          mb: 3,
        }}
      >
        {profile.content.contact.headingLine1}
        <br />
        {profile.content.contact.headingLine2Prefix}
        <Box component="span" sx={{ color: "var(--ember)" }}>{profile.content.contact.headingEmphasis}</Box>
      </AnimatedHeading>

      <Box className="contact-el" sx={{ opacity: 0.7, maxWidth: 520, mb: 6 }}>
        {profile.content.contact.blurbPrefix}{" "}
        <Box component="a" href={`mailto:${profile.email}`} sx={{ color: "var(--ember)" }}>
          {profile.email}
        </Box>
        .
      </Box>

      <Box
        className="contact-el"
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 560 }}
      >
        <TextField inputRef={nameRef} label={profile.content.contact.form.name} variant="outlined" sx={fieldSx} />
        <TextField inputRef={emailRef} label={profile.content.contact.form.email} variant="outlined" sx={fieldSx} />
        <TextField inputRef={messageRef} label={profile.content.contact.form.message} multiline rows={4} variant="outlined" sx={fieldSx} />
        <LoadingButton
          loading={isLoading}
          onClick={handleSubmit}
          data-cursor="link"
          sx={{
            alignSelf: "flex-start",
            bgcolor: "var(--ember)",
            color: "#0d0c0a",
            px: 4,
            py: 1.5,
            borderRadius: 999,
            fontWeight: 700,
            textTransform: "none",
            "&:hover": { bgcolor: "var(--lime)" },
          }}
        >
          {profile.content.contact.submitLabel}
        </LoadingButton>
      </Box>

      <Box className="contact-el" sx={{ display: "flex", gap: 3, mt: 8, flexWrap: "wrap" }}>
        {profile.content.contact.links.map((l) => ({ ...l, href: profile[l.hrefField as keyof typeof profile] as string })).map((l) => (
          <Box
            key={l.label}
            component="a"
            href={l.href}
            target="_blank"
            data-cursor="link"
            sx={{
              textDecoration: "underline",
              textUnderlineOffset: 4,
              fontSize: "1rem",
            }}
          >
            {l.label} ↗
          </Box>
        ))}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={severity} variant="filled" onClose={() => setOpenSnackbar(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
