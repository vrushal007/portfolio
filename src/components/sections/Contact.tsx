"use client";

import { Box, Typography, TextField, Button, Stack, IconButton, Container } from '@mui/material';
import { LinkedIn, GitHub, Twitter } from '@mui/icons-material';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(formRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        display: "flex",
        alignItems: "center",
        py: 8
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
              fontWeight: 700
            }}
          >
            Let's Connect
          </Typography>

          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: 600,
              mx: "auto"
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "#00f5d4" },
                  "&.Mui-focused fieldset": { borderColor: "#7209b7" }
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiOutlinedInput-input": { color: "white" }
              }}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "#00f5d4" },
                  "&.Mui-focused fieldset": { borderColor: "#7209b7" }
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiOutlinedInput-input": { color: "white" }
              }}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                  "&:hover fieldset": { borderColor: "#00f5d4" },
                  "&.Mui-focused fieldset": { borderColor: "#7209b7" }
                },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiOutlinedInput-input": { color: "white" }
              }}
            />
            <Button
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
                }
              }}
            >
              Send Message
            </Button>

            <Stack
              direction="row"
              spacing={3}
              justifyContent="center"
              mt={4}
            >
              <IconButton
                href="https://linkedin.com"
                target="_blank"
                sx={{
                  color: "#00f5d4",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#7209b7",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <LinkedIn sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton
                href="https://github.com"
                target="_blank"
                sx={{
                  color: "#00f5d4",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#7209b7",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <GitHub sx={{ fontSize: 30 }} />
              </IconButton>
              <IconButton
                href="https://twitter.com"
                target="_blank"
                sx={{
                  color: "#00f5d4",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#7209b7",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <Twitter sx={{ fontSize: 30 }} />
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
                  backgroundColor: "rgba(114,9,183,0.1)"
                }
              }}
            >
              Download CV
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}