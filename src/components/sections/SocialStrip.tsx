"use client";

import { motion } from "framer-motion";

const TIKTOK_URL = "https://www.tiktok.com/@investwithgreg";

export function SocialStrip() {
  return (
    <section style={{ paddingBlock: 32 }}>
      <div className="container-edge" style={{ display: "flex", justifyContent: "center" }}>
        <motion.a
          href={TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pill pill-primary"
          style={{ padding: "14px 28px", fontSize: 15, gap: 8 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
          </svg>
          Follow on TikTok
        </motion.a>
      </div>
    </section>
  );
}
