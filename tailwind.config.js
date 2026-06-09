/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#e6f5f6',
          100: '#b3e2e5',
          200: '#7fcdd2',
          300: '#4cb8bf',
          400: '#1aa3ac',
          500: '#0096A4',
          600: '#007a85',
          700: '#005f68',
          800: '#00434a',
          900: '#00282d',
        },
        accent: {
          50:  '#fef9e7',
          100: '#fdefc3',
          400: '#f5c842',
          500: '#F0AB00',
          600: '#c48b00',
        },
        wri: {
          green:  '#32864B',
          navy:   '#3855A3',
          orange: '#EB8026',
          red:    '#EE3161',
          purple: '#9B216C',
          gray:   '#9B9B9B',
        },
        surface: '#f2f8f8',
        card:    '#ffffff',
      },
    },
  },
  plugins: [],
}
