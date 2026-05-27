"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 50,
        width: 44,
        height: 44,
        borderRadius: 999,
        background: "var(--bg-card)",
        border: "1px solid var(--border-strong)",
        boxShadow: "var(--shadow-card)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--ink)",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isDark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </motion.button>
  );
}
