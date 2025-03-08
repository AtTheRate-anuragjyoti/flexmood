/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: { color: "#f5f5f5" }, 
            h2: { color: "#f5f5f5" }, 
            h3: { color: "#ffffff" }, 
            strong: { color: "#ffffff" }, // Ensure bold text is visible
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};