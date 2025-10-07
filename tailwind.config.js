/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
      },
      colors: {
        neon: {
          cyan: '#00ffff',
          purple: '#bf00ff',
          pink: '#ff00ff',
          blue: '#0080ff',
          green: '#00ff80',
        },
      },
    },
  },
  plugins: [],
}

