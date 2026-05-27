const HOLDINGS = [
  { symbol: "AMD", change: "+53%" },
  { symbol: "GOOGL", change: "+37%" },
  { symbol: "AMZN", change: "+23%" },
];

export function TickerTape() {
  // 4x duplication keeps the seamless loop (translateX(-50%) lands on a boundary)
  // and keeps the strip visually full with only 3 unique items.
  const items = [...HOLDINGS, ...HOLDINGS, ...HOLDINGS, ...HOLDINGS];

  return (
    <div
      role="presentation"
      aria-hidden
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        width: "100%",
        background: "var(--bg-ticker)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* Pinned label on the left */}
      <div
        style={{
          flexShrink: 0,
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "8px 14px",
          background: "var(--brand)",
          color: "#ffffff",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          zIndex: 2,
          boxShadow: "4px 0 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: 999, background: "#ffffff", boxShadow: "0 0 8px rgba(255,255,255,0.8)" }} />
        Top Holdings
      </div>

      <div className="ticker-mask" style={{ flex: 1, display: "flex", whiteSpace: "nowrap", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            flexShrink: 0,
            animation: "ticker-scroll-ltr 40s linear infinite",
            willChange: "transform",
          }}
        >
          {items.map((t, i) => (
            <span
              key={`${t.symbol}-${i}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 22px",
                fontSize: 12,
                fontWeight: 600,
                color: "var(--brand)",
                letterSpacing: "0.04em",
              }}
            >
              <span style={{ color: "var(--ink)" }}>{t.symbol}</span>
              <span>{t.change}</span>
              <span style={{ color: "var(--ink-subtle)" }}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
