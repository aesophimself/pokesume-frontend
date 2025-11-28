/**
 * GameGuideScreen Component
 *
 * Full-page game guide accessible from the home menu.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import GameGuide from '../components/GameGuide';

const GameGuideScreen = () => {
  const { setGameState } = useGame();

  return (
    <div className="min-h-screen bg-pocket-bg p-4">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 bg-white shadow-card rounded-2xl mb-4 max-w-2xl mx-auto"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setGameState('menu')}
            className="p-2 text-pocket-text-light hover:text-pocket-text hover:bg-pocket-bg rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <HelpCircle size={20} className="text-pocket-blue" />
            <span className="font-bold text-pocket-text">Game Guide</span>
          </div>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </motion.header>

      {/* Guide Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <GameGuide showHeader={false} />
      </motion.div>
    </div>
  );
};

export default GameGuideScreen;
