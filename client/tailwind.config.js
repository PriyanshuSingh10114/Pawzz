/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a6f6',
          500: '#0c87eb',
          600: '#006bc9',
          700: '#0156a3',
          800: '#064986',
          900: '#0b3e6f',
        },
        paw: {
          emerald: '#10b981',
          teal: '#0d9488',
          dark: '#0f172a',
          accent: '#14b8a6',
        },
        skill: {
          indigo: '#6366f1',
          violet: '#8b5cf6',
          purple: '#7c3aed',
        },
        slide: {
          amber: '#f59e0b',
          rose: '#f43f5e',
          coral: '#fb7185',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 35px -10px rgba(0, 0, 0, 0.12), 0 8px 12px -4px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};
