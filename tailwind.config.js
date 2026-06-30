/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#edf7f0',
          100: '#c8e8d0',
          200: '#a2d9b1',
          300: '#7cca91',
          400: '#57bb72',
          500: '#32864B',
          600: '#286e3d',
          700: '#1e562f',
          800: '#143e21',
          900: '#0a2613',
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
        surface: '#f2f7f4',
        card:    '#ffffff',
      },
    },
  },
  plugins: [],
}
