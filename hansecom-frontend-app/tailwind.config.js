/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
      screens: {
        // Custom breakpoints
        'sm': '640px', // Small devices (sm)
        'md': '768px', // Medium devices (md)
        'lg': '1024px', // Large devices (lg)
        'xl': '1280px', // Extra large devices (xl)
        '2xl': '1536px', // 2x extra large devices (2xl)
      },
      colors: {
        // Custom color palette
        'transparent': 'transparent',
        'current': 'currentColor',
        'black': '#000',
        'hansecom-blue': '#14426A',
        'hansecom-red': '#D31A42',
        'hansecom-orange': '#F98F24',
        'hansecom-cyan': '#0EDCFC',
        'hansecom-green': '#4FD65C',
        'hansecom-white': '#FEFEFE',
        'white': '#fff',
        'gray': {
          100: '#f7fafc', // Light gray
          400: '#cbd5e0', // Medium gray
          700: '#4a5568', // Dark gray
        },
      },
      fontFamily: {
        // Custom font families
        sans: ['Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
        mono: ['Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  variants: {},
  plugins: [],
}
