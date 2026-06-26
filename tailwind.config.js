/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dota: {
          bg: '#0f1115',
          card: '#1a1f2e',
          border: '#2a3344',
          gold: '#c89b3c',
          'gold-light': '#e8c87a',
          radiant: '#66bb6a',
          'radiant-dark': '#2e7d32',
          dire: '#ef5350',
          'dire-dark': '#b71c1c',
          text: '#e8d8b0',
          muted: '#8a9bb5',
          str: '#e05c3a',
          agi: '#5dce5a',
          int: '#5b9bd5',
          uni: '#c882d4',
        }
      },
      fontFamily: {
        dota: ['Cinzel', 'serif'],
      }
    }
  },
  plugins: []
}
