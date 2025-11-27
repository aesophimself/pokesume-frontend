module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Pokemon TCG Pocket Style Colors
        'pocket-bg': '#E8F4FC',
        'pocket-bg-alt': '#D4E9F7',
        'pocket-card': '#FFFFFF',
        'pocket-blue': '#4A9FD4',
        'pocket-blue-dark': '#3182A8',
        'pocket-yellow': '#FFD93D',
        'pocket-yellow-dark': '#E6B800',
        'pocket-red': '#E85D5D',
        'pocket-green': '#5DBE8A',
        'pocket-purple': '#9B7ED9',
        'pocket-orange': '#F5A623',
        'pocket-gray': '#8E9AAF',
        'pocket-text': '#2D3748',
        'pocket-text-light': '#718096',

        // Pokemon Brand Colors
        'poke-red': '#E3350D',
        'poke-blue': '#3B4CCA',
        'poke-yellow': '#FFCB05',
        'poke-gold': '#B3A125',

        // Type Colors (for app icons)
        'type-fire': '#F08030',
        'type-water': '#6890F0',
        'type-grass': '#78C850',
        'type-electric': '#F8D030',
        'type-psychic': '#F85888',
        'type-fighting': '#C03028',
        'type-normal': '#A8A878',
        'type-poison': '#A040A0',
        'type-ground': '#E0C068',
        'type-flying': '#A890F0',
        'type-bug': '#A8B820',
        'type-rock': '#B8A038',
        'type-ghost': '#705898',
        'type-dragon': '#7038F8',
        'type-dark': '#705848',
        'type-steel': '#B8B8D0',
        'type-fairy': '#EE99AC',
        'type-ice': '#98D8D8',
      },
      fontFamily: {
        'pokemon': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        // Neumorphic shadows for Pokemon Pocket style
        'neu': '6px 6px 12px rgba(163, 177, 198, 0.5), -6px -6px 12px rgba(255, 255, 255, 0.9)',
        'neu-sm': '3px 3px 6px rgba(163, 177, 198, 0.4), -3px -3px 6px rgba(255, 255, 255, 0.8)',
        'neu-pressed': 'inset 4px 4px 8px rgba(163, 177, 198, 0.5), inset -4px -4px 8px rgba(255, 255, 255, 0.9)',
        'neu-card': '0 8px 32px rgba(74, 159, 212, 0.15), 0 2px 8px rgba(0, 0, 0, 0.05)',
        'neu-button': '0 4px 14px rgba(74, 159, 212, 0.25), 0 2px 4px rgba(0, 0, 0, 0.08)',
        'neu-button-hover': '0 6px 20px rgba(74, 159, 212, 0.35), 0 3px 6px rgba(0, 0, 0, 0.1)',
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 4px 25px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'bounce-soft': 'bounceSoft 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        bounceSoft: {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
