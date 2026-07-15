"use client";

import { motion } from "framer-motion";
import { useFormContext, type Tier } from "@/components/FormContext";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface PricingTier {
  id: Tier;
  price: number;
  name: string;
  tagline: string;
  features: string[];
  cta: string;
  badge?: string;
  featured?: boolean;
  premium?: boolean;
}

const tiers: PricingTier[] = [
  {
    id: "60",
    price: 60,
    name: "Portfolio Drop",
    tagline: "See exactly what Greg is holding right now.",
    features: [
      "Greg's full current portfolio",
      "Position sizes for each holding",
      "A few quick questions answered",
    ],
    cta: "Get Access",
  },
  {
    id: "90",
    price: 90,
    name: "Insider Access",
    tagline: "Everything in Portfolio Drop, plus a month of direct access.",
    features: [
      "Everything in Portfolio Drop",
      "Greg's watchlist (what he's eyeing next)",
      "4 weeks of Q&A access",
      "Direct line for quick gut-checks",
    ],
    cta: "Get Access",
    featured: true,
    badge: "Most Popular",
  },
  {
    id: "150",
    price: 150,
    name: "1:1 Deep Dive",
    tagline: "Everything in Insider Access, plus a personalized 30-min call.",
    features: [
      "Everything in Insider Access",
      "30-minute 1-on-1 call with Greg",
      "Picks tailored to your age and goals",
      "A real plan you leave the call with",
    ],
    cta: "Get Access",
    premium: true,
    badge: "1-on-1 Live",
  },
];

export function Pricing() {
  const { scrollToForm } = useFormContext();

  return (
    <section id="pricing" style={{ paddingBlock: 40, background: "var(--bg-elev)" }}>
      <div className="container-edge">
        <SectionHeader
          title="Tiers"
          subtitle="Every tier gets you inside Greg's portfolio. Pick how much access you want."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5 md:items-stretch">
          {tiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} onSelect={() => scrollToForm(tier.id)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier, index, onSelect }: { tier: PricingTier; index: number; onSelect: () => void }) {
  const isFeatured = tier.featured;
  const isPremium = tier.premium;

  // Per-tier visual treatments
  const cardStyle: React.CSSProperties = {
    position: "relative",
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: "32px 22px",
    boxShadow: "var(--shadow-card)",
    display: "flex",
    flexDirection: "column",
    // overflow visible by default so the featured card's "Most Popular" badge isn't clipped
    overflow: "visible",
  };

  if (isFeatured) {
    cardStyle.border = "2px solid var(--brand)";
    cardStyle.boxShadow = "var(--shadow-card-hover), 0 0 0 6px var(--brand-soft)";
    cardStyle.background =
      "linear-gradient(180deg, rgba(0, 200, 5, 0.06) 0%, var(--bg-card) 35%, var(--bg-card) 100%)";
  }

  if (isPremium) {
    // Match the $30 (default) card: thin green border + transparent style
    cardStyle.border = "1.5px solid var(--brand)";
    cardStyle.boxShadow = "var(--shadow-card)";
    cardStyle.background = "var(--bg-card)";
  }

  // $30 (default) tier also gets a green border so it matches $120
  if (!isFeatured && !isPremium) {
    cardStyle.border = "1.5px solid var(--brand)";
  }

  // Show the top accent stripe on $30 and $120, but not on featured (it has its own badge)
  const showTopStripe = !isFeatured;
  if (showTopStripe) {
    cardStyle.overflow = "hidden";
  }

  // $30 and $120 both use the outlined green secondary button; $60 keeps the filled primary
  const buttonClass = isFeatured ? "pill-primary" : "pill-secondary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      style={cardStyle}
    >
      {/* Green top accent stripe on $30 and $120 (not on the featured $60) */}
      {showTopStripe && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, transparent 0%, var(--brand) 30%, var(--brand) 70%, transparent 100%)",
          }}
        />
      )}

      {/* Badges */}
      {isFeatured && tier.badge && (
        <span
          style={{
            position: "absolute",
            top: -12,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--brand)",
            color: "white",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 999,
            whiteSpace: "nowrap",
            boxShadow: "0 4px 12px rgba(0, 200, 5, 0.35)",
          }}
        >
          ⭐ {tier.badge}
        </span>
      )}

      {isPremium && tier.badge && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            alignSelf: "flex-start",
            fontSize: 10,
            fontWeight: 700,
            color: "var(--ink)",
            background: "var(--bg-elev)",
            border: "1px solid var(--border-strong)",
            padding: "4px 10px",
            borderRadius: 999,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: "var(--brand)",
              boxShadow: "0 0 8px rgba(0, 200, 5, 0.6)",
              animation: "pulse-dot 1.6s ease-in-out infinite",
            }}
          />
          {tier.badge}
        </span>
      )}

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
        <span
          style={{
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: isPremium ? "var(--ink)" : "var(--ink)",
            lineHeight: 1,
          }}
        >
          ${tier.price}
        </span>
      </div>

      {/* Name */}
      <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>
        {tier.name}
      </h3>

      {/* Tagline */}
      <p style={{ fontSize: 15, color: "var(--ink-muted)", lineHeight: 1.55, marginBottom: 20, fontWeight: 500 }}>
        {tier.tagline}
      </p>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)", marginBottom: 18 }} />

      {/* Feature list */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
        {tier.features.map((feature, j) => (
          <li
            key={j}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 15,
              color: "var(--ink)",
              lineHeight: 1.5,
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
                marginTop: 1,
              }}
            >
              ✓
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onSelect}
        className={`pill ${buttonClass}`}
        style={{ padding: "16px 20px", fontSize: 16, width: "100%" }}
      >
        {tier.cta}
      </button>
    </motion.div>
  );
}
