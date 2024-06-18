/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        blueGeoBg1280: "url('@/assets/BlueGeoBG_1280.jpg')",
        blueGeoBg1920: "url('@/assets/BlueGeoBG_1920.jpg')",
      },
      colors: {
        "primary-1": "#355166",
        "primary-2": "#283d4c",
        "secondary-1": "#89a7b3",
        "secondary-2": "#6595a8",
        "secondary-3": "#527e90",
        "tertiary-1": "#668299",
        "tertiary-2": "#355166",
        "plain-1": "#F9FAFB",
        "plain-2": "#ededed",
        "plain-3": "#cccccc",
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
