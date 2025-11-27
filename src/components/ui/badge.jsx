import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-pocket-blue text-white",
        secondary:
          "bg-pocket-purple text-white",
        destructive:
          "bg-pocket-red text-white",
        outline:
          "border border-pocket-gray text-pocket-text",
        success:
          "bg-pocket-green text-white",
        warning:
          "bg-pocket-yellow text-pocket-text",
        // Pokemon type badges
        fire: "bg-type-fire text-white",
        water: "bg-type-water text-white",
        grass: "bg-type-grass text-white",
        electric: "bg-type-electric text-gray-900",
        psychic: "bg-type-psychic text-white",
        fighting: "bg-type-fighting text-white",
        normal: "bg-type-normal text-gray-900",
        poison: "bg-type-poison text-white",
        ground: "bg-type-ground text-gray-900",
        flying: "bg-type-flying text-white",
        bug: "bg-type-bug text-white",
        rock: "bg-type-rock text-white",
        ghost: "bg-type-ghost text-white",
        dragon: "bg-type-dragon text-white",
        dark: "bg-type-dark text-white",
        steel: "bg-type-steel text-gray-900",
        fairy: "bg-type-fairy text-gray-900",
        ice: "bg-type-ice text-gray-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
