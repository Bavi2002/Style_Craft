/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lora: ["Lora", "serif"],
      },
      colors: {
        primary: '#EEEEEE', 
        secondary: '#124076', 
        highlight: '#124076', 
      },
    },
  },
  plugins: [],
};
