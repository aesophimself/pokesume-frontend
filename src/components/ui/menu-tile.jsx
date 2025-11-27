import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const MenuTile = React.forwardRef(
  ({ className, icon: Icon, iconColor, label, badge, disabled, onClick, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={cn(
          "relative flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-white",
          "w-full aspect-square",
          "shadow-card",
          "transition-all duration-200",
          "hover:shadow-card-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pocket-red focus-visible:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {/* Icon container - cleaner circular style */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: `${iconColor}18`,
          }}
        >
          {typeof Icon === 'string' ? (
            <img src={Icon} alt="" className="w-6 h-6 object-contain" />
          ) : Icon ? (
            <Icon size={24} style={{ color: iconColor }} strokeWidth={2} />
          ) : null}
        </div>

        {/* Label */}
        <span className="text-pocket-text font-semibold text-sm text-center leading-tight">
          {label}
        </span>

        {/* Badge */}
        {badge !== undefined && badge > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-5 h-5 px-1.5 bg-pocket-red text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-pill"
          >
            {badge > 99 ? '99+' : badge}
          </motion.div>
        )}
      </motion.button>
    );
  }
);
MenuTile.displayName = "MenuTile";

export { MenuTile };
