'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import Button from './ui/Button';

const themeIcons = {
  light: MdLightMode,
  dark: MdDarkMode,
};

const themeLabels = {
  light: 'Light',
  dark: 'Dark',
};

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!theme || theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [theme, setTheme]);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <Button variant="icon" disabled aria-label="Loading theme">
        <div className="w-5 h-5" />
      </Button>
    );
  }

  const currentTheme = (theme === 'dark' ? 'dark' : 'light') as keyof typeof themeIcons;
  const Icon = themeIcons[currentTheme];

  const handleToggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={handleToggleTheme}
      aria-label="Toggle theme"
      title={`Current: ${themeLabels[currentTheme]} - Click to toggle`}
      variant="icon"
    >
      <Icon className="text-xl" />
    </Button>
  );
}
