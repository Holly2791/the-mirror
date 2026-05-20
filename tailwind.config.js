/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C9962B',
        'gold-light': '#E8C87A',
        'gold-pale': '#F5EDD8',
        dark: '#181410',
        'dark-mid': '#2C2318',
        mid: '#4A3F32',
        'warm-white': '#FAF7F2',
        'warm-grey': '#F0EAE0',
        low: '#C0392B',
        medium: '#E8956D',
        high: '#27AE60',
      },
      fontFamily: {
        serif: ['"Cormorant Garant"', '"EB Garamond"', 'Georgia', 'serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
