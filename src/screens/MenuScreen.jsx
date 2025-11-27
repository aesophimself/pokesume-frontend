/**
 * MenuScreen Component
 *
 * Main menu with Pokemon TCG Pocket style UI.
 * Features polished cards, smooth animations, and clean iconography.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  LogOut,
  AlertTriangle,
  Swords,
  Box,
  Users,
  Trophy,
  Medal,
  CircleDot,
  Gift
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { useInventory } from '../contexts/InventoryContext';
import { generatePokemonSprite } from '../utils/gameUtils';
import { TypeBadge, TYPE_COLORS } from '../components/TypeIcon';
import { POKEMON } from '../shared/gameData';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { MenuTile } from '../components/ui/menu-tile';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Menu configuration
const MENU_ITEMS = [
  {
    key: 'career',
    label: 'New Career',
    icon: Swords,
    color: '#9B7ED9',
    screen: 'pokemonSelect'
  },
  {
    key: 'pokemon',
    label: 'My Pokemon',
    icon: Box,
    color: '#5DBE8A',
    screen: 'pokemonInventory',
    badgeKey: 'pokemonInventory'
  },
  {
    key: 'supports',
    label: 'Supports',
    icon: Users,
    color: '#4A9FD4',
    screen: 'supportInventory',
    badgeKey: 'supportInventory'
  },
  {
    key: 'hallOfFame',
    label: 'Hall of Fame',
    icon: Trophy,
    color: '#F5A623',
    screen: 'trainedPokemon',
    badgeKey: 'trainedPokemon'
  },
  {
    key: 'pokemonGacha',
    label: 'Pokemon Gacha',
    icon: CircleDot,
    color: '#9B7ED9',
    screen: 'gacha'
  },
  {
    key: 'supportGacha',
    label: 'Support Gacha',
    icon: Gift,
    color: '#4A9FD4',
    screen: 'supportGacha'
  },
  {
    key: 'tournaments',
    label: 'Tournaments',
    icon: Medal,
    color: '#E85D5D',
    screen: 'tournaments'
  }
];

// Starter selection card component
const StarterCard = ({ pokemon, name, onSelect }) => {
  const typeColor = TYPE_COLORS[pokemon.primaryType] || '#A8A878';

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="bg-white rounded-2xl p-4 shadow-neu-card hover:shadow-[0_12px_40px_rgba(74,159,212,0.2)] transition-shadow duration-300 flex flex-col items-center"
      style={{ borderTop: `4px solid ${typeColor}` }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-3"
      >
        {generatePokemonSprite(pokemon.primaryType, name)}
      </motion.div>
      <h3 className="text-pocket-text font-bold text-lg mb-2">{name}</h3>
      <TypeBadge type={pokemon.primaryType} size={14} />
    </motion.button>
  );
};

const MenuScreen = () => {
  const { user, logout } = useAuth();
  const { setGameState, setShowResetConfirm } = useGame();
  const {
    pokemonInventory,
    supportInventory,
    trainedPokemon,
    primos,
    loadPokemonInventory,
    addPokemon
  } = useInventory();

  // Badge counts for menu items
  const badgeCounts = {
    pokemonInventory: pokemonInventory.length,
    supportInventory: supportInventory.length,
    trainedPokemon: trainedPokemon.length
  };

  // Starter selection (if user has no pokemon)
  if (pokemonInventory.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pocket-bg to-pocket-bg-alt p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-lg mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants}>
            <Card className="mb-6 text-center">
              <CardHeader>
                <CardTitle className="text-2xl text-pocket-blue">
                  Choose Your Starter!
                </CardTitle>
                <CardDescription>
                  Select your first Pokemon partner to begin your journey
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Starter Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-3 gap-3"
          >
            {['Charmander', 'Squirtle', 'Bulbasaur'].map((starter, index) => {
              const pokemon = POKEMON[starter];
              return (
                <motion.div key={starter} variants={itemVariants}>
                  <StarterCard
                    pokemon={pokemon}
                    name={starter}
                    onSelect={async () => {
                      const result = await addPokemon(starter, pokemon);
                      if (result) {
                        await loadPokemonInventory();
                      } else {
                        alert('Failed to add starter Pokemon. Please try again.');
                      }
                    }}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* Version */}
          <motion.p
            variants={itemVariants}
            className="text-center text-pocket-text-light text-xs mt-6"
          >
            v4.0.0
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-b from-pocket-bg to-pocket-bg-alt">
      {/* Header Bar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-pocket-bg-alt px-4 py-3"
      >
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {/* Currency */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-1.5 rounded-full border border-yellow-200"
          >
            <Sparkles size={16} className="text-yellow-500" />
            <span className="text-pocket-text font-bold text-sm">
              {primos.toLocaleString()}
            </span>
          </motion.div>

          {/* User info */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-pocket-text font-semibold text-sm">{user.username}</p>
              <p className="text-pocket-text-light text-xs">
                Rating: {user.rating || 1000}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="text-pocket-red hover:bg-red-50"
            >
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="p-4 pb-8 max-w-lg mx-auto"
      >
        {/* Title Card */}
        <motion.div variants={itemVariants}>
          <Card className="text-center mb-5 overflow-hidden">
            <div className="bg-gradient-to-r from-pocket-blue/10 via-pocket-purple/10 to-pocket-blue/10 p-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-pocket-blue to-pocket-purple bg-clip-text text-transparent">
                Pokesume Pretty Duel
              </h1>
              <p className="text-pocket-text-light text-sm mt-1">
                Pick a buddy and prove you're the very best!
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Main Menu Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 gap-3 mb-5"
        >
          {MENU_ITEMS.map((item) => (
            <motion.div key={item.key} variants={itemVariants}>
              <MenuTile
                icon={item.icon}
                iconColor={item.color}
                label={item.label}
                badge={item.badgeKey ? badgeCounts[item.badgeKey] : undefined}
                onClick={() => setGameState(item.screen)}
                disabled={item.key === 'career' && pokemonInventory.length === 0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Danger Zone */}
        <motion.div variants={itemVariants}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowResetConfirm(true);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 text-pocket-red/70 hover:text-pocket-red text-xs transition-colors"
          >
            <AlertTriangle size={14} />
            <span>Reset All Data</span>
          </button>
        </motion.div>

        {/* Version */}
        <motion.p
          variants={itemVariants}
          className="text-center text-pocket-text-light text-xs mt-3"
        >
          v4.0.0
        </motion.p>
      </motion.main>
    </div>
  );
};

export default MenuScreen;
