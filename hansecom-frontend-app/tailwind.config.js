/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000',
        white: '#fff',
        gray: {
          100: '#f7fafc', // Light gray
          400: '#cbd5e0', // Medium gray
          700: '#4a5568', // Dark gray
        },
        red: {
          500: '#f56565', // Red
          600: '#e53e3e', // Darker red
        },
        green: {
          500: '#48bb78', // Green
          600: '#38a169', // Darker green
        },
        blue: {
          500: '#4299e1', // Blue
          600: '#3182ce', // Darker blue
        },
        yellow: {
          500: '#ecc94b', // Yellow
          600: '#d69e2e', // Darker yellow
        },
        purple: {
          500: '#9f7aea', // Purple
          600: '#805ad5', // Darker purple
        },
        pink: {
          500: '#ed64a6', // Pink
          600: '#d53f8c', // Darker pink
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
