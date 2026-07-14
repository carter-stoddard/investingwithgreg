"use client";

import { useEffect } from "react";

export function MaintenancePopup() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderTop: "4px solid var(--brand)",
          borderRadius: 20,
          padding: "40px 32px",
          textAlign: "center",
          boxShadow: "0 40px 80px rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          aria-hidden
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "var(--brand-soft)",
            color: "var(--brand)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            marginBottom: 20,
          }}
        >
          🚧
        </div>
        <h1
          id="maintenance-title"
          style={{
            fontSize: "clamp(24px, 5vw, 32px)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 16,
            color: "var(--ink)",
          }}
        >
          Sorry, my website is down.
        </h1>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.55,
            color: "var(--ink-muted)",
            margin: 0,
          }}
        >
          I&apos;m making way too much fucking money off you dumbasses.
        </p>
      </div>
    </div>
  );
}
