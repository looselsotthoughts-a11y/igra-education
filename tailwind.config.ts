import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      colors: {
        ink:     "#1A1A18",
        "ink-soft": "#4A4A46",
        "ink-muted": "#8A8A84",
        sand:    "#F7F6F3",
        "sand-mid": "#ECEAE4",
        "sand-dark": "#DDD9D0",
        leaf:    "#2D6A4F",
        "leaf-light": "#D8EDDF",
      },
    },
  },
  plugins: [],
};

export default config;
