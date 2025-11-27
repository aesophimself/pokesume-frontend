/**
 * TypeIcon Component
 *
 * Displays Pokemon type icons using SVG images from pokeresources gen8 icons.
 * Supports all game types: Fire, Water, Grass, Electric, Psychic, Normal, Fighting, Poison
 */

import React from 'react';

// Map type names to their SVG file paths (lowercase for file names)
const TYPE_ICONS = {
  Fire: '/images/types/fire.svg',
  Water: '/images/types/water.svg',
  Grass: '/images/types/grass.svg',
  Electric: '/images/types/electric.svg',
  Psychic: '/images/types/psychic.svg',
  Normal: '/images/types/normal.svg',
  Fighting: '/images/types/fighting.svg',
  Poison: '/images/types/poison.svg'
};

// Background colors for each type (for the badge background)
const TYPE_COLORS = {
  Fire: '#F08030',
  Water: '#6890F0',
  Grass: '#78C850',
  Electric: '#F8D030',
  Psychic: '#F85888',
  Normal: '#A8A878',
  Fighting: '#C03028',
  Poison: '#A040A0'
};

/**
 * TypeIcon - Renders a Pokemon type icon
 *
 * @param {string} type - The Pokemon type (Fire, Water, Grass, etc.)
 * @param {number} size - Icon size in pixels (default: 20)
 * @param {boolean} showLabel - Whether to show the type name next to the icon
 * @param {string} className - Additional CSS classes
 */
export const TypeIcon = ({ type, size = 20, showLabel = false, className = '' }) => {
  const iconPath = TYPE_ICONS[type];
  const bgColor = TYPE_COLORS[type] || '#A8A878';

  if (!iconPath) {
    // Fallback for unknown types - just show text
    return (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white ${className}`}
        style={{ backgroundColor: bgColor }}
      >
        {type}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <img
        src={iconPath}
        alt={`${type} type`}
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          objectFit: 'contain'
        }}
      />
      {showLabel && (
        <span
          className="text-xs font-bold"
          style={{ color: bgColor }}
        >
          {type}
        </span>
      )}
    </span>
  );
};

/**
 * TypeBadge - Renders a Pokemon type as a colored badge with icon
 *
 * @param {string} type - The Pokemon type
 * @param {number} size - Icon size in pixels (default: 16)
 * @param {string} className - Additional CSS classes
 */
export const TypeBadge = ({ type, size = 16, className = '' }) => {
  const iconPath = TYPE_ICONS[type];
  const bgColor = TYPE_COLORS[type] || '#A8A878';

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-white ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {iconPath && (
        <img
          src={iconPath}
          alt=""
          width={size}
          height={size}
          style={{
            width: size,
            height: size,
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)' // Make icon white
          }}
        />
      )}
      {type}
    </span>
  );
};

// Export type colors for use elsewhere
export { TYPE_COLORS };

export default TypeIcon;
