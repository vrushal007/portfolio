// src/components/sections/Hero.tsx
import { Box, Typography } from "@mui/material";

export default function Skills() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      id="skills"
    >
      <Typography variant="h1">Skills Section</Typography>
    </Box>
  );
}
