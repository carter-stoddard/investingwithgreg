"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormContext, type Tier } from "@/components/FormContext";
import { SubmissionModal } from "@/components/ui/SubmissionModal";
import { SectionHeader } from "@/components/ui/SectionHeader";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function QualificationForm() {
  const { selectedTier, setSelectedTier } = useFormContext();
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedTier, setSubmittedTier] = useState<Tier>("90");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);

    if (!formData.get("consent")) {
      setState("error");
      setErrorMsg("Please confirm the consent box before submitting.");
      return;
    }

    const payload = {
      name: String(formData.get("name") || ""),
      tiktokHandle: String(formData.get("tiktokHandle") || ""),
      phone: String(formData.get("phone") || ""),
      tier: String(formData.get("tier") || ""),
      goals: String(formData.get("goals") || ""),
      // Honeypot — humans never see/fill this field; bots typically do.
      website: String(formData.get("website") || ""),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmittedName(payload.name);
      setSubmittedTier(payload.tier as Tier);
      setState("success");
      setModalOpen(true);
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <>
    <SubmissionModal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      tier={submittedTier}
      name={submittedName}
    />
    <section id="qualification-form" style={{ paddingBlock: 40 }}>
      <div className="container-edge" style={{ maxWidth: 640 }}>
        <SectionHeader
          title="Apply"
          subtitle="Everything is tailored to you. No copy-paste formula. No cookie-cutter playbook."
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 24,
            padding: "28px 20px",
            boxShadow: "var(--shadow-card)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <AnimatePresence mode="wait">
            {state === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                style={{ textAlign: "center", paddingBlock: 32 }}
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 16 }}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "var(--brand-soft)",
                    color: "var(--brand)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    marginBottom: 16,
                  }}
                >
                  ✓
                </motion.div>
                <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 8 }}>
                  You&apos;re in.
                </h3>
                <p style={{ fontSize: 15, color: "var(--ink-muted)", maxWidth: 360, marginInline: "auto", lineHeight: 1.5 }}>
                  Greg will reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                noValidate
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Honeypot field — visually hidden, off-screen, marked for assistive tech to ignore */}
                  <div aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                    <label>
                      Website
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <Field label="Full Name" required>
                    <input name="name" type="text" required className="input" placeholder="Your full name" autoComplete="name" />
                  </Field>

                  <Field label="TikTok Handle" required hint="So Greg can DM you">
                    <div style={{ position: "relative" }}>
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: 16,
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "var(--ink-subtle)",
                          fontSize: 16,
                          fontWeight: 500,
                          pointerEvents: "none",
                        }}
                      >
                        @
                      </span>
                      <input
                        name="tiktokHandle"
                        type="text"
                        required
                        className="input"
                        placeholder="yourhandle"
                        autoComplete="username"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        style={{ paddingLeft: 32 }}
                      />
                    </div>
                  </Field>

                  <Field label="Phone Number" hint="Optional">
                    <input name="phone" type="tel" className="input" placeholder="(555) 555-5555" autoComplete="tel" inputMode="tel" />
                  </Field>

                  <Field label="Which tier are you interested in?" required>
                    <select
                      name="tier"
                      required
                      className="input"
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value as Tier)}
                    >
                      <option value="60">$60 Portfolio Drop</option>
                      <option value="90">$90 Insider Access (Most Popular)</option>
                      <option value="150">$150 1:1 Deep Dive</option>
                    </select>
                  </Field>

                  <Field label="What are you hoping to get out of this?" required>
                    <textarea
                      name="goals"
                      required
                      className="input"
                      rows={4}
                      placeholder="Tell Greg what you're working on, what you want clarity on, or what's holding you back."
                    />
                  </Field>

                  {state === "error" && (
                    <p
                      role="alert"
                      style={{
                        fontSize: 13,
                        color: "#d00",
                        background: "rgba(220, 0, 0, 0.06)",
                        border: "1px solid rgba(220, 0, 0, 0.2)",
                        padding: "10px 14px",
                        borderRadius: 10,
                      }}
                    >
                      {errorMsg}
                    </p>
                  )}

                  <label
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "12px 14px",
                      background: "var(--bg-elev)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      cursor: "pointer",
                      fontSize: 13,
                      lineHeight: 1.5,
                      color: "var(--ink-muted)",
                    }}
                  >
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      style={{
                        marginTop: 3,
                        width: 16,
                        height: 16,
                        accentColor: "var(--brand)",
                        flexShrink: 0,
                        cursor: "pointer",
                      }}
                    />
                    <span>
                      I agree to let Greg store my info and contact me about my submission, future offers, and updates.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={state === "submitting"}
                    className="pill pill-primary"
                    style={{ padding: "16px 24px", fontSize: 15, width: "100%", marginTop: 4 }}
                  >
                    {state === "submitting" ? "Sending..." : "Submit"}
                  </button>

                  <p style={{ fontSize: 12, color: "var(--ink-subtle)", textAlign: "center", lineHeight: 1.5 }}>
                    No spam. No auto-billing. Greg reviews every submission personally.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
    </>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", display: "flex", alignItems: "center", gap: 6 }}>
        {label}
        {required && <span style={{ color: "var(--brand)" }} aria-hidden>*</span>}
        {hint && (
          <span style={{ color: "var(--ink-subtle)", fontWeight: 400, fontSize: 12 }}>
            ({hint})
          </span>
        )}
      </span>
      {children}
    </label>
  );
}
