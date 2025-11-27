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
          "relative flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white",
          "w-full aspect-square",
          "shadow-[0_4px_20px_rgba(74,159,212,0.12),0_2px_8px_rgba(0,0,0,0.04)]",
          "transition-shadow duration-200",
          "hover:shadow-[0_8px_30px_rgba(74,159,212,0.18),0_4px_12px_rgba(0,0,0,0.06)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pocket-blue focus-visible:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        {...props}
      >
        {/* Icon container */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${iconColor}15`,
            boxShadow: `inset 0 2px 4px ${iconColor}10`
          }}
        >
          {typeof Icon === 'string' ? (
            <img src={Icon} alt="" className="w-8 h-8 object-contain" />
          ) : Icon ? (
            <Icon size={28} style={{ color: iconColor }} />
          ) : null}
        </div>

        {/* Label */}
        <span className="text-pocket-text font-medium text-sm text-center leading-tight">
          {label}
        </span>

        {/* Badge */}
        {badge !== undefined && badge > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-6 h-6 px-1.5 bg-pocket-red text-white text-xs font-bold rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(232,93,93,0.4)]"
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
