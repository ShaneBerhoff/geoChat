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
      },
      fontFamily: {
        'mono': ['Courier New', 'Courier', 'monospace'],
      }
    },
  },
  plugins: [
    require('tailwindcss-themer')({
      themes: [
        {
          name: 'phosphor-P1',
          extend: {
            colors: {
              'primary': '#33FF33',
              'primary-dark': '#0a330a',
              'primary-darker': '#051905'
            }
          }
        },
        {
          name: 'phosphor-P3',
          extend: {
            colors: {
              'primary': '#FFB000',
              'primary-dark': '#332300',
              'primary-darker': '#191200'
            }
          }
        }
      ]
    })
  ],
};