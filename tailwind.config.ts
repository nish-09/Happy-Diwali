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
        diwali: {
          midnight: "#080B1A",
          deepPurple: "#160B2D",
          royalGold: "#FFD700",
          warmGold: "#FFB84D",
          lightGold: "#FFF2B2",
          diyaOrange: "#FF6B00",
          festiveRed: "#D62828",
          darkBg: "#060814",
        },
      },
      fontFamily: {
        serif: ["'Cinzel'", "'Playfair Display'", "serif"],
        decorative: ["'Cinzel Decorative'", "'Cinzel'", "serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        'gold-metallic': 'linear-gradient(90deg, #D4AF37, #FFDF73, #D4AF37, #AA771C)',
        'radial-glow': 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, rgba(22, 11, 45, 0) 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flame-flicker': 'flameFlicker 1.8s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'spin-very-slow': 'spin 60s linear infinite',
      },
      keyframes: {
        flameFlicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.92' },
          '25%': { transform: 'scale(1.06, 0.96) rotate(1deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96, 1.05) rotate(-0.5deg)', opacity: '0.88' },
          '75%': { transform: 'scale(1.04, 0.98) rotate(1.5deg)', opacity: '0.98' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.95' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
