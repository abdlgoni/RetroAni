/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0D0D2B',
        primary: '#FF2D78',
        accent: '#FFE600',
        surface: '#161630',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'pixel-glow': '0 0 10px #FFE600, 0 0 20px #FFE600, 0 0 30px #FFE600',
      },
      borderWidth: {
        'pixel': '3px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite linear',
      },

    },
  },
  plugins: [],
};
