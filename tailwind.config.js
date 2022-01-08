module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeInBottom: {
          '0%': { opacity: '0', transform: 'translateY(10%)' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        fadeInBottom: 'fadeInBottom .3s ease-in-out',
      }
    },
  },
  plugins: [],
}