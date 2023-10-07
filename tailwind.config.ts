/** @type {import('tailwindcss').Config} */
// @ts-ignore
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-100": "#2B2C35",
        "primary-blue": {
          DEFAULT: "#2B59FF",
          100: "#F5F8FF",
        },
      },
      backgroundImage: {
        'hero': "url('/hero.jpg')"
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
