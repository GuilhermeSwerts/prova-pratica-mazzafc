/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./main.jsx",
    "./src/views/**/*.jsx",
  ],
  theme: {
    extend: {
      animation: {
        'spin-360': 'spin-360 2s linear infinite',
        'pulse': 'pulse 1.5s infinite ease-in-out',
      },
      keyframes: {
        'spin-360': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        primary: '#061456',
        'red': '#f91605',
        'orange': '#f5642d',
        'light-grey': '#d0d0d0',
        'header': '#ffffff',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}