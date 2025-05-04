import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Card Variants
const cardVariants = cva(
  "flex flex-col bg-card text-card-foreground rounded-xl border transition-transform duration-200 overflow-hidden",
  {
    variants: {
      elevation: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
      hoverable: {
        true: "hover:shadow-xl hover:scale-[1.02]",
        false: "",
      },
    },
    defaultVariants: {
      elevation: "sm",
      padding: "md",
      hoverable: true,
    },
  }
);

// Main Card Component
function Card({ className, elevation, padding, hoverable, image, children, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ elevation, padding, hoverable }), className)}
      {...props}
    >
      {image && (
        <img src={image} alt="Card Image" className="w-full h-40 object-cover" />
      )}
      <div className="flex flex-col flex-1 justify-between h-full">
        {children}
      </div>
    </div>
  );
}

// Card Sections
function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn("grid grid-rows-[auto_auto] items-start gap-1.5", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      data-slot="card-title"
      className={cn("text-xl font-bold leading-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center justify-end pt-4", className)} {...props} />
  );
}

function CardAction({ className, ...props }) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}
function CardContent({
  className,
  ...props
}) {
  return (<div data-slot="card-content" className={cn("px-6", className)} {...props} />);
}
// Export all parts
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
};