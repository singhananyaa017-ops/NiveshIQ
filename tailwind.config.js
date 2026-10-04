/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finlit: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        navy: {
          900: '#0B132B',
          800: '#1C2541',
          700: '#3A506B',
        },
        brand: {
          teal: '#0D9488',
          blue: '#2563EB',
          indigo: '#4F46E5',
          amber: '#F59E0B',
          rose: '#E11D48',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
