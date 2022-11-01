/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Roboto", "sans-serif", ...defaultTheme.fontFamily.sans],
        regular: ["Inter", "sans-serif", ...defaultTheme.fontFamily.sans],
      },

      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        bgColor: {
          light: "#F7F7F8",
          DEFAULT: "#F0F0F0",
        },
        primary: {
          DEFAULT: "#7D8CC4",
          dark: "#7283C0",
        },
        secondary: "#F9A620",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
