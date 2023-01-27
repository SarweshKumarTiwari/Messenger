/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        pinki:{
          400:"rgb(240, 53, 131)",
          500:"rgb(206, 50, 115)",
          600:"rgb(175, 39, 96)",
        }
      }
    },
  },
  plugins: [],
}