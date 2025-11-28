/**
 * ProfileIcon Component
 *
 * Displays a user's profile icon as a circular cropped image.
 * Used throughout the app next to usernames in PvP and tournaments.
 */

import React from 'react';

// Map icon keys to display names, image paths, and face positioning
// objectPosition is used to center on the face of each character
const ICON_CONFIG = {
  pikachu: { name: 'Pikachu', path: '/images/profile-icons/pikachu.png', objectPosition: 'center 15%' },
  squirtle: { name: 'Squirtle', path: '/images/profile-icons/squirtle.png', objectPosition: 'center 10%' },
  charmander: { name: 'Charmander', path: '/images/profile-icons/charmander.png', objectPosition: 'center 10%' },
  bulbasaur: { name: 'Bulbasaur', path: '/images/profile-icons/bulbasaur.png', objectPosition: 'center 15%' },
  mewtwo: { name: 'Mewtwo', path: '/images/profile-icons/mewtwo.png', objectPosition: 'center 10%' },
  'officer-jenny': { name: 'Officer Jenny', path: '/images/profile-icons/officer-jenny.png', objectPosition: 'center 8%' }
};

const ProfileIcon = ({ icon = 'pikachu', size = 32, className = '', showBorder = true }) => {
  const config = ICON_CONFIG[icon] || ICON_CONFIG.pikachu;

  return (
    <div
      className={`rounded-full overflow-hidden flex-shrink-0 ${showBorder ? 'ring-2 ring-white shadow-sm' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={config.path}
        alt={config.name}
        className="w-full h-full object-cover"
        style={{
          objectPosition: config.objectPosition || 'center center'
        }}
      />
    </div>
  );
};

export { ICON_CONFIG };
export default ProfileIcon;
