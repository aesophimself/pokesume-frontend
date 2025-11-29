const gameData = require('./src/shared/gameData.js');
const POKEMON = gameData.POKEMON;
const EVOLUTION_CHAINS = gameData.EVOLUTION_CHAINS;

// Get all Pokemon names
const pokemonNames = Object.keys(POKEMON);
console.log('Total Pokemon:', pokemonNames.length);

// Simulate getPokemonRarity function
const legendary = ['Moltres', 'Articuno', 'Celebi', 'Raikou', 'Gengar', 'Entei', 'Suicune',
                   'Mew', 'Mewtwo', 'Snorlax', 'Lapras', 'Aerodactyl', 'Ditto'];

function getPokemonRarity(pokemonName) {
  if (legendary.includes(pokemonName)) return 'Legendary';

  const evolutionData = Object.entries(EVOLUTION_CHAINS).find(([base, data]) => {
    return base === pokemonName || data.stage1 === pokemonName || data.stage2 === pokemonName;
  });

  if (!evolutionData) return 'Common';

  const [, chainData] = evolutionData;

  if (chainData.stages === 2 && chainData.stage2 === pokemonName) return 'Rare';
  if (chainData.stages === 1 && chainData.stage1 === pokemonName) return 'Uncommon';

  return 'Common';
}

// Check rarity for all Pokemon
const rarities = {};
pokemonNames.forEach(name => {
  const rarity = getPokemonRarity(name);
  if (!rarities[rarity]) rarities[rarity] = [];
  rarities[rarity].push(name);
});

console.log('\n--- RARITY BREAKDOWN ---');
Object.entries(rarities).forEach(([rarity, names]) => {
  console.log(`\n${rarity} (${names.length}):`);
  console.log(names.join(', '));
});
