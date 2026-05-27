import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#00C805",
          "green-hover": "#00B005",
          "green-soft": "rgba(0, 200, 5, 0.12)",
        },
        bg: {
          light: "#FFFFFF",
          dark: "#000000",
          ticker: {
            light: "#F5F5F5",
            dark: "#111111",
          },
          card: {
            dark: "#1A1A1A",
          },
        },
        ink: {
          light: "#111111",
          dark: "#F5F5F5",
          muted: {
            light: "#6B6B6B",
            dark: "#9A9A9A",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
      keyframes: {
        "ticker-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "ticker-scroll": "ticker-scroll 40s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
      },
      boxShadow: {
        "card-light": "0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.04)",
        "card-dark": "0 1px 3px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)",
        "glow-green": "0 0 0 1px rgba(0, 200, 5, 0.3), 0 0 32px rgba(0, 200, 5, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
