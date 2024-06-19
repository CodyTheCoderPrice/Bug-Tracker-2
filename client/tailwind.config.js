/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        blueGeoBg: "url('@/assets/SteelBlueGeoBG_1920.png')",
      },
      colors: {
        "primary-1": "#466979",
        "primary-2": "#355166",
        "primary-3": "#283d4c",
        "secondary-1": "#89a7b3",
        "secondary-2": "#6595a8",
        "secondary-3": "#527e90",
        "tertiary-1": "#668299",
        "tertiary-2": "#355166",
        "plain-100": "#F9FAFB",
        "plain-200": "#eeeeee",
        "plain-300": "#dddddd",
        "plain-400": "#cccccc",
        "plain-500": "#bbbbbb",
        "error-red": "#f02849",
      },
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    transitionProperty: {
      width: "width",
    },
  },
  plugins: [],
  darkMode: "class",
};
