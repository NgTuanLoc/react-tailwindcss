"use client";

import { useTheme } from "./ThemeProvider";
import { themes, themeNames, type ThemeName } from "./themes";
import { Check, Sun, Moon, Monitor } from "lucide-react";

// Full-page theme showcase with live preview
export function ThemeShowcase() {
  const { theme, colorMode, resolvedColorMode, setTheme, setColorMode } =
    useTheme();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Theme Customization
        </h1>
        <p className="text-muted-foreground">
          Choose your preferred appearance and color theme
        </p>
      </div>

      {/* Color Mode Selection */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Appearance
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              value: "light" as const,
              label: "Light",
              icon: Sun,
              description: "Always use light mode",
            },
            {
              value: "dark" as const,
              label: "Dark",
              icon: Moon,
              description: "Always use dark mode",
            },
            {
              value: "system" as const,
              label: "System",
              icon: Monitor,
              description: "Follow system settings",
            },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setColorMode(option.value)}
              className={`relative flex flex-col items-center p-6 rounded-xl border-2 transition-all ${
                colorMode === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              {colorMode === option.value && (
                <div className="absolute top-3 right-3">
                  <Check className="w-5 h-5 text-primary" />
                </div>
              )}
              <option.icon className="w-8 h-8 mb-3 text-foreground" />
              <span className="font-medium text-foreground">
                {option.label}
              </span>
              <span className="text-xs text-muted-foreground mt-1 text-center">
                {option.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Color Theme
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themeNames.map((themeName) => (
            <ThemeCard
              key={themeName}
              themeName={themeName}
              isSelected={theme === themeName}
              colorMode={resolvedColorMode}
              onSelect={() => setTheme(themeName)}
            />
          ))}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold text-card-foreground mb-4">
          Preview
        </h2>
        <PreviewComponents />
      </div>
    </div>
  );
}

// Theme card with color preview
function ThemeCard({
  themeName,
  isSelected,
  colorMode,
  onSelect,
}: {
  themeName: ThemeName;
  isSelected: boolean;
  colorMode: "light" | "dark";
  onSelect: () => void;
}) {
  const themeConfig = themes[themeName];
  const colors = themeConfig.colors[colorMode];

  return (
    <button
      onClick={onSelect}
      className={`relative overflow-hidden rounded-xl border-2 transition-all ${
        isSelected
          ? "border-primary ring-2 ring-primary/20"
          : "border-border hover:border-primary/50"
      }`}
    >
      {/* Color Preview */}
      <div
        className="h-20 relative"
        style={{ background: `hsl(${colors.background})` }}
      >
        {/* Mini UI Preview */}
        <div className="absolute inset-2 flex gap-2">
          {/* Sidebar */}
          <div
            className="w-8 rounded-md"
            style={{ background: `hsl(${colors.muted})` }}
          />
          {/* Content */}
          <div
            className="flex-1 rounded-md p-2"
            style={{ background: `hsl(${colors.card})` }}
          >
            <div
              className="h-2 w-12 rounded mb-2"
              style={{ background: `hsl(${colors.primary})` }}
            />
            <div
              className="h-1.5 w-full rounded mb-1"
              style={{ background: `hsl(${colors.muted})` }}
            />
            <div
              className="h-1.5 w-3/4 rounded"
              style={{ background: `hsl(${colors.muted})` }}
            />
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="p-3 flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          {/* Color dots */}
          <div className="flex -space-x-1">
            <div
              className="w-4 h-4 rounded-full border-2 border-card"
              style={{ background: `hsl(${colors.primary})` }}
            />
            <div
              className="w-4 h-4 rounded-full border-2 border-card"
              style={{ background: `hsl(${colors.secondary})` }}
            />
            <div
              className="w-4 h-4 rounded-full border-2 border-card"
              style={{ background: `hsl(${colors.accent})` }}
            />
          </div>
          <span className="text-sm font-medium text-card-foreground">
            {themeConfig.label}
          </span>
        </div>
        {isSelected && <Check className="w-4 h-4 text-primary" />}
      </div>
    </button>
  );
}

// Preview components to demonstrate theme colors
function PreviewComponents() {
  return (
    <div className="space-y-6">
      {/* Buttons */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Buttons
        </h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Primary
          </button>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
            Secondary
          </button>
          <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
            Accent
          </button>
          <button className="px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:opacity-90 transition-opacity">
            Muted
          </button>
        </div>
      </div>

      {/* Status Colors */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">
          Status
        </h3>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 bg-success/20 text-success rounded-full text-sm">
            Success
          </span>
          <span className="px-3 py-1 bg-warning/20 text-warning rounded-full text-sm">
            Warning
          </span>
          <span className="px-3 py-1 bg-error/20 text-error rounded-full text-sm">
            Error
          </span>
        </div>
      </div>

      {/* Card Example */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Card</h3>
        <div className="bg-card border border-border rounded-lg p-4 max-w-sm">
          <h4 className="font-semibold text-card-foreground">Card Title</h4>
          <p className="text-muted-foreground text-sm mt-1">
            This is an example card component showing how the theme colors look
            in context.
          </p>
          <div className="mt-4 flex gap-2">
            <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm">
              Action
            </button>
            <button className="px-3 py-1.5 bg-muted text-muted-foreground rounded-md text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Form Example */}
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Form</h3>
        <div className="max-w-sm space-y-3">
          <input
            type="text"
            placeholder="Input field..."
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="preview-check"
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <label htmlFor="preview-check" className="text-sm text-foreground">
              Checkbox label
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
