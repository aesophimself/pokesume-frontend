import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pocket-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-pocket-blue to-pocket-blue-dark text-white shadow-neu-button hover:shadow-neu-button-hover hover:-translate-y-0.5",
        destructive:
          "bg-gradient-to-b from-pocket-red to-red-600 text-white shadow-neu-button hover:shadow-neu-button-hover hover:-translate-y-0.5",
        outline:
          "border-2 border-pocket-blue bg-white text-pocket-blue hover:bg-pocket-blue hover:text-white",
        secondary:
          "bg-gradient-to-b from-pocket-purple to-purple-600 text-white shadow-neu-button hover:shadow-neu-button-hover hover:-translate-y-0.5",
        ghost:
          "text-pocket-text hover:bg-pocket-bg-alt hover:text-pocket-text",
        link:
          "text-pocket-blue underline-offset-4 hover:underline",
        yellow:
          "bg-gradient-to-b from-pocket-yellow to-pocket-yellow-dark text-pocket-text shadow-neu-button hover:shadow-neu-button-hover hover:-translate-y-0.5",
        green:
          "bg-gradient-to-b from-pocket-green to-green-600 text-white shadow-neu-button hover:shadow-neu-button-hover hover:-translate-y-0.5",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
