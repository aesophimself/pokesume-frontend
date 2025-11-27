/**
 * Trainer Image Mappings
 * Maps trainer names to their sprite images
 */

// Gym Leader Images
export const GYM_LEADER_IMAGES = {
  'Blaine': '/images/trainers/gym-leaders/blaine.png',
  'Misty': '/images/trainers/gym-leaders/misty.png',
  'Erika': '/images/trainers/gym-leaders/erika.png',
  'Lt. Surge': '/images/trainers/gym-leaders/ltsurge.png',
  'Sabrina': '/images/trainers/gym-leaders/sabrina.png',
  'Giovanni': '/images/trainers/gym-leaders/giovanni.png',
  'Wallace': '/images/trainers/gym-leaders/wallace.png',
  'Flannery': '/images/trainers/gym-leaders/flannery.png',
  'Winona': '/images/trainers/gym-leaders/winona.png',
  'Wattson': '/images/trainers/gym-leaders/wattson.png',
  'Juan': '/images/trainers/gym-leaders/juan.png',
  'Bruno': '/images/trainers/gym-leaders/bruno.png',
  'Agatha': '/images/trainers/gym-leaders/agatha.png',
  'Will': '/images/trainers/gym-leaders/will.png',
};

// Support Card Trainer Images (maps trainer names from support cards)
export const SUPPORT_TRAINER_IMAGES = {
  'Cynthia': '/images/trainers/supports/cynthia.png',
  'Red': '/images/trainers/supports/red.png',
  'Steven': '/images/trainers/supports/steven.png',
  'Lance': '/images/trainers/supports/lance.png',
  'Misty': '/images/trainers/supports/misty.png',
  'Brock': '/images/trainers/supports/brock.png',
  'Erika': '/images/trainers/supports/erika.png',
  'Sabrina': '/images/trainers/supports/sabrina.png',
  'Blaine': '/images/trainers/supports/blaine.png',
  'May': '/images/trainers/supports/may.png',
  'Brendan': '/images/trainers/supports/brendan.png',
};

// Helper function to get gym leader image with fallback
export const getGymLeaderImage = (name) => {
  return GYM_LEADER_IMAGES[name] || '/images/trainers/gym-leaders/default.png';
};

// Helper function to get support trainer image with fallback
export const getSupportTrainerImage = (trainerName) => {
  return SUPPORT_TRAINER_IMAGES[trainerName] || null;
};

// Helper function to extract trainer name from support card name
// Support card format: "Trainer & Pokemon" (e.g., "Cynthia & Garchomp")
export const getSupportImageFromCardName = (cardName) => {
  if (!cardName) return null;

  // Extract trainer name (first part before &)
  const trainerName = cardName.split('&')[0]?.trim();
  return getSupportTrainerImage(trainerName);
};
