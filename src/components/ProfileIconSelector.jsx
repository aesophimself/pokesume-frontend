/**
 * ProfileIconSelector Component
 *
 * Modal for selecting a profile icon from available options.
 * Shows circular cropped previews of each character.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Sparkles } from 'lucide-react';
import ProfileIcon, { ICON_CONFIG } from './ProfileIcon';
import { apiGetProfileIcons, apiUpdateProfileIcon } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const ProfileIconSelector = ({ currentIcon, onClose, onIconChange }) => {
  const { authToken } = useAuth();
  const [selectedIcon, setSelectedIcon] = useState(currentIcon || 'pikachu');
  const [icons, setIcons] = useState(Object.keys(ICON_CONFIG));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadIcons = async () => {
      try {
        const availableIcons = await apiGetProfileIcons();
        if (availableIcons && availableIcons.length > 0) {
          setIcons(availableIcons);
        }
      } catch (err) {
        console.error('Failed to load icons:', err);
      }
    };
    loadIcons();
  }, []);

  const handleSave = async () => {
    if (selectedIcon === currentIcon) {
      onClose();
      return;
    }

    setError(null);
    setSaving(true);

    try {
      const result = await apiUpdateProfileIcon(selectedIcon, authToken);

      if (result) {
        onIconChange(selectedIcon);
        onClose();
      } else {
        setError('Failed to save icon. Please try again.');
      }
    } catch (err) {
      console.error('Save icon error:', err);
      setError('Failed to save icon. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-pocket-blue to-pocket-red p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-white" />
              <h2 className="text-lg font-bold text-white">Choose Your Icon</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
          </div>

          {/* Current Selection Preview */}
          <div className="p-6 bg-gradient-to-b from-pocket-bg to-white text-center">
            <div className="relative inline-block">
              <ProfileIcon
                icon={selectedIcon}
                size={96}
                showBorder={true}
                className="ring-4 ring-pocket-blue shadow-lg mx-auto"
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pocket-blue text-white text-xs font-bold px-3 py-1 rounded-full">
                {ICON_CONFIG[selectedIcon]?.name || selectedIcon}
              </div>
            </div>
          </div>

          {/* Icon Grid */}
          <div className="p-4">
            <p className="text-sm text-pocket-text-light text-center mb-4">
              Select an icon to represent you in battles
            </p>
            <div className="grid grid-cols-3 gap-4">
              {icons.map((iconKey) => {
                const config = ICON_CONFIG[iconKey];
                if (!config) return null;

                const isSelected = selectedIcon === iconKey;

                return (
                  <motion.button
                    key={iconKey}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedIcon(iconKey)}
                    className={`relative p-3 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-pocket-blue/10 ring-2 ring-pocket-blue'
                        : 'bg-pocket-bg hover:bg-gray-100'
                    }`}
                  >
                    <ProfileIcon
                      icon={iconKey}
                      size={56}
                      showBorder={false}
                      className="mx-auto mb-2"
                    />
                    <p className={`text-xs font-medium truncate ${
                      isSelected ? 'text-pocket-blue' : 'text-pocket-text'
                    }`}>
                      {config.name}
                    </p>

                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-pocket-blue rounded-full flex items-center justify-center"
                      >
                        <Check size={14} className="text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-pocket-bg border-t border-gray-200">
            {error && (
              <p className="text-red-500 text-sm text-center mb-3">{error}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-pocket-text font-semibold hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-pocket-blue text-white font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileIconSelector;
