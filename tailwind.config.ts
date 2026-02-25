import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#4a484a",
        accent: "#ae8c68",
        muted: "#757575",
        fog: "#f6f6f4"
      },
      fontFamily: {
        display: [
          "\"Bodoni Moda\"",
          "\"Palatino Linotype\"",
          "Georgia",
          "serif"
        ],
        body: [
          "\"Avenir Next\"",
          "\"Segoe UI\"",
          "\"Helvetica Neue\"",
          "Helvetica",
          "Arial",
          "sans-serif"
        ]
      },
      letterSpacing: {
        luxe: "0.15em"
      }
    }
  },
  plugins: []
};

export default config;

