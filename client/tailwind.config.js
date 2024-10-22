import tailwindcssThemer from 'tailwindcss-themer';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'background': '#282828'
      }
    },
  },
  plugins: [
    tailwindcssThemer({
      themes: [
        {
          name: 'phosphor-P1',
          extend: {
            colors: {
              'primary': '#33FF33',
              'primary-dark': '#1f991f',
              'primary-darker': '#051905'
            }
          }
        },
        {
          name: 'phosphor-P3',
          extend: {
            colors: {
              'primary': '#FFB000',
              'primary-dark': '#996a00',
              'primary-darker': '#191200'
            }
          }
        }
      ]
    }),
    scrollbarHide
  ],
};