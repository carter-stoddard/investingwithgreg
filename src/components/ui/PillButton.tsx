"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const sizeClasses: Record<NonNullable<PillButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[15px]",
  lg: "px-8 py-4 text-base",
};

export const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(function PillButton(
  { variant = "primary", size = "md", fullWidth, className = "", children, ...props },
  ref,
) {
  const base = "pill " + (variant === "primary" ? "pill-primary" : "pill-secondary");
  return (
    <button
      ref={ref}
      className={`${base} ${sizeClasses[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
