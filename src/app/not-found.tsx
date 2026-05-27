import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", textAlign: "center", gap: "16px" }}>
      <h1 style={{ fontSize: "48px", fontWeight: 800, letterSpacing: "-0.02em" }}>404</h1>
      <p style={{ color: "var(--ink-muted)", maxWidth: "320px" }}>
        This page doesn&apos;t exist. Let&apos;s get you back on track.
      </p>
      <Link href="/" className="pill pill-primary" style={{ padding: "12px 24px", fontSize: "15px" }}>
        Back to home
      </Link>
    </div>
  );
}
