/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        babyPowder: "#FFFFFD",
        grape: "#6B0097",
        thistle: "#D0BADB",
        sunset: "#F4910F",
        memosa: "#C3740C",
      },
    },
  },
  plugins: [],
};
