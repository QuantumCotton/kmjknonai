/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ESH Brand Colors
        'esh-gold': '#D4AF37',
        'esh-gold-light': '#E5C158',
        'esh-gold-dark': '#B8941F',
        'esh-navy': '#1A365D',
        'esh-charcoal': '#2D3748',
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
};
