'use client';

import { AppBar, Box, Typography, IconButton } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
  };

  useEffect(() => {
    gsap.from('.navbar', {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <AppBar
      position="fixed"
      className="navbar"
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        backdropFilter: 'blur(8px)',
        transition: 'background-color 0.3s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 2rem',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--text)' }}>
          My Portfolio
        </Typography>
        <Box>
          <IconButton onClick={toggleTheme} sx={{ color: 'var(--primary)' }}>
            {theme === 'light' ? <DarkModeIcon /> : <WbSunnyIcon />}
          </IconButton>
        </Box>
      </Box>
    </AppBar>
  );
}
