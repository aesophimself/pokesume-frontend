/**
 * TournamentReplayScreen Component
 *
 * Battle replay viewer with playback controls:
 * - Tick-by-tick battle state display using same format as BattleScreen
 * - HP and energy tracking
 * - Playback controls (play/pause, restart, speed adjustment)
 * - Progress slider
 * - Matches visual style of career mode battles
 */

import React, { useState, useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { GAME_CONFIG, ICONS } from '../shared/gameData';
import { generatePokemonSprite } from '../utils/gameUtils';

const TournamentReplayScreen = () => {
  const { setGameState, selectedReplay, setSelectedReplay } = useGame();

  // Helper to safely parse battle_results (can be string or object from DB)
  const parseBattleResults = (battle_results) => {
    if (!battle_results) return null;
    if (typeof battle_results === 'object') return battle_results;
    try {
      return JSON.parse(battle_results);
    } catch (e) {
      console.error('Failed to parse battle_results:', e);
      return null;
    }
  };

  const battleResults = parseBattleResults(selectedReplay?.battle_results);

  const [replayTick, setReplayTick] = useState(0);
  const [replaySpeed, setReplaySpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedBattleIndex, setSelectedBattleIndex] = useState(0);

  // Handle both old single-battle format and new 3v3 format
  const is3v3Format = battleResults?.battles && Array.isArray(battleResults.battles);
  const currentBattle = is3v3Format
    ? battleResults.battles[selectedBattleIndex]
    : battleResults;

  const battleLog = currentBattle?.battleLog || [];
  const maxTicks = battleLog.length;
  const battleLogRef = useRef(null);

  // Auto-scroll battle log to bottom when new ticks appear
  useEffect(() => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
    }
  }, [replayTick]);

  useEffect(() => {
    if (!isPlaying || replayTick >= maxTicks - 1) return;

    const timer = setTimeout(() => {
      setReplayTick(prev => Math.min(prev + 1, maxTicks - 1));
    }, GAME_CONFIG.BATTLE.TICK_DURATION_MS / replaySpeed);

    return () => clearTimeout(timer);
  }, [replayTick, isPlaying, maxTicks, replaySpeed]);

  if (!battleResults || (!battleResults.battleLog && !is3v3Format)) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <p className="text-gray-600 mb-4">Battle data not available</p>
          <button
            onClick={() => {
              setSelectedReplay(null);
              setGameState('tournamentBracket');
            }}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
          >
            Back to Bracket
          </button>
        </div>
      </div>
    );
  }

  const currentState = battleLog[replayTick] || battleLog[0];
  const battleOver = replayTick >= maxTicks - 1;

  // Build display log up to current tick
  const displayLog = battleLog.slice(0, replayTick + 1)
    .filter(entry => entry.message)
    .map((entry, idx) => {
      const message = entry.message;
      let type = 'normal';

      if (message.includes('CRITICAL HIT')) type = 'crit';
      else if (message.includes('Victory!')) type = 'victory';
      else if (message.includes('defeated')) type = 'defeat';
      else if (message.includes('damage')) type = 'hit';
      else if (message.includes('missed')) type = 'miss';

      return {
        text: message,
        type,
        tick: idx
      };
    });

  const player1Pct = ((currentState.player1?.currentHp || 0) / (currentState.player1?.maxHp || 1)) * 100;
  const player2Pct = ((currentState.player2?.currentHp || 0) / (currentState.player2?.maxHp || 1)) * 100;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-purple-400">Tournament Replay</h2>
              {is3v3Format && (
                <div className="text-sm text-gray-300 mt-1">
                  Match Score: {battleResults.player1Wins} - {battleResults.player2Wins}
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setSelectedReplay(null);
                setGameState('tournamentBracket');
              }}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition"
            >
              Back to Bracket
            </button>
          </div>
        </div>

        {/* Battle selector for 3v3 matches */}
        {is3v3Format && (
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <div className="flex gap-2">
              {battleResults.battles.map((battle, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedBattleIndex(index);
                    setReplayTick(0);
                    setIsPlaying(true);
                  }}
                  className={`px-4 py-2 rounded-lg font-bold transition ${
                    selectedBattleIndex === index
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-600 text-white hover:bg-gray-500'
                  }`}
                >
                  Battle {index + 1} {battle.winner === 1 ? '✓' : '✗'}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Battle Display - Matching BattleScreen style */}
        <div className="bg-gray-700 rounded-lg p-2 sm:p-4 mb-3 sm:mb-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-4 sm:p-6">
            {/* Player 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 sm:p-4">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                  {generatePokemonSprite('Fire', currentState.player1?.name || 'P1')}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{currentState.player1?.name || 'Player 1'}</h3>
                </div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>HP</span>
                  <span>{currentState.player1?.currentHp || 0}/{currentState.player1?.maxHp || 0}</span>
                </div>
                <div className="w-full bg-gray-600 rounded h-3">
                  <div className="bg-green-500 h-3 rounded transition-all" style={{ width: `${player1Pct}%` }} />
                </div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Stamina</span>
                  <span>{currentState.player1?.energy || 0}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded h-2">
                  <div className="bg-yellow-500 h-2 rounded transition-all" style={{ width: `${currentState.player1?.energy || 0}%` }} />
                </div>
              </div>
            </div>

            {/* Player 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 sm:p-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-white text-right">{currentState.player2?.name || 'Player 2'}</h3>
                </div>
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                  {generatePokemonSprite('Water', currentState.player2?.name || 'P2')}
                </div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>HP</span>
                  <span>{currentState.player2?.currentHp || 0}/{currentState.player2?.maxHp || 0}</span>
                </div>
                <div className="w-full bg-gray-600 rounded h-3">
                  <div className="bg-red-500 h-3 rounded transition-all" style={{ width: `${player2Pct}%` }} />
                </div>
              </div>
              <div className="bg-gray-800 rounded p-2">
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>Stamina</span>
                  <span>{currentState.player2?.energy || 0}/100</span>
                </div>
                <div className="w-full bg-gray-600 rounded h-2">
                  <div className="bg-yellow-500 h-2 rounded transition-all" style={{ width: `${currentState.player2?.energy || 0}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Tick counter and speed controls */}
          <div className="text-center text-white mt-4 py-2 bg-gray-800 rounded flex items-center justify-center gap-4">
            <div>
              <Clock className="inline mr-2" size={16} />
              <span className="text-lg font-bold">Tick: {replayTick + 1}/{maxTicks}</span>
              {battleOver && <span className="ml-4 text-yellow-400">Replay Complete!</span>}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setReplaySpeed(1)}
                className={`px-3 py-1 rounded font-bold text-sm transition ${
                  replaySpeed === 1 ? 'bg-green-500 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
              >
                1x
              </button>
              <button
                onClick={() => setReplaySpeed(2)}
                className={`px-3 py-1 rounded font-bold text-sm transition ${
                  replaySpeed === 2 ? 'bg-yellow-500 text-black' : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
              >
                2x
              </button>
              <button
                onClick={() => setReplaySpeed(4)}
                className={`px-3 py-1 rounded font-bold text-sm transition ${
                  replaySpeed === 4 ? 'bg-red-500 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'
                }`}
              >
                4x
              </button>
            </div>
          </div>
        </div>

        {/* Battle Log - Matching BattleScreen style */}
        <div ref={battleLogRef} className="bg-white rounded-lg p-2 sm:p-4 shadow-lg" style={{ height: '400px', overflowY: 'auto' }}>
          <h3 className="text-lg font-bold mb-3 sticky top-0 bg-white pb-2">Battle Log</h3>
          <div className="space-y-1">
            {displayLog.map((entry, idx) => (
              <div
                key={idx}
                className={`py-1 border-b border-gray-100 ${
                  entry.type === 'crit' ? 'text-xl sm:text-2xl font-black text-red-600' :
                  entry.type === 'hit' ? 'text-base font-mono text-red-600 font-bold' :
                  entry.type === 'miss' ? 'text-base font-mono text-blue-600 font-bold' :
                  entry.type === 'victory' ? 'text-base font-mono text-green-600 font-bold' :
                  entry.type === 'defeat' ? 'text-base font-mono text-orange-600 font-bold' :
                  'text-base font-mono text-gray-700'
                }`}
              >
                {entry.text}
              </div>
            ))}
          </div>
        </div>

        {/* Replay Controls */}
        <div className="bg-gray-700 rounded-lg p-4 mt-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={() => {
                setReplayTick(0);
                setIsPlaying(false);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-500 transition"
            >
              ⏮ Restart
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-8 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition text-lg"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              onClick={() => {
                setReplayTick(maxTicks - 1);
                setIsPlaying(false);
              }}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-500 transition"
            >
              ⏭ End
            </button>
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Progress: {Math.round(((replayTick + 1) / maxTicks) * 100)}%</span>
              <span>Tick {replayTick + 1} / {maxTicks}</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.max(0, maxTicks - 1)}
              value={replayTick}
              onChange={(e) => {
                setReplayTick(parseInt(e.target.value));
                setIsPlaying(false);
              }}
              className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #9333ea ${((replayTick + 1) / maxTicks) * 100}%, #4b5563 ${((replayTick + 1) / maxTicks) * 100}%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentReplayScreen;
