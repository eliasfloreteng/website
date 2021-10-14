const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
        serif: ['"Merriweather"', ...defaultTheme.fontFamily.serif]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
