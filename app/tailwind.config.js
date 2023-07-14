/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // here we can add custom style which is extended so we have all custom styles and all styles of tailwind
    extend: {
      //here we can add custom font family. for sass key we added a variable we made in Layout.js
      fontFamily: {
        sans: ["var(--font-vazir)", "sans-serif"],
      },
      //here we can add custom colors to use in background and other places
      colors: {
        "main-bg-color": "#eef2ff",
      },
    },
  },
  plugins: [require("daisyui")],
};
