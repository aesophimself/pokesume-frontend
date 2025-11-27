/**
 * HistoryScreen Component
 *
 * Displays the user's career history showing all completed careers
 * with final stats, moves learned, and outcome.
 */

import React from 'react';
import { ArrowLeft, History, Trophy, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import {
  generatePokemonSprite,
  getGradeColor,
  getPokemonGrade,
  StatIcon
} from '../utils/gameUtils';
import { TypeBadge, TYPE_COLORS } from '../components/TypeIcon';
import { MOVES } from '../shared/gameData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

const HistoryScreen = () => {
  const { setGameState, careerHistory } = useGame();

  return (
    <div className="min-h-screen bg-pocket-bg p-4">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 bg-white shadow-card rounded-2xl mb-4 max-w-4xl mx-auto"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setGameState('menu')}
            className="p-2 text-pocket-text-light hover:text-pocket-text hover:bg-pocket-bg rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <History size={20} className="text-type-psychic" />
            <span className="font-bold text-pocket-text">Career History</span>
          </div>
          <span className="text-pocket-text-light text-sm font-semibold">
            {careerHistory.length} runs
          </span>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto">
        {careerHistory.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-card p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pocket-bg flex items-center justify-center">
              <History size={32} className="text-pocket-text-light" />
            </div>
            <p className="text-pocket-text mb-2">No career history yet</p>
            <p className="text-sm text-pocket-text-light mb-4">
              Complete your first career to see it here!
            </p>
            <button
              onClick={() => setGameState('menu')}
              className="pocket-btn-primary px-6 py-2"
            >
              Back to Menu
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {careerHistory.map((career, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                className="bg-white rounded-2xl shadow-card p-5 transition-shadow hover:shadow-card-hover"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-shrink-0">
                    {generatePokemonSprite(career.primaryType, career.pokemon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-pocket-text truncate">{career.pokemon}</h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: getGradeColor(getPokemonGrade(career.finalStats)) }}
                      >
                        {getPokemonGrade(career.finalStats)}
                      </span>
                    </div>
                    <div className="mb-2">
                      <TypeBadge type={career.primaryType} size={12} />
                    </div>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                      career.victory ? 'bg-pocket-green/10 text-pocket-green' : 'bg-pocket-red/10 text-pocket-red'
                    }`}>
                      {career.victory ? <Trophy size={12} /> : <XCircle size={12} />}
                      {career.victory ? 'CHAMPION' : `Gyms: ${career.gymsDefeated}/5`}
                    </div>
                    <div className="text-[10px] text-pocket-text-light mt-2">
                      Turn {career.finalTurn} • {new Date(career.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Final Stats */}
                <div className="bg-pocket-bg rounded-xl p-3 mb-3">
                  <h4 className="font-bold text-[10px] text-pocket-text-light mb-2">Final Stats</h4>
                  <div className="grid grid-cols-5 gap-1">
                    {Object.entries(career.finalStats).map(([stat, value]) => (
                      <div key={stat} className="text-center">
                        <div className="flex justify-center mb-0.5">
                          <StatIcon stat={stat} size={12} />
                        </div>
                        <div className="font-bold text-xs text-pocket-text">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Moves Learned */}
                {career.knownAbilities && career.knownAbilities.length > 0 && (
                  <div>
                    <h4 className="font-bold text-[10px] text-pocket-text-light mb-2">Moves Learned</h4>
                    <div className="flex flex-wrap gap-1">
                      {career.knownAbilities.map((moveName, moveIdx) => {
                        const move = MOVES[moveName];
                        return (
                          <div
                            key={moveIdx}
                            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                            style={{
                              backgroundColor: `${TYPE_COLORS[move?.type]}20`,
                              color: TYPE_COLORS[move?.type] || '#A8A878',
                              border: `1px solid ${TYPE_COLORS[move?.type] || '#A8A878'}`
                            }}
                          >
                            {moveName}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
