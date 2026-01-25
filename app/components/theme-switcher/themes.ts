// Theme configuration with multiple color palettes
export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  ring: string;
  success: string;
  warning: string;
  error: string;
}

export interface Theme {
  name: string;
  label: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

// Available themes
export const themes: Record<string, Theme> = {
  default: {
    name: "default",
    label: "Default",
    colors: {
      light: {
        primary: "222 47% 11%",
        primaryForeground: "210 40% 98%",
        secondary: "210 40% 96%",
        secondaryForeground: "222 47% 11%",
        background: "0 0% 100%",
        foreground: "222 47% 11%",
        card: "0 0% 100%",
        cardForeground: "222 47% 11%",
        muted: "210 40% 96%",
        mutedForeground: "215 16% 47%",
        accent: "210 40% 96%",
        accentForeground: "222 47% 11%",
        border: "214 32% 91%",
        ring: "222 47% 11%",
        success: "142 76% 36%",
        warning: "38 92% 50%",
        error: "0 84% 60%",
      },
      dark: {
        primary: "210 40% 98%",
        primaryForeground: "222 47% 11%",
        secondary: "217 33% 17%",
        secondaryForeground: "210 40% 98%",
        background: "222 47% 11%",
        foreground: "210 40% 98%",
        card: "222 47% 11%",
        cardForeground: "210 40% 98%",
        muted: "217 33% 17%",
        mutedForeground: "215 20% 65%",
        accent: "217 33% 17%",
        accentForeground: "210 40% 98%",
        border: "217 33% 17%",
        ring: "212 100% 67%",
        success: "142 76% 36%",
        warning: "38 92% 50%",
        error: "0 84% 60%",
      },
    },
  },
  ocean: {
    name: "ocean",
    label: "Ocean",
    colors: {
      light: {
        primary: "199 89% 48%",
        primaryForeground: "0 0% 100%",
        secondary: "185 96% 90%",
        secondaryForeground: "199 89% 30%",
        background: "195 100% 98%",
        foreground: "200 50% 10%",
        card: "0 0% 100%",
        cardForeground: "200 50% 10%",
        muted: "185 50% 95%",
        mutedForeground: "200 30% 40%",
        accent: "185 96% 90%",
        accentForeground: "199 89% 30%",
        border: "185 50% 85%",
        ring: "199 89% 48%",
        success: "160 84% 39%",
        warning: "43 96% 56%",
        error: "0 84% 60%",
      },
      dark: {
        primary: "199 89% 58%",
        primaryForeground: "200 50% 5%",
        secondary: "200 50% 20%",
        secondaryForeground: "185 96% 90%",
        background: "200 50% 7%",
        foreground: "185 96% 95%",
        card: "200 50% 10%",
        cardForeground: "185 96% 95%",
        muted: "200 50% 15%",
        mutedForeground: "185 50% 65%",
        accent: "200 50% 20%",
        accentForeground: "185 96% 90%",
        border: "200 50% 20%",
        ring: "199 89% 58%",
        success: "160 84% 45%",
        warning: "43 96% 56%",
        error: "0 72% 55%",
      },
    },
  },
  forest: {
    name: "forest",
    label: "Forest",
    colors: {
      light: {
        primary: "142 76% 36%",
        primaryForeground: "0 0% 100%",
        secondary: "138 76% 90%",
        secondaryForeground: "142 76% 25%",
        background: "138 50% 98%",
        foreground: "150 40% 10%",
        card: "0 0% 100%",
        cardForeground: "150 40% 10%",
        muted: "138 40% 94%",
        mutedForeground: "150 20% 40%",
        accent: "138 76% 90%",
        accentForeground: "142 76% 25%",
        border: "138 40% 85%",
        ring: "142 76% 36%",
        success: "142 76% 36%",
        warning: "48 96% 53%",
        error: "0 84% 60%",
      },
      dark: {
        primary: "142 76% 46%",
        primaryForeground: "150 40% 5%",
        secondary: "150 30% 18%",
        secondaryForeground: "138 76% 90%",
        background: "150 40% 6%",
        foreground: "138 50% 95%",
        card: "150 40% 9%",
        cardForeground: "138 50% 95%",
        muted: "150 30% 15%",
        mutedForeground: "138 30% 60%",
        accent: "150 30% 18%",
        accentForeground: "138 76% 90%",
        border: "150 30% 18%",
        ring: "142 76% 46%",
        success: "142 76% 46%",
        warning: "48 96% 53%",
        error: "0 72% 55%",
      },
    },
  },
  sunset: {
    name: "sunset",
    label: "Sunset",
    colors: {
      light: {
        primary: "24 95% 53%",
        primaryForeground: "0 0% 100%",
        secondary: "32 98% 90%",
        secondaryForeground: "24 95% 35%",
        background: "35 100% 98%",
        foreground: "20 50% 10%",
        card: "0 0% 100%",
        cardForeground: "20 50% 10%",
        muted: "32 60% 94%",
        mutedForeground: "20 30% 40%",
        accent: "32 98% 90%",
        accentForeground: "24 95% 35%",
        border: "32 60% 85%",
        ring: "24 95% 53%",
        success: "142 76% 36%",
        warning: "48 96% 53%",
        error: "0 84% 60%",
      },
      dark: {
        primary: "24 95% 58%",
        primaryForeground: "20 50% 5%",
        secondary: "20 40% 18%",
        secondaryForeground: "32 98% 90%",
        background: "20 50% 6%",
        foreground: "32 90% 95%",
        card: "20 50% 9%",
        cardForeground: "32 90% 95%",
        muted: "20 40% 15%",
        mutedForeground: "32 40% 60%",
        accent: "20 40% 18%",
        accentForeground: "32 98% 90%",
        border: "20 40% 18%",
        ring: "24 95% 58%",
        success: "142 76% 46%",
        warning: "48 96% 53%",
        error: "0 72% 55%",
      },
    },
  },
  lavender: {
    name: "lavender",
    label: "Lavender",
    colors: {
      light: {
        primary: "262 83% 58%",
        primaryForeground: "0 0% 100%",
        secondary: "270 70% 94%",
        secondaryForeground: "262 83% 40%",
        background: "270 50% 99%",
        foreground: "262 50% 10%",
        card: "0 0% 100%",
        cardForeground: "262 50% 10%",
        muted: "270 50% 95%",
        mutedForeground: "262 30% 45%",
        accent: "270 70% 94%",
        accentForeground: "262 83% 40%",
        border: "270 50% 88%",
        ring: "262 83% 58%",
        success: "142 76% 36%",
        warning: "38 92% 50%",
        error: "0 84% 60%",
      },
      dark: {
        primary: "262 83% 68%",
        primaryForeground: "262 50% 5%",
        secondary: "262 40% 18%",
        secondaryForeground: "270 70% 94%",
        background: "262 50% 6%",
        foreground: "270 70% 95%",
        card: "262 50% 9%",
        cardForeground: "270 70% 95%",
        muted: "262 40% 15%",
        mutedForeground: "270 40% 60%",
        accent: "262 40% 18%",
        accentForeground: "270 70% 94%",
        border: "262 40% 18%",
        ring: "262 83% 68%",
        success: "142 76% 46%",
        warning: "38 92% 50%",
        error: "0 72% 55%",
      },
    },
  },
  rose: {
    name: "rose",
    label: "Rose",
    colors: {
      light: {
        primary: "346 77% 50%",
        primaryForeground: "0 0% 100%",
        secondary: "350 80% 94%",
        secondaryForeground: "346 77% 35%",
        background: "350 50% 99%",
        foreground: "346 50% 10%",
        card: "0 0% 100%",
        cardForeground: "346 50% 10%",
        muted: "350 50% 95%",
        mutedForeground: "346 30% 45%",
        accent: "350 80% 94%",
        accentForeground: "346 77% 35%",
        border: "350 50% 88%",
        ring: "346 77% 50%",
        success: "142 76% 36%",
        warning: "38 92% 50%",
        error: "0 84% 60%",
      },
      dark: {
        primary: "346 77% 60%",
        primaryForeground: "346 50% 5%",
        secondary: "346 40% 18%",
        secondaryForeground: "350 80% 94%",
        background: "346 50% 6%",
        foreground: "350 80% 95%",
        card: "346 50% 9%",
        cardForeground: "350 80% 95%",
        muted: "346 40% 15%",
        mutedForeground: "350 40% 60%",
        accent: "346 40% 18%",
        accentForeground: "350 80% 94%",
        border: "346 40% 18%",
        ring: "346 77% 60%",
        success: "142 76% 46%",
        warning: "38 92% 50%",
        error: "0 72% 55%",
      },
    },
  },
};

export type ThemeName = keyof typeof themes;
export type ColorMode = "light" | "dark" | "system";

export const themeNames = Object.keys(themes) as ThemeName[];
