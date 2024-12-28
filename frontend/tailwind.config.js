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
        primary: "#EEEEEE",
        secondary: "#124076",
        highlight: "#F5F5F5",
        lightblue: "#A6D1E6",
        grey:"#4335A7",
      },
    },
  },
  plugins: [],
};
