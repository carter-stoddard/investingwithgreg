"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}

export function SectionReveal({ children, delay = 0, y = 20, className, as = "div" }: SectionRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
