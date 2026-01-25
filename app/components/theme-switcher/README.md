# Advanced Multi-Theme System

A fully customizable theme system for React/Next.js applications with Tailwind CSS v4.

## Features

- 🎨 **6 Built-in Themes** - Default, Ocean, Forest, Sunset, Lavender, Rose
- 🌓 **Light/Dark/System Mode** - Per-theme light and dark variants
- 💾 **Persistence** - Saves preferences to localStorage
- 🔄 **System Sync** - Follows OS color scheme when set to "system"
- ⚡ **CSS Variables** - Dynamic theming without rebuilds
- 🎯 **Type-safe** - Full TypeScript support

## File Structure

```
theme-switcher/
├── themes.ts           # Theme definitions (colors, names)
├── ThemeProvider.tsx   # Context provider & hooks
├── ThemeSwitcher.tsx   # UI components (dropdown, toggle)
├── ThemeShowcase.tsx   # Full-page theme preview
└── index.ts            # Barrel exports
```

## Quick Start

### 1. Wrap your app with ThemeProvider

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/app/components/theme-switcher";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="default" defaultColorMode="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 2. Add theme switcher component

```tsx
import { ThemeSwitcher } from "@/app/components/theme-switcher";

function Header() {
  return (
    <header>
      <ThemeSwitcher />
    </header>
  );
}
```

## Available Components

### `<ThemeSwitcher />`
Full dropdown with both theme and color mode selection.

### `<ColorModeToggle />`
Simple button that cycles through light → dark → system.

### `<ThemeSelector />`
Dropdown for theme selection only (no color mode).

### `<ThemeShowcase />`
Full-page theme customization panel with live preview.

## Using the Theme Hook

```tsx
import { useTheme } from "@/app/components/theme-switcher";

function MyComponent() {
  const { 
    theme,              // Current theme name: "default" | "ocean" | ...
    colorMode,          // User preference: "light" | "dark" | "system"
    resolvedColorMode,  // Actual applied mode: "light" | "dark"
    setTheme,           // Change theme
    setColorMode,       // Change color mode
  } = useTheme();

  return (
    <button onClick={() => setTheme("ocean")}>
      Switch to Ocean
    </button>
  );
}
```

## Using Theme Colors in Tailwind

All theme colors are available as Tailwind utility classes:

```tsx
// Background colors
<div className="bg-background" />
<div className="bg-card" />
<div className="bg-primary" />
<div className="bg-secondary" />
<div className="bg-muted" />
<div className="bg-accent" />

// Text colors
<p className="text-foreground" />
<p className="text-card-foreground" />
<p className="text-primary-foreground" />
<p className="text-muted-foreground" />

// Border colors
<div className="border border-border" />

// Ring (focus) colors
<input className="focus:ring-2 focus:ring-ring" />

// Status colors
<span className="text-success" />
<span className="text-warning" />
<span className="text-error" />
```

## Adding Custom Themes

Add new themes in `themes.ts`:

```typescript
export const themes: Record<string, Theme> = {
  // ...existing themes
  
  cyberpunk: {
    name: "cyberpunk",
    label: "Cyberpunk",
    colors: {
      light: {
        primary: "280 100% 50%",
        primaryForeground: "0 0% 100%",
        // ... define all colors
      },
      dark: {
        primary: "280 100% 60%",
        primaryForeground: "0 0% 0%",
        // ... define all colors
      },
    },
  },
};
```

Color values use HSL format without the `hsl()` wrapper: `"hue saturation% lightness%"`

## CSS Variables Reference

The theme system sets these CSS variables on `:root`:

| Variable | Description |
|----------|-------------|
| `--primary` | Primary brand color |
| `--primary-foreground` | Text on primary |
| `--secondary` | Secondary/subtle backgrounds |
| `--secondary-foreground` | Text on secondary |
| `--background` | Page background |
| `--foreground` | Default text color |
| `--card` | Card backgrounds |
| `--card-foreground` | Text on cards |
| `--muted` | Muted/disabled backgrounds |
| `--muted-foreground` | Muted text |
| `--accent` | Accent highlights |
| `--accent-foreground` | Text on accent |
| `--border` | Border color |
| `--ring` | Focus ring color |
| `--success` | Success state color |
| `--warning` | Warning state color |
| `--error` | Error state color |

## How It Works

1. **ThemeProvider** initializes from localStorage or defaults
2. Colors are applied as CSS variables on `document.documentElement`
3. Tailwind's `@theme inline` directive maps CSS vars to utility classes
4. Document class (`light`/`dark`) is set for Tailwind's dark mode
5. System preference changes are detected via `matchMedia` listener

---

## 🎓 Understanding Theme Variable Naming (Beginner's Guide)

### The Core Concept: Semantic Naming

Instead of naming colors by their actual color (like `--blue`, `--red`), we use **semantic names** that describe the **purpose** of the color.

```
❌ Bad:  --blue-500, --gray-100, --red-600
✅ Good: --primary, --background, --error
```

**Why?** Because when you switch themes:
- `--blue-500` is always blue (useless for theming!)
- `--primary` can be blue in one theme, purple in another

### The "Foreground" Pattern

Every background color has a matching `-foreground` variable for text:

```
┌─────────────────────────────────────┐
│  --primary (background)             │
│  ┌─────────────────────────────┐    │
│  │ --primary-foreground (text) │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

| Background Variable | Text Variable | Use Case |
|---------------------|---------------|----------|
| `--primary` | `--primary-foreground` | Primary buttons |
| `--secondary` | `--secondary-foreground` | Secondary buttons |
| `--card` | `--card-foreground` | Card components |
| `--muted` | `--muted-foreground` | Disabled/subtle elements |
| `--accent` | `--accent-foreground` | Highlighted areas |
| `--background` | `--foreground` | Main page |

**Example:** A primary button
```tsx
<button className="bg-primary text-primary-foreground">
  Click me
</button>
```

In the **Ocean theme**, this might be cyan button with white text.  
In the **Rose theme**, this might be pink button with white text.  
The code stays the same! 🎉

### Variable Categories Explained

#### 1. **Primary & Secondary** - Brand Identity
```
--primary              → Your main brand color (CTAs, links, highlights)
--primary-foreground   → Text on primary backgrounds

--secondary            → Supporting color (less emphasis than primary)
--secondary-foreground → Text on secondary backgrounds
```

**Tip:** Primary = "Look at me!", Secondary = "I'm here too, but quieter"

#### 2. **Background & Foreground** - The Canvas
```
--background  → Main page background (usually white/dark gray)
--foreground  → Default text color (usually black/white)
```

**Tip:** Think of it as paper (background) and ink (foreground)

#### 3. **Card** - Elevated Surfaces
```
--card            → Background for cards, modals, dropdowns
--card-foreground → Text inside cards
```

**Tip:** Cards often have a slightly different shade than the page background to create depth

```
┌──────────────────────────────────┐  ← --background
│                                  │
│   ┌──────────────────────┐       │
│   │  Card content        │ ← --card (slightly elevated)
│   │  with shadow         │
│   └──────────────────────┘       │
│                                  │
└──────────────────────────────────┘
```

#### 4. **Muted** - Subtle/Disabled States
```
--muted            → Subtle backgrounds (input fields, disabled buttons)
--muted-foreground → Placeholder text, disabled text, secondary info
```

**Tip:** Use `muted-foreground` for text that's less important:
```tsx
<p className="text-foreground">Main content</p>
<p className="text-muted-foreground">Last updated: 2 hours ago</p>
```

#### 5. **Accent** - Highlights
```
--accent            → Hover states, selected items, highlights
--accent-foreground → Text on accent backgrounds
```

**Tip:** Often similar to `secondary`, but specifically for interactive states

#### 6. **Border & Ring** - Edges & Focus
```
--border → All borders (inputs, cards, dividers)
--ring   → Focus rings (accessibility!)
```

**Tip:** Focus rings are crucial for keyboard navigation:
```tsx
<input className="border border-border focus:ring-2 focus:ring-ring" />
```

#### 7. **Status Colors** - Feedback
```
--success → Green (confirmations, completed)
--warning → Yellow/Orange (caution, attention needed)  
--error   → Red (errors, destructive actions)
```

**Tip:** Status colors usually stay consistent across themes (green = good, red = bad is universal)

### HSL Color Format

We use HSL (Hue, Saturation, Lightness) instead of HEX:

```
HEX:  #3b82f6
HSL:  217 91% 60%
      │   │   └── Lightness (0% = black, 100% = white)
      │   └────── Saturation (0% = gray, 100% = vivid)
      └────────── Hue (0-360° color wheel)
```

**Why HSL?**
- Easy to create light/dark variants (just change lightness!)
- Easy to create muted versions (just reduce saturation!)

```
Primary (vivid):     217 91% 60%
Primary (light bg):  217 91% 95%  ← Just increased lightness
Primary (muted):     217 30% 60%  ← Just reduced saturation
```

### Naming Tips for Your Own Projects

#### ✅ DO: Use Purpose-Based Names
```css
--sidebar-background
--header-height
--button-radius
--input-focus-color
```

#### ❌ DON'T: Use Color-Based Names
```css
--blue-button        /* What if brand changes to green? */
--light-gray-text    /* Useless in dark mode */
--red-error          /* Redundant - error implies red */
```

#### ✅ DO: Be Consistent with Suffixes
```css
--card-background    /* or just --card */
--card-foreground    /* text on card */
--card-border        /* border of card */
--card-shadow        /* shadow of card */
```

#### ✅ DO: Group Related Variables
```css
/* Button variants */
--button-primary-bg
--button-primary-text
--button-secondary-bg
--button-secondary-text

/* Or use the base/foreground pattern */
--button-primary
--button-primary-foreground
```

### Quick Reference Card

```
┌─────────────────────────────────────────────────────────────┐
│                    THEME VARIABLE CHEATSHEET                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Page Level:                                                │
│    bg-background + text-foreground                          │
│                                                             │
│  Cards/Modals:                                              │
│    bg-card + text-card-foreground                           │
│                                                             │
│  Primary Actions (CTA buttons):                             │
│    bg-primary + text-primary-foreground                     │
│                                                             │
│  Secondary Actions:                                         │
│    bg-secondary + text-secondary-foreground                 │
│                                                             │
│  Subtle/Disabled:                                           │
│    bg-muted + text-muted-foreground                         │
│                                                             │
│  Hover/Selected States:                                     │
│    bg-accent + text-accent-foreground                       │
│                                                             │
│  Borders:          border-border                            │
│  Focus Rings:      ring-ring                                │
│                                                             │
│  Status Messages:                                           │
│    text-success (green)                                     │
│    text-warning (yellow)                                    │
│    text-error (red)                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Common Beginner Mistakes

#### 1. Hardcoding colors instead of using variables
```tsx
// ❌ Bad - won't change with theme
<div className="bg-gray-100 text-gray-900">

// ✅ Good - adapts to any theme
<div className="bg-card text-card-foreground">
```

#### 2. Forgetting foreground colors
```tsx
// ❌ Bad - text might be invisible on some themes!
<button className="bg-primary">Click</button>

// ✅ Good - always readable
<button className="bg-primary text-primary-foreground">Click</button>
```

#### 3. Using too many custom colors
```tsx
// ❌ Bad - inconsistent, hard to maintain
<div className="bg-[#f3f4f6]">
<span className="text-[#6b7280]">

// ✅ Good - uses theme system
<div className="bg-muted">
<span className="text-muted-foreground">
```

---

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- Requires CSS custom properties support
- localStorage for persistence
