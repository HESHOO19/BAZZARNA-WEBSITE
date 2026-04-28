import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f1115",
        panel: "#171a20",
        panelAlt: "#1d2129",
        card: "#14171d",
        border: "#2b313d",
        primary: "#f4c542",
        primaryDark: "#d4a318",
        mint: "#6ee7b7",
        text: "#f8fafc",
        muted: "#94a3b8",
        danger: "#f87171"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(0, 0, 0, 0.28)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at top, rgba(244, 197, 66, 0.20), transparent 35%), linear-gradient(180deg, #0f1115 0%, #11151c 100%)"
      }
    }
  },
  plugins: []
};

export default config;

