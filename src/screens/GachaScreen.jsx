/**
 * GachaScreen Component
 *
 * Allows users to roll for new Pokemon using Primos (currency).
 * Cost: 100 Primos per roll
 * Duplicates are automatically refunded.
 */

import React, { useState } from 'react';
import { Sparkles, ArrowLeft, CircleDot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGame } from '../contexts/GameContext';
import { useInventory } from '../contexts/InventoryContext';
import {
  generatePokemonSprite,
  getRarityColor
} from '../utils/gameUtils';
import { TypeBadge } from '../components/TypeIcon';
import { POKEMON, GACHA_RARITY } from '../shared/gameData';

const GachaScreen = () => {
  const { setGameState } = useGame();
  const { primos, pokemonInventory, addPokemon, updatePrimos } = useInventory();
  const [rollResult, setRollResult] = useState(null);

  const rollForPokemon = () => {
    if (primos < 100) return null;

    // Roll for rarity
    const roll = Math.random();
    let selectedRarity = 'Common';
    let cumulativeRate = 0;

    for (const [rarity, data] of Object.entries(GACHA_RARITY)) {
      cumulativeRate += data.rate;
      if (roll < cumulativeRate) {
        selectedRarity = rarity;
        break;
      }
    }

    // Select random Pokemon from rarity pool
    const rarityPool = GACHA_RARITY[selectedRarity].pokemon;
    const pokemon = rarityPool[Math.floor(Math.random() * rarityPool.length)];

    // Check if duplicate
    const isDuplicate = pokemonInventory.includes(pokemon);

    // Add to inventory if not duplicate
    if (!isDuplicate) {
      const pokemonData = POKEMON[pokemon];
      addPokemon(pokemon, pokemonData);
    }

    // Update primos (refund if duplicate)
    const newPrimos = isDuplicate ? primos : primos - 100;
    updatePrimos(newPrimos - primos); // Pass delta

    return { pokemon, rarity: selectedRarity, isDuplicate };
  };

  const handleRoll = () => {
    const result = rollForPokemon();
    if (result) {
      setRollResult(result);
    }
  };

  return (
    <div className="min-h-screen bg-pocket-bg p-4">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-10 bg-white shadow-card rounded-2xl mb-4 max-w-lg mx-auto"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setGameState('menu')}
            className="p-2 text-pocket-text-light hover:text-pocket-text hover:bg-pocket-bg rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <CircleDot size={20} className="text-type-poison" />
            <span className="font-bold text-pocket-text">Pokemon Gacha</span>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
            <Sparkles size={14} className="text-amber-500" />
            <span className="text-pocket-text font-bold text-sm">{primos.toLocaleString()}</span>
          </div>
        </div>
      </motion.header>

      <div className="max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-card overflow-hidden"
        >
          {!rollResult ? (
            <div className="p-6">
              {/* Roll Info */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-type-poison/10 flex items-center justify-center">
                  <CircleDot size={32} className="text-type-poison" />
                </div>
                <h2 className="text-xl font-bold text-pocket-text mb-2">Roll for Pokemon</h2>
                <p className="text-pocket-text-light">100 Primos per roll</p>
              </div>

              {/* Rates Card */}
              <div className="bg-pocket-bg rounded-xl p-4 mb-6">
                <h3 className="font-bold text-pocket-text mb-3 text-sm">Drop Rates</h3>
                <div className="space-y-2">
                  {[
                    { rarity: 'Common', rate: '60%' },
                    { rarity: 'Uncommon', rate: '30%' },
                    { rarity: 'Rare', rate: '9%' },
                    { rarity: 'Legendary', rate: '1%' }
                  ].map(({ rarity, rate }) => (
                    <div key={rarity} className="flex justify-between items-center">
                      <span
                        className="font-semibold text-sm"
                        style={{ color: getRarityColor(rarity) }}
                      >
                        {rarity}
                      </span>
                      <span className="text-pocket-text-light text-sm">{rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: primos >= 100 ? 1.02 : 1 }}
                  whileTap={{ scale: primos >= 100 ? 0.98 : 1 }}
                  onClick={handleRoll}
                  disabled={primos < 100}
                  className="w-full pocket-btn-purple py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {primos >= 100 ? 'Roll!' : 'Not Enough Primos'}
                </motion.button>
                <button
                  onClick={() => setGameState('menu')}
                  className="w-full py-3 text-pocket-text-light font-semibold hover:text-pocket-text transition-colors"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Result Display */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                {/* Rarity Badge */}
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="mb-4"
                >
                  <span
                    className="inline-block px-4 py-2 rounded-full font-bold text-white text-lg"
                    style={{ backgroundColor: getRarityColor(rollResult.rarity) }}
                  >
                    {rollResult.rarity}!
                  </span>
                </motion.div>

                {/* Pokemon Display */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mb-4"
                >
                  {generatePokemonSprite(POKEMON[rollResult.pokemon]?.primaryType || 'Normal', rollResult.pokemon)}
                </motion.div>

                <h3 className="text-2xl font-bold text-pocket-text mb-2">{rollResult.pokemon}</h3>

                {POKEMON[rollResult.pokemon] && (
                  <div className="flex justify-center mb-4">
                    <TypeBadge type={POKEMON[rollResult.pokemon].primaryType} size={18} />
                  </div>
                )}

                {rollResult.isDuplicate && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-orange-50 border border-orange-200 rounded-xl p-3 mb-4"
                  >
                    <p className="text-orange-600 font-bold">Duplicate! 100 Primos refunded.</p>
                  </motion.div>
                )}

                {/* Actions */}
                <div className="space-y-3 mt-6">
                  <motion.button
                    whileHover={{ scale: primos >= 100 ? 1.02 : 1 }}
                    whileTap={{ scale: primos >= 100 ? 0.98 : 1 }}
                    onClick={() => {
                      setRollResult(null);
                      if (primos >= 100) {
                        handleRoll();
                      }
                    }}
                    disabled={primos < 100}
                    className="w-full pocket-btn-purple py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Roll Again
                  </motion.button>
                  <button
                    onClick={() => {
                      setRollResult(null);
                      setGameState('menu');
                    }}
                    className="w-full py-3 text-pocket-text-light font-semibold hover:text-pocket-text transition-colors"
                  >
                    Back to Menu
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default GachaScreen;
