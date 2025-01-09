"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import { LinkedIn, GitHub, Twitter } from "@mui/icons-material";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { LoadingButton } from "@mui/lab";

interface ContactProps {
  title: string;
  linkedinLink: string;
  githubLink: string;
}

export default function Contact({ data }: { data: ContactProps }) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = "/Vrushal_Patel.pdf";
    link.download = "Vrushal_Patel.pdf";
    link.click();
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef?.current?.value,
          email: emailRef?.current?.value,
          message: messageRef?.current?.value,
        }),
      });
      if (res.ok) {
        const responseData = await res.json();
        handleSnackbarOpen(responseData?.message, "success");
      } else {
        handleSnackbarOpen("Failed to send message", "error");
      }
      nameRef.current!.value = "";
      emailRef.current!.value = "";
      messageRef.current!.value = "";
    } catch (err) {
      handleSnackbarOpen("Failed to send message", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarOpen = (
    message: string,
    severity: "success" | "error"
  ) => {
    setMessage(message);
    setSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setMessage("");
    setSeverity("success");
  };

  return (
    <Box
      sx={{
        // minHeight: "100vh",
        // background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        display: "flex",
        alignItems: "center",
        pt: 8,
      }}
    >
      <Container maxWidth="md">
        <Box ref={formRef}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              mb: 6,
              background: "linear-gradient(45deg, #00f5d4, #7209b7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            {data.title}
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <TextField
              inputRef={nameRef}
              label="Name"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "#00f5d4" },
                  "&.Mui-focused fieldset": { borderColor: "#7209b7" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiOutlinedInput-input": { color: "white" },
              }}
            />
            <TextField
              inputRef={emailRef}
              label="Email"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "#00f5d4" },
                  "&.Mui-focused fieldset": { borderColor: "#7209b7" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiOutlinedInput-input": { color: "white" },
              }}
            />
            <TextField
              inputRef={messageRef}
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "#00f5d4" },
                  "&.Mui-focused fieldset": { borderColor: "#7209b7" },
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiOutlinedInput-input": { color: "white" },
              }}
            />
            <LoadingButton
              loading={isLoading}
              variant="contained"
              size="large"
              sx={{
                background: "linear-gradient(45deg, #00f5d4, #7209b7)",
                py: 1.5,
                fontWeight: 600,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0,245,212,0.4)",
                },
              }}
              onClick={handleSubmit}
            >
              Send Message
            </LoadingButton>

            <Stack direction="row" spacing={3} justifyContent="center" mt={4}>
              <IconButton
                href={data.linkedinLink}
                target="_blank"
                sx={{
                  color: "#00f5d4",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#7209b7",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <LinkedIn sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton
                href={data.githubLink}
                target="_blank"
                sx={{
                  color: "#00f5d4",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#7209b7",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <GitHub sx={{ fontSize: 30 }} />
              </IconButton>
            </Stack>

            <Button
              variant="outlined"
              sx={{
                color: "#00f5d4",
                borderColor: "#00f5d4",
                width: "fit-content",
                alignSelf: "center",
                mt: 2,
                "&:hover": {
                  borderColor: "#7209b7",
                  color: "#7209b7",
                  backgroundColor: "rgba(114,9,183,0.1)",
                },
              }}
              onClick={handleDownloadClick}
            >
              Download CV
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
