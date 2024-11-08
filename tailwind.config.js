/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        tokyo: {
          dark: '#1a1f35',
          base: '#242b45',
          accent: '#42dcff',
          neon: '#4220ff',
          light: '#2d365c',
          panel: 'rgba(45, 54, 92, 0.8)',
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #242b45 0%, #1a1f35 100%)',
        'neon-gradient': 'linear-gradient(135deg, #42dcff 0%, #4220ff 100%)',
      },
    },
  },
  plugins: [],
};