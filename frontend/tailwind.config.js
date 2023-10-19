/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fffaf5",
        black: "#1c1917",
        light: "#ffe4cc",
        lighter: "#d1ccc7",
        orange: "#ffe4cc",
        input: "#f8f2ed",
      },
    },
  },
  plugins: [],
};
