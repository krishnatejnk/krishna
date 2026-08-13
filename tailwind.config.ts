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
        background: "var(--background)",
        foreground: "var(--foreground)",
        dsg: {
          charcoal: "#16171a",
          panel: "#1c1d20",
          overlay: "rgba(10,11,12,0.82)",
          accent: "#d9382b",
          "accent-45": "rgba(217,56,43,0.45)",
          ink: "#ececea",
          "ink-2": "#a6a8ab",
          "ink-3": "#8d8f92",
          "ink-4": "#7e8085",
          "ink-5": "#6a6c70",
          hairline: "#2a2c30",
          chip: "#2f3135",
          line: "#3a3c40",
          frame: "#33353a",
          hover: "rgba(255,255,255,0.03)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Helvetica", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        gradient: "gradient 8s linear infinite",
        blink: "blink 2s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
      },
      keyframes: {
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".15" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

