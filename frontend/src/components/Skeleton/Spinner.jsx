"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

// Spinner container style
const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

// Loader icon size style
const loaderVariants = cva("animate-spin text-primary", {
  variants: {
    size: {
      small: "size-6",
      medium: "size-8",
      large: "size-12",
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

// Spinner component
export default function Spinner({
  size = "medium",
  show = true,
  children,
  className,
}) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
