"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  themes,
  type ThemeName,
  type ColorMode,
  type ThemeColors,
} from "./themes";

interface ThemeContextValue {
  theme: ThemeName;
  colorMode: ColorMode;
  resolvedColorMode: "light" | "dark";
  setTheme: (theme: ThemeName) => void;
  setColorMode: (mode: ColorMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORAGE_KEY = "app-theme";
const COLOR_MODE_STORAGE_KEY = "app-color-mode";

// Apply CSS variables to document
function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
    root.style.setProperty(cssVar, value);
  });
}

// Get system color preference
function getSystemColorMode(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
  defaultColorMode?: ColorMode;
}

export function ThemeProvider({
  children,
  defaultTheme = "default",
  defaultColorMode = "system",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeName>(defaultTheme);
  const [colorMode, setColorModeState] = useState<ColorMode>(defaultColorMode);
  const [resolvedColorMode, setResolvedColorMode] = useState<"light" | "dark">(
    "light",
  );
  const [mounted, setMounted] = useState(false);

  // Resolve actual color mode (handles "system")
  const resolveColorMode = useCallback((mode: ColorMode): "light" | "dark" => {
    if (mode === "system") {
      return getSystemColorMode();
    }
    return mode;
  }, []);

  // Apply theme to document
  const applyTheme = useCallback(
    (themeName: ThemeName, mode: ColorMode) => {
      const resolved = resolveColorMode(mode);
      const themeConfig = themes[themeName];

      if (!themeConfig) return;

      // Apply CSS variables
      applyThemeColors(themeConfig.colors[resolved]);

      // Update document class for Tailwind dark mode
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(resolved);

      // Set data attribute for additional styling hooks
      document.documentElement.dataset.theme = themeName;

      setResolvedColorMode(resolved);
    },
    [resolveColorMode],
  );

  // Initialize from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem(
      THEME_STORAGE_KEY,
    ) as ThemeName | null;
    const storedColorMode = localStorage.getItem(
      COLOR_MODE_STORAGE_KEY,
    ) as ColorMode | null;

    const initialTheme =
      storedTheme && themes[storedTheme] ? storedTheme : defaultTheme;
    const initialColorMode = storedColorMode || defaultColorMode;

    setThemeState(initialTheme);
    setColorModeState(initialColorMode);
    applyTheme(initialTheme, initialColorMode);
    setMounted(true);
  }, [defaultTheme, defaultColorMode, applyTheme]);

  // Listen for system color scheme changes
  useEffect(() => {
    if (colorMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme(theme, "system");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, colorMode, applyTheme]);

  // Set theme handler
  const setTheme = useCallback(
    (newTheme: ThemeName) => {
      setThemeState(newTheme);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      applyTheme(newTheme, colorMode);
    },
    [colorMode, applyTheme],
  );

  // Set color mode handler
  const setColorMode = useCallback(
    (newMode: ColorMode) => {
      setColorModeState(newMode);
      localStorage.setItem(COLOR_MODE_STORAGE_KEY, newMode);
      applyTheme(theme, newMode);
    },
    [theme, applyTheme],
  );

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ theme, colorMode, resolvedColorMode, setTheme, setColorMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
