import { useEffect, useState, useCallback } from "react";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "app-theme";

export function useTheme() {
  // 👇 null = system mode (auto)
  const [theme, setTheme] = useState<ThemeMode | null>(() => {
    if (typeof window === "undefined") return null;
    return (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) ?? null;
  });

  // 🌗 Get system theme
  const getSystemTheme = useCallback((): ThemeMode => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }, []);

  // 🎨 Apply theme
  const applyTheme = useCallback(
    (mode: ThemeMode | null) => {
      const root = document.documentElement;

      root.classList.remove("light", "dark");

      const finalTheme = mode ?? getSystemTheme();
      root.classList.add(finalTheme);
    },
    [getSystemTheme],
  );

  // 🔁 Toggle only light/dark
  const toggleTheme = useCallback(() => {
    const current = theme ?? getSystemTheme();
    const next = current === "dark" ? "light" : "dark";

    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, [theme, getSystemTheme]);

  // 🔄 Reset to system (optional helper)
  const resetToSystem = useCallback(() => {
    setTheme(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Apply on change
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // 🔥 Listen to system changes ONLY if user didn't override
  useEffect(() => {
    if (theme !== null) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = () => applyTheme(null);

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [theme, applyTheme]);

  return {
    theme: theme ?? "system",
    toggleTheme,
    resetToSystem,
  };
}
