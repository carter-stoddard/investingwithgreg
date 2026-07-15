"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CountUp } from "@/components/ui/CountUp";
import { PortfolioChart } from "@/components/ui/PortfolioChart";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useFormContext } from "@/components/FormContext";

const stats = [
  { icon: "💰", label: "Invested", value: 149, prefix: "$", suffix: "K+" },
  { icon: "📈", label: "All-Time Return", value: 112, prefix: "+", suffix: "%" },
  { icon: "📅", label: "YTD Return", value: 32, prefix: "+", suffix: "%" },
  { icon: "✅", label: "Stocks Called", value: 10, prefix: "", suffix: "+" },
];

export function Hero() {
  const { scrollToForm } = useFormContext();

  return (
    <section
      id="hero"
      style={{
        paddingTop: 24,
        paddingBottom: 96,
        minHeight: "calc(100svh - 56px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container-edge">
        <div style={{ maxWidth: 720, marginInline: "auto", textAlign: "center" }}>
          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              width: 144,
              height: 144,
              marginInline: "auto",
              marginBottom: 24,
              borderRadius: "50%",
              border: "3px solid var(--brand)",
              boxShadow: "0 0 0 6px var(--brand-soft), 0 12px 32px rgba(0, 200, 5, 0.18)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/greg.jpg"
              alt="Greg"
              fill
              priority
              sizes="144px"
              style={{ objectFit: "cover", objectPosition: "center 38%" }}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(48px, 12vw, 84px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            Greg
          </motion.h1>

          {/* Handle */}
          <motion.a
            href="https://www.tiktok.com/@investwithgreg"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -1 }}
            style={{
              display: "inline-block",
              fontSize: 15,
              color: "var(--brand)",
              fontWeight: 700,
              marginBottom: 28,
              textDecoration: "none",
              letterSpacing: "-0.01em",
              textShadow: "0 0 12px rgba(0, 200, 5, 0.45), 0 0 24px rgba(0, 200, 5, 0.25)",
            }}
          >
            @investwithgreg
          </motion.a>

          {/* Tagline — the claim, sits above the net-worth proof */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(22px, 5.5vw, 30px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 24,
              maxWidth: 560,
              marginInline: "auto",
            }}
          >
            20 years old, six figures invested in{" "}
            <span style={{ color: "var(--brand)" }}>just two years.</span>
          </motion.h2>

          <div id="about" style={{ scrollMarginTop: 64, marginTop: 8, marginBottom: 16 }}>
            <SectionHeader
              title="About"
              subtitle="A quick look at who Greg is and how he got here."
            />
          </div>

          {/* Portfolio chart — the proof. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 8, scrollMarginTop: 64 }}
          >
            <PortfolioChart />
          </motion.div>

          {/* Subtext — pull-quote styling under the net-worth box */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 36, marginTop: 28 }}
          >
            <div
              aria-hidden
              style={{
                width: 32,
                height: 2,
                background: "var(--brand)",
                margin: "0 auto 16px",
                opacity: 0.5,
                borderRadius: 999,
              }}
            />
            <p
              style={{
                fontSize: "clamp(15px, 4vw, 17px)",
                color: "var(--ink-muted)",
                fontStyle: "italic",
                lineHeight: 1.55,
                maxWidth: 460,
                marginInline: "auto",
              }}
            >
              I&apos;m not special. I just know what to invest in, and{" "}
              <span style={{ color: "var(--brand)", fontStyle: "normal", fontWeight: 700 }}>
                I want to show you the same.
              </span>
            </p>
          </motion.div>

          {/* Stat grid */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
              marginBottom: 36,
              maxWidth: 480,
              marginInline: "auto",
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "16px 12px",
                  textAlign: "left",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 12, color: "var(--ink-muted)", letterSpacing: "0.03em", fontWeight: 600, textTransform: "uppercase" }}>
                  <span style={{ marginRight: 6 }} aria-hidden>{s.icon}</span>
                  {s.label}
                </span>
                <span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--brand)" }}>
                  <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                </span>
              </div>
            ))}
          </motion.div>

          <p
            style={{
              fontSize: 12,
              color: "var(--ink-muted)",
              textAlign: "center",
              marginTop: -20,
              marginBottom: 28,
              maxWidth: 420,
              marginInline: "auto",
              lineHeight: 1.5,
            }}
          >
            Greg&apos;s individual results. Investing involves risk. Your results will vary.
          </p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => scrollToForm("90")}
              className="pill pill-primary"
              style={{
                padding: "16px 36px",
                fontSize: 16,
                width: "min(100%, 320px)",
              }}
            >
              Work With Greg
            </button>
            <p style={{ fontSize: 12, color: "var(--ink-subtle)", marginTop: 14 }}>
              No spam. No auto-billing. Greg reviews every request personally.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
