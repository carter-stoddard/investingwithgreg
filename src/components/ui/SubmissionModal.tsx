"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { Tier } from "@/components/FormContext";

interface SubmissionModalProps {
  open: boolean;
  onClose: () => void;
  tier: Tier;
  name: string;
}

const tierInfo: Record<Tier, { price: number; name: string; includes: string }> = {
  "30": { price: 30, name: "Portfolio Drop", includes: "Greg's current portfolio" },
  "60": { price: 60, name: "Insider Access", includes: "Portfolio + watchlist + 4 weeks Q&A" },
  "120": { price: 120, name: "1:1 Deep Dive", includes: "Everything + 30-min call" },
};

export function SubmissionModal({ open, onClose, tier, name }: SubmissionModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open, onClose]);

  const info = tierInfo[tier];
  const firstName = name.trim().split(" ")[0] || "you";

  return (
    <AnimatePresence>
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Shell handles centering — mobile: bottom-anchored, desktop: vertically centered */}
          <div className="submission-shell">
            <motion.div
              key="sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="submission-modal-title"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 280, mass: 0.8 }}
              className="submission-sheet"
            >
            {/* Drag handle (mobile only — visual only) */}
            <div className="submission-grab" aria-hidden />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                padding: "8px 24px 24px",
              }}
            >
              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, type: "spring", damping: 14, stiffness: 240 }}
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: "var(--brand-soft)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  marginTop: 8,
                  position: "relative",
                }}
              >
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden>
                  <motion.circle
                    cx="28"
                    cy="28"
                    r="25"
                    stroke="var(--brand)"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M 17 28 L 25 36 L 40 21"
                    stroke="var(--brand)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                  />
                </svg>
              </motion.div>

              {/* Headline */}
              <motion.h2
                id="submission-modal-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                style={{
                  fontSize: "clamp(22px, 6vw, 28px)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  marginBottom: 8,
                }}
              >
                Request Submitted
              </motion.h2>

              {/* Subline */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.78, duration: 0.4 }}
                style={{
                  fontSize: 15,
                  color: "var(--ink-muted)",
                  lineHeight: 1.5,
                  marginBottom: 24,
                  maxWidth: 360,
                }}
              >
                {firstName !== "you" ? `Thanks, ${firstName}. ` : ""}Greg will reach out within 24 hours.
              </motion.p>

              {/* Order receipt card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.86, duration: 0.4 }}
                style={{
                  width: "100%",
                  maxWidth: 400,
                  background: "var(--bg-elev)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "16px 18px",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--ink-muted)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                    textAlign: "left",
                  }}
                >
                  Request Summary
                </div>

                <Row label="Tier" value={info.name} />
                <Row label="Includes" value={info.includes} />
                <Row label="Price" value={`$${info.price}`} />
                <div style={{ height: 1, background: "var(--border)", margin: "10px 0" }} />
                <Row
                  label="Status"
                  value={
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 999,
                          background: "var(--brand)",
                          boxShadow: "0 0 8px rgba(0, 200, 5, 0.6)",
                          animation: "pulse-dot 1.6s ease-in-out infinite",
                        }}
                      />
                      <span style={{ color: "var(--brand)", fontWeight: 700 }}>Pending Review</span>
                    </span>
                  }
                />
              </motion.div>

              {/* Done button */}
              <motion.button
                onClick={onClose}
                className="pill pill-primary"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.94, duration: 0.4 }}
                style={{ padding: "14px 24px", fontSize: 15, width: "100%", maxWidth: 400 }}
              >
                Done
              </motion.button>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.4 }}
                style={{ fontSize: 12, color: "var(--ink-subtle)", marginTop: 14, lineHeight: 1.5 }}
              >
                No charge yet. Greg reaches out and closes the sale personally.
              </motion.p>
            </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "6px 0",
        fontSize: 14,
      }}
    >
      <span style={{ color: "var(--ink-muted)" }}>{label}</span>
      <span style={{ fontWeight: 600, color: "var(--ink)" }}>{value}</span>
    </div>
  );
}
