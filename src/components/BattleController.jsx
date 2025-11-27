/**
 * BattleController Component
 *
 * Replays server-simulated battles tick-by-tick
 * Reads battleLog from server and updates battleState for display
 */

import { useEffect } from 'react';
import { useGame } from '../contexts/GameContext';

const BattleController = () => {
  const { battleState, setBattleState, battleSpeed } = useGame();

  useEffect(() => {
    if (!battleState || !battleState.serverResult || !battleState.log || battleState.log.length === 0) {
      return;
    }

    // Don't replay if battle is already complete
    if (battleState.tick >= battleState.log.length) {
      return;
    }

    // Calculate tick duration based on speed (1x = 1000ms, 2x = 500ms, 4x = 250ms)
    const tickDuration = 1000 / battleSpeed;

    const interval = setInterval(() => {
      setBattleState(prev => {
        if (!prev || prev.tick >= prev.log.length - 1) {
          clearInterval(interval);
          return prev;
        }

        const nextTick = prev.tick + 1;
        const logEntry = prev.log[nextTick];

        if (!logEntry) {
          clearInterval(interval);
          return prev;
        }

        // Update battle state with data from log entry
        return {
          ...prev,
          tick: nextTick,
          player: {
            ...prev.player,
            currentHP: logEntry.player1.currentHp,
            currentStamina: logEntry.player1.energy,
            statusEffects: logEntry.player1.statusEffects || []
          },
          opponent: {
            ...prev.opponent,
            currentHP: logEntry.player2.currentHp,
            currentStamina: logEntry.player2.energy,
            statusEffects: logEntry.player2.statusEffects || []
          },
          // Convert message to log format expected by BattleScreen
          log: prev.log.map((entry, idx) => {
            if (idx > nextTick) return entry; // Don't process future entries

            const message = entry.message || '';
            let type = 'normal';

            if (message.includes('CRITICAL HIT')) type = 'crit';
            else if (message.includes('Victory!')) type = 'victory';
            else if (message.includes('defeated')) type = message.includes(prev.player.name) ? 'defeat' : 'victory';
            else if (message.includes('damage')) type = 'hit';
            else if (message.includes('missed')) type = 'miss';

            return {
              ...entry,
              text: message,
              type: type
            };
          })
        };
      });
    }, tickDuration);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [battleState?.tick, battleSpeed]);

  return null; // This component doesn't render anything
};

export default BattleController;
