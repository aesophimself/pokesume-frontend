/**
 * AuthModal Component
 *
 * Login/Register modal for user authentication.
 * Can be used as optional modal or mandatory login screen.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { User, X } from 'lucide-react';

const AuthModal = ({
  showAuth,
  authMode,
  authForm,
  authError,
  authLoading,
  onClose,
  onSubmit,
  onFormChange,
  onModeChange,
  ICONS,
  isMandatory = false  // New prop for mandatory login mode
}) => {
  if (!showAuth && !isMandatory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-6 max-w-md w-full shadow-card-lg"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-pocket-red/10 flex items-center justify-center">
              <User size={20} className="text-pocket-red" />
            </div>
            <h2 className="text-xl font-bold text-pocket-text">
              {authMode === 'login' ? 'Login' : 'Create Account'}
            </h2>
          </div>
          {!isMandatory && onClose && (
            <button
              onClick={onClose}
              className="p-2 text-pocket-text-light hover:text-pocket-text hover:bg-pocket-bg rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {isMandatory && (
          <div className="bg-pocket-blue/10 border border-pocket-blue/30 rounded-xl p-3 mb-4">
            <p className="text-pocket-blue text-sm font-semibold">
              Please log in or create an account to continue
            </p>
          </div>
        )}

        {authError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-red-600 text-sm font-semibold">{authError}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-pocket-text mb-2">
              Username
            </label>
            <input
              type="text"
              value={authForm.username}
              onChange={(e) => onFormChange('username', e.target.value)}
              className="w-full px-4 py-3 bg-pocket-bg border-2 border-transparent rounded-xl focus:border-pocket-red focus:bg-white focus:outline-none transition-colors"
              placeholder="Enter username"
              autoComplete="username"
              required
              minLength={3}
              maxLength={20}
            />
          </div>

          {authMode === 'register' && (
            <div>
              <label className="block text-sm font-bold text-pocket-text mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => onFormChange('email', e.target.value)}
                className="w-full px-4 py-3 bg-pocket-bg border-2 border-transparent rounded-xl focus:border-pocket-red focus:bg-white focus:outline-none transition-colors"
                placeholder="Enter email (optional)"
                autoComplete="email"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-pocket-text mb-2">
              Password
            </label>
            <input
              type="password"
              value={authForm.password}
              onChange={(e) => onFormChange('password', e.target.value)}
              className="w-full px-4 py-3 bg-pocket-bg border-2 border-transparent rounded-xl focus:border-pocket-red focus:bg-white focus:outline-none transition-colors"
              placeholder="Enter password"
              autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="pocket-btn-primary w-full py-3 text-lg"
          >
            {authLoading ? 'Please wait...' : authMode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onModeChange}
            className="text-pocket-blue hover:text-pocket-blue/80 font-semibold text-sm transition-colors"
          >
            {authMode === 'login'
              ? "Don't have an account? Register"
              : 'Already have an account? Login'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
