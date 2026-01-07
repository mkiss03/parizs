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
        champagne: {
          50: '#FEFDFB',
          100: '#FBF9F5',
          200: '#F8F4EA',
          300: '#F5F5DC',
          400: '#E8E4CE',
          500: '#D9D3BA',
          600: '#C4BA9A',
          700: '#A99C7A',
          800: '#8A7D5E',
          900: '#6B5F45',
        },
        gold: {
          50: '#FAF8F0',
          100: '#F5EFD9',
          200: '#EEDFB3',
          300: '#E5CC8A',
          400: '#D4AF37',
          500: '#C09A2A',
          600: '#A37F1E',
          700: '#856516',
          800: '#674D0F',
          900: '#4A3709',
        },
        navy: {
          50: '#E6EBF0',
          100: '#CCD6E1',
          200: '#99ADC3',
          300: '#6684A5',
          400: '#335B87',
          500: '#002147',
          600: '#001A39',
          700: '#00142B',
          800: '#000D1C',
          900: '#00070E',
        },
        burgundy: {
          50: '#F8E8EC',
          100: '#F0D1D9',
          200: '#E1A3B3',
          300: '#D2758D',
          400: '#C34767',
          500: '#800020',
          600: '#66001A',
          700: '#4D0013',
          800: '#33000D',
          900: '#1A0007',
        },
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
