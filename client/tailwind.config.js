/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        blueGeoBg1280: "url('./assets/BlueGeoBG_1280.jpg')",
        blueGeoBg1920: "url('./assets/BlueGeoBG_1920.jpg')",
      },
      colors: {
        "primary-1": "#668299",
        "primary-2": "#355166",
        "secondary-1": "#89a7b3",
        "secondary-2": "#6595a8",
        "secondary-3": "#527e90",
        "error-red": "#f02849",
      },
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
  },
  plugins: [],
};
