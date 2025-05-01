import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Map tags/labels to specific Tailwind classes
const tagColorMap = {
  Free: "bg-green-100 text-green-700 border border-green-300",
  Beginner: "bg-blue-100 text-blue-700 border border-blue-300",
  Intermediate: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Professional: "bg-purple-100 text-purple-700 border border-purple-300",
  Frontend: "bg-indigo-100 text-indigo-700 border border-indigo-300",
  Backend: "bg-rose-100 text-rose-700 border border-rose-300",
  React: "bg-cyan-100 text-cyan-700 border border-cyan-300",
  Docs: "bg-sky-100 text-sky-700 border border-sky-300",
  Tool: "bg-gray-100 text-gray-700 border border-gray-300",
  Design: "bg-pink-100 text-pink-700 border border-pink-300",
};

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        custom: "", // no base class, will use tagColorMap
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "span";

  const tagColor = variant === "custom" ? tagColorMap[children] || "" : "";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), tagColor, className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Badge, badgeVariants };
