/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-range': { 'min': '350px', 'max': '600px' },
      },
    },
  },
  plugins: [],
}

