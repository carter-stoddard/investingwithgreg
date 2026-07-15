"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "greg-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function record(choice: "accepted" | "rejected") {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore storage failures
    }
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 80,
            padding: "0 16px max(16px, env(safe-area-inset-bottom)) 16px",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              pointerEvents: "auto",
              maxWidth: 720,
              width: "100%",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderLeft: "3px solid var(--brand)",
              borderRadius: 16,
              boxShadow: "0 20px 48px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08)",
              padding: "18px 20px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div
                aria-hidden
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "var(--brand-soft)",
                  color: "var(--brand)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                🍪
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  id="cookie-consent-title"
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    marginBottom: 4,
                  }}
                >
                  Heads up about cookies.
                </div>
                <p
                  id="cookie-consent-desc"
                  style={{
                    fontSize: 13,
                    color: "var(--ink-muted)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  We run <strong style={{ color: "var(--ink)" }}>Google Analytics</strong> to see which
                  pages people visit, what device they&apos;re on, and roughly where they&apos;re from.
                  Google sets its own cookies and uses that data per its terms. Greg doesn&apos;t sell or
                  share your info with anyone else. Full details in the{" "}
                  <Link
                    href="/privacy"
                    style={{ color: "var(--brand)", fontWeight: 600, textDecoration: "none" }}
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => record("rejected")}
                className="pill pill-secondary"
                style={{ padding: "10px 18px", fontSize: 13 }}
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => record("accepted")}
                className="pill pill-primary"
                style={{ padding: "10px 22px", fontSize: 13 }}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
