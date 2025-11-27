/**
 * GameOverScreen Component
 *
 * Displayed when the player is defeated by a gym leader.
 * Shows final Pokemon stats, grade, aptitudes, and earned inspirations.
 */

import React from 'react';
import { useGame } from '../contexts/GameContext';
import { useInventory } from '../contexts/InventoryContext';
import {
  generatePokemonSprite,
  getGradeColor,
  getPokemonGrade,
  StatIcon
} from '../utils/gameUtils';
import { TypeBadge } from '../components/TypeIcon';

/**
 * Generate inspirations based on final Pokemon stats and aptitudes
 */
const generateInspirations = (stats, aptitudes) => {
  // Find the highest stat for stat inspiration
  const statEntries = Object.entries(stats);
  const highestStat = statEntries.reduce((best, [name, value]) => {
    return value > best.value ? { name, value } : best;
  }, { name: statEntries[0][0], value: statEntries[0][1] });

  // Calculate stars based on stat value
  const statStars = highestStat.value >= 400 ? 3 : highestStat.value >= 250 ? 2 : 1;

  // Find best aptitude for aptitude inspiration
  const aptitudeOrder = ['F', 'E', 'D', 'C', 'B', 'A', 'S'];
  const aptitudeEntries = Object.entries(aptitudes || {});
  const bestAptitude = aptitudeEntries.reduce((best, [color, grade]) => {
    const currentIdx = aptitudeOrder.indexOf(grade);
    const bestIdx = aptitudeOrder.indexOf(best.grade);
    return currentIdx > bestIdx ? { color, grade } : best;
  }, { color: aptitudeEntries[0]?.[0] || 'Red', grade: aptitudeEntries[0]?.[1] || 'D' });

  // Calculate stars based on aptitude grade
  const aptitudeStars = ['S', 'A'].includes(bestAptitude.grade) ? 3 :
                        ['B', 'C'].includes(bestAptitude.grade) ? 2 : 1;

  const colorToType = {
    'Red': 'Fire',
    'Blue': 'Water',
    'Green': 'Grass',
    'Purple': 'Psychic',
    'Yellow': 'Electric',
    'Orange': 'Fighting'
  };

  return {
    stat: {
      name: highestStat.name,
      value: highestStat.value,
      stars: statStars
    },
    aptitude: {
      name: colorToType[bestAptitude.color] || bestAptitude.color,
      color: bestAptitude.color,
      grade: bestAptitude.grade,
      stars: aptitudeStars
    }
  };
};

const GameOverScreen = () => {
  const { setGameState, setSelectedPokemon, setSelectedSupports, completedCareerData, setCompletedCareerData } = useGame();
  const { loadTrainedPokemon } = useInventory();

  const typeMap = { Red: 'Fire', Blue: 'Water', Green: 'Grass', Yellow: 'Electric', Purple: 'Psychic', Orange: 'Fighting' };

  // Use inspirations from completedCareerData (generated in BattleScreen before career completion)
  // Fall back to generating locally if not available
  const inspirations = completedCareerData?.inspirations ||
    (completedCareerData?.currentStats && completedCareerData?.pokemon?.typeAptitudes
      ? generateInspirations(completedCareerData.currentStats, completedCareerData.pokemon.typeAptitudes)
      : null);

  // If no career data, show loading or error state
  if (!completedCareerData) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg p-6 sm:p-8 max-w-2xl w-full shadow-2xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-red-600">Career Complete</h1>
          <p className="text-gray-600 mb-6">Loading career results...</p>
          <button
            onClick={() => {
              setGameState('menu');
              setSelectedPokemon(null);
              setSelectedSupports([]);
              loadTrainedPokemon();
            }}
            className="bg-purple-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-purple-700 transition"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  const pokemonName = completedCareerData.pokemon?.name || 'Unknown';
  const pokemonType = completedCareerData.pokemon?.primaryType || 'Normal';
  const finalStats = completedCareerData.currentStats || {};
  const aptitudes = completedCareerData.pokemon?.typeAptitudes || {};
  const grade = getPokemonGrade(finalStats);
  const finalTurn = completedCareerData.turn || 0;
  const gymsDefeated = completedCareerData.currentGymIndex || 0;

  return (
    <div className="w-full h-screen bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 sm:p-8 max-w-2xl w-full shadow-2xl my-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-red-600 text-center">Career Complete</h1>
        <p className="text-gray-600 mb-1 text-center">Defeated by gym leader</p>
        <p className="text-gray-500 text-sm mb-4 text-center">
          Turn {finalTurn} | Gyms Defeated: {gymsDefeated}/5
        </p>

        {/* Pokemon Display */}
        <div className="bg-gradient-to-br from-gray-50 to-red-50 rounded-lg p-4 mb-4">
          <div className="flex justify-center mb-2">
            {generatePokemonSprite(pokemonType, pokemonName)}
          </div>
          <h2 className="text-2xl font-bold text-center mb-1">{pokemonName}</h2>
          <div className="flex justify-center mb-2">
            <TypeBadge type={pokemonType} size={16} />
          </div>
          <div className="text-center mb-3">
            <span className="px-3 py-1 rounded text-sm font-bold text-white" style={{ backgroundColor: getGradeColor(grade) }}>
              Grade: {grade}
            </span>
          </div>

          {/* Final Stats */}
          <div className="mb-4">
            <h3 className="font-bold mb-2 text-center">Final Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-sm">
              {Object.entries(finalStats).map(([stat, value]) => (
                <div key={stat} className="flex items-center gap-1 justify-center">
                  <StatIcon stat={stat} size={14} />
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Aptitudes */}
          {Object.keys(aptitudes).length > 0 && (
            <div className="mb-4">
              <h3 className="font-bold mb-2 text-center text-sm">Attack Aptitudes</h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {Object.entries(aptitudes).map(([aptitude, aptGrade]) => (
                  <div key={aptitude} className="text-center">
                    <div className="font-semibold">{typeMap[aptitude] || aptitude}</div>
                    <span className="px-2 py-1 rounded text-xs font-bold text-white" style={{ backgroundColor: getGradeColor(aptGrade) }}>
                      {aptGrade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Inspirations */}
        {inspirations && (
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <h3 className="font-bold mb-3 text-center text-purple-800">Inspirations Earned</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Stat Inspiration */}
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <div className="text-xs font-semibold text-purple-600 mb-1">STAT INSPIRATION</div>
                <div className="font-bold text-lg mb-1">{inspirations.stat.name}</div>
                <div className="text-sm text-gray-600 mb-2">Value: {inspirations.stat.value}</div>
                <div className="flex gap-1">
                  {[...Array(inspirations.stat.stars)].map((_, i) => (
                    <span key={i} className="text-xl text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              {/* Aptitude Inspiration */}
              <div className="bg-white rounded-lg p-3 border-2 border-purple-200">
                <div className="text-xs font-semibold text-purple-600 mb-1">APTITUDE INSPIRATION</div>
                <div className="font-bold text-lg mb-1">{inspirations.aptitude.name}</div>
                <div className="text-sm text-gray-600 mb-2">Grade: {inspirations.aptitude.grade}</div>
                <div className="flex gap-1">
                  {[...Array(inspirations.aptitude.stars)].map((_, i) => (
                    <span key={i} className="text-xl text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            setGameState('menu');
            setSelectedPokemon(null);
            setSelectedSupports([]);
            setCompletedCareerData(null);
            // Refresh trained Pokemon to show the newly completed one
            loadTrainedPokemon();
          }}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition"
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;
