"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type Tier = "60" | "90" | "150";

interface FormContextValue {
  selectedTier: Tier;
  setSelectedTier: (tier: Tier) => void;
  scrollToForm: (tier: Tier) => void;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [selectedTier, setSelectedTier] = useState<Tier>("90");

  const scrollToForm = useCallback((tier: Tier) => {
    setSelectedTier(tier);
    const el = document.getElementById("qualification-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <FormContext.Provider value={{ selectedTier, setSelectedTier, scrollToForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("useFormContext must be used inside FormProvider");
  return ctx;
}
