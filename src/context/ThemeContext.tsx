"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type ThemeName = "pink-gold" | "cream" | "black-gold" | "white";

interface ThemeContextProps {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("pink-gold");

  // Apply theme CSS variables to document root
  function applyTheme(theme: ThemeName) {
    const root = document.documentElement;
    if (theme === "pink-gold") {
      root.style.setProperty("--background", "#FFF9F3");
      root.style.setProperty("--primary", "#FF69B4");
      root.style.setProperty("--secondary", "#FFD700");
      root.style.setProperty("--card", "rgba(255,255,255,0.85)");
      root.style.setProperty("--foreground", "#18181B");
    } else if (theme === "cream") {
      root.style.setProperty("--background", "#FFF9F3");
      root.style.setProperty("--primary", "#FFD6EC");
      root.style.setProperty("--secondary", "#FFF7D6");
      root.style.setProperty("--card", "#FFF9F3");
      root.style.setProperty("--foreground", "#18181B");
    } else if (theme === "black-gold") {
      root.style.setProperty("--background", "#18181B");
      root.style.setProperty("--primary", "#FFD700");
      root.style.setProperty("--secondary", "#FF69B4");
      root.style.setProperty("--card", "#232323");
      root.style.setProperty("--foreground", "#FFF9F3");
    } else if (theme === "white") {
      root.style.setProperty("--background", "#fff");
      root.style.setProperty("--primary", "#db2777");
      root.style.setProperty("--secondary", "#FFD700");
      root.style.setProperty("--card", "#fff");
      root.style.setProperty("--foreground", "#18181B");
    }
  }

  function handleSetTheme(newTheme: ThemeName) {
    setTheme(newTheme);
    applyTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
