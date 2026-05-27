"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  chevron?: boolean;
}

export function SectionHeader({ title, subtitle, chevron = true }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="section-header"
    >
      <h2 className="section-header-title">
        {title}
        {chevron && (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            className="section-header-chevron"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        )}
      </h2>
      {subtitle && <p className="section-header-subtitle">{subtitle}</p>}
    </motion.div>
  );
}
