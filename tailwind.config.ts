
import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0c0f14",
        card: "#11151f",
        text: "#e6e9ef",
        muted: "#9aa4b2",
        line: "#1f2432",
        acc: "#9aa4b2"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.25)"
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
} satisfies Config
