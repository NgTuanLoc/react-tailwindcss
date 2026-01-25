"use client";

import { useState } from "react";
import { Sun, Moon, Monitor, Check, Palette, ChevronDown } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { themes, themeNames, type ThemeName, type ColorMode } from "./themes";

// Color mode options
const colorModeOptions: {
  value: ColorMode;
  label: string;
  icon: React.ReactNode;
}[] = [
  { value: "light", label: "Light", icon: <Sun className="w-4 h-4" /> },
  { value: "dark", label: "Dark", icon: <Moon className="w-4 h-4" /> },
  { value: "system", label: "System", icon: <Monitor className="w-4 h-4" /> },
];

// Theme color preview dot
function ThemePreview({
  themeName,
  mode,
}: {
  themeName: ThemeName;
  mode: "light" | "dark";
}) {
  const colors = themes[themeName].colors[mode];
  return (
    <div className="flex gap-1">
      <div
        className="w-4 h-4 rounded-full border border-white/20"
        style={{ background: `hsl(${colors.primary})` }}
      />
      <div
        className="w-4 h-4 rounded-full border border-white/20"
        style={{ background: `hsl(${colors.secondary})` }}
      />
    </div>
  );
}

export function ThemeSwitcher() {
  const { theme, colorMode, resolvedColorMode, setTheme, setColorMode } =
    useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{themes[theme].label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-xl shadow-lg z-50 overflow-hidden">
            {/* Color Mode Section */}
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Appearance
              </h3>
              <div className="flex gap-2">
                {colorModeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setColorMode(option.value)}
                    className={`flex-1 flex flex-col items-center gap-1.5 p-3 rounded-lg border-2 transition-all ${
                      colorMode === option.value
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-muted hover:bg-muted/80"
                    }`}
                  >
                    {option.icon}
                    <span className="text-xs font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Colors Section */}
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Theme
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {themeNames.map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => setTheme(themeName)}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      theme === themeName
                        ? "border-primary bg-primary/10"
                        : "border-transparent bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <ThemePreview
                      themeName={themeName}
                      mode={resolvedColorMode}
                    />
                    <span className="text-sm font-medium flex-1 text-left">
                      {themes[themeName].label}
                    </span>
                    {theme === themeName && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Minimal version - just color mode toggle
export function ColorModeToggle() {
  const { colorMode, setColorMode, resolvedColorMode } = useTheme();

  const cycleColorMode = () => {
    const modes: ColorMode[] = ["light", "dark", "system"];
    const currentIndex = modes.indexOf(colorMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setColorMode(modes[nextIndex]);
  };

  return (
    <button
      onClick={cycleColorMode}
      className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      title={`Current: ${colorMode} (${resolvedColorMode})`}
    >
      {colorMode === "system" ? (
        <Monitor className="w-5 h-5" />
      ) : resolvedColorMode === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}

// Theme selector only (without color mode)
export function ThemeSelector() {
  const { theme, setTheme, resolvedColorMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        <ThemePreview themeName={theme} mode={resolvedColorMode} />
        <span className="text-sm">{themes[theme].label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 p-2">
            {themeNames.map((themeName) => (
              <button
                key={themeName}
                onClick={() => {
                  setTheme(themeName);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  theme === themeName
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                }`}
              >
                <ThemePreview themeName={themeName} mode={resolvedColorMode} />
                <span className="text-sm flex-1 text-left">
                  {themes[themeName].label}
                </span>
                {theme === themeName && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
