import Link from "next/link";

export interface LegalSection {
  title: string;
  body: React.ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ eyebrow, title, intro, updated, sections }: LegalPageProps) {
  return (
    <main style={{ background: "var(--bg)", paddingBlock: 0 }}>
      {/* Hero band */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--brand-soft) 0%, transparent 100%)",
          borderBottom: "1px solid var(--border)",
          paddingTop: 48,
          paddingBottom: 56,
        }}
      >
        <div className="container-edge" style={{ maxWidth: 760 }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              color: "var(--ink-muted)",
              textDecoration: "none",
              marginBottom: 28,
              fontWeight: 500,
            }}
          >
            <span aria-hidden style={{ fontSize: 16, lineHeight: 1 }}>←</span> Back to home
          </Link>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--brand-soft)",
              color: "var(--brand)",
              border: "1px solid color-mix(in srgb, var(--brand) 30%, transparent)",
              padding: "5px 12px",
              borderRadius: 999,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "var(--brand)",
                boxShadow: "0 0 8px rgba(0, 200, 5, 0.6)",
              }}
            />
            {eyebrow}
          </div>

          <h1
            style={{
              fontSize: "clamp(36px, 7vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              marginBottom: 16,
              color: "var(--ink)",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "clamp(15px, 3vw, 17px)",
              color: "var(--ink-muted)",
              lineHeight: 1.55,
              maxWidth: 620,
              marginBottom: 24,
            }}
          >
            {intro}
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--ink-subtle)",
              fontWeight: 500,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "var(--brand)",
                opacity: 0.6,
              }}
            />
            Last updated {updated}
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ paddingTop: 48, paddingBottom: 96 }}>
        <div className="container-edge" style={{ maxWidth: 760 }}>
          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {sections.map((s, i) => (
              <li
                key={s.title}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--brand)",
                  borderRadius: 14,
                  padding: "24px 24px 8px",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "var(--brand-soft)",
                      color: "var(--brand)",
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: "-0.01em",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    style={{
                      fontSize: 19,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {s.title}
                  </h2>
                </div>
                <div
                  style={{
                    fontSize: 16,
                    lineHeight: 1.7,
                    color: "var(--ink-muted)",
                    paddingLeft: 44,
                  }}
                  className="legal-body"
                >
                  {s.body}
                </div>
              </li>
            ))}
          </ol>

          <div
            style={{
              marginTop: 48,
              padding: "24px 24px",
              background: "var(--brand-soft)",
              border: "1px solid color-mix(in srgb, var(--brand) 25%, transparent)",
              borderRadius: 14,
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "var(--ink)",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Questions about this page?
            </p>
            <a
              href="mailto:gregwstoddard@gmail.com"
              className="pill pill-primary"
              style={{
                padding: "12px 22px",
                fontSize: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span aria-hidden>✉</span> Email Greg
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
