"use client";
import type { ThemeMode, ResolvedThemeMode } from "../../../../types/app";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ThemeContextValue = {
  theme: ThemeMode;

  resolvedTheme: ResolvedThemeMode;

  setTheme: (theme: ThemeMode) => void;

  toggleTheme: () => void;

  resetTheme: () => void;
};

// Constants

const STORAGE_KEY = "app-theme";

// Context

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Helpers

const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// Provider

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "system";
    }

    return (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedThemeMode>(getSystemTheme());

  // Apply Theme

  const applyTheme = useCallback((mode: ThemeMode) => {
    const root = document.documentElement;

    const finalTheme = mode === "system" ? getSystemTheme() : mode;

    root.classList.remove("light", "dark");

    root.classList.add(finalTheme);

    setResolvedTheme(finalTheme);
  }, []);

  // Set Theme

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);

    if (mode === "system") {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, mode);
    }
  }, []);

  // Toggle Theme

  const toggleTheme = useCallback(() => {
    const current = theme === "system" ? getSystemTheme() : theme;

    setTheme(current === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Reset Theme

  const resetTheme = useCallback(() => {
    setTheme("system");
  }, [setTheme]);

  // Apply on Theme Change

  useEffect(() => {
    if (theme === "system") {
      return;
    }
    // Apply theme on mount and when theme changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Listen System Changes

  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => {
      applyTheme("system");
    };

    media.addEventListener("change", handler);

    return () => {
      media.removeEventListener("change", handler);
    };
  }, [theme, applyTheme]);

  const value = useMemo(
    () => ({
      theme,

      resolvedTheme,

      setTheme,

      toggleTheme,

      resetTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme, resetTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Hook

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
};
