/**
 * TournamentsScreen Component
 *
 * Displays list of available tournaments with:
 * - Tournament status (registration, upcoming, in_progress, completed)
 * - Player counts
 * - Time until start
 * - Navigation to details
 */

import React from 'react';
import { ArrowLeft, Trophy, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useAuth } from '../contexts/AuthContext';

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

const TournamentsScreen = () => {
  const { setGameState, tournaments, tournamentsLoading, setSelectedTournament } = useGame();
  const { user } = useAuth();

  const getTimeUntilStart = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = start - now;

    if (diff <= 0) return 'In Progress';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'registration':
      case 'upcoming':
        return '#6890F0'; // Blue
      case 'in_progress':
        return '#78C850'; // Green
      case 'completed':
        return '#A8A878'; // Gray
      default:
        return '#A8A878';
    }
  };

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
            <Trophy size={20} className="text-type-psychic" />
            <span className="font-bold text-pocket-text">Tournaments</span>
          </div>
          <div className="w-10" />
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto">
        {/* Login Warning */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-4"
          >
            <p className="text-center text-amber-700 font-bold text-sm">
              Login required to enter tournaments
            </p>
          </motion.div>
        )}

        {tournamentsLoading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-card p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pocket-bg flex items-center justify-center">
              <Trophy size={32} className="text-pocket-text-light animate-pulse" />
            </div>
            <p className="text-pocket-text-light">Loading tournaments...</p>
          </motion.div>
        ) : tournaments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-card p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pocket-bg flex items-center justify-center">
              <Trophy size={32} className="text-pocket-text-light" />
            </div>
            <p className="text-pocket-text mb-2">No tournaments available</p>
            <p className="text-sm text-pocket-text-light mb-4">Check back later!</p>
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
            {tournaments.map((tournament) => (
              <motion.div
                key={tournament.id}
                variants={itemVariants}
                whileHover={{ y: -2 }}
                onClick={() => {
                  setSelectedTournament(tournament);
                  setGameState('tournamentDetails');
                }}
                className="bg-white rounded-2xl shadow-card p-5 cursor-pointer transition-shadow hover:shadow-card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-pocket-text mb-2">{tournament.name}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="px-3 py-1 rounded-full text-white text-xs font-bold"
                        style={{ backgroundColor: getStatusColor(tournament.status) }}
                      >
                        {tournament.status.replace('_', ' ').toUpperCase()}
                      </span>
                      {tournament.status === 'in_progress' && (
                        <span className="px-3 py-1 rounded-full bg-type-psychic text-white text-xs font-bold">
                          Round {tournament.current_round}/{tournament.total_rounds}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <Trophy size={24} className="text-amber-500" />
                  </div>
                </div>

                <div className="bg-pocket-bg rounded-xl p-3 space-y-2 text-sm mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-pocket-text-light flex items-center gap-1">
                      <Users size={14} /> Players
                    </span>
                    <span className="font-bold text-pocket-text">{tournament.entries_count}/{tournament.max_players}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-pocket-text-light flex items-center gap-1">
                      <Clock size={14} />
                      {tournament.status === 'upcoming' || tournament.status === 'registration' ? 'Starts in' : 'Started'}
                    </span>
                    <span className="font-bold text-pocket-text">
                      {tournament.status === 'upcoming' || tournament.status === 'registration'
                        ? getTimeUntilStart(tournament.start_time)
                        : new Date(tournament.start_time).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTournament(tournament);
                    setGameState('tournamentDetails');
                  }}
                  className="w-full pocket-btn-primary py-2"
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TournamentsScreen;
