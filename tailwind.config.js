/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'bench-press__image': "url('/assets/bench-press__image.jpeg')",
        'barbell-curl__image': "url('/assets/barbell-curl__image.jpeg')",
        'incline-bench-press__image': "url('/assets/incline-bench-press__image.jpeg')",
        'pull-ups__image': "url('/assets/pull-ups__image.jpeg')",
        'push-ups__image': "url('/assets/push-ups__image.jpeg')",
      }
    },
    fontFamily: {
      'varela-round': ['Varela Round'],
      'exo': ['Exo 2'],
      'gluten': ['Gluten'],
      'protest-strike': ['Protest Strike']
    }
  },
  plugins: [],
}

