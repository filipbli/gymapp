/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'bench-press__image': "url('/assets/aibenchpress.jpeg')",
        'barbell-curl__image': "url('/assets/aibarbellcurl.jpeg')"
      }
    },
  },
  plugins: [],
}

