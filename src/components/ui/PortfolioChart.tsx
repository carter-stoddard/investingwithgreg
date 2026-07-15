"use client";

import { useState, useMemo, useEffect, useId } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

type Period = "1D" | "1W" | "1M" | "3M" | "YTD" | "1Y" | "ALL";

const PORTFOLIO_VALUE = 149084.72;

const periods: Period[] = ["1D", "1W", "1M", "3M", "YTD", "1Y", "ALL"];

interface PeriodData {
  gain: number;
  gainPct: number;
  label: string;
  seed: number;
  volatility: number;
  trend: number;
}

const periodData: Record<Period, PeriodData> = {
  "1D":  { gain: -358.24,   gainPct: -0.24,   label: "Today",         seed: 7,  volatility: 0.14, trend: -0.10 },
  "1W":  { gain: 2718.45,   gainPct: 1.86,    label: "Past Week",     seed: 17, volatility: 0.20, trend: 0.22 },
  "1M":  { gain: -1274.16,  gainPct: -0.85,   label: "Past Month",    seed: 29, volatility: 0.24, trend: -0.14 },
  "3M":  { gain: 18906.32,  gainPct: 14.51,   label: "Past 3 Months", seed: 41, volatility: 0.28, trend: 0.42 },
  "YTD": { gain: 36288.47,  gainPct: 32.15,   label: "YTD",           seed: 53, volatility: 0.30, trend: 0.58 },
  "1Y":  { gain: 54984.61,  gainPct: 58.44,   label: "Past Year",     seed: 67, volatility: 0.34, trend: 0.74 },
  "ALL": { gain: 78901.28,  gainPct: 112.42,  label: "All-time",      seed: 79, volatility: 0.38, trend: 0.90 },
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Deterministic-noise random walk that always trends upward over the period.
function generatePoints(data: PeriodData, points: number, width: number, height: number): [number, number][] {
  const rand = seededRandom(data.seed);
  const startY = height * 0.78;
  const endY = height * (0.78 - data.trend * 0.6);
  const result: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1);
    const trendY = startY + (endY - startY) * t;
    // Damp noise at endpoints so the line cleanly hits start/end
    const dampening = 4 * t * (1 - t);
    const noise = (rand() - 0.5) * height * data.volatility * dampening;
    const x = t * width;
    const y = trendY + noise;
    result.push([x, y]);
  }
  return result;
}

// Smooth path via midpoint-quadratic curves
function pointsToSmoothPath(pts: [number, number][]): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M ${pts[0][0]} ${pts[0][1]}`;
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

function formatMoney(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function PortfolioChart() {
  const [period, setPeriod] = useState<Period>("ALL");
  const data = periodData[period];
  const reduce = useReducedMotion();

  // Live-feeling value that subtly ticks up and down (mean-reverting random walk)
  const [liveValue, setLiveValue] = useState(PORTFOLIO_VALUE);

  useEffect(() => {
    if (reduce) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;
      setLiveValue((v) => {
        const noise = (Math.random() - 0.5) * 14; // ±$7 noise
        const meanRevert = (PORTFOLIO_VALUE - v) * 0.25; // pull toward base
        const next = v + noise + meanRevert;
        // Clamp within ±$25 of base
        return Math.max(PORTFOLIO_VALUE - 25, Math.min(PORTFOLIO_VALUE + 25, next));
      });
      const nextDelay = 1400 + Math.random() * 1600;
      timer = setTimeout(tick, nextDelay);
    };

    timer = setTimeout(tick, 1600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [reduce]);

  // Derive live gain + pct from liveValue so all three numbers stay consistent
  const startValue = PORTFOLIO_VALUE - data.gain;
  const liveGain = liveValue - startValue;
  const liveGainPct = startValue > 0 ? (liveGain / startValue) * 100 : data.gainPct;
  const isDown = liveGain < 0;
  const changeColor = isDown ? "#e11d48" : "var(--brand)";

  const width = 360;
  const height = 140;
  const pointsCount = 70;

  const pts = useMemo(() => generatePoints(data, pointsCount, width, height), [data]);
  const linePath = pointsToSmoothPath(pts);
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  const endPoint = pts[pts.length - 1];

  const gradId = useId();

  return (
    <div className="portfolio-card">
      {/* Header */}
      <div className="portfolio-tabs" aria-hidden>
        <span className="tab tab-active">Investing</span>
      </div>

      {/* Big value (ticks live) */}
      <div className="portfolio-value">${formatMoney(liveValue)}</div>

      {/* Change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={period}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="portfolio-change"
          style={{ color: changeColor }}
        >
          <span className="up-arrow" aria-hidden style={{ color: changeColor }}>
            {isDown ? "▼" : "▲"}
          </span>
          <span className="gain" style={{ color: changeColor }}>
            {isDown ? "-" : ""}${formatMoney(Math.abs(liveGain))}
          </span>
          <span className="gain-pct" style={{ color: changeColor }}>
            ({liveGainPct.toFixed(2)}%)
          </span>
          <span className="period-label">{data.label}</span>
        </motion.div>
      </AnimatePresence>

      {/* Chart */}
      <div className="portfolio-svg-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          width="100%"
          height={height}
          role="img"
          aria-label={`Portfolio chart for period ${period}`}
        >
          <defs>
            <linearGradient id={`fill-${gradId}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={changeColor} stopOpacity="0.22" />
              <stop offset="100%" stopColor={changeColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Dotted baseline */}
          <line
            x1="0"
            y1={height * 0.78}
            x2={width}
            y2={height * 0.78}
            stroke="var(--ink-subtle)"
            strokeWidth="1"
            strokeDasharray="2 4"
            opacity="0.45"
          />

          {/* Area fill */}
          <motion.path
            key={`area-${period}`}
            d={areaPath}
            fill={`url(#fill-${gradId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />

          {/* Line */}
          <motion.path
            key={`line-${period}`}
            d={linePath}
            fill="none"
            stroke={changeColor}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          {/* End dot with glow */}
          <motion.circle
            key={`dot-glow-${period}`}
            cx={endPoint[0]}
            cy={endPoint[1]}
            r="9"
            fill={changeColor}
            opacity="0.18"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.55, duration: 0.3 }}
          />
          <motion.circle
            key={`dot-${period}`}
            cx={endPoint[0]}
            cy={endPoint[1]}
            r="3.5"
            fill={changeColor}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.55, duration: 0.3 }}
          />
        </svg>
      </div>

      {/* Period selector */}
      <div className="portfolio-period-selector" role="tablist" aria-label="Chart time range">
        {periods.map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={p === period}
            onClick={() => setPeriod(p)}
            className={p === period ? "active" : ""}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
