/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sf: "'SF Pro Display', sans-serif",
        monst: "'Montserrat', serif",
      },
      colors: {
        primary: "#1C5B41",
        secondary: "#FE9614",
        "light-blue": "#F5F6FA",
        text: "#000000cc",
        dark: "#333333",
        gray: "#596067",
        light: "#FFFAF0",
        "gray-light": "#EBEBEB",
        red: "#FF6563",
      },
    },
  },
  plugins: [],
};
