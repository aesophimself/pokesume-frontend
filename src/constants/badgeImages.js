/**
 * Badge Image Mappings
 * Maps gym leader names to their gym badges
 */

// Badge images mapped to gym leaders
export const GYM_LEADER_BADGES = {
  // Kanto Gym Leaders
  'Blaine': {
    name: 'Volcano Badge',
    image: '/images/badges/volcano-badge.png',
    region: 'Kanto'
  },
  'Misty': {
    name: 'Cascade Badge',
    image: '/images/badges/cascade-badge.png',
    region: 'Kanto'
  },
  'Erika': {
    name: 'Rainbow Badge',
    image: '/images/badges/rainbow-badge.png',
    region: 'Kanto'
  },
  'Lt. Surge': {
    name: 'Thunder Badge',
    image: '/images/badges/thunder-badge.png',
    region: 'Kanto'
  },
  'Sabrina': {
    name: 'Marsh Badge',
    image: '/images/badges/marsh-badge.png',
    region: 'Kanto'
  },
  'Giovanni': {
    name: 'Earth Badge',
    image: '/images/badges/earth-badge.png',
    region: 'Kanto'
  },

  // Hoenn Gym Leaders
  'Wallace': {
    name: 'Rain Badge',
    image: '/images/badges/rain-badge.png',
    region: 'Hoenn'
  },
  'Flannery': {
    name: 'Heat Badge',
    image: '/images/badges/heat-badge.png',
    region: 'Hoenn'
  },
  'Winona': {
    name: 'Feather Badge',
    image: '/images/badges/feather-badge.png',
    region: 'Hoenn'
  },
  'Wattson': {
    name: 'Dynamo Badge',
    image: '/images/badges/dynamo-badge.png',
    region: 'Hoenn'
  },

  // Johto Elite Four (using similar badges)
  'Bruno': {
    name: 'Storm Badge',
    image: '/images/badges/storm-badge.png',
    region: 'Johto'
  },
  'Agatha': {
    name: 'Glacier Badge',
    image: '/images/badges/glacier-badge.png',
    region: 'Johto'
  },
  'Will': {
    name: 'Glacier Badge',
    image: '/images/badges/glacier-badge.png',
    region: 'Johto'
  },
  'Juan': {
    name: 'Rain Badge',
    image: '/images/badges/rain-badge.png',
    region: 'Hoenn'
  }
};

// Helper function to get badge for a gym leader
export const getGymLeaderBadge = (leaderName) => {
  return GYM_LEADER_BADGES[leaderName] || null;
};

// Helper function to check if a leader awards a badge
export const isGymLeader = (leaderName) => {
  return leaderName in GYM_LEADER_BADGES;
};
