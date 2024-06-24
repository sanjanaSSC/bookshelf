/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: '#fdfdef',
        pink:'#1f0318'
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.4)',
        inner: 'inset 0 4px 4px 0 rgba(0, 0, 0, 0.4)',


      },
      
    },
  },
  plugins: [],
}

