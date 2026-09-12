import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        graphite: "#121417",
        charcoal: "#1A1D23",
        panel: "#222730",
        "panel-border": "#2E3642",
        "pulp-amber": "#E08838",
        "pulp-amber-hover": "#C97427",
        "pulp-crimson": "#B91C1C",
        "pulp-crimson-hover": "#991B1B",
        paper: "#F5EFEB",
        "paper-muted": "#D6CEC7",
        "slate-muted": "#94A3B8",
      },
      fontFamily: {
        heading: ["Oswald", "Bebas Neue", "Impact", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },
      boxShadow: {
        pulp: "0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 8px 10px -6px rgba(0, 0, 0, 0.6)",
        "pulp-amber": "0 0 20px -3px rgba(224, 136, 56, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
