import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <button
      style={{
        // position: 're',
        top: '1rem',
        right: '1rem',
        padding: '0.5rem',
        background: 'var(--primary)',
        // color: 'var(--text)',
        color:"red"
      }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
  );
}
