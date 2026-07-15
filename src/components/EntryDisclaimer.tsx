"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "greg-disclaimer-accepted";

const bullets = [
  "Greg is not a licensed financial advisor, broker, or investment professional.",
  "Nothing on this site, in any tier, or during a call is financial advice or a recommendation to buy or sell any security.",
  "All content is for educational and informational purposes only. You are solely responsible for your own investment decisions.",
  "Past performance is not indicative of future results. No returns are promised or guaranteed.",
  "All investing involves risk, including the potential loss of your entire investment.",
];

export function EntryDisclaimer() {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  function accept() {
    if (!checked) return;
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  function leave() {
    window.location.href = "https://www.google.com";
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            overflowY: "auto",
          }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              maxWidth: 560,
              width: "100%",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderTop: "4px solid var(--brand)",
              borderRadius: 22,
              padding: "clamp(24px, 5vw, 36px)",
              boxShadow: "0 40px 80px rgba(0, 0, 0, 0.55)",
              maxHeight: "calc(100vh - 32px)",
              overflowY: "auto",
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--brand-soft)",
                color: "var(--brand)",
                border: "1px solid color-mix(in srgb, var(--brand) 30%, transparent)",
                padding: "5px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--brand)",
                  boxShadow: "0 0 8px rgba(0, 200, 5, 0.6)",
                }}
              />
              Read this first
            </div>

            <h2
              id="disclaimer-title"
              style={{
                fontSize: "clamp(22px, 5vw, 28px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                color: "var(--ink)",
                marginBottom: 12,
              }}
            >
              Before you enter this site.
            </h2>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.6,
                color: "var(--ink-muted)",
                marginBottom: 20,
              }}
            >
              This site shares Greg&apos;s personal investing journey, portfolio, and trades. It is not
              financial advice. By continuing, you confirm that you understand and agree to the following:
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 24px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {bullets.map((b) => (
                <li
                  key={b}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "var(--ink)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "var(--brand-soft)",
                      color: "var(--brand)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 800,
                      marginTop: 2,
                    }}
                  >
                    ✓
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 16px",
                background: "var(--bg-elev)",
                border: `1px solid ${checked ? "var(--brand)" : "var(--border-strong)"}`,
                borderRadius: 12,
                cursor: "pointer",
                marginBottom: 18,
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                style={{
                  marginTop: 3,
                  width: 18,
                  height: 18,
                  accentColor: "var(--brand)",
                  flexShrink: 0,
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink)", fontWeight: 500 }}>
                I have read and understand this disclaimer. I acknowledge that Greg is not a financial
                advisor and I am solely responsible for my own investment decisions.
              </span>
            </label>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                onClick={leave}
                className="pill pill-secondary"
                style={{ padding: "12px 22px", fontSize: 14 }}
              >
                Leave
              </button>
              <button
                type="button"
                onClick={accept}
                disabled={!checked}
                className="pill pill-primary"
                style={{
                  padding: "12px 26px",
                  fontSize: 14,
                  opacity: checked ? 1 : 0.5,
                  cursor: checked ? "pointer" : "not-allowed",
                }}
              >
                I agree, continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
