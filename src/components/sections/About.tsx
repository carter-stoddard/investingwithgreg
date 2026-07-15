"use client";

import { motion } from "framer-motion";
import { useFormContext } from "@/components/FormContext";
import { SectionHeader } from "@/components/ui/SectionHeader";

const points = [
  { icon: "👟", text: "Started at 18 with a couple thousand dollars from birthday money and reselling sneakers" },
  { icon: "🎓", text: "Built this while working a 9-to-5 and in college full-time" },
  { icon: "📈", text: "$149K+ invested in under 2 years" },
  { icon: "✅", text: "10+ public stock calls (AMD, Google, Amazon, Micron), all paid off" },
  { icon: "🎯", text: "Portfolio up 74% year-to-date" },
  { icon: "🤝", text: "Shares everything openly on TikTok" },
];

export function About() {
  const { scrollToForm } = useFormContext();
  return (
    <section id="why" style={{ paddingBlock: 40, background: "var(--bg-elev)" }}>
      <div className="container-edge" style={{ maxWidth: 720 }}>
        <SectionHeader
          title="Why"
          subtitle="Two years. Full-time job. Full-time college student. No handouts. Nothing special."
        />

        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          {points.map((p, i) => (
            <motion.li
              key={p.text}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "14px 16px",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  lineHeight: 1,
                  flexShrink: 0,
                  width: 36,
                  height: 36,
                  borderRadius: 12,
                  background: "var(--brand-soft)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {p.icon}
              </span>
              <span style={{ fontSize: 15, lineHeight: 1.5, paddingTop: 6 }}>{p.text}</span>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontSize: "clamp(20px, 5vw, 26px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
            textAlign: "center",
            marginTop: 40,
            maxWidth: 560,
            marginInline: "auto",
          }}
        >
          If I figured this out at 20 with a normal job,{" "}
          <span style={{ color: "var(--brand)" }}>there&apos;s no reason you can&apos;t.</span>
        </motion.p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <button
            onClick={() => scrollToForm("90")}
            className="pill pill-primary"
            style={{ padding: "14px 28px", fontSize: 15 }}
          >
            Start your run
          </button>
        </div>
      </div>
    </section>
  );
}
