/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'parchment': '#F5E6C1',
        'flame': '#ff4500',
        'lawfulBlue':'#0A6583',
        'chaoticRed': '#883035',
      },
    },
  },
  plugins: [],
};
