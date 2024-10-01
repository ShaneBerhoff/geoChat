const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

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
        'P1-main': '#33FF33', //phosphor P1
        'P3-main': '#FFB000', //phosphor P3
        'background': '#282828',
        'background-P1-dark': '#001100',
        'background-P1-light': '#002200',
        'background-P3-dark': '#1A0F00',
        'background-P3-light': '#2A1B00'
      },
      fontFamily: {
        'mono': ['Courier New', 'Courier', 'monospace'],
      }
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}