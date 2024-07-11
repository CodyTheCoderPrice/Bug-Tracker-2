/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "unprotected-geo": "url('@/assets/bgs/SteelBlueGeoBG_1920.png')",
        "protected-geo": "url('@/assets/bgs/LightModeGeoBG.svg')",
      },
      colors: {
        // Primary
        "primary-100": "#527a8c",
        "primary-200": "#466979",
        "primary-300": "#3b576d",
        "primary-400": "#355166",
        "primary-500": "#283d4c",
        "primary-600": "#1e2e39",
        // Secondary
        "secondary-100": "#A7CEDE",
        "secondary-200": "#9BBECB",
        "secondary-300": "#89a7b3",
        "secondary-400": "#6595a8",
        "secondary-500": "#527e90",
        // Plain light
        "plain-light-100": "#F9FAFB",
        "plain-light-200": "#eeeeee",
        "plain-light-300": "#dddddd",
        "plain-light-400": "#cccccc",
        "plain-light-500": "#bbbbbb",
        "plain-light-600": "#888888",
        "plain-light-700": "#777777",
        // Plain dark
        "plain-dark-100": "#585d65",
        "plain-dark-200": "#424956",
        "plain-dark-300": "#393e4a",
        "plain-dark-400": "#202936",
        "plain-dark-500": "#11171e",
        // Red
        "warning-red-light": "#f02849",
        "warning-red-dark": "#d12e49",
        "delete-red-light-100": "#ad1f1f",
        "delete-red-light-200": "#a01c1c",
        "delete-red-dark-100": "#8e1c1c",
        "delete-red-dark-200": "#7f1919",
        // Other
        "success-green": "#1d7d41",
        "open-icon-red": "#c83737",
        "progress-icon-orange": "#ff7f2a",
        "testing-icon-teal": "#008080",
        "closed-icon-green": "#217844",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
      // Custom
      homePageBP: "1000px",
    },
    transitionProperty: {
      all: "all",
      colors: "background, border, color, opacity",
      width: "width",
      right: "right",
      bg: "background",
      text: "color",
      none: "none",
    },
  },
  plugins: [],
  darkMode: "class",
};
