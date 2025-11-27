/**
 * BadgeModal Component
 *
 * Celebration modal that appears when player defeats a gym leader and earns a badge
 */

import React from 'react';
import { Trophy, X } from 'lucide-react';

const BadgeModal = ({ isOpen, onClose, badge, gymLeaderName }) => {
  if (!isOpen || !badge) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 rounded-lg shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Decorative sparkles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-4 left-4 text-white opacity-50 text-2xl">✨</div>
          <div className="absolute top-8 right-6 text-white opacity-50 text-xl">⭐</div>
          <div className="absolute bottom-12 left-8 text-white opacity-50 text-xl">✨</div>
          <div className="absolute bottom-6 right-12 text-white opacity-50 text-2xl">⭐</div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-800 hover:text-gray-900 transition z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="p-8 text-center relative">
          {/* Trophy icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-white rounded-full p-4 shadow-lg">
              <Trophy className="text-yellow-600" size={48} />
            </div>
          </div>

          {/* Congratulations text */}
          <h2 className="text-3xl font-black text-gray-900 mb-2">
            VICTORY!
          </h2>
          <p className="text-lg font-bold text-gray-800 mb-6">
            You defeated {gymLeaderName}!
          </p>

          {/* Badge display */}
          <div className="bg-white rounded-lg p-6 shadow-inner mb-4">
            <p className="text-sm font-bold text-gray-600 mb-3">
              YOU EARNED THE
            </p>
            <img
              src={badge.image}
              alt={badge.name}
              className="w-32 h-32 mx-auto mb-3 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
            <p className="text-2xl font-black text-gray-900">
              {badge.name}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {badge.region} Region
            </p>
          </div>

          {/* Continue button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BadgeModal;
