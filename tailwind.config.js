const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./app/vue/index.html",
    "./app/vue/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.red,
        secondary: colors.orange
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}