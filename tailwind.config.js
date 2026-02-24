/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#FDFCFA',
          100: '#F8F6F3',
          200: '#F0EDE8',
          300: '#E5E1DA',
          400: '#D4CFC6',
        },
        charcoal: {
          900: '#1A1A1A',
          800: '#2D2D2D',
          700: '#3D3D3D',
          600: '#525252',
        },
        gold: {
          muted: '#B8A88A',
          light: '#C9BD9F',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        wider: '0.1em',
      },
    },
  },
  plugins: [],
};