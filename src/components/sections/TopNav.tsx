"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useFormContext } from "@/components/FormContext";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "proof", label: "Proof" },
  { id: "pricing", label: "Tiers" },
  { id: "why", label: "Why" },
];

export function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const { scrollToForm } = useFormContext();
  const [activeId, setActiveId] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 96;
      let current = NAV_ITEMS[0].id;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDark = theme === "dark";

  return (
    <header className="top-nav">
      <div className="top-nav-inner container-edge">
        {/* Left: theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
          className="top-nav-toggle"
        >
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        {/* Middle: tabs */}
        <nav className="top-nav-tabs" aria-label="Page sections">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeId === item.id ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: CTA */}
        <button
          type="button"
          onClick={() => scrollToForm("60")}
          className="pill pill-primary top-nav-cta"
        >
          Work With Greg
        </button>
      </div>
    </header>
  );
}
