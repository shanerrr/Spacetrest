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
        },
        loader: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { opacity: '50%' },
          '100%': { transform: 'rotate(359deg);' }
        }
      },
      animation: {
        fadeInBottom: 'fadeInBottom .3s ease-in-out',
        loader: 'loader 1.5s linear infinite'
      }
    },
  },
  plugins: [],
}