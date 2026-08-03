import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeSettings, ThemeMode, AccentColor, FontSizeOption } from '../types';

interface ThemeContextType {
  settings: ThemeSettings;
  setMode: (mode: ThemeMode) => void;
  setAccentColor: (accent: AccentColor) => void;
  setFontSize: (size: FontSizeOption) => void;
  toggleCompactMode: () => void;
  toggleHighContrast: () => void;
  toggleGlassTransparency: () => void;
  resetTheme: () => void;
  accentHex: string;
}

const DEFAULT_SETTINGS: ThemeSettings = {
  mode: 'dark',
  accentColor: 'emerald',
  fontSize: 'md',
  compactMode: false,
  highContrast: false,
  glassTransparency: true,
};

const ACCENT_COLOR_MAP: Record<AccentColor, { hex: string; bgClass: string; textClass: string; borderClass: string }> = {
  emerald: { hex: '#059669', bgClass: 'bg-emerald-600', textClass: 'text-emerald-500', borderClass: 'border-emerald-500' },
  sapphire: { hex: '#2563eb', bgClass: 'bg-blue-600', textClass: 'text-blue-500', borderClass: 'border-blue-500' },
  amber: { hex: '#d97706', bgClass: 'bg-amber-600', textClass: 'text-amber-500', borderClass: 'border-amber-500' },
  violet: { hex: '#7c3aed', bgClass: 'bg-violet-600', textClass: 'text-violet-500', borderClass: 'border-violet-500' },
  rose: { hex: '#e11d48', bgClass: 'bg-rose-600', textClass: 'text-rose-500', borderClass: 'border-rose-500' },
  crimson: { hex: '#dc2626', bgClass: 'bg-red-600', textClass: 'text-red-500', borderClass: 'border-red-500' },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('pvai_theme_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('pvai_theme_settings', JSON.stringify(settings));

    const root = document.documentElement;

    // Mode dark / light / auto
    if (settings.mode === 'dark') {
      root.classList.add('dark');
    } else if (settings.mode === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }

    // High Contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Font Size
    root.setAttribute('data-font-size', settings.fontSize);

    // Accent Color CSS variable
    const accentHex = ACCENT_COLOR_MAP[settings.accentColor].hex;
    root.style.setProperty('--pvai-accent', accentHex);
  }, [settings]);

  const setMode = (mode: ThemeMode) => setSettings((prev) => ({ ...prev, mode }));
  const setAccentColor = (accentColor: AccentColor) => setSettings((prev) => ({ ...prev, accentColor }));
  const setFontSize = (fontSize: FontSizeOption) => setSettings((prev) => ({ ...prev, fontSize }));
  const toggleCompactMode = () => setSettings((prev) => ({ ...prev, compactMode: !prev.compactMode }));
  const toggleHighContrast = () => setSettings((prev) => ({ ...prev, highContrast: !prev.highContrast }));
  const toggleGlassTransparency = () => setSettings((prev) => ({ ...prev, glassTransparency: !prev.glassTransparency }));
  const resetTheme = () => setSettings(DEFAULT_SETTINGS);

  const accentHex = ACCENT_COLOR_MAP[settings.accentColor].hex;

  return (
    <ThemeContext.Provider
      value={{
        settings,
        setMode,
        setAccentColor,
        setFontSize,
        toggleCompactMode,
        toggleHighContrast,
        toggleGlassTransparency,
        resetTheme,
        accentHex,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
