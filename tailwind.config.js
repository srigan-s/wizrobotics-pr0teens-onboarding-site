/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: {
          400: '#F4C430',
          500: '#E4B020',
          600: '#D4A017',
          700: '#C4900F',
        },
      },
    },
  },
  plugins: [],
};
