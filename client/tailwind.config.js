/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        blueGeoBg: "url('@/assets/SteelBlueGeoBG_1920.png')",
      },
      colors: {
        // Primary
        "primary-1": "#466979",
        "primary-2": "#355166",
        "primary-3": "#283d4c",
        "primary-4": "#1e2e39",
        // Secondary
        "secondary-1": "#89a7b3",
        "secondary-2": "#6595a8",
        "secondary-3": "#527e90",
        // Tertiary
        "tertiary-1": "#668299",
        "tertiary-2": "#355166",
        // Plain light
        "plain-light-100": "#F9FAFB",
        "plain-light-200": "#eeeeee",
        "plain-light-300": "#dddddd",
        "plain-light-400": "#cccccc",
        "plain-light-500": "#bbbbbb",
        // Plain dark
        "plain-dark-100": "#585d65",
        "plain-dark-200": "#4D5464",
        "plain-dark-300": "#393e4a",
        "plain-dark-400": "#202936",
        "plain-dark-500": "#11171e",
        // Other
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
