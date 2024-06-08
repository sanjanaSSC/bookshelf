/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sandybrown: '#cbc0ae',
        pink:'#1f0318'
      },
    },
  },
  plugins: [],
}

