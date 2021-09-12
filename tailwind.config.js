// const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['index.html','./src/**/*.{js,jsx,ts,tsx,vue,html}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: `#FF7979`,
        green: {
          DEFAULT:`#38CC8B`,
          light: `#77E2B3`,
        },
        blue: {
          DEFAULT: `#5E54A4`,
          dark: `#3D3B48`
        }
      },
      boxShadow: {
        DEFAULT: `0px 8px 0px 0px  #00000025`,
        solid: "inset 0px -4px 0px rgba(0, 0, 0, 0.0908818)",
      }
    },
  },
  plugins: [],
}