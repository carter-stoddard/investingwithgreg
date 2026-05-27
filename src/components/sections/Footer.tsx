export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-elev)",
        borderTop: "1px solid var(--border)",
        paddingTop: 48,
        paddingBottom: 48,
      }}
    >
      <div className="container-edge">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
            }}
          >
            Greg
            <span style={{ color: "var(--brand)" }}>.</span>
          </div>

          <nav
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 20,
              justifyContent: "center",
              fontSize: 14,
            }}
          >
            <a href="#" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
              Home
            </a>
            <a href="#pricing" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
              Work With Greg
            </a>
            <a href="#qualification-form" style={{ color: "var(--ink-muted)", textDecoration: "none" }}>
              Contact
            </a>
          </nav>

          <p style={{ fontSize: 12, color: "var(--ink-subtle)" }}>
            ® 2026 @investwithgreg
          </p>
        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            fontSize: 11,
            color: "var(--ink-subtle)",
            lineHeight: 1.6,
            maxWidth: 880,
            marginInline: "auto",
            fontStyle: "italic",
          }}
        >
          Greg is not a licensed financial advisor, broker, or investment professional. All content on this website —
          including stock mentions, portfolio performance, and any recommendations made during calls — is strictly for
          educational and informational purposes only. Nothing on this site constitutes financial advice, a solicitation,
          or an offer to buy or sell any security. Past performance is not indicative of future results. All investing
          involves risk, including the potential loss of principal. Always conduct your own research and consult with a
          licensed financial professional before making any investment decisions. By engaging with this site or booking a
          session, you acknowledge that you are solely responsible for your own financial decisions.
        </div>
      </div>
    </footer>
  );
}
