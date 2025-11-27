/**
 * MenuScreen Component
 *
 * Main menu redesigned with Pokemon TCG Pocket style UI.
 * Features neumorphic/soft UI elements, bright colors,
 * and Pokemon-style sprite icons from PokéSprite.
 */

import React from 'react';
import {
  Sparkles,
  LogOut,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { useInventory } from '../contexts/InventoryContext';
import { generatePokemonSprite, getTypeColor } from '../utils/gameUtils';
import { POKEMON } from '../shared/gameData';

// SVGRepo base for flat vector Pokemon icons
const SVGREPO_BASE = 'https://www.svgrepo.com/show';

// Flat, vector Pokemon-themed icons from SVGRepo
const MENU_ICONS = {
  // New Career - Pokemon Go icon (adventure/journey)
  career: `${SVGREPO_BASE}/504755/pokemon-go.svg`,
  // My Pokemon - Pokeball (collection)
  pokemon: `${SVGREPO_BASE}/276264/pokeball-pokemon.svg`,
  // Supports - Pokemon trainer silhouette
  supports: `${SVGREPO_BASE}/276268/pokemon-go-pokemon.svg`,
  // Hall of Fame - Trophy/medal
  hallOfFame: `${SVGREPO_BASE}/513338/trophy.svg`,
  // Tournaments - Championship/versus
  tournaments: `${SVGREPO_BASE}/513124/podium.svg`,
  // Pokemon Gacha - Pokeball catch
  pokemonGacha: `${SVGREPO_BASE}/420929/pokeball-pokemon-catch.svg`,
  // Support Gacha - Pokemon home (gift/storage)
  supportGacha: `${SVGREPO_BASE}/518752/pokemon-home.svg`,
};

// Menu tile component with Pokemon sprite icon
const MenuTile = ({ iconSrc, label, color, onClick, badge, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      pocket-tile relative w-full flex-col py-4 px-2
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
  >
    {/* Icon container with Pokemon sprite */}
    <div
      className="w-12 h-12 rounded-lg flex items-center justify-center mb-1.5"
      style={{ backgroundColor: `${color}15` }}
    >
      <img
        src={iconSrc}
        alt={label}
        className="w-8 h-8 object-contain"
      />
    </div>

    {/* Label */}
    <span className="text-pocket-text font-medium text-xs text-center leading-tight">{label}</span>

    {/* Badge */}
    {badge !== undefined && badge > 0 && (
      <div className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
        {badge > 99 ? '99+' : badge}
      </div>
    )}
  </button>
);

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

  // Starter selection (if user has no pokemon)
  if (pokemonInventory.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pocket-bg to-pocket-bg-alt p-4 flex flex-col">
        {/* Header */}
        <div className="pocket-card mb-6">
          <h1 className="text-2xl font-bold text-pocket-text text-center mb-2">
            Choose Your Starter!
          </h1>
          <p className="text-pocket-text-light text-center text-sm">
            Select your first Pokemon partner
          </p>
        </div>

        {/* Starter Grid */}
        <div className="grid grid-cols-3 gap-3 flex-1">
          {['Charmander', 'Squirtle', 'Bulbasaur'].map(starter => {
            const pokemon = POKEMON[starter];
            const typeColor = getTypeColor(pokemon.primaryType);
            return (
              <button
                key={starter}
                onClick={async () => {
                  const result = await addPokemon(starter, pokemon);
                  if (result) {
                    await loadPokemonInventory();
                  } else {
                    alert('Failed to add starter Pokemon. Please try again.');
                  }
                }}
                className="pocket-card flex flex-col items-center justify-center py-6 hover:scale-102 transition-transform"
                style={{ borderLeft: `4px solid ${typeColor}` }}
              >
                <div className="transform hover:scale-110 transition-transform mb-3">
                  {generatePokemonSprite(pokemon.primaryType, starter)}
                </div>
                <h3 className="text-pocket-text font-bold text-base mb-1">{starter}</h3>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
                >
                  {pokemon.primaryType}
                </span>
              </button>
            );
          })}
        </div>

        {/* Version */}
        <p className="text-center text-pocket-text-light text-xs mt-4">v4.0.0</p>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-b from-pocket-bg to-pocket-bg-alt">
      {/* Header Bar */}
      <div className="pocket-header sticky top-0 z-10">
        {/* Currency */}
        <div className="pocket-currency">
          <Sparkles size={16} className="text-yellow-500" />
          <span>{primos.toLocaleString()}</span>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-pocket-text font-semibold text-sm">{user.username}</p>
            <p className="text-pocket-text-light text-xs">
              Rating: {user.rating || 1000}
            </p>
          </div>
          <button
            onClick={logout}
            className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
            title="Logout"
          >
            <LogOut size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 pb-8">
        {/* Title Card */}
        <div className="pocket-card text-center mb-4 py-3">
          <h1 className="text-xl font-bold text-pocket-blue mb-1">
            Pokesume Pretty Duel
          </h1>
          <p className="text-pocket-text-light text-xs leading-relaxed">
            Pick a buddy and prove to the world you're the very best there ever was!
          </p>
        </div>

        {/* Main Menu Grid - 2 columns */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <MenuTile
            iconSrc={MENU_ICONS.career}
            label="New Career"
            color="#9B7ED9"
            onClick={() => setGameState('pokemonSelect')}
            disabled={pokemonInventory.length === 0}
          />
          <MenuTile
            iconSrc={MENU_ICONS.pokemon}
            label="My Pokemon"
            color="#5DBE8A"
            onClick={() => setGameState('pokemonInventory')}
            badge={pokemonInventory.length}
          />
          <MenuTile
            iconSrc={MENU_ICONS.supports}
            label="Supports"
            color="#4A9FD4"
            onClick={() => setGameState('supportInventory')}
            badge={supportInventory.length}
          />
          <MenuTile
            iconSrc={MENU_ICONS.hallOfFame}
            label="Hall of Fame"
            color="#F5A623"
            onClick={() => setGameState('trainedPokemon')}
            badge={trainedPokemon.length}
          />
          <MenuTile
            iconSrc={MENU_ICONS.tournaments}
            label="Tournaments"
            color="#E85D5D"
            onClick={() => setGameState('tournaments')}
          />
          <MenuTile
            iconSrc={MENU_ICONS.pokemonGacha}
            label="Pokemon Gacha"
            color="#9B7ED9"
            onClick={() => setGameState('gacha')}
          />
          <MenuTile
            iconSrc={MENU_ICONS.supportGacha}
            label="Support Gacha"
            color="#4A9FD4"
            onClick={() => setGameState('supportGacha')}
          />
        </div>

        {/* Gacha cost hint */}
        <p className="text-center text-pocket-text-light text-xs mb-4">
          Gacha costs 100 Primos per roll
        </p>

        {/* Danger Zone */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowResetConfirm(true);
          }}
          className="w-full flex items-center justify-center gap-1.5 py-2 text-red-400 hover:text-red-500 text-xs transition-colors"
        >
          <AlertTriangle size={14} />
          <span>Reset All Data</span>
        </button>

        {/* Version */}
        <p className="text-center text-pocket-text-light text-xs mt-2">v4.0.0</p>
      </div>
    </div>
  );
};

export default MenuScreen;
