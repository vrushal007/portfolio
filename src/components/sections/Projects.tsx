// src/components/sections/Hero.tsx
import { Box, Typography } from '@mui/material';

export default function Projects() {
  return (
    <Box sx={{ 
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography variant="h1">Projects Section</Typography>
    </Box>
  );
}

// Create similar placeholder files for About.tsx, Skills.tsx, Experience.tsx, Projects.tsx, and Contact.tsx
// with the same structure but different section names