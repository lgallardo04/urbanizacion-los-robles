import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        robles: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // primary emerald
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        surface: {
          DEFAULT: '#070d1f',
          dim: '#050a17',
          low: '#0a1428',
          card: '#101c36',
          high: '#172749',
          highest: '#1f335e',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        cyan: {
          DEFAULT: '#06b6d4',
          glow: '#38bdf8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'robles-gradient': 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.25)',
        'cyan-glow': '0 0 25px rgba(6, 182, 212, 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;
