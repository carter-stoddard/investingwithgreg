"use client";

import { motion } from "framer-motion";
import { useFormContext } from "@/components/FormContext";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Call {
  ticker: string;
  subtitle: string;
  badge: string;
  seed: number;
  trend: number;
}

const calls: Call[] = [
  { ticker: "AMD",   subtitle: "Called May 2026 · Entry $193", badge: "+163%", seed: 13, trend: 0.82 },
  { ticker: "GOOGL", subtitle: "Called Mar 2026 · Entry $270", badge: "+43%",  seed: 27, trend: 0.45 },
  { ticker: "AMZN",  subtitle: "Called Mar 2026 · Entry $200", badge: "+33%",  seed: 41, trend: 0.38 },
  { ticker: "MU",    subtitle: "Called Feb 2026 · Entry $420", badge: "+123%", seed: 53, trend: 0.75 },
  { ticker: "INTC",  subtitle: "Called Mar 2026 · Entry $45",  badge: "+171%", seed: 67, trend: 0.84 },
  { ticker: "SNDK",  subtitle: "Called Mar 2026 · Entry $572", badge: "+183%", seed: 83, trend: 0.88 },
];

// Smoothed seeded random-walk path, biased upward
function sparklinePath(seed: number, trend: number, width: number, height: number): string {
  let s = seed;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const count = 24;
  const startY = height * 0.85;
  const endY = height * (0.85 - trend * 0.72);

  const pts: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const trendY = startY + (endY - startY) * t;
    const noise = (rand() - 0.5) * height * 0.22 * (4 * t * (1 - t));
    pts.push([t * width, trendY + noise]);
  }

  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    d += ` Q ${x1.toFixed(2)} ${y1.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
  }
  const last = pts[pts.length - 1];
  d += ` T ${last[0].toFixed(2)} ${last[1].toFixed(2)}`;
  return d;
}

function SparkLine({ seed, trend }: { seed: number; trend: number }) {
  const width = 80;
  const height = 32;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <path
        d={sparklinePath(seed, trend, width, height)}
        fill="none"
        stroke="var(--brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StockCalls() {
  const { scrollToForm } = useFormContext();
  return (
    <section id="proof" style={{ paddingBlock: 40 }}>
      <div className="container-edge">
        <SectionHeader
          title="Proof"
          subtitle="A live snapshot of Greg's portfolio — every position called publicly on TikTok, with real entries, real dates, and real returns."
        />

        <div className="proof-list">
          {calls.map((call, i) => (
            <motion.div
              key={call.ticker}
              className="proof-row"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="proof-row-info">
                <span className="proof-ticker">{call.ticker}</span>
                <span className="proof-subtitle">{call.subtitle}</span>
              </div>
              <div className="proof-row-chart">
                <SparkLine seed={call.seed} trend={call.trend} />
              </div>
              <div className="proof-row-badge">{call.badge}</div>
            </motion.div>
          ))}
        </div>

        <p className="proof-disclaimer">
          Past performance is not indicative of future results. These are documented public calls, not guarantees.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
          <button
            onClick={() => scrollToForm("90")}
            className="pill pill-primary"
            style={{ padding: "16px 28px", fontSize: 16 }}
          >
            Get in on the next call
          </button>
        </div>
      </div>
    </section>
  );
}
