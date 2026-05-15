/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#050a15',
          panel: '#0d1627',
          border: '#1f305c',
          blue: '#00f0ff',
          purple: '#b026ff',
          red: '#ff003c',
          green: '#00ff66',
          text: '#e0f4ff',
          muted: '#6a84b5'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 240, 255, 0.4)',
        'neon-purple': '0 0 20px rgba(176, 38, 255, 0.4)',
        'neon-red': '0 0 20px rgba(255, 0, 60, 0.4)',
        'neon-green': '0 0 20px rgba(0, 255, 102, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, filter: 'brightness(1.2)' },
          '50%': { opacity: .7, filter: 'brightness(0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
