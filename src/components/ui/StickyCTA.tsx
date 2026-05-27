"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormContext } from "@/components/FormContext";

export function StickyCTA() {
  const { scrollToForm } = useFormContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // show after scrolling past hero (~600px) and hide near the form to avoid overlap
      const y = window.scrollY;
      const form = document.getElementById("qualification-form");
      const formTop = form ? form.getBoundingClientRect().top + window.scrollY : Infinity;
      const nearForm = y + window.innerHeight > formTop - 200 && y < formTop + (form?.offsetHeight ?? 0);
      setVisible(y > 600 && !nearForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden"
          style={{
            position: "fixed",
            bottom: 16,
            left: 16,
            right: 16,
            zIndex: 40,
          }}
        >
          <button
            onClick={() => scrollToForm("60")}
            className="pill pill-primary w-full"
            style={{
              padding: "14px 24px",
              fontSize: "15px",
              boxShadow: "0 8px 24px rgba(0, 200, 5, 0.32), 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Work With Greg
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
