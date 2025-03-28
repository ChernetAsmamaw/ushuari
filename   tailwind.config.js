import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#002366", // Navy Blue
          light: "#003399",
          dark: "#001A4D",
        },
        accent: {
          DEFAULT: "#D4AF37", // Gold
          light: "#E6C66E",
          dark: "#C09A27",
        },
        background: "#F5F5F5", // Light Gray
        foreground: "#555555", // Dark Gray
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      boxShadow: {
        "inner-lg": "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-position": "50% 0%",
          },
          "50%": {
            "background-position": "50% 100%",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-position": "0% 0%",
          },
          "50%": {
            "background-position": "100% 100%",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
