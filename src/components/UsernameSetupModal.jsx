/**
 * UsernameSetupModal Component
 *
 * Modal for new Google OAuth users to set their username.
 * Cannot be closed - username must be set before continuing.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';

const UsernameSetupModal = ({ onSubmit, loading, error }) => {
  const [username, setUsername] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateUsername = (value) => {
    if (value.length < 3) {
      return 'Username must be at least 3 characters';
    }
    if (value.length > 20) {
      return 'Username must be 20 characters or less';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return 'Only letters, numbers, and underscores allowed';
    }
    return '';
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    if (value) {
      setValidationError(validateUsername(value));
    } else {
      setValidationError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateUsername(username);
    if (error) {
      setValidationError(error);
      return;
    }
    onSubmit(username);
  };

  const displayError = error || validationError;
  const isValid = username.length >= 3 && !validationError;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 z-50">
      {/* Game Logo */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <img
          src="/images/logo.png"
          alt="Pokesume Pretty Duel!"
          className="w-72 md:w-96 h-auto drop-shadow-lg"
        />
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-card-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pocket-yellow to-pocket-red flex items-center justify-center">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-pocket-text">Welcome, Trainer!</h2>
            <p className="text-sm text-pocket-text-light">Choose your trainer name</p>
          </div>
        </div>

        <div className="bg-pocket-blue/10 border border-pocket-blue/30 rounded-xl p-3 mb-4">
          <p className="text-pocket-blue text-sm">
            Your username will be visible to other trainers in battles, tournaments, and leaderboards.
          </p>
        </div>

        {displayError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-red-600 text-sm font-semibold">{displayError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-pocket-text mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-pocket-text-light" />
              </div>
              <input
                type="text"
                value={username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-pocket-bg border-2 border-transparent rounded-xl focus:border-pocket-red focus:bg-white focus:outline-none transition-colors"
                placeholder="Enter your trainer name"
                autoComplete="username"
                autoFocus
                minLength={3}
                maxLength={20}
              />
            </div>
            <p className="mt-2 text-xs text-pocket-text-light">
              3-20 characters. Letters, numbers, and underscores only.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !isValid}
            className="pocket-btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Setting up...' : 'Start Your Journey!'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UsernameSetupModal;
